import { createContext } from "react";
import { DEFAULT_HEIGHT, DEFAULT_WIDTH } from "../../config/values";
import { GameConfig } from "../../types";
import { GAME_READY } from "../../config/game-phases";

interface GameContext {
  width: number
  height: number
  mineCount: number
  minePositions: Record<number, boolean>
  initializeGameConfig: ({ width, height }: GameConfig) => void
  revealedCells: Array<boolean>
  revealCell: (row: number, column: number) => void
  neighborCounts: Array<number>
  flagState: Array<number>
  updateCellFlag: (row: number, column: number, newFlagValue: number) => void
  gamePhase: string
}

const gameContext = createContext<GameContext>({
  width: DEFAULT_WIDTH,
  height: DEFAULT_HEIGHT,
  mineCount: 0,
  minePositions: {},
  initializeGameConfig: () => {},
  revealedCells: [],
  revealCell: () => {},
  neighborCounts: [],
  flagState: [],
  updateCellFlag: () => {},
  gamePhase: GAME_READY,
});

export default gameContext;
