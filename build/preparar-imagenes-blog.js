// Conserva los originales fuera de la publicación y genera WebP responsivos.
const fs = require('fs');
const path = require('path');
const sharp = require('sharp');
const posts = require('../data/blog');
const root = path.resolve(__dirname, '..');
async function main() {
  const output = path.join(root, 'img/guides');
  fs.mkdirSync(output, { recursive: true });
  for (const post of posts) {
    const source = path.join(__dirname, 'image-sources', post.id + '.png');
    const image = post.featureImage;
    if (!image) continue;
    const meta = await sharp(source).metadata();
    if (meta.width !== image.width || meta.height !== image.height) throw new Error('Dimensiones incorrectas: ' + post.id);
    for (const size of [480, 960, image.width]) {
      const filename = post.id + (size === image.width ? '-feature' : '-' + size) + '.webp';
      const destination = path.join(output, filename);
      if (!fs.existsSync(destination) || fs.statSync(destination).mtimeMs < fs.statSync(source).mtimeMs) {
        await sharp(source).resize({ width: size }).webp({ quality: 82, effort: 6 }).toFile(destination);
      }
      console.log(filename + ': ' + Math.round(fs.statSync(destination).size / 1024) + ' KB');
    }
  }
}
main().catch(error => { console.error(error); process.exitCode = 1; });
