# js

## Overview

JavaScript del navegador, sin dependencias ni bundler. Cada archivo es una IIFE en modo
estricto. Las páginas generadas lo cargan con `<script>` y `build/generar-seo.js` lo copia
tal cual a `dist/js/`. `aprendizaje-detalle.js` es la excepción: también se usa como
módulo de Node desde `build/generar-paginas-aprendizaje.js`.

## Interface

- `nav.js`: no expone nada. Encoge `#navbar` al hacer scroll, abre y cierra el menú
  `#hamburger` / `.nav-links` (con `aria-expanded`, cierre con Escape y al redimensionar) y
  conecta `#btnCompartir` a `navigator.share` o, si no existe, al portapapeles.
- `home.js`: no expone nada. Solo la portada. Revela los bloques `.reveal` con
  `IntersectionObserver` y añade la clase `js` a `<html>` solo si el observador existe, así que sin
  JavaScript todo queda visible.
- `test.js`: no expone nada. Corrige `#practice-form` con los datos JSON de
  `#practice-data`, pinta `#practice-result` / `#practice-score` y añade `.is-correct` /
  `.is-wrong` a cada `#question-<i>`. Al hacer `reset` lo limpia todo.
- `aprendizaje-detalle.js`: `window.AprendizajeDetalle` / `module.exports` =
  `{ esc, renderDetalleHTML(bloque, basePath), hidratarDetalle(bloque, root), getProgreso(),
  guardarProgreso(bloqueId, datos), actualizarProgresoGlobal(), registrarVisitaBloque(bloqueId) }`.
- `aprendizaje.js`: no expone nada. Pinta `#bloquesGrid` en `aprendizaje.html` a partir de
  `window.APRENDIZAJE_BLOQUES` y del progreso guardado, y muestra `#widgetFlotante` al pasar
  de 500 px de scroll.
- `aprendizaje-bloque.js`: no expone nada. Fija `window.APRENDIZAJE_BASE_PATH = '../'`,
  busca el bloque por `body[data-bloque-id]` y llama a `hidratarDetalle` y a
  `registrarVisitaBloque`.

## Invariants

- `esc` y `renderDetalleHTML` no pueden tocar `document`: corren en Node durante la build.
- Orden de carga: `../data/aprendizaje.js` → `aprendizaje-detalle.js` → `aprendizaje.js`
  → `aprendizaje-bloque.js`. Tanto `aprendizaje.js` como `aprendizaje-bloque.js` leen
  `window.APRENDIZAJE_BLOQUES` y `window.AprendizajeDetalle`.
- `test.js` espera que el marcado venga de `build/generar-test.js`: inputs
  `name="q<i>"` cuyo `value` es el índice de la opción, y un `<details>` por `fieldset`.
- El progreso es solo local. No hay backend ni sincronización con la app.

## Side Effects

- `localStorage`:
  - `baliAprendizajeProgreso`: lo escribe `guardarProgreso` al terminar un quiz.
  - `baliAprendizajeMicroLogro`: lo escribe `registrarVisitaBloque`.
  - `baliAprendizajeRacha`: lo escribe `actualizarRacha`. `actualizarProgresoGlobal` la llama en
    cada ejecución, así que la racha se actualiza al cargar el hub y cada página de bloque, no
    solo al terminar un quiz.
- `actualizarProgresoGlobal` pinta `#progresoGlobalFill`, `#progresoGlobalLabel`,
  `#progresoZeigarnik` (con enlaces a Google Play) y `#rachaBadge` si están en la página.
- Portapapeles y Web Share API desde `nav.js`.
- Modifican el DOM y registran listeners de `scroll`, `resize`, `keydown`, `click`,
  `submit`, `reset` e `input`.

## Verification

- Run: `node build/verificar-interfaz.js` (necesita `playwright`, que no está en
  `package.json`, Chrome en `C:/Program Files/Google/Chrome/Application/chrome.exe` y el
  sitio servido en `http://127.0.0.1:4173`)
