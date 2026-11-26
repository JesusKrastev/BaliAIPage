# data

## Overview

Contenido estructurado del sitio: temario, mini test, SEO y FAQ de la portada, e inventario de
ilustraciones y capturas de la app.
Son módulos CommonJS que leen los generadores de [`../build/README.md`](../build/README.md).
No es la única fuente de texto. Estos generadores también llevan texto escrito a mano:
- `generar-home.js`: héroe, `perks`, las paradas del camino (`stops`), la tienda (`shop`) y autoescuelas.
- `generar-test.js`: título y descripción.
- `generar-paginas-aprendizaje.js`: el mapa `META`.
- `plantillas.js`: navbar, footer y CTA. `aprendizaje.js` también se
carga en el navegador con `<script>` y se expone como global de `window`. El texto
del temario se cambia aquí, nunca en el HTML generado.

## Interface

| Archivo | Exporta | Forma |
| --- | --- | --- |
| `site.js` | `{ url, name, reviewed, playUrl }` | `url` sale de `process.env.SITE_URL` (por defecto `https://baliaipage.vercel.app`) sin `/` final |
| `seo.js` | `{ title, description, faq[] }` | Portada: `<title>`, meta description y FAQ (`{ pregunta, respuesta }`) |
| `aprendizaje.js` | `APRENDIZAJE_BLOQUES` (array) | 12 bloques. Campos: `id`, `titulo`, `icono`, `color`, `resumenCorto`, `disponible`, `ilustracionHeader`, `ilustracionSecundaria`, `pasosVisuales`, `esquema`, `comparativa`, `trucos`, `confusionesTipicas`, `quiz`. Opcionales: `calculadora`, `diagrama` |
| `test.js` | `questions` (array) | 10 preguntas del mini test (`pregunta`, `opciones`, `correcta`, `explicacion`, `topic`) tomadas del `quiz` de `senales-verticales` e `intersecciones` |
| `app-assets.js` | array `{ name, alt }` | 27 ilustraciones de la app (Bali en tres poses, objetos de la tienda, coche de Bali Drive…). `name` coincide con `../build/app-sources/<name>.png` |
| `app-screens.js` | array `{ name, alt }` | 10 capturas reales de la app (camino, test, chat, resultado, racha, tienda, rango, Bali Drive…). `name` coincide con `../build/app-sources/pantallas/<name>.jpeg` |

## Invariants

- `site.js` lanza un error si `SITE_URL` no es un origen HTTPS sin ruta (`/^https:\/\/[^/]+$/`).
- `aprendizaje.js` debe seguir siendo válido como script de navegador y como
  módulo de Node: terminan con `if (typeof window !== 'undefined') window.X = X;` y
  `if (typeof module !== 'undefined' && module.exports) module.exports = X;`.
- `test.js` depende de los índices del `quiz` de `senales-verticales` (descarta el índice 4) y de
  los cinco primeros de `intersecciones`, y reescribe `questions[0]` y `questions[7]`. Si cambias
  ese `quiz`, cambia el mini test.
- Solo los bloques con `disponible: true` generan página y entran en el sitemap.

## Side Effects

- Ninguno al importar: no hay E/S de archivos ni de red. `site.js` lee `process.env.SITE_URL`.

## Verification

- Run: `npm run build` (regenera las páginas y termina con `build/verificar-seo.js`)
