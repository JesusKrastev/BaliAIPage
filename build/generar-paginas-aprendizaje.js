#!/usr/bin/env node
/* ===== BALI AI — Genera una página estática por bloque de Aprendizaje =====
   Sin dependencias externas (solo fs/path de Node). Lee data/aprendizaje.js y,
   por cada bloque con `disponible:true`, escribe aprendizaje/<id>.html con:
   title/description/canonical propios, Open Graph, JSON-LD (BreadcrumbList +
   FAQPage) y el contenido del bloque ya renderizado (no una cáscara vacía a la
   espera de JS) — así cada tema puede indexarse y rankear por separado.

   Se ejecuta como paso de build en el hosting (ver package.json) y también a
   mano con: node build/generar-paginas-aprendizaje.js

   Los bloques `disponible:false` no generan página — no hay contenido real
   que indexar todavía. */

var fs = require('fs');
var path = require('path');

var ROOT = path.join(__dirname, '..');
var SITE_URL = 'https://baliai.es';
var BLOQUES = require(path.join(ROOT, 'data', 'aprendizaje.js'));
var AprendizajeDetalle = require(path.join(ROOT, 'js', 'aprendizaje-detalle.js'));
var OUT_DIR = path.join(ROOT, 'aprendizaje');

// Title (<=60 car.) y meta description (~150-160 car.) escritos a mano para
// los bloques ya publicados: da mejor resultado en buscadores que un patrón
// genérico. Si se añade un bloque nuevo sin entrada aquí, se usa un fallback
// derivado de sus propios datos (ver metaPara más abajo).
var META = {
  'senales-verticales': {
    title: 'Señales verticales DGT: significado y trucos | Bali AI',
    description: 'Aprende las señales verticales del examen teórico DGT: peligro, prohibición, obligación e indicación. Esquemas, trucos y un mini test gratis con Bali AI.'
  },
  'velocidad-distancias': {
    title: 'Velocidad y distancia de seguridad DGT | Bali AI',
    description: 'Límites de velocidad, distancia de seguridad y de frenada del examen teórico DGT explicados con una calculadora interactiva y trucos para no fallar.'
  },
  'senales-horizontales': {
    title: 'Señales horizontales y marcas viales DGT | Bali AI',
    description: 'Líneas continuas, discontinuas, marcas de STOP y ceda el paso pintadas en el asfalto: repásalas para el examen teórico DGT con esquemas y un mini test.'
  },
  'normas-generales': {
    title: 'Normas generales de circulación DGT | Bali AI',
    description: 'Prioridad de paso, luces, cinturón y uso del móvil: las normas generales de circulación que más caen en el examen teórico DGT, explicadas por Bali.'
  },
  'adelantamientos': {
    title: 'Adelantamientos DGT: dónde está prohibido | Bali AI',
    description: 'Cuándo y dónde se puede adelantar con seguridad: por la izquierda, distancia con ciclistas y la nueva norma DGT de octubre de 2026. Para el examen teórico.'
  },
  'intersecciones': {
    title: 'Prioridad de paso en cruces y rotondas DGT | Bali AI',
    description: 'Quién pasa primero en un cruce: el orden de prioridad entre agente, semáforo y señales, quién cede en una rotonda y la prioridad a la derecha. Examen teórico DGT.'
  },
  'autopistas': {
    title: 'Autopistas y autovías: normas DGT | Bali AI',
    description: 'Diferencia real entre autopista y autovía, cómo incorporarte, uso del carril izquierdo y del arcén, y quién no puede circular. Para el examen teórico DGT.'
  },
  'alcohol-drogas-fatiga': {
    title: 'Tasas de alcohol y drogas al volante DGT | Bali AI',
    description: 'Tasa máxima de alcohol para conductores generales y noveles, tolerancia cero con las drogas y por qué la fatiga es tan peligrosa. Examen teórico DGT.'
  },
  'vehiculo-mantenimiento': {
    title: 'Mantenimiento del coche y baliza V16 | Bali AI',
    description: 'Neumáticos, niveles, ITV y la baliza V16 conectada que sustituye a los triángulos desde 2026: lo mínimo que hay que revisar. Examen teórico DGT.'
  },
  'accidentes-primeros-auxilios': {
    title: 'Protocolo PAS ante un accidente DGT | Bali AI',
    description: 'Proteger, avisar y socorrer: el orden correcto, cuándo llamar al 112, cuándo mover a un herido y cuándo quitar el casco a un motorista. Examen teórico.'
  },
  'sanciones-puntos': {
    title: 'Puntos del carnet: cuáles te quitan y cuáles no | Bali AI',
    description: 'Con cuántos puntos empiezas, qué infracciones te quitan más (móvil, cinturón, velocidad) y cómo recuperarlos antes de perder el carnet. Examen teórico DGT.'
  },
  'casos-especiales': {
    title: 'Ciclistas, peatones, animales y niebla DGT | Bali AI',
    description: 'Cuántos ciclistas pueden ir en paralelo, por dónde caminan los peatones sin acera, qué hacer si atropellas un animal y cuándo usar la antiniebla. Examen DGT.'
  }
};

