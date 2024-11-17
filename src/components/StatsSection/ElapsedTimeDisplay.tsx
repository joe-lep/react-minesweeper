import { useEffect, useRef } from "react";
import { GAME_IN_PROGRESS, GAME_LOST, GAME_WON } from "../../config/game-phases";
import { StopWatchApi } from "../../types";
import StopWatch from "./StopWatch";
import StopWatchVector from '../../assets/stopwatch.svg?react';
import clsx from "clsx";

export interface ElapsedTimeDisplayProps {
  gamePhase: string
}

export default function ElapsedTimeDisplay({ gamePhase }: ElapsedTimeDisplayProps) {
  const stopWatchApi = useRef<StopWatchApi>(null);

  useEffect(
    () => {
      if (stopWatchApi.current) {
        if (gamePhase === GAME_IN_PROGRESS) {
          stopWatchApi.current.reset();
          stopWatchApi.current.start();
        }
        else {
          stopWatchApi.current.pause();
        }
      }
    },
    [stopWatchApi, gamePhase]
  );

  return (
    <div className={clsx('stat-display', 'elapsed-time-display', { won: gamePhase === GAME_WON, lost: gamePhase === GAME_LOST })}>
      <span className="stat-label">
        <StopWatchVector />
      </span>
      <span className="stat-value">
        <StopWatch apiRef={stopWatchApi} />
      </span>
    </div>
  );
}
