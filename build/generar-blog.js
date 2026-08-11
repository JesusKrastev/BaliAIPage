#!/usr/bin/env node
/* ===== BALI AI — Genera las páginas del blog =====
   Lee data/blog.js y escribe blog/<id>.html por cada post, más blog/index.html
   como listado. Sin dependencias externas. Mismo patrón que
   generar-paginas-aprendizaje.js: título/description/canonical propios,
   Open Graph, JSON-LD (BreadcrumbList + BlogPosting + FAQPage si el post
   tiene preguntas), reutilizando navbar/footer/CTA de build/plantillas.js. */

var fs = require('fs');
var path = require('path');

var ROOT = path.join(__dirname, '..');
var SITE_URL = 'https://baliai.es';
var POSTS = require(path.join(ROOT, 'data', 'blog.js'));
var BLOQUES = require(path.join(ROOT, 'data', 'aprendizaje.js'));
var Plantillas = require(path.join(__dirname, 'plantillas.js'));
var navbarHtml = Plantillas.navbarHtml;
var footerHtml = Plantillas.footerHtml;
var ctaHtml = Plantillas.ctaHtml;
var OUT_DIR = path.join(ROOT, 'blog');
var OG_IMAGE = SITE_URL + '/img/bali.png';

function esc(str) {
  if (str == null) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function jsonLd(obj) {
  return '<script type="application/ld+json">' + JSON.stringify(obj) + '</script>';
}

function breadcrumbJsonLd(post) {
  return jsonLd({
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Inicio', item: SITE_URL + '/' },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: SITE_URL + '/blog/index.html' },
      { '@type': 'ListItem', position: 3, name: post.titulo, item: SITE_URL + '/blog/' + post.id + '.html' }
    ]
  });
}

function blogPostingJsonLd(post) {
  return jsonLd({
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.titulo,
    description: post.resumen,
    datePublished: post.fecha,
    dateModified: post.fecha,
    author: { '@type': 'Organization', name: 'Bali AI' },
    publisher: { '@type': 'Organization', name: 'Bali AI', logo: { '@type': 'ImageObject', url: OG_IMAGE } },
    mainEntityOfPage: { '@type': 'WebPage', '@id': SITE_URL + '/blog/' + post.id + '.html' },
    image: OG_IMAGE
  });
}

function faqJsonLd(post) {
  if (!post.faq || !post.faq.length) return '';
  return jsonLd({
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: post.faq.map(function (f) {
      return { '@type': 'Question', name: f.pregunta, acceptedAnswer: { '@type': 'Answer', text: f.respuesta } };
    })
  });
}

function fechaLegible(fechaISO) {
  var meses = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];
  var partes = fechaISO.split('-');
  var y = partes[0], m = parseInt(partes[1], 10) - 1, d = parseInt(partes[2], 10);
  return d + ' de ' + meses[m] + ' de ' + y;
}

function listaBloquesHtml() {
  var disponibles = BLOQUES.filter(function (b) { return b.disponible; });
  var items = disponibles.map(function (b) {
    return '<li><a href="../aprendizaje/' + esc(b.id) + '.html"><strong>' + esc(b.titulo) + '</strong></a> — ' + esc(b.resumenCorto) + '</li>';
  }).join('\n');
  return '<h2>Bloques disponibles</h2>\n<ul>\n' + items + '\n</ul>';
}

function otrosPostsHtml(post) {
  var otros = POSTS.filter(function (p) { return p.id !== post.id; }).slice(0, 3);
  if (!otros.length) return '';
  var tarjetas = otros.map(function (p) {
    return '<a href="' + esc(p.id) + '.html" class="blog-card">' +
      '<div class="blog-card-fecha">' + esc(fechaLegible(p.fecha)) + '</div>' +
      '<h3>' + esc(p.titulo) + '</h3>' +
      '<p>' + esc(p.resumen) + '</p>' +
      '</a>';
  }).join('\n        ');
  return '' +
    '<div class="blog-post-otros">\n' +
    '        <h2>Sigue leyendo</h2>\n' +
    '        <div class="blog-grid">\n        ' + tarjetas + '\n        </div>\n' +
    '      </div>';
}

