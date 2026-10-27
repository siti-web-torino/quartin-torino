/* =====================================================================
   DATI DEL SITO — si cambiano solo qui.
   Regola: `null` = dato che non abbiamo → nel sito compare un riquadro
   [DA CONFERMARE]. `confermato: false` o `incerto: '…'` = dato letto con
   dubbio → si vede ma con il riquadro. Quando il locale conferma, metti
   `confermato: true` o togli `incerto`.
   ===================================================================== */
const QUARTIN = {
  via: 'Via Santa Giulia 21/D',
  zona: 'Vanchiglia, Torino',
  mappa: 'https://www.google.com/maps/search/?api=1&query=Quartin%2C%20Via%20Santa%20Giulia%2021%2FD%2C%20Torino',

  // Dal brief: una sola fonte giornalistica.
  apertura: { testo: 'Aperto dal 10 settembre 2026', confermato: false, nota: 'una sola fonte giornalistica' },

  // Letto in fondo a menu.png. Finché non è confermato non diventa un link da chiamare.
  telefono: { numero: '366 691 2120', confermato: false, nota: 'letto dal menu' },

  // Esempio: [{ giorni: 'Lunedì', ore: 'chiuso' }, { giorni: 'Martedì–Domenica', ore: '7:30–24:00' }]
  orari: null,

  // Esempio: { instagram: 'https://www.instagram.com/…', email: 'ciao@…' }
  social: null,

  notaMenu: '*chi ha la salute è ricco e non lo sa: per gli allergeni chiedi al bancone!',

  // Menu trascritto da menu.png (STUDIO.md, sezione 6). Prezzi in euro.
  // `prezzo` numero → scritto all'italiana (3.5 → 3,50); stringa → mostrata così com'è.
  menu: [
    {
      id: 'quartini', titolo: 'Quartini', prezzo: 7.5, foto: 'foto-menu-quartini',
      voci: [{ nome: 'Vino Bianco' }, { nome: 'Vino Rosso' }, { nome: 'Spritz' }, { nome: 'Vermouth' }],
      frase: 'Quello di cui (non) avevamo bisogno. Davvero.',
    },
    {
      id: 'imperdibili', titolo: 'Gli imperdibili',
      voci: [
        { nome: 'Il Sestetto Base', dettaglio: 'Amaro Averna, Amaro Ramazzotti, Amaro Lucano, Amaro Montenegro, Fernet Branca, Cynar', prezzo: 3, incerto: 'elenco degli amari' },
        { nome: 'Spritz', dettaglio: 'Aperol, Campari, Cynar', prezzo: 6 },
        { nome: 'Americano, Sbagliato', prezzo: 7 },
        { nome: 'Negroni, Gin Tonic, Paloma, Vodka Tonic', dettaglio: 'Per altri cocktail chiedere al barista', prezzo: 8, incerto: 'nota' },
        { nome: 'Vini al Calice', dettaglio: 'Il vino può cambiare in base alla disponibilità e all’offerta', prezzo: '5,9?', incerto: 'prezzo: 5,90 oppure da 5 a 9' },
      ],
    },
    {
      id: 'birre', titolo: 'Le birre', sottotitolo: 'Peroni',
      voci: [
        { nome: 'Birretta alla Spina', misura: '20 cl', prezzo: 2.5 },
        { nome: 'Birra alla Spina', misura: '40 cl', prezzo: 5 },
        { nome: 'Birra in Bottiglia 0 Alcol', misura: '33 cl', prezzo: 4, incerto: 'voce' },
      ],
    },
    {
      id: 'chiacchiere', titolo: 'Chiacchiere da bar',
      voci: [
        { nome: 'Bibite in Bottiglia', misura: '33 cl', dettaglio: 'Coca Cola, Coca Cola Zero, Tonica, Tonica al Pompelmo', prezzo: 3.5, incerto: 'elenco' },
        { nome: 'Soldatini', dettaglio: 'Crodino, Camparino', prezzo: 3, incerto: 'elenco' },
        { nome: 'Acqua', dettaglio: 'Naturale, Frizzante', prezzo: 1.5 },
        { nome: 'Succhi di Frutta', dettaglio: 'Ace, Albicocca, Pesca, Pera', prezzo: 3, incerto: 'gusti' },
        { nome: 'Caffè', prezzo: 1.5 },
        { nome: 'Caffè Corretto', prezzo: 2.5 },
      ],
    },
    {
      id: 'salato', titolo: 'Salato di Quartin',
      voci: [
        { nome: 'Olive Piccanti', prezzo: 3 },
        { nome: 'Cabaret Mix*', dettaglio: 'Un assaggio di tutto', prezzo: 12 },
        { nome: 'Goccino del Diavolo*', prezzo: 4.5, incerto: 'nome' },
        { nome: 'Gorgonzola, Cetriolini e Grissini*', prezzo: 5, incerto: 'nome' },
        { nome: 'Peperoncini Farciti*', prezzo: 5.5 },
        { nome: 'Salame, Paglierina e Taralli*', prezzo: 5.5, incerto: 'nome' },
        { nome: 'Patatine', prezzo: 2.5 },
        { nome: 'Alici e Burro*', prezzo: 6 },
      ],
    },
    {
      id: 'focaccine', titolo: 'Le focaccine',
      voci: [
        { nome: 'Bianca*', prezzo: 2.5 },
        { nome: 'Spolverata con Grana*', dettaglio: 'Con Grana Padano', prezzo: 3 },
        { nome: 'La Classica*', dettaglio: 'Edamer, Prosciutto Cotto e Maionese', prezzo: 7, incerto: 'ingredienti' },
        { nome: 'La Vegetariana*', dettaglio: 'Edamer, Frittata e Maionese', prezzo: 6, incerto: 'ingredienti' },
      ],
    },
    {
      id: 'dolci', titolo: 'I più dolci', foto: 'foto-menu-dolci',
      voci: [
        { nome: 'Pippo il Biscotto*', dettaglio: 'Gelato tra due cialde di biscotto al gusto di: Crema, Stracciatella, Fior di Latte, Cioccolato, Pistacchio, Nocciola', prezzo: 3.5, incerto: 'gusti' },
        { nome: 'Pippo Pucciato con Gianduia*', dettaglio: 'Il nostro Biscotto con Gianduia', prezzo: 4.5, incerto: 'voce' },
      ],
      nota: { testo: 'Coppetta d’acciaio al tavolo o coppetta da passeggio per l’asporto!', incerto: 'nota' },
    },
    {
      id: 'soft', titolo: 'Gelato soft',
      voci: [{ nome: 'Gusto Fior di Latte*', prezzo: 3 }],
    },
    {
      id: 'coppe', titolo: 'Le coppe',
      voci: [{
        nome: 'Gusto Fior di Latte Variegato con:', prezzo: 4, incerto: 'nomi dei variegati, soprattutto «Babà»',
        opzioni: ['Amarena con Amaretto e Cioccolato*', 'Babà con Granella di Biscotti e/o Meliga*', 'Gianduia con Granella di Nocciole*', 'Tiramisù*'],
      }],
    },
  ],
};

