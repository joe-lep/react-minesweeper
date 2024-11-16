import { useCallback, useContext, useMemo } from "react";
import { GameConfig } from "../../types";
import gameContext from "./context";
import { GAME_IN_PROGRESS } from "../../config/game-phases";
import { DIG_MODE, FLAG_MODE } from "../../config/action-modes";
import { TOTAL_FLAG_OPTIONS, YES_FLAG } from "../../config/flags";

export const useGameConfig: () => GameConfig = () => {
  const { width, height, mineCount } = useContext(gameContext);

  return useMemo(() => ({ width, height, mineCount }), [width, height, mineCount]);
};

export const useInitializeGameConfig = () => useContext(gameContext).initializeGameConfig;

export const useCellContext = (row: number, column: number) => {
  const { revealedCells, revealCell, width, minePositions, neighborCounts, flagState, updateCellFlag, gamePhase, actionMode } = useContext(gameContext);
  const cellIndex = row * width + column;

  const isRevealed = revealedCells[cellIndex] ?? false;
  const hasMine = minePositions[cellIndex] ?? false;
  const neighboringMineCount = neighborCounts[cellIndex];
  const cellFlag = flagState[cellIndex] ?? 0;

  const handleCellClick = useCallback(
    (isRightClick = false) => {
      if (gamePhase !== GAME_IN_PROGRESS) {
        return;
      }

      if (isRevealed) {
        return;
      }

      if (actionMode === FLAG_MODE || isRightClick) {
        updateCellFlag(row, column, (cellFlag + 1) % TOTAL_FLAG_OPTIONS)
      }
      else if (actionMode === DIG_MODE) {
        if (cellFlag === YES_FLAG) {
          return;
        }

        revealCell(row, column);
      }
    },
    [row, column, gamePhase, isRevealed, actionMode, cellFlag, revealCell, updateCellFlag],
  )

  return useMemo(
    () => ({ isRevealed, hasMine, neighboringMineCount, cellFlag, handleCellClick }),
    [isRevealed, hasMine, neighboringMineCount, cellFlag, handleCellClick]
  );
};

export const useFlagCount = () => useContext(gameContext).flagCount;

export const useGamePhase = () => useContext(gameContext).gamePhase;

export const useActionModeState = () => {
  const { actionMode, setActionMode } = useContext(gameContext);
  return useMemo(() => ({ actionMode, setActionMode }), [actionMode, setActionMode ]);
}
