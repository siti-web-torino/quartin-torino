// Crea img/og-vetrina.jpg (1200×630) fotografando strumenti/og.html con Edge.
// Uso: node strumenti/og-immagine.mjs   (Playwright come in anteprime.mjs)
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

const porta = 8423;
const server = await avvia(porta);
const browser = await chromium.launch({ channel: 'msedge' });
try {
  const pagina = await browser.newPage({ viewport: { width: 1200, height: 630 } });
  await pagina.goto(`http://localhost:${porta}/strumenti/og.html`, { waitUntil: 'networkidle' });
  await pagina.evaluate(() => document.fonts.ready);
  const file = path.join(radice, 'img', 'og-vetrina.jpg');
  await pagina.screenshot({ path: file, type: 'jpeg', quality: 82 });
  console.log('salvato', path.relative(radice, file));
} finally {
  await browser.close();
  server.close();
}
