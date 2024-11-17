import MineVector from '../../assets/mine.svg?react';

export interface RemainingMinesDisplayProps {
  mineCount: number
  flagCount: number
}

export default function RemainingMinesDisplay({ mineCount, flagCount }: RemainingMinesDisplayProps) {
  return (
    <div className="stat-display remaining-mine-display">
      <span className="stat-label"><MineVector /></span>
      <span className="stat-value">{mineCount - flagCount}</span>
    </div>
  );
}
