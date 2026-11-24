export type NavigationItem = { label: string; href: string };
export type Metric = { value: string; label: string; pending: boolean };
export type Service = { slug: string; name: string; shortName: string; description: string };

// TODO(cliente): definir el dominio público definitivo en NEXT_PUBLIC_SITE_URL.
export const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://greenway.invalid';

export const navigation: NavigationItem[] = [
  { label: 'Inicio', href: '/' },
  { label: 'Servicios', href: '/servicios' },
  { label: 'Proyectos', href: '/proyectos' },
  { label: 'Nosotros', href: '/nosotros' },
  { label: 'Empresas', href: '/empresas' },
];

export const metrics: Metric[] = [
  { value: '+10', label: 'Años de experiencia', pending: false },
  { value: '500+', label: 'Proyectos', pending: false },
  { value: '42.000', label: 'Residuos gestionados', pending: false },
  { value: '0', label: 'Emisiones reducidas', pending: true },
  { value: '200+', label: 'Clientes', pending: false },
];

export const services: Service[] = [
  { slug: 'reciclaje', name: 'Reciclaje', shortName: 'Reciclaje', description: 'Planificación y operación de puntos limpios para recuperar materiales durante cada proyecto.' },
  { slug: 'limpieza', name: 'Limpieza', shortName: 'Limpieza', description: 'Equipos y procesos de limpieza coordinados con las necesidades reales de cada operación.' },
  { slug: 'economia-circular', name: 'Economía Circular', shortName: 'Economía circular', description: 'Soluciones para extender la vida útil de materiales y devolver recursos a ciclos productivos.' },
  { slug: 'huella-de-carbono', name: 'Huella de Carbono', shortName: 'Huella de carbono', description: 'Medición y gestión del impacto climático con información útil para tomar decisiones.' },
  { slug: 'energias-renovables', name: 'Energías Renovables', shortName: 'Energías limpias', description: 'Alternativas energéticas de menor impacto adaptadas a eventos y operaciones temporales.' },
  { slug: 'asesoria-ambiental', name: 'Asesoría Ambiental', shortName: 'Asesoría', description: 'Acompañamiento técnico para definir objetivos, planes de acción y criterios ambientales.' },
  { slug: 'gestion-y-trazabilidad', name: 'Gestión y Trazabilidad', shortName: 'Trazabilidad', description: 'Registro y seguimiento de la operación para convertir datos de terreno en información verificable.' },
  { slug: 'manejo-de-residuos', name: 'Manejo de Residuos', shortName: 'Residuos', description: 'Gestión integral desde la segregación en origen hasta el destino de cada flujo.' },
  { slug: 'movilidad-sostenible', name: 'Movilidad Sostenible', shortName: 'Movilidad', description: 'Estrategias para reducir el impacto de los traslados asociados a personas y operación.' },
  { slug: 'sustentabilidad-audiovisual', name: 'Sustentabilidad Audiovisual', shortName: 'Audiovisual', description: 'Criterios y soluciones ambientales aplicados a rodajes, producciones y locaciones.' },
];

// TODO(cliente): completar estos datos antes de publicar.
export const contactInformation = { email: null, phone: null, address: null } as const;

// TODO(cliente): agregar únicamente perfiles oficiales confirmados.
export const socialLinks: NavigationItem[] = [];

// TODO(cliente): reemplazar por la URL confirmada de AppGreenway.
export const clientPortalUrl = '#portal-pendiente';
