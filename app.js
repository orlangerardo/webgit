'use strict';

// Lógica y pantallas del juego. Los datos del caso están en caso.js.

const CLAVE = 'cata-a-ciegas.v1';
const PUNTOS_DILIGENCIAS = 5;
const COSTO_PISTA = 3;

// [id, etiqueta, grupo]: el grupo separa el expediente de la investigación.
const TABS = [
  ['inicio', 'Inicio', 'expediente'],
  ['caso', 'Caso', 'expediente'],
  ['victima', 'Víctima', 'expediente'],
  ['escena', 'Escena', 'expediente'],
  ['personas', 'Personas', 'expediente'],
  ['pruebas', 'Pruebas', 'expediente'],
  ['diligencias', 'Diligencias', 'investigacion'],
  ['confrontar', 'Confrontar', 'investigacion'],
  ['libreta', 'Libreta', 'investigacion'],
  ['resolucion', 'Resolver', 'final']
];

// ---------- utilidades ----------

function h(tag, attrs, ...kids) {
  const el = document.createElement(tag);
  for (const [k, v] of Object.entries(attrs || {})) {
    if (v == null || v === false) continue;
    if (k === 'class') el.className = v;
    else if (k.startsWith('on')) el.addEventListener(k.slice(2), v);
    else if (['value', 'checked', 'disabled', 'hidden', 'required', 'selected'].includes(k)) el[k] = v;
    else el.setAttribute(k, v === true ? '' : v);
  }
  const add = kid => {
    if (kid == null || kid === false) return;
    if (Array.isArray(kid)) kid.forEach(add);
    else el.append(kid instanceof Node ? kid : document.createTextNode(String(kid)));
  };
  kids.forEach(add);
  return el;
}

function tabla(cabecera, filas, clase) {
  return h('div', { class: 'tabla-wrap' },
    h('table', { class: clase || '' },
      cabecera ? h('thead', null, h('tr', null, cabecera.map(c => h('th', null, c)))) : null,
      h('tbody', null, filas.map(f => h('tr', null, f.map((c, i) => (i === 0 && !cabecera ? h('th', { scope: 'row' }, c) : h('td', null, c))))))
    ));
}

function figura(src, alt, pie, clase) {
  return h('figure', { class: 'figura ' + (clase || '') },
    h('img', { src, alt, loading: 'lazy' }),
    pie ? h('figcaption', null, pie) : null);
}

function seccion(titulo, ...contenido) {
  return h('section', { class: 'hoja' }, titulo ? h('h2', null, titulo) : null, contenido);
}

const nombre = id => CASO.nombres[id] || id;
const clave = (d, obj) => (obj ? d + ':' + obj : d);

// ---------- estado ----------

function estadoInicial() {
  return {
    tab: 'inicio',
    diligencias: [],
    pistas: 0,
    notas: '',
    matriz: {},
    confrontaciones: [],
    resp: { culpable: '', movil: '', lugar: '', origen: '', momento: '', pruebas: [], mentiras: [{ p: '', r: '' }, { p: '', r: '' }, { p: '', r: '' }] },
    paso: 0,
    resultado: null
  };
}

function cargar() {
  const base = estadoInicial();
  try {
    const j = JSON.parse(localStorage.getItem(CLAVE));
    if (!j || typeof j !== 'object') return base;
    const resp = { ...base.resp, ...(j.resp || {}) };
    if (!Array.isArray(resp.mentiras) || resp.mentiras.length !== 3) resp.mentiras = base.resp.mentiras;
    if (!Array.isArray(resp.pruebas)) resp.pruebas = [];
    return { ...base, ...j, resp };
  } catch {
    return base;
  }
}

let S = cargar();

function guardar() {
  try { localStorage.setItem(CLAVE, JSON.stringify(S)); } catch { /* sin almacenamiento: el juego sigue */ }
}

const puntosGastados = () => S.diligencias.reduce((a, d) => a + d.costo, 0);
const puntosRestantes = () => PUNTOS_DILIGENCIAS - puntosGastados();
const obtenidas = () => S.diligencias.filter(d => d.ok);
const tieneResultado = k => obtenidas().some(d => d.key === k);

// ---------- navegación ----------

function ir(tab) {
  S.tab = tab;
  guardar();
  render();
  window.scrollTo({ top: 0 });
}

function renderCabecera() {
  const nav = $('#nav');
  const botones = [];
  TABS.forEach(([id, texto, grupo], i) => {
    if (i > 0 && TABS[i - 1][2] !== grupo && grupo !== 'final') botones.push(h('span', { class: 'sep', 'aria-hidden': 'true' }));
    botones.push(h('button', {
      type: 'button', class: 'tab' + (grupo === 'final' ? ' tab-final' : ''),
      'aria-current': S.tab === id ? 'page' : null, onclick: () => ir(id)
    }, texto));
  });
  nav.replaceChildren(...botones);
  // En pantallas angostas la barra se desplaza: dejar visible la pestaña activa.
  const activa = nav.querySelector('[aria-current="page"]');
  if (activa) nav.scrollLeft = activa.offsetLeft - (nav.clientWidth - activa.offsetWidth) / 2;
  $('#chip-puntos').textContent = `Diligencias: ${puntosRestantes()}/${PUNTOS_DILIGENCIAS} pts`;
  $('#chip-pistas').textContent = `Pistas: ${S.pistas}/${CASO.pistas.length}`;
}

function $(sel) { return document.querySelector(sel); }

