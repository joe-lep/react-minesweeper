import { createContext } from "react";
import { DEFAULT_HEIGHT, DEFAULT_WIDTH } from "../../config/values";
import { ActionMode, GameConfig } from "../../types";
import { GAME_READY } from "../../config/game-phases";
import { DIG_MODE } from "../../config/action-modes";

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
  flagCount: number
  updateCellFlag: (row: number, column: number, newFlagValue: number) => void
  gamePhase: string
  actionMode: ActionMode
  setActionMode: (newActionMode: ActionMode) => void
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
  flagCount: 0,
  updateCellFlag: () => {},
  gamePhase: GAME_READY,
  actionMode: DIG_MODE,
  setActionMode: () => {},
});

export default gameContext;
