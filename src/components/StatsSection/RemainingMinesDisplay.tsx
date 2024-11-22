import { GAME_WON } from '@/config/game-phases';

import MineVector from '@/assets/mine.svg?react';

export interface RemainingMinesDisplayProps {
  gamePhase: string;
  mineCount: number;
  flagCount: number;
}

export default function RemainingMinesDisplay({ gamePhase, mineCount, flagCount }: RemainingMinesDisplayProps) {
  return (
    <div className="stat-display remaining-mine-display">
      <span className="stat-label"><MineVector /></span>
      <span className="stat-value">{gamePhase === GAME_WON ? 0 : mineCount - flagCount}</span>
    </div>
  );
}