function render() {
  renderCabecera();
  const vistas = { inicio: vInicio, caso: vCaso, victima: vVictima, escena: vEscena, personas: vPersonas,
    pruebas: vPruebas, diligencias: vDiligencias, confrontar: vConfrontar, libreta: vLibreta, resolucion: vResolucion };
  $('#vista').replaceChildren((vistas[S.tab] || vInicio)());
  const rapidas = $('#notas-rapidas');
  if (rapidas && document.activeElement !== rapidas) rapidas.value = S.notas;
}

// ---------- vistas de lectura ----------

function vInicio() {
  const c = CASO.carta;
  return h('div', null,
    h('section', { class: 'hoja portada' },
      h('img', { src: 'assets/portada.jpg', alt: 'Portada del expediente N.º 000: Cata a Ciegas, muerte de Tomás Etchegaray Larraín' }),
      h('div', null,
        h('p', { class: 'etiqueta' }, 'Expediente Noir · Caso de regalo'),
        h('h2', null, 'Cata a ciegas'),
        h('p', null, 'Un hombre muere envenenado en mitad de su propia cata, en una casona aislada por el temporal. Cinco personas, un solo culpable y muchas mentiras que no tienen que ver con el crimen.'),
        h('ul', { class: 'datos-caso' },
          h('li', null, h('strong', null, '5'), ' sospechosos'),
          h('li', null, h('strong', null, '45–60'), ' minutos'),
          h('li', null, h('strong', null, '16+'), ' años')),
        h('button', { type: 'button', class: 'primario', onclick: () => ir('caso') }, 'Abrir el expediente'))),
    seccion('Carta de encargo',
      h('p', { class: 'fecha' }, c.fecha),
      h('p', null, h('em', null, 'Equipo:')),
      c.parrafos.map(p => h('p', null, p)),
      h('p', { class: 'firma' }, c.firma)),
    seccion('Cómo se juega',
      h('ul', { class: 'lista' },
        h('li', null, 'Lean el expediente completo: el caso, la víctima, la escena, las cinco declaraciones y los anexos. Anoten las contradicciones en la ', h('strong', null, 'Libreta'), '.'),
        h('li', null, `Tienen ${PUNTOS_DILIGENCIAS} puntos para pedir diligencias. Cada pedido exige una razón apoyada en el expediente; sin fundamento, el resultado es «Sin hallazgos» y el punto se pierde igual.`),
        h('li', null, 'Pueden ', h('strong', null, 'confrontar'), ' gratis a una persona con una prueba concreta: un anexo, una declaración o un resultado de diligencia.'),
        h('li', null, `Si se atascan, pueden pedir hasta ${CASO.pistas.length} pistas: cada una resta ${COSTO_PISTA} puntos al final.`),
        h('li', null, 'Al terminar, completen la ', h('strong', null, 'Resolución'), ': quién lo hizo, por qué, cómo y cuándo, tres pruebas y tres mentiras que no son el homicidio. Máximo 100 puntos.')),
      h('p', { class: 'aviso' }, 'Contenido: un envenenamiento con un medicamento y alcohol, sin imágenes de cuerpos ni heridas. Obra de ficción: personajes, instituciones y hechos son inventados. Imágenes creadas con inteligencia artificial.')),
    h('div', { class: 'pie-inicio' },
      h('button', { type: 'button', class: 'secundario', onclick: reiniciar }, 'Empezar de nuevo')));
}

function vCaso() {
  const a = CASO.antecedentes;
  return h('div', null,
    seccion('Antecedentes',
      h('h3', null, 'Hechos'),
      a.hechos.map(p => h('p', null, p)),
      h('h3', null, 'Primeras diligencias (domingo 17/05)'),
      h('ul', { class: 'lista' }, a.primerasDiligencias.map(([hora, t]) => h('li', null, h('strong', null, hora + ' · '), t))),
      h('h3', null, 'Cronología provisoria (según las declaraciones)'),
      tabla(['Hora', 'Hecho', 'Fuente'], a.cronologia)),
    seccion('Planta de la casona',
      figura('assets/planta.png', 'Planta del primer piso de la casona', 'Planta del primer piso. Los dormitorios están en el segundo piso; la bodega histórica, en el subterráneo.')),
    seccion('Preguntas abiertas',
      h('ul', { class: 'lista' }, a.preguntasAbiertas.map(p => h('li', null, p)))));
}

function vVictima() {
  const v = CASO.victima;
  return h('div', null,
    seccion('La víctima',
      h('div', { class: 'ficha' },
        h('img', { src: 'assets/victima.jpg', alt: 'Retrato de Tomás Etchegaray Larraín' }),
        tabla(null, v.datos))),
    seccion('Informe de autopsia · IMF Metropolitano',
      tabla(null, v.autopsia),
      h('div', { class: 'destacado' }, h('strong', null, 'Conclusión pericial. '), v.conclusion)));
}

function vEscena() {
  return h('div', null,
    seccion('El comedor',
      figura('assets/croquis.png', 'Croquis del comedor con marcadores de evidencia numerados', 'Croquis del comedor. Los marcadores amarillos corresponden a la tabla de evidencias.')),
    seccion('Tabla de evidencias', tabla(['N.º', 'Evidencia', 'Observaciones'], CASO.escena)));
}

