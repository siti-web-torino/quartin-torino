# Quartin – sito one-page (demo di proposta)

Sito vetrina per **Quartin**, bar di quartiere in via Santa Giulia 21/D (Vanchiglia, Torino).
È una **demo**: i gestori non l'hanno ancora vista. HTML, CSS e JavaScript senza framework,
senza build, senza CDN. Indicizzazione chiusa (`noindex` + `robots.txt`).

```
index.html          la pagina
css/style.css       stile: colori, scala tipografica e spaziature in :root
js/main.js          TUTTI i contenuti modificabili, nell'oggetto QUARTIN in cima
img/                foto WebP per il sito (generate, non modificarle a mano)
img-originali/      le immagini di partenza, intatte
fonts/              Archivo e Source Serif 4 (licenza OFL, testo in fonts/OFL-*.txt)
strumenti/          script per foto, anteprima, screenshot e controlli
docs/anteprime/     screenshot a 390 px e 1280 px
STUDIO.md · DIREZIONI.md · DECISIONI.md · RAPPORTO.md
```

## Vedere il sito in locale

```bash
node strumenti/server.mjs
```

Poi apri http://localhost:8420. Basta Node, nessuna installazione. Meglio il server che il
doppio clic su `index.html`: da file locale alcuni browser bloccano i font (non l'ho provato).

## Cambiare i contenuti

Tutto sta nell'oggetto `QUARTIN` in cima a [js/main.js](js/main.js). La regola è una sola:

- `null` = dato che non abbiamo → nel sito compare il riquadro giallo **[DA CONFERMARE]**;
- `confermato: false` oppure `incerto: '…'` = dato letto con dubbio → si vede con il riquadro;
- quando il locale conferma: metti il valore, `confermato: true`, oppure togli `incerto`.

Esempi:

```js
// Orari (al posto di null): un valore per ognuno dei sette giorni.
// Da qui escono la tabella in «Vieni a trovarci» e la riga «Oggi …» in apertura.
orari: {
  lunedi: 'chiuso', martedi: '…', mercoledi: '…', giovedi: '…',
  venerdi: '…', sabato: '…', domenica: '…',
},

// Telefono confermato: resta il link da toccare per chiamare, sparisce il riquadro giallo
telefono: { numero: '366 691 2120', confermato: true },

// Social ed email
social: { instagram: 'https://www.instagram.com/…', email: '…' },

// Data di apertura confermata
apertura: { testo: 'Nuovo in Vanchiglia dal 10 settembre 2026.', confermato: true },
```

**Menu**: `QUARTIN.menu` è un elenco di gruppi (`titolo`, `voci`). Ogni voce ha `nome`,
e se servono `dettaglio`, `misura`, `prezzo`, `opzioni`, `incerto`. Il prezzo come numero
(`3.5`) viene scritto all'italiana («3,50»); come testo (`'5,9?'`) viene mostrato così com'è.
L'ordine dei gruppi nell'elenco è l'ordine nella pagina e nei pulsanti di salto.
La foto del gelato si aggancia al gruppo con `foto: 'foto-menu-dolci'` (il modello
`<template>` è in `index.html`); la foto del quartino ora è in apertura.

**Fasce rosse** («Il solito? Un quartino di rosso.», «Mezzo pieno? Una birretta alla
spina.»): il testo è in `index.html`, il prezzo lo prende il JS dal menu con
`data-q-prezzo="quartini"` (prezzo del gruppo) o `data-q-prezzo="birre/Birretta alla Spina"`
(prezzo di una voce). Se cambi il prezzo nel menu, cambia anche nella fascia.

**Indirizzo e link alla mappa** stanno in `QUARTIN` (`via`, `zona`, `mappa`) e anche
nell'HTML, così funzionano pure senza JavaScript: se cambiano, aggiornali in tutti e due.
L'indirizzo con il CAP c'è anche nel JSON-LD (`BarOrPub`) dentro `<head>`: quando orari e
telefono saranno confermati si possono aggiungere lì (`openingHours`, `telephone`).

**Anteprima per i social** (`og:*` in `<head>`): l'immagine `img/og-vetrina.jpg` (1200×630)
si rigenera con `node strumenti/og-immagine.mjs` dopo aver cambiato `strumenti/og.html`.

**Testi fissi** (titoli, frasi d'apertura, frasi dello zio Tony, fasce, didascalie):
direttamente in `index.html`. Le frasi dello zio Tony sono copiate alla lettera dalle
immagini del locale; titolo d'apertura, riga dei prodotti, frase di «Il Quartin», fasce e
nota sugli allergeni sono testi chiesti da Alessandro il 28/10 (DECISIONI.md, 41–48).

**Avviso «Demo di proposta»** in cima alla pagina: è il `<p class="avviso-demo">` subito
dopo `<body>`. Toglilo quando il locale approva.

## Cambiare o aggiungere foto

1. Metti l'immagine in `img-originali/` (non viene mai modificata).
2. Aggiungi una riga all'elenco `foto` in [strumenti/ottimizza-foto.mjs](strumenti/ottimizza-foto.mjs)
   (eventuale ritaglio in pixel).
3. `node strumenti/ottimizza-foto.mjs` → WebP q70 in `img/`, lato lungo massimo 1600 px,
   senza EXIF, più una variante `-480.webp` se l'originale è abbastanza largo. Lo script non
   ingrandisce mai: le immagini di adesso sono larghe 383–700 px, quindi non esistono
   versioni più grandi. Con foto originali più grandi, aggiungi larghezze a `VARIANTI`.
4. Usa il file in `index.html` con `width`, `height`, `srcset`/`sizes` e un `alt` che descriva la foto.

Lo script usa `sharp` già presente in altri progetti sul PC (`../brezil`,
`../lounge-barber-shop`, `../flow-running-club`); in alternativa imposta la variabile
`SHARP_DA` con il percorso del `package.json` di un progetto che lo contiene.

## Controlli e screenshot

```bash
node strumenti/controlli.mjs
```

```bash
node strumenti/anteprime.mjs
```

Il primo controlla contrasto AA, bersagli touch ≥ 44 px, focus, scorrimento orizzontale,
`alt`, menu mobile e reduced-motion a 390 e 1280 px. Il secondo salva gli screenshot in
`docs/anteprime/`. Usano Playwright di `../pizzeria-galimberti` (o `PLAYWRIGHT_DA`) e
Microsoft Edge già installato, quindi non scaricano niente.

## Prima di pubblicare (solo quando lo decidi tu)

- togliere `<meta name="robots" content="noindex, nofollow">` da `index.html`;
- aprire `robots.txt` (ora `Disallow: /`);
- rendere assoluto l'indirizzo di `og:image` (`https://dominio/img/og-vetrina.jpg`) e aggiungere `og:url`;
- togliere l'avviso «Demo di proposta» e risolvere tutti i [DA CONFERMARE] qui sotto.

## Elenco dei [DA CONFERMARE]

Nella pagina sono tutti riquadri gialli tratteggiati.

| # | Dove | Cosa | Perché |
|---|---|---|---|
| 1 | Il Quartin | «Nuovo in Vanchiglia dal 10 settembre 2026.» | Una sola fonte giornalistica |
| 2 | Vieni a trovarci, e «Oggi …» in apertura | **Orari** e giorno di chiusura | Nessuna fonte |
| 3 | Vieni a trovarci | **Telefono** `366 691 2120` | Letto in piccolo in fondo a `menu.png` |
| 4 | Vieni a trovarci | Instagram, email | Nessun profilo visibile nelle immagini |
| 5 | Da bere | **Tutto il menu**, voci e prezzi | Trascritto da una foto a 489 px |
| 6 | Menu, Gli imperdibili | Vini al Calice: «5.9» | Prezzo unico o forbice 5–9? |
| 7 | Menu, Gli imperdibili | Il Sestetto Base: elenco degli amari | Testo piccolo |
| 8 | Menu, Gli imperdibili | Negroni…: «Per altri cocktail chiedere al barista» | Testo piccolo |
| 9 | Menu, Le birre | Birra in Bottiglia 0 Alcol, 33 cl | Riga poco leggibile |
| 10 | Menu, Chiacchiere da bar | Bibite in bottiglia: elenco | Testo piccolo |
| 11 | Menu, Chiacchiere da bar | Soldatini: Crodino, Camparino | Testo piccolo |
| 12 | Menu, Chiacchiere da bar | Succhi di frutta: gusti | Testo piccolo |
| 13 | Menu, Salato | «Goccino del Diavolo» | Nome incerto |
| 14 | Menu, Salato | «Gorgonzola, Cetriolini e Grissini» | Nome incerto |
| 15 | Menu, Salato | «Salame, Paglierina e Taralli» | Nome incerto |
| 16 | Menu, Focaccine | La Classica: ingredienti | Testo piccolo |
| 17 | Menu, Focaccine | La Vegetariana: ingredienti | Testo piccolo |
| 18 | Menu, I più dolci | Pippo il Biscotto: elenco dei gusti | Testo piccolo |
| 19 | Menu, I più dolci | Pippo Pucciato con Gianduia | Riga poco leggibile |
| 20 | Menu, I più dolci | «Coppetta d'acciaio al tavolo o coppetta da passeggio per l'asporto!» | Testo piccolo |
| 21 | Menu, Le coppe | Nomi dei variegati, soprattutto «Babà con Granella di Biscotti e/o Meliga» | Prima parola incerta |
| 22 | Il locale | Foto mancanti: facciata con il civico, sala, bancone, un cocktail, il gelato soft | Non ci sono tra le immagini |
| 23 | Tutta la pagina | Avviso «Demo di proposta» | Da togliere dopo l'approvazione |
| 24 | Fasce rosse | Prezzi 7,50 (quartino) e 2,50 (birretta) | Presi dal menu, quindi da confermare come il menu |

Fuori dalla pagina, da chiedere comunque: logo in vettoriale (SVG/PDF), permesso di usare
le foto (sono screenshot, probabilmente dal loro Instagram) e conferma che la donna
ritagliata via da `4.png` non vada mostrata.
