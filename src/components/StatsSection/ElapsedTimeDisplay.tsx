import { useEffect, useMemo, useRef } from "react";
import { GAME_IN_PROGRESS, GAME_LOST, GAME_WON } from "../../config/game-phases";
import { StopWatchApi } from "../../types";
import StopWatch from "./StopWatch";

export interface ElapsedTimeDisplayProps {
  gamePhase: string
}

export default function ElapsedTimeDisplay({ gamePhase }: ElapsedTimeDisplayProps) {
  const timeLabelContents = useMemo(
    () => {
      if (gamePhase === GAME_WON) {
        return 'W';
      }
      if (gamePhase === GAME_LOST) {
        return 'L';
      }

      return 'T';
    },
    [gamePhase],
  );

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
    <div className="elapsed-time-display">
      <span className="elapsed-time-display--label">
        {timeLabelContents}:{' '}
      </span>
      <span className="elapsed-time-display--time">
        <StopWatch apiRef={stopWatchApi} />
      </span>
    </div>
  );
}
