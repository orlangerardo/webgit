'use strict';

// Datos del caso «Cata a Ciegas» (Expediente Noir · N.º 000).
// Todo el contenido del juego vive aquí; app.js solo lo muestra y lo corrige.

const CASO = {
  titulo: 'Cata a Ciegas',
  expediente: 'EXP. 2026-H-000-CC',
  carta: {
    fecha: 'Santiago, lunes 18 de mayo de 2026.',
    parrafos: [
      'El sábado por la noche murió Tomás Etchegaray Larraín, fundador de Viña Los Aromos, en mitad de una cata a ciegas en su propia casa. Esa noche un temporal dejó bajo el agua el único puente del fundo, así que la casona quedó aislada con seis personas dentro: la víctima, su hija, un viejo amigo, una abogada, el sommelier contratado para la cata y el ama de llaves. Nadie entró ni salió hasta que llegamos el domingo a las 08:10.',
      'El Instituto Médico Forense confirma que no fue un infarto: Tomás recibió una dosis masiva de su propio medicamento para el corazón. Uno de los cinco que compartieron esa noche con él lo envenenó.',
      'Les entrego todo lo que tenemos: antecedentes, informe forense, la escena, cinco declaraciones y seis anexos. Lean con calma; casi todos mintieron en algo, pero solo una persona mató. Cuando tengan una teoría, pueden pedir diligencias al laboratorio. Son caras y tenemos pocas, así que fundamenten cada pedido.',
      'Quiero el nombre, el móvil, el método, tres pruebas y las mentiras que no tienen que ver con el crimen, antes del jueves.'
    ],
    firma: 'Subcomisario Andrés Valdebenito Cruz · Jefe de la Unidad de Casos Especiales'
  },

  antecedentes: {
    hechos: [
      'Viña Los Aromos es un fundo de 60 hectáreas a 14 km de Santa Cruz, en el Valle de Colchagua. Tomás Etchegaray lo compró en 1991 y lanzó su primer vino propio con la cosecha de 1994: el Carménère Gran Reserva 1994, el vino que hizo famosa a la casa. Hoy la viña está en conversaciones de venta con un grupo español.',
      'El sábado 16 de mayo de 2026 Tomás organizó en la casona una cata a ciegas para cuatro comensales: él mismo, su hija Inés, su amigo Gaspar Moll y Valentina Ross, abogada del grupo comprador. La sirvió el sommelier Bruno Contreras, contratado para la ocasión, que eligió los cinco vinos y su orden. El ama de llaves, Rosa Quilodrán, se encargó de la cocina. Cada comensal tenía cinco copas negras numeradas del 1 al 5, una por vino, para que el color no delatara la cepa.',
      'Según los asistentes, Tomás pensaba hacer «dos anuncios» en el postre. A las 23:00 pidió dejarlos «para después del café». A las 23:15 se desplomó en la mesa. Inés llamó a emergencias a las 23:17; el puente estaba cortado desde las 21:20 y la ambulancia no pudo cruzar. Gaspar y Valentina le hicieron reanimación guiados por teléfono. El médico regulador dio por constatada la muerte a las 23:50.'
    ],
    primerasDiligencias: [
      ['08:10', 'Llega la Brigada al bajar el estero. El comedor está tal como quedó: Inés impidió que se levantara la mesa.'],
      ['08:40', 'Croquis y fijación fotográfica del comedor (ver La escena). Se embalan las 20 copas, el decantador y las botellas.'],
      ['09:30', 'Se incautan el pastillero semanal de Tomás y el blíster de medicamento de Gaspar Moll, que toma el mismo fármaco. No se han contado.'],
      ['10:00 a 13:00', 'Declaraciones de las cinco personas presentes (Las personas).'],
      ['—', 'Se retienen los celulares de todos los presentes. No se han peritado.'],
      ['—', 'Se encuentra en el bolsillo de la chaqueta de Tomás el borrador de su discurso (Anexo A5).']
    ],
    cronologia: [
      ['18:30', 'Empieza el temporal.', 'Varios'],
      ['19:00', 'Llega Bruno; instala los vinos en la sala fría.', 'Bruno, Rosa'],
      ['19:30', 'Llega Valentina.', 'Valentina, Rosa'],
      ['19:45', 'Llega Gaspar; deja su maletín en la sala fría y sube a su pieza.', 'Gaspar'],
      ['20:00', 'Bruno dice haber dejado la mesa armada a esta hora.', 'Bruno'],
      ['20:10–20:50', 'Inés dice estar en la bodega histórica.', 'Inés'],
      ['20:35', 'Rosa ve a Bruno en el comedor.', 'Rosa'],
      ['≈ 20:40', 'Rosa ve un destello en el comedor.', 'Rosa'],
      ['20:50', 'Gaspar baja de su pieza.', 'Gaspar, Rosa'],
      ['21:00', 'Comienza la cena. Tomás toma su comprimido de la noche (21:05).', 'Inés, Valentina'],
      ['21:20', 'El estero cubre el puente.', 'Rosa'],
      ['21:30–22:55', 'Se sirven los vinos 1 a 5.', 'Bruno (A2)'],
      ['23:15', 'Tomás se desploma.', 'Todos'],
      ['23:17–23:52', 'Llamada a emergencias (A6). Muerte constatada 23:50.', 'A6'],
      ['23:35', 'Bruno ofrece retirar las copas; Inés se niega.', 'Inés, Rosa, A6']
    ],
    preguntasAbiertas: [
      '¿Cuándo tomó Tomás el exceso de medicamento y de dónde salió? (La víctima, A1)',
      '¿Qué fue el destello que vio Rosa hacia las 20:40? (F5)',
      '¿Por qué el sommelier quiso retirar las copas a las 23:35? (A6)',
      '¿Quién es «C. Saavedra», la firma de la etiqueta del vino 4? (A3)',
      '¿Cuál era el segundo anuncio de Tomás? (A5)'
    ]
  },

  victima: {
    datos: [
      ['Nombre', 'Tomás Etchegaray Larraín'],
      ['Edad', '64 años'],
      ['Ocupación', 'Fundador y dueño de Viña Los Aromos (desde 1991)'],
      ['Estado civil', 'Viudo. Una hija: Inés Etchegaray Ruiz'],
      ['Salud', 'Insuficiencia cardiaca. Toma un comprimido diario de un glucósido digitálico, en la noche. Inés le prepara el pastillero semanal.'],
      ['Situación', 'Negociaba la venta del 100 % de la viña al grupo español representado por Valentina Ross.']
    ],
    autopsia: [
      ['Causa de muerte', 'Arritmia ventricular por intoxicación aguda con glucósido digitálico.'],
      ['Concentración en sangre', 'Varias veces por encima del límite superior del rango terapéutico. Su comprimido diario no explica ese nivel.'],
      ['Momento de la ingesta', 'Con el inicio de síntomas (náuseas y alteración visual cerca de las 22:55) y el colapso a las 23:15, la ingesta del exceso se estima entre las 22:10 y las 22:50.'],
      ['Contenido gástrico', 'Vino tinto, cordero, papas, leche asada. No hay restos de comprimidos sin disolver.'],
      ['Síntomas descritos', 'Náuseas, visión con halos amarillos (síntoma típico de este tipo de intoxicación) y desmayo.'],
      ['Lesiones', 'Solo las propias de la reanimación (marcas en el esternón). Sin signos de violencia.'],
      ['Hora de muerte', '23:50 del sábado 16/05/2026, constatada por el médico regulador.']
    ],
    conclusion: 'Muerte homicida por envenenamiento. El exceso de fármaco llegó disuelto en algo que Tomás bebió durante la segunda mitad de la cena. Se descarta que provenga de su dosis habitual de las 21:05.'
  },

  escena: [
    ['1', 'Cuerpo de la víctima', 'En el piso, al poniente de la cabecera, donde lo tendieron para la reanimación.'],
    ['2', 'Copas 1 a 5 de Tomás', 'Negras, numeradas. La copa 4 conserva restos secos de vino tinto; la copa 5, vino sin terminar; las copas 1 a 3, casi vacías. Embaladas, sin analizar.'],
    ['3', 'Tarjeta de cata de Tomás', 'Ver Anexo A1.'],
    ['4', 'Botella vacía del vino 4', 'Carménère Gran Reserva 1994. Contraetiqueta en Anexo A3.'],
    ['5', 'Pastillero semanal de Tomás', 'En el aparador. Incautado, sin contar.'],
    ['6', 'Botellas de los vinos 1, 2, 3 y 5', 'En el aparador.'],
    ['7', 'Silla de Tomás, volcada', 'Su chaqueta sigue en el respaldo. En el bolsillo: el borrador del discurso (A5).'],
    ['8', 'Carro del sommelier', 'Escupidera, paños, sacacorchos, caja de guantes de algodón nuevos.'],
    ['9', 'Delantal del sommelier', 'Colgado en el carro. En el bolsillo: dos pares de guantes usados y un papel doblado. Embalado, sin analizar.'],
    ['10', 'Decantador', 'Con restos del vino 4 (Bruno lo decantó en la sala fría a las 22:25).']
  ],

  personas: [
    {
      id: 'ines', ficha: 'F1', nombre: 'Inés Etchegaray Ruiz', corto: 'Inés',
      relacionCorta: 'Hija, enóloga jefa de la viña', mesa: 'Derecha de Tomás',
      foto: 'assets/ines.jpg',
      datos: [
        ['Edad', '36 años'],
        ['Ocupación', 'Enóloga jefa de Viña Los Aromos'],
        ['Relación', 'Hija única. Dueña del 30 % de la sociedad.'],
        ['Vehículo', 'SUV gris, en el estacionamiento'],
        ['Declara 20:00–21:00', 'Bodega histórica, de 20:10 a 20:50']
      ],
      declaracion: { cuando: 'domingo 17/05 · 10:05 · casona', parrafos: [
        'Mi papá estaba feliz esa noche, y eso es lo que no me cabe en la cabeza. Hacía meses que no lo veía así. Yo no quería que vendiera, eso lo sabe todo el mundo, se lo dije en su cara mil veces. Esta viña es mi vida. Pero nunca, jamás, le habría hecho daño.',
        'Entre las ocho y diez y las nueve menos diez estuve abajo, en la bodega histórica. Quería ver cómo estaban las botellas del 94 que quedan, porque Bruno había pedido una para la cata, mi papá se la subió él mismo en la tarde y yo no sabía cuál había sacado. Subí justo antes de la cena.',
        'A las nueve y cinco le di su comprimido, como todas las noches. Uno solo, el del sábado, del pastillero semanal de lunes a domingo que yo misma le preparo. Valentina me vio. Si alguien piensa que fui yo, que cuenten las pastillas.',
        'El sommelier nos escribió hace un mes ofreciéndose para la cata. Cobraba poquísimo y mi papá aceptó encantado. Fue Bruno el que insistió en que el vino 4 fuera un 94. A ciegas, mi papá no tenía cómo saberlo, pero lo reconoció al primer sorbo. Se rió y dijo «este es mío». Después hizo una mueca, como si estuviera picado.',
        'En el postre dijo que veía las velas raras, con un halo. Pensé que era el cansancio. A las once y cuarto se fue de lado. Yo llamé a emergencias. Mientras Gaspar le hacía masaje, Bruno se acercó a la mesa y preguntó si retiraba las copas. Le grité que no tocara nada. No sé por qué, fue instinto.',
        'Del segundo anuncio no sé nada. El primero era la venta. El otro me lo quería decir a mí primero, me dijo en la tarde, «mañana hablamos, hija». No alcanzamos.'
      ]}
    },
    {
      id: 'gaspar', ficha: 'F2', nombre: 'Gaspar Moll Vidal', corto: 'Gaspar',
      relacionCorta: 'Crítico de vinos, amigo desde 1991', mesa: 'Izquierda de Tomás',
      foto: 'assets/gaspar.jpg',
      datos: [
        ['Edad', '67 años'],
        ['Ocupación', 'Crítico de vinos (columnista desde 1993)'],
        ['Relación', 'Amigo de Tomás desde 1991'],
        ['Salud', 'Toma el mismo medicamento que Tomás'],
        ['Declara 20:00–21:00', 'Ducha y su pieza (2.º piso)']
      ],
      declaracion: { cuando: 'domingo 17/05 · 10:50 · casona', parrafos: [
        'Treinta y cinco años de amistad. Yo estaba con Tomás cuando compró este fundo, que entonces era puro granel y zarzamora. Escribí la primera crítica seria sobre sus vinos. No tengo nada más que decir que eso: era mi amigo.',
        'Llegué a las 19:45 empapado. Dejé el maletín en la sala fría, porque Rosa me dijo que ahí estaban las cosas de los invitados y que el sommelier lo cuidaba, y subí a darme una ducha. Bajé a las nueve menos diez, con el pelo todavía mojado.',
        'Sí, tomo el mismo remedio que él. Somos, éramos, un par de corazones viejos. Abrí un blíster nuevo el viernes. Tomé el comprimido del viernes en la mañana y el del sábado en la mañana, antes de salir de Santiago. Después lo dejé en el maletín. Eso es todo.',
        'Me senté a su izquierda. El vino 4 lo reconoció enseguida, su 94, y se puso sentimental. Después lo noté pálido. Me dijo «veo las velas amarillas, Gaspar». Le dije que tomara agua. Si hubiera sabido lo que significaba eso… Uno toma ese remedio y no se lee el prospecto.',
        'Le hice el masaje cardiaco hasta que no pude más; después siguió la abogada. No sirvió de nada.',
        'Me preguntan por la etiqueta del 94, por esa firma, «C. Saavedra». No conocí a ninguna Saavedra. Debe ser una enóloga de paso, o un error de imprenta. En esos años las etiquetas se hacían en cualquier parte.'
      ]}
    },
    {
      id: 'bruno', ficha: 'F3', nombre: 'Bruno Contreras Saavedra', corto: 'Bruno',
      relacionCorta: 'Sommelier contratado para la cata', mesa: 'Sirviendo',
      foto: 'assets/bruno.jpg',
      datos: [
        ['Edad', '34 años'],
        ['Ocupación', 'Sommelier independiente, Santiago'],
        ['Relación', 'Contratado para la cata'],
        ['Origen', 'Nacido en Santa Cruz'],
        ['Declara 20:00–21:00', 'Sala fría, abriendo y aireando botellas']
      ],
      declaracion: { cuando: 'domingo 17/05 · 11:30 · casona', parrafos: [
        'No conocía a don Tomás antes de esta semana. Me llegó el trabajo por una agencia de eventos, como casi todo lo que hago. Una cata a ciegas para cuatro, con pernoctación. Un trabajo normal.',
        'Llegué a las siete. Instalé los vinos en la sala fría, que tiene la temperatura justa. A las ocho dejé armada la mesa: veinte copas negras, cinco por comensal, numeradas. Después no volví al comedor hasta la cena. Estuve en la sala fría abriendo botellas y dejándolas respirar.',
        'Yo elegí los cinco vinos y el orden, eso es lo normal en una cata a ciegas: el anfitrión no debe saber qué viene. El 4 fue un Carménère 1994 de la casa. Lo pedí porque es una leyenda; quería ver si el dueño reconocía su propio vino. Lo decanté a las diez y veinticinco.',
        'Uso guantes de algodón para pulir las copas, para no dejar huellas. Me cambio de par varias veces en una noche. Es la costumbre del oficio.',
        'Cuando don Tomás cayó, ofrecí retirar las copas. Por orden, por higiene; en un servicio uno despeja la mesa. La señora Inés me gritó y no toqué nada.',
        'Soy de Santa Cruz, sí, pero mi familia ya no vive acá. Hace años que no venía al valle.'
      ]}
    },
    {
      id: 'valentina', ficha: 'F4', nombre: 'Valentina Ross Aguirre', corto: 'Valentina',
      relacionCorta: 'Abogada del grupo comprador', mesa: 'Frente a Tomás',
      foto: 'assets/valentina.jpg',
      datos: [
        ['Edad', '41 años'],
        ['Ocupación', 'Abogada, socia de un estudio en Santiago'],
        ['Relación', 'Representa al grupo comprador español'],
        ['Operación', '≈ $4.800 millones (≈ US$ 5 millones)'],
        ['Declara 20:00–21:00', 'Su pieza (2.º piso)']
      ],
      declaracion: { cuando: 'domingo 17/05 · 12:10 · casona', parrafos: [
        'Vine a cerrar un acuerdo, no a una cena familiar. Mis clientes querían que yo estuviera presente cuando don Tomás anunciara la venta. Llegué a las siete y media; el chofer se devolvió a Santa Cruz antes de que creciera el estero.',
        'Desde que llegué hasta las nueve menos cinco estuve en mi pieza, revisando el contrato. No bajé antes. Don Tomás había pedido absoluta reserva: nada de fotos, nada de comunicados, hasta el anuncio.',
        'En la cena me tocó frente a él. A las nueve y cinco vi que su hija le daba una pastilla del pastillero; él bromeó con eso. Era un hombre encantador cuando quería.',
        'Con el vino 4 dijo «este es mío» y se rió. Después pidió que los anuncios fueran después del café. Yo supuse que el segundo anuncio era algo de la familia; con mis clientes solo había uno.',
        'Cuando se desplomó ayudé con el masaje, relevando al señor Moll. Escuché al sommelier ofrecer retirar las copas y a Inés gritándole. A mí me pareció raro, pero en ese momento todo era raro.',
        'La operación está suspendida. Yo solo quiero volver a Santiago.'
      ]}
    },
    {
      id: 'rosa', ficha: 'F5', nombre: 'Rosa Quilodrán Muñoz', corto: 'Rosa',
      relacionCorta: 'Ama de llaves desde 1991', mesa: 'Cocina',
      foto: 'assets/rosa.jpg',
      datos: [
        ['Edad', '58 años'],
        ['Ocupación', 'Ama de llaves de la casona'],
        ['Relación', 'Trabaja con la familia desde 1991'],
        ['Vive', 'Casa del cuidador, junto a la casona'],
        ['Declara 20:00–21:00', 'Cocina']
      ],
      declaracion: { cuando: 'domingo 17/05 · 12:45 · cocina', parrafos: [
        'Yo le voy a decir todo lo que vi, porque don Tomás era un hombre difícil, pero conmigo fue bueno.',
        'A las ocho y treinta y cinco pasé por el comedor con las servilletas. El joven del vino estaba solo, con guantes blancos, en la cabecera, repasando por dentro una copa del puesto de don Tomás. Una sola, mucho rato. Me dio no sé qué y seguí de largo.',
        'Como a las ocho cuarenta, desde la puerta de la cocina, vi un destello en el comedor. Pensé que era un relámpago, pero no tronó. Después no le di importancia.',
        'El joven del vino me había pedido que las cosas de los invitados quedaran en la sala fría, que él las cuidaba; ahí dejó don Gaspar su maletín. Desde la ventana del hall vi el auto de la señorita Inés con la luz de adentro prendida. Ella estaba sentada, hablando por teléfono, se le veía la pantalla en la cara. Eso fue antes de la comida, no le sé decir la hora exacta. Don Gaspar bajó a las nueve menos diez con el pelo mojado.',
        'El puente se tapó como a las nueve y veinte; me avisó el vecino por radio.',
        'Le digo otra cosa, para que entiendan lo del vino. Ese 94 lo hizo la señora Carmen, la enóloga que hubo aquí los primeros años. Todos en el valle lo saben. Don Tomás no dejaba que se la nombrara; ella se fue el 97, mal. Tenía un niño chico que corría entre las barricas. Esta semana, fíjese, don Tomás me preguntó si yo guardaba alguna foto de ella. Nunca me había preguntado nada.',
        'Cuando don Tomás se cayó, el joven quiso llevarse las copas. La señorita Inés no lo dejó.'
      ]}
    }
  ],

  anexos: {
    A1: {
      titulo: 'A1 · Tarjeta de cata de Tomás',
      img: 'assets/a1-tarjeta.jpg',
      alt: 'Tarjeta de cata de Tomás con notas manuscritas para cada uno de los cinco vinos',
      pie: 'Tarjeta de cata de Tomás, hallada junto a sus copas (marcador 3). Letra de la víctima, confirmada por su hija.',
      transcripcion: [
        '1 · Sauvignon? fresco, cítrico, salino — 88',
        '2 · Pinot noir. Fino, guinda ácida — 90',
        '3 · Syrah joven. Demasiada madera — 85',
        '4 · ¡Mi 94! Lo reconocería entre mil. ¿amargo? ¿corcho? — raro — (sin puntaje)',
        '5 · Tardía. No lo termino. Náuseas. ¿las velas con halo amarillo?'
      ]
    },
    A2: {
      titulo: 'A2 · Carta de servicio del sommelier',
      intro: 'Hoja impresa hallada en el carro del sommelier. Firmada «B. Contreras».',
      cabecera: ['Vino', 'Cepa y cosecha (ocultas a los comensales)', 'Servido', 'Copa'],
      filas: [
        ['1', 'Sauvignon Blanc 2024, Casablanca', '21:30', '1'],
        ['2', 'Pinot Noir 2022, Bío-Bío', '21:50', '2'],
        ['3', 'Syrah 2023, Elqui', '22:10', '3'],
        ['4', 'Carménère Gran Reserva 1994, Viña Los Aromos (decantado 22:25)', '22:35', '4'],
        ['5', 'Cosecha tardía 2021, Maule (con el postre)', '22:55', '5']
      ],
      nota: 'Nota al pie de la hoja: «Selección y orden: B. Contreras. Servicio contratado directamente con el sommelier.»'
    },
    A3: {
      titulo: 'A3 · Contraetiqueta del vino 4 y folleto de la viña',
      img: 'assets/a3-etiqueta.jpg',
      alt: 'Contraetiqueta del Carménère Gran Reserva 1994 de Viña Los Aromos: «Enología: C. Saavedra»',
      pie: 'Contraetiqueta de la botella servida como vino 4 (marcador 4). Original de 1994.',
      texto: 'Folleto actual de Viña Los Aromos (recepción de la casona): «Todos nuestros vinos, desde la legendaria cosecha de 1994, llevan la firma de un solo hombre: nuestro fundador, Tomás Etchegaray.» Las etiquetas desde la cosecha de 1995 dicen «Enología: T. Etchegaray».'
    },
    A4: {
      titulo: 'A4 · Recorte de prensa (archivo de la casona)',
      img: 'assets/a4-recorte.jpg',
      alt: 'Recorte de La Gaceta del Vino, noviembre de 1995: «El genio de Los Aromos», por Gaspar Moll',
      pie: 'Columna de Gaspar Moll, noviembre de 1995. Enmarcada en el living de la casona.'
    },
    A5: {
      titulo: 'A5 · Borrador del discurso',
      img: 'assets/a5-borrador.jpg',
      alt: 'Borrador del discurso de Tomás con tres líneas tachadas y la nota «sí. decirlo.» en el margen',
      pie: 'Hoja hallada en el bolsillo de la chaqueta de Tomás (marcador 7). Las tres líneas tachadas son ilegibles a simple vista. En el margen: «sí. decirlo.»'
    },
    A6: {
      titulo: 'A6 · Llamada a emergencias (extracto)',
      intro: 'Central de Emergencias Metropolitana · derivada a regulación médica · 16/05/2026, 23:17 a 23:52. Transcripción parcial.',
      cabecera: ['Hora', 'Voz', 'Transcripción'],
      filas: [
        ['23:17', 'Operador', 'Emergencias, ¿qué ocurre?'],
        ['23:17', 'Inés', 'Mi papá se desmayó en la mesa. No respira bien. Es cardiaco. Dijo que veía todo amarillo.'],
        ['23:19', 'Operador', 'La ambulancia informa que el puente está cortado. Vamos a hacer reanimación por teléfono.'],
        ['23:20', 'Inés', 'Gaspar, ¡ven! Ponlo en el suelo.'],
        ['23:35', 'Voz masculina joven', '¿Retiro las copas, señora?'],
        ['23:35', 'Inés', '¡No toques nada! ¡Nadie toca nada!'],
        ['23:41', 'Mujer (otra)', 'Déjeme a mí, señor, yo sigo.'],
        ['23:50', 'Médico regulador', 'Lo lamento mucho. Pueden suspender las compresiones. Hora: 23:50.']
      ]
    }
  },

  // Menú de diligencias. «objetivos» indica a quién se aplica el pedido.
  diligencias: [
    { id: 'D01', nombre: 'Peritaje de un celular', costo: 1, plazo: '24 h',
      desc: 'Se recuperan llamadas, mensajes y fotos del sábado 16/05 entre las 19:00 y las 23:59.',
      objetivos: ['ines', 'gaspar', 'bruno', 'valentina', 'rosa'], etiquetaObjetivo: 'Celular de' },
    { id: 'D02', nombre: 'Análisis toxicológico de copas y decantador', costo: 1, plazo: '48 h',
      desc: 'Copas de una persona y del decantador.',
      objetivos: ['tomas', 'ines', 'gaspar', 'valentina'], etiquetaObjetivo: 'Copas de' },
    { id: 'D03', nombre: 'Conteo de medicamentos', costo: 1, plazo: '2 h',
      desc: 'Pastillero de Tomás y blíster de Gaspar Moll.' },
    { id: 'D04', nombre: 'Peritaje de guantes y papel del delantal', costo: 2, plazo: '48 h',
      desc: 'Guantes usados y papel doblado del delantal del sommelier.' },
    { id: 'D05', nombre: 'Consulta al registro civil', costo: 1, plazo: '24 h',
      desc: 'Filiación (padres) de una persona.',
      objetivos: ['ines', 'gaspar', 'bruno', 'valentina', 'rosa'], etiquetaObjetivo: 'Filiación de' },
    { id: 'D06', nombre: 'Borrador del discurso con luz rasante e infrarrojo', costo: 1, plazo: '24 h',
      desc: 'Examen del borrador hallado en la chaqueta de Tomás.' }
  ],

  nombres: { tomas: 'Tomás', ines: 'Inés', gaspar: 'Gaspar', bruno: 'Bruno', valentina: 'Valentina', rosa: 'Rosa' },

  // Razones que el equipo puede dar al pedir una diligencia.
  // «sirve» lista los pedidos (diligencia:objetivo) que esa razón sí sostiene.
  fundamentos: [
    { id: 'corazonada', txt: 'Corazonada: no me gusta cómo habla esa persona.', sirve: [] },
    { id: 'conteo1', txt: 'Tomás tomó solo su comprimido de las 21:05, pero la autopsia dice que el exceso salió de otra fuente (La víctima, F1).', sirve: ['D03'] },
    { id: 'auto', txt: 'Rosa vio a Inés en su auto hablando por teléfono, pero Inés declara haber estado en la bodega histórica (F1, F5).', sirve: ['D01:ines'] },
    { id: 'venta', txt: 'Inés se oponía a la venta y es heredera de la viña: tiene un móvil económico.', sirve: [] },
    { id: 'dest', txt: 'Rosa vio un destello en el comedor hacia las 20:40 y Valentina jura no haber bajado antes de las 20:55 (F4, F5).', sirve: ['D01:valentina'] },
    { id: 'guantes', txt: 'Rosa vio a Bruno solo en el comedor, con guantes, repasando por dentro una sola copa de Tomás (F5).', sirve: ['D04'] },
    { id: 'apellido', txt: 'El segundo apellido de Bruno es Saavedra, igual que la firma «C. Saavedra» de la etiqueta del vino 4 (F3, A3).', sirve: ['D01:bruno', 'D05:bruno'] },
    { id: 'dinero', txt: 'La operación vale unos US$ 5 millones: seguro hay una razón económica detrás.', sirve: [] },
    { id: 'copa', txt: 'La autopsia dice que el exceso llegó disuelto en algo que Tomás bebió, y su tarjeta marca el vino 4 como «amargo» y «raro» (La víctima, A1).', sirve: ['D02:tomas'] },
    { id: 'conoce', txt: 'Gaspar dice no conocer a ninguna Saavedra, pero escribió la crítica de 1995 sobre ese vino (F2, A4).', sirve: ['D01:gaspar', 'D05:gaspar'] },
    { id: 'conteo2', txt: 'Gaspar toma el mismo fármaco que Tomás y su maletín quedó en la sala fría durante toda la noche (F2, F5).', sirve: ['D03'] },
    { id: 'agencia', txt: 'Bruno dice que lo contrató una agencia, pero su carta de servicio dice «contratado directamente» (F3, A2).', sirve: ['D01:bruno', 'D05:bruno'] },
    { id: 'retirar', txt: 'Bruno ofreció retirar las copas a las 23:35 y cambia de guantes varias veces en la noche (A6, F3).', sirve: ['D04'] },
    { id: 'todo', txt: 'Revisar todo por si aparece algo.', sirve: [] },
    { id: 'descarte', txt: 'Hay que descartar que el veneno estuviera dirigido a otro comensal de la mesa.', sirve: ['D02:ines', 'D02:gaspar', 'D02:valentina'] },
    { id: 'borrador', txt: 'El borrador tiene tres líneas tachadas ilegibles y en el margen dice «sí. decirlo.»: ¿cuál era el segundo anuncio? (A5)', sirve: ['D06'] }
  ],

  // Resultados que lee el anfitrión cuando el fundamento sirve.
  resultados: {
    'D01:valentina': {
      texto: 'Foto IMG_4471, 20:41:07, con flash, del comedor vacío. Ampliada, la copa 4 de Tomás muestra una película blanquecina en la pared interior. Enviada por WhatsApp a las 20:43 a su cliente en Madrid: «Así se ve la mesa. Todo listo. No le digas a nadie que te mandé esto».',
      img: 'assets/d01-foto.jpg', alt: 'Foto del comedor tomada con flash a las 20:41: la copa 4 muestra una película blanquecina'
    },
    'D01:bruno': { texto: 'Sin llamadas esa noche. En la galería, una foto escaneada guardada en 2025: «mama_LosAromos_94.jpg». Una mujer joven y un niño de unos dos años posan entre barricas; atrás, un Tomás Etchegaray treintañero.' },
    'D01:ines': { texto: 'Llamada saliente de 20:12 a 20:47 a «Martín Vial – abogado». Mensaje a las 20:48: «Si firma mañana, ¿puedo ejercer el derecho preferente?».' },
    'D01:gaspar': { texto: 'Llamada de 3 minutos a su hija a las 20:20. Sin hallazgos relevantes.' },
    'D01:rosa': { texto: 'Celular básico, sin cámara. Sin hallazgos.' },
    'D02:tomas': { texto: 'Copas de Tomás: la copa 4 da positivo para el glucósido digitálico, concentrado en el fondo y la parte baja de la pared interior, como residuo aplicado en seco antes de servir el vino. Copas 1, 2, 3 y 5: negativas. Decantador y botella del 94: negativos. Conclusión: el veneno estaba en la copa, no en el vino.' },
    'D02:otros': { texto: 'Copas de esta persona: negativas. Decantador y botella del 94: negativos.' },
    'D03': { texto: 'Pastillero de Tomás (lunes a domingo): solo queda el comprimido del domingo; el del sábado se tomó a las 21:05. Cuadra. Blíster de Gaspar: de 28 comprimidos quedan 18, faltan 10. Gaspar declaró haber tomado 2: faltan 8 sin explicación. El maletín estuvo en la sala fría de 19:45 a 00:30.' },
    'D04': { texto: 'De los dos pares de guantes de algodón, uno está limpio. En el otro, el guante izquierdo tiene trazas del glucósido en las yemas de los dedos. El papel doblado contiene restos de polvo blanco del mismo fármaco y la huella del pulgar derecho de Bruno Contreras.' },
    'D05:bruno': { texto: 'Bruno Contreras Saavedra: hijo de Luis Contreras Mora (fallecido en 2010) y de Carmen Saavedra Pinto, enóloga, fallecida el 12/03/2025 en Santa Cruz.' },
    'D05:ines': { texto: 'Inés: hija de Tomás y de Elena Ruiz Correa (fallecida en 2015).' },
    'D05:gaspar': { texto: 'Gaspar Moll: sin relación con el caso.' },
    'D05:valentina': { texto: 'Valentina Ross: sin relación con el caso.' },
    'D05:rosa': { texto: 'Rosa Quilodrán: sin relación con el caso.' },
    'D06': {
      texto: 'Las líneas tachadas son legibles: «el 94 nunca fue mío. Desde hoy llevará el nombre de quien lo hizo: “Herencia · Carmen Saavedra”».',
      img: 'assets/d06-borrador.jpg', alt: 'Borrador del discurso examinado con luz rasante: las tres líneas tachadas se leen con claridad'
    }
  },

  pistas: [
    'Miren el segundo apellido de cada persona y comparen con las etiquetas.',
    'Rosa vio un destello a las 20:40. ¿Quién tenía prohibido sacar fotos y juró no haber bajado?',
    '¿Estaba el veneno en la botella o en la copa? ¿Quién estuvo solo con las copas antes de la cena?'
  ],

  // Respuestas de los interrogados al ser confrontados con una prueba.
  reinterrogatorios: {
    bruno: {
      sin: 'Bruno sostiene su versión, impasible: «No sé qué quiere que le diga. Hice mi trabajo».',
      confesion: [
        'Mi mamá hizo ese vino. Tenía veintiocho años y durmió en la bodega toda esa vendimia, conmigo jugando entre las barricas. Cuando salió la crítica, ese señor Moll vino a almorzar y nadie la sentó a la mesa. Ella pidió que pusieran su nombre. La echaron el 97.',
        'Murió el año pasado. En el funeral nadie del valle dijo «el 94». Cuando supe que vendían, entendí que su nombre se iba a ir con los españoles. Quería que él se tomara su mentira. Que la reconociera a ciegas.',
        '¿Qué decía el discurso? ¿Qué tenía tachado? …No. No me lo lea.'
      ]
    },
    ines: {
      sin: 'Inés: «No entiendo qué tiene que ver eso conmigo».',
      admite: 'Inés admite que estaba en el auto con su abogado para frenar la venta: «No quería que mi papá supiera que lo estaba peleando por detrás».'
    },
    valentina: {
      sin: 'Valentina: «Eso no prueba nada. Yo estaba en mi pieza».',
      admite: 'Valentina admite que bajó y fotografió la mesa para su cliente: «Si don Tomás se enteraba, perdía el cliente y la operación». No vio a nadie en el comedor.'
    },
    gaspar: {
      sin: 'Gaspar: «Ya dije todo lo que sé. No conocí a ninguna Saavedra».',
      admite: 'Gaspar se quiebra y admite que conocía a Carmen: «Yo sabía que el vino era de ella. Escribí lo que Tomás quería leer. Ese es mi pecado, no este».'
    },
    rosa: {
      cualquiera: 'Rosa repite lo mismo que declaró y agrega: «El niño de la señora Carmen tenía los ojos del joven del vino. No me atreví a decirlo».'
    }
  },

  // Opciones de la hoja de resolución.
  resolucion: {
    movil: [
      { id: 'm1', txt: 'Vengar a su madre, Carmen Saavedra: Tomás se atribuyó el vino que ella creó y la despidió.', pts: 20 },
      { id: 'm2', txt: 'Es hijo de la enóloga «C. Saavedra» que firmó el vino 4, sin que se explique más.', pts: 10 },
      { id: 'm3', txt: 'Quedarse con la viña o con parte del dinero de la venta.', pts: 0 },
      { id: 'm4', txt: 'Impedir que se vendiera la viña a los españoles.', pts: 0 },
      { id: 'm5', txt: 'Ocultar que había plagiado una crítica de vinos.', pts: 0 },
      { id: 'm6', txt: 'Una deuda de dinero con Tomás.', pts: 0 }
    ],
    lugar: [
      { id: 'copa4', txt: 'En la copa 4 de Tomás, antes de servir el vino.' },
      { id: 'vino4', txt: 'En el vino 4, dentro de la botella.' },
      { id: 'decantador', txt: 'En el decantador del vino 4.' },
      { id: 'comida', txt: 'En la comida (cordero, papas o leche asada).' },
      { id: 'pastillero', txt: 'En el pastillero de Tomás.' }
    ],
    origen: [
      { id: 'blister', txt: 'Comprimidos robados del blíster de Gaspar, que estaba en la sala fría.' },
      { id: 'pastillero', txt: 'Comprimidos del pastillero semanal de Tomás.' },
      { id: 'inesdosis', txt: 'Una sobredosis que Inés le dio a las 21:05.' },
      { id: 'propio', txt: 'Un medicamento que el sommelier llevó consigo.' }
    ],
    momento: [
      { id: 'antes', txt: 'Antes de la cena, mientras la mesa estaba vacía (20:00–20:41).' },
      { id: 'servicio', txt: 'Durante el servicio de los vinos (21:30–22:55).' },
      { id: 'despues', txt: 'Después de que Tomás se desplomó (23:15–23:50).' }
    ],
    pruebas: [
      { id: 'p_rosa', txt: 'Rosa vio a Bruno solo, con guantes, puliendo por dentro una copa de Tomás a las 20:35 (F5).', grupo: 'rosa' },
      { id: 'p_foto', txt: 'La foto de Valentina de las 20:41 muestra una película blanquecina en la copa 4 (D-01).', grupo: 'foto' },
      { id: 'p_guantes', txt: 'El guante izquierdo de Bruno y el papel del delantal tienen restos del fármaco y su huella (D-04).', grupo: 'guantes' },
      { id: 'p_blister', txt: 'Al blíster de Gaspar le faltan 8 comprimidos sin explicación, y su maletín estuvo en la sala fría (D-03).', grupo: 'blister' },
      { id: 'p_filiacion', txt: 'Bruno es hijo de Carmen Saavedra, la enóloga que firmó el vino 4 (D-05), y guarda una foto de ella con Tomás (D-01).', grupo: 'filiacion' },
      { id: 'p_retirar', txt: 'Bruno ofreció retirar las copas a las 23:35 (A6).', grupo: 'retirar' },
      { id: 'p_contrato', txt: 'Bruno dice que lo contrató una agencia, pero su carta de servicio dice «contratado directamente» (A2).', grupo: 'contrato' },
      { id: 'x_pastilla', txt: 'Inés le dio el comprimido a Tomás a las 21:05 (F1, F4).', grupo: null },
      { id: 'x_venta', txt: 'La venta de la viña por ≈ US$ 5 millones (F4).', grupo: null },
      { id: 'x_decant', txt: 'El decantador y la botella del 94 dan negativo (D-02).', grupo: null },
      { id: 'x_llamada', txt: 'Gaspar llamó a su hija a las 20:20 (D-01).', grupo: null },
      { id: 'x_auto', txt: 'Inés estaba en su auto hablando por teléfono (F5).', grupo: null }
    ],
    razones: [
      { id: 'frenar', txt: 'Frenaba la venta a espaldas de su padre.' },
      { id: 'foto', txt: 'Fotografió la mesa para su cliente pese a la prohibición de Tomás.' },
      { id: 'verguenza', txt: 'Conocía a Carmen y sabía que el vino era suyo; le da vergüenza lo que escribió en 1995.' },
      { id: 'deuda', txt: 'Ocultaba una deuda con Tomás.' },
      { id: 'amor', txt: 'Ocultaba una relación con otra persona de la casa.' },
      { id: 'herencia', txt: 'Quería quedarse con la herencia.' }
    ],
    // pares (persona, razón) que puntúan como mentira inocente
    mentirasValidas: [
      { p: 'ines', r: 'frenar', detalle: 'Inés dijo estar en la bodega histórica, pero estaba en su auto hablando con su abogado para frenar la venta.' },
      { p: 'valentina', r: 'foto', detalle: 'Valentina dijo no haber bajado antes de las 20:55, pero bajó a las 20:41 y fotografió la mesa para su cliente.' },
      { p: 'gaspar', r: 'verguenza', detalle: 'Gaspar dijo no conocer a ninguna Saavedra, pero conocía a Carmen y sabía que el 94 era suyo.' }
    ]
  },

  solucion: {
    linea: 'Bruno Contreras Saavedra, el sommelier, envenenó a Tomás para vengar a su madre, Carmen Saavedra, la enóloga que creó el Carménère 1994 y a quien Tomás despidió y borró de la historia. A las 20:30 untó la copa 4 de Tomás con comprimidos molidos robados del maletín de Gaspar; el vino 4, servido a las 22:35, los disolvió.',
    historia: [
      'En 1991 Tomás Etchegaray compró un fundo de uva para granel en Colchagua y contrató a una enóloga joven, Carmen Saavedra Pinto. Fue ella quien vinificó el Carménère 1994, el vino que en 1995 recibió 95 puntos en la columna de Gaspar Moll y lanzó a Los Aromos. La columna hablaba de «una sola firma», la de Tomás. Carmen pidió que se reconociera su trabajo; en 1997 Tomás la despidió. Desde la cosecha de 1995 Tomás imprimió las etiquetas con «Enología: T. Etchegaray», aunque Carmen siguió trabajando hasta 1997. Solo las botellas del 94, ya etiquetadas, conservan su nombre.',
      'Carmen tenía un hijo chico, Bruno, que creció corriendo entre las barricas. Se hizo sommelier en Santiago. Su madre murió en marzo de 2025 sin que nadie la nombrara. Cuando Bruno supo que la viña se vendería a un grupo extranjero, entendió que el nombre de su madre desaparecería para siempre. Le escribió a Tomás ofreciéndose, muy barato, para la cata de la venta. Usó su apellido paterno; Tomás nunca preguntó por el segundo.',
      'Bruno eligió los vinos y el orden, e incluyó el 94 en el lugar 4: quería que Tomás «se bebiera su mentira». Sabía por los correos de la organización que Gaspar toma el mismo medicamento que Tomás, y le pidió a Rosa que las cosas de los invitados quedaran en la sala fría, donde él trabajaba. A las 20:15 sacó comprimidos del blíster de Gaspar y los molió envueltos en un papel. A las 20:30, solo en el comedor y con guantes, untó el fondo y la parte baja de la pared interior de la copa 4 de Tomás con el polvo humedecido y lo dejó secar. En una copa negra, a la luz de las velas, no se ve nada.',
      'A las 20:35 Rosa lo vio puliendo esa copa. A las 20:41 Valentina bajó a escondidas y fotografió la mesa para su cliente: el flash dejó ver una película blanquecina en la copa 4. A las 22:35 Bruno sirvió el 94; Tomás lo reconoció («este es mío») y notó el amargor. A las 22:55 veía halos amarillos. A las 23:15 se desplomó. A las 23:35 Bruno intentó retirar las copas; Inés se lo impidió.'
    ],
    giro: 'El borrador del discurso tenía tres líneas tachadas. Con luz rasante se leen: «el 94 nunca fue mío. Desde hoy llevará el nombre de quien lo hizo: “Herencia · Carmen Saavedra”». Tomás dudó, lo tachó, y en el margen escribió: «sí. decirlo». Esa semana le había preguntado a Rosa si guardaba una foto de Carmen. El segundo anuncio era el homenaje que Bruno vino a exigir. Lo mató media hora antes de oírlo.',
    cronologia: [
      ['19:00', 'Bruno llega e instala los vinos en la sala fría.'],
      ['19:45', 'Gaspar deja su maletín (con el blíster) en la sala fría y sube a ducharse.'],
      ['20:12–20:47', 'Inés, en su auto, habla por teléfono con su abogado para frenar la venta (no está en la bodega).'],
      ['20:15', 'Bruno saca comprimidos del blíster de Gaspar y los muele en un papel.'],
      ['20:30', 'Bruno, solo y con guantes, unta la copa 4 de Tomás.'],
      ['20:35', 'Rosa lo ve puliendo esa copa.'],
      ['20:41', 'Valentina fotografía la mesa con flash; lo envía a su cliente a las 20:43.'],
      ['20:50', 'Gaspar baja con el pelo mojado.'],
      ['21:05', 'Inés le da a Tomás su dosis normal.'],
      ['22:35', 'Bruno sirve el vino 4 (el 94) en la copa 4. El vino disuelve el residuo.'],
      ['22:55', 'Náuseas y halos amarillos.'],
      ['23:15', 'Colapso.'],
      ['23:35', 'Bruno ofrece retirar las copas; Inés lo impide.'],
      ['23:50', 'Muerte.']
    ],
    lecturas: [
      ['Tarjeta: vino 4 «¿amargo? ¿corcho?» (A1)', 'Un corcho defectuoso.', 'El veneno estaba en la copa 4.'],
      ['Gaspar toma el mismo fármaco (F2)', 'Él lo envenenó; estaba sentado al lado.', 'Fue la fuente: le robaron del maletín. Estaba en la ducha a las 20:30.'],
      ['Inés da las pastillas (F1, F4)', 'Le dio una sobredosis a las 21:05.', 'Dosis normal; el forense fecha la ingesta entre 22:10 y 22:50. D-03 lo confirma.'],
      ['Destello a las 20:40 (F5)', 'Un relámpago.', 'El flash de Valentina (D-01).'],
      ['«¿Retiro las copas?» (A6)', 'Costumbre de servicio.', 'Quería eliminar la copa 4.'],
      ['«Enología: C. Saavedra» (A3)', 'Error de imprenta (Gaspar).', 'Carmen Saavedra, madre de Bruno (D-05). Gaspar se delata: dice «ninguna Saavedra», en femenino, aunque la etiqueta solo dice «C.».'],
      ['Carta A2: «contratado directamente»', '—', 'Contradice la «agencia» de Bruno; él buscó el trabajo.'],
      ['Borrador tachado (A5)', 'Tomás se arrepintió del anuncio.', 'Iba a reconocer a Carmen (D-06).'],
      ['Halos amarillos (A1, A6)', 'Cansancio.', 'Síntoma de la intoxicación.']
    ],
    ruido: [
      'La operación de venta y su monto: móvil aparente de Inés, que no actuó.',
      'La llamada de Gaspar a su hija a las 20:20.',
      'El decantador: da negativo; el veneno nunca estuvo en la botella.'
    ],
    mentiras: [
      ['Inés', 'Estuvo en la bodega histórica de 20:10 a 20:50.', 'Estaba en su auto hablando con su abogado.', 'Buscaba frenar la venta a espaldas de su padre.'],
      ['Valentina', 'No bajó antes de las 20:55.', 'Bajó a las 20:41 y fotografió la mesa.', 'Tomás prohibió las fotos; violó la reserva por su cliente.'],
      ['Gaspar', 'No conoció a ninguna Saavedra.', 'Conocía a Carmen y sabía que el 94 era suyo.', 'Vergüenza: su crítica de 1995 la borró.'],
      ['Rosa', '—', 'Es la testigo honesta.', '—']
    ],
    mentirasBruno: 'Las mentiras de Bruno (la agencia, «no volví al comedor», «mi familia ya no vive acá») son parte del crimen y no cuentan en la pregunta 5.'
  },

  promo: 'Al terminar, usa el código CATA15 en expedientenoir.com para obtener 15 % de descuento en Expediente 001: El Eco de Lastarria.'
};
