/* ===== BALI AI — Navbar, footer y CTA compartidos entre generadores =====
   Las rutas van con el prefijo "../" porque generar-paginas-aprendizaje.js escribe
   páginas a un nivel de profundidad (aprendizaje/*.html). generar-home.js,
   generar-test.js y generar-seo.js también los usan para páginas de la raíz y
   quitan ese "../". */

/* Logos de tienda en SVG propio: no dependen de Font Awesome, que la portada no carga. */
var PLAY_ICON = '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M22.018 13.298l-3.919 2.218-3.515-3.493 3.543-3.521 3.891 2.202a1.49 1.49 0 0 1 0 2.594zM1.337.924a1.486 1.486 0 0 0-.112.568v21.017c0 .217.045.419.124.6l11.155-11.087L1.337.924zm12.207 10.065l3.258-3.238L3.45.195a1.466 1.466 0 0 0-.946-.179l11.04 10.973zm0 2.067l-11 10.933c.298.036.612-.016.906-.183l13.324-7.54-3.23-3.21z"/></svg>';
var APPLE_ICON = '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701"/></svg>';

function navbarHtml(activo) {
  var claseAprendizaje = activo === 'aprendizaje' ? ' class="nav-link-active"' : '';
  return '' +
    '<nav class="navbar" id="navbar">\n' +
    '    <div class="container">\n' +
    '      <a class="nav-brand" href="../index.html">\n' +
    '        <img src="../img/bali.webp" alt="Bali AI">\n' +
    '        Bali<span>AI</span>\n' +
    '      </a>\n' +
    '      <ul class="nav-links">\n' +
    '        <li><a href="../index.html#funciones">Qué incluye</a></li>\n' +
    '        <li><a href="../index.html#como-funciona">Pregunta a Bali</a></li>\n' +
    '        <li><a href="../aprendizaje.html"' + claseAprendizaje + '>Temario gratis</a></li>\n' +
    '        <li><a href="../test-dgt-gratis.html">Test gratis</a></li>\n' +
    '        <li><a href="../index.html#autoescuelas">Autoescuelas</a></li>\n' +
    '        <li><a href="../index.html#descargar" class="btn-cta">Descargar</a></li>\n' +
    '      </ul>\n' +
    '      <button class="hamburger" id="hamburger" aria-label="Menú">\n' +
    '        <span></span><span></span><span></span>\n' +
    '      </button>\n' +
    '    </div>\n' +
    '  </nav>';
}

function footerHtml() {
  return '' +
    '<footer>\n' +
    '    <div class="container">\n' +
    '      <div class="footer-grid">\n' +
    '        <div>\n' +
    '          <div class="footer-brand">\n' +
    '            <img src="../img/bali.webp" alt="Bali AI">\n' +
    '            Bali<span>AI</span>\n' +
    '          </div>\n' +
    '          <div class="footer-desc">Tests, repaso de fallos y temario del permiso B. Prepara el teórico DGT con Bali AI en Android. iPhone, muy pronto.</div>\n' +
    '        </div>\n' +
    '        <div>\n' +
    '          <div class="footer-title">App</div>\n' +
    '          <a href="../index.html#funciones" class="footer-link">Funciones</a>\n' +
    '          <a href="../index.html#como-funciona" class="footer-link">Cómo funciona</a>\n' +
    '          <a href="../aprendizaje.html" class="footer-link">Aprendizaje</a>\n' +
    '          <a href="../test-dgt-gratis.html" class="footer-link">Mini test gratis</a>\n' +
    '          <a href="../index.html#autoescuelas" class="footer-link">Para autoescuelas</a>\n' +
    '          <a href="../index.html#descargar" class="footer-link">Descargar</a>\n' +
    '        </div>\n' +
    '        <div>\n' +
    '          <div class="footer-title">Legal</div>\n' +
    '          <a href="../privacidad.html" class="footer-link">Política de privacidad</a>\n' +
    '          <a href="../eliminar-cuenta.html" class="footer-link">Eliminar cuenta</a>\n' +
    '          <a href="../terminos.html" class="footer-link">Términos de uso</a>\n' +
    '        </div>\n' +
    '        <div>\n' +
    '          <div class="footer-title">Contacto</div>\n' +
    '          <a href="mailto:appbaliai@gmail.com" class="footer-link">appbaliai@gmail.com</a>\n' +
    '          <a href="https://play.google.com/store/apps/details?id=com.jesuskrastev.bali" class="footer-link" target="_blank" rel="noopener">Bali AI en Google Play</a>\n' +
    '        </div>\n' +
    '      </div>\n' +
    '      <div class="footer-bottom">\n' +
    '        © 2026 Bali AI · Todos los derechos reservados · No afiliado a la DGT oficial\n' +
    '      </div>\n' +
    '    </div>\n' +
    '  </footer>';
}

function ctaHtml() {
  return '' +
    '<section class="cta" id="descargar">\n' +
    '    <div class="container">\n' +
    '      <div class="cta-card">\n' +
    '        <img src="../img/happy_bali.webp" alt="Bali te espera" class="cta-mascot">\n' +
    '        <h2>Tu siguiente sesión de estudio empieza en Bali AI</h2>\n' +
    '        <p class="cta-subtexto">Practica con tests, repasa tus fallos con IA y sigue tu progreso desde el móvil.</p>\n' +
    '        <p class="cta-social-proof">Android hoy, iPhone muy pronto · Descarga gratuita · Compras dentro de la aplicación</p>\n' +
    '        <div class="store-buttons">\n' +
    '          <a href="https://play.google.com/store/apps/details?id=com.jesuskrastev.bali" class="store-btn" target="_blank" rel="noopener">\n' +
    '            ' + PLAY_ICON + '\n' +
    '            <div class="store-btn-text">\n' +
    '              <div class="store-btn-label">Descargar en</div>\n' +
    '              <div class="store-btn-name">Google Play</div>\n' +
    '            </div>\n' +
    '          </a>\n' +
    '          <span class="store-btn store-btn-soon" role="note" aria-label="App Store: muy pronto">\n' +
    '            ' + APPLE_ICON + '\n' +
    '            <div class="store-btn-text">\n' +
    '              <div class="store-btn-label">Muy pronto en</div>\n' +
    '              <div class="store-btn-name">App Store</div>\n' +
    '            </div>\n' +
    '          </span>\n' +
    '        </div>\n' +
    '        <button class="btn-compartir" id="btnCompartir">Compartir con un amigo</button>\n' +
    '      </div>\n' +
    '    </div>\n' +
    '  </section>';
}

module.exports = { navbarHtml: navbarHtml, footerHtml: footerHtml, ctaHtml: ctaHtml, PLAY_ICON: PLAY_ICON, APPLE_ICON: APPLE_ICON };
