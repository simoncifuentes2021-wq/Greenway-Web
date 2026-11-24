/** Editorial relationships based on the existing service scopes, never inferred randomly. */
export const serviceRelations = [
  ['reciclaje', 'manejo-de-residuos'],
  ['reciclaje', 'economia-circular'],
  ['manejo-de-residuos', 'economia-circular'],
  ['huella-de-carbono', 'gestion-y-trazabilidad'],
  ['asesoria-ambiental', 'huella-de-carbono'],
  ['energias-renovables', 'huella-de-carbono'],
  ['sustentabilidad-audiovisual', 'manejo-de-residuos'],
  ['movilidad-sostenible', 'huella-de-carbono'],
] as const;

export function areServicesRelated(first: string, second: string) {
  return serviceRelations.some(([a, b]) => a === first && b === second || a === second && b === first);
}
