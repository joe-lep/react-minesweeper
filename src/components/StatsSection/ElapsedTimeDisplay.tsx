import { useEffect, useRef } from "react";
import { GAME_IN_PROGRESS, GAME_LOST, GAME_WON } from "../../config/game-phases";
import { StopWatchApi } from "../../types";
import StopWatch from "./StopWatch";
import StopWatchVector from '../../assets/stopwatch.svg?react';
import clsx from "clsx";

export interface ElapsedTimeDisplayProps {
  gamePhase: string
  minePositions: unknown // type doesn't matter, we're just checking for changes
}

export default function ElapsedTimeDisplay({ gamePhase, minePositions }: ElapsedTimeDisplayProps) {
  const stopWatchApi = useRef<StopWatchApi>(null);

  useEffect(
    () => {
      if (stopWatchApi.current) {
        if (gamePhase === GAME_IN_PROGRESS) {
          stopWatchApi.current.start();
        }
        else {
          stopWatchApi.current.pause();
        }
      }
    },
    [stopWatchApi, gamePhase]
  );

  // reset timer if new game board has been rolled
  useEffect(
    () => {
      console.log('reset');
      stopWatchApi.current?.reset();
    },
    [minePositions, stopWatchApi],
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
