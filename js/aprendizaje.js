/* ===== BALI AI — Aprendizaje: hub (portada de bloques) =====
   Pinta el grid de bloques temáticos. Cada bloque disponible enlaza a su propia
   página (aprendizaje/<id>.html); el detalle y su interactividad viven ahí,
   generados por build/generar-paginas-aprendizaje.js a partir de
   data/aprendizaje.js. El progreso se guarda en localStorage (esta web no tiene
   backend ni cuentas, así que no sincroniza con la app real). */

(function () {
  'use strict';

  var BLOQUES = window.APRENDIZAJE_BLOQUES || [];
  var bloquesGrid = document.getElementById('bloquesGrid');

  function renderPortada() {
    if (!bloquesGrid) return;
    var esc = window.AprendizajeDetalle.esc;
    var progreso = window.AprendizajeDetalle.getProgreso();
    bloquesGrid.innerHTML = BLOQUES.map(function (b) {
      var estado = progreso[b.id];
      var badge = b.disponible
        ? (estado && estado.completado ? '<span class="bloque-badge bloque-badge-ok"><i class="fas fa-check"></i> Repasado</span>' : '')
        : '<span class="bloque-badge bloque-badge-proximo">Próximamente</span>';
      var pct = (b.disponible && estado && estado.completado) ? 100 : 0;
      var contenido = '<div class="bloque-card-icon"><i class="fas ' + esc(b.icono) + '"></i></div>' +
        badge +
        '<h3>' + esc(b.titulo) + '</h3>' +
        '<p>' + esc(b.resumenCorto) + '</p>' +
        (b.disponible ? '<div class="bloque-progress"><div class="bloque-progress-fill" style="width:' + pct + '%"></div></div>' : '');

      return b.disponible
        ? '<a href="aprendizaje/' + esc(b.id) + '.html" class="bloque-card fi-' + esc(b.color) + '">' + contenido + '</a>'
        : '<div class="bloque-card fi-' + esc(b.color) + ' bloque-card-proximo">' + contenido + '</div>';
    }).join('');

    window.AprendizajeDetalle.actualizarProgresoGlobal();
  }

  // ---------- Widget flotante ----------
  function initWidgetFlotante() {
    var widget = document.getElementById('widgetFlotante');
    if (!widget) return;

    var mostrado = false;
    function onScroll() {
      if (!mostrado && window.scrollY > 500) {
        mostrado = true;
        widget.classList.add('visible');
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  renderPortada();
  initWidgetFlotante();
})();
