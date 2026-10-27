# Regole per i siti vetrina

## Stack
- Solo HTML, CSS e JavaScript vanilla. Nessun framework, nessuna build, nessun CDN.
- Struttura: index.html, css/style.css, js/main.js, img/, fonts/.
- Percorsi sempre relativi (il sito può stare sotto /nome-repo/ su GitHub Pages).
- Font scaricati e ospitati nel progetto (solo licenze libere, es. OFL). Niente Google Fonts da CDN.
- Mappe: solo un link a Google Maps, mai iframe (niente cookie di terzi, niente banner).

## Dati: regola più importante
- Usa solo i dati che ti do. Mai inventare orari, prezzi, telefono, storia, nomi, recensioni.
- Ogni dato mancante diventa un riquadro visibile "[DA CONFERMARE] ...".
- Niente foto prese da internet. Usa segnaposto e dimmi che foto servono.
- Tutti i dati modificabili stanno in un unico oggetto in cima a js/main.js.

## Design
- Mobile-first: la gente arriva dal telefono (Instagram, Maps). Parti da 390px, poi desktop.
- Evita l'aspetto da sito generato: niente gradienti viola, niente card tutte uguali con
  ombra, niente emoji come icone, niente Inter su fondo bianco, niente hero centrato generico.
- Una scala tipografica e una scala di spaziature, definite come variabili CSS e usate sempre.
- Contrasto WCAG AA, bersagli touch di almeno 44px, focus visibile, prefers-reduced-motion.

## Metodo
- Prima di scrivere codice proponi, poi aspetta la mia scelta.
- Modifiche piccole e mirate: non riscrivere file interi per cambiare un dettaglio.
- Dopo ogni fase controlla il risultato con uno screenshot a 390px e a 1280px.
- Il sito è una demo: meta robots noindex e robots.txt chiuso finché non lo dico io.