function metaPara(bloque) {
  return META[bloque.id] || {
    title: (bloque.titulo + ' — examen teórico DGT | Bali AI').slice(0, 60),
    description: (bloque.resumenCorto + ' Repásalo gratis con esquemas, trucos y un mini test en Bali AI.').slice(0, 160)
  };
}

function jsonLd(obj) {
  return '<script type="application/ld+json">' + JSON.stringify(obj) + '</script>';
}

function breadcrumbJsonLd(bloque) {
  return jsonLd({
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Inicio', item: SITE_URL + '/' },
      { '@type': 'ListItem', position: 2, name: 'Aprendizaje', item: SITE_URL + '/aprendizaje.html' },
      { '@type': 'ListItem', position: 3, name: bloque.titulo, item: SITE_URL + '/aprendizaje/' + bloque.id + '.html' }
    ]
  });
}

function faqJsonLd(bloque) {
  if (!bloque.confusionesTipicas || !bloque.confusionesTipicas.length) return '';
  return jsonLd({
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: bloque.confusionesTipicas.map(function (c) {
      return {
        '@type': 'Question',
        name: c.pregunta,
        acceptedAnswer: { '@type': 'Answer', text: c.respuesta }
      };
    })
  });
}

function navbarHtml() {
  return '' +
    '<nav class="navbar" id="navbar">\n' +
    '    <div class="container">\n' +
    '      <a class="nav-brand" href="../index.html">\n' +
    '        <img src="../img/bali.png" alt="Bali AI">\n' +
    '        Bali<span>AI</span>\n' +
    '      </a>\n' +
    '      <ul class="nav-links">\n' +
    '        <li><a href="../index.html#funciones">Funciones</a></li>\n' +
    '        <li><a href="../index.html#como-funciona">Cómo funciona</a></li>\n' +
    '        <li><a href="../aprendizaje.html" class="nav-link-active">Aprendizaje</a></li>\n' +
    '        <li><a href="../index.html#opiniones">Opiniones</a></li>\n' +
    '        <li><a href="../index.html#descargar" class="btn-cta">Descargar</a></li>\n' +
    '      </ul>\n' +
    '      <button class="hamburger" id="hamburger" aria-label="Menú">\n' +
    '        <span></span><span></span><span></span>\n' +
    '      </button>\n' +
    '    </div>\n' +
    '  </nav>';
}

