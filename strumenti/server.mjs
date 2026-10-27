// Server statico minimo per vedere il sito in locale, senza dipendenze.
// Uso: node strumenti/server.mjs [porta]   (predefinita 8420) → http://localhost:8420
import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const radice = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const porta = Number(process.argv[2]) || 8420;
const tipi = {
  '.html': 'text/html; charset=utf-8', '.css': 'text/css; charset=utf-8', '.js': 'text/javascript; charset=utf-8',
  '.webp': 'image/webp', '.png': 'image/png', '.woff2': 'font/woff2', '.txt': 'text/plain; charset=utf-8',
};

export function avvia(p = porta) {
  const server = createServer(async (req, res) => {
    try {
      let percorso = decodeURIComponent(new URL(req.url, 'http://x').pathname);
      if (percorso.endsWith('/')) percorso += 'index.html';
      const file = path.join(radice, percorso);
      if (!file.startsWith(radice)) throw new Error('fuori dalla cartella');
      if (!(await stat(file)).isFile()) throw new Error('non è un file');
      res.writeHead(200, { 'Content-Type': tipi[path.extname(file)] || 'application/octet-stream', 'Cache-Control': 'no-store' });
      res.end(await readFile(file));
    } catch {
      res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
      res.end('Non trovato');
    }
  });
  return new Promise((ok) => server.listen(p, '127.0.0.1', () => ok(server)));
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  await avvia();
  console.log(`Quartin in anteprima su http://localhost:${porta}`);
}
