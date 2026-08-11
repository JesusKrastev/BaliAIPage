/* ===== BALI AI — Navbar y footer compartidos entre generadores =====
   Usado tanto por generar-paginas-aprendizaje.js como por generar-blog.js.
   Ambos escriben páginas a un nivel de profundidad (aprendizaje/*.html,
   blog/*.html), por eso las rutas van siempre con el prefijo "../". */

function navbarHtml(activo) {
  var claseAprendizaje = activo === 'aprendizaje' ? ' class="nav-link-active"' : '';
  var claseBlog = activo === 'blog' ? ' class="nav-link-active"' : '';
  return '' +
    '<nav class="navbar" id="navbar">\n' +
    '    <div class="container">\n' +
    '      <a class="nav-brand" href="../index.html">\n' +
    '        <img src="../img/bali.webp" alt="Bali AI">\n' +
    '        Bali<span>AI</span>\n' +
    '      </a>\n' +
    '      <ul class="nav-links">\n' +
    '        <li><a href="../index.html#funciones">Funciones</a></li>\n' +
    '        <li><a href="../index.html#como-funciona">Cómo funciona</a></li>\n' +
    '        <li><a href="../aprendizaje.html"' + claseAprendizaje + '>Aprendizaje</a></li>\n' +
    '        <li><a href="../blog/index.html"' + claseBlog + '>Blog</a></li>\n' +
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
    '          <div class="footer-desc">La app de inteligencia artificial para preparar el examen teórico de la DGT. Aprueba más rápido, estudia más inteligente.</div>\n' +
    '        </div>\n' +
    '        <div>\n' +
    '          <div class="footer-title">App</div>\n' +
    '          <a href="../index.html#funciones" class="footer-link">Funciones</a>\n' +
    '          <a href="../index.html#como-funciona" class="footer-link">Cómo funciona</a>\n' +
    '          <a href="../aprendizaje.html" class="footer-link">Aprendizaje</a>\n' +
    '          <a href="../blog/index.html" class="footer-link">Blog</a>\n' +
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
    '          <a href="#" class="footer-link">Instagram</a>\n' +
    '          <a href="#" class="footer-link">Twitter / X</a>\n' +
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
    '        <h2>Esto es el repaso. Para aprobar a la primera, hace falta algo más.</h2>\n' +
    '        <p class="cta-subtexto">Tests oficiales, modo examen cronometrado y tu progreso guardado.</p>\n' +
    '        <p class="cta-social-proof">+1.000 conductores ya aprobados · 95.2% · 4.9★</p>\n' +
    '        <div class="store-buttons">\n' +
    '          <a href="https://play.google.com/store/apps/details?id=com.jesuskrastev.bali" class="store-btn" target="_blank" rel="noopener">\n' +
    '            <i class="fab fa-google-play"></i>\n' +
    '            <div class="store-btn-text">\n' +
    '              <div class="store-btn-label">Descargar en</div>\n' +
    '              <div class="store-btn-name">Google Play</div>\n' +
    '            </div>\n' +
    '          </a>\n' +
    '        </div>\n' +
    '        <button class="btn-compartir" id="btnCompartir"><i class="fas fa-user-plus"></i> Compartir con un amigo</button>\n' +
    '      </div>\n' +
    '    </div>\n' +
    '  </section>';
}

module.exports = { navbarHtml: navbarHtml, footerHtml: footerHtml, ctaHtml: ctaHtml };
