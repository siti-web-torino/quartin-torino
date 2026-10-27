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
