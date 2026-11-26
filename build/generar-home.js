// Portada: index.html. Los textos se cambian aquí; el diseño vive en home.css (y la base en styles.css).
const fs = require('fs');
const path = require('path');
const site = require('../data/site');
const seo = require('../data/seo');
const assets = require('../data/app-assets');
const screens = require('../data/app-screens');
const templates = require('./plantillas');
const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;');
const alt = name => esc(assets.find(a => a.name === name).alt);
const image = (name, css = '', decorative = false) => `<img src="img/app/${name.replace(/_/g, '-')}.webp" alt="${decorative ? '' : alt(name)}" class="${css}" loading="lazy">`;
const screen = name => `<img src="img/app/pantallas/${name}.webp" alt="${esc(screens.find(s => s.name === name).alt)}" loading="lazy">`;
const phone = (name, css = '') => `<figure class="movil ${css}">${screen(name)}</figure>`;
const STAR = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2.6l2.9 6 6.6.9-4.8 4.6 1.2 6.5L12 17.4l-5.9 3.2 1.2-6.5L2.5 9.5l6.6-.9z"/></svg>';
const FLAME = '<img src="img/racha.svg" alt="" class="icono-racha">';
const mailto = 'mailto:appbaliai@gmail.com?subject=' + encodeURIComponent('Bali AI para mi autoescuela') + '&body=' + encodeURIComponent('Hola, soy de la autoescuela (nombre y ciudad):\n\nNúmero aproximado de alumnos al año:\n\nQuiero saber más sobre cómo ofrecer Bali AI a mis alumnos.');

// Lo que incluye, en una fila de insignias bajo el héroe.
const perks = [
  [image('lesson_test', '', true), 'Tests del permiso B'],
  [image('lesson_exam', '', true), 'Simulacros de 30 preguntas'],
  [image('lesson_review', '', true), 'Repaso de fallos con IA'],
  [FLAME, 'Rachas y recompensas']
];

// El camino: cada parada es una función de la app, con su captura real y sus objetos de juego.
const stops = [
  {
    id: 'funciones', screen: 'test', tag: 'Tests de cada día',
    title: 'Responde, comprueba y <span>entiende el porqué.</span>',
    text: 'Responde preguntas del permiso B, comprueba la respuesta y lee por qué es esa. Avanzas por un camino de lecciones, sección a sección, empezando por El Conductor.',
    chips: ['Camino de lecciones', 'Explicación en cada pregunta', 'Ayudas: pista y 50/50'],
    props: [image('lesson_test', 'objeto objeto-a', true), image('shop_hint', 'objeto objeto-b', true), '<span class="ficha ficha-ok objeto-c"><b>✓</b>¡Correcto!</span>']
  },
  {
    id: 'como-funciona', screen: 'chat', tag: 'Pregunta a Bali',
    title: '¿Algo no te cuadra? <span>Pregúntaselo a Bali.</span>',
    text: 'El chat de la app es un tutor con IA. Pregunta tus dudas sobre señales, prioridades, normas de circulación y seguridad vial, y vuelve a tu práctica con la duda resuelta.',
    steps: [['Haz una sesión.', 'Tus respuestas forman tu historial de práctica.'], ['Vuelve a tus fallos.', 'El repaso da más peso a las preguntas que fallas.'], ['Pregunta lo que no entiendas.', 'El chat te responde y las estadísticas te enseñan cómo avanzas.']],
    note: 'Las respuestas de la IA pueden contener errores. Contrasta tus dudas con la normativa y la información oficial de la DGT.',
    props: [image('happy_bali', 'objeto objeto-a objeto-bali', true), '<span class="ficha ficha-bocadillo objeto-c">Tu profe de teórico, 24/7</span>']
  },
  {
    id: 'repaso', screen: 'resultado', tag: 'Repaso con IA y simulacros',
    title: 'Tus fallos se convierten en <span>tu siguiente repaso.</span>',
    text: 'Tu historial de respuestas orienta las siguientes sesiones: Bali da más atención a las preguntas que te cuestan. Y cuando quieras medirte, el modo examen te pone 30 preguntas, 30 minutos y tu resultado al terminar.',
    chips: ['Repaso de fallos', 'Modo examen con cronómetro', 'Estadísticas de progreso'],
    props: [image('lesson_review', 'objeto objeto-a', true), image('exam_new_record_trophy', 'objeto objeto-b', true), '<span class="ficha ficha-reloj objeto-c"><b>30</b>preguntas · 30 min</span>']
  },
  {
    id: 'app', screen: 'racha-iniciada', tag: 'Rachas y premios',
    title: 'Una racha que <span>da pena romper.</span>',
    text: 'Practica cada día para sumar días seguidos. Si un día no estudias, un congelador mantiene tu racha. Llega a hitos de XP, gana monedas y cámbialas en la tienda.',
    chips: ['Días seguidos', 'Niveles y XP', 'Monedas para la tienda'],
    props: [FLAME.replace('icono-racha', 'objeto objeto-a objeto-llama'), image('streak_freezer', 'objeto objeto-b', true), image('coin', 'objeto objeto-c objeto-moneda', true)]
  }
];