function vPersonas() {
  return h('div', null,
    h('p', { class: 'intro' }, 'Cinco personas compartieron la noche con Tomás. Casi todas mintieron en algo, pero solo una mató.'),
    CASO.personas.map(p =>
      h('details', { class: 'hoja persona' },
        h('summary', null,
          h('img', { src: p.foto, alt: 'Retrato de ' + p.nombre }),
          h('span', null, h('strong', null, `${p.ficha} · ${p.nombre}`), h('small', null, `${p.relacionCorta} · ${p.mesa}`))),
        h('div', { class: 'persona-cuerpo' },
          tabla(null, p.datos),
          h('h3', null, `Declaración ${p.ficha}`),
          h('p', { class: 'fecha' }, p.declaracion.cuando),
          h('div', { class: 'declaracion' }, p.declaracion.parrafos.map(t => h('p', null, t)))))));
}

function vPruebas() {
  const A = CASO.anexos;
  return h('div', null,
    seccion(A.A1.titulo,
      figura(A.A1.img, A.A1.alt, A.A1.pie),
      h('details', { class: 'transcripcion' }, h('summary', null, 'Ver transcripción'),
        h('ul', { class: 'lista' }, A.A1.transcripcion.map(t => h('li', null, t))))),
    seccion(A.A2.titulo, h('p', null, A.A2.intro), tabla(A.A2.cabecera, A.A2.filas), h('p', { class: 'nota' }, A.A2.nota)),
    seccion(A.A3.titulo, figura(A.A3.img, A.A3.alt, A.A3.pie, 'angosta'), h('p', null, A.A3.texto)),
    seccion(A.A4.titulo, figura(A.A4.img, A.A4.alt, A.A4.pie)),
    seccion(A.A5.titulo, figura(A.A5.img, A.A5.alt, A.A5.pie, 'angosta')),
    seccion(A.A6.titulo, h('p', null, A.A6.intro), tabla(A.A6.cabecera, A.A6.filas)));
}

// ---------- diligencias y pistas ----------

function vDiligencias() {
  const restantes = puntosRestantes();
  return h('div', null,
    h('section', { class: 'hoja' },
      h('h2', null, 'Pedir diligencias'),
      h('p', null, 'Al laboratorio le quedan ', h('strong', null, `${restantes} de ${PUNTOS_DILIGENCIAS} puntos`),
        '. Cada pedido necesita una razón apoyada en el expediente. Una razón que no se sostiene devuelve «Sin hallazgos» y el punto se pierde igual.'),
      h('div', { class: 'menu-dil' }, CASO.diligencias.map(d => {
        const sin = restantes < d.costo;
        return h('article', { class: 'tarjeta-dil' },
          h('header', null, h('span', { class: 'cod' }, d.id), h('span', { class: 'costo' }, `${d.costo} pt`)),
          h('h3', null, d.nombre),
          h('p', null, d.desc),
          h('p', { class: 'nota' }, 'Plazo: ' + d.plazo),
          h('button', { type: 'button', class: 'primario', disabled: sin, onclick: () => abrirPedido(d) }, sin ? 'Sin puntos' : 'Pedir'));
      }))),
    h('section', { class: 'hoja', id: 'registro' },
      h('h2', null, 'Registro de diligencias'),
      S.diligencias.length
        ? S.diligencias.map(registroDiligencia)
        : h('p', { class: 'vacio' }, 'Todavía no han pedido ninguna diligencia.')),
    h('section', { class: 'hoja' },
      h('h2', null, 'Pistas de ayuda'),
      h('p', null, `Cada pista resta ${COSTO_PISTA} puntos al puntaje final. Han usado ${S.pistas} de ${CASO.pistas.length}.`),
      CASO.pistas.slice(0, S.pistas).map((t, i) => h('div', { class: 'pista' }, h('strong', null, `Pista ${i + 1}. `), t)),
      S.pistas < CASO.pistas.length
        ? h('button', { type: 'button', class: 'secundario', onclick: pedirPista }, `Pedir la pista ${S.pistas + 1} (−${COSTO_PISTA} pts)`)
        : null));
}

function registroDiligencia(d) {
  const def = CASO.diligencias.find(x => x.id === d.id);
  const fund = CASO.fundamentos.find(f => f.id === d.fund);
  const res = d.ok ? resultadoDe(d.key) : null;
  return h('article', { class: 'registro ' + (d.ok ? 'ok' : 'vano') },
    h('header', null,
      h('strong', null, `${d.id} · ${def.nombre}${d.obj ? ' — ' + nombre(d.obj) : ''}`),
      h('span', { class: 'costo' }, `${d.costo} pt`)),
    h('p', { class: 'razon' }, h('em', null, 'Razón: '), fund.txt),
    d.ok
      ? h('div', { class: 'resultado' }, h('p', null, res.texto), res.img ? figura(res.img, res.alt) : null)
      : h('p', { class: 'resultado sin' }, 'Sin hallazgos. La razón dada no conduce a nada en este pedido.'));
}

function resultadoDe(k) {
  if (CASO.resultados[k]) return CASO.resultados[k];
  if (k.startsWith('D02:')) return CASO.resultados['D02:otros'];
  return { texto: 'Sin hallazgos.' };
}

