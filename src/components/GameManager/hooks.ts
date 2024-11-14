import { useContext } from "react";
import { GameConfig } from "../../types";
import gameContext from "./context";

export const useGameConfig: () => GameConfig = () => {
  const { width, height, mineCount } = useContext(gameContext);

  return { width, height, mineCount };
};

export const useInitializeGameConfig = () => useContext(gameContext).initializeGameConfig;

export const useCellContext = (row: number, column: number) => {
  const { revealedCells, revealCell, width, minePositions, neighborCounts, flagState, updateCellFlag } = useContext(gameContext);
  const cellIndex = row * width + column;

  const isRevealed = revealedCells[cellIndex] ?? false;
  const hasMine = minePositions[cellIndex] ?? false;
  const neighboringMineCount = neighborCounts[cellIndex];
  const cellFlag = flagState[cellIndex] ?? 0;

  return { isRevealed, revealCell, hasMine, neighboringMineCount, cellFlag, updateCellFlag };
};

export const useFlagCount = () => useContext(gameContext).flagCount;

export const useGamePhase = () => useContext(gameContext).gamePhase;
