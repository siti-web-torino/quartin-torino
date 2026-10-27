# Rapporto — notte del 27/10/2026

## Cosa è pronto

- **Sito one-page** in `index.html` + `css/style.css` + `js/main.js`, direzione «Cartolina
  rossa» (il rosso e la carta delle loro cartoline e del menu). Cinque sezioni: Benvenuto
  con «Come arrivare» (link a Google Maps, niente iframe), Il Quartin, Da bere e da
  assaggiare (menu completo trascritto), Il locale (galleria), Vieni a trovarci.
- **6 foto** in WebP (32–78 KB, senza EXIF), originali intatti. Font Archivo e Source Serif 4
  ospitati in `fonts/` (OFL). `noindex` + `robots.txt` chiuso.
- **Verificato** a 390 e 1280 px: screenshot in `docs/anteprime/`, e `strumenti/controlli.mjs`
  passa senza errori (contrasto AA, bersagli ≥ 44 px, focus, nessuno scorrimento
  orizzontale, reduced-motion, nessun errore in console).
- 5 commit locali, uno per fase. Niente push, niente pubblicazione, niente installato.
- Documenti: `STUDIO.md` (foto, palette, menu trascritto), `DIREZIONI.md` (3 direzioni e
  scelta), `DECISIONI.md` (25 scelte prese da solo), `README.md` (come cambiare i
  contenuti ed elenco dei 23 [DA CONFERMARE]).

## Cosa controllare per primo

1. **Il telefono `366 691 2120`**: letto in piccolo dal piede del menu. Finché non metti
   `confermato: true` in `js/main.js` non è cliccabile.
2. **Il menu**: confrontalo con `img-originali/menu.png`, soprattutto i prezzi e le 16 righe
   con il riquadro (in particolare «Vini al Calice 5.9» e «Babà…»).
3. **Il ritaglio di `4.png`** (`img/cabaret-tavolino.webp`): ho tolto la donna seduta perché
   anelli e tatuaggio sulla mano la rendono riconoscibile. Se per te va bene intera, cambia
   il ritaglio in `strumenti/ottimizza-foto.mjs`.
4. **Le frasi che ho scritto io**, poche e descrittive: «Un bar di quartiere a Vanchiglia,
   dedicato all'incontro e alla convivialità» (dal tuo brief), «Acciaio, marmo verde, legno e
   un ippopotamo appeso al soffitto» e le didascalie. Tutto il resto è testo loro.
5. Il sito a schermo intero dal tuo browser: `node strumenti/server.mjs` → http://localhost:8420.

## Cosa non so

- Orari, giorni di chiusura, Instagram, email: nessuna fonte, sono riquadri vuoti.
- Se la data di apertura (10/09/2026) è giusta: c'è una sola fonte.
- Se il logo esiste in vettoriale: ho usato solo la foto della vetrofania e l'ippopotamo
  piccolo ritagliato da `ziotony.png`, senza ridisegnare niente. La testata usa un ritaglio
  di 67×48 px: va bene a 40 px, non regge ingrandito.
- Se le foto si possono usare: sono screenshot, credo dal loro Instagram (in alcune c'era
  l'icona «taggati», che ho tagliato). Sono piccole (~680 px): sul desktop non le ho mai
  mostrate più grandi di così.
- Se il sito regge su Safari/iPhone e Firefox: ho provato solo con Edge (Chromium).
- Cosa sia «Pippo» nel menu (forse l'ippopotamo): non l'ho scritto da nessuna parte.

## Revisione del 28/10/2026

Fatte le 12 modifiche richieste (dettagli e scelte in DECISIONI.md, punti 26–36): testata
sticky, telefono cliccabile, nuovo titolo d'apertura, frasi dello zio Tony in corsivo,
fasce più basse con la firma delle cartoline, indice del menu sticky su mobile con la parte
attiva in verde, galleria a tre foto, foto inclinate solo una per sezione, hero a 1200 px,
Open Graph e JSON-LD. Controlli e screenshot rifatti senza problemi (in più
`docs/anteprime/quartin-390-menu.png`: testata e indice restano in vista a metà menu).

**Non fatto come chiesto:** le foto a 1100–1400 px. Le originali sono larghe 645–700 px
(il tavolino 383): le ho rifatte a q70 alla misura vera con una variante da 480 px per gli
`srcset`, senza ingrandirle. Per avere foto più grandi servono gli originali dal locale.
