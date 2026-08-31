export function EcosystemSignal({ x, y }: { x: number; y: number }) {
  const nodeX = x * 10;
  const nodeY = y * 10;

  return (
    <g aria-hidden="true">
      <path d={`M ${nodeX} ${nodeY} L 500 500`} pathLength="1" className="ecosystem-signal-line" />
      <circle cx="500" cy="500" r="347" pathLength="1" className="ecosystem-signal-ring" />
    </g>
  );
}
