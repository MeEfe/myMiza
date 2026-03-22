interface DonutChartProps {
  totalFixed: number;
  totalVariable: number;
}

const GOLD = "oklch(0.7800 0.1300 80)";
const DIM = "oklch(0.2900 0.0420 278)";
const R = 54;
const CX = 80;
const CY = 80;
const CIRCUMFERENCE = 2 * Math.PI * R;

export function BillsDonutChart({ totalFixed, totalVariable }: DonutChartProps) {
  const total = totalFixed + totalVariable;
  const fixedPct = total > 0 ? totalFixed / total : 0;
  const fixedDash = fixedPct * CIRCUMFERENCE;

  return (
    <svg viewBox="0 0 160 160" width="160" height="160">
      {/* Track */}
      <circle cx={CX} cy={CY} r={R} fill="none" stroke={DIM} strokeWidth={14} />
      {/* Fixed arc */}
      <circle
        cx={CX} cy={CY} r={R}
        fill="none"
        stroke={GOLD}
        strokeWidth={14}
        strokeDasharray={`${fixedDash} ${CIRCUMFERENCE - fixedDash}`}
        strokeDashoffset={CIRCUMFERENCE / 4}
        strokeLinecap="round"
      />
      {/* Center text */}
      <text x={CX} y={CY - 8} textAnchor="middle" fontSize={9} fill="oklch(0.5800 0.0400 270)" fontFamily="DM Sans, sans-serif">
        Total
      </text>
      <text x={CX} y={CY + 6} textAnchor="middle" fontSize={13} fontWeight="600" fill="oklch(0.9400 0.0100 270)" fontFamily="DM Sans, sans-serif">
        €{total.toLocaleString("de-DE", { minimumFractionDigits: 0 })}
      </text>
    </svg>
  );
}
