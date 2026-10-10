# Bali AI: base de contenido SEO

Revisión: 10 de octubre de 2026.

## Producto y fuentes

- Nombre en Google Play: Bali AI: Test DGT 2026 con IA.
- Identificador: `com.jesuskrastev.bali`. Plataforma confirmada: Android.
- Ficha: https://play.google.com/store/apps/details?id=com.jesuskrastev.bali
- Descarga gratuita; la tienda señala compras integradas.
- Funciones descritas: tests adaptados al historial de respuestas, repaso de errores, simulacros, práctica por temas y estadísticas de progreso. El temario incluye el permiso B.
- Aplicación independiente de la DGT.

La ficha no permite verificar cifras de aprobados, usuarios activos ni valoración media. Se han retirado de la portada y del CTA compartido. No se ha confirmado una versión iOS.

Dominio principal confirmado por el propietario: `https://baliaipage.vercel.app`. Se configura en `data/site.js` y se aplica a canonical, schema, sitemap y tarjetas sociales del HTML publicado.

## Recursos originales y nuevas páginas

Se conservan 15 originales de `BaliAI/app/src/main/res/drawable` en `build/app-sources`, con sus nombres de origen y textos alternativos en `data/app-assets.js`. El build genera WebP en `img/app`. Son ilustraciones del producto, no capturas de pantallas. El código Android confirma Bali Drive como juego actualmente accesible; las portadas de otros modos se usan como ilustraciones de temas, sin anunciar juegos retirados.

Las fuentes Nunito y Nunito Sans se alojan localmente, con las licencias OFL correspondientes en `img/fonts`.

- `test-dgt-gratis.html`: intención «test DGT gratis», 10 preguntas educativas, corrección y enlaces de repaso.
- `blog/repasar-fallos-test-dgt.html`: cómo repasar los errores; enlaza con el test y los bloques.
- `blog/plan-estudio-teorico-dgt.html`: planificación del estudio por semanas, sin promesas de aprobar.
- `blog/como-estudiar-senales-trafico.html`: comparación de señales y repaso de conceptos.

La revisión normativa utiliza el Reglamento General de Circulación consolidado del BOE, el Real Decreto 518/2026 y las páginas oficiales de la DGT sobre V16 y recuperación de puntos. El contenido no sustituye esas fuentes ni la formación de la autoescuela.

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
- La compilación crea `dist/` con los archivos públicos y comprueba 27 URLs del sitemap. El índice de aprendizaje incluye enlaces sin ejecutar JavaScript.
- `data/seo.js` alimenta la FAQ visible y su JSON-LD; los generadores usan los datos del blog y aprendizaje.

## Mantenimiento

Ejecutar `npm ci` y `npm run build`. Usar `npm run seo:check` para repetir la comprobación del resultado publicado. Vercel debe servir `dist/`.

Tras desplegar, enviar `https://baliaipage.vercel.app/sitemap.xml` a Google Search Console. Seguir revisando el temario cuando cambie la normativa. La optimización de metadatos no certifica la exactitud de todo el temario ni garantiza una posición en buscadores.
