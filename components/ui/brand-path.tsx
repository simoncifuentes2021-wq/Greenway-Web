import { GreenwayFlow } from '@/components/living-system/greenway-flow';

/** Compatibility for quiet chapters. All geometry and inputs now share one system. */
export function BrandPath({ className = '' }: { className?: string }) {
  return <GreenwayFlow className={className} variant="connection" />;
}
