/* ===== BALI AI — Contenido del blog =====
   Cada post es un objeto de este array. `cuerpoHTML` es HTML ya maquetado
   (clases de .blog-post-body en styles.css). Añadir un post nuevo = añadir
   un objeto aquí; build/generar-blog.js se encarga del resto (meta tags,
   JSON-LD, listado en el índice, sitemap no incluido automáticamente —
   añadir la URL a mano en sitemap.xml). */

var PLAY_STORE_URL = 'https://play.google.com/store/apps/details?id=com.jesuskrastev.bali';

function ctaHtml(texto) {
  return '<div class="blog-cta"><p>' + texto + '</p>' +
    '<a class="blog-cta-btn" href="' + PLAY_STORE_URL + '" target="_blank" rel="noopener"><i class="fab fa-google-play"></i> Bali AI</a>' +
    '</div>';
}

var BLOG_POSTS = [
  {
    id: 'examen-teorico-dgt-preguntas-fallos-precio',
    titulo: 'Examen teórico DGT: preguntas, fallos, precio y validez',
    resumen: 'Cuántas preguntas tiene el examen teórico DGT, cuántos fallos se permiten, qué cuesta en 2026, cuánto tarda el carnet y qué validez tiene si suspendes el práctico.',
    metaTitle: 'Examen teórico DGT 2026: preguntas, fallos y precio | Bali AI',
    fecha: '2026-08-11',
    faq: [
      { pregunta: '¿Cuántas preguntas tiene el examen teórico de la DGT?', respuesta: '30 preguntas tipo test, con un máximo de 3 fallos permitidos para aprobar.' },
      { pregunta: '¿Cuánto cuesta el examen teórico DGT en 2026?', respuesta: 'La tasa oficial es de 94,05€, e incluye el examen teórico, el práctico y la expedición del permiso. Da derecho a dos convocatorias.' },
      { pregunta: '¿Cuánto tarda en llegar el carnet después de aprobar?', respuesta: 'El carnet provisional suele llegar en unos 3 días tras aprobar el práctico. El definitivo tarda de media entre 2 y 6 semanas, aunque puede variar según la provincia.' }
    ],
    cuerpoHTML:
      '<p>Antes de abrir un solo test, la mayoría de la gente busca lo mismo: cuántas preguntas tiene el examen, cuántos fallos puede permitirse, cuánto le va a costar y qué pasa si algo sale mal por el camino. Aquí tienes las respuestas claras, sin rodeos.</p>' +

      '<h2>¿Cuántas preguntas tiene el examen teórico de la DGT?</h2>' +
      '<p>El examen consta de <strong>30 preguntas tipo test</strong>, con cuatro respuestas posibles cada una. Para aprobar puedes fallar <strong>como máximo 3</strong> — a partir del cuarto fallo, suspendes.</p>' +

      '<h2>La novedad de 2026: vídeos de percepción del riesgo</h2>' +
      '<p>Desde el <strong>5 de febrero de 2026</strong>, el examen ya no se basa solo en memorizar respuestas: la DGT ha empezado a incorporar <strong>vídeos cortos con situaciones reales de tráfico</strong>, donde tienes que identificar el riesgo antes de que ocurra. El formato de 30 preguntas y 3 fallos se mantiene, pero memorizar sin entender el porqué cada vez funciona peor.</p>' +

      '<h2>¿Cuánto cuesta el examen teórico DGT en 2026?</h2>' +
      '<p>La tasa oficial es de <strong>94,05€</strong>. Ese importe incluye los derechos de examen teórico, los del práctico y la expedición del propio permiso — no se paga por separado. Es una tasa finalista (no se devuelve) y te da <strong>dos oportunidades</strong> para presentarte a cada prueba antes de tener que volver a pagar.</p>' +

      '<h2>¿Cuánto tarda en llegar el carnet después de aprobar?</h2>' +
      '<p>Aquí hay dos plazos distintos:</p>' +
      '<ul>' +
      '<li><strong>Carnet provisional:</strong> normalmente en unos 3 días tras aprobar el examen práctico, aunque depende de la autoescuela y la provincia.</li>' +
      '<li><strong>Carnet definitivo (físico):</strong> entre 2 y 6 semanas de media, aunque en algunas provincias la espera total desde que apruebas el teórico puede acercarse a los 3 meses.</li>' +
      '</ul>' +

      '<h2>¿Qué validez tiene el teórico si suspendo el práctico?</h2>' +
      '<p>Una vez aprobado el teórico, tienes <strong>2 años</strong> para aprobar el práctico. Si se cumple ese plazo sin conseguirlo, el teórico caduca y hay que repetirlo. Además, si aprobaste el teórico a la primera, tienes 2 intentos gratuitos para el práctico; si te costó dos intentos, solo tendrás uno antes de pagar tasas nuevas.</p>' +

      ctaHtml('Con esto ya sabes qué esperar. Lo que de verdad decide si apruebas a la primera es cómo estudias esas semanas antes — nosotros para eso usamos <strong>Bali AI</strong>, porque hacer tests sueltos sin saber en qué fallas de verdad es la forma más lenta de prepararse.') +

      '<p>Sources:</p>' +
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
    titulo: 'El temario completo del examen teórico DGT, bloque a bloque',
    resumen: 'Todo el temario del examen teórico DGT organizado por bloques: señales, velocidad, normas de circulación, alcohol, sanciones y más. Con esquemas, trucos y tests.',
    metaTitle: 'Temario del examen teórico DGT, bloque a bloque | Bali AI',
    fecha: '2026-08-11',
    cuerpoHTML:
      '<p>Aquí tienes el temario completo del examen teórico de la DGT organizado por bloques, cada uno con su esquema visual, sus trucos para no olvidarlo y un mini test para comprobar si lo tienes claro. Es el mismo contenido que usamos dentro de la app — aquí lo tienes en abierto, gratis.</p>' +
      '{{LISTA_BLOQUES}}' +
      ctaHtml('Repasar esto aquí está bien para entender los conceptos. Cuando quieras simular el examen de verdad, con cronómetro y sin red, tienes <strong>Bali AI</strong> — ahí es donde hacemos el resto del trabajo.')
  },

  {
    id: 'errores-suspender-examen-teorico-dgt',
    titulo: '5 errores que hacen suspender el examen teórico DGT',
    resumen: 'Los errores más habituales que llevan a suspender el examen teórico de la DGT: cómo estudiar mal sin darte cuenta y qué hacer en su lugar para aprobar a la primera.',
    metaTitle: '5 errores que hacen suspender el teórico DGT | Bali AI',
    fecha: '2026-08-11',
    cuerpoHTML:
      '<p>Cada año, miles de personas suspenden el teórico no porque el temario sea imposible, sino porque estudian de una forma que no funciona. Estos son los errores que más se repiten.</p>' +

      '<h2>1. Memorizar respuestas en vez de entender el porqué</h2>' +
      '<p>Hacer test tras test y aprenderte "la B" para una pregunta concreta funciona hasta que te cambian ligeramente el enunciado — y con los nuevos vídeos de percepción del riesgo que la DGT introdujo en 2026, memorizar sin entender falla todavía más rápido. Si no sabes explicar por qué una respuesta es correcta, no la sabes de verdad.</p>' +

      '<h2>2. Confundir señales parecidas</h2>' +
      '<p>STOP y ceda el paso, línea continua y discontinua, prohibición y obligación... son de las preguntas más repetidas y de las que más fallos generan, precisamente porque se estudian todas juntas y se acaban mezclando. Repasarlas por parejas, comparando directamente una contra otra, se olvida mucho menos que verlas sueltas.</p>' +

      '<h2>3. No repasar los fallos, solo hacer tests nuevos</h2>' +
      '<p>Hacer 50 tests distintos sin volver nunca sobre lo que fallaste es la forma más lenta de aprender. Si vuelves a fallar la misma pregunta tres veces, el problema no es mala suerte: es que ese concepto concreto no lo tienes asentado, y hace falta insistir justo ahí.</p>' +

      '<h2>4. Dejarlo todo para el último fin de semana</h2>' +
      '<p>El temario tiene bloques muy distintos entre sí (señales, normas de circulación, mecánica, sanciones...) y meterlo todo de golpe en dos días satura más que enseña. Repartir el estudio en sesiones cortas y frecuentes, en vez de maratones puntuales, es lo que de verdad fija los conceptos a largo plazo.</p>' +

      '<h2>5. No simular las condiciones reales del examen</h2>' +
      '<p>El examen real tiene un cronómetro y unos nervios que un test tranquilo desde el sofá no reproduce. Si nunca has practicado con tiempo limitado, el día del examen esa presión añadida puede hacerte fallar preguntas que en casa te sabías perfectamente.</p>' +

      ctaHtml('De estos cinco, el 2 y el 3 son los que más vemos repetirse. Es literalmente la razón por la que existe <strong>Bali AI</strong>: en vez de tests aleatorios, te hace volver una y otra vez sobre lo que fallas, hasta que se te queda de verdad.')
  },

  {
    id: 'mejor-app-teorico-dgt',
    titulo: 'Cómo elegir la mejor app para estudiar el teórico DGT en 2026',
    resumen: 'Qué mirar antes de elegir una app para preparar el examen teórico de la DGT: temario actualizado, adaptación a tus fallos, modo examen real y si es gratis.',
    metaTitle: 'Mejor app para el teórico DGT en 2026: qué mirar | Bali AI',
    fecha: '2026-08-11',
    cuerpoHTML:
      '<p>Hay decenas de apps para preparar el teórico y todas prometen lo mismo. Antes de instalar la primera que aparece, esto es lo que de verdad marca la diferencia entre aprobar rápido o dar vueltas en círculo.</p>' +

      '<h2>1. Que el temario esté actualizado de verdad</h2>' +
      '<p>La normativa de tráfico cambia con frecuencia — solo en 2026 ha habido novedades como la baliza V16 conectada, cambios en las normas de adelantamiento y la incorporación de vídeos de percepción del riesgo al examen. Una app con preguntas de hace tres años puede enseñarte cosas que ya no son así.</p>' +

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
    titulo: 'Cambios en el carnet de conducir en 2026: todo lo nuevo',
    resumen: 'Las novedades normativas de 2026 que afectan al examen y al carnet de conducir en España: baliza V16, nuevas normas de adelantamiento, examen con vídeos y más.',
    metaTitle: 'Cambios en el carnet de conducir en 2026 | Bali AI',
    fecha: '2026-08-11',
    cuerpoHTML:
      '<p>2026 está siendo un año con más cambios normativos de lo habitual. Si te estás preparando el teórico ahora mismo, esto es lo que necesitas saber.</p>' +

      '<h2>La baliza V16 conectada sustituye a los triángulos</h2>' +
      '<p>Desde el 1 de enero de 2026, la baliza V16 conectada es el dispositivo de preseñalización obligatorio en caso de avería o accidente, en sustitución de los triángulos tradicionales. Se coloca en el techo del vehículo, sin necesidad de bajarte a la calzada, y emite luz durante al menos 30 minutos. Los triángulos no están prohibidos — usarlos junto a la V16 no supone sanción — pero ya no son obligatorios por sí solos.</p>' +

      '<h2>Nuevas normas de adelantamiento desde octubre</h2>' +
      '<p>A partir del 1 de octubre de 2026, al adelantar a un vehículo parado o a uno o varios ciclistas será obligatorio, además de mantener 1,5 metros de separación lateral, <strong>reducir la velocidad al menos 20 km/h por debajo del límite de la vía</strong>. Hasta ahora era una recomendación; a partir de esa fecha es obligación, con multa de hasta 200€.</p>' +

      '<h2>El examen teórico incorpora vídeos de percepción del riesgo</h2>' +
      '<p>Desde el 5 de febrero de 2026, el examen sigue teniendo 30 preguntas y un máximo de 3 fallos, pero suma vídeos cortos con situaciones reales de tráfico donde hay que identificar el riesgo antes de que ocurra. Memorizar test sin entender el porqué cada vez sirve de menos.</p>' +

      '<h2>La rebaja de la tasa de alcoholemia, rechazada</h2>' +
      '<p>El Congreso rechazó el 18 de marzo de 2026 la propuesta de bajar la tasa general de alcoholemia a 0,2 g/l. Los límites siguen siendo los de siempre: 0,25 mg/l en aire para conductores generales y 0,15 mg/l para noveles y profesionales.</p>' +

      ctaHtml('Estar al día de todo esto mientras estudias es un curro aparte — por eso vamos actualizando el temario de <strong>Bali AI</strong> cada vez que cambia algo, para que no te encuentres estudiando una norma que ya no existe.') +

      '<p>Sources:</p>' +
      '<ul>' +
      '<li><a href="https://www.dgt.es/muevete-con-seguridad/tecnologia-e-innovacion-en-carretera/Dispositivos-de-presenalizacion-V16/" target="_blank" rel="noopener">DGT — Dispositivos de preseñalización V16</a></li>' +
      '<li><a href="https://www.motorpasion.com/seguridad/gobierno-hace-oficial-se-acabo-adelantar-a-ciclistas-como-ahora" target="_blank" rel="noopener">La DGT cambia las normas para adelantar a ciclistas</a></li>' +
      '<li><a href="https://www.elconfidencialdigital.com/dgt/articulo/normativa-dgt/adios-test-memoristico-dgt-nuevo-examen-teorico-febrero-2026/20260206165517000936.html" target="_blank" rel="noopener">Adiós al test memorístico DGT: nuevo examen desde febrero 2026</a></li>' +
      '<li><a href="https://autoescuelauniversitaria.es/tasa-de-alcoholemia-novel/" target="_blank" rel="noopener">Tasa de alcoholemia novel</a></li>' +
      '</ul>'
  }
];

if (typeof window !== 'undefined') window.BLOG_POSTS = BLOG_POSTS;
if (typeof module !== 'undefined' && module.exports) module.exports = BLOG_POSTS;
