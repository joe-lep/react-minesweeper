import { useContext } from "react";
import { GameConfig } from "../../types";
import gameContext from "./context";

export const useGameConfig: () => GameConfig = () => {
  const { width, height, mineCount } = useContext(gameContext);

  return { width, height, mineCount };
};

export const useInitializeGameConfig = () => useContext(gameContext).initializeGameConfig;

export const useCellContext = (row: number, column: number) => {
  const { revealedCells, revealCell, width, minePositions } = useContext(gameContext);

  const isRevealed = revealedCells[row * width + column] ?? false;
  const hasMine = minePositions[row * width + column] ?? false;

  return { isRevealed, revealCell, hasMine };
};