function abrirPedido(d) {
  const dlg = $('#dlg');
  const error = h('p', { class: 'error', role: 'alert', hidden: true });
  const objetivo = d.objetivos
    ? h('label', null, d.etiquetaObjetivo,
        h('select', { name: 'objetivo', required: true },
          h('option', { value: '' }, 'Elegir…'),
          d.objetivos.map(o => {
            const ya = tieneResultado(clave(d.id, o));
            return h('option', { value: o, disabled: ya }, nombre(o) + (ya ? ' (ya obtenido)' : ''));
          })))
    : null;

  const form = h('form', { class: 'dlg-form', onsubmit: e => {
    e.preventDefault();
    const datos = new FormData(form);
    const obj = d.objetivos ? datos.get('objetivo') : null;
    const fundId = datos.get('fund');
    const k = clave(d.id, obj);
    if (tieneResultado(k)) {
      error.textContent = 'Ya tienen este resultado en el registro.';
      error.hidden = false;
      return;
    }
    if (puntosRestantes() < d.costo) {
      error.textContent = 'No les quedan puntos suficientes para este pedido.';
      error.hidden = false;
      return;
    }
    const fund = CASO.fundamentos.find(f => f.id === fundId);
    S.diligencias.push({ id: d.id, obj, key: k, fund: fundId, ok: fund.sirve.includes(k), costo: d.costo });
    guardar();
    dlg.close();
    render();
    $('#registro')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  } },
    h('div', { class: 'dlg-cabeza' },
      h('h2', null, `${d.id} · ${d.nombre}`),
      h('p', { class: 'nota' }, `${d.desc} Cuesta ${d.costo} pt; les quedan ${puntosRestantes()}.`),
      objetivo),
    h('div', { class: 'dlg-cuerpo' },
      h('fieldset', null,
        h('legend', null, '¿Qué buscan y por qué?'),
        CASO.fundamentos.map((f, i) =>
          h('label', { class: 'opcion' },
            h('input', { type: 'radio', name: 'fund', value: f.id, required: i === 0 }),
            h('span', null, f.txt))))),
    h('div', { class: 'dlg-pie' },
      error,
      h('div', { class: 'acciones' },
        h('button', { type: 'button', class: 'secundario', onclick: () => dlg.close() }, 'Cancelar'),
        h('button', { type: 'submit', class: 'primario' }, `Pedir (${d.costo} pt)`))));
  abrirDialogo(form);
}

function abrirDialogo(contenido) {
  const dlg = $('#dlg');
  dlg.replaceChildren(contenido);
  if (!dlg.open) dlg.showModal();
}

function pedirPista() {
  if (S.pistas >= CASO.pistas.length) return;
  if (!confirm(`Cada pista resta ${COSTO_PISTA} puntos a su puntaje final. ¿Pedir la pista ${S.pistas + 1}?`)) return;
  S.pistas += 1;
  guardar();
  render();
}

// ---------- confrontaciones ----------

function evidenciasDisponibles() {
  const decl = CASO.personas.map(p => ({ id: 'decl_' + p.id, grupo: 'Declaraciones', txt: `Declaración de ${p.corto} (${p.ficha})` }));
  const anexos = Object.keys(CASO.anexos).map(k => ({ id: k, grupo: 'Anexos', txt: CASO.anexos[k].titulo }));
  const res = obtenidas().map(d => {
    const def = CASO.diligencias.find(x => x.id === d.id);
    return { id: d.key, grupo: 'Resultados de diligencias', txt: `${d.id} · ${def.nombre}${d.obj ? ' — ' + nombre(d.obj) : ''}` };
  });
  return [...decl, ...anexos, ...res];
}

// Devuelve la respuesta de la persona confrontada con las pruebas presentadas.
function confrontar(persona, ids) {
  const tiene = k => ids.includes(k);
  const R = CASO.reinterrogatorios[persona];
  if (persona === 'rosa') return { ok: false, texto: R.cualquiera, confesion: false };
  if (persona === 'bruno') {
    const pruebas = [tiene('decl_rosa'), tiene('D01:valentina'), tiene('D04'), tiene('D05:bruno') || tiene('D01:bruno')];
    if (pruebas.filter(Boolean).length >= 2) return { ok: true, texto: R.confesion, confesion: true };
    return { ok: false, texto: R.sin, confesion: false };
  }
  if (persona === 'ines') return tiene('D01:ines') || tiene('decl_rosa') ? { ok: true, texto: R.admite } : { ok: false, texto: R.sin };
  if (persona === 'valentina') return tiene('D01:valentina') || tiene('decl_rosa') ? { ok: true, texto: R.admite } : { ok: false, texto: R.sin };
  if (persona === 'gaspar') {
    const n = [tiene('A3'), tiene('A4'), tiene('decl_rosa')].filter(Boolean).length;
    return n >= 2 ? { ok: true, texto: R.admite } : { ok: false, texto: R.sin };
  }
  return { ok: false, texto: 'No tiene nada que agregar.' };
}

