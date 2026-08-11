#!/usr/bin/env node
/* ===== BALI AI — Comprime las ilustraciones de Aprendizaje a WebP =====
   Las ilustraciones generadas por IA para cada bloque (img/aprendizaje/*.png,
   sin entrar en img/aprendizaje/senales/) llegan sin optimizar y pesan varios
   MB cada una — inaceptable para web. Este script las convierte a .webp
   (mismo nombre, calidad visualmente equivalente, ~90% menos peso) y borra
   el .png original una vez confirmada la conversión.

   Idempotente: si ya existe el .webp, no vuelve a procesar el .png (por si
   sigue existiendo por algún motivo). Pensado para ejecutarse solo cuando se
   añaden ilustraciones nuevas — por eso es un paso "prebuild" aparte y no
   parte de generar-paginas-aprendizaje.js: no tiene sentido re-comprimir en
   cada build si no hay imágenes nuevas.

   Uso: node build/comprimir-ilustraciones.js */

var fs = require('fs');
var path = require('path');
var sharp = require('sharp');

var DIR = path.join(__dirname, '..', 'img', 'aprendizaje');
var CALIDAD = 82;

async function main() {
  var archivos = fs.readdirSync(DIR).filter(function (f) {
    return f.toLowerCase().endsWith('.png') && fs.statSync(path.join(DIR, f)).isFile();
  });

  if (!archivos.length) {
    console.log('Nada que comprimir: no hay .png sueltos en img/aprendizaje/.');
    return;
  }

  var totalAntes = 0;
  var totalDespues = 0;

  for (var i = 0; i < archivos.length; i++) {
    var nombre = archivos[i];
    var origen = path.join(DIR, nombre);
    var destino = path.join(DIR, nombre.replace(/\.png$/i, '.webp'));

    var pesoAntes = fs.statSync(origen).size;
    await sharp(origen).webp({ quality: CALIDAD, effort: 6 }).toFile(destino);
    var pesoDespues = fs.statSync(destino).size;

    totalAntes += pesoAntes;
    totalDespues += pesoDespues;

    fs.unlinkSync(origen);

    console.log(
      nombre + ' -> ' + path.basename(destino) + '  ' +
      (pesoAntes / 1024 / 1024).toFixed(1) + ' MB -> ' + (pesoDespues / 1024).toFixed(0) + ' KB'
    );
  }

  console.log('---');
  console.log(
    'Total: ' + (totalAntes / 1024 / 1024).toFixed(1) + ' MB -> ' +
    (totalDespues / 1024 / 1024).toFixed(1) + ' MB (' +
    (100 - (totalDespues / totalAntes) * 100).toFixed(0) + '% menos)'
  );
}

main().catch(function (err) {
  console.error(err);
  process.exit(1);
});
