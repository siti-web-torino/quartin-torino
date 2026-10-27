// Screenshot a pagina intera a 390 px e 1280 px in docs/anteprime/.
// Uso: node strumenti/anteprime.mjs [suffisso]
// Playwright non è installato qui: lo prendo da un altro progetto sul PC (o da PLAYWRIGHT_DA)
// e uso Microsoft Edge già installato in Windows, quindi niente browser da scaricare.
import { createRequire } from 'node:module';
import { existsSync, mkdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import { avvia } from './server.mjs';

const radice = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const candidati = [
  process.env.PLAYWRIGHT_DA,
  path.join(radice, '..', 'pizzeria-galimberti', 'package.json'),
  path.join(radice, '..', 'lounge-barber-shop', 'package.json'),
  path.join(radice, '..', 'gr-hair-salon', 'package.json'),
].filter(Boolean);
const base = candidati.find((p) => existsSync(p));
if (!base) throw new Error('playwright non trovato: imposta PLAYWRIGHT_DA con il package.json di un progetto che lo contiene');
const { chromium } = createRequire(base)('playwright');

const suffisso = process.argv[2] ? `-${process.argv[2]}` : '';
const uscita = path.join(radice, 'docs', 'anteprime');
mkdirSync(uscita, { recursive: true });

const porta = 8421;
const server = await avvia(porta);
const browser = await chromium.launch({ channel: 'msedge' });
const errori = [];
try {
  for (const larghezza of [390, 1280]) {
    const pagina = await browser.newPage({ viewport: { width: larghezza, height: larghezza < 600 ? 844 : 800 }, deviceScaleFactor: 1 });
    pagina.on('console', (m) => { if (m.type() === 'error') errori.push(`${larghezza}px: ${m.text()}`); });
    pagina.on('pageerror', (e) => errori.push(`${larghezza}px: ${e.message}`));
    await pagina.goto(`http://localhost:${porta}/`, { waitUntil: 'networkidle' });
    await pagina.evaluate(() => document.fonts.ready);
    // Le immagini lazy: scorro fino in fondo per caricarle tutte.
    await pagina.evaluate(async () => {
      for (const img of document.images) img.loading = 'eager';
      await Promise.all([...document.images].map((i) => (i.complete ? null : new Promise((ok) => { i.onload = i.onerror = ok; }))));
    });
    const larghezzaPagina = await pagina.evaluate(() => document.documentElement.scrollWidth);
    if (larghezzaPagina > larghezza) errori.push(`${larghezza}px: scorrimento orizzontale (${larghezzaPagina}px)`);
    const file = path.join(uscita, `quartin-${larghezza}${suffisso}.png`);
    await pagina.screenshot({ path: file, fullPage: true });
    console.log('salvato', path.relative(radice, file));
    if (larghezza < 600) {
      // a metà menu: testata e indice delle categorie devono restare in vista
      // scorrimento istantaneo: con quello fluido lo screenshot coglierebbe la pagina a metà strada
      await pagina.evaluate(() => document.getElementById('menu-salato').scrollIntoView({ behavior: 'instant' }));
      await pagina.waitForTimeout(600);
      const pos = await pagina.evaluate(() => ({
        testata: Math.round(document.querySelector('.testata').getBoundingClientRect().top),
        indice: Math.round(document.querySelector('.menu-indice').getBoundingClientRect().top),
        attivo: document.querySelector('.menu-indice [aria-current]')?.textContent,
      }));
      console.log(`a metà menu: testata a ${pos.testata}px, indice a ${pos.indice}px, categoria attiva «${pos.attivo}»`);
      const fileMenu = path.join(uscita, `quartin-${larghezza}-menu${suffisso}.png`);
      await pagina.screenshot({ path: fileMenu });
      console.log('salvato', path.relative(radice, fileMenu));
    }
    await pagina.close();
  }
} finally {
  await browser.close();
  server.close();
}
console.log(errori.length ? `Problemi:\n- ${errori.join('\n- ')}` : 'Nessun errore in console, nessuno scorrimento orizzontale.');
