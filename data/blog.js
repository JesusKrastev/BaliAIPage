/* ===== BALI AI — Contenido del blog =====
   Cada post es un objeto de este array. `cuerpoHTML` es HTML ya maquetado
   (clases de .blog-post-body en styles.css). Añadir un post nuevo = añadir
   un objeto aquí; build/generar-blog.js se encarga del resto (meta tags,
   JSON-LD, listado en el índice y sitemap automático). */

var PLAY_STORE_URL = 'https://play.google.com/store/apps/details?id=com.jesuskrastev.bali';

function ctaHtml(texto) {
  return '<div class="blog-cta"><p>' + texto + '</p>' +
    '<a class="blog-cta-btn" href="' + PLAY_STORE_URL + '" target="_blank" rel="noopener"><i class="fab fa-google-play"></i> Bali AI</a>' +
    '</div>';
}

var BLOG_POSTS = [
  {
    id: 'examen-teorico-dgt-preguntas-fallos-precio',
    featureImage: { src: 'img/guides/examen-teorico-dgt-preguntas-fallos-precio-feature.webp', width: 1536, height: 1024, alt: 'Coche naranja de juguete junto a un cuaderno de estudio, señales y un temporizador' },
    titulo: 'Examen teórico DGT: preguntas, fallos, precio y validez',
    resumen: 'Preguntas, fallos permitidos y validez del teórico DGT. Consulta la tasa vigente y los plazos del permiso con enlaces a información oficial.',
    metaTitle: 'Examen teórico DGT: preguntas, fallos y precio | Bali AI',
    fecha: '2026-08-11',
    fechaModificacion: '2026-10-10',
    faq: [
      { pregunta: '¿Cuántas preguntas tiene el examen teórico de la DGT?', respuesta: '30 preguntas tipo test, con un máximo de 3 fallos permitidos para aprobar.' },
      { pregunta: '¿Cuánto cuesta el examen teórico DGT en 2026?', respuesta: 'Consulta el importe vigente de la tasa 2.1 en la DGT. La formación en la autoescuela se paga aparte.' },
      { pregunta: '¿Cuánto tarda en llegar el carnet después de aprobar?', respuesta: 'La DGT indica un plazo aproximado de mes y medio para recibir el permiso definitivo.' }
    ],
    cuerpoHTML:
      '<p>Antes de abrir un solo test, la mayoría de la gente busca lo mismo: cuántas preguntas tiene el examen, cuántos fallos puede permitirse, cuánto le va a costar y qué pasa si algo sale mal por el camino. Aquí tienes las respuestas claras, sin rodeos.</p>' +

      '<h2>¿Cuántas preguntas tiene el examen teórico de la DGT?</h2>' +
      '<p>El examen del permiso B consta de <strong>30 preguntas tipo test</strong>. Para aprobar puedes fallar <strong>como máximo 3</strong>: a partir del cuarto fallo, suspendes.</p>' +

      '<h2>Cómo conocer el formato antes de presentarte</h2>' +
      '<p>Consulta los cuestionarios de ejemplo enlazados en la web de la DGT. Para estudiar, combina el temario por bloques con el repaso de las preguntas que fallas. Intenta explicar la regla detrás de cada respuesta antes de pasar al siguiente test.</p>' +

      '<h2>¿Cuánto cuesta el examen teórico DGT en 2026?</h2>' +
      '<p>Comprueba el importe vigente de la <strong>tasa 2.1</strong> en la DGT antes de pagar. No incluye la formación en la autoescuela. Si suspendes dos veces, en la misma prueba o en pruebas diferentes, debes presentar una nueva solicitud y pagar otra tasa.</p>' +

      '<h2>¿Cuánto tarda en llegar el carnet después de aprobar?</h2>' +
      '<p>Aquí hay dos plazos distintos:</p>' +
      '<ul>' +
      '<li><strong>Permiso provisional:</strong> te permite conducir en España mientras llega el definitivo.</li>' +
      '<li><strong>Permiso definitivo:</strong> la DGT indica aproximadamente mes y medio para recibirlo en tu domicilio.</li>' +
      '</ul>' +

      '<h2>¿Qué validez tiene el teórico si suspendo el práctico?</h2>' +
      '<p>La prueba aprobada mantiene su validez durante <strong>dos años</strong>. Si no obtienes el permiso dentro de ese plazo, tendrás que volver a examinarte de todas las pruebas.</p>' +

      ctaHtml('Con esto ya sabes qué esperar. Lo que de verdad decide si apruebas a la primera es cómo estudias esas semanas antes — nosotros para eso usamos <strong>Bali AI</strong>, porque hacer tests sueltos sin saber en qué fallas de verdad es la forma más lenta de prepararse.') +

      '<p>Información oficial: <a href="https://www.dgt.es/nuestros-servicios/permisos-de-conducir/obtener-un-nuevo-permiso-de-conducir/requisitos-preparacion-y-presentacion-a-examen/">DGT: requisitos, preparación y presentación a examen</a>.</p>' +
      '<p>Lecturas adicionales:</p>' +
      '<ul>' +
      '<li><a href="https://aprobify.es/blogs/cuantos-fallos-permite-examen-teorico-dgt/" target="_blank" rel="noopener">¿Cuántos fallos se permiten en el examen teórico de la DGT?</a></li>' +
      '<li><a href="https://www.elconfidencialdigital.com/dgt/articulo/normativa-dgt/adios-test-memoristico-dgt-nuevo-examen-teorico-febrero-2026/20260206165517000936.html" target="_blank" rel="noopener">Adiós al test memorístico DGT: nuevo examen desde febrero 2026</a></li>' +
      '<li><a href="https://www.driveiq.es/cuanto-cuesta-examen-teorico-dgt" target="_blank" rel="noopener">Examen teórico DGT: cuánto cuesta en 2026</a></li>' +
      '<li><a href="https://dribo.es/blog/tiempo-de-espera-carnet-de-conducir" target="_blank" rel="noopener">¿Cuánto se tarda en sacar el carnet en 2026?</a></li>' +
      '<li><a href="https://raccautoescuela.es/blog/cuando-caduca-el-examen-teorico-del-permiso-de-conducir/" target="_blank" rel="noopener">¿Cuándo caduca el examen teórico?</a></li>' +
      '</ul>'
  },

  {
    id: 'temario-completo-examen-teorico-dgt',
    featureImage: { src: 'img/guides/temario-completo-examen-teorico-dgt-feature.webp', width: 1536, height: 1024, alt: 'Libros abiertos y tarjetas de estudio forman un camino hacia un coche naranja' },
    titulo: 'El temario completo del examen teórico DGT, bloque a bloque',
    resumen: 'Repasa el temario del teórico DGT por bloques: señales, velocidad, circulación y puntos. Teoría gratuita con esquemas y mini tests de Bali AI.',
    metaTitle: 'Temario del examen teórico DGT, bloque a bloque | Bali AI',
    fecha: '2026-08-11',
    cuerpoHTML:
      '<p>Aquí tienes el temario completo del examen teórico de la DGT organizado por bloques, cada uno con su esquema visual, sus trucos para no olvidarlo y un mini test para comprobar si lo tienes claro. Es el mismo contenido que usamos dentro de la app — aquí lo tienes en abierto, gratis.</p>' +
      '{{LISTA_BLOQUES}}' +
      ctaHtml('Repasar esto aquí está bien para entender los conceptos. Cuando quieras simular el examen de verdad, con cronómetro y sin red, tienes <strong>Bali AI</strong> — ahí es donde hacemos el resto del trabajo.')
  },

  {
    id: 'errores-suspender-examen-teorico-dgt',
    featureImage: { src: 'img/guides/errores-suspender-examen-teorico-dgt-feature.webp', width: 1536, height: 1024, alt: 'Coche naranja sobre una carretera curva junto a conos, un lápiz y una goma de borrar' },
    titulo: '5 errores que hacen suspender el examen teórico DGT',
    resumen: 'Cinco errores al preparar el teórico DGT y cómo trabajarlos: memorizar respuestas, confundir señales, no repasar fallos y estudiar sin planificación.',
    metaTitle: '5 errores que hacen suspender el teórico DGT | Bali AI',
    fecha: '2026-08-11',
    cuerpoHTML:
      '<p>Cada año, miles de personas suspenden el teórico no porque el temario sea imposible, sino porque estudian de una forma que no funciona. Estos son los errores que más se repiten.</p>' +

      '<h2>1. Memorizar respuestas en vez de entender el porqué</h2>' +
      '<p>Aprenderte "la B" para una pregunta concreta deja de ayudar cuando cambia el enunciado. Lee la regla que explica la respuesta y prueba a aplicarla a otro caso. Si todavía dudas, vuelve al bloque del temario antes de hacer otro test.</p>' +

      '<h2>2. Confundir señales parecidas</h2>' +
      '<p>STOP y ceda el paso, línea continua y discontinua, prohibición y obligación... son de las preguntas más repetidas y de las que más fallos generan, precisamente porque se estudian todas juntas y se acaban mezclando. Repasarlas por parejas, comparando directamente una contra otra, se olvida mucho menos que verlas sueltas.</p>' +

      '<h2>3. No repasar los fallos, solo hacer tests nuevos</h2>' +
      '<p>Hacer 50 tests distintos sin volver nunca sobre lo que fallaste es la forma más lenta de aprender. Si vuelves a fallar la misma pregunta tres veces, el problema no es mala suerte: es que ese concepto concreto no lo tienes asentado, y hace falta insistir justo ahí.</p>' +

      '<h2>4. Dejarlo todo para el último fin de semana</h2>' +
      '<p>El temario tiene bloques muy distintos entre sí (señales, normas de circulación, mecánica, sanciones...) y meterlo todo de golpe en dos días satura más que enseña. Repartir el estudio en sesiones cortas y frecuentes, en vez de maratones puntuales, es lo que de verdad fija los conceptos a largo plazo.</p>' +

      '<h2>5. No simular las condiciones reales del examen</h2>' +
      '<p>El examen real tiene un cronómetro y unos nervios que un test tranquilo desde el sofá no reproduce. Si nunca has practicado con tiempo limitado, el día del examen esa presión añadida puede hacerte fallar preguntas que en casa te sabías perfectamente.</p>' +

      ctaHtml('En <strong>Bali AI</strong> puedes practicar y repasar los fallos según tu historial. Empieza por un tema que te cueste y comprueba si entiendes la explicación.')
  },

  {
    id: 'mejor-app-teorico-dgt',
    featureImage: { src: 'img/guides/mejor-app-teorico-dgt-feature.webp', width: 1536, height: 1024, alt: 'Móvil con pantalla naranja sin contenido junto a un volante, un coche y tarjetas de estudio' },
    titulo: 'Cómo elegir la mejor app para estudiar el teórico DGT en 2026',
    resumen: 'Qué mirar antes de elegir una app para preparar el examen teórico de la DGT: temario actualizado, adaptación a tus fallos, modo examen real y si es gratis.',
    metaTitle: 'Mejor app para el teórico DGT en 2026: qué mirar | Bali AI',
    fecha: '2026-08-11',
    cuerpoHTML:
      '<p>Hay decenas de apps para preparar el teórico y todas prometen lo mismo. Antes de instalar la primera que aparece, esto es lo que de verdad marca la diferencia entre aprobar rápido o dar vueltas en círculo.</p>' +

      '<h2>1. Que el temario esté actualizado de verdad</h2>' +
      '<p>Comprueba si el contenido indica su fecha de revisión y enlaza a la DGT o al BOE cuando explica una norma. Hay cambios con una fecha concreta de entrada en vigor: una buena explicación debe distinguir la regla actual de una propuesta o una noticia.</p>' +

      '<h2>2. Que se adapte a tus fallos, no que repita lo mismo para todos</h2>' +
      '<p>Hacer tests aleatorios está bien al principio, pero si sigues fallando las mismas 15 preguntas sobre prioridad de paso, necesitas una app que lo detecte y te haga insistir ahí — no que te enseñe otra vez las 30 preguntas que ya dominas.</p>' +

      '<h2>3. Que tenga un modo examen realista</h2>' +
      '<p>30 preguntas, cronómetro, sin pausas: cuanto más se parezca la práctica al examen real, menos sorpresa el día de la verdad.</p>' +

      '<h2>4. Que te diga en qué temas concretos fallas, no solo tu nota final</h2>' +
      '<p>Saber que has sacado un 7 no te dice nada útil. Saber que fallas sistemáticamente en señales de prioridad sí te dice exactamente qué repasar esta noche.</p>' +

      '<h2>5. Que sea gratis para empezar</h2>' +
      '<p>No hace falta pagar antes de saber si una app te convence. Una buena señal es poder probar el temario y los tests reales sin poner la tarjeta por delante.</p>' +

      ctaHtml('Con esos cinco puntos en la mano, cualquier app que elijas debería aguantar el examen. Nosotros hemos construido <strong>Bali AI</strong> pensando exactamente en esto, y se puede probar gratis, así que júzgala tú mismo.')
  },

  {
    id: 'cambios-carnet-conducir-2026',
    featureImage: { src: 'img/guides/cambios-carnet-conducir-2026-feature.webp', width: 1536, height: 1024, alt: 'Baliza luminosa naranja junto a un cuaderno abierto y un coche de juguete sobre una carretera' },
    titulo: 'Cambios en el carnet de conducir en 2026: qué revisar',
    resumen: 'Revisa las novedades de la V16 conectada y el adelantamiento a usuarios vulnerables en 2026. Con fechas, alcance y enlaces a la DGT y al BOE.',
    metaTitle: 'Cambios en el carnet de conducir en 2026 | Bali AI',
    fecha: '2026-08-11',
    cuerpoHTML:
      '<p>2026 está siendo un año con más cambios normativos de lo habitual. Si te estás preparando el teórico ahora mismo, esto es lo que necesitas saber.</p>' +

      '<h2>La baliza V16 conectada sustituye a los triángulos</h2>' +
      '<p>Desde el 1 de enero de 2026 se exige la V16 conectada para señalizar la inmovilización de los vehículos sujetos a esta obligación en España. Comprueba que el modelo figure en la lista de dispositivos certificados de la DGT; una baliza luminosa sin conexión no equivale a una V16 conectada válida.</p>' +

      '<h2>Nuevas normas de adelantamiento desde octubre</h2>' +
      '<p>Desde el 1 de octubre de 2026, el artículo 85.4 del Reglamento General de Circulación exige, fuera de poblado, circular <strong>al menos 20 km/h por debajo del límite de la vía</strong> antes y durante el adelantamiento a los usuarios vulnerables que enumera, incluidos los ciclistas. También exige la separación lateral mínima de 1,5 metros y ocupar por completo el carril contiguo cuando hay más de uno por sentido.</p>' +
      '<p>El artículo 88.1 regula por separado vehículos detenidos por avería, accidente, emergencia, mantenimiento o control del tráfico, con separación y reducción de velocidad. No debe resumirse como una regla idéntica para cualquier vehículo parado. Consulta el texto vigente y el supuesto concreto.</p>' +

      '<h2>Cómo comprobar el formato del examen</h2>' +
      '<p>Consulta los requisitos y cuestionarios de ejemplo de la DGT antes de presentarte. Una noticia sobre cambios previstos no basta para afirmar que un formato nuevo ya se aplica en tu convocatoria. Pregunta también a tu autoescuela o jefatura si necesitas aclarar el procedimiento.</p>' +

      '<h2>Consulta los límites en la norma vigente</h2>' +
      '<p>Para estudiar alcohol, distingue las unidades de sangre y aire espirado y el tipo de conductor. El artículo 20 del Reglamento General de Circulación es la referencia para comprobar los límites vigentes. Evita estudiar una propuesta como si ya fuese ley.</p>' +

      ctaHtml('Repasa los temas en <strong>Bali AI</strong> y consulta siempre la fuente oficial cuando necesites confirmar una norma o un trámite.') +

      '<p>Fuentes oficiales consultadas para esta revisión:</p>' +
      '<ul>' +
      '<li><a href="https://www.dgt.es/muevete-con-seguridad/tecnologia-e-innovacion-en-carretera/Dispositivos-de-presenalizacion-V16/" target="_blank" rel="noopener">DGT — Dispositivos de preseñalización V16</a></li>' +
      '<li><a href="https://www.boe.es/buscar/act.php?id=BOE-A-2003-23514" target="_blank" rel="noopener">BOE: Reglamento General de Circulación, artículos 20, 85 y 88</a></li>' +
      '<li><a href="https://www.boe.es/buscar/doc.php?id=BOE-A-2026-13889" target="_blank" rel="noopener">BOE: Real Decreto 518/2026</a></li>' +
      '<li><a href="https://www.dgt.es/nuestros-servicios/permisos-de-conducir/obtener-un-nuevo-permiso-de-conducir/requisitos-preparacion-y-presentacion-a-examen/" target="_blank" rel="noopener">DGT: requisitos y presentación a examen</a></li>' +
      '</ul>'
  }
];

if (typeof module !== 'undefined' && module.exports) {
  BLOG_POSTS.forEach(function (post) {
    post.fechaModificacion = '2026-10-10';
    post.cuerpoHTML = post.cuerpoHTML.replace(/<p>Lecturas adicionales:<\/p>[\s\S]*?<\/ul>/, '');
  });
  BLOG_POSTS = require('./guias').concat(BLOG_POSTS);
}
if (typeof window !== 'undefined') window.BLOG_POSTS = BLOG_POSTS;
if (typeof module !== 'undefined' && module.exports) module.exports = BLOG_POSTS;
