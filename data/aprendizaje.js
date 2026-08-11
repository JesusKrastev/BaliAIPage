/* ===== BALI AI — Contenido de la sección Aprendizaje =====
   Cada bloque temático es un objeto de este array. Los bloques con
   `disponible:false` solo muestran una tarjeta "Próximamente" en la portada.
   Añadir un bloque nuevo = añadir un objeto aquí, no hace falta tocar el JS.

   PRIORIDAD: imagen antes que texto. Cada bloque se apoya en:
   - pasosVisuales: el concepto en icono + frase muy corta (lectura en 5s)
   - señales oficiales de la DGT (campo `archivo`), servidas desde img/aprendizaje/senales/
     -> si el archivo no existe todavía, el componente muestra un hueco con el
        nombre esperado en vez de romper la página.
   - comparativas con tarjetas visuales (resumenVisual) + tabla detallada colapsable
   - colorClave: 'rojo' | 'verde' | 'azul' | 'naranja' (código de color consistente
     en toda la sección: rojo = peligro/prohibición, verde = permitido/correcto,
     azul = información/obligación, naranja = acento de marca / neutro) */

var APRENDIZAJE_BLOQUES = [

  // ============================================================
  // BLOQUE 1 — SEÑALES VERTICALES (completo)
  // ============================================================
  {
    id: 'senales-verticales',
    titulo: 'Señales verticales',
    icono: 'fa-diamond-turn-right',
    color: 'orange',
    resumenCorto: 'La forma y el color ya te dicen el mensaje antes de leer nada.',
    disponible: true,
    ilustracionHeader: { src: 'img/aprendizaje/policia-senales-header.webp', alt: 'Bali vestido de policía de tráfico indicando el alto en un cruce' },
    ilustracionSecundaria: { src: 'img/aprendizaje/policia-senales-circulos.webp', alt: 'Bali entre una señal de prohibición y una de obligación' },

    pasosVisuales: [
      { icono: 'fa-triangle-exclamation', colorClave: 'naranja', texto: 'Triángulo = avisa' },
      { icono: 'fa-ban', colorClave: 'rojo', texto: 'Círculo rojo = prohibido' },
      { icono: 'fa-circle-check', colorClave: 'azul', texto: 'Círculo azul = obligatorio' },
      { icono: 'fa-hand', colorClave: 'rojo', texto: 'STOP = para siempre' },
      { icono: 'fa-square', colorClave: 'verde', texto: 'Rectángulo = información' }
    ],

    esquema: {
      tipo: 'tabs',
      tabs: [
        {
          id: 'peligro', nombre: 'Peligro', color: 'orange',
          descripcion: 'Triángulo, borde rojo. Avisa, no manda ni prohíbe.',
          ejemplos: [
            { texto: 'Curva peligrosa', archivo: 'senal-curva-peligrosa.png', porque: 'Reduce antes, no en la curva' },
            { texto: 'Paso de peatones', archivo: 'senal-paso-peatones.png', porque: 'Puede haber más cerca' },
            { texto: 'Pavimento deslizante', archivo: 'senal-pavimento-deslizante.png', porque: 'Más distancia si llueve' }
          ]
        },
        {
          id: 'prohibicion', nombre: 'Prohibición', color: 'red',
          descripcion: 'Círculo, borde rojo. Prohíbe algo desde ese punto.',
          ejemplos: [
            { texto: 'Prohibido adelantar', archivo: 'senal-prohibido-adelantar.png', porque: 'Para todos los motorizados' },
            { texto: 'Velocidad máxima', archivo: 'senal-velocidad-maxima-90.png', porque: 'Es un límite, no un objetivo' },
            { texto: 'Entrada prohibida', archivo: 'senal-entrada-prohibida.png', porque: 'No se puede acceder' }
          ]
        },
        {
          id: 'obligacion', nombre: 'Obligación', color: 'blue',
          descripcion: 'Círculo, fondo azul. Obliga a hacer algo concreto.',
          ejemplos: [
            { texto: 'Sentido obligatorio', archivo: 'senal-sentido-obligatorio.png', porque: 'Solo hacia donde apunta' },
            { texto: 'Paso obligatorio ciclistas', archivo: 'senal-paso-obligatorio-ciclistas.png', porque: 'Espacio reservado para ellos' },
            { texto: 'Cadenas obligatorias', archivo: 'senal-cadenas-obligatorias.png', porque: 'Típico en puertos de montaña' }
          ]
        },
        {
          id: 'indicacion', nombre: 'Indicación', color: 'green',
          descripcion: 'Cuadrada o rectangular. Informa, no manda ni prohíbe.',
          ejemplos: [
            { texto: 'Autopista / Autovía', archivo: 'senal-autopista.png', porque: 'Verde = vía rápida' },
            { texto: 'Aparcamiento', archivo: 'senal-aparcamiento.png', porque: 'Azul = servicio' },
            { texto: 'Interés turístico', archivo: 'senal-interes-turistico.png', porque: 'Marrón = lugar de interés' }
          ]
        }
      ]
    },

    comparativa: {
      titulo: 'STOP vs Ceda el paso',
      resumenVisual: [
        { archivo: 'senal-stop.png', titulo: 'STOP', colorClave: 'rojo', punto: 'Paras SIEMPRE, aunque no venga nadie' },
        { archivo: 'senal-ceda-el-paso.png', titulo: 'Ceda el paso', colorClave: 'naranja', punto: 'Paras SOLO si viene alguien' }
      ],
      columnas: ['STOP', 'Ceda el paso'],
      filas: [
        { label: 'Forma', valores: ['Octógono', 'Triángulo invertido'] },
        { label: '¿Hay que detenerse?', valores: ['Sí, siempre', 'Solo si viene alguien'] },
        { label: 'Colores', valores: ['Fondo rojo, letras blancas', 'Borde rojo, fondo blanco'] },
        { label: 'Si no lo respetas', valores: ['Infracción grave, aunque esté vacía', 'Infracción solo si obligas a otro a maniobrar'] }
      ]
    },

    trucos: [
      { icono: 'fa-shapes', colorClave: 'naranja', frase: 'Esquinas avisan, redondas mandan.', explicacion: 'Triángulo avisa, cuadrado informa. Los círculos siempre imponen: prohíben u obligan.' },
      { icono: 'fa-palette', colorClave: 'rojo', frase: 'Rojo te frena, azul te mueve.', explicacion: 'Rojo (prohibición, STOP, ceda) = parar o no hacer. Azul (obligación) = qué SÍ hacer.' },
      { icono: 'fa-hand', colorClave: 'rojo', frase: 'El STOP no negocia.', explicacion: 'Aunque la vía esté vacía, paras del todo antes de continuar.' }
    ],

    confusionesTipicas: [
      { pregunta: '¿Se puede pasar un ceda el paso sin detenerse?', respuesta: 'Sí, si no viene nadie. Si hay tráfico, cede igual que en cualquier cruce.' },
      { pregunta: '¿Una señal de peligro obliga a algo?', respuesta: 'No, solo avisa. Ignorar el aviso y que pase algo sí puede ser imprudencia.' },
      { pregunta: '¿El panel blanco de debajo es otra señal?', respuesta: 'No, es un panel complementario que matiza la señal de arriba (ej. "excepto residentes").' }
    ],

    quiz: [
      { pregunta: '¿Qué forma tiene siempre una señal de peligro?', opciones: ['Triángulo', 'Círculo', 'Octógono', 'Rectángulo'], correcta: 0, explicacion: 'Las señales de peligro son triangulares, borde rojo, fondo blanco o amarillo.' },
      { pregunta: 'Un círculo con borde rojo y pictograma negro indica...', opciones: ['Obligación', 'Prohibición o restricción', 'Información', 'Peligro'], correcta: 1, explicacion: 'Círculo, borde rojo, fondo blanco = prohibición.' },
      { pregunta: 'En un STOP sin tráfico a la vista, ¿qué debes hacer?', opciones: ['Reducir y seguir si no viene nadie', 'Detenerte por completo igualmente', 'Solo pararte si hay otro vehículo', 'Tocar el claxon y continuar'], correcta: 1, explicacion: 'El STOP exige detención total siempre, a diferencia del ceda el paso.' },
      { pregunta: '¿De qué color es el fondo de las señales de obligación?', opciones: ['Blanco', 'Amarillo', 'Azul', 'Verde'], correcta: 2, explicacion: 'Obligación = círculo de fondo azul, pictograma blanco.' },
      { pregunta: 'Un panel verde en autopista normalmente indica...', opciones: ['Peligro de curva', 'Número de salida o dirección', 'Prohibido adelantar', 'Zona de obras'], correcta: 1, explicacion: 'El verde es el color de la señalización informativa de autopistas y autovías.' },
      { pregunta: '¿Qué distingue al ceda el paso del STOP?', opciones: ['El color', 'El tamaño', 'Que solo obliga a parar si hay tráfico real', 'Que solo se usa en ciudad'], correcta: 2, explicacion: 'El ceda el paso exige parar solo si hace falta; el STOP siempre.' }
    ]
  },

  // ============================================================
  // BLOQUE 2 — VELOCIDAD Y DISTANCIAS DE SEGURIDAD (completo)
  // ============================================================
  {
    id: 'velocidad-distancias',
    titulo: 'Velocidad y distancias de seguridad',
    icono: 'fa-gauge-high',
    color: 'blue',
    resumenCorto: 'A más velocidad, la frenada crece mucho más rápido que la reacción.',
    disponible: true,
    ilustracionHeader: { src: 'img/aprendizaje/bali-distancia-header.webp', alt: 'Bali observando la distancia entre dos coches en carretera' },
    ilustracionSecundaria: { src: 'img/aprendizaje/bali-frenada-flashcard.webp', alt: 'Bali junto a una pizarra explicando la fórmula de la distancia de frenado' },

    pasosVisuales: [
      { icono: 'fa-gauge-high', colorClave: 'azul', texto: '120 en autovía, 50 en ciudad' },
      { icono: 'fa-ruler-horizontal', colorClave: 'naranja', texto: 'Seguridad = hueco con el de delante' },
      { icono: 'fa-stopwatch', colorClave: 'naranja', texto: 'Detención = reacción + frenada' },
      { icono: 'fa-cloud-rain', colorClave: 'azul', texto: 'Mojado = casi el doble de frenada' },
      { icono: 'fa-chart-line', colorClave: 'rojo', texto: 'Doble velocidad = 4x más frenada' }
    ],

    esquema: {
      tipo: 'visual-velocidad',
      limites: [
        { archivo: 'senal-velocidad-120.png', valor: '120 km/h', label: 'Autopista / Autovía' },
        { archivo: 'senal-velocidad-100.png', valor: '100 km/h', label: 'Convencional, arcén ≥1,5m' },
        { archivo: 'senal-velocidad-90.png', valor: '90 km/h', label: 'Resto de convencionales' },
        { archivo: 'senal-velocidad-50.png', valor: '50 km/h', label: 'Población' },
        { archivo: 'senal-velocidad-30.png', valor: '30 km/h', label: 'Calle un carril por sentido' }
      ]
    },

    comparativa: {
      titulo: 'Distancia de seguridad vs distancia de detención',
      resumenVisual: [
        { icono: 'fa-car-side', titulo: 'Distancia de seguridad', colorClave: 'naranja', punto: 'El hueco que TÚ dejas' },
        { icono: 'fa-flag-checkered', titulo: 'Distancia de detención', colorClave: 'rojo', punto: 'Lo que el coche REALMENTE recorre' }
      ],
      columnas: ['Distancia de seguridad', 'Distancia de detención'],
      filas: [
        { label: '¿Qué es?', valores: ['El hueco que dejas con el coche de delante', 'Lo que recorres desde que ves el peligro hasta pararte'] },
        { label: '¿De qué depende?', valores: ['Velocidad y tiempo de reacción', 'Reacción + frenada (velocidad, firme, neumáticos)'] },
        { label: 'Regla rápida', valores: ['Regla de los 2 segundos (3 si llueve/noche)', 'Al doblar la velocidad, la frenada x4'] }
      ]
    },

    calculadora: {
      titulo: 'La regla del examen para calcular distancias',
      descripcion: 'Fórmula simplificada para razonar el examen, no la física exacta de tu coche.',
      velocidadMin: 30, velocidadMax: 120, velocidadPaso: 10, velocidadInicial: 90
    },
    diagrama: { tipo: 'distancia-top-down' },

    trucos: [
      { icono: 'fa-futbol', colorClave: 'naranja', frase: 'A 90 km/h frenas casi un campo de fútbol entero.', explicacion: 'Reaccionar + frenar en seco a 90 km/h son unos 108 metros. A 120 km/h, casi el doble: 180 metros.' },
      { icono: 'fa-stopwatch', colorClave: 'azul', frase: '"Mil uno, mil dos" y ya lo sabes.', explicacion: 'Cuenta desde que el coche de delante pasa un punto fijo. Si llegas antes de "mil dos", vas muy cerca.' },
      { icono: 'fa-cloud-rain', colorClave: 'azul', frase: 'Con lluvia, todo se multiplica.', explicacion: 'El firme mojado puede doblar la frenada. Cuenta 3 segundos, no 2.' }
    ],

    confusionesTipicas: [
      { pregunta: '¿Seguridad y detención son lo mismo?', respuesta: 'No. Seguridad es el hueco que dejas por precaución; detención es lo que el coche recorre de verdad hasta pararse. La de seguridad debe ser, como mínimo, igual a la de detención.' },
      { pregunta: 'Si voy al doble de velocidad, ¿necesito el doble de espacio para frenar?', respuesta: 'No, bastante más: la frenada depende del cuadrado de la velocidad, así que se multiplica por 4.' },
      { pregunta: '¿El límite es la velocidad a la que debo ir?', respuesta: 'No, es un máximo. Con lluvia, niebla o tráfico, la velocidad adecuada puede ser menor.' }
    ],

    quiz: [
      { pregunta: '¿Cuál es el límite general en autovía para un turismo?', opciones: ['100 km/h', '110 km/h', '120 km/h', '130 km/h'], correcta: 2, explicacion: 'En autopista y autovía, el límite general para turismos es 120 km/h.' },
      { pregunta: 'La regla de los 2 segundos sirve para calcular...', opciones: ['La velocidad máxima permitida', 'La distancia de seguridad con el vehículo de delante', 'El tiempo de un adelantamiento', 'La duración del semáforo'], correcta: 1, explicacion: 'Contar 2 segundos desde un punto fijo te da una distancia de seguridad razonable.' },
      { pregunta: 'Si duplicas la velocidad, la distancia de frenado en seco...', opciones: ['Se mantiene igual', 'Se duplica', 'Se multiplica por 4', 'Se reduce a la mitad'], correcta: 2, explicacion: 'La frenada crece con el cuadrado de la velocidad: se multiplica por cuatro.' },
      { pregunta: '¿Qué distancia incluye reacción y frenada?', opciones: ['Distancia de seguridad', 'Distancia de detención', 'Distancia de adelantamiento', 'Distancia de visibilidad'], correcta: 1, explicacion: 'Detención = reacción + frenada.' },
      { pregunta: '¿Límite en una calle de un solo carril por sentido, en población?', opciones: ['20 km/h', '30 km/h', '50 km/h', '70 km/h'], correcta: 1, explicacion: 'En vías urbanas de un único carril por sentido, el límite general es 30 km/h.' },
      { pregunta: 'Con lluvia, ¿qué se recomienda respecto a la distancia de seguridad?', opciones: ['Reducirla', 'Mantenerla igual', 'Aumentarla, contando 3 segundos', 'Solo importa de noche'], correcta: 2, explicacion: 'El firme mojado alarga mucho la frenada: conviene ampliar el margen.' }
    ]
  },

  // ============================================================
  // BLOQUE 3 — SEÑALES HORIZONTALES Y MARCAS VIALES (completo)
  // ============================================================
  {
    id: 'senales-horizontales',
    titulo: 'Señales horizontales y marcas viales',
    icono: 'fa-road',
    color: 'purple',
    resumenCorto: 'Líneas, flechas y símbolos pintados en el asfalto, con su propio código.',
    disponible: true,
    ilustracionHeader: { src: 'img/aprendizaje/marcas-viales-header.webp', alt: 'Bali de pie sobre la carretera, donde una línea continua pasa a discontinua' },
    ilustracionSecundaria: { src: 'img/aprendizaje/marcas-viales-zigzag.webp', alt: 'Bali junto a una marca amarilla en zigzag de prohibido parar' },

    pasosVisuales: [
      { icono: 'fa-ban', colorClave: 'rojo', texto: 'Continua = no cruces' },
      { icono: 'fa-check', colorClave: 'verde', texto: 'Discontinua = cruza si puedes' },
      { icono: 'fa-bus', colorClave: 'rojo', texto: 'Zigzag amarillo = no pares' },
      { icono: 'fa-arrow-up', colorClave: 'azul', texto: 'Flecha = carril obligatorio' },
      { icono: 'fa-person-walking', colorClave: 'naranja', texto: 'Cebra = prioridad peatón' }
    ],

    esquema: {
      tipo: 'tabs',
      tabs: [
        {
          id: 'longitudinales', nombre: 'Longitudinales', color: 'blue',
          descripcion: 'Van a lo largo de la vía. Separan carriles o sentidos.',
          ejemplos: [
            { texto: 'Línea continua', archivo: 'senal-linea-continua.png', porque: 'No se puede cruzar' },
            { texto: 'Línea discontinua', archivo: 'senal-linea-discontinua.png', porque: 'Cruza si es seguro' },
            { texto: 'Línea mixta', archivo: 'senal-linea-mixta.png', porque: 'Cruza solo desde el lado discontinuo' }
          ]
        },
        {
          id: 'transversales', nombre: 'Transversales', color: 'orange',
          descripcion: 'Cruzan la vía. Marcan dónde parar o ceder.',
          ejemplos: [
            { texto: 'STOP pintado', archivo: 'senal-stop-pintado.png', porque: 'Para en la línea, no después' },
            { texto: 'Ceda el paso pintado', archivo: 'senal-ceda-pintado.png', porque: 'Triángulos = ceda el paso' },
            { texto: 'Paso de peatones', archivo: 'senal-paso-peatones-horizontal.png', porque: 'Prioridad del peatón' }
          ]
        },
        {
          id: 'estacionamiento', nombre: 'Estacionamiento', color: 'red',
          descripcion: 'Líneas amarillas en el bordillo. Regulan parar y estacionar.',
          ejemplos: [
            { texto: 'Amarilla continua', archivo: 'senal-linea-amarilla-continua.png', porque: 'Prohibido parar y estacionar' },
            { texto: 'Amarilla discontinua', archivo: 'senal-linea-amarilla-discontinua.png', porque: 'Puedes parar, no estacionar' },
            { texto: 'Zigzag amarillo', archivo: 'senal-zigzag-amarillo.png', porque: 'Reservado, no pares aquí' }
          ]
        },
        {
          id: 'otras', nombre: 'Otras marcas', color: 'green',
          descripcion: 'Flechas, símbolos e inscripciones pintadas en el carril.',
          ejemplos: [
            { texto: 'Flecha de carril', archivo: 'senal-flecha-carril.png', porque: 'Dirección obligatoria de ese carril' },
            { texto: 'Paso de ciclistas', archivo: 'senal-paso-ciclistas.png', porque: 'Prioridad para las bicis' }
          ]
        }
      ]
    },

    comparativa: {
      titulo: 'Línea continua vs discontinua',
      resumenVisual: [
        { archivo: 'senal-linea-continua.png', titulo: 'Línea continua', colorClave: 'rojo', punto: 'NUNCA la cruces' },
        { archivo: 'senal-linea-discontinua.png', titulo: 'Línea discontinua', colorClave: 'verde', punto: 'Cruza SOLO si es seguro' }
      ],
      columnas: ['Línea continua', 'Línea discontinua'],
      filas: [
        { label: '¿Se puede cruzar?', valores: ['No, nunca', 'Sí, si hay visibilidad y espacio'] },
        { label: '¿Para qué se usa?', valores: ['Separar sentidos sin visibilidad suficiente', 'Separar carriles donde se puede adelantar o cambiar'] },
        { label: '¿Y la línea mixta?', valores: ['Se cruza solo desde el lado de la discontinua', 'Se cruza solo desde el lado de la discontinua'] }
      ]
    },

    trucos: [
      { icono: 'fa-ban', colorClave: 'rojo', frase: 'Continua = pared invisible.', explicacion: 'Como si hubiera un muro pintado en el suelo: ni se cruza ni se adelanta.' },
      { icono: 'fa-check', colorClave: 'verde', frase: 'Discontinua = puerta abierta.', explicacion: 'Puedes cruzarla si ves que no viene nadie y hay espacio.' },
      { icono: 'fa-bus', colorClave: 'rojo', frase: 'Zigzag amarillo = "aquí no, ahí sí".', explicacion: 'Suele marcar paradas de bus o zonas escolares: nunca pares encima.' }
    ],

    confusionesTipicas: [
      { pregunta: '¿La línea amarilla discontinua funciona como la blanca?', respuesta: 'No. La amarilla nunca regula circulación, solo si puedes parar (sí, brevemente) o estacionar (no) en el borde de la vía.' },
      { pregunta: '¿En una línea mixta puedo cruzar desde cualquier lado?', respuesta: 'No, solo desde el lado donde ves la línea discontinua. Desde el lado continuo, no se cruza.' },
      { pregunta: '¿El paso de peatones da prioridad absoluta siempre?', respuesta: 'El peatón tiene prioridad al cruzar o acceder con claridad, pero como conductor debes anticiparte y reducir la velocidad al acercarte igualmente.' }
    ],

    quiz: [
      { pregunta: '¿Se puede cruzar una línea continua para adelantar?', opciones: ['Sí, si no viene nadie', 'No, nunca', 'Solo de día', 'Solo en autovía'], correcta: 1, explicacion: 'La línea continua no se cruza en ningún caso, tampoco para adelantar.' },
      { pregunta: 'En una línea mixta, ¿desde qué lado se puede cruzar?', opciones: ['Desde cualquier lado', 'Desde el lado de la discontinua', 'Desde el lado de la continua', 'No se puede cruzar nunca'], correcta: 1, explicacion: 'Solo el conductor que tiene la línea discontinua a su lado puede cruzar.' },
      { pregunta: '¿Qué indica una línea amarilla continua en el bordillo?', opciones: ['Prohibido parar y estacionar', 'Prohibido solo estacionar', 'Carril bus', 'Zona de carga y descarga'], correcta: 0, explicacion: 'La amarilla continua prohíbe tanto parar como estacionar.' },
      { pregunta: '¿Qué indica una línea amarilla discontinua?', opciones: ['Prohibido parar', 'Prohibido estacionar, pero se puede parar', 'Aparcamiento libre', 'Carril bici'], correcta: 1, explicacion: 'Permite parar brevemente, pero no dejar el vehículo estacionado.' },
      { pregunta: '¿Qué son los triángulos pintados antes de un cruce?', opciones: ['Marca de STOP', 'Marca de ceda el paso', 'Zona de obras', 'Paso de ciclistas'], correcta: 1, explicacion: 'Los triángulos pintados son la versión horizontal del ceda el paso.' },
      { pregunta: 'Una flecha pintada en un carril indica...', opciones: ['Una sugerencia', 'La dirección obligatoria de ese carril', 'Un adelantamiento permitido', 'El límite de velocidad'], correcta: 1, explicacion: 'La flecha de carril es obligatoria: marca por dónde debes seguir desde ese carril.' }
    ]
  },

  // ============================================================
  // BLOQUE 4 — NORMAS GENERALES DE CIRCULACIÓN (completo)
  // ============================================================
  {
    id: 'normas-generales',
    titulo: 'Normas generales de circulación',
    icono: 'fa-book',
    color: 'orange',
    resumenCorto: 'Las reglas base que deciden por ti cuando no hay ninguna señal.',
    disponible: true,
    ilustracionHeader: { src: 'img/aprendizaje/normas-cruce-header.webp', alt: 'Bali en el centro de un cruce sin señalizar, mirando al coche que viene por la derecha' },
    ilustracionSecundaria: { src: 'img/aprendizaje/normas-cinturon-movil.webp', alt: 'Bali con un cinturón de seguridad puesto y un icono de móvil prohibido al lado' },

    pasosVisuales: [
      { icono: 'fa-road', colorClave: 'azul', texto: 'Siempre circula por la derecha' },
      { icono: 'fa-car-side', colorClave: 'naranja', texto: 'Sin señal, prioridad a la derecha' },
      { icono: 'fa-user-shield', colorClave: 'rojo', texto: 'Cinturón puesto siempre' },
      { icono: 'fa-mobile-screen', colorClave: 'rojo', texto: 'Móvil solo con manos libres' },
      { icono: 'fa-lightbulb', colorClave: 'azul', texto: 'Luces de cruce de noche y en túnel' }
    ],

    esquema: {
      tipo: 'tabs',
      tabs: [
        {
          id: 'luces', nombre: 'Luces', color: 'blue',
          descripcion: 'Cada luz tiene su momento. Usar la equivocada también sanciona.',
          ejemplos: [
            { texto: 'Luces de cruce', archivo: 'senal-luces-cruce.png', porque: 'Obligatorias de noche y en túnel' },
            { texto: 'Luces largas', archivo: 'senal-luces-largas.png', porque: 'Solo sin deslumbrar a nadie' },
            { texto: 'Luces antiniebla', archivo: 'senal-luces-antiniebla.png', porque: 'Con niebla, lluvia intensa o nieve' }
          ]
        },
        {
          id: 'a-bordo', nombre: 'A bordo', color: 'red',
          descripcion: 'Lo que tienes que llevar puesto o guardado antes de arrancar.',
          ejemplos: [
            { texto: 'Cinturón obligatorio', archivo: 'senal-cinturon-obligatorio.png', porque: 'En todos los asientos, siempre' },
            { texto: 'Prohibido el móvil', archivo: 'senal-prohibido-movil.png', porque: 'Solo se permite con manos libres' },
            { texto: 'Sistema de retención infantil', archivo: 'senal-sistema-retencion-infantil.png', porque: 'Obligatorio según la talla del menor' }
          ]
        },
        {
          id: 'parar-estacionar', nombre: 'Parar y estacionar', color: 'orange',
          descripcion: 'Parar es pararte un momento sin bajarte. Estacionar es dejar el coche.',
          ejemplos: [
            { texto: 'Vado permanente', archivo: 'senal-vado-permanente.png', porque: 'Prohibido tapar la salida' },
            { texto: 'Carga y descarga', archivo: 'senal-carga-descarga.png', porque: 'Solo dentro de su horario' },
            { texto: 'Prohibido estacionar', archivo: 'senal-prohibido-estacionar.png', porque: 'No dejes el coche en ese tramo' }
          ]
        }
      ]
    },

    comparativa: {
      titulo: 'Cruce sin semáforos ni señales: ¿quién pasa?',
      resumenVisual: [
        { icono: 'fa-car', titulo: 'Viene por tu derecha', colorClave: 'rojo', punto: 'Tiene prioridad, cede tú' },
        { icono: 'fa-car-side', titulo: 'Viene por tu izquierda', colorClave: 'verde', punto: 'Tú tienes prioridad' }
      ],
      columnas: ['Viene por tu derecha', 'Viene por tu izquierda'],
      filas: [
        { label: '¿Quién pasa primero?', valores: ['Él, tiene preferencia', 'Tú, él debe cederte'] },
        { label: '¿Cuándo se aplica?', valores: ['Solo si no hay señal ni semáforo', 'Solo si no hay señal ni semáforo'] },
        { label: 'Ojo con...', valores: ['Rotondas y vías ya señalizadas no siguen esta regla', 'Rotondas y vías ya señalizadas no siguen esta regla'] }
      ]
    },

    trucos: [
      { icono: 'fa-hand-point-right', colorClave: 'rojo', frase: '"El de la derecha, manda."', explicacion: 'Sin señales ni semáforos, el coche que viene por tu derecha pasa primero.' },
      { icono: 'fa-moon', colorClave: 'azul', frase: 'De noche, luces de cruce por defecto.', explicacion: 'En ciudad bien iluminada puedes bajarlas; en carretera o túnel, siempre puestas.' },
      { icono: 'fa-mobile-screen', colorClave: 'rojo', frase: 'Móvil en la mano, multa en el bolsillo.', explicacion: 'Ni sujetarlo ni mirarlo en un semáforo: solo manos libres o coche ya estacionado.' }
    ],

    confusionesTipicas: [
      { pregunta: '¿La prioridad a la derecha vale en cualquier cruce?', respuesta: 'No, solo cuando no hay semáforos, señales de STOP/ceda ni marcas que ya digan quién pasa. Si hay señalización, esa manda siempre.' },
      { pregunta: '¿Puedo usar el móvil parado en un semáforo?', respuesta: 'No, si el motor está encendido y no has estacionado, sigue considerándose conducción: solo con manos libres.' },
      { pregunta: '¿Las luces largas se pueden usar siempre de noche?', respuesta: 'No, solo cuando no vayas a deslumbrar a nadie. Si viene alguien de frente o vas justo detrás de otro coche, usa las de cruce.' }
    ],

    quiz: [
      { pregunta: 'En un cruce sin semáforos ni señales, ¿quién tiene prioridad?', opciones: ['El más rápido', 'El que viene por tu derecha', 'El que viene por tu izquierda', 'El más grande'], correcta: 1, explicacion: 'Sin señalización, manda la prioridad a la derecha.' },
      { pregunta: '¿Cuándo son obligatorias las luces de cruce?', opciones: ['Solo si llueve', 'De noche y en túneles', 'Nunca, son opcionales', 'Solo en autopista'], correcta: 1, explicacion: 'De noche y en túneles (aunque estén iluminados) son obligatorias.' },
      { pregunta: '¿El cinturón de seguridad es obligatorio...?', opciones: ['Solo en el asiento delantero', 'Solo en carretera', 'En todos los asientos, siempre', 'Solo para el conductor'], correcta: 2, explicacion: 'Es obligatorio para todos los ocupantes, en cualquier asiento y vía.' },
      { pregunta: '¿Se puede hablar por el móvil conduciendo?', opciones: ['Sí, sujetándolo con una mano', 'Solo con manos libres', 'Nunca, bajo ningún concepto', 'Sí, si vas despacio'], correcta: 1, explicacion: 'Solo está permitido con un sistema de manos libres.' },
      { pregunta: '¿Qué es un vado permanente?', opciones: ['Una zona de aparcamiento gratuito', 'Una salida de vehículos que no se puede tapar', 'Un carril bus', 'Una parada de autobús'], correcta: 1, explicacion: 'Marca una entrada/salida de vehículos que debe quedar siempre libre.' },
      { pregunta: '¿La prioridad a la derecha se aplica en una rotonda ya señalizada?', opciones: ['Sí, siempre', 'No, tiene prioridad quien ya circula por ella', 'Solo de noche', 'Solo si no hay tráfico'], correcta: 1, explicacion: 'En una rotonda señalizada, manda la norma específica: prioridad para quien ya está dentro.' }
    ]
  },

  // ============================================================
  // BLOQUE 5 — ADELANTAMIENTOS (completo)
  // ============================================================
  {
    id: 'adelantamientos',
    titulo: 'Adelantamientos',
    icono: 'fa-arrow-right-arrow-left',
    color: 'red',
    resumenCorto: 'Cuándo, cómo y dónde se puede adelantar con seguridad.',
    disponible: true,
    ilustracionHeader: { src: 'img/aprendizaje/adelantamientos-header.webp', alt: 'Bali junto a un coche adelantando a otro por la izquierda en una carretera' },
    ilustracionSecundaria: { src: 'img/aprendizaje/adelantamientos-ciclista.webp', alt: 'Bali señalando 1,5 metros de separación al adelantar a un ciclista' },

    pasosVisuales: [
      { icono: 'fa-arrow-left', colorClave: 'azul', texto: 'Siempre por la izquierda' },
      { icono: 'fa-road', colorClave: 'rojo', texto: 'Nunca en curva o cambio de rasante' },
      { icono: 'fa-person-walking', colorClave: 'rojo', texto: 'Nunca en un paso de peatones' },
      { icono: 'fa-bicycle', colorClave: 'naranja', texto: 'A ciclistas, 1,5 m de separación' },
      { icono: 'fa-eye', colorClave: 'azul', texto: 'Solo con visibilidad y espacio de sobra' }
    ],

    esquema: {
      tipo: 'tabs',
      tabs: [
        {
          id: 'permitido', nombre: 'Cuándo sí', color: 'green',
          descripcion: 'Con línea discontinua, visibilidad total del tramo y espacio de sobra para volver a tu carril.',
          ejemplos: [
            { texto: 'Línea discontinua', archivo: 'senal-linea-discontinua.png', porque: 'Puedes cruzarla si ves que no viene nadie' },
            { texto: 'Línea mixta', archivo: 'senal-linea-mixta.png', porque: 'Se adelanta solo desde el lado de la discontinua' }
          ]
        },
        {
          id: 'senal-marca', nombre: 'Prohibido por señal o marca', color: 'red',
          descripcion: 'La señal o la marca vial ya te lo dicen directamente: no se adelanta.',
          ejemplos: [
            { texto: 'Señal de prohibido adelantar', archivo: 'senal-prohibido-adelantar.png', porque: 'Vale hasta la señal de fin de prohibición' },
            { texto: 'Línea continua', archivo: 'senal-linea-continua.png', porque: 'Nunca la cruces, tampoco para adelantar' }
          ]
        },
        {
          id: 'lugar', nombre: 'Prohibido por el lugar', color: 'orange',
          descripcion: 'Aunque no haya ninguna señal, el propio lugar ya prohíbe adelantar.',
          ejemplos: [
            { texto: 'Curvas y cambios de rasante', archivo: 'senal-curva-peligrosa.png', porque: 'Sin visibilidad del tramo libre, no se adelanta' },
            { texto: 'Pasos de peatones', archivo: 'senal-paso-peatones.png', porque: 'Prohibido aunque no haya nadie cruzando' }
          ]
        }
      ]
    },

    comparativa: {
      titulo: 'Adelantar a un ciclista: los dos requisitos',
      resumenVisual: [
        { icono: 'fa-ruler-horizontal', titulo: 'Separación lateral', colorClave: 'naranja', punto: 'Mínimo 1,5 metros, en cualquier vía' },
        { icono: 'fa-road', titulo: 'Cambio de carril', colorClave: 'azul', punto: 'Con 2+ carriles por sentido, ocupa el otro entero' }
      ],
      columnas: ['Vía de un carril por sentido', 'Vía de 2+ carriles por sentido'],
      filas: [
        { label: '¿Puedes invadir el sentido contrario?', valores: ['Sí, si hay visibilidad y espacio', 'No hace falta: usa el otro carril'] },
        { label: 'Distancia lateral mínima', valores: ['1,5 metros', '1,5 metros'] },
        { label: 'Qué exige la norma además', valores: ['Reducir la velocidad con margen', 'Cambiar de carril por completo'] }
      ]
    },

    trucos: [
      { icono: 'fa-ruler-horizontal', colorClave: 'naranja', frase: 'Al ciclista, 1,5 metros o no adelantas.', explicacion: 'Es la separación lateral mínima obligatoria en cualquier vía, aunque tengas que invadir parcialmente el carril contrario.' },
      { icono: 'fa-eye-slash', colorClave: 'rojo', frase: 'Si no ves el final, no adelantas.', explicacion: 'Curvas, cambios de rasante, niebla o lluvia intensa: sin visibilidad total del tramo libre, la maniobra queda prohibida.' },
      { icono: 'fa-calendar-check', colorClave: 'azul', frase: 'Desde octubre de 2026, también cuenta la velocidad.', explicacion: 'Al adelantar a un vehículo parado o a uno o varios ciclistas, la norma exige además reducir la velocidad al menos 20 km/h por debajo del límite de la vía.' }
    ],

    confusionesTipicas: [
      { pregunta: '¿Se puede adelantar por la derecha?', respuesta: 'Como norma general no, salvo casos concretos: cuando el vehículo de delante señaliza un giro a la izquierda y deja espacio, en vías de sentido único con varios carriles, o en retenciones organizadas por carriles.' },
      { pregunta: '¿Puedo adelantar a un vehículo que a su vez está adelantando a otro?', respuesta: 'No, salvo que tengas la certeza absoluta de poder hacerlo con seguridad. Como norma general se considera una maniobra prohibida por el riesgo que supone.' },
      { pregunta: '¿Qué debe hacer el conductor al que estás adelantando?', respuesta: 'No acelerar ni entorpecer la maniobra. Debe mantener su velocidad y facilitar que el adelantamiento se complete cuanto antes.' }
    ],

    quiz: [
      { pregunta: '¿Por qué lado se debe adelantar, como norma general?', opciones: ['Por la derecha', 'Por la izquierda', 'Por el lado que haya más espacio', 'Indistintamente'], correcta: 1, explicacion: 'La maniobra de adelantamiento se realiza por la izquierda, salvo excepciones muy concretas.' },
      { pregunta: '¿Está permitido adelantar en un cambio de rasante?', opciones: ['Sí, siempre', 'Solo si hay línea discontinua', 'No, si reduce la visibilidad del tramo', 'Solo de noche'], correcta: 2, explicacion: 'Si el cambio de rasante impide ver el tramo libre de vehículos que vienen de frente, el adelantamiento está prohibido.' },
      { pregunta: '¿Cuál es la distancia lateral mínima para adelantar a un ciclista?', opciones: ['1 metro', '1,5 metros', '2 metros', 'No hay distancia mínima'], correcta: 1, explicacion: '1,5 metros de separación lateral, obligatorios en cualquier tipo de vía.' },
      { pregunta: '¿Se puede adelantar en un paso de peatones señalizado?', opciones: ['Sí, si no hay nadie cruzando', 'No, nunca', 'Solo fuera de ciudad', 'Solo con línea discontinua'], correcta: 1, explicacion: 'Está prohibido adelantar sobre un paso de peatones señalizado, haya o no peatones cruzando en ese momento.' },
      { pregunta: '¿Qué debe hacer el conductor al que están adelantando?', opciones: ['Acelerar para terminar antes', 'Mantener su velocidad y facilitar la maniobra', 'Frenar en seco', 'Cambiar de carril'], correcta: 1, explicacion: 'No debe acelerar ni entorpecer: mantiene su velocidad y facilita que el adelantamiento termine cuanto antes.' },
      { pregunta: '¿Está permitido adelantar cerca de una intersección?', opciones: ['Sí, siempre', 'No, salvo excepciones como glorietas o vías con prioridad', 'Solo con las luces largas', 'Solo si no hay semáforo'], correcta: 1, explicacion: 'Como norma general está prohibido en intersecciones y sus proximidades, salvo en glorietas, cuando el adelantamiento se haga por la derecha, o cuando la vía por la que circulas tenga prioridad.' }
    ]
  },

  // ============================================================
  // BLOQUE 6 — INTERSECCIONES Y PRIORIDAD DE PASO (completo)
  // ============================================================
  {
    id: 'intersecciones',
    titulo: 'Intersecciones y prioridad de paso',
    icono: 'fa-arrows-to-circle',
    color: 'blue',
    resumenCorto: 'Quién pasa primero en cruces y glorietas.',
    disponible: true,
    ilustracionHeader: { src: 'img/aprendizaje/intersecciones-header.webp', alt: 'Bali en el centro de una rotonda dirigiendo el tráfico que entra y sale' },
    ilustracionSecundaria: { src: 'img/aprendizaje/intersecciones-jerarquia.webp', alt: 'Bali vestido de agente de tráfico junto a un semáforo, mostrando quién manda primero' },

    pasosVisuales: [
      { icono: 'fa-hand', colorClave: 'rojo', texto: 'El agente manda siempre' },
      { icono: 'fa-traffic-light', colorClave: 'azul', texto: 'Semáforo antes que señal' },
      { icono: 'fa-circle-notch', colorClave: 'verde', texto: 'En rotonda, prioridad quien ya está dentro' },
      { icono: 'fa-car-side', colorClave: 'naranja', texto: 'Sin señales, prioridad a la derecha' },
      { icono: 'fa-triangle-exclamation', colorClave: 'rojo', texto: 'Ambulancia con sirena, prioridad absoluta' }
    ],

    esquema: {
      tipo: 'tabs',
      tabs: [
        {
          id: 'vertical', nombre: 'Señal vertical', color: 'red',
          descripcion: 'La señal, si existe, manda por encima de la norma general de prioridad a la derecha.',
          ejemplos: [
            { texto: 'STOP', archivo: 'senal-stop.png', porque: 'Detente siempre, aunque no venga nadie' },
            { texto: 'Ceda el paso', archivo: 'senal-ceda-el-paso.png', porque: 'Cede solo si viene alguien' }
          ]
        },
        {
          id: 'horizontal', nombre: 'Marca en el suelo', color: 'orange',
          descripcion: 'Mismo significado que la señal vertical, pintado directamente en el asfalto.',
          ejemplos: [
            { texto: 'STOP pintado', archivo: 'senal-stop-pintado.png', porque: 'Para en la línea, no después' },
            { texto: 'Ceda el paso pintado', archivo: 'senal-ceda-pintado.png', porque: 'Triángulos = ceda el paso' }
          ]
        }
      ]
    },

    comparativa: {
      titulo: 'Rotonda vs cruce sin señalizar: ¿quién pasa?',
      resumenVisual: [
        { icono: 'fa-circle-notch', titulo: 'Rotonda / Glorieta', colorClave: 'verde', punto: 'Prioridad para quien ya circula dentro' },
        { icono: 'fa-car-side', titulo: 'Cruce sin señalizar', colorClave: 'naranja', punto: 'Prioridad para quien viene por tu derecha' }
      ],
      columnas: ['Rotonda / Glorieta', 'Cruce sin señalizar'],
      filas: [
        { label: '¿Quién tiene prioridad?', valores: ['Los vehículos que ya están dentro', 'El que viene por tu derecha'] },
        { label: '¿Quién cede?', valores: ['Quien se incorpora desde fuera', 'Quien no tiene la derecha despejada'] },
        { label: '¿Puede cambiar con señales?', valores: ['Sí, algunas glorietas grandes tienen semáforos o STOP interiores', 'Sí, cualquier señal o semáforo manda por encima de esta norma'] }
      ]
    },

    trucos: [
      { icono: 'fa-ranking-star', colorClave: 'azul', frase: 'Agente, luego semáforo, luego señal, luego marca.', explicacion: 'Ese es el orden de prioridad si dos indicaciones se contradicen: manda siempre la que esté más arriba en la lista.' },
      { icono: 'fa-circle-notch', colorClave: 'verde', frase: 'En la rotonda, el de dentro manda.', explicacion: 'Quien ya está circulando por la rotonda tiene prioridad sobre quien quiere entrar, salvo que una señal diga lo contrario.' },
      { icono: 'fa-triangle-exclamation', colorClave: 'rojo', frase: 'La sirena gana a todo lo demás.', explicacion: 'Un vehículo de emergencia con luces y sirena activadas tiene prioridad absoluta: el resto debe facilitarle el paso.' }
    ],

    confusionesTipicas: [
      { pregunta: '¿La prioridad a la derecha se aplica siempre?', respuesta: 'No, solo cuando no hay semáforos, señales de STOP/ceda el paso ni marcas viales que ya digan quién pasa. En cuanto hay señalización, esa manda por encima de la prioridad a la derecha.' },
      { pregunta: '¿Si dos señales se contradicen, cuál gana?', respuesta: 'Depende: entre tipos distintos (por ejemplo semáforo y señal vertical) gana la que esté más arriba en el orden de prioridad. Entre señales del mismo tipo, gana la más restrictiva.' },
      { pregunta: '¿Un vehículo de emergencia con la sirena puesta tiene prioridad absoluta?', respuesta: 'Sí. Con las señales acústicas y luminosas activadas, el resto de conductores debe facilitarle el paso, incluso apartándose o deteniéndose si hace falta.' }
    ],

    quiz: [
      { pregunta: '¿Qué tiene más prioridad, un agente de circulación o un semáforo?', opciones: ['El semáforo', 'El agente', 'Depende de la hora', 'Ninguno, se aplica la prioridad a la derecha'], correcta: 1, explicacion: 'Los agentes de tráfico están siempre en la cima del orden de prioridad, por encima de semáforos y señales.' },
      { pregunta: 'En una rotonda, ¿quién tiene prioridad como norma general?', opciones: ['Quien quiere entrar', 'Quien ya circula dentro', 'Quien viene por la derecha', 'El vehículo más grande'], correcta: 1, explicacion: 'Los vehículos que ya están dentro de la rotonda tienen preferencia sobre los que pretenden incorporarse.' },
      { pregunta: 'En un cruce sin semáforos ni señales, ¿quién pasa primero?', opciones: ['El más rápido', 'El que viene por tu derecha', 'El que viene por tu izquierda', 'El que toque el claxon antes'], correcta: 1, explicacion: 'Sin señalización, se aplica la prioridad a la derecha.' },
      { pregunta: '¿Qué ocurre si un semáforo y una señal vertical se contradicen?', opciones: ['Manda la señal vertical', 'Manda el semáforo', 'Se aplica la más antigua', 'Se aplica la prioridad a la derecha'], correcta: 1, explicacion: 'El semáforo está por delante de la señal vertical en el orden de prioridad.' },
      { pregunta: '¿Debe ceder el paso un vehículo que gira a la izquierda en un cruce con semáforo en verde para ambos sentidos?', opciones: ['No, tiene prioridad por ir primero', 'Sí, debe ceder al tráfico que viene de frente en línea recta', 'Solo si hay peatones', 'Solo de noche'], correcta: 1, explicacion: 'Quien gira debe ceder el paso a los vehículos que circulan de frente y a los peatones que cruzan.' },
      { pregunta: '¿Qué debes hacer si se acerca una ambulancia con la sirena activada?', opciones: ['Ignorarla si tú también tienes prioridad', 'Facilitarle el paso aunque tengas que ceder tu prioridad', 'Acelerar para no molestarla', 'Detenerte en seco donde estés'], correcta: 1, explicacion: 'Un vehículo de emergencia con sirena y luces activadas tiene prioridad absoluta: hay que facilitarle el paso.' }
    ]
  },

  // ============================================================
  // BLOQUE 7 — AUTOPISTAS Y AUTOVÍAS (completo)
  // ============================================================
  {
    id: 'autopistas',
    titulo: 'Autopistas y autovías',
    icono: 'fa-road-circle-check',
    color: 'green',
    resumenCorto: 'Incorporaciones, carriles y normas específicas de vías rápidas.',
    disponible: true,
    ilustracionHeader: { src: 'img/aprendizaje/autopistas-header.webp', alt: 'Bali junto a un coche incorporándose a la autopista por el carril de aceleración' },
    ilustracionSecundaria: { src: 'img/aprendizaje/autopistas-carril.webp', alt: 'Bali señalando el carril izquierdo como carril solo de adelantamiento' },

    pasosVisuales: [
      { icono: 'fa-road', colorClave: 'azul', texto: 'Dos o más carriles por sentido' },
      { icono: 'fa-arrow-right-to-bracket', colorClave: 'naranja', texto: 'Incorpórate por el carril de aceleración' },
      { icono: 'fa-ban', colorClave: 'rojo', texto: 'Carril izquierdo, solo para adelantar' },
      { icono: 'fa-triangle-exclamation', colorClave: 'rojo', texto: 'Arcén, solo en emergencias' },
      { icono: 'fa-gauge-high', colorClave: 'azul', texto: '120 km/h de límite general' }
    ],

    esquema: {
      tipo: 'tabs',
      tabs: [
        {
          id: 'en-la-via', nombre: 'En la vía', color: 'blue',
          descripcion: 'Lo que te vas a encontrar circulando por autopista o autovía.',
          ejemplos: [
            { texto: '120 km/h', archivo: 'senal-velocidad-120.png', porque: 'Límite general para turismos en autopista y autovía' },
            { texto: 'Flecha de carril', archivo: 'senal-flecha-carril.png', porque: 'Marca la dirección obligatoria, típico en incorporaciones y salidas' }
          ]
        },
        {
          id: 'prohibido', nombre: 'Quién no puede entrar', color: 'red',
          descripcion: 'Autopistas y autovías no son para todo tipo de vehículos.',
          ejemplos: [
            { texto: 'Entrada prohibida', archivo: 'senal-entrada-prohibida.png', porque: 'Ciclomotores, bicicletas, peatones y vehículos que no alcancen la velocidad mínima' }
          ]
        }
      ]
    },

    comparativa: {
      titulo: 'Autopista vs autovía: la diferencia real',
      resumenVisual: [
        { icono: 'fa-road', titulo: 'Autopista (AP)', colorClave: 'azul', punto: 'Nunca tiene cruces a nivel; accesos siempre por carril de aceleración/deceleración' },
        { icono: 'fa-road-circle-check', titulo: 'Autovía (A)', colorClave: 'verde', punto: 'Puede tener cruces a nivel y accesos más directos' }
      ],
      columnas: ['Autopista', 'Autovía'],
      filas: [
        { label: '¿Cruces a nivel?', valores: ['Nunca', 'Puede haberlos'] },
        { label: 'Accesos y salidas', valores: ['Siempre separados, con carril de aceleración/deceleración', 'Pueden ser a nivel, sin separación física'] },
        { label: '¿Peaje?', valores: ['Puede ser de pago o gratuita', 'Siempre gratuita'] },
        { label: 'Se identifica como', valores: ['AP + número', 'A + número'] }
      ]
    },

    trucos: [
      { icono: 'fa-arrow-right-to-bracket', colorClave: 'naranja', frase: 'Adáptate antes de incorporarte, no después.', explicacion: 'El carril de aceleración sirve para igualar tu velocidad a la del tráfico, no para colarte a la fuerza.' },
      { icono: 'fa-left-right', colorClave: 'rojo', frase: 'El carril izquierdo no es "el tuyo".', explicacion: 'Se usa para adelantar y se abandona en cuanto puedas volver a tu carril, no para circular de forma permanente.' },
      { icono: 'fa-road', colorClave: 'azul', frase: 'Autopista nunca cruza; autovía, a veces sí.', explicacion: 'La autopista jamás tiene cruces a nivel y sus accesos van siempre por carril de aceleración o deceleración; la autovía puede tener cruces y accesos más directos.' }
    ],

    confusionesTipicas: [
      { pregunta: '¿Es lo mismo autopista que autovía?', respuesta: 'No. Ambas tienen calzadas separadas y dos o más carriles por sentido, pero la autopista nunca tiene cruces a nivel y sus accesos van siempre por carril de aceleración o deceleración; la autovía puede tener cruces a nivel y accesos más directos.' },
      { pregunta: '¿Se puede circular por el arcén?', respuesta: 'No, salvo avería, emergencia o que un agente lo indique. Tampoco se puede parar ni estacionar en él salvo causa justificada.' },
      { pregunta: '¿Puede circular una bicicleta o un ciclomotor por autopista?', respuesta: 'No. Autopistas y autovías están prohibidas para bicicletas, ciclomotores, peatones y cualquier vehículo que no pueda alcanzar la velocidad mínima exigida en esa vía.' }
    ],

    quiz: [
      { pregunta: '¿Cuál es el límite general de velocidad en autopista para un turismo?', opciones: ['100 km/h', '110 km/h', '120 km/h', '130 km/h'], correcta: 2, explicacion: 'El límite general en autopista y autovía para turismos es 120 km/h.' },
      { pregunta: '¿Qué diferencia principal hay entre autopista y autovía?', opciones: ['La autovía nunca tiene curvas', 'La autopista puede tener cruces a nivel', 'La autopista nunca tiene cruces a nivel, la autovía sí puede tenerlos', 'No hay ninguna diferencia'], correcta: 2, explicacion: 'La autopista siempre carece de cruces a nivel; la autovía puede tenerlos.' },
      { pregunta: '¿Para qué sirve el carril de aceleración?', opciones: ['Para adelantar', 'Para igualar tu velocidad a la del tráfico antes de incorporarte', 'Para estacionar brevemente', 'Para dar la vuelta'], correcta: 1, explicacion: 'Permite ganar velocidad para incorporarte al tráfico ya circulando, sin frenarlo.' },
      { pregunta: '¿Cuándo se puede circular por el arcén?', opciones: ['Siempre que haya tráfico denso', 'Solo en caso de avería, emergencia o indicación de un agente', 'Para adelantar por la derecha', 'Nunca, bajo ningún concepto'], correcta: 1, explicacion: 'El arcén no es un carril de circulación: solo se usa en averías, emergencias o cuando lo indique un agente.' },
      { pregunta: '¿Puede circular un ciclomotor por autopista?', opciones: ['Sí, si va por el arcén', 'No, está prohibido', 'Sí, solo de día', 'Sí, si no supera los 45 km/h'], correcta: 1, explicacion: 'Autopistas y autovías están prohibidas para ciclomotores, bicicletas y peatones.' },
      { pregunta: '¿Qué carril debes usar para circular con normalidad, sin adelantar?', opciones: ['El izquierdo', 'El de la derecha', 'Cualquiera indistintamente', 'El carril de aceleración'], correcta: 1, explicacion: 'Como norma general se circula por el carril de la derecha; el izquierdo es para adelantar y volver enseguida.' }
    ]
  },

  // ============================================================
  // BLOQUE 8 — ALCOHOL, DROGAS Y FATIGA (completo)
  // ============================================================
  {
    id: 'alcohol-drogas-fatiga',
    titulo: 'Alcohol, drogas y fatiga',
    icono: 'fa-wine-bottle',
    color: 'red',
    resumenCorto: 'Tasas máximas y por qué te la juegas más de lo que crees.',
    disponible: true,
    ilustracionHeader: { src: 'img/aprendizaje/alcohol-drogas-header.webp', alt: 'Bali mostrando un etilómetro junto a un coche, con la tasa máxima permitida' },
    ilustracionSecundaria: { src: 'img/aprendizaje/alcohol-drogas-fatiga.webp', alt: 'Bali bostezando al volante, recordando parar a descansar cada 2 horas' },

    pasosVisuales: [
      { icono: 'fa-wine-bottle', colorClave: 'rojo', texto: 'El alcohol reduce reflejos desde la primera copa' },
      { icono: 'fa-cannabis', colorClave: 'rojo', texto: 'Drogas: tolerancia cero, sin mínimos' },
      { icono: 'fa-bed', colorClave: 'azul', texto: 'La fatiga multiplica tu tiempo de reacción' },
      { icono: 'fa-hourglass-half', colorClave: 'naranja', texto: 'Para cada 2 horas o 200 km' },
      { icono: 'fa-gavel', colorClave: 'rojo', texto: 'Negarte al control es delito, no infracción' }
    ],

    esquema: {
      tipo: 'visual-iconos',
      items: [
        { icono: 'fa-wine-bottle', colorClave: 'rojo', titulo: 'Alcohol', texto: '0,25 mg/l en aire para conductores generales' },
        { icono: 'fa-user-graduate', colorClave: 'naranja', titulo: 'Novel o profesional', texto: '0,15 mg/l en aire, la mitad que el resto' },
        { icono: 'fa-cannabis', colorClave: 'rojo', titulo: 'Drogas', texto: 'Tolerancia cero: cualquier presencia detectada es infracción' },
        { icono: 'fa-bed', colorClave: 'azul', titulo: 'Fatiga', texto: 'Para cada 2 horas o 200 km, aunque no tengas sueño' }
      ]
    },

    comparativa: {
      titulo: 'Dar positivo vs negarte a la prueba',
      resumenVisual: [
        { icono: 'fa-flask', titulo: 'Dar positivo', colorClave: 'naranja', punto: 'Infracción administrativa (delito si la tasa es muy alta)' },
        { icono: 'fa-hand', titulo: 'Negarte a la prueba', colorClave: 'rojo', punto: 'Delito siempre, aunque no hayas bebido' }
      ],
      columnas: ['Dar positivo en alcohol o drogas', 'Negarte a la prueba'],
      filas: [
        { label: '¿Qué es?', valores: ['Infracción muy grave (delito si la tasa es muy alta)', 'Delito penal, sin excepciones'] },
        { label: 'Multa', valores: ['500€-1.000€ y retirada de puntos', 'Sin multa administrativa: pena de prisión'] },
        { label: 'Carnet', valores: ['Retirada de 4 a 6 puntos', 'Pérdida del permiso de 1 a 4 años'] }
      ]
    },

    trucos: [
      { icono: 'fa-wine-bottle', colorClave: 'rojo', frase: 'No hay "una cañita" segura.', explicacion: 'El alcohol afecta a los reflejos desde la primera copa, aunque no llegues a superar la tasa máxima.' },
      { icono: 'fa-cannabis', colorClave: 'rojo', frase: 'Con drogas, cero es cero.', explicacion: 'A diferencia del alcohol, no existe una tasa mínima permitida: cualquier resto detectado en saliva ya es infracción.' },
      { icono: 'fa-hourglass-half', colorClave: 'azul', frase: '2 horas o 200 km, lo que llegue antes.', explicacion: 'Es la recomendación oficial para parar a descansar, aunque todavía no notes sueño.' }
    ],

    confusionesTipicas: [
      { pregunta: '¿Cuál es la tasa máxima de alcohol para un conductor novel?', respuesta: '0,15 mg/l en aire espirado (0,3 g/l en sangre), la mitad que el límite general de 0,25 mg/l. Se considera novel a quien lleva menos de 2 años de carnet, y la misma tasa reducida aplica a los conductores profesionales.' },
      { pregunta: '¿Es peor negarte a la prueba que dar positivo?', respuesta: 'Sí. Negarte a hacer el control de alcoholemia o drogas es un delito por sí mismo, independientemente del resultado que hubieras dado, con penas más graves que las de dar positivo.' },
      { pregunta: '¿La fatiga tiene una "tasa" como el alcohol?', respuesta: 'No, pero está detrás de entre el 20% y el 30% de los accidentes. La recomendación oficial es parar cada 2 horas o 200 km, y descansar 20-30 minutos.' }
    ],

    quiz: [
      { pregunta: '¿Cuál es la tasa máxima de alcohol en aire espirado para un conductor general?', opciones: ['0,15 mg/l', '0,25 mg/l', '0,50 mg/l', '0,80 mg/l'], correcta: 1, explicacion: 'El límite general es 0,25 mg/l en aire espirado (0,5 g/l en sangre).' },
      { pregunta: '¿A quién se considera conductor novel a efectos de alcoholemia?', opciones: ['A quien tiene menos de 25 años', 'A quien lleva menos de 2 años de carnet', 'A quien conduce menos de 5.000 km al año', 'No existe esa categoría'], correcta: 1, explicacion: 'Se considera novel a quien lleva menos de dos años con el permiso, y tiene una tasa máxima reducida.' },
      { pregunta: '¿Cuál es la tolerancia con las drogas al volante?', opciones: ['Igual que con el alcohol', 'Cero: cualquier presencia detectada es infracción', 'Depende de la sustancia', 'Solo se sanciona si afecta a la conducción'], correcta: 1, explicacion: 'A diferencia del alcohol, no hay tasa mínima permitida para drogas: la mera presencia ya es infracción.' },
      { pregunta: '¿Qué es más grave, dar positivo o negarte a la prueba?', opciones: ['Dar positivo', 'Negarte a la prueba', 'Son iguales', 'Negarte no tiene consecuencias'], correcta: 1, explicacion: 'Negarte a la prueba es siempre un delito penal, con penas más duras que dar positivo.' },
      { pregunta: '¿Cada cuánto recomienda la DGT parar a descansar en un viaje largo?', opciones: ['Cada hora', 'Cada 2 horas o 200 km', 'Cada 5 horas', 'Solo si hay atasco'], correcta: 1, explicacion: 'La recomendación oficial es parar cada 2 horas o cada 200-300 km, descansando 20-30 minutos.' },
      { pregunta: '¿Qué porcentaje aproximado de accidentes se relaciona con la fatiga?', opciones: ['Menos del 5%', 'Entre el 20% y el 30%', 'Más del 70%', 'No hay relación'], correcta: 1, explicacion: 'Se estima que entre el 20% y el 30% de los accidentes de tráfico están relacionados con la fatiga.' }
    ]
  },

  // ============================================================
  // BLOQUE 9 — EL VEHÍCULO: MANTENIMIENTO Y ELEMENTOS DE SEGURIDAD (completo)
  // ============================================================
  {
    id: 'vehiculo-mantenimiento',
    titulo: 'El vehículo: mantenimiento y elementos de seguridad',
    icono: 'fa-car-side',
    color: 'orange',
    resumenCorto: 'Lo mínimo que debes revisar antes de coger el coche.',
    disponible: true,
    ilustracionHeader: { src: 'img/aprendizaje/vehiculo-header.webp', alt: 'Bali revisando las ruedas y las luces de un coche antes de salir' },
    ilustracionSecundaria: { src: 'img/aprendizaje/vehiculo-v16.webp', alt: 'Bali colocando la baliza V16 conectada en el techo de un coche averiado' },

    pasosVisuales: [
      { icono: 'fa-gauge', colorClave: 'naranja', texto: 'Neumáticos: mínimo 1,6 mm de dibujo' },
      { icono: 'fa-lightbulb', colorClave: 'azul', texto: 'Luces siempre en buen estado' },
      { icono: 'fa-droplet', colorClave: 'verde', texto: 'Revisa niveles antes de salir' },
      { icono: 'fa-satellite-dish', colorClave: 'rojo', texto: 'Baliza V16, obligatoria desde 2026' },
      { icono: 'fa-calendar-check', colorClave: 'azul', texto: 'ITV al día, según la antigüedad' }
    ],

    esquema: {
      tipo: 'visual-iconos',
      items: [
        { icono: 'fa-gauge', colorClave: 'naranja', titulo: 'Neumáticos', texto: 'Mínimo 1,6 mm de dibujo (4 mm en invierno), sin grietas ni bultos' },
        { icono: 'fa-satellite-dish', colorClave: 'rojo', titulo: 'Baliza V16', texto: 'Sustituye a los triángulos desde 2026, se coloca en el techo' },
        { icono: 'fa-droplet', colorClave: 'azul', titulo: 'Niveles', texto: 'Aceite, refrigerante, líquido de frenos y limpiaparabrisas' },
        { icono: 'fa-clipboard-check', colorClave: 'verde', titulo: 'ITV', texto: 'Primera a los 4 años, luego cada 2, y cada año a partir de los 10' }
      ]
    },

    comparativa: {
      titulo: 'Baliza V16 vs triángulos de preseñalización',
      resumenVisual: [
        { icono: 'fa-satellite-dish', titulo: 'Baliza V16 conectada', colorClave: 'naranja', punto: 'Obligatoria desde el 1 de enero de 2026' },
        { icono: 'fa-shapes', titulo: 'Triángulos', colorClave: 'azul', punto: 'Ya no son obligatorios, pero se pueden seguir usando' }
      ],
      columnas: ['Baliza V16 conectada', 'Triángulos'],
      filas: [
        { label: '¿Es obligatoria?', valores: ['Sí, desde el 1 de enero de 2026', 'No, desde que la V16 es obligatoria'] },
        { label: '¿Dónde se coloca?', valores: ['En el techo del vehículo', 'En la calzada, delante y detrás'] },
        { label: '¿Hay que bajarse a la calzada?', valores: ['No, se activa sin salir a la vía', 'Sí, hay que caminar por la calzada para colocarlos'] },
        { label: '¿Se pueden usar juntos?', valores: ['Sí, no supone sanción', 'Sí, no supone sanción'] }
      ]
    },

    trucos: [
      { icono: 'fa-gauge', colorClave: 'naranja', frase: 'La moneda de 1 euro no miente.', explicacion: 'Si al meterla en la ranura del neumático se ve el borde dorado, el dibujo ya está por debajo del mínimo legal de 1,6 mm.' },
      { icono: 'fa-satellite-dish', colorClave: 'rojo', frase: 'La V16 se enciende sin bajarte del coche.', explicacion: 'A diferencia de los triángulos, no hace falta caminar por la calzada para colocarla: se activa y se pone en el techo.' },
      { icono: 'fa-calendar-check', colorClave: 'azul', frase: '4, luego cada 2, luego cada año.', explicacion: 'Así de simple es la periodicidad de la ITV para un turismo: primera inspección a los 4 años, cada 2 años hasta los 10, y cada año a partir de ahí.' }
    ],

    confusionesTipicas: [
      { pregunta: '¿Los triángulos de preseñalización están prohibidos ahora?', respuesta: 'No están prohibidos. Ya no son obligatorios porque la baliza V16 conectada los ha sustituido, pero se pueden seguir usando junto a ella sin sanción.' },
      { pregunta: '¿Cuál es la profundidad mínima legal de un neumático?', respuesta: '1,6 mm de dibujo en toda la banda de rodadura. Para neumáticos de invierno, el mínimo recomendado es de 4 mm.' },
      { pregunta: '¿Cada cuánto hay que pasar la ITV en un coche normal?', respuesta: 'La primera inspección es a los 4 años de matriculación. Después, cada 2 años hasta los 10 años de antigüedad, y a partir de ahí, cada año.' }
    ],

    quiz: [
      { pregunta: '¿Desde cuándo es obligatoria la baliza V16 conectada?', opciones: ['Desde 2021', 'Desde el 1 de enero de 2026', 'Desde 2030', 'Nunca ha sido obligatoria'], correcta: 1, explicacion: 'La baliza V16 conectada es obligatoria como dispositivo de preseñalización desde el 1 de enero de 2026.' },
      { pregunta: '¿Dónde se coloca la baliza V16 en caso de avería?', opciones: ['En la calzada, delante del coche', 'En el techo del vehículo', 'En el maletero', 'En el parabrisas'], correcta: 1, explicacion: 'A diferencia de los triángulos, la V16 se coloca en el techo del vehículo, sin necesidad de bajarse a la calzada.' },
      { pregunta: '¿Cuál es la profundidad mínima legal del dibujo de un neumático?', opciones: ['1 mm', '1,6 mm', '3 mm', '5 mm'], correcta: 1, explicacion: '1,6 mm es el mínimo legal exigido en toda la banda de rodadura.' },
      { pregunta: '¿Cuándo pasa un turismo su primera ITV?', opciones: ['Al matricularlo', 'A los 2 años', 'A los 4 años', 'A los 10 años'], correcta: 2, explicacion: 'Un turismo pasa su primera inspección técnica a los 4 años de su matriculación.' },
      { pregunta: '¿Se pueden usar triángulos junto a la baliza V16?', opciones: ['No, está prohibido', 'Sí, no supone sanción', 'Solo de noche', 'Solo en autopista'], correcta: 1, explicacion: 'La DGT ha aclarado que usar triángulos además de la V16 no se sanciona.' },
      { pregunta: '¿Cada cuánto hay que pasar la ITV en un turismo de más de 10 años?', opciones: ['Cada 6 meses', 'Cada año', 'Cada 2 años', 'Cada 5 años'], correcta: 1, explicacion: 'A partir de los 10 años de antigüedad, la ITV pasa a ser anual.' }
    ]
  },

  // ============================================================
  // BLOQUE 10 — ACCIDENTES: ACTUACIÓN Y PRIMEROS AUXILIOS (completo)
  // ============================================================
  {
    id: 'accidentes-primeros-auxilios',
    titulo: 'Accidentes: actuación y primeros auxilios',
    icono: 'fa-kit-medical',
    color: 'red',
    resumenCorto: 'Proteger, avisar y socorrer, en ese orden.',
    disponible: true,
    ilustracionHeader: { src: 'img/aprendizaje/accidentes-header.webp', alt: 'Bali con chaleco reflectante señalizando la zona de un accidente antes de llamar al 112' },
    ilustracionSecundaria: { src: 'img/aprendizaje/accidentes-pls.webp', alt: 'Bali colocando a un herido inconsciente en posición lateral de seguridad' },

    pasosVisuales: [
      { icono: 'fa-shield-halved', colorClave: 'azul', texto: 'Proteger: la zona y a ti mismo' },
      { icono: 'fa-phone-volume', colorClave: 'rojo', texto: 'Avisar: llama al 112' },
      { icono: 'fa-hand-holding-medical', colorClave: 'verde', texto: 'Socorrer: solo si sabes cómo' },
      { icono: 'fa-ban', colorClave: 'rojo', texto: 'No muevas al herido sin motivo' },
      { icono: 'fa-vest', colorClave: 'naranja', texto: 'Chaleco puesto antes de bajar del coche' }
    ],

    esquema: {
      tipo: 'visual-iconos',
      items: [
        { icono: 'fa-shield-halved', colorClave: 'azul', titulo: '1. Proteger', texto: 'Señaliza con la V16, ponte el chaleco antes de bajar y aléjate de la calzada' },
        { icono: 'fa-phone-volume', colorClave: 'naranja', titulo: '2. Avisar', texto: 'Llama al 112: di el lugar exacto, cuántos heridos y su estado' },
        { icono: 'fa-hand-holding-medical', colorClave: 'verde', titulo: '3. Socorrer', texto: 'Ayuda solo dentro de lo que sepas hacer, hasta que lleguen los profesionales' }
      ]
    },

    comparativa: {
      titulo: '¿Se puede mover a un herido?',
      resumenVisual: [
        { icono: 'fa-ban', titulo: 'Norma general', colorClave: 'rojo', punto: 'No se mueve, salvo riesgo de incendio o explosión' },
        { icono: 'fa-user-injured', titulo: 'Inconsciente que respira', colorClave: 'verde', punto: 'Se coloca en posición lateral de seguridad' }
      ],
      columnas: ['Norma general', 'Inconsciente pero respira'],
      filas: [
        { label: '¿Se mueve?', valores: ['No, salvo peligro inminente (fuego, explosión)', 'Sí, se le coloca en posición lateral de seguridad'] },
        { label: '¿Por qué?', valores: ['Moverlo mal puede agravar una lesión, sobre todo en la columna', 'Evita que se ahogue con vómitos o con la propia lengua'] },
        { label: '¿Y el casco de un motorista?', valores: ['No se retira, salvo que le impida respirar', 'Si hay que quitarlo, entre 2 personas como mínimo'] }
      ]
    },

    trucos: [
      { icono: 'fa-list-ol', colorClave: 'azul', frase: 'PAS: Proteger, Avisar, Socorrer. Siempre en ese orden.', explicacion: 'Nunca lo inviertas: de nada sirve socorrer si tú mismo te conviertes en la siguiente víctima.' },
      { icono: 'fa-vest', colorClave: 'naranja', frase: 'El chaleco, antes de abrir la puerta.', explicacion: 'Te lo pones dentro del coche, antes de bajarte, no después de estar ya en la calzada.' },
      { icono: 'fa-user-injured', colorClave: 'rojo', frase: 'Si respira e inconsciente, de lado.', explicacion: 'La posición lateral de seguridad evita que se ahogue con sus propios vómitos o con la lengua.' }
    ],

    confusionesTipicas: [
      { pregunta: '¿Hay que socorrer antes de avisar a emergencias?', respuesta: 'No. El orden del protocolo PAS es siempre Proteger, luego Avisar (llamar al 112) y solo después Socorrer. Invertirlo puede retrasar la llegada de ayuda profesional.' },
      { pregunta: '¿Se le puede quitar el casco a un motorista accidentado?', respuesta: 'Como norma general, no. Solo se retira si le impide respirar con normalidad, y en ese caso hacen falta al menos 2 personas para hacerlo sin agravar una posible lesión cervical.' },
      { pregunta: '¿Qué información hay que dar al llamar al 112?', respuesta: 'El lugar exacto del accidente, el número aproximado de heridos y su estado, y el tipo de siniestro. Cuanto más precisa sea la información, antes llega la ayuda adecuada.' }
    ],

    quiz: [
      { pregunta: '¿Cuál es el orden correcto del protocolo PAS?', opciones: ['Avisar, Proteger, Socorrer', 'Proteger, Avisar, Socorrer', 'Socorrer, Avisar, Proteger', 'Proteger, Socorrer, Avisar'], correcta: 1, explicacion: 'El orden es siempre Proteger, Avisar y Socorrer, y nunca debe invertirse.' },
      { pregunta: '¿Cuándo se debe mover a un herido en un accidente?', opciones: ['Siempre, para que esté más cómodo', 'Nunca, salvo riesgo inminente de incendio o explosión', 'Solo si tiene mucho dolor', 'Solo si lo pide él mismo'], correcta: 1, explicacion: 'Como norma general no se mueve a los heridos, salvo peligro inminente, para no agravar posibles lesiones.' },
      { pregunta: '¿En qué posición se coloca a un herido inconsciente que respira con normalidad?', opciones: ['Boca arriba con las piernas elevadas', 'Posición lateral de seguridad', 'Sentado', 'Boca abajo'], correcta: 1, explicacion: 'La posición lateral de seguridad evita que se ahogue con vómitos o con la lengua.' },
      { pregunta: '¿Se debe quitar el casco a un motorista accidentado?', opciones: ['Sí, siempre, para verle mejor', 'No, salvo que le impida respirar', 'Solo si está consciente', 'Solo de noche'], correcta: 1, explicacion: 'El casco no se retira salvo que dificulte la respiración, y en ese caso hacen falta al menos 2 personas.' },
      { pregunta: '¿Cuándo debes ponerte el chaleco reflectante?', opciones: ['Después de bajar del coche', 'Antes de bajar del coche', 'Solo si hay poca luz', 'No es necesario si hay otros coches parados'], correcta: 1, explicacion: 'El chaleco se pone dentro del vehículo, antes de salir a la calzada, para ser visible desde el primer momento.' },
      { pregunta: '¿Qué número de teléfono se usa para avisar de un accidente?', opciones: ['091', '112', '061', '080'], correcta: 1, explicacion: 'El 112 es el número único de emergencias en España y en toda la Unión Europea.' }
    ]
  },

  // ============================================================
  // BLOQUE 11 — SANCIONES Y PUNTOS DEL CARNET (completo)
  // ============================================================
  {
    id: 'sanciones-puntos',
    titulo: 'Sanciones y puntos del carnet',
    icono: 'fa-scale-balanced',
    color: 'purple',
    resumenCorto: 'Cómo funciona el sistema de puntos y qué te los quita.',
    disponible: true,
    ilustracionHeader: { src: 'img/aprendizaje/sanciones-header.webp', alt: 'Bali junto a un carnet de conducir mostrando el saldo de puntos' },
    ilustracionSecundaria: { src: 'img/aprendizaje/sanciones-recuperar.webp', alt: 'Bali con un birrete de graduado señalando el curso para recuperar puntos' },

    pasosVisuales: [
      { icono: 'fa-id-card', colorClave: 'azul', texto: 'General: empiezas con 12 puntos' },
      { icono: 'fa-user-graduate', colorClave: 'naranja', texto: 'Novel: empiezas con 8' },
      { icono: 'fa-mobile-screen', colorClave: 'rojo', texto: 'El móvil es lo que más puntos quita: 6' },
      { icono: 'fa-ban', colorClave: 'rojo', texto: 'Con 0 puntos, pierdes el carnet' },
      { icono: 'fa-graduation-cap', colorClave: 'verde', texto: 'Un curso te devuelve hasta 6 puntos' }
    ],

    esquema: {
      tipo: 'visual-iconos',
      items: [
        { icono: 'fa-id-card', colorClave: 'azul', titulo: 'Puntos de salida', texto: '12 para el resto de conductores, 8 para noveles (menos de 3 años)' },
        { icono: 'fa-mobile-screen', colorClave: 'rojo', titulo: 'Móvil al volante', texto: '6 puntos y 200€, la infracción que más puntos quita' },
        { icono: 'fa-user-shield', colorClave: 'naranja', titulo: 'Cinturón', texto: '4 puntos, una de las infracciones más frecuentes' },
        { icono: 'fa-gauge-high', colorClave: 'verde', titulo: 'Exceso de velocidad', texto: 'Entre 2 y 6 puntos, según cuánto te pases del límite' }
      ]
    },

    comparativa: {
      titulo: 'Recuperar puntos: 2 caminos muy distintos',
      resumenVisual: [
        { icono: 'fa-graduation-cap', titulo: 'Curso voluntario', colorClave: 'verde', punto: 'Lo haces tú, antes de quedarte a 0' },
        { icono: 'fa-ban', titulo: 'Perder el carnet', colorClave: 'rojo', punto: 'Ocurre automáticamente al llegar a 0 puntos' }
      ],
      columnas: ['Curso voluntario', 'Perder todos los puntos'],
      filas: [
        { label: '¿Cuándo se hace?', valores: ['Cuando quieras, antes de perder el carnet', 'Obligatorio, después de quedarte a 0'] },
        { label: 'Puntos que recuperas', valores: ['Hasta 6 puntos', '8 puntos, tras superar el curso y el examen'] },
        { label: '¿Puedes conducir mientras tanto?', valores: ['Sí, no pierdes el carnet', 'No, el permiso pierde su vigencia'] },
        { label: 'Otro requisito', valores: ['Ninguno adicional', 'Esperar 6 meses (3 si eres profesional) y aprobar de nuevo el examen teórico'] }
      ]
    },

    trucos: [
      { icono: 'fa-user-graduate', colorClave: 'naranja', frase: 'De novel a 12, en 2 años sin nada.', explicacion: 'Si empiezas con 8 puntos y pasas 2 años sin infracciones, subes automáticamente a 12.' },
      { icono: 'fa-mobile-screen', colorClave: 'rojo', frase: 'El móvil es el que más caro sale.', explicacion: 'Coger el móvil conduciendo quita 6 puntos, más que casi cualquier otra infracción habitual.' },
      { icono: 'fa-graduation-cap', colorClave: 'verde', frase: 'No esperes a llegar a 0.', explicacion: 'El curso voluntario de sensibilización te devuelve hasta 6 puntos sin tener que perder el carnet ni volver a examinarte.' }
    ],

    confusionesTipicas: [
      { pregunta: '¿Todos los conductores empiezan con los mismos puntos?', respuesta: 'No. Los conductores generales empiezan con 12 puntos; los noveles (menos de 3 años de carnet) empiezan con 8, y suben a 12 si pasan 2 años sin infracciones.' },
      { pregunta: '¿Qué pasa si llego a 0 puntos?', respuesta: 'El permiso pierde su vigencia: no puedes conducir. Para recuperarlo hay que esperar 6 meses (3 si eres profesional), hacer un curso de reeducación vial de 20 horas y aprobar de nuevo el examen teórico.' },
      { pregunta: '¿El curso de sensibilización solo sirve si te quedas sin puntos?', respuesta: 'No. También puedes hacerlo de forma voluntaria antes de perder el carnet, para recuperar hasta 6 puntos sin necesidad de quedarte a 0 ni de volver a examinarte.' }
    ],

    quiz: [
      { pregunta: '¿Con cuántos puntos empieza un conductor novel?', opciones: ['4', '8', '10', '12'], correcta: 1, explicacion: 'Los conductores noveles (menos de 3 años de carnet) empiezan con 8 puntos, hasta 12 si pasan 2 años sin infracciones.' },
      { pregunta: '¿Cuántos puntos quita usar el móvil conduciendo?', opciones: ['2', '4', '6', '8'], correcta: 2, explicacion: 'El uso del móvil al volante quita 6 puntos, además de 200€ de multa.' },
      { pregunta: '¿Cuántos puntos quita no llevar puesto el cinturón?', opciones: ['2', '4', '6', 'Ninguno, solo es multa'], correcta: 1, explicacion: 'No llevar el cinturón de seguridad quita 4 puntos.' },
      { pregunta: '¿Qué ocurre al llegar a 0 puntos?', opciones: ['Nada, se reinician automáticamente', 'El permiso pierde su vigencia', 'Solo te avisan por carta', 'Pierdes 2 puntos más'], correcta: 1, explicacion: 'Con 0 puntos, el permiso de conducir pierde su vigencia y no puedes conducir.' },
      { pregunta: '¿Cuántos puntos recuperas al superar el curso obligatorio tras perder el carnet?', opciones: ['4', '6', '8', '12'], correcta: 2, explicacion: 'Tras superar el curso de reeducación vial y el examen teórico, se recuperan 8 puntos.' },
      { pregunta: '¿Se puede hacer el curso de sensibilización sin haber perdido el carnet?', opciones: ['No, solo tras perder todos los puntos', 'Sí, de forma voluntaria, para recuperar hasta 6 puntos', 'Solo lo pueden hacer los noveles', 'Solo una vez en la vida'], correcta: 1, explicacion: 'El curso voluntario se puede hacer antes de quedarte a 0, y devuelve hasta 6 puntos.' }
    ]
  },

  // ============================================================
  // BLOQUE 12 — CASOS ESPECIALES: CICLISTAS, PEATONES, ANIMALES Y METEOROLOGÍA (completo)
  // ============================================================
  {
    id: 'casos-especiales',
    titulo: 'Casos especiales: ciclistas, peatones, animales y meteorología',
    icono: 'fa-cloud-sun-rain',
    color: 'blue',
    resumenCorto: 'Las situaciones que no siguen la norma "de manual".',
    disponible: true,
    ilustracionHeader: { src: 'img/aprendizaje/casos-especiales-header.webp', alt: 'Bali junto a un ciclista, un peatón y un perro cruzando una carretera con niebla' },
    ilustracionSecundaria: { src: 'img/aprendizaje/casos-especiales-peaton.webp', alt: 'Bali junto a un peatón caminando por la izquierda de una carretera sin acera' },

    pasosVisuales: [
      { icono: 'fa-bicycle', colorClave: 'verde', texto: 'Ciclistas: máximo 2 en paralelo' },
      { icono: 'fa-person-walking', colorClave: 'azul', texto: 'Peatones sin acera: por la izquierda' },
      { icono: 'fa-paw', colorClave: 'naranja', texto: 'Animal atropellado: aparta el coche y avisa' },
      { icono: 'fa-cloud', colorClave: 'azul', texto: 'Antiniebla, solo con niebla o lluvia intensa' },
      { icono: 'fa-shield-dog', colorClave: 'rojo', texto: 'Mascotas, siempre sujetas' }
    ],

    esquema: {
      tipo: 'tabs',
      tabs: [
        {
          id: 'peatones', nombre: 'Peatones', color: 'blue',
          descripcion: 'Dónde y cómo tienen prioridad al cruzar.',
          ejemplos: [
            { texto: 'Paso de peatones', archivo: 'senal-paso-peatones.png', porque: 'Prioridad de paso, reduce la velocidad al acercarte' },
            { texto: 'Paso pintado', archivo: 'senal-paso-peatones-horizontal.png', porque: 'Mismo significado, marcado en el asfalto' }
          ]
        },
        {
          id: 'ciclistas', nombre: 'Ciclistas', color: 'green',
          descripcion: 'Espacios y cruces reservados para bicicletas.',
          ejemplos: [
            { texto: 'Paso de ciclistas', archivo: 'senal-paso-ciclistas.png', porque: 'Puede cruzar la vía en cualquier momento' },
            { texto: 'Carril obligatorio', archivo: 'senal-paso-obligatorio-ciclistas.png', porque: 'Espacio reservado, no lo invadas' }
          ]
        },
        {
          id: 'meteorologia', nombre: 'Meteorología', color: 'orange',
          descripcion: 'Cuándo la vía o el tiempo cambian las reglas normales.',
          ejemplos: [
            { texto: 'Luces antiniebla', archivo: 'senal-luces-antiniebla.png', porque: 'Solo con niebla densa, lluvia intensa o nieve' },
            { texto: 'Pavimento deslizante', archivo: 'senal-pavimento-deslizante.png', porque: 'Reduce la velocidad y aumenta la distancia' }
          ]
        }
      ]
    },

    comparativa: {
      titulo: 'Ciclistas en grupo: en paralelo vs en hilera',
      resumenVisual: [
        { icono: 'fa-user-group', titulo: 'En paralelo', colorClave: 'verde', punto: 'Máximo 2 en fila, con buena visibilidad' },
        { icono: 'fa-users-line', titulo: 'En hilera', colorClave: 'naranja', punto: 'Uno detrás de otro, en curvas o poca visibilidad' }
      ],
      columnas: ['En paralelo (máx. 2)', 'En hilera (uno detrás de otro)'],
      filas: [
        { label: '¿Cuándo se permite?', valores: ['En tramos con buena visibilidad', 'En curvas, poca visibilidad o si se forma retención'] },
        { label: '¿Cuántos carriles ocupan?', valores: ['Como máximo 2', 'Solo 1'] },
        { label: '¿Dónde se colocan?', valores: ['Orillados a la derecha', 'Orillados a la derecha'] }
      ]
    },

    trucos: [
      { icono: 'fa-bicycle', colorClave: 'verde', frase: 'De dos en dos, si se ve bien.', explicacion: 'Los ciclistas pueden ir en paralelo, máximo 2, pero deben ponerse en hilera en curvas o si hay poca visibilidad.' },
      { icono: 'fa-paw', colorClave: 'naranja', frase: 'Si atropellas un animal, la culpa empieza siendo tuya.', explicacion: 'Desde 2014, la responsabilidad recae por defecto en el conductor: eres tú quien tiene que demostrar que no pudiste evitarlo.' },
      { icono: 'fa-cloud', colorClave: 'azul', frase: 'La antiniebla trasera no es para presumir.', explicacion: 'Solo se usa con niebla densa, lluvia intensa o nieve; encenderla sin motivo deslumbra a quien va detrás.' }
    ],

    confusionesTipicas: [
      { pregunta: '¿Por qué lado debe caminar un peatón por una carretera sin acera?', respuesta: 'Fuera de poblado, por la izquierda, según el sentido de la marcha, para poder ver de frente a los vehículos que se acercan. Si hay arcén transitable, debe usarlo.' },
      { pregunta: '¿Qué hay que hacer si atropellas a un animal?', respuesta: 'Apartar el vehículo de la calzada si puede moverse (no hacerlo puede suponer una multa de hasta 200€), y avisar a los servicios correspondientes o a un veterinario si el animal sigue con vida.' },
      { pregunta: '¿Se puede llevar a la mascota suelta en el coche?', respuesta: 'No. Debe ir sujeta con un sistema de retención o separador, para que no interfiera en la conducción ni suponga un peligro en caso de frenazo o accidente.' }
    ],

    quiz: [
      { pregunta: '¿Cuántos ciclistas pueden circular en paralelo como máximo?', opciones: ['1', '2', '3', 'Sin límite'], correcta: 1, explicacion: 'Los ciclistas pueden circular en paralelo, ocupando un máximo de 2.' },
      { pregunta: '¿Cuándo deben ir los ciclistas en hilera en vez de en paralelo?', opciones: ['Siempre', 'En curvas o tramos de poca visibilidad', 'Solo de noche', 'Nunca, siempre van en paralelo'], correcta: 1, explicacion: 'En curvas, poca visibilidad o si se forma una aglomeración de tráfico, deben ponerse en hilera.' },
      { pregunta: 'Fuera de poblado y sin acera, ¿por qué lado debe circular un peatón?', opciones: ['Por la derecha', 'Por la izquierda', 'Por donde quiera', 'Por el centro de la vía'], correcta: 1, explicacion: 'Por la izquierda, para ver de frente a los vehículos que se acercan.' },
      { pregunta: '¿Quién asume la responsabilidad si atropellas a un animal en la carretera?', opciones: ['Siempre el dueño del animal', 'El conductor, salvo que demuestre que no pudo evitarlo', 'Nadie, no hay responsabilidad', 'El seguro del animal'], correcta: 1, explicacion: 'Desde la reforma de 2014, la responsabilidad recae por defecto en el conductor.' },
      { pregunta: '¿Cuándo se debe usar la luz antiniebla trasera?', opciones: ['Siempre de noche', 'Solo con niebla densa, lluvia intensa o nieve', 'Cuando quieras, no tiene restricciones', 'Nunca, es decorativa'], correcta: 1, explicacion: 'Solo debe usarse cuando la visibilidad se reduce considerablemente por niebla, lluvia intensa o nieve.' },
      { pregunta: '¿Puede una mascota ir suelta dentro del coche?', opciones: ['Sí, sin problema', 'No, debe ir sujeta con un sistema de retención', 'Solo en el maletero, sin sujeción', 'Solo si es pequeña'], correcta: 1, explicacion: 'Debe ir sujeta con un separador o sistema de retención para no distraer ni poner en riesgo al conductor.' }
    ]
  }
];

if (typeof window !== 'undefined') window.APRENDIZAJE_BLOQUES = APRENDIZAJE_BLOQUES;
if (typeof module !== 'undefined' && module.exports) module.exports = APRENDIZAJE_BLOQUES;
