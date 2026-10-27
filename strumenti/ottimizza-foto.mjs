// Crea in img/ le versioni WebP delle foto di img-originali/ (che restano intatte).
// Uso: node strumenti/ottimizza-foto.mjs
// sharp non è installato in questo progetto: lo cerco nei node_modules degli altri progetti
// sul PC, oppure nel percorso indicato dalla variabile d'ambiente SHARP_DA.
import { createRequire } from 'node:module';
import { existsSync, mkdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const radice = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const candidati = [
  process.env.SHARP_DA,
  path.join(radice, '..', 'brezil', 'package.json'),
  path.join(radice, '..', 'lounge-barber-shop', 'package.json'),
  path.join(radice, '..', 'flow-running-club', 'package.json'),
].filter(Boolean);
const base = candidati.find((p) => existsSync(p));
if (!base) throw new Error('sharp non trovato: imposta SHARP_DA con il package.json di un progetto che lo contiene');
const sharp = createRequire(base)('sharp');

const ORIGINALI = path.join(radice, 'img-originali');
const USCITA = path.join(radice, 'img');
const LATO_MAX = 1600;

// ritaglio: { left, top, width, height } in pixel dell'originale.
// Dove c'è, toglie l'icona «persone taggate» di Instagram in basso a sinistra.
const foto = [
  { da: 'logo.png', a: 'vetrina-logo.webp' },
  { da: '1.png', a: 'gelato-biscotto.webp', ritaglio: { left: 0, top: 0, width: 678, height: 822 } },
  { da: '2.png', a: 'arredo-sgabello.webp' },
  { da: '3.png', a: 'quartino-aperitivo.webp', ritaglio: { left: 0, top: 0, width: 694, height: 830 } },
  // 4.png: tolta la persona a sinistra (mani con anelli e tatuaggio), resta il tavolino.
  { da: '4.png', a: 'cabaret-tavolino.webp', ritaglio: { left: 300, top: 150, width: 383, height: 560 } },
  { da: '5.png', a: 'ippopotamo-stai-soft.webp' },
];

mkdirSync(USCITA, { recursive: true });

for (const { da, a, ritaglio } of foto) {
  let img = sharp(path.join(ORIGINALI, da)).flatten({ background: '#ffffff' });
  if (ritaglio) img = img.extract(ritaglio);
  // sharp non copia EXIF/ICC/XMP se non glielo si chiede: l'uscita è senza metadati.
  const info = await img
    .resize({ width: LATO_MAX, height: LATO_MAX, fit: 'inside', withoutEnlargement: true })
    .webp({ quality: 82, effort: 6 })
    .toFile(path.join(USCITA, a));
  console.log(`${a}  ${info.width}×${info.height}  ${(info.size / 1024).toFixed(0)} KB`);
}

// Ippopotamo piccolo del logo, ritagliato com'è da ziotony.png (riquadro trovato cercando i
// pixel rossi in basso al centro). Serve per la testata e per l'icona della scheda.
{
  const sorgente = path.join(ORIGINALI, 'ziotony.png');
  const zona = { left: 260, top: 700, width: 160, height: 97 };
  const { data, info } = await sharp(sorgente).flatten({ background: '#ffffff' }).extract(zona)
    .raw().toBuffer({ resolveWithObject: true });
  let x0 = info.width, y0 = info.height, x1 = 0, y1 = 0;
  for (let y = 0; y < info.height; y++) {
    for (let x = 0; x < info.width; x++) {
      const i = (y * info.width + x) * info.channels;
      if (data[i] - data[i + 1] > 60) { x0 = Math.min(x0, x); x1 = Math.max(x1, x); y0 = Math.min(y0, y); y1 = Math.max(y1, y); }
    }
  }
  const pad = 3;
  const riquadro = {
    left: zona.left + Math.max(0, x0 - pad),
    top: zona.top + Math.max(0, y0 - pad),
    width: Math.min(info.width, x1 + pad + 1) - Math.max(0, x0 - pad),
    height: Math.min(info.height, y1 + pad + 1) - Math.max(0, y0 - pad),
  };
  const marchio = sharp(sorgente).flatten({ background: '#ffffff' }).extract(riquadro);
  const out = await marchio.clone().webp({ lossless: true }).toFile(path.join(USCITA, 'ippopotamo-marchio.webp'));
  console.log(`ippopotamo-marchio.webp  ${out.width}×${out.height}  (riquadro ${JSON.stringify(riquadro)})`);
  const lato = Math.max(riquadro.width, riquadro.height);
  await marchio.clone()
    .resize({ width: lato, height: lato, fit: 'contain', background: '#ffffff' })
    .resize(64, 64).png().toFile(path.join(radice, 'favicon.png'));
  console.log('favicon.png  64×64');
}