/* =====================================================================
   Da qui in giù non serve toccare niente per cambiare i contenuti.
   ===================================================================== */

const crea = (tag, classe, testo) => {
  const el = document.createElement(tag);
  if (classe) el.className = classe;
  if (testo != null) el.textContent = testo;
  return el;
};

const daConfermare = (nota) => crea('span', 'dc', `[DA CONFERMARE]${nota ? ' ' + nota : ''}`);

const formatoPrezzo = (p) => (typeof p === 'number'
  ? p.toLocaleString('it-IT', { minimumFractionDigits: Number.isInteger(p) ? 0 : 2 })
  : p);

const prezzo = (p) => {
  const el = crea('span', 'prezzo');
  el.append(crea('span', 'vh', 'euro '), formatoPrezzo(p));
  return el;
};

function riempiTesti() {
  for (const el of document.querySelectorAll('[data-q]')) {
    const valore = QUARTIN[el.dataset.q];
    if (typeof valore === 'string') el.textContent = valore;
  }
  for (const a of document.querySelectorAll('[data-q-mappa]')) a.href = QUARTIN.mappa;

  const apertura = document.querySelector('[data-q-apertura]');
  if (apertura) {
    apertura.replaceChildren(crea('span', '', QUARTIN.apertura.testo));
    if (!QUARTIN.apertura.confermato) apertura.append(daConfermare(QUARTIN.apertura.nota));
  }
}

