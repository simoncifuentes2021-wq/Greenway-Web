export type TemporaryVisual = {
  src: string;
  alt: string;
  objectPosition?: string;
};

export const temporaryVisuals = {
  operations: {
    src: '/media/temporary/greenway-operations.jpg',
    alt: 'Visual referencial de una operación de separación de residuos en un evento.',
  },
  fieldAssessment: {
    src: '/media/temporary/greenway-field-assessment.jpg',
    alt: 'Visual referencial de una evaluación ambiental realizada durante el montaje de un evento.',
    objectPosition: 'center',
  },
  cleanEnergy: {
    src: '/media/temporary/greenway-clean-energy.jpg',
    alt: 'Visual referencial de una solución energética solar instalada en un evento.',
  },
  audiovisual: {
    src: '/media/temporary/greenway-audiovisual.jpg',
    alt: 'Visual referencial de gestión ambiental integrada a una producción audiovisual.',
  },
  team: {
    src: '/media/temporary/greenway-team.jpg',
    alt: 'Visual referencial de un equipo ambiental coordinando una operación en terreno.',
  },
} satisfies Record<string, TemporaryVisual>;

export const temporaryServiceVisuals: Record<string, TemporaryVisual> = {
  reciclaje: temporaryVisuals.operations,
  limpieza: temporaryVisuals.operations,
  'economia-circular': temporaryVisuals.operations,
  'manejo-de-residuos': temporaryVisuals.operations,
  'huella-de-carbono': temporaryVisuals.fieldAssessment,
  'asesoria-ambiental': temporaryVisuals.fieldAssessment,
  'gestion-y-trazabilidad': temporaryVisuals.fieldAssessment,
  'energias-renovables': temporaryVisuals.cleanEnergy,
  'movilidad-sostenible': temporaryVisuals.cleanEnergy,
  'sustentabilidad-audiovisual': temporaryVisuals.audiovisual,
};
