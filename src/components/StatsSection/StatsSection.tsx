import { useFlagCount, useGameConfig } from '../GameManager';
import RemainingMinesDisplay from './RemainingMinesDisplay';
import './StatsSection.css';

export default function StatsSection() {
  const { mineCount } = useGameConfig();
  const flagCount = useFlagCount();

  return (
    <div className="stats-container">
      <div>Timer</div>
      {<RemainingMinesDisplay mineCount={mineCount} flagCount={flagCount} />}
    </div>
  );
}
