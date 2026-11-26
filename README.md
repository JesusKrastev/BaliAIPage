# BaliAIPage

## System Overview

Landing, páginas legales y contenido SEO de **Bali AI**, una app Android para preparar el
teórico de la DGT. Es un sitio estático sin framework ni runtime:

```text
data/*.js ──► build/*.js ──► HTML en la raíz y aprendizaje/ ──► dist/ ──► Vercel
                   ▲                                                    (vercel.json: outputDirectory "dist")
                   └── js/aprendizaje-detalle.js (render compartido Node/navegador)
```

En el navegador, `js/` añade la interactividad sobre el HTML ya generado. El progreso del
temario se guarda en `localStorage`.

## Local Interface & Invariants

La raíz no tiene código fuente propio. Contiene:

- **Escritos a mano:** `styles.css` y `home.css`. `styles.css` define la identidad de toda la web,
  calcada de la app (noche azul, tarjetas de pizarra con relieve, botones 3D naranjas, Nunito,
  confeti de celebración, cabeceras con Bali) y el diseño de las páginas interiores; `home.css`
  añade solo las secciones de la portada. Las ilustraciones salen del repo de la app
  (`build/app-sources/`, registradas en `data/app-assets.js` y `data/app-screens.js`).
- **Escritos a mano y retocados por la build:** `aprendizaje.html` (`build/generar-seo.js`
  sustituye su navbar, su footer, su CTA y el grid `#bloquesGrid`) y las legales
  `privacidad.html`, `terminos.html` y `eliminar-cuenta.html` (sustituye su navbar y su footer).
- **Generados:** `index.html`, `test-dgt-gratis.html`, `aprendizaje/*.html`,
  `sitemap.xml` y `robots.txt`. Se cambian en `data/` o `build/`, no a mano.
- `vercel.json` publica `dist/`, cachea `/img/(.*)` durante 7 días y redirige a la portada las URLs
  del antiguo blog (`/blog` y `/blog/*`), que se retiró el 2026-11-26.
- `package.json` define `prebuild`, `build` y `seo:check`. La única dependencia declarada es `sharp`.

## Subdirectories & System Boundaries

- data: [./data/README.md](./data/README.md). Contenido como módulos CommonJS: bloques del
  temario, mini test, SEO de portada, `site.url` / `playUrl` y alt de las
  ilustraciones de la app.
- build: [./build/README.md](./build/README.md). Preparación de imágenes con `sharp`,
  generadores de HTML, publicación en `dist/` y verificación SEO.
- js: [./js/README.md](./js/README.md). Scripts del navegador para el menú, el mini test,
  el hub y las páginas del temario, y el render compartido `AprendizajeDetalle`.
- Solo recursos, sin contrato: `img/` (WebP, fuentes, señales, `og-bali.jpg` para redes) y `aprendizaje/`
  (HTML generado), `dist/` (salida, ignorado por git).

## Global Invariants

- La app manda: si la web promete algo que la app no hace, se corrige la web.
- El origen del sitio sale de `data/site.js`: `SITE_URL` o, por defecto,
  `https://baliaipage.vercel.app`. `verificar-seo.js` rechaza cualquier `https://baliai.es`
  que quede en `dist/`.
- La URL de Google Play está en `site.playUrl`, pero también fija en
  `js/aprendizaje-detalle.js`, `build/plantillas.js` y `build/generar-paginas-aprendizaje.js`.
  Si cambia, hay que actualizarla en todos.
- Cada página publicada está en `sitemap.xml`, se puede alcanzar desde la portada y tiene
  un solo `<h1>`, canonical propio y un título que no se repite.
- Nunca se publican `.agents`, `.git`, `build`, `package.json` ni `app.md`.
- `data/aprendizaje.js` y `js/aprendizaje-detalle.js` tienen que funcionar igual en Node y
  en el navegador.

## Global Side Effects

- La build reescribe los HTML generados de la raíz y `aprendizaje/`, además de
  `sitemap.xml`, `robots.txt` y `dist/` entero.
- `npm run prebuild` escribe en `img/app/` e `img/aprendizaje/`, y borra los
  `.png` de `img/aprendizaje/` después de convertirlos.
- El sitio usa Nunito y Nunito Sans (`img/fonts/`, licencia OFL) y capturas reales de la app
  en `img/app/pantallas/`.
- Integraciones externas a las que enlazan las páginas: Vercel Insights
  (`/_vercel/insights/script.js`), Font Awesome desde cdnjs y la ficha de Google Play.
- Navegador: claves de `localStorage` `baliAprendizajeProgreso`, `baliAprendizajeRacha` y
  `baliAprendizajeMicroLogro`.

## System Verification

- Run: `npm run build` (termina con `build/verificar-seo.js`)
- Run: `npm run seo:check` (solo comprueba un `dist/` ya generado)
