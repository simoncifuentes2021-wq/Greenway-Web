export type ServiceFeatureGroup = {
  title: string;
  description: string;
  items: string[];
};

export type ServiceStep = {
  title: string;
  description: string;
};

export type ServiceSolution = {
  title: string;
  description: string;
  details?: string[];
  mediaLabel: string;
  specs: { value: string; label: string }[];
  applications: string[];
};

export type ServicePageContent = {
  slug: string;
  eyebrow: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  heroDescription: string;
  mediaLabel: string;
  introductionTitle: string;
  introduction: string;
  introductionDetails?: string[];
  outcomes: string[];
  includes?: { highlight: string; description: string }[];
  includesTitle?: string;
  closingNote?: string;
  closingParagraphs?: string[];
  featureTitle: string;
  featureIntroduction: string;
  featureGroups: ServiceFeatureGroup[];
  steps: ServiceStep[];
  proofTitle: string;
  proofDescription: string;
  proofItems: string[];
  portalRelevant: boolean;
  applicationsTitle: string;
  applicationsIntroduction: string;
  applications: string[];
  relatedSlugs: string[];
  solutions?: ServiceSolution[];
};

export const detailedServiceSlugs = [
  'reciclaje',
  'manejo-de-residuos',
  'huella-de-carbono',
  'energias-renovables',
  'limpieza',
  'economia-circular',
  'asesoria-ambiental',
  'gestion-y-trazabilidad',
  'movilidad-sostenible',
  'sustentabilidad-audiovisual',
] as const;