// La tienda de la app, con los nombres que aparecen en ella.
const shop = [
  ['shop_surprise_chest_closed', 'Cofre sorpresa', 'Prueba tu suerte: monedas, ayudas o potenciadores.'],
  ['streak_freezer', 'Congelador', 'Si un día no estudias, se gasta uno y tu racha sigue.'],
  ['streak_recovery', 'Recuperador', 'Para cuando la racha se te escapa.'],
  ['shop_streak_bet', 'Apuesta de racha', 'Apuesta monedas a que mantienes tu racha.'],
  ['shop_hint', 'Pista', 'Una ayuda cuando una pregunta se te atasca.'],
  ['shop_fifty_fifty', '50/50', 'Otra ayuda para practicar.']
];

const schoolPoints = [
  ['lesson_test', 'Práctica entre clases', 'Tests, simulacros y repaso de fallos en el móvil de cada alumno, cuando quiera.'],
  ['happy_bali', 'Un tutor para las dudas', 'El chat con IA responde dudas sobre señales y normas mientras estudian.'],
  ['onboarding_gift', 'A la medida de tu autoescuela', 'Hablamos de cómo ofrecérselo a tus alumnos según cómo trabajes.']
];

const stopHtml = (s, i) => `
<article class="parada${i % 2 ? ' parada-invertida' : ''}" id="${s.id}">
<div class="parada-visual reveal">
<div class="parada-halo" aria-hidden="true"></div>
${phone(s.screen)}
<div class="parada-objetos" aria-hidden="true">${s.props.join('')}</div>
</div>
<div class="parada-texto reveal">
<span class="nodo" aria-hidden="true">${STAR}</span>
<p class="etiqueta">${s.tag}</p>
<h2>${s.title}</h2>
<p class="parada-intro">${s.text}</p>
${s.chips ? `<ul class="chips">${s.chips.map(c => `<li>${c}</li>`).join('')}</ul>` : ''}
${s.steps ? `<ol class="pasos">${s.steps.map(([t, x]) => `<li><strong>${t}</strong> ${x}</li>`).join('')}</ol>` : ''}
${s.note ? `<p class="aviso">${s.note}</p>` : ''}
</div>
</article>`;

const playButton = `<a class="boton boton-naranja boton-grande" href="${site.playUrl}" target="_blank" rel="noopener">${templates.PLAY_ICON}<span>Descargar gratis</span></a>`;
const appleButton = `<span class="boton boton-pizarra boton-grande boton-pronto" role="note" aria-label="App Store: muy pronto">${templates.APPLE_ICON}<span>iPhone, muy pronto</span></span>`;