function vConfrontar() {
  const evid = evidenciasDisponibles();
  const grupos = [...new Set(evid.map(e => e.grupo))];
  const error = h('p', { class: 'error', role: 'alert', hidden: true });
  const form = h('form', { class: 'hoja', onsubmit: e => {
    e.preventDefault();
    const datos = new FormData(form);
    const persona = datos.get('persona');
    const ids = datos.getAll('ev');
    if (!ids.length) {
      error.textContent = 'Elijan al menos una prueba para presentar.';
      error.hidden = false;
      return;
    }
    const r = confrontar(persona, ids);
    S.confrontaciones.push({
      persona,
      pruebas: ids.map(id => evid.find(e => e.id === id).txt),
      respuesta: r.texto,
      ok: r.ok
    });
    guardar();
    render();
    $('#registro-conf')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  } },
    h('h2', null, 'Confrontar a una persona'),
    h('p', null, 'Presenten una o más pruebas concretas a una persona. No cuesta puntos, pero la persona solo cede si la prueba la compromete.'),
    h('label', null, 'Persona',
      h('select', { name: 'persona' }, CASO.personas.map(p => h('option', { value: p.id }, p.nombre)))),
    h('fieldset', null,
      h('legend', null, 'Pruebas a presentar'),
      grupos.map(g => h('div', { class: 'grupo-ev' },
        h('h3', null, g),
        evid.filter(e => e.grupo === g).map(e =>
          h('label', { class: 'opcion' }, h('input', { type: 'checkbox', name: 'ev', value: e.id }), h('span', null, e.txt)))))),
    error,
    h('button', { type: 'submit', class: 'primario' }, 'Confrontar'));

  return h('div', null, form,
    h('section', { class: 'hoja', id: 'registro-conf' },
      h('h2', null, 'Registro de confrontaciones'),
      S.confrontaciones.length
        ? S.confrontaciones.map(c => h('article', { class: 'registro ' + (c.ok ? 'ok' : 'vano') },
            h('header', null, h('strong', null, `Confrontación a ${nombre(c.persona)}`)),
            h('p', { class: 'razon' }, h('em', null, 'Pruebas: '), c.pruebas.join(' · ')),
            Array.isArray(c.respuesta)
              ? h('div', { class: 'resultado confesion' }, c.respuesta.map(t => h('p', null, t)))
              : h('p', { class: 'resultado' }, c.respuesta)))
        : h('p', { class: 'vacio' }, 'Todavía no han confrontado a nadie.')));
}

// ---------- libreta ----------

function vLibreta() {
  const cols = [['movil', 'Móvil'], ['copa', 'Acceso a la copa'], ['farmaco', 'Acceso al fármaco'], ['mentira', 'Mentira detectada']];

  const celda = (p, [k, t]) => {
    const alEscribir = e => {
      S.matriz[p.id] = { ...(S.matriz[p.id] || {}), [k]: e.target.value };
      guardar();
    };
    return h('td', null, h('input', {
      type: 'text', 'aria-label': `${t} de ${p.corto}`, value: (S.matriz[p.id] || {})[k] || '', oninput: alEscribir
    }));
  };
  const fila = p => h('tr', null, h('th', { scope: 'row' }, p.corto), cols.map(c => celda(p, c)));

  const notas = h('textarea', {
    class: 'notas', rows: 10, 'aria-label': 'Notas del equipo', placeholder: 'Ej.: Gaspar dice «ninguna Saavedra»…',
    value: S.notas, oninput: e => { S.notas = e.target.value; guardar(); $('#notas-rapidas').value = S.notas; }
  });
  const matriz = h('div', { class: 'tabla-wrap' },
    h('table', { class: 'matriz' },
      h('thead', null, h('tr', null, h('th', null, 'Persona'), cols.map(([, t]) => h('th', null, t)))),
      h('tbody', null, CASO.personas.map(fila))));

  return h('div', null,
    seccion('Notas del equipo', h('p', null, 'Anoten contradicciones, horas y sospechas. Se guardan en este navegador.'), notas),
    seccion('Matriz de sospechosos', matriz));
}

// ---------- resolución ----------

function selectOpciones(opciones, valor, onchange, etiqueta) {
  return h('select', { 'aria-label': etiqueta, onchange: e => onchange(e.target.value) },
    h('option', { value: '' }, 'Elegir…'),
    opciones.map(o => h('option', { value: o.id, selected: o.id === valor }, o.txt)));
}

// Pasos de la hoja de resolución. «listo» indica si el paso tiene respuesta completa.
const PASOS = [
  { titulo: 'Culpable', pregunta: '¿Quién mató a Tomás?', pts: 30, listo: r => !!r.culpable },
  { titulo: 'Móvil', pregunta: '¿Por qué lo hizo?', pts: 20, listo: r => !!r.movil },
  { titulo: 'Método', pregunta: '¿Cómo y cuándo lo envenenó?', pts: 20, listo: r => !!(r.lugar && r.origen && r.momento) },
  { titulo: 'Pruebas', pregunta: 'Tres pruebas independientes', pts: 15, listo: r => r.pruebas.length === 3 },
  { titulo: 'Mentiras', pregunta: 'Tres mentiras que NO son el homicidio', pts: 15, listo: r => r.mentiras.every(m => m.p && m.r) },
  { titulo: 'Entregar', pregunta: 'Revisen y entreguen', pts: null, listo: () => false }
];

function irPaso(i) {
  S.paso = i;
  guardar();
  render();
  window.scrollTo({ top: 0 });
}