function footerHtml() {
  return '' +
    '<footer>\n' +
    '    <div class="container">\n' +
    '      <div class="footer-grid">\n' +
    '        <div>\n' +
    '          <div class="footer-brand">\n' +
    '            <img src="../img/bali.png" alt="Bali AI">\n' +
    '            Bali<span>AI</span>\n' +
    '          </div>\n' +
    '          <div class="footer-desc">La app de inteligencia artificial para preparar el examen teórico de la DGT. Aprueba más rápido, estudia más inteligente.</div>\n' +
    '        </div>\n' +
    '        <div>\n' +
    '          <div class="footer-title">App</div>\n' +
    '          <a href="../index.html#funciones" class="footer-link">Funciones</a>\n' +
    '          <a href="../index.html#como-funciona" class="footer-link">Cómo funciona</a>\n' +
    '          <a href="../aprendizaje.html" class="footer-link">Aprendizaje</a>\n' +
    '          <a href="../index.html#descargar" class="footer-link">Descargar</a>\n' +
    '        </div>\n' +
    '        <div>\n' +
    '          <div class="footer-title">Legal</div>\n' +
    '          <a href="../privacidad.html" class="footer-link">Política de privacidad</a>\n' +
    '          <a href="../eliminar-cuenta.html" class="footer-link">Eliminar cuenta</a>\n' +
    '          <a href="../terminos.html" class="footer-link">Términos de uso</a>\n' +
    '        </div>\n' +
    '        <div>\n' +
    '          <div class="footer-title">Contacto</div>\n' +
    '          <a href="mailto:appbaliai@gmail.com" class="footer-link">appbaliai@gmail.com</a>\n' +
    '          <a href="#" class="footer-link">Instagram</a>\n' +
    '          <a href="#" class="footer-link">Twitter / X</a>\n' +
    '        </div>\n' +
    '      </div>\n' +
    '      <div class="footer-bottom">\n' +
    '        © 2026 Bali AI · Todos los derechos reservados · No afiliado a la DGT oficial\n' +
    '      </div>\n' +
    '    </div>\n' +
    '  </footer>';
}

function ctaHtml() {
  return '' +
    '<section class="cta" id="descargar">\n' +
    '    <div class="container">\n' +
    '      <div class="cta-card">\n' +
    '        <img src="../img/happy_bali.png" alt="Bali te espera" class="cta-mascot">\n' +
    '        <h2>Esto es el repaso. Para aprobar a la primera, hace falta algo más.</h2>\n' +
    '        <p class="cta-subtexto">Tests oficiales, modo examen cronometrado y tu progreso guardado.</p>\n' +
    '        <p class="cta-social-proof">+1.000 conductores ya aprobados · 95.2% · 4.9★</p>\n' +
    '        <div class="store-buttons">\n' +
    '          <a href="https://play.google.com/store/apps/details?id=com.jesuskrastev.bali" class="store-btn" target="_blank" rel="noopener">\n' +
    '            <i class="fab fa-google-play"></i>\n' +
    '            <div class="store-btn-text">\n' +
    '              <div class="store-btn-label">Descargar en</div>\n' +
    '              <div class="store-btn-name">Google Play</div>\n' +
    '            </div>\n' +
    '          </a>\n' +
    '        </div>\n' +
    '        <button class="btn-compartir" id="btnCompartir"><i class="fas fa-user-plus"></i> Compartir con un amigo</button>\n' +
    '      </div>\n' +
    '    </div>\n' +
    '  </section>';
}

function otrosTemasHtml(bloque, todos) {
  var esc = AprendizajeDetalle.esc;
  var otros = todos.filter(function (b) { return b.disponible && b.id !== bloque.id; });
  if (!otros.length) return '';
  var tarjetas = otros.map(function (b) {
    return '<a href="' + esc(b.id) + '.html" class="bloque-card fi-' + esc(b.color) + '">' +
      '<div class="bloque-card-icon"><i class="fas ' + esc(b.icono) + '"></i></div>' +
      '<h3>' + esc(b.titulo) + '</h3>' +
      '<p>' + esc(b.resumenCorto) + '</p>' +
      '</a>';
  }).join('\n        ');
  return '' +
    '<div class="detalle-section otros-temas">\n' +
    '        <h2>Otros temas</h2>\n' +
    '        <div class="otros-temas-grid">\n        ' + tarjetas + '\n        </div>\n' +
    '      </div>';
}

