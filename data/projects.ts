export type ProjectMetric = {
  label: string;
  value: string;
};

export type ProjectPhoto = {
  src: string;
  alt: string;
};

export type ProjectCase = {
  name: string;
  slug: string;
  clientOrEvent: string;
  date: string;
  location: string;
  services: string[];
  challenge: string;
  solution: string;
  photos: ProjectPhoto[];
  metrics: ProjectMetric[];
  results: string[];
  evidence: string[];
  ctaLabel: string;
  approved: boolean;
  indexable: boolean;
};

// Agregar casos únicamente cuando nombre, contenido, evidencia y publicación estén aprobados.
export const approvedProjects: ProjectCase[] = [];
