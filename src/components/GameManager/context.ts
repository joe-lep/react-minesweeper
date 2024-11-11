import { createContext } from "react";
import { DEFAULT_HEIGHT, DEFAULT_WIDTH } from "../../config/values";
import { GameConfig } from "../../types";

interface GameContext {
  width: number
  height: number
  mineCount: number
  minePositions: Record<number, boolean>
  initializeGameConfig: ({ width, height }: GameConfig) => void
  revealedCells: Array<boolean>
  revealCell: (row: number, column: number) => void
}

const gameContext = createContext<GameContext>({
  width: DEFAULT_WIDTH,
  height: DEFAULT_HEIGHT,
  mineCount: 0,
  minePositions: {},
  initializeGameConfig: () => {},
  revealedCells: [],
  revealCell: () => {},
});

export default gameContext;
