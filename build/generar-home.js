const fs = require('fs');
const path = require('path');
const site = require('../data/site');
const seo = require('../data/seo');
const assets = require('../data/app-assets');
const templates = require('./plantillas');
const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;');
const image = (name, css = '', eager = false) => `<img src="img/app/${name.replace(/_/g, '-')}.webp" alt="${esc(assets.find(a => a.name === name).alt)}" class="${css}" loading="${eager ? 'eager' : 'lazy'}"${eager ? ' fetchpriority="high"' : ''}>`;
const download = (label, css = 'btn-hero-primary') => `<a class="${css}" href="${site.playUrl}" target="_blank" rel="noopener">${label} <span aria-hidden="true">↗</span></a>`;
const modes = [
  ['lesson_test', 'Practica con tests', 'Haz una sesión de preguntas y comprueba qué conceptos necesitas repasar. Una respuesta correcta cuenta más cuando entiendes la regla.', 'test-dgt-gratis.html', 'Probar un mini test'],
  ['lesson_review', 'Vuelve a tus fallos', 'Bali usa tu historial de respuestas para adaptar la práctica. Dedica más atención a las dudas que repites y menos a lo que ya dominas.', 'blog/repasar-fallos-test-dgt.html', 'Cómo repasar los errores'],
  ['lesson_exam', 'Estudia por temas', 'Señales, prioridad de paso, velocidad y más bloques del permiso B. Lee la explicación y ponla a prueba antes de pasar al siguiente tema.', 'aprendizaje.html', 'Ver el temario por bloques']
];
const topics = [
  ['game_senal_relampago_cover', 'Señales de tráfico', 'Reconoce la forma, el color y lo que te indica cada señal.', 'senales-verticales'],
  ['game_prioridad_cruce_cover', 'Prioridad en los cruces', 'Ordena las señales y entiende quién debe ceder el paso.', 'intersecciones'],
  ['game_puntos_carne_cover', 'Puntos del carnet', 'Repasa las infracciones y consulta sus consecuencias.', 'sanciones-puntos'],
  ['game_legal_o_multa_cover', 'Normas de circulación', 'Relaciona las reglas con situaciones que puedes encontrar en la vía.', 'normas-generales']
];
const html = `<!DOCTYPE html>
<html lang="es"><head>
<meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${esc(seo.title)}</title><meta name="description" content="${esc(seo.description)}">
<link rel="canonical" href="${site.url}/"><meta name="theme-color" content="#0D0F14">
<meta property="og:type" content="website"><meta property="og:url" content="${site.url}/"><meta property="og:site_name" content="Bali AI"><meta property="og:locale" content="es_ES">
<meta property="og:title" content="${esc(seo.title)}"><meta property="og:description" content="${esc(seo.description)}"><meta property="og:image" content="${site.url}/img/guides/mejor-app-teorico-dgt-feature.webp"><meta property="og:image:alt" content="Ilustración de un móvil y un coche naranja para preparar el teórico">
<meta name="twitter:card" content="summary_large_image"><meta name="twitter:title" content="${esc(seo.title)}"><meta name="twitter:description" content="${esc(seo.description)}"><meta name="twitter:image" content="${site.url}/img/guides/mejor-app-teorico-dgt-feature.webp">
<link rel="icon" href="img/bali.png"><link rel="apple-touch-icon" href="img/bali.png"><link rel="stylesheet" href="styles.css">
<script type="application/ld+json">${JSON.stringify({ '@context': 'https://schema.org', '@type': 'MobileApplication', '@id': site.url + '/#app', name: site.name, url: site.url + '/', description: seo.description, operatingSystem: 'Android', applicationCategory: 'EducationalApplication', image: site.url + '/img/bali.png', installUrl: site.playUrl, inLanguage: 'es-ES', offers: { '@type': 'Offer', price: '0', priceCurrency: 'EUR', description: 'Descarga gratuita con compras dentro de la aplicación' }, featureList: ['Tests adaptados a tus respuestas', 'Repaso de fallos', 'Simulacros del teórico', 'Práctica por temas'] })}</script>
<script type="application/ld+json">${JSON.stringify({ '@context': 'https://schema.org', '@type': 'Organization', '@id': site.url + '/#organization', name: site.name, url: site.url + '/', logo: site.url + '/img/bali.png', email: 'appbaliai@gmail.com' })}</script>
</head><body class="landing-v2">
<a class="skip-link" href="#contenido">Ir al contenido</a>
${templates.navbarHtml('').replace(/\.\.\//g, '')}
<main id="contenido">
<section class="hero"><div class="container"><div class="hero-content">
<div class="hero-badge"><span class="dot"></span> Tu teórico, paso a paso</div>
<h1>La app para el teórico DGT que <span class="highlight">aprende de tus fallos</span></h1>
<p class="hero-desc">Prepara el permiso B con Bali AI. Practica con tests, repasa los errores con inteligencia artificial y comprueba tu progreso antes de volver a intentarlo.</p>
<div class="hero-buttons">${download('Descargar en Google Play')}<a class="btn-hero-secondary" href="test-dgt-gratis.html">Probar un test gratis</a></div>
<p class="download-note">Para Android · Descarga gratuita · Compras dentro de la app</p>
<ul class="hero-proof"><li>Repaso adaptado a tus respuestas</li><li>Temario gratuito en la web</li><li>Aplicación independiente de la DGT</li></ul>
</div><div class="hero-visual hero-app-art"><div class="hero-glow"></div><img src="img/happy_bali.webp" width="434" height="447" alt="Bali, la mascota naranja de tu compañero de estudio" class="hero-mascot" fetchpriority="high" loading="eager">${image('exam_new_record_trophy', 'hero-trophy')}<span class="art-label">Avanza una pregunta cada vez</span></div></div></section>
<section class="value-strip" aria-label="Qué encontrarás en Bali AI"><div class="container"><span>Tests y simulacros</span><span>Repaso de fallos con IA</span><span>Teoría por bloques</span><span>Progreso y constancia</span></div></section>
<section class="app-section" id="funciones"><div class="container"><div class="section-header"><div class="section-tag">Una forma concreta de estudiar</div><h2 class="section-title">Haz el test. Entiende el fallo. <span>Vuelve a practicar.</span></h2><p class="section-sub">Elige la sesión según lo que necesitas trabajar hoy.</p></div><div class="study-modes">${modes.map(([asset,title,text,url,label]) => `<article class="study-mode">${image(asset)}<h3>${title}</h3><p>${text}</p><a class="text-link" href="${url}">${label} →</a></article>`).join('')}</div></div></section>
<section class="app-section app-section-alt" id="como-funciona"><div class="container app-split"><div>${image('priority_roundabout', 'app-square-art')}<p class="image-caption">Ilustración original de Bali AI. La web ofrece explicaciones y mini tests.</p></div><div><div class="section-tag">Empieza con una duda</div><h2 class="section-title">¿Siempre fallas <span>en lo mismo?</span></h2><p>Una señal que confundes. Una prioridad que interpretas al revés. Una excepción que pasaste por alto. Trabajar ese concepto suele ser más útil que encadenar tests sin revisar.</p><ol class="study-steps"><li><strong>Comprueba tu punto de partida.</strong> Haz una sesión y anota qué tema necesitas entender.</li><li><strong>Lee la explicación.</strong> Repasa la regla y compárala con un caso parecido.</li><li><strong>Practica de nuevo.</strong> Vuelve al tema y comprueba si puedes explicar la respuesta.</li></ol>${download('Repasar con Bali AI')}<a class="text-link" href="blog/plan-estudio-teorico-dgt.html">Organizar mi estudio →</a></div></div></section>
<section class="app-section" id="temario"><div class="container"><div class="section-header"><div class="section-tag">También puedes empezar aquí</div><h2 class="section-title">Temario DGT con <span>explicaciones visuales</span></h2><p class="section-sub">Repasa un bloque en la web y continúa practicando en la app.</p></div><div class="topic-grid">${topics.map(([asset,title,text,slug]) => `<a href="aprendizaje/${slug}.html" class="topic-card">${image(asset)}<div><h3>${title}</h3><p>${text}</p><span class="text-link">Repasar este bloque →</span></div></a>`).join('')}</div><a class="text-link section-more" href="aprendizaje.html">Ver los 12 bloques del temario →</a></div></section>
<section class="app-section app-section-alt" id="juegos"><div class="container app-split"><div>${image('game_peligro_cover', 'app-wide-art')}<p class="image-caption">Escena ilustrada de la app, usada como apoyo visual.</p></div><div><div class="section-tag">Otra manera de practicar</div><h2 class="section-title">Bali Drive: <span>conduce, frena y cede</span></h2><p>En el juego de Bali AI controlas el coche con un dedo. Practicas decisiones de conducción mientras esquivas obstáculos y prestas atención a las situaciones de la vía.</p><p>Combina el juego con el estudio del temario y los tests. Una partida es una actividad de práctica; no sustituye la preparación del examen ni las clases de conducción.</p>${download('Conocer Bali AI')}<div class="reward-row">${image('shop_double_xp')}${image('shop_surprise_chest')}${image('streak_recovery')}<p>Experiencia, recompensas y rachas para acompañar tu hábito de estudio.</p></div></div></div></section>
<!-- SEO:content:start --><!-- SEO:content:end -->
${templates.ctaHtml().replace(/\.\.\//g, '')}
</main>
${templates.footerHtml().replace(/\.\.\//g, '')}
<a class="mobile-download" href="${site.playUrl}" target="_blank" rel="noopener">Descargar Bali AI para Android ↗</a>
<script src="js/nav.js" defer></script><script defer src="/_vercel/insights/script.js"></script>
</body></html>`;
fs.writeFileSync(path.join(__dirname, '../index.html'), html);
console.log('Portada generada con contenido real, ilustraciones de la app y CTA.');
