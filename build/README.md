# build

## Overview

Scripts de Node que convierten [`../data/README.md`](../data/README.md) en el sitio
estático y lo publican en `dist/` (el `outputDirectory` de `vercel.json`). La única
dependencia declarada es `sharp`. `verificar-interfaz.js` también usa `playwright`, que no
está en `package.json`. Las páginas se escriben con plantillas de texto, sin framework.

## Interface

`npm run prebuild` (imágenes, solo cuando cambian):

- `comprimir-ilustraciones.js`: convierte `img/aprendizaje/*.png` (sin entrar en `senales/`) a
  `.webp` con calidad 82.
- `preparar-recursos-app.js`: `app-sources/<name>.png` → `img/app/<name con guiones>.webp`.
  Las portadas (`*_cover`) salen a 960 px de ancho y el resto a 640 px. También convierte las
  capturas reales de `app-sources/pantallas/<name>.jpeg` (720×1600): recorta la barra de estado
  y los botones del sistema y las publica a 560 px en `img/app/pantallas/<name>.webp`.

`npm run build` (en este orden):

1. `generar-home.js` → `index.html`
2. `generar-test.js` → `test-dgt-gratis.html`
3. `generar-paginas-aprendizaje.js` → `aprendizaje/<id>.html` (`META`, `metaPara`, `paginaHtml`)
4. `generar-seo.js` → escribe `sitemap.xml` y `robots.txt` y copia la publicación a `dist/`.
   Antes reescribe estas páginas:
   - `index.html`: `<title>`, las metas `description`/`og:*`/`twitter:*`, el JSON-LD
     `MobileApplication`, `<h4>` → `<h3>`, y la FAQ.
   - `aprendizaje.html`: navbar, footer, CTA, `#bloquesGrid`, y el texto «Aprendizaje — Bali AI»
     pasa a ser el título SEO.
   - `privacidad.html`, `terminos.html` y `eliminar-cuenta.html`: navbar y footer.
5. `optimizar-html.js` → añade `width`/`height` a cada `<img>` de `dist/**/*.html` y fuerza
   `fetchpriority="high" loading="eager"` en `.hero-mascot` y `.detalle-header-img`
6. `verificar-seo.js` → comprueba `dist/` (también como `npm run seo:check`)

Módulos compartidos:

- `plantillas.js`: `{ navbarHtml(activo), footerHtml(), ctaHtml(), PLAY_ICON, APPLE_ICON }`. Los iconos
  de tienda son SVG propios porque la portada no carga Font Awesome. El CTA incluye el botón de
  App Store como «Muy pronto» (un `<span>`, no un enlace).

Otros:

- `verificar-interfaz.js`: QA con Playwright. No forma parte de ningún script de npm.

## Invariants

- `plantillas.js` genera rutas con `../` para páginas que están a un nivel de profundidad. Para
  las páginas de la raíz, `generar-home.js`, `generar-test.js` y `generar-seo.js` quitan ese `../`.
- `generar-seo.js` debe ir después de los generadores de contenido. Sustituye las regiones
  `<!-- SEO:<name>:start --> … <!-- SEO:<name>:end -->` (`schema`, `content`) y
  conserva las URLs publicadas.
- `generar-seo.js` publica en `dist/` solo las rutas del sitemap, `styles.css`, `home.css`, `robots.txt`,
  `sitemap.xml`, `img/`, `js/` y `data/aprendizaje.js`. Ese es el único archivo de `data/` que
  carga el navegador.
- `verificar-seo.js` exige, entre otras cosas:
  - sin URLs repetidas en el sitemap;
  - un solo `<h1>` por página;
  - canonical igual a la URL;
  - meta description presente y títulos sin repetir;
  - JSON-LD válido;
  - todos los `href`/`src` internos y anclas existen;
  - todos los `<img>` con `width`/`height`;
  - todas las páginas alcanzables desde la portada;
  - la FAQ de `seo.js` visible en la portada;
  - en `dist/` no aparece `https://baliai.es` ni se publican `.agents`, `.git`, `build`,
    `package.json` o `app.md`.
- `optimizar-html.js` lanza un error si un `<img>` apunta fuera de `dist/`.
- `preparar-recursos-app.js` solo regenera un WebP si falta o si
  es más antiguo que su PNG. `comprimir-ilustraciones.js` procesa cada PNG que encuentra.

## Side Effects

- Escriben en la raíz `index.html`, `test-dgt-gratis.html`, `aprendizaje.html`, `sitemap.xml`,
  `robots.txt` y `aprendizaje/*.html`.
- `generar-seo.js` crea `dist/` y copia allí los archivos. En el HTML publicado sustituye
  `https://baliai.es` por `site.url`, inyecta el preload de `nunito-latin.woff2`, quita los
  enlaces vacíos a Instagram y Twitter / X y cambia `#opiniones` por `index.html#juegos`.
- `optimizar-html.js` reescribe en el sitio los HTML de `dist/`.
- `comprimir-ilustraciones.js` **borra** cada `.png` de `img/aprendizaje/` después de
  convertirlo.
- `preparar-recursos-app.js` escribe en `img/app/`.
- `verificar-interfaz.js` abre Chrome sin interfaz contra `http://127.0.0.1:4173`. Si existe
  `QA_SCREENSHOTS`, guarda capturas en esa carpeta.

## Verification

- Run: `npm run build`
- Run: `npm run seo:check` (solo comprueba un `dist/` ya generado)
