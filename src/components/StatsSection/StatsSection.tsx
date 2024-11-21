import { useFlagCount, useGameConfig, useGamePhase, useMinePositions } from '../GameManager';
import ElapsedTimeDisplay from './ElapsedTimeDisplay';
import RemainingMinesDisplay from './RemainingMinesDisplay';
import './StatsSection.scss';

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
