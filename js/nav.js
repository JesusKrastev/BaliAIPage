/* ===== BALI AI — Navbar: shrink al hacer scroll + menú hamburguesa =====
   Compartido por todas las páginas del sitio. */
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
})();
