// Ejecutar tras los generadores de contenido. Conserva las URLs publicadas.
const fs = require('fs');
const path = require('path');
const root = path.join(__dirname, '..');
const site = 'https://baliai.es';
const seo = require('../data/seo');
const bloques = require('../data/aprendizaje');
const posts = require('../data/blog');
const imagenHtml = require('./imagenes-blog');
const esc = value => String(value).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const json = value => JSON.stringify(value).replace(/</g, '\\u003c');
const region = (html, name, content) => {
  const re = new RegExp('<!-- SEO:' + name + ':start -->[\\s\\S]*?<!-- SEO:' + name + ':end -->');
  const block = '<!-- SEO:' + name + ':start -->\n' + content + '\n<!-- SEO:' + name + ':end -->';
  return re.test(html) ? html.replace(re, () => block) : html.replace('</head>', () => block + '\n</head>');
};
let home = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
home = home.replace(/<title>[\s\S]*?<\/title>/, '<title>' + esc(seo.title) + '</title>');
home = home.replace(/(<meta\s+(?:name|property)="(?:description|og:description|twitter:description)"\s+content=")[^"]*/g, '$1' + esc(seo.description));
home = home.replace(/(<meta\s+(?:name|property)="(?:og:title|twitter:title)"\s+content=")[^"]*/g, '$1' + esc(seo.title));
home = home.replace(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g, (tag, body) => {
  const data = JSON.parse(body);
  if (data['@type'] !== 'MobileApplication') return tag;
  data.description = seo.description;
  data.inLanguage = 'es-ES';
  return '<script type="application/ld+json">' + json(data) + '</script>';
});
home = home.replace(/<h1>[\s\S]*?<\/h1>/, '<h1>Tests DGT gratis para preparar <span class="highlight">el examen teórico</span></h1>');
home = home.replace(/<p class="hero-desc">[\s\S]*?<\/p>/, '<p class="hero-desc">Prepara el teórico del permiso B con Bali AI para Android. Practica con tests, repasa tus fallos con inteligencia artificial y consulta el temario por temas.</p>');
home = home.replace(/<h4>/g, '<h3>').replace(/<\/h4>/g, '</h3>');
const schemas = {
  '@context': 'https://schema.org', '@graph': [
    { '@type': 'WebSite', '@id': site + '/#website', name: 'Bali AI', url: site + '/', inLanguage: 'es-ES' },
    { '@type': 'FAQPage', '@id': site + '/#faq', mainEntity: seo.faq.map(f => ({ '@type': 'Question', name: f.pregunta, acceptedAnswer: { '@type': 'Answer', text: f.respuesta } })) }
  ]
};
home = region(home, 'schema', '<script type="application/ld+json">' + json(schemas) + '</script>');
const faqHtml = '<section class="seo-faq" id="faq"><div class="container"><h2 class="section-title">Preguntas frecuentes sobre <span>Bali AI y el teórico DGT</span></h2>' + seo.faq.map(f => '<details><summary>' + esc(f.pregunta) + '</summary><p>' + esc(f.respuesta) + '</p><a href="' + esc(f.enlace) + '">Más información</a></details>').join('\n') + '</div></section>';
const guideHtml = '<section class="seo-guides"><div class="container"><h2 class="section-title">Guías para <span>preparar el teórico DGT</span></h2><div class="blog-grid">' + posts.slice(0, 3).map(p => '<a class="blog-card" href="blog/' + esc(p.id) + '.html">' + imagenHtml(p, '', false) + '<h3>' + esc(p.titulo) + '</h3><p>' + esc(p.resumen) + '</p></a>').join('') + '</div></div></section>';
const content = '<!-- SEO:content:start -->\n' + guideHtml + '\n' + faqHtml + '\n<!-- SEO:content:end -->';
home = /<!-- SEO:content:start -->/.test(home) ? home.replace(/<!-- SEO:content:start -->[\s\S]*?<!-- SEO:content:end -->/, () => content) : home.replace('  <!-- CTA -->', content + '\n  <!-- CTA -->');
fs.writeFileSync(path.join(root, 'index.html'), home);

let hub = fs.readFileSync(path.join(root, 'aprendizaje.html'), 'utf8');
hub = hub.replace(/Aprendizaje — Bali AI/g, 'Temario DGT del permiso B: teoría y mini tests | Bali AI');
const cards = bloques.map(b => {
  const body = '<div class="bloque-card-icon"><i class="fas ' + esc(b.icono) + '"></i></div><h3>' + esc(b.titulo) + '</h3><p>' + esc(b.resumenCorto) + '</p>';
  return b.disponible ? '<a class="bloque-card fi-' + esc(b.color) + '" href="aprendizaje/' + esc(b.id) + '.html">' + body + '</a>' : '<div class="bloque-card bloque-card-proximo fi-' + esc(b.color) + '">' + body + '<span class="bloque-badge bloque-badge-proximo">Próximamente</span></div>';
}).join('\n');
hub = hub.replace(/<div class="bloques-grid" id="bloquesGrid">[\s\S]*?<\/div>\s*<\/div>\s*<\/section>/, '<div class="bloques-grid" id="bloquesGrid">' + cards + '</div>\n    </div>\n  </section>');
fs.writeFileSync(path.join(root, 'aprendizaje.html'), hub);

const routes = ['/', '/aprendizaje.html', '/blog/index.html', ...bloques.filter(b => b.disponible).map(b => '/aprendizaje/' + b.id + '.html'), ...posts.map(p => '/blog/' + p.id + '.html'), '/privacidad.html', '/terminos.html', '/eliminar-cuenta.html'];
fs.writeFileSync(path.join(root, 'sitemap.xml'), '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' + routes.map(route => '  <url><loc>' + site + route + '</loc></url>').join('\n') + '\n</urlset>\n');
fs.writeFileSync(path.join(root, 'robots.txt'), 'User-agent: *\nAllow: /\n\nSitemap: ' + site + '/sitemap.xml\n');

// Publicar solo HTML y recursos, sin scripts de build, skills ni archivos internos.
const dist = path.join(root, 'dist');
fs.mkdirSync(dist, { recursive: true });
for (const file of [...new Set(routes.map(r => r === '/' ? 'index.html' : r.slice(1))), 'styles.css', 'robots.txt', 'sitemap.xml']) {
  const destination = path.join(dist, file);
  fs.mkdirSync(path.dirname(destination), { recursive: true });
  fs.copyFileSync(path.join(root, file), destination);
}
for (const dir of ['img', 'js']) fs.cpSync(path.join(root, dir), path.join(dist, dir), { recursive: true });
fs.mkdirSync(path.join(dist, 'data'), { recursive: true });
fs.copyFileSync(path.join(root, 'data/aprendizaje.js'), path.join(dist, 'data/aprendizaje.js'));
console.log('SEO: FAQ, enlaces estáticos, sitemap y publicación en dist preparados.');
