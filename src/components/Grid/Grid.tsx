import clsx from 'clsx';
import { TransformComponent } from 'react-zoom-pan-pinch';
import { useMemo } from 'react';

import './Grid.scss';
import { useGameConfig, useGamePhase } from '@/components/GameManager';
import { GAME_IN_PROGRESS } from '@/config/game-phases';
import Row from './Row';

export default function Grid() {
  const { width, height, mineCount } = useGameConfig();
  const gamePhase = useGamePhase();

  const renderedRows = useMemo(
    () => Array.from({ length: height }).map((_, index) => (
      <Row key={`${index}x${width}`} rowIndex={index} width={width} />
    )),
    [width, height],
  );

  return (
    <div id="grid-container-area" className="grid-container">
      <div className="grid-container-inner">
        <TransformComponent wrapperClass="grid-transform-wrapper">
          <div className={clsx('grid', { active: gamePhase === GAME_IN_PROGRESS, unpopulated: mineCount === 0 })}>
            {renderedRows}
          </div>
        </TransformComponent>
      </div>
      <div className="inset-shadow-caster" />
    </div>
  );
}
