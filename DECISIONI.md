# Decisioni prese da solo

Brief del 27/10/2026: «lavora da solo, scegli e annota». Qui c'è ogni scelta che avrei
chiesto a te, con il motivo. Le più importanti sono anche nel RAPPORTO.md.

## Fase 0 — Strumenti

1. **Repository git locale** creato in `quartin-torino/` (branch `main`), con nome e email
   impostati solo per questo repository (`git config` locale, non globale), perché sul PC
   non c'era un'identità git configurata e senza non si può fare commit. Nessun remote, nessun push.
2. **Nessuna installazione.** Per ottimizzare le foto uso `sharp` e per gli screenshot
   `playwright`, già presenti in `node_modules` di altri tuoi progetti (`brezil`,
   `lounge-barber-shop`, `pizzeria-galimberti`). Gli script stanno in `strumenti/` e li
   cercano lì: non ho installato niente né in globale né nella cartella del progetto.
3. Python di sistema non ha Pillow: non serve, faccio tutto con Node.

## Fase 1 — Studio

4. Ho guardato ogni foto una volta sola, come chiesto, e non ho ingrandito ritagli del menu
   per rileggerli. Per questo il **telefono** letto in fondo al menu (`366 691 2120`) va nel
   sito con il riquadro [DA CONFERMARE]: le cifre sono piccole e potrei averne sbagliata una.