function vResolucion() {
  if (S.resultado) return vResultado();
  const R = CASO.resolucion;
  const r = S.resp;
  const paso = Math.min(Math.max(S.paso || 0, 0), PASOS.length - 1);
  const def = PASOS[paso];

  const barra = h('ol', { class: 'pasos' });
  const pintarBarra = () => barra.replaceChildren(...PASOS.map((p, i) => h('li', null,
    h('button', {
      type: 'button', 'data-paso': i, onclick: () => irPaso(i),
      class: 'paso' + (i === paso ? ' actual' : '') + (p.listo(r) ? ' listo' : ''),
      'aria-current': i === paso ? 'step' : null,
      'aria-label': `Paso ${i + 1}: ${p.titulo}${p.listo(r) ? ' (respondido)' : ''}`
    },
      h('span', { class: 'num', 'aria-hidden': 'true' }, p.listo(r) ? '✓' : String(i + 1)),
      h('span', { class: 'txt' }, p.titulo)))));
  const set = (k, v) => { r[k] = v; guardar(); pintarBarra(); };

  const radios = (grupo, k) => h('div', { class: 'radios' }, grupo.map(o =>
    h('label', { class: 'opcion' },
      h('input', { type: 'radio', name: k, value: o.id, checked: r[k] === o.id, onchange: () => set(k, o.id) }),
      h('span', null, o.txt))));

  const cuerpos = [
    () => radios(CASO.personas.map(p => ({ id: p.id, txt: p.nombre })), 'culpable'),
    () => radios(R.movil, 'movil'),
    () => [
      h('h3', null, 'Dónde estaba el veneno'), radios(R.lugar, 'lugar'),
      h('h3', null, 'De dónde salió'), radios(R.origen, 'origen'),
      h('h3', null, 'Cuándo lo colocó'), radios(R.momento, 'momento')
    ],
    () => {
      const contador = h('p', { class: 'nota contador' }, `${r.pruebas.length} de 3 elegidas`);
      const lista = h('div', { class: 'radios' }, R.pruebas.map(o =>
        h('label', { class: 'opcion' },
          h('input', { type: 'checkbox', value: o.id, checked: r.pruebas.includes(o.id), onchange: e => {
            const marcadas = new Set(r.pruebas);
            if (e.target.checked) {
              if (marcadas.size >= 3) { e.target.checked = false; return; }
              marcadas.add(o.id);
            } else marcadas.delete(o.id);
            r.pruebas = [...marcadas];
            guardar();
            pintarBarra();
            contador.textContent = `${r.pruebas.length} de 3 elegidas`;
          } }),
          h('span', null, o.txt))));
      return [h('p', null, 'Elijan exactamente tres. Cada una suma si viene de una fuente distinta.'), lista, contador];
    },
    () => [
      h('p', null, 'Casi todos mintieron en algo. Elijan tres mentiras que no tienen que ver con el crimen, con la razón de cada una.'),
      r.mentiras.map((m, i) => h('div', { class: 'mentira' },
        h('strong', null, `Mentira ${i + 1}`),
        h('label', null, 'Persona',
          selectOpciones(CASO.personas.map(p => ({ id: p.id, txt: p.corto })), m.p, v => { m.p = v; guardar(); pintarBarra(); }, `Persona de la mentira ${i + 1}`)),
        h('label', null, 'Razón',
          selectOpciones(R.razones, m.r, v => { m.r = v; guardar(); pintarBarra(); }, `Razón de la mentira ${i + 1}`))))
    ],
    () => entrega.nodos
  ];

  const entrega = paso === PASOS.length - 1 ? vEntregar() : null;
  pintarBarra();
  const anterior = paso > 0
    ? h('button', { type: 'button', class: 'secundario', onclick: () => irPaso(paso - 1) }, '← Anterior')
    : h('span');
  const siguiente = paso < PASOS.length - 1
    ? h('button', { type: 'button', class: 'primario', onclick: () => irPaso(paso + 1) }, paso === PASOS.length - 2 ? 'Revisar →' : 'Siguiente →')
    : entrega.boton;

  return h('div', null,
    h('section', { class: 'hoja' },
      h('h2', null, 'Hoja de resolución'),
      h('p', { class: 'nota' }, `Máximo 100 puntos, menos ${COSTO_PISTA} por cada pista usada (llevan ${S.pistas}). Sus respuestas se guardan solas.`),
      barra),
    h('section', { class: 'hoja' },
      h('p', { class: 'etiqueta' }, `Paso ${paso + 1} de ${PASOS.length}${def.pts ? ` · ${def.pts} pts` : ''}`),
      h('h2', null, def.pregunta),
      cuerpos[paso](),
      h('div', { class: 'pasos-nav' }, anterior, siguiente)));
}

function textoRespuesta(i) {
  const R = CASO.resolucion;
  const r = S.resp;
  const txt = (lista, id) => (lista.find(o => o.id === id) || {}).txt;
  switch (i) {
    case 0: return r.culpable ? [CASO.personas.find(p => p.id === r.culpable).nombre] : [];
    case 1: return r.movil ? [txt(R.movil, r.movil)] : [];
    case 2: return [txt(R.lugar, r.lugar), txt(R.origen, r.origen), txt(R.momento, r.momento)].filter(Boolean);
    case 3: return r.pruebas.map(id => txt(R.pruebas, id));
    case 4: return r.mentiras.filter(m => m.p || m.r).map(m => `${m.p ? nombre(m.p) : '¿Quién?'}: ${txt(R.razones, m.r) || '¿Por qué?'}`);
    default: return [];
  }
}