const html = `<!DOCTYPE html>
<html lang="es"><head>
<meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${esc(seo.title)}</title><meta name="description" content="${esc(seo.description)}">
<link rel="canonical" href="${site.url}/"><meta name="theme-color" content="#0B1124">
<meta property="og:type" content="website"><meta property="og:url" content="${site.url}/"><meta property="og:site_name" content="Bali AI"><meta property="og:locale" content="es_ES">
<meta property="og:title" content="${esc(seo.title)}"><meta property="og:description" content="${esc(seo.description)}"><meta property="og:image" content="${site.url}/img/og-bali.jpg"><meta property="og:image:width" content="1200"><meta property="og:image:height" content="630"><meta property="og:image:alt" content="Bali, la baliza naranja de Bali AI, con el texto Practica el teórico DGT con Bali de copiloto">
<meta name="twitter:card" content="summary_large_image"><meta name="twitter:title" content="${esc(seo.title)}"><meta name="twitter:description" content="${esc(seo.description)}"><meta name="twitter:image" content="${site.url}/img/og-bali.jpg">
<link rel="icon" href="img/bali.png"><link rel="apple-touch-icon" href="img/bali.png"><link rel="stylesheet" href="styles.css"><link rel="stylesheet" href="home.css">
<script type="application/ld+json">${JSON.stringify({ '@context': 'https://schema.org', '@type': 'MobileApplication', '@id': site.url + '/#app', name: site.name, url: site.url + '/', description: seo.description, operatingSystem: 'Android', applicationCategory: 'EducationalApplication', image: site.url + '/img/bali.png', installUrl: site.playUrl, inLanguage: 'es-ES', offers: { '@type': 'Offer', price: '0', priceCurrency: 'EUR', description: 'Descarga gratuita con compras dentro de la aplicación' }, featureList: ['Tests adaptados a tus respuestas', 'Repaso de fallos', 'Simulacros del teórico', 'Tutor con IA para dudas', 'Práctica por temas'] })}</script>
<script type="application/ld+json">${JSON.stringify({ '@context': 'https://schema.org', '@type': 'Organization', '@id': site.url + '/#organization', name: site.name, url: site.url + '/', logo: site.url + '/img/bali.png', email: 'appbaliai@gmail.com' })}</script>
</head><body class="home">
<a class="skip-link" href="#contenido">Ir al contenido</a>
${templates.navbarHtml('').replace(/\.\.\//g, '').replace(/<ul class="nav-links">[\s\S]*?<\/ul>/, '<ul class="nav-links"><li><a href="#funciones">Qué incluye</a></li><li><a href="#como-funciona">Pregunta a Bali</a></li><li><a href="aprendizaje.html">Temario gratis</a></li><li><a href="test-dgt-gratis.html">Test gratis</a></li><li><a href="#autoescuelas">Autoescuelas</a></li><li><a class="btn-cta" href="' + site.playUrl + '" target="_blank" rel="noopener">Descargar</a></li></ul>')}
<main id="contenido">

<section class="inicio">
<div class="container inicio-grid">
<div class="inicio-texto">
<p class="etiqueta">${FLAME}App para el teórico del permiso B</p>
<h1>Practica el <span class="fuego">teórico DGT</span> con Bali de copiloto.</h1>
<p class="inicio-sub">Tests, simulacros y un tutor con IA para tus dudas. Rachas, monedas y premios para que estudiar un poco cada día se convierta en costumbre.</p>
<div class="inicio-botones">${playButton}${appleButton}</div>
<p class="inicio-nota">Android · Descarga gratuita · Compras dentro de la app</p>
<a class="inicio-escuelas" href="#autoescuelas"><strong>¿Tienes una autoescuela?</strong> Ofrécesela a tus alumnos <span aria-hidden="true">→</span></a>
</div>
<div class="inicio-escena">
<div class="baliza-luz" aria-hidden="true"></div>
<img class="hero-mascot" src="img/app/bali-login-mascot.webp" alt="Bali, la baliza naranja mascota de la app" fetchpriority="high" loading="eager">
<p class="bocadillo inicio-bocadillo" aria-hidden="true">¡Hola! Soy Bali, tu copiloto.</p>
<div class="inicio-fichas" aria-hidden="true">
<span class="ficha ficha-racha">${FLAME}<span><b>Racha</b>días seguidos</span></span>
<span class="ficha ficha-monedas"><img src="img/app/coin.webp" alt=""><b>+80</b></span>
<span class="ficha ficha-ok"><b>✓</b>¡Correcto!</span>
<img class="inicio-cofre" src="img/app/shop-surprise-chest.webp" alt="">
</div>
</div>
</div>
<ul class="ventajas" aria-label="Qué incluye Bali AI">${perks.map(([icon, text]) => `<li>${icon}<span>${text}</span></li>`).join('')}</ul>
</section>

<section class="camino">
<div class="container">
<div class="cabecera"><p class="etiqueta">Así se aprende con Bali</p><h2>Un camino de lecciones <span>hasta el aprobado.</span></h2><p>Capturas reales de la app. Cada parada es algo que puedes hacer hoy mismo en tu móvil.</p></div>
<div class="paradas">${stops.map(stopHtml).join('')}</div>
</div>
</section>

<section class="tienda" aria-labelledby="tienda-titulo">
<div class="container">
<div class="cabecera"><img class="tienda-bali" src="img/app/bali-coins.webp" alt="Bali con una cesta llena de monedas" loading="lazy"><p class="etiqueta">La tienda de Bali</p><h2 id="tienda-titulo">Gana monedas estudiando. <span>Gástalas en ventajas.</span></h2><p>Lo que encuentras en la tienda de la app.</p></div>
<ul class="tienda-grid">${shop.map(([img, name, text]) => `<li class="articulo reveal">${image(img, '', true)}<h3>${name}</h3><p>${text}</p></li>`).join('')}</ul>
</div>
</section>

<section class="drive" id="juegos">
<div class="container drive-grid">
<div class="drive-visual reveal"><div class="parada-halo" aria-hidden="true"></div>${phone('drive', 'drive-movil')}${image('drive_player', 'drive-coche', true)}<p class="bocadillo drive-bocadillo" aria-hidden="true">¿Una partidita?</p></div>
<div class="drive-texto">
<p class="etiqueta">Entre test y test</p>
<h2>Bali Drive, para cuando <span>toca un descanso.</span></h2>
<p>Controla el coche con un dedo, frena, cede el paso y esquiva obstáculos. Cambia de actividad entre tus sesiones de tests y repaso.</p>
<p>Bali Drive forma parte de Bali AI, así que las partidas y la teoría viven en la misma app.</p>
<a class="boton boton-naranja" href="${site.playUrl}" target="_blank" rel="noopener">Descargar y jugar <span aria-hidden="true">↗</span></a>
</div>
</div>
</section>


<section class="escuelas" id="autoescuelas">
<div class="container escuelas-grid">
<div class="escuelas-visual" aria-hidden="true"><div class="escuelas-cartel"><img src="img/app/happy-bali.webp" alt=""><span>Autoescuela</span></div></div>
<div>
<p class="etiqueta">Para autoescuelas</p>
<h2>Tus alumnos practican con Bali. <span>Tú te centras en las clases.</span></h2>
<p class="escuelas-intro">Si diriges o trabajas en una autoescuela, Bali AI puede ser la herramienta de práctica que ofrezcas a tus alumnos entre clase y clase. Escríbeme y vemos cómo encajarlo en tu autoescuela.</p>
<ul class="escuelas-puntos">${schoolPoints.map(([img, title, text]) => `<li>${image(img, '', true)}<div><h3>${title}</h3><p>${text}</p></div></li>`).join('')}</ul>
<div class="escuelas-cta"><a class="boton boton-naranja" href="${esc(mailto)}">Escríbeme sobre tu autoescuela <span aria-hidden="true">→</span></a><span class="chip-escuelas">Versión web, en camino</span></div>
</div>
</div>
</section>

<!-- SEO:content:start --><!-- SEO:content:end -->
${templates.ctaHtml().replace(/\.\.\//g, '')}
</main>
${templates.footerHtml().replace(/\.\.\//g, '')}
<a class="mobile-download" href="${site.playUrl}" target="_blank" rel="noopener">${templates.PLAY_ICON}Descargar Bali AI gratis</a>
<script src="js/nav.js" defer></script><script src="js/home.js" defer></script><script defer src="/_vercel/insights/script.js"></script>
</body></html>`;
fs.writeFileSync(path.join(__dirname, '../index.html'), html);
console.log('Portada generada: héroe con Bali, camino de funciones, tienda, Bali Drive y autoescuelas.');
