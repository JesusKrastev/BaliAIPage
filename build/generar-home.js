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
  ['lesson_test', 'Tests para practicar cada día', 'Responde preguntas del permiso B desde el móvil, consulta la explicación y descubre qué temas necesitas trabajar. Puedes practicar por bloques.', 'Practicar en Bali AI'],
  ['lesson_review', 'Repaso de fallos con IA', 'Tu historial de respuestas orienta las siguientes sesiones. Bali da más atención a las preguntas que te cuestan para que puedas trabajar tus dudas.', 'Repasar con Bali AI'],
  ['lesson_exam', 'Simulacros con cronómetro', 'Practica en el modo examen de la app: 30 preguntas, 30 minutos y un resultado al terminar. Acostúmbrate a responder con tiempo limitado.', 'Hacer simulacros en Bali AI']
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
${templates.navbarHtml('').replace(/\.\.\//g, '').replace(/<ul class="nav-links">[\s\S]*?<\/ul>/, '<ul class="nav-links"><li><a href="#funciones">Qué incluye</a></li><li><a href="#como-funciona">Repaso con IA</a></li><li><a href="#progreso">Tu progreso</a></li><li><a href="#juegos">Bali Drive</a></li><li>' + download('Descargar', 'btn-cta') + '</li></ul>')}
<main id="contenido">
<section class="hero"><div class="container"><div class="hero-content">
<div class="hero-badge"><span class="dot"></span> Bali AI · App para Android</div>
<h1>Prepara el teórico DGT <span class="highlight">con tests, simulacros e IA.</span></h1>
<p class="hero-desc">Practica desde tu móvil, vuelve a tus fallos y sigue tu progreso. Bali AI reúne lo que necesitas para estudiar el permiso B en una sola app.</p>
<div class="hero-buttons">${download('Descargar Bali AI gratis')}<a class="btn-hero-secondary" href="#funciones">Ver qué incluye la app</a></div>
<p class="download-note">Para Android · Descarga gratuita · Compras dentro de la app</p>
<ul class="hero-proof"><li>Tests y práctica por temas</li><li>Repaso personalizado según tus fallos</li><li>Simulacros y estadísticas de progreso</li></ul>
</div><div class="hero-visual hero-app-art"><div class="hero-glow"></div><img src="img/happy_bali.webp" width="434" height="447" alt="Bali, la mascota naranja de tu compañero de estudio" class="hero-mascot" fetchpriority="high" loading="eager">${image('exam_new_record_trophy', 'hero-trophy')}<span class="art-label">Tu compañero para el teórico</span></div></div></section>
<section class="value-strip" aria-label="Qué encontrarás en Bali AI"><div class="container"><span>Tests y simulacros</span><span>Repaso de fallos con IA</span><span>Teoría por bloques</span><span>Progreso y constancia</span></div></section>
<section class="app-section" id="funciones"><div class="container"><div class="section-header"><div class="section-tag">Qué te llevas al descargar Bali AI</div><h2 class="section-title">Tres formas de practicar. <span>Una sola app.</span></h2><p class="section-sub">Elige tests, repaso o simulacros según lo que quieras trabajar hoy.</p></div><div class="study-modes">${modes.map(([asset,title,text,label]) => `<article class="study-mode">${image(asset)}<h3>${title}</h3><p>${text}</p>${download(label, 'text-link')}</article>`).join('')}</div></div></section>
<section class="app-section app-section-alt" id="como-funciona"><div class="container app-split"><div>${image('priority_roundabout', 'app-square-art')}<p class="image-caption">Ilustración del temario de Bali AI.</p></div><div><div class="section-tag">La IA trabaja con tus respuestas</div><h2 class="section-title">Tus fallos deciden <span>qué repasar después.</span></h2><p>Si una señal o una prioridad se te resiste, Bali tiene en cuenta tus resultados para adaptar la práctica. Así puedes dedicar más atención a los conceptos que todavía te cuestan.</p><ol class="study-steps"><li><strong>Haz una sesión en la app.</strong> Tus respuestas forman tu historial de práctica.</li><li><strong>Vuelve a tus errores.</strong> El repaso da más peso a las preguntas que fallas.</li><li><strong>Comprueba cómo avanzas.</strong> Consulta tus resultados y continúa desde el móvil.</li></ol>${download('Descargar y empezar a practicar')}</div></div></section>
<section class="app-section" id="progreso"><div class="container app-split"><div><div class="section-tag">Ve lo que estás aprendiendo</div><h2 class="section-title">Tests, resultados y rachas. <span>Tu progreso, en la app.</span></h2><p>Consulta tus estadísticas y el historial de sesiones para ver tus aciertos, tus fallos y cómo evolucionan tus resultados.</p><p>La experiencia, las rachas y las recompensas acompañan tus sesiones de estudio. Vuelve a practicar y sigue avanzando con Bali.</p><div class="reward-row">${image('shop_double_xp')}${image('shop_surprise_chest')}${image('streak_recovery')}</div>${download('Seguir mi progreso con Bali AI')}</div><div class="progress-art">${image('exam_new_record_trophy', 'app-square-art')}<p class="image-caption">Trofeo y recompensas originales de Bali AI.</p></div></div></section>
<section class="app-section app-section-alt" id="temario"><div class="container"><div class="section-header"><div class="section-tag">El permiso B, tema a tema</div><h2 class="section-title">Practica los temas <span>que necesitas reforzar.</span></h2><p class="section-sub">Señales, prioridad de paso, normas y puntos: combina el temario y la práctica por bloques dentro de Bali AI.</p></div><div class="topic-grid app-topics">${topics.map(([asset,title,text]) => `<article class="topic-card">${image(asset)}<div><h3>${title}</h3><p>${text}</p></div></article>`).join('')}</div><div class="section-download">${download('Estudiar el permiso B con Bali AI')}</div></div></section>
<section class="app-section" id="juegos"><div class="container app-split"><div>${image('game_peligro_cover', 'app-wide-art')}<p class="image-caption">Ilustración original de la app.</p></div><div><div class="section-tag">También hay tiempo para jugar</div><h2 class="section-title">Bali Drive. <span>Otra razón para abrir la app.</span></h2><p>Controla el coche con un dedo, frena, cede el paso y esquiva obstáculos. Cambia de actividad entre tus sesiones de tests y repaso.</p><p>Bali Drive forma parte de Bali AI. Combina las partidas con la teoría y los simulacros mientras preparas el teórico.</p>${download('Descargar Bali AI y descubrir Bali Drive')}</div></div></section>
${templates.ctaHtml().replace(/\.\.\//g, '')}
<!-- SEO:content:start --><!-- SEO:content:end -->
</main>
${templates.footerHtml().replace(/\.\.\//g, '')}
<a class="mobile-download" href="${site.playUrl}" target="_blank" rel="noopener">Descargar Bali AI para Android ↗</a>
<script src="js/nav.js" defer></script><script defer src="/_vercel/insights/script.js"></script>
</body></html>`;
fs.writeFileSync(path.join(__dirname, '../index.html'), html);
console.log('Portada generada con contenido real, ilustraciones de la app y CTA.');
