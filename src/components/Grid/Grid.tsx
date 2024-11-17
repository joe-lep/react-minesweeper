import { useMemo } from "react";
import Row from "./Row";
import './Grid.scss';
import { useGameConfig, useGamePhase } from "../GameManager";
import { TransformComponent } from "react-zoom-pan-pinch";
import { GAME_IN_PROGRESS } from "../../config/game-phases";
import clsx from "clsx";

export default function Grid() {
  const { width, height } = useGameConfig();
  const gamePhase = useGamePhase();

  const renderedRows = useMemo(
    () => Array.from({ length: height }).map((_, index) => (
      <Row key={`${index}x${width}`} rowIndex={index} width={width} />
    )),
    [width, height]
  );

  return (
    <div className="grid-container">
      <div className="grid-container-inner">
        <TransformComponent wrapperClass="grid-transform-wrapper">
          <div className={clsx('grid', { active: gamePhase === GAME_IN_PROGRESS })}>
            {renderedRows}
          </div>
        </TransformComponent>
      </div>
    </div>
  );
}
