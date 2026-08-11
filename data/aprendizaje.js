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

window.APRENDIZAJE_BLOQUES = [

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
    ilustracionHeader: { src: 'img/aprendizaje/policia-senales-header.png', alt: 'Bali vestido de policía de tráfico indicando el alto en un cruce' },
    ilustracionSecundaria: { src: 'img/aprendizaje/policia-senales-circulos.png', alt: 'Bali entre una señal de prohibición y una de obligación' },

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
    ilustracionHeader: { src: 'img/aprendizaje/bali-distancia-header.png', alt: 'Bali observando la distancia entre dos coches en carretera' },
    ilustracionSecundaria: { src: 'img/aprendizaje/bali-frenada-flashcard.png', alt: 'Bali junto a una pizarra explicando la fórmula de la distancia de frenado' },

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
    ilustracionHeader: { src: 'img/aprendizaje/marcas-viales-header.png', alt: 'Bali de pie sobre la carretera, donde una línea continua pasa a discontinua' },
    ilustracionSecundaria: { src: 'img/aprendizaje/marcas-viales-zigzag.png', alt: 'Bali junto a una marca amarilla en zigzag de prohibido parar' },

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
    ilustracionHeader: { src: 'img/aprendizaje/normas-cruce-header.png', alt: 'Bali en el centro de un cruce sin señalizar, mirando al coche que viene por la derecha' },
    ilustracionSecundaria: { src: 'img/aprendizaje/normas-cinturon-movil.png', alt: 'Bali con un cinturón de seguridad puesto y un icono de móvil prohibido al lado' },

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
  // BLOQUES RESTANTES — próximamente (solo tarjeta en portada)
  // ============================================================
  { id: 'adelantamientos', titulo: 'Adelantamientos', icono: 'fa-arrow-right-arrow-left', color: 'red', resumenCorto: 'Cuándo, cómo y dónde se puede adelantar con seguridad.', disponible: false },
  { id: 'intersecciones', titulo: 'Intersecciones y prioridad de paso', icono: 'fa-arrows-to-circle', color: 'blue', resumenCorto: 'Quién pasa primero en cruces y glorietas.', disponible: false },
  { id: 'autopistas', titulo: 'Autopistas y autovías', icono: 'fa-road-circle-check', color: 'green', resumenCorto: 'Incorporaciones, carriles y normas específicas de vías rápidas.', disponible: false },
  { id: 'alcohol-drogas-fatiga', titulo: 'Alcohol, drogas y fatiga', icono: 'fa-wine-bottle', color: 'red', resumenCorto: 'Tasas máximas y por qué te la juegas más de lo que crees.', disponible: false },
  { id: 'vehiculo-mantenimiento', titulo: 'El vehículo: mantenimiento y elementos de seguridad', icono: 'fa-car-side', color: 'orange', resumenCorto: 'Lo mínimo que debes revisar antes de coger el coche.', disponible: false },
  { id: 'accidentes-primeros-auxilios', titulo: 'Accidentes: actuación y primeros auxilios', icono: 'fa-kit-medical', color: 'red', resumenCorto: 'Proteger, avisar y socorrer, en ese orden.', disponible: false },
  { id: 'sanciones-puntos', titulo: 'Sanciones y puntos del carnet', icono: 'fa-scale-balanced', color: 'purple', resumenCorto: 'Cómo funciona el sistema de puntos y qué te los quita.', disponible: false },
  { id: 'casos-especiales', titulo: 'Casos especiales: ciclistas, peatones, animales y meteorología', icono: 'fa-cloud-sun-rain', color: 'blue', resumenCorto: 'Las situaciones que no siguen la norma "de manual".', disponible: false }
];
