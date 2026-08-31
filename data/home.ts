export type FeaturedArea = {
  number: string;
  title: string;
  description: string;
  href: string;
};

export type ProcessStep = {
  number: string;
  title: string;
  description: string;
};

export type ProjectPlaceholder = {
  slug: string;
  title: string;
  services: string[];
  pending: true;
};

export type EnergySolution = {
  title: string;
  description: string;
  specs: { value: string; label: string }[];
  mediaLabel: string;
};

export const featuredAreas: FeaturedArea[] = [
  {
    number: '01',
    title: 'Gestión ambiental',
    description: 'Reciclaje, manejo de residuos, economía circular y asesoría ambiental coordinados como una sola operación.',
    href: '/servicios/reciclaje',
  },
  {
    number: '02',
    title: 'Huella y trazabilidad',
    description: 'Medición ambiental, indicadores, evidencias y reportabilidad para respaldar cada decisión.',
    href: '/servicios/gestion-y-trazabilidad',
  },
  {
    number: '03',
    title: 'Energías limpias',
    description: 'Carro solar y torre de iluminación solar para operaciones temporales de menor impacto.',
    href: '/servicios/energias-renovables',
  },
  {
    number: '04',
    title: 'Movilidad sostenible',
    description: 'Bicicleteros y alternativas de movilidad eléctrica adaptadas a cada proyecto.',
    href: '/servicios/movilidad-sostenible',
  },
];

export const processSteps: ProcessStep[] = [
  { number: '01', title: 'Diagnóstico', description: 'Entendemos el contexto, los flujos y los objetivos del proyecto.' },
  { number: '02', title: 'Planificación', description: 'Diseñamos una solución técnica y operativa a la medida.' },
  { number: '03', title: 'Implementación', description: 'Coordinamos equipos, recursos y ejecución en terreno.' },
  { number: '04', title: 'Trazabilidad', description: 'Registramos datos, evidencias y el destino de cada flujo.' },
  { number: '05', title: 'Resultados', description: 'Entregamos información útil para evaluar y seguir mejorando.' },
];

// TODO(cliente): reemplazar estos registros cuando se aprueben proyectos reales.
export const featuredProjects: ProjectPlaceholder[] = [
  { slug: 'proyecto-principal-pendiente', title: 'Proyecto principal pendiente', services: ['Servicios por confirmar'], pending: true },
  { slug: 'proyecto-secundario-uno-pendiente', title: 'Proyecto destacado pendiente', services: ['Servicios por confirmar'], pending: true },
  { slug: 'proyecto-secundario-dos-pendiente', title: 'Proyecto destacado pendiente', services: ['Servicios por confirmar'], pending: true },
];

export const portalCapabilities = [
  'Informes de gestión ambiental',
  'Certificados',
  'Datos de reciclaje',
  'Indicadores',
  'Evidencias fotográficas',
  'Historial de servicios',
  'Información por evento',
];

export const energySolutions: EnergySolution[] = [
  {
    title: 'Energía Solar On Site',
    description: 'Energía renovable disponible directamente en el lugar de operación.',
    mediaLabel: 'Fotografía real del carro solar pendiente',
    specs: [
      { value: '8 kW', label: 'Carro solar' },
      { value: '16 × 580 W', label: 'Paneles fotovoltaicos' },
      { value: '10 kW', label: 'Inversor' },
      { value: '4 × 4.800 Wh', label: 'Baterías de litio' },
    ],
  },
  {
    title: 'Torre de iluminación solar',
    description: 'Iluminación autónoma para operaciones nocturnas sin consumo de combustible.',
    mediaLabel: 'Fotografía real de la torre solar pendiente',
    specs: [
      { value: '16.000 lm', label: 'Iluminación de hasta' },
      { value: '≈ 12 h', label: 'Autonomía aproximada' },
      { value: '6 m', label: 'Mástil extensible' },
      { value: 'Sin combustible', label: 'Operación' },
    ],
  },
];

export const impactMetrics = [
  { value: 'XX', label: 'Eventos y proyectos' },
  { value: 'XX ton', label: 'Residuos gestionados' },
  { value: 'XX %', label: 'Material recuperado' },
  { value: 'XX', label: 'Emisiones evitadas o reducidas' },
];

export const organizations = [
  'Universidad Andrés Bello',
  'Servicio de Cooperación Técnica',
  'Ministerio del Medio Ambiente',
  'Corporación Nacional Indígena',
];

export const differentiators = [
  { title: '+10 años de experiencia', description: 'Conocimiento acumulado en proyectos y operaciones ambientales.' },
  { title: 'Soluciones personalizadas', description: 'Cada plan responde a un contexto, una escala y objetivos específicos.' },
  { title: 'Equipo especializado', description: 'Capacidad técnica y operativa para acompañar cada etapa.' },
  { title: 'Capacidad de respuesta', description: 'Coordinación cercana para actuar donde el proyecto lo necesita.' },
  { title: 'Trazabilidad', description: 'Información verificable para respaldar resultados y decisiones.' },
  { title: 'Mejora continua', description: 'Aprendizaje aplicado para elevar el estándar de cada nueva operación.' },
];

// TODO(cliente): agregar logos únicamente después de recibir archivos y autorización.
export const approvedClientLogos: { name: string; src: string }[] = [];
