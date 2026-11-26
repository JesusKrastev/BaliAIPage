# AGENTS.md

Landing, páginas legales y contenido SEO de **Bali AI**. Sitio estático desplegado en Vercel, sin
framework ni runtime. `npm run build` genera las páginas y copia lo publicable a `dist/`, que es lo
que publica `vercel.json` (`outputDirectory: "dist"`).

La app que esta web describe vive en `C:\Users\crazy\Documents\Repositorios\BaliAI`. **La app manda:
si la web promete algo que la app no hace, se corrige la web.**

## Estructura

- Escritas a mano: `styles.css` (identidad común e interiores), `home.css` (solo secciones de la portada), `js/`.
  El diseño copia el de la app: si cambia la estética de la app, se ajusta la web.
- `privacidad.html`, `terminos.html` y `eliminar-cuenta.html` se escriben a mano, pero
  `build/generar-seo.js` sustituye su navbar y su footer.
- `aprendizaje.html` se escribe a mano, pero `build/generar-seo.js` sustituye su navbar, footer, CTA
  y el grid `#bloquesGrid`.
- **Generadas — no editar a mano:**
  - `index.html` (`build/generar-home.js`)
  - `test-dgt-gratis.html` (`build/generar-test.js`)
  - `aprendizaje/*.html`, que sale de `data/aprendizaje.js`
  - `sitemap.xml` y `robots.txt` (`build/generar-seo.js`). Una página nueva entra sola en el sitemap.
- `dist/`: la salida publicada. Está ignorada por git y se regenera en cada build.
- Cada carpeta con código (`build/`, `data/`, `js/`) tiene un `README.md` con su contrato.

## Comandos

```powershell
npm run prebuild   # imágenes con sharp: img/aprendizaje/*.png → .webp e img/app/
npm run build      # regenera portada, mini test, aprendizaje/, sitemap y dist/; termina verificando el SEO
npm run seo:check  # solo verifica un dist/ ya generado
python -m http.server 8899 -d dist   # servidor local con lo que se publica
```

## Reglas

- El sitio ya no tiene blog (se retiró el 2026-11-26; `vercel.json` redirige `/blog/*` a la portada).
- El texto del temario se cambia en `data/*.js`. Navbar, footer y CTA, en
  `build/plantillas.js`. Los textos de la portada y del mini test, en `build/generar-home.js` y
  `build/generar-test.js`. Editar el HTML generado es trabajo que se pierde en la siguiente build.
- La URL de Google Play está repetida a mano en varios archivos (ver `README.md`). Si cambia,
  actualízala en todos.
- No publiques cifras ni promesas que no puedas verificar en el repo de la app.
- No declares en las legales ninguna herramienta que la app no tenga integrada todavía.
