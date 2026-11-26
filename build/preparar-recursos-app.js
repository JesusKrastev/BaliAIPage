const fs = require('fs');
const path = require('path');
const sharp = require('sharp');
const assets = require('../data/app-assets');
const screens = require('../data/app-screens');
const root = path.resolve(__dirname, '..');
const stale = (source, target) => !fs.existsSync(target) || fs.statSync(target).mtimeMs < fs.statSync(source).mtimeMs;
async function main() {
  fs.mkdirSync(path.join(root, 'img/app/pantallas'), { recursive: true });
  for (const asset of assets) {
    const source = path.join(__dirname, 'app-sources', asset.name + '.png');
    const target = path.join(root, 'img/app', asset.name.replace(/_/g, '-') + '.webp');
    if (stale(source, target)) {
      await sharp(source).resize({ width: asset.name.endsWith('_cover') ? 960 : 640, withoutEnlargement: true }).webp({ quality: 82, effort: 6 }).toFile(target);
    }
  }
  // Capturas de pantalla: se quita la barra de estado (arriba) y los botones del sistema (abajo).
  for (const screen of screens) {
    const source = path.join(__dirname, 'app-sources/pantallas', screen.name + '.jpeg');
    const target = path.join(root, 'img/app/pantallas', screen.name + '.webp');
    if (stale(source, target)) {
      await sharp(source).extract({ left: 0, top: 64, width: 720, height: 1436 }).resize({ width: 560 }).webp({ quality: 84, effort: 6 }).toFile(target);
    }
  }
  console.log('Recursos originales de la app optimizados: ' + assets.length + ' ilustraciones y ' + screens.length + ' capturas.');
}
main().catch(e => { console.error(e); process.exitCode = 1; });
