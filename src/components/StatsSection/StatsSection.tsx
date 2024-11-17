import { useFlagCount, useGameConfig, useGamePhase } from '../GameManager';
import ElapsedTimeDisplay from './ElapsedTimeDisplay';
import RemainingMinesDisplay from './RemainingMinesDisplay';
import './StatsSection.scss';

export default function StatsSection() {
  const { mineCount } = useGameConfig();
  const flagCount = useFlagCount();
  const gamePhase = useGamePhase();

  return (
    <div className="stats-container">
      <ElapsedTimeDisplay gamePhase={gamePhase} />
      <RemainingMinesDisplay mineCount={mineCount} flagCount={flagCount} />
    </div>
  );
}
