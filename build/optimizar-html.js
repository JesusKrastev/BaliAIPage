// Dimensiones intrínsecas en el HTML publicado para evitar saltos de diseño.
const fs = require('fs');
const path = require('path');
const sharp = require('sharp');
const root = path.resolve(__dirname, '../dist');
const cache = new Map();
async function optimize(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const file = path.join(dir, entry.name);
    if (entry.isDirectory()) { await optimize(file); continue; }
    if (!entry.name.endsWith('.html')) continue;
    let html = fs.readFileSync(file, 'utf8');
    const images = [...html.matchAll(/<img\b[^>]*>/g)];
    for (const [tag] of images) {
      const src = tag.match(/\bsrc="([^"]+)"/);
      if (!src || /^(https?:|data:)/.test(src[1])) continue;
      const asset = path.resolve(path.dirname(file), src[1]);
      if (!asset.startsWith(root + path.sep)) throw new Error('Imagen fuera de dist: ' + asset);
      if (!cache.has(asset)) cache.set(asset, await sharp(asset).metadata());
      const { width, height } = cache.get(asset);
      let optimized = tag.replace(/\s(?:width|height)="[^"]*"/g, '');
      optimized = optimized.replace('<img', '<img width="' + width + '" height="' + height + '"');
      const hero = /class="[^"]*(?:hero-mascot|detalle-header-img)/.test(tag);
      if (hero) optimized = optimized.replace(/\sloading="[^"]*"/g, '').replace('<img', '<img fetchpriority="high" loading="eager"');
      html = html.replace(tag, () => optimized);
    }
    fs.writeFileSync(file, html);
  }
}
optimize(root).then(() => console.log('Imágenes: dimensiones explícitas y prioridad de portada.')).catch(error => { console.error(error); process.exitCode = 1; });
