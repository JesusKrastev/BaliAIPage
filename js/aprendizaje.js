/* ===== BALI AI — Renderer de la sección Aprendizaje =====
   Vanilla JS, sin dependencias. Lee window.APRENDIZAJE_BLOQUES (data/aprendizaje.js)
   y pinta portada + detalle de bloque. El progreso se guarda en localStorage
   (esta web no tiene backend ni cuentas, así que no sincroniza con la app real).

   Principio de diseño: imagen antes que texto. Las señales oficiales de la DGT
   se cargan desde img/aprendizaje/senales/<archivo>; si el archivo aún no existe,
   la tarjeta muestra un hueco con el nombre esperado en vez de romperse. */

(function () {
  'use strict';

  var BLOQUES = window.APRENDIZAJE_BLOQUES || [];
  var STORAGE_KEY = 'baliAprendizajeProgreso';
  var WIDGET_DISMISSED_KEY = 'baliAprendizajeWidgetCerrado';
  var PLACEHOLDER_ILUSTRACION = 'img/happy_bali.png';
  var SENALES_PATH = 'img/aprendizaje/senales/';
  var PLAY_STORE_URL = 'https://play.google.com/store/apps/details?id=com.jesuskrastev.bali';
  // Cifras reales, las mismas que en index.html — nunca inventar datos aquí.
  var STAT_USUARIOS = '+1.000 conductores';
  var STAT_APROBADOS = '95.2% de aprobados';

  var vistaPortada = document.getElementById('vista-portada');
  var vistaDetalle = document.getElementById('vista-detalle');
  var vistaPortadaCta = document.getElementById('vista-portada-cta');
  var bloquesGrid = document.getElementById('bloquesGrid');
  var detalleContenido = document.getElementById('detalleContenido');
  var btnVolver = document.getElementById('btnVolver');
  var progresoGlobalFill = document.getElementById('progresoGlobalFill');
  var progresoGlobalLabel = document.getElementById('progresoGlobalLabel');
  var progresoZeigarnik = document.getElementById('progresoZeigarnik');

  // ---------- Progreso (localStorage) ----------
  function getProgreso() {
    try { return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {}; }
    catch (e) { return {}; }
  }
  function guardarProgreso(bloqueId, datos) {
    var progreso = getProgreso();
    progreso[bloqueId] = datos;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progreso));
    actualizarProgresoGlobal();
  }
  function actualizarProgresoGlobal() {
    var disponibles = BLOQUES.filter(function (b) { return b.disponible; });
    var progreso = getProgreso();
    var completados = disponibles.filter(function (b) { return progreso[b.id] && progreso[b.id].completado; }).length;
    var pct = disponibles.length ? Math.round((completados / disponibles.length) * 100) : 0;
    if (progresoGlobalFill) progresoGlobalFill.style.width = pct + '%';
    if (progresoGlobalLabel) progresoGlobalLabel.textContent = completados + ' de ' + disponibles.length + ' bloques repasados (' + pct + '%)';
    // Efecto Zeigarnik: solo aparece si ya hay progreso real que "continuar".
    if (progresoZeigarnik) progresoZeigarnik.hidden = completados === 0;
  }

  // ---------- Utilidades ----------
  function esc(str) {
    var div = document.createElement('div');
    div.textContent = str == null ? '' : String(str);
    return div.innerHTML;
  }
  function imgTag(ilustracion, className) {
    if (!ilustracion) return '';
    return '<img src="' + esc(ilustracion.src) + '" alt="' + esc(ilustracion.alt) + '" class="' + className + '" loading="lazy" ' +
      'onerror="this.onerror=null;this.src=\'' + PLACEHOLDER_ILUSTRACION + '\';">';
  }
  // Señal oficial de la DGT: si el archivo no existe aún, muestra un hueco con
  // el nombre esperado en vez de una imagen rota.
  function senalImgHtml(archivo, alt) {
    return '<div class="senal-img-wrap">' +
      '<img src="' + esc(SENALES_PATH + archivo) + '" alt="' + esc(alt) + '" loading="lazy" ' +
        'onerror="this.style.display=\'none\';this.nextElementSibling.style.display=\'flex\';">' +
      '<div class="senal-placeholder"><i class="fas fa-image"></i><span>' + esc(archivo) + '</span></div>' +
      '</div>';
  }

  // ---------- Portada ----------
  function renderPortada() {
    var progreso = getProgreso();
    bloquesGrid.innerHTML = BLOQUES.map(function (b) {
      var estado = progreso[b.id];
      var disponibleClass = b.disponible ? '' : ' bloque-card-proximo';
      var badge = b.disponible
        ? (estado && estado.completado ? '<span class="bloque-badge bloque-badge-ok"><i class="fas fa-check"></i> Repasado</span>' : '')
        : '<span class="bloque-badge bloque-badge-proximo">Próximamente</span>';
      var pct = (b.disponible && estado && estado.completado) ? 100 : 0;
      var interactivo = b.disponible ? ' role="link" tabindex="0" data-bloque="' + esc(b.id) + '"' : '';
      return '<div class="bloque-card fi-' + esc(b.color) + disponibleClass + '"' + interactivo + '>' +
        '<div class="bloque-card-icon"><i class="fas ' + esc(b.icono) + '"></i></div>' +
        badge +
        '<h3>' + esc(b.titulo) + '</h3>' +
        '<p>' + esc(b.resumenCorto) + '</p>' +
        (b.disponible ? '<div class="bloque-progress"><div class="bloque-progress-fill" style="width:' + pct + '%"></div></div>' : '') +
        '</div>';
    }).join('');

    bloquesGrid.querySelectorAll('[data-bloque]').forEach(function (card) {
      card.addEventListener('click', function () { irADetalle(card.getAttribute('data-bloque')); });
      card.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); irADetalle(card.getAttribute('data-bloque')); }
      });
    });

    actualizarProgresoGlobal();
  }

  function irADetalle(id) { location.hash = '#/bloque/' + id; }

  // ---------- Pasos visuales (lectura en 5 segundos) ----------
  function renderPasosVisuales(pasos) {
    return '<div class="pasos-visuales">' + pasos.map(function (p, i) {
      return '<div class="paso-visual-card">' +
        '<div class="paso-visual-num">' + (i + 1) + '</div>' +
        '<div class="paso-visual-icon cv-' + esc(p.colorClave) + '"><i class="fas ' + esc(p.icono) + '"></i></div>' +
        '<div class="paso-visual-texto">' + esc(p.texto) + '</div>' +
        '</div>';
    }).join('') + '</div>';
  }

  // ---------- Esquema: tabs con señales oficiales ----------
  function renderTabs(esquema) {
    var tabsBtns = esquema.tabs.map(function (t, i) {
      return '<button class="esq-tab-btn fi-' + esc(t.color) + '" role="tab" aria-selected="' + (i === 0) + '" id="tab-' + esc(t.id) + '" data-tab="' + esc(t.id) + '">' + esc(t.nombre) + '</button>';
    }).join('');

    var panels = esquema.tabs.map(function (t, i) {
      var cards = t.ejemplos.map(function (ej) {
        return '<div class="senal-card">' +
          senalImgHtml(ej.archivo, ej.texto) +
          '<div class="senal-card-texto">' + esc(ej.texto) + '</div>' +
          '<div class="senal-card-porque">' + esc(ej.porque) + '</div>' +
          '</div>';
      }).join('');
      return '<div class="esq-tab-panel" role="tabpanel" aria-labelledby="tab-' + esc(t.id) + '" data-panel="' + esc(t.id) + '"' + (i === 0 ? '' : ' hidden') + '>' +
        '<p class="esq-tab-desc">' + esc(t.descripcion) + '</p>' +
        '<div class="senal-grid">' + cards + '</div>' +
        '</div>';
    }).join('');

    return '<div class="esquema-tabs"><div class="esq-tab-bar" role="tablist">' + tabsBtns + '</div>' + panels + '</div>';
  }

  // ---------- Esquema: límites de velocidad visuales ----------
  function renderLimitesVisual(esquema) {
    return '<div class="senal-grid senal-grid-limites">' + esquema.limites.map(function (l) {
      return '<div class="senal-card senal-card-limite">' +
        senalImgHtml(l.archivo, l.label) +
        '<div class="senal-card-valor">' + esc(l.valor) + '</div>' +
        '<div class="senal-card-porque">' + esc(l.label) + '</div>' +
        '</div>';
    }).join('') + '</div>';
  }

  // ---------- Comparativa: tarjetas visuales + tabla detallada colapsable ----------
  function renderComparativaVisual(comp, bloqueId) {
    var resumen = comp.resumenVisual.map(function (item) {
      var visual = item.archivo
        ? senalImgHtml(item.archivo, item.titulo)
        : '<div class="comparativa-visual-icon cv-' + esc(item.colorClave) + '"><i class="fas ' + esc(item.icono) + '"></i></div>';
      return '<div class="comparativa-visual-card cv-borde-' + esc(item.colorClave) + '">' +
        visual +
        '<h4>' + esc(item.titulo) + '</h4>' +
        '<p>' + esc(item.punto) + '</p>' +
        '</div>';
    }).join('');

    var head = '<tr><th></th>' + comp.columnas.map(function (c) { return '<th>' + esc(c) + '</th>'; }).join('') + '</tr>';
    var rows = comp.filas.map(function (f) {
      return '<tr><th>' + esc(f.label) + '</th>' + f.valores.map(function (v) { return '<td>' + esc(v) + '</td>'; }).join('') + '</tr>';
    }).join('');
    var tablaId = 'tabla-' + bloqueId + '-' + Math.random().toString(36).slice(2, 7);

    return '<div class="comparativa-card">' +
      (comp.titulo ? '<h4 class="comparativa-titulo">' + esc(comp.titulo) + '</h4>' : '') +
      '<div class="comparativa-visual-grid">' + resumen + '</div>' +
      '<button class="btn-toggle-tabla" data-target="' + tablaId + '" aria-expanded="false"><i class="fas fa-table"></i> Ver tabla detallada <i class="fas fa-chevron-down"></i></button>' +
      '<div class="comparativa-scroll" id="' + tablaId + '" hidden><table class="comparativa-tabla"><thead>' + head + '</thead><tbody>' + rows + '</tbody></table></div>' +
      '</div>';
  }

  // ---------- Calculadora + diagrama top-down de distancia ----------
  function renderCalculadora(calc, bloqueId, tieneDiagrama) {
    var id = 'calc-' + bloqueId;
    var diagramaHtml = tieneDiagrama
      ? '<div class="diagrama-distancia" id="' + id + '-diagrama">' +
          '<div class="diagrama-distancia-label" id="' + id + '-diagrama-label">0 m</div>' +
          '<div class="diagrama-carretera">' +
            '<div class="diagrama-coche diagrama-coche-tras"><i class="fas fa-car-side"></i></div>' +
            '<div class="diagrama-linea" id="' + id + '-diagrama-linea"></div>' +
            '<div class="diagrama-coche diagrama-coche-delante" id="' + id + '-diagrama-coche2"><i class="fas fa-car-side"></i></div>' +
          '</div>' +
        '</div>'
      : '';
    return '<div class="calculadora-card">' +
      '<h4>' + esc(calc.titulo) + '</h4>' +
      '<p class="calculadora-desc">' + esc(calc.descripcion) + '</p>' +
      diagramaHtml +
      '<div class="calculadora-slider-row">' +
        '<label for="' + id + '-range"><i class="fas fa-gauge-high"></i></label>' +
        '<input type="range" id="' + id + '-range" min="' + calc.velocidadMin + '" max="' + calc.velocidadMax + '" step="' + calc.velocidadPaso + '" value="' + calc.velocidadInicial + '">' +
        '<span class="calculadora-valor" id="' + id + '-valor">' + calc.velocidadInicial + ' km/h</span>' +
      '</div>' +
      '<div class="calculadora-barras" id="' + id + '-barras"></div>' +
      '</div>';
  }

  function actualizarCalculadora(calc, bloqueId, tieneDiagrama) {
    var id = 'calc-' + bloqueId;
    var range = document.getElementById(id + '-range');
    var valorEl = document.getElementById(id + '-valor');
    var barrasEl = document.getElementById(id + '-barras');
    if (!range) return;

    var coche2 = document.getElementById(id + '-diagrama-coche2');
    var linea = document.getElementById(id + '-diagrama-linea');
    var diagLabel = document.getElementById(id + '-diagrama-label');
    var COCHE1_LEFT = 6;   // % — coche de atrás, posición fija
    var MAX_METROS_DIAGRAMA = 220; // escala visual del diagrama
    var MAX_LEFT = 90;     // % — límite derecho para el coche de delante

    function barra(nombre, metros, claseColor) {
      var maxRef = 320;
      var pct = Math.min(100, Math.round((metros / maxRef) * 100));
      return '<div class="calc-barra-item">' +
        '<div class="calc-barra-label">' + nombre + ' <strong>' + metros + ' m</strong></div>' +
        '<div class="calc-barra-track"><div class="calc-barra-fill ' + claseColor + '" style="width:' + pct + '%"></div></div>' +
        '</div>';
    }

    function pintar() {
      var v = parseInt(range.value, 10);
      valorEl.textContent = v + ' km/h';
      var reaccion = Math.round((v / 10) * 3);
      var frenadaSeca = Math.round(Math.pow(v / 10, 2));
      var frenadaMojada = frenadaSeca * 2;
      var totalSeco = reaccion + frenadaSeca;
      var totalMojado = reaccion + frenadaMojada;

      barrasEl.innerHTML =
        barra('Reacción', reaccion, 'cb-blue') +
        barra('Frenada en seco', frenadaSeca, 'cb-orange') +
        barra('Frenada mojada', frenadaMojada, 'cb-red') +
        '<div class="calc-total">Detención total: <strong>' + totalSeco + ' m en seco</strong> · <strong>' + totalMojado + ' m mojado</strong></div>';

      if (tieneDiagrama && coche2 && linea && diagLabel) {
        var frontLeft = Math.min(MAX_LEFT, COCHE1_LEFT + 10 + (totalSeco / MAX_METROS_DIAGRAMA) * 78);
        coche2.style.left = frontLeft + '%';
        linea.style.left = (COCHE1_LEFT + 7) + '%';
        linea.style.width = Math.max(2, frontLeft - COCHE1_LEFT - 7) + '%';
        diagLabel.textContent = totalSeco + ' m';
        diagLabel.style.left = ((COCHE1_LEFT + frontLeft) / 2) + '%';
      }
    }

    range.addEventListener('input', pintar);
    pintar();
  }

  // ---------- Trucos ----------
  function renderTrucos(trucos) {
    return '<div class="trucos-grid">' + trucos.map(function (t) {
      return '<div class="truco-card">' +
        '<div class="truco-icon cv-' + esc(t.colorClave) + '"><i class="fas ' + esc(t.icono) + '"></i></div>' +
        '<p class="truco-frase">' + esc(t.frase) + '</p>' +
        '<p class="truco-exp">' + esc(t.explicacion) + '</p>' +
        '</div>';
    }).join('') + '</div>';
  }

  // ---------- Confusiones típicas (acordeón) ----------
  function renderConfusiones(items) {
    return '<div class="confusiones-list">' + items.map(function (c, i) {
      var pid = 'conf-' + i + '-' + Math.random().toString(36).slice(2, 7);
      return '<div class="confusion-item">' +
        '<button class="confusion-pregunta" aria-expanded="false" data-target="' + pid + '">' +
          '<i class="fas fa-circle-question"></i> ' + esc(c.pregunta) + ' <i class="fas fa-chevron-down confusion-chevron"></i>' +
        '</button>' +
        '<div class="confusion-respuesta" id="' + pid + '" hidden>' + esc(c.respuesta) + '</div>' +
        '</div>';
    }).join('') + '</div>';
  }

  // ---------- Quiz ----------
  function renderQuiz(quiz, bloqueId) {
    var preguntas = quiz.map(function (q, i) {
      var opciones = q.opciones.map(function (op, j) {
        return '<button class="quiz-opcion" data-pregunta="' + i + '" data-opcion="' + j + '">' + esc(op) + '</button>';
      }).join('');
      return '<div class="quiz-pregunta" data-q="' + i + '">' +
        '<div class="quiz-pregunta-num">Pregunta ' + (i + 1) + ' de ' + quiz.length + '</div>' +
        '<div class="quiz-pregunta-texto">' + esc(q.pregunta) + '</div>' +
        '<div class="quiz-opciones">' + opciones + '</div>' +
        '<div class="quiz-explicacion" hidden></div>' +
        '</div>';
    }).join('');
    return '<div class="quiz-card" id="quiz-' + esc(bloqueId) + '">' +
      preguntas +
      '<button class="btn-quiz-comprobar" disabled>Comprobar resultados</button>' +
      '<div class="quiz-resultado" hidden></div>' +
      '</div>';
  }

  function activarQuiz(bloque) {
    var cont = document.getElementById('quiz-' + bloque.id);
    if (!cont) return;
    var respuestas = {};
    var btnComprobar = cont.querySelector('.btn-quiz-comprobar');
    var resultadoEl = cont.querySelector('.quiz-resultado');

    cont.querySelectorAll('.quiz-opcion').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var qIdx = btn.getAttribute('data-pregunta');
        var oIdx = btn.getAttribute('data-opcion');
        var preguntaEl = cont.querySelector('.quiz-pregunta[data-q="' + qIdx + '"]');
        preguntaEl.querySelectorAll('.quiz-opcion').forEach(function (b) { b.classList.remove('selected'); });
        btn.classList.add('selected');
        respuestas[qIdx] = parseInt(oIdx, 10);
        btnComprobar.disabled = Object.keys(respuestas).length < bloque.quiz.length;
      });
    });

    btnComprobar.addEventListener('click', function () {
      var correctas = 0;
      bloque.quiz.forEach(function (q, i) {
        var preguntaEl = cont.querySelector('.quiz-pregunta[data-q="' + i + '"]');
        var explicacionEl = preguntaEl.querySelector('.quiz-explicacion');
        var esCorrecta = respuestas[i] === q.correcta;
        if (esCorrecta) correctas++;
        preguntaEl.querySelectorAll('.quiz-opcion').forEach(function (btn, j) {
          btn.disabled = true;
          if (j === q.correcta) btn.classList.add('quiz-correcta');
          else if (j === respuestas[i]) btn.classList.add('quiz-incorrecta');
        });
        explicacionEl.textContent = q.explicacion;
        explicacionEl.hidden = false;
      });
      btnComprobar.disabled = true;
      btnComprobar.hidden = true;
      var pct = Math.round((correctas / bloque.quiz.length) * 100);
      resultadoEl.innerHTML = '<i class="fas fa-trophy"></i> Has acertado ' + correctas + ' de ' + bloque.quiz.length + ' (' + pct + '%)';
      resultadoEl.hidden = false;
      guardarProgreso(bloque.id, { completado: true, score: correctas, total: bloque.quiz.length, fecha: new Date().toISOString() });

      var postQuizCta = document.createElement('div');
      postQuizCta.className = 'post-quiz-cta';
      postQuizCta.innerHTML =
        '<div class="post-quiz-cta-visual"><img src="img/happy_bali.png" alt="Bali animándote a seguir" class="post-quiz-cta-mascot"></div>' +
        '<div class="post-quiz-cta-content">' +
          '<span class="post-quiz-cta-tag"><i class="fas fa-star"></i> Test completado</span>' +
          '<h4>Para aprobar a la primera, esto no te puede fallar.</h4>' +
          '<p>En la app tienes más sobre <strong>' + esc(bloque.titulo) + '</strong>: preguntas estilo examen oficial, modo cronometrado y tus estadísticas de en qué fallas más — pensada para que no suspendas por una tontería.</p>' +
          '<div class="post-quiz-cta-stats">' + esc(STAT_USUARIOS) + ' ya han aprobado con Bali AI · ' + esc(STAT_APROBADOS) + '</div>' +
          '<a href="' + PLAY_STORE_URL + '" class="post-quiz-cta-btn" target="_blank" rel="noopener"><i class="fab fa-google-play"></i> Seguir en Google Play</a>' +
        '</div>';
      resultadoEl.insertAdjacentElement('afterend', postQuizCta);
    });
  }

  // ---------- Detalle de bloque ----------
  function renderDetalle(bloque) {
    var html = '';
    html += '<div class="detalle-header">';
    html += imgTag(bloque.ilustracionHeader, 'detalle-header-img');
    html += '<div class="detalle-header-text">';
    html += '<div class="section-tag">Aprendizaje</div>';
    html += '<h1>' + esc(bloque.titulo) + '</h1>';
    html += '<p>' + esc(bloque.resumenCorto) + '</p>';
    html += '</div></div>';

    html += renderPasosVisuales(bloque.pasosVisuales);

    var tieneDiagrama = !!bloque.diagrama;

    html += '<div class="detalle-section"><h3>Esquema</h3>';
    if (bloque.esquema.tipo === 'tabs') html += renderTabs(bloque.esquema);
    if (bloque.esquema.tipo === 'visual-velocidad') html += renderLimitesVisual(bloque.esquema);
    html += '</div>';

    if (bloque.comparativa) {
      html += '<div class="detalle-section">' + renderComparativaVisual(bloque.comparativa, bloque.id) + '</div>';
    }

    if (bloque.calculadora) {
      html += '<div class="detalle-section">' + renderCalculadora(bloque.calculadora, bloque.id, tieneDiagrama) + '</div>';
    }

    html += '<div class="detalle-section detalle-section-split">';
    html += '<div>';
    html += '<h3>Trucos para no olvidarlo</h3>';
    html += renderTrucos(bloque.trucos);
    if (bloque.confusionesTipicas) {
      html += '<h3 class="confusiones-titulo">Confusiones típicas</h3>';
      html += renderConfusiones(bloque.confusionesTipicas);
    }
    html += '</div>';
    if (bloque.ilustracionSecundaria) {
      html += '<div class="detalle-ilustracion-wrap">' + imgTag(bloque.ilustracionSecundaria, 'detalle-ilustracion-secundaria') + '</div>';
    }
    html += '</div>';

    html += '<div class="detalle-section"><h3>Ponte a prueba</h3>' + renderQuiz(bloque.quiz, bloque.id) + '</div>';

    detalleContenido.innerHTML = html;

    // Tabs
    var tabBtns = detalleContenido.querySelectorAll('.esq-tab-btn');
    tabBtns.forEach(function (btn) {
      btn.addEventListener('click', function () {
        var target = btn.getAttribute('data-tab');
        tabBtns.forEach(function (b) { b.setAttribute('aria-selected', b === btn); });
        detalleContenido.querySelectorAll('.esq-tab-panel').forEach(function (p) {
          p.hidden = p.getAttribute('data-panel') !== target;
        });
      });
    });

    // Comparativa: toggle de la tabla detallada
    detalleContenido.querySelectorAll('.btn-toggle-tabla').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var target = document.getElementById(btn.getAttribute('data-target'));
        var abierto = btn.getAttribute('aria-expanded') === 'true';
        btn.setAttribute('aria-expanded', String(!abierto));
        target.hidden = abierto;
      });
    });

    // Confusiones (acordeón)
    detalleContenido.querySelectorAll('.confusion-pregunta').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var target = document.getElementById(btn.getAttribute('data-target'));
        var abierto = btn.getAttribute('aria-expanded') === 'true';
        btn.setAttribute('aria-expanded', String(!abierto));
        target.hidden = abierto;
      });
    });

    if (bloque.calculadora) actualizarCalculadora(bloque.calculadora, bloque.id, tieneDiagrama);
    activarQuiz(bloque);
  }

  // ---------- Router (hash) ----------
  function mostrarVista() {
    actualizarProgresoGlobal();
    var hash = location.hash; // "#/bloque/senales-verticales"
    var match = hash.match(/^#\/bloque\/(.+)$/);
    if (match) {
      var bloque = BLOQUES.filter(function (b) { return b.id === match[1] && b.disponible; })[0];
      if (bloque) {
        vistaPortada.hidden = true;
        if (vistaPortadaCta) vistaPortadaCta.hidden = true;
        vistaDetalle.hidden = false;
        renderDetalle(bloque);
        window.scrollTo(0, 0);
        return;
      }
    }
    vistaDetalle.hidden = true;
    vistaPortada.hidden = false;
    if (vistaPortadaCta) vistaPortadaCta.hidden = false;
    renderPortada();
  }

  // ---------- Widget flotante discreto ----------
  function initWidgetFlotante() {
    var widget = document.getElementById('widgetFlotante');
    var btnCerrar = document.getElementById('widgetFlotanteCerrar');
    if (!widget) return;
    if (localStorage.getItem(WIDGET_DISMISSED_KEY) === '1') return;

    var mostrado = false;
    function onScroll() {
      if (!mostrado && window.scrollY > 500) {
        mostrado = true;
        widget.classList.add('visible');
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    if (btnCerrar) {
      btnCerrar.addEventListener('click', function () {
        widget.classList.remove('visible');
        localStorage.setItem(WIDGET_DISMISSED_KEY, '1');
      });
    }
  }

  if (btnVolver) btnVolver.addEventListener('click', function () { location.hash = ''; });
  window.addEventListener('hashchange', mostrarVista);
  mostrarVista();
  initWidgetFlotante();
})();