function vEntregar() {
  const error = h('p', { class: 'error', role: 'alert', hidden: true });
  const filas = PASOS.slice(0, -1).map((p, i) => {
    const resp = textoRespuesta(i);
    return h('div', { class: 'resumen-fila' + (p.listo(S.resp) ? '' : ' falta') },
      h('div', null,
        h('strong', null, `${i + 1}. ${p.titulo}`),
        p.listo(S.resp) ? null : h('span', { class: 'falta-txt' }, ' · Falta completar'),
        resp.length ? h('ul', { class: 'lista' }, resp.map(t => h('li', null, t))) : h('p', { class: 'nota' }, 'Sin respuesta.')),
      h('button', { type: 'button', class: 'secundario chico', onclick: () => irPaso(i) }, 'Cambiar'));
  });

  const entregar = () => {
    const faltan = PASOS.slice(0, -1).filter(p => !p.listo(S.resp)).map(p => p.titulo);
    if (faltan.length) {
      error.textContent = `Falta completar: ${faltan.join(', ')}.`;
      error.hidden = false;
      return;
    }
    if (!confirm('¿Entregar la resolución? No se puede cambiar después.')) return;
    S.resultado = corregir(S.resp);
    guardar();
    render();
    window.scrollTo({ top: 0 });
  };

  return {
    nodos: [
      h('p', null, `Usaron ${puntosGastados()} de ${PUNTOS_DILIGENCIAS} puntos de diligencia y ${S.pistas} pistas.`),
      h('div', { class: 'resumen' }, filas),
      error
    ],
    boton: h('button', { type: 'button', class: 'primario', id: 'entregar', onclick: entregar }, 'Entregar resolución')
  };
}

function corregir(r) {
  const R = CASO.resolucion;
  const desglose = [];

  const p1 = r.culpable === 'bruno' ? 30 : 0;
  desglose.push({ n: '1. Culpable', pts: p1, max: 30, det: p1 ? 'Bruno Contreras Saavedra.' : `Eligieron a ${nombre(r.culpable)}. El culpable es Bruno Contreras Saavedra.` });

  const mov = R.movil.find(m => m.id === r.movil);
  desglose.push({ n: '2. Móvil', pts: mov.pts, max: 20,
    det: mov.pts === 20 ? 'Venganza por su madre, Carmen Saavedra, creadora del 94, despedida y borrada por Tomás.'
      : mov.pts === 10 ? 'Vincularon a Bruno con «C. Saavedra», pero falta la venganza: Tomás borró a Carmen de la historia del vino.'
      : 'No era ese el móvil: era venganza por su madre, Carmen Saavedra.' });

  const pCopa = r.lugar === 'copa4' ? 10 : 0;
  const pOrigen = r.origen === 'blister' && r.momento === 'antes' ? 10 : 0;
  desglose.push({ n: '3. Cómo y cuándo', pts: pCopa + pOrigen, max: 20,
    det: `${pCopa ? 'Veneno en la copa 4 (acierto).' : 'El veneno estaba en la copa 4, no en el vino.'} ${pOrigen ? 'Origen y momento correctos.' : 'Eran comprimidos molidos del blíster de Gaspar, untados en la copa antes de la cena (20:00–20:41).'}` });

  const vistos = new Set();
  let p4 = 0;
  for (const id of r.pruebas) {
    const o = R.pruebas.find(x => x.id === id);
    if (o && o.grupo && !vistos.has(o.grupo)) { vistos.add(o.grupo); p4 += 5; }
  }
  desglose.push({ n: '4. Tres pruebas', pts: p4, max: 15, det: `${p4 / 5} de 3 pruebas válidas y de fuentes distintas.` });

  const usados = new Set();
  let p5 = 0;
  for (const m of r.mentiras) {
    const v = R.mentirasValidas.find(x => x.p === m.p && x.r === m.r);
    if (v && !usados.has(v.p)) { usados.add(v.p); p5 += 5; }
  }
  desglose.push({ n: '5. Tres mentiras', pts: p5, max: 15, det: `${p5 / 5} de 3 mentiras inocentes con su razón.` });

  const bruto = desglose.reduce((a, d) => a + d.pts, 0);
  const penal = S.pistas * COSTO_PISTA;
  return { bruto, penal, total: Math.max(0, bruto - penal), desglose, diligencias: puntosGastados(), pistas: S.pistas };
}

function veredicto(t) {
  if (t >= 90) return 'Caso resuelto con maestría';
  if (t >= 70) return 'Buen trabajo, detective';
  if (t >= 40) return 'Caso a medias';
  return 'Hay que volver a leer el expediente';
}

function vResultado() {
  const res = S.resultado;
  const sol = CASO.solucion;
  return h('div', null,
    h('section', { class: 'hoja puntaje' },
      h('p', { class: 'etiqueta' }, 'Resolución entregada'),
      h('p', { class: 'grande-num' }, h('span', { 'data-testid': 'total' }, String(res.total)), h('small', null, ' / 100')),
      h('h2', null, veredicto(res.total)),
      h('p', null, `Respuestas: ${res.bruto} pts · Pistas usadas: ${res.pistas} (−${res.penal}) · Puntos de diligencia usados: ${res.diligencias} de ${PUNTOS_DILIGENCIAS} (desempata quien usó menos).`),
      tabla(['Pregunta', 'Puntos', 'Comentario'], res.desglose.map(d => [d.n, `${d.pts} / ${d.max}`, d.det]))),
    seccion('La solución', h('div', { class: 'destacado' }, sol.linea)),
    seccion('Lo que realmente pasó', sol.historia.map(p => h('p', null, p))),
    seccion('El giro final', h('blockquote', { class: 'giro' }, sol.giro)),
    seccion('Cómo encajan las pistas',
      figura('assets/tablero.jpg', 'Tablero del caso: las pistas convergen en el sommelier', 'Tablero del caso: las pistas que convergen en el sommelier.'),
      tabla(['Pista', 'Lectura engañosa', 'Lectura correcta'], sol.lecturas)),
    seccion('Cronología real', tabla(['Hora', 'Hecho'], sol.cronologia)),
    seccion('Mentiras que no son el homicidio',
      tabla(['Persona', 'Mentira', 'Verdad', 'Razón inocente'], sol.mentiras),
      h('p', { class: 'nota' }, sol.mentirasBruno),
      h('h3', null, 'Ruido (no conduce a nada)'),
      h('ul', { class: 'lista' }, sol.ruido.map(t => h('li', null, t)))),
    h('section', { class: 'hoja promo' }, h('p', null, CASO.promo)),
    h('div', { class: 'pie-inicio' },
      h('button', { type: 'button', class: 'secundario', onclick: reiniciar }, 'Jugar de nuevo')));
}

