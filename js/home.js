/* ===== BALI AI — Portada =====
   Revela cada bloque marcado con .reveal cuando entra en pantalla. Sin JavaScript (o si el
   navegador no tiene IntersectionObserver) todo el contenido queda visible desde el principio:
   la clase "js" que oculta los bloques solo se añade cuando el observador ya existe. */
(function () {
  'use strict';
  if (!('IntersectionObserver' in window)) return;
  var items = document.querySelectorAll('.reveal');
  if (!items.length) return;
  document.documentElement.classList.add('js');
  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-in');
      observer.unobserve(entry.target);
    });
  }, { rootMargin: '0px 0px -8% 0px', threshold: 0.12 });
  items.forEach(function (item, index) {
    // Escalonado dentro de una misma fila: cada hermano entra un poco después del anterior.
    item.style.transitionDelay = (index % 4) * 70 + 'ms';
    observer.observe(item);
  });
})();
