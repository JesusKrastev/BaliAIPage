const fs = require('fs');
const path = require('path');
const sharp = require('sharp');
const assets = require('../data/app-assets');
const root = path.resolve(__dirname, '..');
async function main() {
  fs.mkdirSync(path.join(root, 'img/app'), { recursive: true });
  for (const asset of assets) {
    const source = path.join(__dirname, 'app-sources', asset.name + '.png');
    const target = path.join(root, 'img/app', asset.name.replace(/_/g, '-') + '.webp');
    if (!fs.existsSync(target) || fs.statSync(target).mtimeMs < fs.statSync(source).mtimeMs) {
      await sharp(source).resize({ width: asset.name.endsWith('_cover') ? 960 : 640, withoutEnlargement: true }).webp({ quality: 82, effort: 6 }).toFile(target);
    }
  }
  console.log('Recursos originales de la app optimizados: ' + assets.length);
}
main().catch(e => { console.error(e); process.exitCode = 1; });
