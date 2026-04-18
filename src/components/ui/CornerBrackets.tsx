interface CornerBracketsProps {
  size?: number;
  thickness?: number;
  color?: string;
  gap?: number;
}

export default function CornerBrackets({
  size = 16,
  thickness = 1.5,
  color = 'currentColor',
  gap = 0,
}: CornerBracketsProps) {
  const s = `${size}px`;
  const t = `${thickness}px`;
  const g = `${gap}px`;
  const common: React.CSSProperties = { position: 'absolute', width: s, height: s };

  return (
    <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }} aria-hidden="true">
      <div style={{ ...common, top: g, left: g, borderTop: `${t} solid ${color}`, borderLeft: `${t} solid ${color}` }} />
      <div style={{ ...common, top: g, right: g, borderTop: `${t} solid ${color}`, borderRight: `${t} solid ${color}` }} />
      <div style={{ ...common, bottom: g, left: g, borderBottom: `${t} solid ${color}`, borderLeft: `${t} solid ${color}` }} />
      <div style={{ ...common, bottom: g, right: g, borderBottom: `${t} solid ${color}`, borderRight: `${t} solid ${color}` }} />
    </div>
  );
}