function paginaPostHtml(post) {
  var url = SITE_URL + '/blog/' + post.id + '.html';
  var cuerpo = post.cuerpoHTML.replace('{{LISTA_BLOQUES}}', listaBloquesHtml());

  return '<!DOCTYPE html>\n' +
'<html lang="es">\n\n' +
'<head>\n' +
'  <meta charset="UTF-8">\n' +
'  <meta name="viewport" content="width=device-width, initial-scale=1.0">\n' +
'  <title>' + esc(post.metaTitle) + '</title>\n' +
'  <meta name="description" content="' + esc(post.resumen) + '">\n' +
'  <link rel="canonical" href="' + url + '">\n' +
'  <meta name="theme-color" content="#0D0F14">\n\n' +
'  <!-- Open Graph -->\n' +
'  <meta property="og:type" content="article">\n' +
'  <meta property="og:url" content="' + url + '">\n' +
'  <meta property="og:site_name" content="Bali AI">\n' +
'  <meta property="og:locale" content="es_ES">\n' +
'  <meta property="og:title" content="' + esc(post.metaTitle) + '">\n' +
'  <meta property="og:description" content="' + esc(post.resumen) + '">\n' +
'  <meta property="og:image" content="' + OG_IMAGE + '">\n\n' +
'  <!-- Twitter Card -->\n' +
'  <meta name="twitter:card" content="summary">\n' +
'  <meta name="twitter:title" content="' + esc(post.metaTitle) + '">\n' +
'  <meta name="twitter:description" content="' + esc(post.resumen) + '">\n' +
'  <meta name="twitter:image" content="' + OG_IMAGE + '">\n\n' +
'  <link rel="icon" type="image/png" href="../img/bali.png">\n' +
'  <link rel="apple-touch-icon" href="../img/bali.png">\n' +
'  <link rel="stylesheet" href="../styles.css">\n' +
'  <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css" rel="stylesheet">\n\n' +
'  ' + breadcrumbJsonLd(post) + '\n' +
'  ' + blogPostingJsonLd(post) + '\n' +
'  ' + faqJsonLd(post) + '\n' +
'</head>\n\n' +
'<body>\n\n' +
'  <!-- NAVBAR -->\n' +
'  ' + navbarHtml('blog') + '\n\n' +
'  <section class="blog-post">\n' +
'    <div class="blog-post-container">\n' +
'      <nav class="breadcrumb" aria-label="Ruta de navegación">\n' +
'        <a href="../index.html">Inicio</a><span>/</span>\n' +
'        <a href="index.html">Blog</a><span>/</span>\n' +
'        <span aria-current="page">' + esc(post.titulo) + '</span>\n' +
'      </nav>\n' +
'      <a class="btn-volver" href="index.html"><i class="fas fa-arrow-left"></i> Todo el blog</a>\n' +
'      <div class="blog-post-header">\n' +
'        <h1>' + esc(post.titulo) + '</h1>\n' +
'        <div class="blog-post-fecha">' + esc(fechaLegible(post.fecha)) + '</div>\n' +
'      </div>\n' +
'      <div class="blog-post-body">\n' + cuerpo + '\n      </div>\n' +
'      ' + otrosPostsHtml(post) + '\n' +
'    </div>\n' +
'  </section>\n\n' +
'  <!-- CTA -->\n' +
'  ' + ctaHtml() + '\n\n' +
'  <!-- FOOTER -->\n' +
'  ' + footerHtml() + '\n\n' +
'  <script src="../js/nav.js"></script>\n' +
'  <script defer src="/_vercel/insights/script.js"></script>\n' +
'</body>\n\n' +
'</html>\n';
}

function paginaIndexHtml() {
  var url = SITE_URL + '/blog/index.html';
  var tarjetas = POSTS.map(function (p) {
    return '<a href="' + esc(p.id) + '.html" class="blog-card">' +
      '<div class="blog-card-fecha">' + esc(fechaLegible(p.fecha)) + '</div>' +
      '<h3>' + esc(p.titulo) + '</h3>' +
      '<p>' + esc(p.resumen) + '</p>' +
      '</a>';
  }).join('\n        ');

  return '<!DOCTYPE html>\n' +
'<html lang="es">\n\n' +
'<head>\n' +
'  <meta charset="UTF-8">\n' +
'  <meta name="viewport" content="width=device-width, initial-scale=1.0">\n' +
'  <title>Blog — Bali AI</title>\n' +
'  <meta name="description" content="Artículos sobre el examen teórico de la DGT: cómo funciona, trucos para aprobar, comparativas de apps y las últimas novedades normativas.">\n' +
'  <link rel="canonical" href="' + url + '">\n' +
'  <meta name="theme-color" content="#0D0F14">\n\n' +
'  <!-- Open Graph -->\n' +
'  <meta property="og:type" content="website">\n' +
'  <meta property="og:url" content="' + url + '">\n' +
'  <meta property="og:site_name" content="Bali AI">\n' +
'  <meta property="og:locale" content="es_ES">\n' +
'  <meta property="og:title" content="Blog — Bali AI">\n' +
'  <meta property="og:description" content="Artículos sobre el examen teórico de la DGT: cómo funciona, trucos para aprobar, comparativas de apps y las últimas novedades normativas.">\n' +
'  <meta property="og:image" content="' + OG_IMAGE + '">\n\n' +
'  <link rel="icon" type="image/png" href="../img/bali.png">\n' +
'  <link rel="apple-touch-icon" href="../img/bali.png">\n' +
'  <link rel="stylesheet" href="../styles.css">\n' +
'  <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css" rel="stylesheet">\n' +
'</head>\n\n' +
'<body>\n\n' +
'  <!-- NAVBAR -->\n' +
'  ' + navbarHtml('blog') + '\n\n' +
'  <section class="blog-hero">\n' +
'    <div class="container">\n' +
'      <div class="section-tag">Blog</div>\n' +
'      <h1 class="section-title">Todo sobre el <span>examen teórico DGT</span></h1>\n' +
'      <p class="section-sub">Guías, trucos y novedades para aprobar a la primera.</p>\n' +
'    </div>\n' +
'  </section>\n\n' +
'  <section class="blog-index">\n' +
'    <div class="container">\n' +
'      <div class="blog-grid">\n        ' + tarjetas + '\n      </div>\n' +
'    </div>\n' +
'  </section>\n\n' +
'  <!-- CTA -->\n' +
'  ' + ctaHtml() + '\n\n' +
'  <!-- FOOTER -->\n' +
'  ' + footerHtml() + '\n\n' +
'  <script src="../js/nav.js"></script>\n' +
'  <script defer src="/_vercel/insights/script.js"></script>\n' +
'</body>\n\n' +
'</html>\n';
}

function main() {
  fs.mkdirSync(OUT_DIR, { recursive: true });
  POSTS.forEach(function (post) {
    var html = paginaPostHtml(post);
    fs.writeFileSync(path.join(OUT_DIR, post.id + '.html'), html, 'utf8');
    console.log('Generado: blog/' + post.id + '.html');
  });
  fs.writeFileSync(path.join(OUT_DIR, 'index.html'), paginaIndexHtml(), 'utf8');
  console.log('Generado: blog/index.html');
  console.log((POSTS.length + 1) + ' página(s) generada(s) en blog/');
}

main();
