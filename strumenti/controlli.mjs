// Controlli automatici a 390 px e 1280 px: contrasto WCAG AA dei testi, bersagli touch
// ≥ 44 px, focus visibile, scorrimento orizzontale, alt delle immagini, errori in console.
// Uso: node strumenti/controlli.mjs   (Playwright ed Edge come in anteprime.mjs)
import { createRequire } from 'node:module';
import { existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import { avvia } from './server.mjs';

const radice = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const base = [
  process.env.PLAYWRIGHT_DA,
  path.join(radice, '..', 'pizzeria-galimberti', 'package.json'),
  path.join(radice, '..', 'lounge-barber-shop', 'package.json'),
  path.join(radice, '..', 'gr-hair-salon', 'package.json'),
].filter(Boolean).find((p) => existsSync(p));
if (!base) throw new Error('playwright non trovato: imposta PLAYWRIGHT_DA');
const { chromium } = createRequire(base)('playwright');

const porta = 8422;
const server = await avvia(porta);
const browser = await chromium.launch({ channel: 'msedge' });
let problemi = 0;
const segnala = (msg) => { problemi++; console.log('  ✗', msg); };

try {
  for (const larghezza of [390, 1280]) {
    console.log(`\n== ${larghezza} px`);
    const pagina = await browser.newPage({ viewport: { width: larghezza, height: 844 }, reducedMotion: 'reduce' });
    const errori = [];
    pagina.on('console', (m) => { if (m.type() === 'error') errori.push(m.text()); });
    pagina.on('pageerror', (e) => errori.push(e.message));
    await pagina.goto(`http://localhost:${porta}/`, { waitUntil: 'networkidle' });
    await pagina.evaluate(() => document.fonts.ready);
    errori.forEach((e) => segnala(`console: ${e}`));

    const esito = await pagina.evaluate(() => {
      const out = { contrasto: [], piccoli: [], alt: [], scroll: document.documentElement.scrollWidth, testi: 0, fluido: getComputedStyle(document.documentElement).scrollBehavior };
      const rgb = (s) => (s.match(/[\d.]+/g) || []).map(Number);
      const lum = ([r, g, b]) => {
        const f = (c) => { c /= 255; return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4; };
        return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b);
      };
      const fondo = (el) => {
        for (let n = el; n; n = n.parentElement) {
          const c = rgb(getComputedStyle(n).backgroundColor);
          if (c.length === 3 || (c.length === 4 && c[3] > 0.9)) return c.slice(0, 3);
        }
        return [255, 255, 255];
      };
      const visibile = (el) => { const r = el.getBoundingClientRect(); const s = getComputedStyle(el); return r.width > 1 && r.height > 1 && s.visibility !== 'hidden' && s.display !== 'none' && !el.closest('.vh'); };

      // Contrasto: ogni elemento con testo diretto
      const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
      const visti = new Set();
      while (walker.nextNode()) {
        const t = walker.currentNode;
        const el = t.parentElement;
        if (!t.textContent.trim() || visti.has(el) || !visibile(el) || el.closest('noscript, template, .salta')) continue;
        visti.add(el);
        out.testi++;
        const s = getComputedStyle(el);
        const c1 = lum(rgb(s.color).slice(0, 3)), c2 = lum(fondo(el));
        const rapporto = (Math.max(c1, c2) + 0.05) / (Math.min(c1, c2) + 0.05);
        const px = parseFloat(s.fontSize), peso = Number(s.fontWeight);
        const grande = px >= 24 || (px >= 18.66 && peso >= 700);
        const minimo = grande ? 3 : 4.5;
        if (rapporto < minimo) out.contrasto.push(`${rapporto.toFixed(2)}:1 < ${minimo} — «${t.textContent.trim().slice(0, 40)}»`);
      }

      // Bersagli touch
      for (const el of document.querySelectorAll('a[href], button')) {
        if (!visibile(el) || el.classList.contains('salta')) continue;
        const r = el.getBoundingClientRect();
        if (r.width < 44 || r.height < 44) out.piccoli.push(`${Math.round(r.width)}×${Math.round(r.height)} — «${el.textContent.trim().slice(0, 30)}»`);
      }

      for (const img of document.images) if (!img.hasAttribute('alt')) out.alt.push(img.src);
      return out;
    });

    console.log(`  testi controllati: ${esito.testi}`);
    if (esito.scroll > larghezza) segnala(`scorrimento orizzontale: ${esito.scroll}px`);
    esito.contrasto.forEach((c) => segnala(`contrasto ${c}`));
    esito.piccoli.forEach((p) => segnala(`bersaglio piccolo ${p}`));
    esito.alt.forEach((a) => segnala(`immagine senza alt: ${a}`));
    if (esito.fluido === 'smooth') segnala('scroll-behavior smooth anche con prefers-reduced-motion');

    // Focus visibile: Tab sui primi elementi e controllo che ci sia un outline
    await pagina.keyboard.press('Tab');
    for (let i = 0; i < 12; i++) {
      const f = await pagina.evaluate(() => {
        const el = document.activeElement;
        const s = getComputedStyle(el);
        return { testo: (el.textContent || el.tagName).trim().slice(0, 30), outline: s.outlineStyle !== 'none' && parseFloat(s.outlineWidth) >= 2 };
      });
      if (!f.outline) segnala(`focus senza contorno su «${f.testo}»`);
      await pagina.keyboard.press('Tab');
    }

    // Menu mobile: apertura e chiusura
    if (larghezza < 1024) {
      const b = pagina.locator('.nav-bottone');
      await b.click();
      const aperto = await pagina.locator('#nav-lista').isVisible();
      await pagina.keyboard.press('Escape');
      const chiuso = !(await pagina.locator('#nav-lista').isVisible());
      if (!aperto || !chiuso) segnala(`menu Sezioni: aperto=${aperto} chiuso con Esc=${chiuso}`);
      else console.log('  menu Sezioni: si apre e si chiude con Esc');
    }
    await pagina.close();
  }
} finally {
  await browser.close();
  server.close();
}
console.log(problemi ? `\n${problemi} problemi.` : '\nNessun problema trovato.');
process.exitCode = problemi ? 1 : 0;