export const servicePages: Record<(typeof detailedServiceSlugs)[number], ServicePageContent> = {
  reciclaje: {
    slug: 'reciclaje',
    eyebrow: 'Reciclaje',
    title: 'Reciclaje',
    metaTitle: 'Reciclaje',
    metaDescription: 'Gestión integral de reciclaje para eventos y producciones: planificación, puntos limpios, operación, disposición final y reporte post-evento.',
    heroDescription: 'Diseñamos y operamos proyectos de reciclaje según los requerimientos y magnitud de cada producción.',
    mediaLabel: 'Fotografía real de un punto limpio Greenway en operación pendiente de material aprobado.',
    introductionTitle: 'Un sistema de reciclaje integral',
    introduction: 'Reciclar en un evento o producción requiere más que instalar contenedores. Greenway organiza materiales, flujos, puntos de acopio, orientación al público y operación en terreno para que cada etapa responda al contexto del proyecto.',
    outcomes: [
      'Ordenamos los flujos de residuos desde el diseño del proyecto.',
      'Facilitamos una separación mediante monitores y staff de reciclaje con apoyo de infraestructura y señalética adaptada al cliente.',
      'Coordinamos supervisión del sistema de reciclaje, acopio, transporte y disposición final.',
      'Al cierre contarás con un reporte post evento que te permite evaluar el proyecto y visualizar mejoras.',
    ],
    featureTitle: 'Qué puede incluir un proyecto de reciclaje',
    featureIntroduction: 'El alcance se define de forma personalizada. Greenway combina planificación, infraestructura, educación y operación según los requerimientos de cada producción.',
    featureGroups: [
      {
        title: 'Diseño del proyecto de reciclaje',
        description: 'Planificación estratégica de flujos de residuos, puntos de acopio y materiales a reciclar.',
        items: [],
      },
      {
        title: 'Puntos limpios señalizados',
        description: 'Contenedores diferenciados y estéticamente integrados al entorno del evento.',
        items: [],
      },
      {
        title: 'Monitores ambientales capacitados',
        description: 'Personal preparado para educar, guiar al público y supervisar el correcto uso de los puntos.',
        items: [],
      },
      {
        title: 'Acopio, transporte y disposición final',
        description: 'Retiro seguro y gestión con empresas autorizadas, con entrega de certificados de disposición final.',
        items: [],
      },
      {
        title: 'Reporte post-evento',
        description: 'Informe detallado con datos de reciclaje, imágenes y sugerencias para próximas ediciones.',
        items: [],
      },
    ],
    steps: [
      { title: 'Diagnóstico', description: 'Revisamos la magnitud de la producción, los materiales esperados y las condiciones de operación.' },
      { title: 'Diseño', description: 'Definimos flujos, puntos de acopio, infraestructura y necesidades de orientación.' },
      { title: 'Implementación', description: 'Instalamos y coordinamos los recursos definidos para el proyecto.' },
      { title: 'Operación', description: 'Supervisamos los puntos y gestionamos el acopio, transporte y disposición final.' },
      { title: 'Reporte', description: 'Entregamos el respaldo disponible del servicio y sugerencias para futuras operaciones.' },
    ],
    proofTitle: 'Evidencia para revisar lo realizado',
    proofDescription: 'El cierre puede incluir certificados de disposición final y un reporte post-evento. Así, la gestión no termina en terreno: queda información organizada para evaluar el proyecto y detectar oportunidades de mejora.',
    proofItems: ['Certificados de disposición final', 'Datos del proyecto', 'Registro de imágenes', 'Sugerencias post-evento'],
    portalRelevant: true,
    applicationsTitle: '¿Para quién aplica este servicio?',
    applicationsIntroduction: 'El proyecto se dimensiona según el tipo de producción, sus flujos y sus necesidades de atención en terreno.',
    applications: ['Eventos y festivales', 'Espectáculos y producciones', 'Agencias y productoras', 'Empresas e instituciones con operaciones que requieren reciclaje'],
    relatedSlugs: ['manejo-de-residuos', 'gestion-y-trazabilidad'],
  },
  'manejo-de-residuos': {
    slug: 'manejo-de-residuos',
    eyebrow: 'Manejo de residuos',
    title: 'Manejo de residuos para eventos y operaciones',
    metaTitle: 'Manejo de residuos para eventos y operaciones',
    metaDescription: 'Gestión responsable y segura de residuos reciclables, orgánicos y no reciclables, con acopio, transporte autorizado y disposición final.',
    heroDescription: 'Gestionamos de forma responsable y segura los residuos generados durante eventos u operaciones continuas, con una solución adaptada a cada flujo.',
    mediaLabel: 'Fotografía real de una operación de manejo de residuos Greenway pendiente de material aprobado.',
    introductionTitle: 'Manejo de residuos',
    introduction: 'Realizamos una gestión responsable, segura y certificada de todo tipo de residuos generados durante la producción de eventos o en operaciones continuas.',
    outcomes: [
      'Acopio clasificado en el punto de origen según el tipo de residuo.',
      'Transporte autorizado conforme a la normativa vigente.',
      'Disposición final segura y certificada según el destino correspondiente.',
    ],
    includes: [
      { highlight: 'Acopio clasificado', description: 'en el punto de origen, según el tipo de residuo. Puede realizarse en autocompactadoras, tolvas de 10 a 20 m³, contenedores de 1 m³, maxisacos, campanas u otros equipos adecuados.' },
      { highlight: 'Transporte autorizado', description: 'conforme a la normativa vigente.' },
      { highlight: 'Disposición final segura y certificada', description: 'para reciclaje, compostaje o eliminación en un sitio autorizado por la Seremi de Salud.' },
    ],
    closingNote: 'Gestionamos residuos reciclables, orgánicos y no reciclables, promoviendo la trazabilidad, la minimización de impactos y el cumplimiento normativo.',
    featureTitle: 'Qué puede incluir la gestión de residuos',
    featureIntroduction: 'La combinación de equipos y destinos se define según el diagnóstico de la operación y los residuos contemplados.',
    featureGroups: [
      {
        title: 'Acopio y equipamiento',
        description: 'Infraestructura ajustada a los flujos y al espacio disponible.',
        items: ['Acopio clasificado en origen', 'Auto compactadoras', 'Tolvas de 10 a 20 m³', 'Contenedores de 1 m³', 'Maxi sacos', 'Campanas'],
      },
      {
        title: 'Traslado y destino',
        description: 'Coordinación del movimiento y cierre de los residuos gestionados.',
        items: ['Transporte autorizado', 'Disposición final', 'Eliminación en sitio autorizado'],
      },
      {
        title: 'Alternativas de gestión',
        description: 'El destino se define según el tipo de residuo y el alcance acordado.',
        items: ['Reciclaje', 'Compostaje', 'Gestión de residuos no reciclables'],
      },
    ],
    steps: [
      { title: 'Diagnóstico', description: 'Identificamos los residuos contemplados, los flujos y las condiciones de la operación.' },
      { title: 'Planificación', description: 'Definimos puntos de acopio, equipos y destinos para cada flujo confirmado.' },
      { title: 'Implementación', description: 'Coordinamos la infraestructura y la clasificación en origen.' },
      { title: 'Transporte', description: 'Gestionamos el retiro mediante transporte autorizado según el servicio.' },
      { title: 'Cierre', description: 'Respaldamos la disposición, reciclaje, compostaje o eliminación realizada según corresponda.' },
    ],
    proofTitle: 'Trazabilidad desde el acopio hasta el destino',
    proofDescription: 'La gestión puede respaldarse con información del servicio y documentación asociada al transporte y la disposición final. Cuando el alcance requiere reportabilidad, AppGreenway puede organizar evidencias e historial.',
    proofItems: ['Clasificación de flujos', 'Transporte autorizado', 'Destino o tratamiento correspondiente', 'Documentación disponible según el servicio'],
    portalRelevant: true,
    applicationsTitle: 'Residuos contemplados y contextos de uso',
    applicationsIntroduction: 'El alcance confirmado considera residuos reciclables, orgánicos y no reciclables generados en eventos u operaciones continuas.',
    applications: ['Residuos reciclables', 'Residuos orgánicos', 'Residuos no reciclables', 'Eventos', 'Operaciones continuas'],
    relatedSlugs: ['reciclaje', 'economia-circular'],
  },
  'huella-de-carbono': {
    slug: 'huella-de-carbono',
    eyebrow: 'Huella de Carbono',
    title: 'Huella de Carbono',
    metaTitle: 'Huella de Carbono',
    metaDescription: 'Medición de emisiones asociadas a eventos, estrategias de reducción y acompañamiento en compensación o procesos HuellaChile cuando corresponda.',
    heroDescription: 'Medimos, reducimos y neutralizamos las emisiones generadas en eventos, para ayudarte a organizar experiencias responsables y certificadas.',
    mediaLabel: 'Fotografía real del levantamiento de información de un evento pendiente de material aprobado.',
    introductionTitle: 'Huella de Carbono',
    introduction: 'Medimos, reducimos y neutralizamos las emisiones generadas en eventos, para ayudarte a organizar experiencias responsables y certificadas.',
    outcomes: [
      'Medición completa de la huella de carbono del evento: traslado, insumos, consumo energético y logística.',
      'Estrategias para reducir emisiones desde la planificación considerando servicios como la implementación de bicicleteros.',
      'Compensación con proyectos certificados (reforestación, energías limpias, entre otros).',
      'Entrega de sello de evento carbono neutral en caso de ser solicitado.',
      'Te acompañamos en la obtención de los sellos del programa Huella Chile del Ministerio del Medio Ambiente.',
    ],
    featureTitle: 'Qué puede incluir el servicio',
    featureIntroduction: 'El alcance se ajusta a las características del evento y a los objetivos definidos junto al cliente.',
    featureGroups: [
      {
        title: 'Medición',
        description: 'Levantamiento de las fuentes asociadas al evento dentro del alcance acordado.',
        items: ['Medición de huella', 'Traslado', 'Insumos', 'Consumo energético', 'Logística'],
      },
      {
        title: 'Reducción',
        description: 'Definición de acciones orientadas a reducir emisiones en la operación.',
        items: ['Estrategias de reducción', 'Medidas aplicables al evento', 'Bicicleteros como alternativa de movilidad'],
      },
      {
        title: 'Acompañamiento',
        description: 'Apoyo en etapas adicionales cuando forman parte del servicio solicitado.',
        items: ['Acompañamiento en procesos de compensación cuando corresponda', 'Acompañamiento en procesos relacionados con HuellaChile si es solicitado'],
      },
    ],
    steps: [
      { title: 'Contexto', description: 'Revisamos las características del evento y las fuentes que formarán parte de la medición.' },
      { title: 'Levantamiento', description: 'Organizamos información de traslados, insumos, consumo energético y logística.' },
      { title: 'Medición', description: 'Cuantificamos las emisiones asociadas al alcance definido para el evento.' },
      { title: 'Reducción', description: 'Proponemos estrategias y medidas que puedan aplicarse a la operación.' },
      { title: 'Acompañamiento', description: 'Apoyamos compensación o procesos relacionados con HuellaChile solo cuando son solicitados.' },
    ],
    proofTitle: 'Información para respaldar decisiones',
    proofDescription: 'La medición y las medidas definidas permiten revisar el impacto del evento con información organizada. Según el alcance contratado, AppGreenway puede centralizar informes, datos e historial del servicio.',
    proofItems: ['Fuentes de emisión consideradas', 'Información organizada del evento', 'Estrategias de reducción', 'Registro del servicio según alcance'],
    portalRelevant: true,
    applicationsTitle: '¿Cuándo considerar la medición?',
    applicationsIntroduction: 'Aplica a eventos que necesitan conocer sus emisiones asociadas, planificar reducciones o evaluar un proceso posterior de compensación.',
    applications: ['Eventos y espectáculos', 'Festivales', 'Producciones', 'Organizaciones que necesitan medición y trazabilidad ambiental'],
    relatedSlugs: ['energias-renovables', 'movilidad-sostenible'],
  },
  'energias-renovables': {
    slug: 'energias-renovables',
    eyebrow: 'Energías renovables',
    title: 'Energía solar para eventos, faenas y zonas remotas',
    metaTitle: 'Energía solar para eventos, faenas y zonas remotas',
    metaDescription: 'Carro solar de 8 kW y torre de iluminación solar autónoma para eventos, faenas y zonas remotas, con baterías de litio y sin combustible.',
    heroDescription: 'Llevamos soluciones de energía e iluminación solar al lugar de la operación para reducir el uso de generadores a combustión.',
    mediaLabel: 'Fotografía real del carro solar y la torre de iluminación pendiente de material aprobado.',
    introductionTitle: 'Energía donde la operación la necesita',
    introduction: 'Greenway dispone de un carro solar de arrastre y una torre de iluminación solar autónoma. Ambas soluciones están pensadas para apoyar operaciones temporales con energía almacenada en baterías de litio.',
    outcomes: [
      'Disponer de generación solar directamente en el lugar de operación.',
      'Reducir el uso de generadores a combustión.',
      'Iluminar operaciones nocturnas mediante un sistema autónomo.',
      'Adaptar la solución a eventos, faenas o zonas remotas.',
    ],
    featureTitle: 'Energías renovables',
    featureIntroduction: 'Equipos solares autónomos para entregar energía e iluminación directamente en el lugar de cada operación.',
    featureGroups: [],
    solutions: [
      {
        title: 'Energía Solar On Site',
        description: 'Ofrecemos soluciones energéticas limpias y eficientes mediante nuestro carro solar de arrastre de 8 kW, especialmente diseñado para operar en terreno.',
        details: [
          'La unidad cuenta con 16 paneles fotovoltaicos de 580 W, un inversor de 10 kW y 4 baterías de litio de 4.800 Wh (48 V, 100 Ah), para suministrar energía continua durante el día y la noche.',
          'Es ideal para eventos, faenas y zonas remotas que requieren autonomía energética. Ayuda a reducir el uso de generadores a combustión y la huella de carbono de la operación.',
        ],
        mediaLabel: 'Fotografía real del carro solar Greenway pendiente de material aprobado.',
        specs: [
          { value: '8 kW', label: 'Carro solar de arrastre' },
          { value: '16 × 580 W', label: 'Paneles fotovoltaicos' },
          { value: '10 kW', label: 'Inversor' },
          { value: '4 × 4.800 Wh', label: 'Baterías de litio' },
          { value: '48 V / 100 Ah', label: 'Configuración de batería' },
        ],
        applications: ['Eventos', 'Faenas', 'Zonas remotas'],
      },
      {
        title: 'Torre de iluminación solar',
        description: 'Nuestra torre de iluminación solar LED es una solución energética autónoma, silenciosa y libre de emisiones de CO₂ y contaminantes locales.',
        details: [
          'No requiere combustible ni aceite, ya que no utiliza motores ni generadores. Funciona con corriente continua (24 V o 48 V), reduciendo los riesgos eléctricos durante la operación.',
          'Durante el día, sus paneles fotovoltaicos captan energía solar que se almacena en baterías de litio. Por la noche alimenta proyectores LED de hasta 16.000 lúmenes durante un período continuo de hasta 12 horas.',
        ],
        mediaLabel: 'Fotografía real de la torre de iluminación solar pendiente de material aprobado.',
        specs: [
          { value: '16.000 lm', label: 'Iluminación de hasta' },
          { value: '≈ 12 h', label: 'Iluminación aproximada' },
          { value: '6 m', label: 'Mástil extensible' },
          { value: 'LED', label: 'Tecnología de iluminación' },
          { value: 'Sin combustible', label: 'Operación' },
        ],
        applications: ['Eventos y operaciones nocturnas', 'Faenas', 'Zonas remotas'],
      },
    ],
    steps: [
      { title: 'Diagnóstico', description: 'Revisamos el contexto, el lugar de uso y las necesidades de la operación.' },
      { title: 'Planificación', description: 'Definimos cuál de las soluciones confirmadas responde al proyecto.' },
      { title: 'Coordinación', description: 'Organizamos la incorporación del equipo en el lugar de operación.' },
      { title: 'Implementación', description: 'Ponemos la solución a disposición de la operación según el alcance acordado.' },
      { title: 'Seguimiento', description: 'Revisamos la ejecución y la información disponible del servicio.' },
    ],
    proofTitle: 'Especificaciones claras para evaluar la solución',
    proofDescription: 'La evaluación parte por las necesidades del proyecto y las características técnicas confirmadas de cada equipo. La cotización debe definir el alcance operativo y la configuración aplicable.',
    proofItems: ['Potencia y configuración del carro solar', 'Capacidad de iluminación de la torre', 'Autonomía aproximada informada', 'Aplicación definida según el proyecto'],
    portalRelevant: false,
    applicationsTitle: 'Aplicaciones confirmadas',
    applicationsIntroduction: 'Las soluciones se consideran para operaciones temporales que requieren energía o iluminación directamente en el lugar.',
    applications: ['Eventos', 'Faenas', 'Zonas remotas', 'Operaciones nocturnas'],
    relatedSlugs: ['huella-de-carbono', 'movilidad-sostenible'],
  },
  limpieza: {
    slug: 'limpieza',
    eyebrow: 'Limpieza',
    title: 'Limpieza integral',
    metaTitle: 'Limpieza integral',
    metaDescription: 'Servicio de limpieza para eventos antes, durante y después, con personal capacitado, supervisión y coordinación directa con producción.',
    heroDescription: 'Ejecutamos limpieza profesional según tus requerimientos.',
    mediaLabel: 'Fotografía real del equipo Greenway realizando limpieza en un evento pendiente de material aprobado.',
    introductionTitle: 'Una operación de limpieza coordinada con la producción',
    introduction: 'Greenway organiza la limpieza de baños, zonas de comida, espacios comunes y áreas técnicas. El servicio se adapta al momento del evento y se coordina con producción para responder a las necesidades reales de la operación.',
    outcomes: [
      'Preparar los espacios antes de la apertura o inicio de la actividad.',
      'Mantener zonas críticas durante el desarrollo del evento.',
      'Coordinar personal, supervisión e insumos según los requerimientos.',
      'Responder a contingencias operacionales dentro del alcance acordado.',
    ],
    featureTitle: 'Qué puede incluir el servicio de limpieza',
    featureIntroduction: 'El alcance se define según los espacios, las etapas del evento y las necesidades comunicadas por producción.',
    featureGroups: [
      {
        title: 'Espacios',
        description: 'La planificación considera las distintas zonas que forman parte de la operación.',
        items: ['Limpieza general', 'Baños', 'Zonas de comida', 'Espacios comunes', 'Áreas técnicas'],
      },
      {
        title: 'Equipo y recursos',
        description: 'Los recursos se seleccionan según los requerimientos confirmados del proyecto.',
        items: ['Personal capacitado', 'Supervisión', 'Insumos', 'Herramientas', 'Maquinaria según requerimientos'],
      },
      {
        title: 'Coordinación operacional',
        description: 'La limpieza acompaña el ritmo real del evento y sus cambios.',
        items: ['Limpieza antes del evento', 'Limpieza durante el evento', 'Limpieza después del evento', 'Coordinación con producción', 'Manejo de residuos', 'Respuesta ante contingencias'],
      },
    ],
    steps: [
      { title: 'Diagnóstico', description: 'Revisamos espacios, momentos críticos y requerimientos informados por producción.' },
      { title: 'Planificación', description: 'Definimos tareas, recursos, insumos y necesidades de supervisión.' },
      { title: 'Preparación', description: 'Coordinamos la limpieza necesaria antes del inicio del evento.' },
      { title: 'Operación', description: 'Acompañamos el desarrollo del evento y respondemos a contingencias dentro del alcance.' },
      { title: 'Cierre', description: 'Realizamos las tareas posteriores definidas para entregar los espacios.' },
    ],
    proofTitle: 'Supervisión para mantener el servicio coordinado',
    proofDescription: 'La supervisión y la coordinación con producción permiten ajustar la ejecución a las condiciones del evento. La dotación, los tiempos y la maquinaria se confirman para cada proyecto y no se presentan como capacidades estándar.',
    proofItems: ['Plan de trabajo según requerimientos', 'Personal capacitado', 'Supervisión del servicio', 'Coordinación con producción'],
    portalRelevant: false,
    applicationsTitle: 'Zonas y etapas contempladas',
    applicationsIntroduction: 'El servicio puede planificarse para distintos espacios y momentos de un evento, según el alcance acordado.',
    applications: ['Antes, durante y después', 'Baños y zonas de comida', 'Espacios comunes', 'Áreas técnicas'],
    relatedSlugs: ['manejo-de-residuos', 'reciclaje'],
  },
  'economia-circular': {
    slug: 'economia-circular',
    eyebrow: 'Economía Circular',
    title: 'Economía Circular',
    metaTitle: 'Economía Circular',
    metaDescription: 'Identificación, clasificación, recuperación y trazabilidad de materiales reutilizables para extender su vida útil y evitar su disposición en rellenos.',
    heroDescription: 'Transformamos los eventos en espacios de consumo consciente, fomentando la reutilización y menor generación de residuos mediante el enfoque de economía circular.',
    mediaLabel: 'Fotografía real de materiales recuperados en un proyecto Greenway pendiente de aprobación.',
    introductionTitle: 'Economía Circular',
    introduction: 'Transformamos los eventos en espacios de consumo consciente, fomentando la reutilización y menor generación de residuos mediante el enfoque de economía circular.',
    outcomes: [
      'Diagnóstico inicial y propuesta de medidas de circularidad.',
      'Análisis del evento para propuesta de reducción de residuos.',
      'Reutilización de materiales escenográficos, señalética y elementos de montaje.',
      'Integración de proveedores sustentables y productos reutilizables.',
      'Actividades educativas, talleres o activaciones para público asistente.',
    ],
    featureTitle: 'Qué puede incluir una solución de economía circular',
    featureIntroduction: 'El alcance depende de los materiales presentes, las posibilidades de recuperación y los destinos confirmados para el proyecto.',
    featureGroups: [
      {
        title: 'Identificación',
        description: 'El proceso comienza reconociendo los materiales que pueden mantenerse en uso.',
        items: ['Identificación de materiales reutilizables', 'Clasificación', 'Evaluación del flujo disponible'],
      },
      {
        title: 'Recuperación y coordinación',
        description: 'La gestión conecta los materiales con alternativas de aprovechamiento.',
        items: ['Recuperación', 'Valorización', 'Coordinación con organizaciones o proyectos receptores'],
      },
      {
        title: 'Registro',
        description: 'La información disponible permite respaldar el recorrido de los materiales.',
        items: ['Registro del proceso', 'Trazabilidad', 'Reporte de resultados cuando corresponda'],
      },
    ],
    steps: [
      { title: 'Diagnóstico', description: 'Identificamos los materiales presentes y las condiciones del proyecto.' },
      { title: 'Clasificación', description: 'Ordenamos los materiales según sus posibilidades de recuperación.' },
      { title: 'Coordinación', description: 'Vinculamos los flujos con organizaciones o proyectos receptores cuando corresponde.' },
      { title: 'Recuperación', description: 'Gestionamos el proceso definido para extender la vida útil de los materiales.' },
      { title: 'Trazabilidad', description: 'Registramos el proceso y reportamos la información disponible según el servicio.' },
    ],
    proofTitle: 'Un proceso que debe poder seguirse',
    proofDescription: 'La trazabilidad permite registrar qué materiales participaron del proceso y cómo se coordinó su recuperación. Los resultados se reportan solo cuando existen datos confirmados dentro del alcance contratado.',
    proofItems: ['Materiales identificados', 'Clasificación realizada', 'Destino o proyecto receptor cuando corresponda', 'Reporte de resultados disponibles'],
    portalRelevant: true,
    applicationsTitle: '¿Cuándo aplica una solución circular?',
    applicationsIntroduction: 'Aplica cuando un evento u operación genera materiales aprovechables que pueden mantenerse en uso mediante recuperación, reutilización o valorización.',
    applications: ['Eventos y producciones', 'Empresas e instituciones', 'Materiales reutilizables', 'Flujos con alternativas de valorización'],
    relatedSlugs: ['reciclaje', 'manejo-de-residuos'],
  },
  'asesoria-ambiental': {
    slug: 'asesoria-ambiental',
    eyebrow: 'Asesoría Ambiental',
    title: 'Asesoría Ambiental',
    metaTitle: 'Asesoría Ambiental',
    metaDescription: 'Diagnóstico y planificación ambiental para eventos, empresas e instituciones, con acompañamiento adaptado a la implementación de cada proyecto.',
    heroDescription: 'Apoyamos a productoras, marcas y organizadores a tomar decisiones más sustentables a través de asesorías técnicas, con herramientas y diagnósticos profesionales.',
    mediaLabel: 'Fotografía real de una sesión de trabajo o diagnóstico ambiental Greenway pendiente de aprobación.',
    introductionTitle: 'Asesoría Ambiental',
    introduction: 'Apoyamos a productoras, marcas y organizadores a tomar decisiones más sustentables a través de asesorías técnicas, con herramientas y diagnósticos profesionales.',
    outcomes: [
      'Revisión de materiales y procesos desde la perspectiva de sustentabilidad.',
      'Elaboramos manuales de manejo de residuos y sustentabilidad para una mejor operación en terreno.',
      'Análisis de ciclo de vida (ACV) de escenografías, merchandising u otros elementos.',
      'Sugerencias para mejorar la trazabilidad, circularidad y eficiencia.',
      'Apoyo en cumplimiento de normativas ambientales vigentes.',
      'Trabajamos bajo los lineamientos de la ISO 20121 “Eventos sustentables”.',
    ],
    featureTitle: 'Áreas que puede abordar la asesoría',
    featureIntroduction: 'Los temas se seleccionan según el diagnóstico y los objetivos definidos con la empresa, institución o equipo organizador.',
    featureGroups: [
      {
        title: 'Diagnóstico y planificación',
        description: 'La asesoría parte por comprender el contexto antes de definir acciones.',
        items: ['Diagnóstico', 'Identificación de oportunidades', 'Planificación'],
      },
      {
        title: 'Gestión ambiental',
        description: 'El alcance puede conectar distintas áreas de la operación.',
        items: ['Gestión de residuos', 'Economía circular', 'Huella de carbono', 'Eficiencia energética', 'Movilidad sostenible'],
      },
      {
        title: 'Implementación',
        description: 'La solución puede incluir apoyo para llevar el plan a la práctica.',
        items: ['Capacitación', 'Acompañamiento en implementación'],
      },
    ],
    steps: [
      { title: 'Contexto', description: 'Revisamos las necesidades, objetivos y condiciones de la organización o evento.' },
      { title: 'Diagnóstico', description: 'Identificamos oportunidades dentro de las áreas acordadas.' },
      { title: 'Planificación', description: 'Ordenamos acciones y prioridades adaptadas al proyecto.' },
      { title: 'Capacitación', description: 'Incorporamos instancias de capacitación cuando forman parte del alcance.' },
      { title: 'Acompañamiento', description: 'Apoyamos la implementación de las acciones acordadas cuando es solicitado.' },
    ],
    proofTitle: 'Recomendaciones conectadas con un contexto concreto',
    proofDescription: 'La asesoría se adapta a las necesidades del cliente y evita presentar una metodología única para todos los proyectos. Los entregables y el acompañamiento se definen en la cotización.',
    proofItems: ['Diagnóstico del contexto', 'Oportunidades identificadas', 'Planificación adaptada', 'Acompañamiento según alcance'],
    portalRelevant: false,
    applicationsTitle: 'Asesoría para distintos tipos de organización',
    applicationsIntroduction: 'El servicio está orientado a equipos que necesitan ordenar, planificar o implementar acciones ambientales.',
    applications: ['Eventos y productoras', 'Empresas', 'Instituciones', 'Organizaciones con proyectos ambientales'],
    relatedSlugs: ['gestion-y-trazabilidad', 'huella-de-carbono'],
  },
  'gestion-y-trazabilidad': {
    slug: 'gestion-y-trazabilidad',
    eyebrow: 'Gestión y Trazabilidad',
    title: 'Gestión y trazabilidad ambiental con AppGreenway',
    metaTitle: 'Gestión y trazabilidad ambiental | AppGreenway',
    metaDescription: 'AppGreenway apoya la gestión y trazabilidad de servicios Greenway con informes, certificados, indicadores, fotografías e historial cuando corresponde.',
    heroDescription: 'Convertimos la información de los servicios contratados en registros organizados y trazables, con el apoyo de la plataforma AppGreenway.',
    mediaLabel: 'Captura real de AppGreenway pendiente de validación y aprobación del cliente.',
    introductionTitle: 'Una capacidad transversal para respaldar la gestión',
    introduction: 'AppGreenway apoya los servicios Greenway que requieren reportabilidad. La plataforma organiza información por evento o locación y no se presenta como un software independiente del servicio contratado.',
    outcomes: [
      'Centralizar información disponible de los servicios contratados.',
      'Organizar evidencias y documentos según el alcance.',
      'Consultar historial por evento o locación cuando corresponda.',
      'Transformar datos de terreno en información para revisar la gestión.',
    ],
    featureTitle: 'Información que puede organizar AppGreenway',
    featureIntroduction: 'Las capacidades disponibles dependen del servicio contratado. No todos los proyectos incluyen todos los registros.',
    featureGroups: [
      {
        title: 'Documentación',
        description: 'Respaldo disponible de los servicios que generan entregables documentales.',
        items: ['Informes', 'Certificados'],
      },
      {
        title: 'Datos y evidencia',
        description: 'Información obtenida durante la operación dentro del alcance acordado.',
        items: ['Datos de reciclaje', 'Indicadores', 'Evidencias fotográficas'],
      },
      {
        title: 'Consulta e historial',
        description: 'Organización de la información para facilitar su revisión posterior.',
        items: ['Historial', 'Información por evento', 'Información por locación'],
      },
    ],
    steps: [
      { title: 'Definición', description: 'Identificamos qué información genera el servicio contratado.' },
      { title: 'Registro', description: 'Organizamos los datos, documentos y evidencias disponibles.' },
      { title: 'Trazabilidad', description: 'Relacionamos la información con el evento o locación correspondiente.' },
      { title: 'Consulta', description: 'La información disponible puede revisarse dentro del historial del servicio.' },
      { title: 'Reporte', description: 'Presentamos los entregables definidos para el alcance contratado.' },
    ],
    proofTitle: 'Información respaldada, sin inventar resultados',
    proofDescription: 'AppGreenway presenta la información realmente generada por el servicio. Los informes, certificados, indicadores y evidencias dependen del alcance contratado y de los datos disponibles.',
    proofItems: ['Informes disponibles', 'Certificados según servicio', 'Indicadores y datos generados', 'Evidencias e historial'],
    portalRelevant: true,
    applicationsTitle: '¿Para qué servicios puede ser útil?',
    applicationsIntroduction: 'La plataforma apoya proyectos que necesitan reportabilidad, historial o información organizada por evento o locación.',
    applications: ['Servicios con reportabilidad', 'Eventos con datos y evidencias', 'Operaciones por locación', 'Organizaciones que necesitan historial'],
    relatedSlugs: ['reciclaje', 'asesoria-ambiental'],
  },
  'movilidad-sostenible': {
    slug: 'movilidad-sostenible',
    eyebrow: 'Movilidad Sostenible',
    title: 'Movilidad sostenible',
    metaTitle: 'Movilidad sostenible para eventos',
    metaDescription: 'Implementación de estacionamientos seguros para bicicletas y motos eléctricas, con organización, supervisión y apoyo a la movilidad interna de eventos.',
    heroDescription: 'Implementamos espacios seguros y organizados para estacionar bicicletas y motos eléctricas durante eventos.',
    mediaLabel: 'Fotografía real de bicicleteros y motos eléctricas Greenway pendiente de aprobación.',
    introductionTitle: 'Servicio de Movilidad Sostenible',
    introduction: 'Implementamos y gestionamos un espacio seguro, ordenado y habilitado para estacionar bicicletas o motos eléctricas durante el evento, contribuyendo a una movilidad más sustentable y a reducir la huella ambiental.',
    outcomes: [
      'Implementación de bicicleteros y/o motos eléctricas.',
      'Traslado e instalación.',
      'Demarcación y señalización del espacio.',
      'Organización del área de estacionamiento.',
      'Supervisión durante el evento.',
      'Desmontaje y retiro.',
      'Gestión de residuos asociados, si corresponde.',
      'Reporte de uso y número de bicicletas recibidas como indicador de sostenibilidad.',
    ],
    includesTitle: 'El servicio considera',
    includes: [
      { highlight: 'Implementación', description: 'de bicicleteros y/o motos eléctricas.' },
      { highlight: 'Traslado e instalación', description: 'de los equipos en el lugar definido.' },
      { highlight: 'Demarcación y señalización', description: 'para identificar y ordenar el espacio.' },
      { highlight: 'Organización del área', description: 'destinada al estacionamiento.' },
      { highlight: 'Supervisión', description: 'durante el evento.' },
      { highlight: 'Desmontaje y retiro', description: 'al finalizar la operación.' },
      { highlight: 'Gestión de residuos asociados', description: 'cuando corresponda.' },
      { highlight: 'Reporte de uso', description: 'con el número de bicicletas recibidas como indicador de sostenibilidad.' },
    ],
    closingParagraphs: [
      'Ponemos a disposición motos eléctricas sin emisiones directas durante su uso, para facilitar la movilidad interna y la logística operativa en eventos masivos, ferias, rodajes y producciones en terreno.',
      'Son una alternativa silenciosa y eficiente para los desplazamientos del personal de producción, seguridad, limpieza u organización, sin generar ruido ni emisiones locales durante su funcionamiento.',
      'El servicio incluye entrega en terreno, carga previa, mantención básica y asistencia técnica durante el evento.',
      'Contribuye a una gestión más limpia, moderna y responsable con el entorno, integrando la movilidad eléctrica como parte de la experiencia sustentable del evento.',
    ],
    featureTitle: 'Soluciones confirmadas de movilidad',
    featureIntroduction: 'La cantidad, capacidad y configuración se definen para cada proyecto y no se presentan como valores estándar.',
    featureGroups: [
      {
        title: 'Bicicleteros',
        description: 'Infraestructura para ordenar el estacionamiento de bicicletas.',
        items: ['Estacionamiento seguro', 'Estacionamiento organizado', 'Incentivo de movilidad sostenible'],
      },
      {
        title: 'Registro cuando corresponde',
        description: 'El servicio puede incorporar información de uso si forma parte del alcance.',
        items: ['Posibilidad de registrar uso'],
      },
      {
        title: 'Movilidad interna',
        description: 'Alternativa para apoyar desplazamientos del equipo dentro del recinto.',
        items: ['Motos eléctricas', 'Desplazamientos de producción y logística', 'Aplicación en eventos y recintos extensos'],
      },
    ],
    steps: [
      { title: 'Contexto', description: 'Revisamos el recinto, los usuarios y la necesidad de movilidad.' },
      { title: 'Planificación', description: 'Definimos la solución aplicable sin asumir capacidades no confirmadas.' },
      { title: 'Coordinación', description: 'Organizamos la incorporación de bicicleteros y motos eléctricas.' },
      { title: 'Implementación', description: 'Disponemos la solución en los espacios acordados.' },
      { title: 'Registro', description: 'Documentamos el uso solo cuando esta capacidad forma parte del servicio.' },
    ],
    proofTitle: 'Movilidad ordenada durante el evento',
    proofDescription: 'Coordinamos la instalación, organización y supervisión del espacio. Al cierre, el reporte puede registrar el uso y la cantidad de bicicletas recibidas.',
    proofItems: ['Estacionamiento seguro y señalizado', 'Supervisión durante el evento', 'Retiro de la instalación', 'Reporte de uso y bicicletas recibidas'],
    portalRelevant: false,
    applicationsTitle: 'Aplicaciones de movilidad',
    applicationsIntroduction: 'Las soluciones atienden necesidades de estacionamiento de bicicletas y desplazamiento interno.',
    applications: ['Eventos masivos y ferias', 'Rodajes y producciones', 'Estacionamiento de bicicletas', 'Movilidad interna del equipo'],
    relatedSlugs: ['huella-de-carbono', 'energias-renovables'],
  },
  'sustentabilidad-audiovisual': {
    slug: 'sustentabilidad-audiovisual',
    eyebrow: 'Sustentabilidad Audiovisual',
    title: 'Sustentabilidad para la industria audiovisual',
    metaTitle: 'Sustentabilidad para la industria audiovisual',
    metaDescription: 'Acompañamiento ambiental para productoras, agencias y equipos de filmación, desde la preproducción hasta la postproducción.',
    heroDescription: 'Apoyamos a productoras, agencias y equipos de filmación en la incorporación de prácticas sustentables durante todo el proceso audiovisual.',
    mediaLabel: 'Fotografía real de una producción audiovisual acompañada por Greenway pendiente de aprobación.',
    introductionTitle: 'Sustentabilidad para industria audiovisual',
    introduction: 'Apoyamos a productoras, agencias y equipos de filmación en la incorporación de prácticas sustentables a lo largo de todo el proceso de producción audiovisual.',
    introductionDetails: [
      'Realizamos diagnósticos ambientales integrales en etapas de preproducción, rodaje y postproducción, con el objetivo de identificar oportunidades concretas para reducir el impacto ambiental de cada proyecto.',
      'Durante las jornadas de rodaje, implementamos sistemas de gestión y reducción de residuos, promoviendo la economía circular y buenas prácticas en terreno.',
      'Además, ofrecemos la medición de huella de carbono bajo la herramienta Albert, una plataforma validada y reconocida por la industria audiovisual a nivel internacional, que permite reportar de manera transparente y confiable el impacto generado.',
      'Con este servicio, buscamos que cada producción avance hacia un modelo más eficiente, responsable y alineado con los desafíos ambientales actuales.',
    ],
    outcomes: [
      'Incorporar criterios ambientales desde la planificación.',
      'Ordenar la gestión de residuos durante la producción.',
      'Promover el uso eficiente de recursos, energía y movilidad.',
      'Acompañar la implementación durante la producción.',
    ],
    featureTitle: 'Áreas que puede abordar el servicio',
    featureIntroduction: 'El alcance se adapta a la producción y a sus necesidades operacionales, sin asumir certificaciones específicas de la industria.',
    featureGroups: [
      {
        title: 'Planificación ambiental',
        description: 'Los criterios ambientales se integran al contexto de la producción.',
        items: ['Planificación ambiental', 'Reducción de impactos'],
      },
      {
        title: 'Operación y recursos',
        description: 'El servicio puede abordar áreas concretas durante la ejecución.',
        items: ['Gestión de residuos', 'Uso eficiente de recursos', 'Energía', 'Movilidad'],
      },
      {
        title: 'Acompañamiento',
        description: 'Apoyo para mantener los criterios definidos durante la producción.',
        items: ['Acompañamiento durante producción'],
      },
    ],
    steps: [
      { title: 'Contexto', description: 'Revisamos la producción, sus locaciones y necesidades ambientales.' },
      { title: 'Planificación', description: 'Definimos criterios y acciones adaptados a la operación.' },
      { title: 'Coordinación', description: 'Conectamos las acciones con las áreas involucradas en la producción.' },
      { title: 'Acompañamiento', description: 'Apoyamos la implementación durante la producción según el alcance.' },
      { title: 'Cierre', description: 'Revisamos la información disponible y los aprendizajes del proyecto.' },
    ],
    proofTitle: 'Acompañamiento ambiental en condiciones reales',
    proofDescription: 'La solución se diseña para la producción específica. No se atribuyen sellos ni certificaciones audiovisuales; el respaldo se limita a las acciones y entregables acordados.',
    proofItems: ['Planificación adaptada', 'Áreas ambientales abordadas', 'Acompañamiento en producción', 'Entregables según alcance'],
    portalRelevant: false,
    applicationsTitle: '¿Para quién está pensado?',
    applicationsIntroduction: 'Está orientado a equipos que necesitan incorporar criterios ambientales a una producción audiovisual.',
    applications: ['Rodajes', 'Producciones audiovisuales', 'Locaciones', 'Equipos de producción'],
    relatedSlugs: ['asesoria-ambiental', 'manejo-de-residuos'],
  },
};

export function isDetailedServiceSlug(slug: string): slug is keyof typeof servicePages {
  return slug in servicePages;
}
