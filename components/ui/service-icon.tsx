import type { SVGProps } from 'react';

type ServiceIconProps = SVGProps<SVGSVGElement> & {
  slug: string;
};

const iconPaths: Record<string, React.ReactNode> = {
  reciclaje: <><path d="M8.5 6.5 12 3l3.5 3.5"/><path d="M12 3v6"/><path d="m17.5 9 1.3 4.8-4.8 1.3"/><path d="m18.8 13.8-5.2-3"/><path d="m10 19-4.8-1.3L6.5 13"/><path d="m5.2 17.7 5.2-3"/></>,
  limpieza: <><path d="M5 19h14"/><path d="m8 19 1.1-8.5h5.8L16 19"/><path d="M10 7.5h4"/><path d="M12 4v3.5"/><path d="m17 6 .8-1.8M18.5 8.8l1.8-.8"/></>,
  'economia-circular': <><path d="M7 6.8A7 7 0 0 1 18.7 10"/><path d="m18.7 10-3.2-.7M18.7 10l.7-3.2"/><path d="M17 17.2A7 7 0 0 1 5.3 14"/><path d="m5.3 14 3.2.7M5.3 14l-.7 3.2"/><path d="M9 9h6v6H9z"/></>,
  'huella-de-carbono': <><path d="M8.5 18.5c-2.2 0-4-1.5-4-3.5 0-1.7 1.2-3 3-3.4.2-3.2 2-5.1 4.5-5.1 2.8 0 4.5 2.1 4.7 4.6 1.8.2 2.8 1.5 2.8 3.2 0 2.4-1.8 4.2-4.6 4.2"/><path d="M10 14h4M12 12v4"/></>,
  'energias-renovables': <><circle cx="17.5" cy="6.5" r="2.5"/><path d="M17.5 2v1.5M17.5 9.5V11M13 6.5h1.5M20.5 6.5H22"/><path d="m5 12 10-1 2 8H7z"/><path d="m10 11.5.8 7M14 11l.8 7M6 15h10"/></>,
  'asesoria-ambiental': <><path d="M5 4h14v16H5z"/><path d="M8 8h8M8 12h5M8 16h3"/><path d="m15 15 1.5 1.5L20 13"/></>,
  'gestion-y-trazabilidad': <><circle cx="6" cy="7" r="2"/><circle cx="18" cy="6" r="2"/><circle cx="17" cy="18" r="2"/><circle cx="7" cy="17" r="2"/><path d="m8 7 8-1M18 8v8M15 18l-6-1M6 15V9M8 9l7 6"/></>,
  'manejo-de-residuos': <><path d="M5 8h14l-1 12H6z"/><path d="M4 8h16M9 8V5h6v3M9 12v4M15 12v4"/></>,
  'movilidad-sostenible': <><circle cx="6.5" cy="17" r="3.5"/><circle cx="17.5" cy="17" r="3.5"/><path d="m6.5 17 4-7h4l3 7M10.5 10l3 7M8 7h3M14.5 10l2-3"/></>,
  'sustentabilidad-audiovisual': <><rect x="4" y="7" width="12" height="10" rx="1"/><path d="m16 10 4-2v8l-4-2z"/><path d="M8 12c1.2-1.8 3.8-1.8 5 0-1.2 1.8-3.8 1.8-5 0Z"/></>,
};

export function ServiceIcon({ slug, className = '', ...props }: ServiceIconProps) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.55"
      strokeLinecap="round"
      strokeLinejoin="round"
      focusable="false"
      vectorEffect="non-scaling-stroke"
      className={className}
      {...props}
    >
      {iconPaths[slug] ?? iconPaths.reciclaje}
    </svg>
  );
}
