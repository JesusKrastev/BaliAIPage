# Bali AI: base de contenido SEO

Revisión: 10 de octubre de 2026.

## Producto y fuentes

- Nombre en Google Play: Bali AI: Test DGT 2026 con IA.
- Identificador: `com.jesuskrastev.bali`. Plataforma confirmada: Android.
- Ficha: https://play.google.com/store/apps/details?id=com.jesuskrastev.bali
- Descarga gratuita; la tienda señala compras integradas.
- Funciones descritas: tests adaptados al historial de respuestas, repaso de errores, simulacros, práctica por temas y estadísticas de progreso. El temario incluye el permiso B.
- Aplicación independiente de la DGT.

La ficha no permite verificar las cifras de aprobados, usuarios activos ni valoración media que ya aparecen en la web. No se añaden al schema. Conviene respaldarlas con datos propios antes de usarlas como prueba social. No se ha confirmado una versión iOS.

## Palabras clave y ubicación

La búsqueda pública muestra páginas de práctica y apps para «tests DGT» y «app examen teórico DGT». Es una validación cualitativa de intención, sin estimaciones de volumen, dificultad ni posiciones propias.

- Primarias: tests DGT gratis, examen teórico DGT, app teórico DGT, temario permiso B. Ubicación: título, descripción y H1 de la portada.
- Secundarias: repaso de fallos, tests por temas, señales de tráfico. Ubicación: funciones, FAQ y enlaces de aprendizaje.
- Cómo preparar el teórico del permiso B: artículo de temario.
- Cómo repasar los fallos del teórico: artículo de errores y FAQ de portada.
- Qué app elegir para el teórico DGT: artículo de comparativa.
- Cómo estudiar las señales verticales: bloque de señales verticales.
- Qué significan las marcas viales: bloque de señales horizontales.
- Cómo repasar prioridades en intersecciones: bloque de intersecciones.
- Cómo estudiar velocidad y distancia de seguridad: bloque de velocidad.
- Cuántos fallos permite el examen: artículo sobre preguntas, fallos y precio.

Se conservan las URLs existentes para aprovechar los contenidos publicados y evitar duplicarlos con guías de intención idéntica.

## Recursos y publicación

- Identidad existente: fondo oscuro, naranja y mascota Bali.
- Icono: `img/bali.png`; mascotas optimizadas: `img/*.webp`.
- Ilustraciones educativas existentes: `img/aprendizaje/*.webp`. No son capturas de la app.
- No se han descargado ni publicado capturas nuevas de la tienda.
- Imágenes generadas con la herramienta integrada `image_gen`, por petición expresa del usuario. No se necesitó una clave de API. Cinco escenas distintas, sin texto, con paleta naranja y carbón.
- Originales PNG 1536×1024: `build/image-sources/`. Prompts exactos y procedencia: `build/image-prompts.json`.
- WebP publicados: `img/guides/`, con variantes de 480 y 960 píxeles y una imagen completa de 1536 píxeles por artículo. Los originales se conservan fuera de la carpeta de publicación.
- Cada ilustración aparece en el artículo, en las tarjetas de blog y artículos relacionados, en Open Graph/Twitter y en el JSON-LD. Las tres guías de portada también muestran sus imágenes.
- La compilación crea `dist/` con los archivos públicos y comprueba 23 URLs del sitemap. El índice de aprendizaje incluye enlaces sin ejecutar JavaScript.
- `data/seo.js` alimenta la FAQ visible y su JSON-LD; los generadores usan los datos del blog y aprendizaje.

## Mantenimiento

Ejecutar `npm ci` y `npm run build`. Usar `npm run seo:check` para repetir la comprobación del resultado publicado. Vercel debe servir `dist/`.

Tras desplegar, enviar `https://baliai.es/sitemap.xml` a Google Search Console. Revisar por separado afirmaciones sobre cambios normativos de 2026 de los artículos existentes antes de ampliar ese contenido. La optimización de metadatos no certifica la exactitud de todo el temario.
