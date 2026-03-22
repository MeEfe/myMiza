interface Slice {
  label: string;
  value: number;
  color: string;
}

interface BillsPieChartProps {
  slices: Slice[];
}

const CX = 90;
const CY = 90;
const R = 72;
const GAP = 0.03; // radians gap between slices

function polarToXY(angle: number, r: number) {
  return {
    x: CX + r * Math.cos(angle),
    y: CY + r * Math.sin(angle),
  };
}

function slicePath(startAngle: number, endAngle: number): string {
  const start = polarToXY(startAngle + GAP / 2, R);
  const end = polarToXY(endAngle - GAP / 2, R);
  const largeArc = endAngle - startAngle - GAP > Math.PI ? 1 : 0;
  return [
    `M ${CX} ${CY}`,
    `L ${start.x} ${start.y}`,
    `A ${R} ${R} 0 ${largeArc} 1 ${end.x} ${end.y}`,
    "Z",
  ].join(" ");
}

export function BillsPieChart({ slices }: BillsPieChartProps) {
  const total = slices.reduce((s, sl) => s + sl.value, 0);
  if (total === 0) return null;

  let cursor = -Math.PI / 2; // start at 12 o'clock
  const rendered = slices.map((sl) => {
    const sweep = (sl.value / total) * 2 * Math.PI;
    const path = slicePath(cursor, cursor + sweep);
    const midAngle = cursor + sweep / 2;
    cursor += sweep;
    return { ...sl, path, midAngle, sweep };
  });

  return (
    <svg viewBox="0 0 180 180" width="180" height="180">
      {rendered.map((sl) => (
        <path
          key={sl.label}
          d={sl.path}
          fill={sl.color}
          fillOpacity={0.9}
          stroke="oklch(0.2000 0.0400 278)"
          strokeWidth={1}
        />
      ))}
      {/* Center label */}
      <circle cx={CX} cy={CY} r={32} fill="oklch(0.2000 0.0400 278)" />
      <text x={CX} y={CY - 7} textAnchor="middle" fontSize={8} fill="oklch(0.5800 0.0400 270)" fontFamily="DM Sans, sans-serif">
        Total
      </text>
      <text x={CX} y={CY + 7} textAnchor="middle" fontSize={11} fontWeight="600" fill="oklch(0.9400 0.0100 270)" fontFamily="DM Sans, sans-serif">
        €{total.toLocaleString("de-DE", { maximumFractionDigits: 0 })}
      </text>
    </svg>
  );
}
