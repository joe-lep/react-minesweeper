export interface RemainingMinesDisplayProps {
  mineCount: number
  flagCount: number
}

export default function RemainingMinesDisplay({ mineCount, flagCount }: RemainingMinesDisplayProps) {
  return (
    <div className="remaining-mine-display">
      <span className="remaining-mine-display--label">M:{' '}</span>
      <span className="remaining-mine-display--count">{mineCount - flagCount}</span>
    </div>
  );
}
