import './StatsSection.scss';
import { useFlagCount, useGameConfig, useGamePhase, useMinePositions } from '@/components/GameManager';
import ElapsedTimeDisplay from './ElapsedTimeDisplay';
import RemainingMinesDisplay from './RemainingMinesDisplay';

export default function StatsSection() {
  const { mineCount } = useGameConfig();
  const flagCount = useFlagCount();
  const gamePhase = useGamePhase();
  const minePositions = useMinePositions();

  return (
    <div className="stats-container">
      <ElapsedTimeDisplay gamePhase={gamePhase} minePositions={minePositions} />
      <RemainingMinesDisplay gamePhase={gamePhase} mineCount={mineCount} flagCount={flagCount} />
    </div>
  );
}
