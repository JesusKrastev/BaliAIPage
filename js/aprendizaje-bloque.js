/* ===== BALI AI — Aprendizaje: hidratación de una página de bloque =====
   El HTML del bloque ya viene renderizado desde el servidor (generado por
   build/generar-paginas-aprendizaje.js). Este script solo añade la
   interactividad (tabs, comparativa, confusiones, calculadora, quiz) y
   registra la visita para que el progreso del hub (aprendizaje.html) se
   mantenga coherente. */
(function () {
  'use strict';

  window.APRENDIZAJE_BASE_PATH = '../';

  var bloqueId = document.body.getAttribute('data-bloque-id');
  var bloque = (window.APRENDIZAJE_BLOQUES || []).filter(function (b) { return b.id === bloqueId; })[0];
  if (!bloque) return;

  window.AprendizajeDetalle.hidratarDetalle(bloque, document.getElementById('detalleContenido') || document);
  window.AprendizajeDetalle.registrarVisitaBloque(bloque.id);
})();