5. I **colori** li ho campionati con uno script (mediana dei pixel di un'area) e non a occhio:
   così gli hex in STUDIO.md sono ripetibili.

## Fase 2 — Direzione

6. **Scelta la direzione B, «Cartolina rossa»** (dettagli in DIREZIONI.md): è il linguaggio
   che il locale usa già su cartoline, frasi dello zio Tony e menu. Le altre due erano
   interpretazioni mie (A troppo fredda e senza rosso, C notturna e fuori marchio).
7. **Rosso di riferimento `#AC252B`** (da `slogan2.png`): i rossi campionati variano da
   `#AC020B` a `#AF3736` perché sono screenshot con filtri diversi; questo sta nel mezzo e
   con il bianco ha contrasto 6,9:1 (AA anche per testo piccolo).
8. **Verde marmo solo per «Vieni a trovarci»** e **giallo solo per i [DA CONFERMARE]**:
   due colori di servizio presi dalle foto, per non diluire il rosso.

## Fase 3 — Costruzione

9. **Font**: Archivo variabile (peso e larghezza) e Source Serif 4 (tondo e corsivo), OFL,
   presi dai pacchetti Fontsource 5.3 (solo il sottoinsieme latino, che copre le lettere
   accentate italiane). Licenze in `fonts/OFL-*.txt`. Totale circa 190 KB.
10. **Foto 4.png ritagliata** (da x 300, y 150, 383×560 px): tolgo la donna a sinistra.
    Il volto non si vede, ma mani con anelli vistosi e un piccolo tatuaggio la rendono
    riconoscibile a chi la conosce. Resta il tavolino con le coppette. Il ritaglio è piccolo
    (383 px di larghezza) e lo mostro al massimo a circa 380 px.
11. **Icona Instagram tolta** tagliando qualche pixel in fondo a `1.png` e `3.png`.
12. **Logo**: uso la foto della vetrofania (`logo.png`) intera come immagine d'apertura, e
    per la testata l'ippopotamo piccolo ritagliato da `ziotony.png` così com'è (riquadro
    calcolato sui pixel rossi). Sul fondo carta il suo bianco sparisce con
    `mix-blend-mode: multiply`, senza toccare il file. Il nome nella testata è testo semplice.
13. **Slogan scritti in HTML**, non come immagini: le tre cartoline hanno tre rossi diversi
    e messe in fila sembrerebbero un errore; il testo è identico agli originali. Ne uso due
    («Mezzo pieno», «Il solito») per non appesantire la pagina; «Fai tu» resta fuori.
14. **Frasi dello zio Tony** riportate alla lettera: gelato e birretta in «Il Quartin»,
    parcheggio in «Vieni a trovarci».
15. **Ogni foto compare una volta sola**: vetrina in apertura, quartino e gelato nel menu,
    ippopotamo, arredo e tavolino nella galleria. Nella galleria c'è un riquadro
    [DA CONFERMARE] con le foto che mancano.
16. **Menu riordinato** per seguire il titolo della sezione: prima da bere (Quartini,
    Imperdibili, Birre, Chiacchiere da bar), poi da assaggiare (Salato, Focaccine), poi il
    gelato. Voci, dettagli e prezzi restano quelli trascritti.
17. **Prezzi scritti all'italiana** (3.5 → 3,50; gli interi restano interi): è lo stesso
    numero del menu. Il prezzo dei vini al calice resta «5,9?» con il riquadro, perché non
    so se è un prezzo o una forbice.
18. **Telefono non cliccabile finché non è confermato**: se ho letto male una cifra, un link
    `tel:` farebbe chiamare uno sconosciuto. Basta mettere `confermato: true` in `js/main.js`.
19. **Link «Come arrivare»**: ricerca Google Maps con «Quartin, Via Santa Giulia 21/D,
    Torino». Niente CAP: non è nei dati che mi hai dato.
20. **Testi miei ridotti al minimo** e solo descrittivi: la frase del brief («bar di
    quartiere dedicato all'incontro e alla convivialità»), l'offerta, didascalie che dicono
    cosa si vede nelle foto. Nessuna storia, nessun aggettivo promozionale.
21. **Contenuti nell'oggetto `QUARTIN` in cima a `js/main.js`** (regola del tuo CLAUDE.md).
    L'HTML contiene comunque indirizzo e link alla mappa, così funzionano anche senza JS;
    il menu senza JS mostra un avviso.
22. **Avviso «Demo di proposta»** in cima alla pagina: serve quando mostri il sito ai gestori.

## Fase 4 — Verifica

23. **Screenshot con Playwright + Edge di sistema** (`strumenti/anteprime.mjs`), a pagina
    intera, in `docs/anteprime/quartin-390.png` e `quartin-1280.png`. Ho aggiunto
    `strumenti/controlli.mjs`: contrasto AA di ogni testo, bersagli ≥ 44 px, contorno di
    focus con Tab, scorrimento orizzontale, `alt`, menu «Sezioni», reduced-motion.
    Esito finale: nessun problema a 390 e a 1280 px.
24. Correzioni fatte (al massimo due giri ciascuna, tutte risolte):
    - scorrimento orizzontale a 1280 px causato dal riquadro rosso dietro la foto
      d'apertura → `overflow-x: clip` sulla sezione (1 giro);
    - virgolette di chiusura delle fasce-slogan tagliate in basso → riposizionate e
      ingrandite (1 giro);
    - foto d'apertura su mobile: l'ippopotamo toccava il bordo → ritaglio 5:4 più alto (1 giro);
    - ovali dei prezzi troppo stretti per «2,50» → più larghi; l'ovale del titolo
      «Quartini» toccava la riga → margine corretto (2 giri);
    - galleria desktop con un buco sotto l'ippopotamo → griglia rifatta e spazio «foto
      mancante» grande come una foto (2 giri);
    - «Vieni a trovarci» su desktop con mezza colonna vuota → frase dello zio Tony su tutta
      la larghezza sotto indirizzo e contatti (1 giro).
25. **Nome in testata e nel piede come testo semplice** (non più maiuscolo, rosso e
    condensato): accanto all'ippopotamo sembrava un logo rifatto con un altro font.

## Revisione del 28/10/2026 — le tue 12 modifiche

Fatte tutte. Dove ho dovuto scegliere un dettaglio, ecco come e perché.

26. **Foto a 1100–1400 px non create.** Le originali sono larghe 645–700 px, il tavolino
    ritagliato 383 px: versioni più grandi sarebbero solo ingrandite, più pesanti e senza
    un dettaglio in più. Ho rifatto tutte le WebP a **q70** alla misura vera (22–54 KB) più
    una variante da 480 px per gli `srcset` (il tavolino ha solo la sua, 383 px). Tutte le
    `<img>` hanno `srcset` e `sizes`. Per foto più grandi servono gli originali dal locale.
    Se vuoi comunque le versioni ingrandite, basta aggiungere 1200 a `VARIANTI` in
    `strumenti/ottimizza-foto.mjs` e togliere il filtro sulla larghezza.
27. **og:image 1200×630** (`img/og-vetrina.jpg`): la foto della vetrina è 686×708, quindi
    non l'ho ingrandita ma messa su un fondo rosso accanto al nome, composta in
    `strumenti/og.html` e fotografata con Edge (`strumenti/og-immagine.mjs`). L'URL è
    relativo: va reso assoluto quando ci sarà il dominio (commento nell'HTML).
28. **JSON-LD `BarOrPub`** con il CAP 10124 che mi hai dato. Senza telefono e orari, che
    non sono confermati. Il CAP per ora sta solo lì: l'indirizzo visibile e il link a
    Maps sono rimasti senza.
29. **Titolo d'apertura**: «Chiacchiere da bar in Vanchiglia», la frase del tuo esempio
    (non ne ho inventata un'altra), sopra c'è solo «Quartin». 64 px su desktop, 40 px a
    390 px, su tre righe. Nuovo passo `--fs-hero` nella scala.
30. **Telefono cliccabile** (`tel:+393666912120`, 44 px) come chiedi: sostituisce la
    decisione 18. Il riquadro [DA CONFERMARE] resta accanto finché in `js/main.js` non
    metti `confermato: true`.
31. **Frasi dello zio Tony**: solo quelle in «Il Quartin» sono passate al corsivo Source
    Serif su fondo `#f3ebe4`; quella sul parcheggio in «Vieni a trovarci» è rimasta come
    prima, perché la richiesta riguardava #il-quartin. Nuovo passo `--fs-detto` (22→29 px).
    L'ippopotamo è largo 48 px: il ritaglio è 67×48, quindi su schermi retina è un po' morbido.
32. **Riga sotto gli slogan**: «Quartin – Chiacchiere da bar», cioè la firma che c'è sotto la
    frase sulle cartoline originali (`slogan*.png`). Niente testo nuovo. Nuovo passo
    `--sp-fascia` (48→80 px). Su mobile le virgolette stanno su una riga loro sopra e sotto
    la frase, così non la toccano; da 768 px stanno agli angoli del riquadro di 1100 px.
33. **Verde marmo**: scelto lo stato dei pulsanti del menu (passaggio del mouse e **parte
    del menu che stai leggendo**, calcolata mentre scorri) invece del filetto: con l'indice
    sticky su mobile serve anche a capire dove sei. Il pulsante attivo scorre in vista.
34. **Foto inclinate con ombra**: vetrina (apertura), quartino (menu), ippopotamo (galleria).
    Le altre sono dritte e senza ombra, con la cornice bianca.
35. **Testata sticky**: 56 px sotto i 768 px, 62 px sopra; `scroll-padding-top` su `html`
    perché ancore e focus non finiscano sotto. L'avviso «Demo» in cima scorre via.
36. **Galleria**: tre foto in fila con colonne proporzionali alla forma di ciascuna, così
    hanno la stessa altezza; la nota [DA CONFERMARE] è sotto il titolo (sostituisce la 15
    per la parte del riquadro vuoto).

## Revisione della galleria (28/10/2026)

37. **Galleria rifatta come chiesto** (sostituisce la 36 e, per la galleria, la 34):
    da 768 px griglia 7fr/5fr con l'ippopotamo su due righe a sinistra e le altre due foto
    a destra; sotto i 768 px una colonna con tutte le foto in 4:5. Le tre figure sono
    identiche: cornice bianca di 8 px, ombra `0 2px 12px rgb(0 0 0 / .08)`, nessuna rotazione.
    Didascalie a 15 px (nuovo passo fisso `--fs-didascalia`), «Coppette d'acciaio, all'aperitivo.».
38. **Proporzioni non sempre esatte, di proposito**: la griglia pareggia le altezze, quindi
    la foto si allunga per riempire la figura (`object-fit: cover`). A 1280 px l'ippopotamo
    è 4:5 esatto e le due a destra 1,24 invece di 1,33; a 768 px l'ippopotamo diventa 0,74
    perché la didascalia dello sgabello va su due righe. Il 4:5 e il 4:3 restano la misura
    di partenza (`aspect-ratio`), la figura in colonna dà alla foto lo spazio sopra la didascalia.
39. **Inquadrature**: sgabello `center 60%`, coppette `center` come chiesto; ippopotamo
    `42% center`, scelto in due giri: al 30% a 768 px si tagliava la T di «SOFT», al 42%
    restano dentro sia il muso sia la scritta.
40. **Le coppette a destra su desktop sono morbide**: il ritaglio senza la persona è largo
    383 px e qui viene mostrato a circa 460 px in 4:3, quindi si vede metà dell'altezza
    originale, un po' ingrandita. Serve la foto originale per fare meglio.

## Terza revisione (28/10/2026)

41. **Apertura tra 600 e 1023 px su due colonne** (`1fr 1fr`, 32 px), la prima delle due
    strade che proponevi: titolo e «Come arrivare» restano nella prima schermata senza
    schiacciare la foto. Misurato: il pulsante finisce a 780 px su 390×844, 538 px su
    600×900, 579 px su 768×1024, 630 px su 1023×768, 695 px su 1280×800. A 600 px il titolo
    è limitato a 6,4vw, altrimenti «in» restava da solo su una riga (1 giro).
42. **Foto d'apertura: il quartino**; sotto i 600 px in 16:10 (circa 356×228). Per non
    mostrarla due volte l'ho **tolta dal menu** (accanto a «Quartini» non c'è più foto);
    l'inclinazione nel menu ora tocca al gelato, una per sezione come prima.
43. **La vetrina va in «Vieni a trovarci»** con «Cerca questa vetrina», inclinata e larga al
    massimo 416 px. Su desktop sta sotto l'indirizzo, accanto alla frase dello zio Tony sul
    parcheggio; su mobile subito dopo «Come arrivare». La og:image resta quella con la vetrina.
44. **«Oggi …» in apertura**: con `orari: null` mostra il riquadro [DA CONFERMARE]. Ho
    cambiato il formato degli orari in un valore per giorno (`lunedi` … `domenica`) perché
    serve sapere cosa vale oggi; la stessa fonte riempie la tabella in «Vieni a trovarci».
45. **Fasce rosse con ordinazioni dal menu, non più gli slogan originali**: questo supera la
    regola del brief («slogan solo come scritti») perché me l'hai chiesto tu. Ho usato il tuo
    esempio, «Il solito? Un quartino di rosso. 7,50», e per la seconda lo stesso schema con
    l'altro slogan loro: «Mezzo pieno? Una birretta alla spina. 2,50» (Birretta alla Spina
    20 cl, letta con certezza). Firma tolta. I prezzi vengono dal menu via JS e hanno un
    riquadro [DA CONFERMARE], perché fuori dal menu altrimenti sembrerebbero confermati.
46. **Lista di «Il Quartin» come link** con la tua mappa: Aperitivi → Salato, Vini al calice
    e in quartino → Quartini, Cocktail → Imperdibili, Gelato → Gelato soft. I gruppi del menu
    li crea il JS: senza JavaScript i link non portano da nessuna parte.
47. **Testi sostituiti come chiesto**: frase di «Il Quartin», «Nuovo in Vanchiglia dal 10
    settembre 2026.» (con il riquadro, la fonte resta una sola) e nota sugli allergeni.
    Nota: la frase originale del loro menu («chi ha la salute è ricco e non lo sa…») non è
    più nel sito.
48. **Indice del menu sticky anche tra 768 e 1023 px** (a 62 px, una riga che scorre di
    lato); torna su più righe solo da 1024 px. La frase dello zio Tony in «Vieni a trovarci»
    ora ha lo stesso corsivo delle altre due (22→29 px), sul verde e senza riquadro.
49. **Galleria 6fr/6fr con coppette in 4:5 e sgabello in 4:3**: a destra le due foto impilate
    sono alte circa 1240 px contro i 750 dell'ippopotamo in 4:5. Pareggiare le righe
    (come prima) avrebbe allungato l'ippopotamo fino a una striscia stretta (0,45), quindi
    le righe ora sono automatiche e l'ippopotamo è **sticky**: resta in vista accanto alla
    colonna destra mentre si scorre (verificato: fermo a 86 px dall'alto). Nello screenshot
    statico a pagina intera sotto di lui si vede uno spazio vuoto. Il limite di 620 px non
    scatta mai: la colonna è al massimo 572 px. Le coppette in 4:5 sono mostrate a 556 px da
    un ritaglio di 383: si vedono morbide.
