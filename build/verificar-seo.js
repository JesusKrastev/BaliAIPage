const fs = require('fs');
const path = require('path');
const assert = require('assert/strict');
const root = path.join(__dirname, '../dist');
const site = require('../data/site').url;
const seo = require('../data/seo');
const bloques = require('../data/aprendizaje');
const sitemap = fs.readFileSync(path.join(root, 'sitemap.xml'), 'utf8');
const urls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map(m => m[1]);
assert.equal(new Set(urls).size, urls.length, 'URLs duplicadas en sitemap');
const titles = new Set();
const pageLinks = new Map();
for (const url of urls) {
  const file = new URL(url).pathname === '/' ? 'index.html' : new URL(url).pathname.slice(1);
  const html = fs.readFileSync(path.join(root, file), 'utf8');
  assert.ok(!html.includes('https://baliai.es'), file + ': dominio anterior publicado');
  pageLinks.set(url, []);
  assert.equal((html.match(/<h1(?:\s|>)/g) || []).length, 1, file + ': debe tener un H1');
  assert.ok(html.includes('rel="canonical" href="' + url + '"'), file + ': canonical');
  assert.ok(/<meta name="description"\s+content="[^"]+"/.test(html), file + ': descripción');
  const title = html.match(/<title>([^<]+)<\/title>/)[1];
  assert.ok(!titles.has(title), file + ': título duplicado');
  titles.add(title);
  for (const match of html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)) JSON.parse(match[1]);
  for (const match of html.matchAll(/\b(?:href|src)="([^"]+)"/g)) {
    const value = match[1].replace(/&amp;/g, '&');
    if (/^(?:mailto:|tel:|data:|#)/.test(value) || value.startsWith('/_vercel/')) continue;
    const resolved = new URL(value, url);
    if (resolved.origin !== site) continue;
    const target = path.join(root, resolved.pathname === '/' ? 'index.html' : resolved.pathname.slice(1));
    assert.ok(fs.existsSync(target), file + ': recurso inexistente ' + value);
    if (resolved.hash && /\.html$/.test(target)) {
      const targetHtml = fs.readFileSync(target, 'utf8');
      assert.ok(targetHtml.includes('id="' + decodeURIComponent(resolved.hash.slice(1)) + '"'), file + ': ancla inexistente ' + value);
    }
    resolved.hash = ''; resolved.search = '';
    const canonical = resolved.pathname === '/index.html' ? site + '/' : resolved.href;
    if (urls.includes(canonical)) pageLinks.get(url).push(canonical);
  }
  for (const match of html.matchAll(/<meta\s+(?:property|name)="(?:og:image|twitter:image)"\s+content="([^"]+)"/g)) {
    const image = new URL(match[1]);
    if (image.origin === site) assert.ok(fs.existsSync(path.join(root, image.pathname.slice(1))), file + ': imagen social inexistente');
  }
  for (const match of html.matchAll(/<img\b[^>]*>/g)) {
    assert.ok(/\bwidth="\d+"/.test(match[0]) && /\bheight="\d+"/.test(match[0]), file + ': imagen sin dimensiones');
    const responsive = match[0].match(/\bsrcset="([^"]+)"/);
    if (responsive) for (const candidate of responsive[1].split(',')) {
      const imageUrl = new URL(candidate.trim().split(/\s+/)[0], url);
      assert.ok(fs.existsSync(path.join(root, imageUrl.pathname.slice(1))), file + ': variante inexistente ' + candidate);
    }
  }
}
const reachable = new Set([site + '/']);
let frontier = [...reachable];
while (frontier.length) {
  const next = [];
  for (const page of frontier) for (const link of pageLinks.get(page) || []) if (!reachable.has(link)) { reachable.add(link); next.push(link); }
  frontier = next;
}
assert.equal(reachable.size, urls.length, 'Todas las páginas deben ser accesibles desde la portada');
const home = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
const graph = [...home.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map(m => JSON.parse(m[1])).find(o => o['@graph']);
const faq = graph['@graph'].find(o => o['@type'] === 'FAQPage');
assert.deepEqual(faq.mainEntity.map(q => q.name), seo.faq.map(f => f.pregunta));
for (const f of seo.faq) {
  assert.ok(home.includes('<summary>' + f.pregunta + '</summary>'), 'FAQ visible: ' + f.pregunta);
  assert.ok(home.includes('<p>' + f.respuesta + '</p>'), 'Respuesta visible: ' + f.pregunta);
}
const hub = fs.readFileSync(path.join(root, 'aprendizaje.html'), 'utf8');
for (const b of bloques.filter(b => b.disponible)) assert.ok(hub.includes('href="aprendizaje/' + b.id + '.html"'), 'Bloque no enlazado en HTML: ' + b.id);
assert.ok(fs.readFileSync(path.join(root, 'robots.txt'), 'utf8').includes('Sitemap: ' + site + '/sitemap.xml'));
for (const privatePath of ['.agents', '.git', 'build', 'package.json', 'app.md']) assert.ok(!fs.existsSync(path.join(root, privatePath)), 'Archivo interno publicado: ' + privatePath);
console.log('SEO verificado: ' + urls.length + ' páginas con canonical, metadatos, JSON-LD y enlaces internos válidos.');
