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