function reiniciar() {
  if (!confirm('Se borrará todo el progreso de este caso. ¿Empezar de nuevo?')) return;
  S = estadoInicial();
  guardar();
  render();
  window.scrollTo({ top: 0 });
}

// ---------- arranque ----------

// ---------- preferencias de lectura (por navegador) ----------

const CLAVE_PREFS = 'cata-a-ciegas.prefs';
const ESCALAS = [0.875, 1, 1.125, 1.25, 1.375];
const TEMAS = ['claro', 'oscuro', 'sistema'];

function cargarPrefs() {
  try {
    const p = JSON.parse(localStorage.getItem(CLAVE_PREFS)) || {};
    return { tema: TEMAS.includes(p.tema) ? p.tema : 'sistema', escala: ESCALAS.includes(p.escala) ? p.escala : 1 };
  } catch {
    return { tema: 'sistema', escala: 1 };
  }
}

let P = cargarPrefs();

function aplicarPrefs() {
  const raiz = document.documentElement;
  if (P.tema === 'sistema') delete raiz.dataset.theme;
  else raiz.dataset.theme = P.tema === 'oscuro' ? 'dark' : 'light';
  raiz.style.fontSize = P.escala * 100 + '%';
  $('#texto-valor').textContent = (P.escala * 100).toLocaleString('es-CL') + ' %';
  $('#texto-menos').disabled = P.escala === ESCALAS[0];
  $('#texto-mas').disabled = P.escala === ESCALAS[ESCALAS.length - 1];
  document.querySelectorAll('input[name="tema"]').forEach(i => { i.checked = i.value === P.tema; });
  try { localStorage.setItem(CLAVE_PREFS, JSON.stringify(P)); } catch { /* sin almacenamiento: vale para esta visita */ }
  posicionarAjustes();
}

function cambiarEscala(delta) {
  const i = ESCALAS.indexOf(P.escala) + delta;
  P.escala = ESCALAS[Math.min(Math.max(i, 0), ESCALAS.length - 1)];
  aplicarPrefs();
}

// Bajo su botón en escritorio; en celular el CSS lo convierte en hoja inferior.
function posicionarAjustes() {
  const panel = $('#ajustes');
  if (panel.hidden) return;
  const r = $('#btn-ajustes').getBoundingClientRect();
  panel.style.top = r.bottom + 8 + 'px';
  panel.style.right = Math.max(16, document.documentElement.clientWidth - r.right) + 'px';
}

function alternarAjustes(abrir) {
  const panel = $('#ajustes');
  const boton = $('#btn-ajustes');
  const abierto = abrir ?? panel.hidden;
  panel.hidden = !abierto;
  if (abierto) posicionarAjustes();
  boton.setAttribute('aria-expanded', String(abierto));
  if (abierto) panel.querySelector('button:not(:disabled), input:checked')?.focus();
}

function alternarNotas(abrir) {
  const cajon = $('#cajon');
  const boton = $('#btn-notas');
  const abierto = abrir ?? cajon.hidden;
  cajon.hidden = !abierto;
  boton.setAttribute('aria-expanded', String(abierto));
  if (abierto) {
    const t = $('#notas-rapidas');
    t.value = S.notas;
    t.focus();
  } else boton.focus();
}

document.addEventListener('DOMContentLoaded', () => {
  $('#dlg').addEventListener('click', e => { if (e.target === e.currentTarget) e.currentTarget.close(); });
  $('#btn-notas').addEventListener('click', () => alternarNotas());
  $('#cerrar-notas').addEventListener('click', () => alternarNotas(false));
  $('#notas-rapidas').addEventListener('input', e => {
    S.notas = e.target.value;
    guardar();
    const libreta = document.querySelector('#vista textarea.notas');
    if (libreta) libreta.value = S.notas;
  });
  $('#btn-ajustes').addEventListener('click', () => alternarAjustes());
  $('#texto-menos').addEventListener('click', () => cambiarEscala(-1));
  $('#texto-mas').addEventListener('click', () => cambiarEscala(1));
  document.querySelectorAll('input[name="tema"]').forEach(i => i.addEventListener('change', () => {
    P.tema = i.value;
    aplicarPrefs();
  }));
  window.addEventListener('resize', posicionarAjustes);
  document.addEventListener('click', e => {
    if (!$('#ajustes').hidden && !e.target.closest('#ajustes, #btn-ajustes')) alternarAjustes(false);
  });
  document.addEventListener('keydown', e => {
    if (e.key !== 'Escape' || $('#dlg').open) return;
    if (!$('#ajustes').hidden) { alternarAjustes(false); $('#btn-ajustes').focus(); }
    else if (!$('#cajon').hidden) alternarNotas(false);
  });
  aplicarPrefs();
  render();
});