function paginaHtml(bloque, todos) {
  var esc = AprendizajeDetalle.esc;
  var meta = metaPara(bloque);
  var url = SITE_URL + '/aprendizaje/' + bloque.id + '.html';
  var ogImage = SITE_URL + '/' + bloque.ilustracionHeader.src;
  var detalleHTML = AprendizajeDetalle.renderDetalleHTML(bloque, '../');

  return '<!DOCTYPE html>\n' +
'<html lang="es">\n\n' +
'<head>\n' +
'  <meta charset="UTF-8">\n' +
'  <meta name="viewport" content="width=device-width, initial-scale=1.0">\n' +
'  <title>' + esc(meta.title) + '</title>\n' +
'  <meta name="description" content="' + esc(meta.description) + '">\n' +
'  <link rel="canonical" href="' + url + '">\n' +
'  <meta name="theme-color" content="#0D0F14">\n\n' +
'  <!-- Open Graph -->\n' +
'  <meta property="og:type" content="article">\n' +
'  <meta property="og:url" content="' + url + '">\n' +
'  <meta property="og:site_name" content="Bali AI">\n' +
'  <meta property="og:locale" content="es_ES">\n' +
'  <meta property="og:title" content="' + esc(meta.title) + '">\n' +
'  <meta property="og:description" content="' + esc(meta.description) + '">\n' +
'  <meta property="og:image" content="' + ogImage + '">\n\n' +
'  <!-- Twitter Card -->\n' +
'  <meta name="twitter:card" content="summary_large_image">\n' +
'  <meta name="twitter:title" content="' + esc(meta.title) + '">\n' +
'  <meta name="twitter:description" content="' + esc(meta.description) + '">\n' +
'  <meta name="twitter:image" content="' + ogImage + '">\n\n' +
'  <link rel="icon" type="image/png" href="../img/bali.png">\n' +
'  <link rel="apple-touch-icon" href="../img/bali.png">\n' +
'  <link rel="stylesheet" href="../styles.css">\n' +
'  <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css" rel="stylesheet">\n\n' +
'  ' + breadcrumbJsonLd(bloque) + '\n' +
'  ' + faqJsonLd(bloque) + '\n' +
'</head>\n\n' +
'<body data-bloque-id="' + esc(bloque.id) + '">\n\n' +
'  <!-- NAVBAR -->\n' +
'  ' + navbarHtml() + '\n\n' +
'  <section class="aprendizaje-detalle">\n' +
'    <div class="container">\n' +
'      <nav class="breadcrumb" aria-label="Ruta de navegación">\n' +
'        <a href="../index.html">Inicio</a><span>/</span>\n' +
'        <a href="../aprendizaje.html">Aprendizaje</a><span>/</span>\n' +
'        <span aria-current="page">' + esc(bloque.titulo) + '</span>\n' +
'      </nav>\n' +
'      <a class="btn-volver" href="../aprendizaje.html"><i class="fas fa-arrow-left"></i> Todos los bloques</a>\n' +
'      <div id="detalleContenido">\n' + detalleHTML + '\n      </div>\n\n' +
'      ' + otrosTemasHtml(bloque, todos) + '\n' +
'    </div>\n' +
'  </section>\n\n' +
'  <!-- CTA -->\n' +
'  ' + ctaHtml() + '\n\n' +
'  <!-- FOOTER -->\n' +
'  ' + footerHtml() + '\n\n' +
'  <!-- Widget flotante: aparece tras hacer scroll, fijo -->\n' +
'  <div class="widget-flotante" id="widgetFlotante">\n' +
'    <a href="https://play.google.com/store/apps/details?id=com.jesuskrastev.bali" target="_blank" rel="noopener">\n' +
'      <i class="fab fa-google-play"></i> <span>¡No pierdas tu progreso! Sigue en la app</span>\n' +
'    </a>\n' +
'  </div>\n\n' +
'  <script src="../js/nav.js"></script>\n' +
'  <script src="../data/aprendizaje.js"></script>\n' +
'  <script src="../js/aprendizaje-detalle.js"></script>\n' +
'  <script src="../js/aprendizaje.js"></script>\n' +
'  <script src="../js/aprendizaje-bloque.js"></script>\n' +
'  <script defer src="/_vercel/insights/script.js"></script>\n' +
'</body>\n\n' +
'</html>\n';
}

function main() {
  fs.mkdirSync(OUT_DIR, { recursive: true });
  var disponibles = BLOQUES.filter(function (b) { return b.disponible; });
  disponibles.forEach(function (bloque) {
    var html = paginaHtml(bloque, BLOQUES);
    var destino = path.join(OUT_DIR, bloque.id + '.html');
    fs.writeFileSync(destino, html, 'utf8');
    console.log('Generado: aprendizaje/' + bloque.id + '.html');
  });
  console.log(disponibles.length + ' página(s) generada(s) en aprendizaje/');
}

main();
