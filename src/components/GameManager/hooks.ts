import { useContext } from "react";
import { GameConfig } from "../../types";
import gameContext from "./context";

export const useGameConfig: () => GameConfig = () => {
  const { width, height } = useContext(gameContext);

  return { width, height };
};

export const useInitializeGameConfig = () => useContext(gameContext).initializeGameConfig;

export const useCellContext = (row: number, column: number) => {
  const { revealedCells, revealCell, width } = useContext(gameContext);

  const isRevealed = revealedCells[row * width + column] ?? false;

  return { isRevealed, revealCell };
};