function riempiContatti() {
  const orari = document.querySelector('[data-q-orari]');
  if (orari && Array.isArray(QUARTIN.orari) && QUARTIN.orari.length) {
    const tabella = crea('dl', 'orari-tabella');
    for (const { giorni, ore } of QUARTIN.orari) tabella.append(crea('dt', '', giorni), crea('dd', '', ore));
    orari.replaceChildren(tabella);
  }

  const tel = document.querySelector('[data-q-telefono]');
  if (tel && QUARTIN.telefono && QUARTIN.telefono.numero) {
    const { numero, confermato, nota } = QUARTIN.telefono;
    if (confermato) {
      const link = crea('a', '', numero);
      link.href = `tel:+39${numero.replace(/\D/g, '')}`;
      tel.replaceChildren(link);
    } else {
      tel.replaceChildren(crea('span', '', numero), document.createElement('br'), daConfermare(nota));
    }
  }

  const social = document.querySelector('[data-q-social]');
  if (social && QUARTIN.social) {
    const voci = [];
    if (QUARTIN.social.instagram) {
      const a = crea('a', '', 'Instagram');
      a.href = QUARTIN.social.instagram;
      a.rel = 'noopener';
      voci.push(a);
    }
    if (QUARTIN.social.email) {
      const a = crea('a', '', QUARTIN.social.email);
      a.href = `mailto:${QUARTIN.social.email}`;
      voci.push(a);
    }
    if (voci.length) social.replaceChildren(...voci.flatMap((v, i) => (i ? [document.createElement('br'), v] : [v])));
  }
}

function voceMenu(v) {
  const li = crea('li', 'voce');
  const riga = crea('div', 'voce-riga');
  const nome = crea('span', 'voce-nome', v.nome);
  if (v.misura) nome.append(' ', crea('span', 'voce-misura', v.misura));
  riga.append(nome);
  if (v.prezzo != null) riga.append(prezzo(v.prezzo));
  li.append(riga);
  if (v.dettaglio) li.append(crea('p', 'voce-dettaglio', v.dettaglio));
  if (v.opzioni) {
    const ul = crea('ul', 'voce-opzioni');
    for (const o of v.opzioni) ul.append(crea('li', '', o));
    li.append(ul);
  }
  if (v.incerto) li.append(daConfermare(`lettura incerta: ${v.incerto}`));
  return li;
}

function riempiMenu() {
  const contenitore = document.querySelector('[data-q-menu]');
  const indice = document.querySelector('[data-q-indice]');
  if (!contenitore) return;

  const frammento = document.createDocumentFragment();
  for (const gruppo of QUARTIN.menu) {
    const sezione = crea('section', 'menu-gruppo');
    sezione.id = `menu-${gruppo.id}`;
    sezione.setAttribute('aria-labelledby', `menu-${gruppo.id}-titolo`);

    const titolo = crea('h3', 'menu-gruppo-titolo');
    titolo.id = `menu-${gruppo.id}-titolo`;
    const testoTitolo = crea('span', '', gruppo.titolo);
    if (gruppo.sottotitolo) testoTitolo.append(' ', crea('span', 'menu-gruppo-sotto', `| ${gruppo.sottotitolo}`));
    titolo.append(testoTitolo);
    if (gruppo.prezzo != null) titolo.append(prezzo(gruppo.prezzo));
    sezione.append(titolo);

    const lista = crea('ul', 'voci');
    for (const v of gruppo.voci) lista.append(voceMenu(v));
    sezione.append(lista);

    if (gruppo.frase) sezione.append(crea('p', 'menu-frase', gruppo.frase));
    if (gruppo.nota) {
      const nota = crea('p', 'menu-gruppo-nota', gruppo.nota.testo);
      sezione.append(nota);
      if (gruppo.nota.incerto) sezione.append(daConfermare(`lettura incerta: ${gruppo.nota.incerto}`));
    }

    frammento.append(sezione);

    const modello = gruppo.foto && document.getElementById(gruppo.foto);
    if (modello) {
      const foto = modello.content.firstElementChild.cloneNode(true);
      foto.classList.add(gruppo.foto);
      frammento.append(foto);
    }

    if (indice) {
      const li = crea('li');
      const a = crea('a', '', gruppo.titolo);
      a.href = `#menu-${gruppo.id}`;
      li.append(a);
      indice.append(li);
    }
  }
  contenitore.replaceChildren(frammento);
}

function navigazione() {
  const bottone = document.querySelector('.nav-bottone');
  const lista = document.getElementById('nav-lista');
  if (!bottone || !lista) return;
  const chiudi = () => bottone.setAttribute('aria-expanded', 'false');
  bottone.addEventListener('click', () => {
    bottone.setAttribute('aria-expanded', String(bottone.getAttribute('aria-expanded') !== 'true'));
  });
  lista.addEventListener('click', (e) => { if (e.target.closest('a')) chiudi(); });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && bottone.getAttribute('aria-expanded') === 'true') { chiudi(); bottone.focus(); }
  });
}

riempiTesti();
riempiContatti();
riempiMenu();
navigazione();
