/* ===== BALI AI — Navbar + botón compartir, compartido por todas las páginas =====
   Shrink del navbar al hacer scroll, menú hamburguesa y el botón "Compartir"
   que aparece en la tarjeta de descarga (usa Web Share API si existe, si no
   copia el enlace al portapapeles). */
(function () {
  'use strict';

  window.addEventListener('scroll', function () {
    var nav = document.getElementById('navbar');
    if (!nav) return;
    if (window.scrollY > 60) {
      nav.style.padding = '8px 0';
      nav.style.background = 'rgba(13,15,20,0.97)';
    } else {
      nav.style.padding = '14px 0';
      nav.style.background = 'rgba(13,15,20,0.92)';
    }
  });

  var hamburger = document.getElementById('hamburger');
  var navLinks = document.querySelector('.nav-links');
  if (hamburger && navLinks) {
    hamburger.addEventListener('click', function () {
      navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
      navLinks.style.flexDirection = 'column';
      navLinks.style.position = 'absolute';
      navLinks.style.top = '100%';
      navLinks.style.left = '0';
      navLinks.style.right = '0';
      navLinks.style.background = 'rgba(13,15,20,0.98)';
      navLinks.style.padding = '24px';
      navLinks.style.gap = '16px';
      navLinks.style.borderBottom = '1px solid rgba(244,123,32,0.15)';
    });
  }

  var btnCompartir = document.getElementById('btnCompartir');
  if (btnCompartir) {
    btnCompartir.addEventListener('click', function () {
      var data = { title: document.title, text: 'Repasa el temario del teórico DGT gratis con esquemas, trucos y mini tests.', url: location.origin + location.pathname };
      if (navigator.share) {
        navigator.share(data).catch(function () {});
      } else {
        navigator.clipboard.writeText(data.url).then(function () {
          var textoOriginal = btnCompartir.innerHTML;
          btnCompartir.innerHTML = '<i class="fas fa-check"></i> Enlace copiado';
          setTimeout(function () { btnCompartir.innerHTML = textoOriginal; }, 2200);
        }).catch(function () {});
      }
    });
  }
})();
