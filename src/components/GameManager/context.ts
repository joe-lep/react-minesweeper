import { createContext } from 'react';

import { DEFAULT_HEIGHT, DEFAULT_WIDTH } from '@/config/values';
import { GAME_READY } from '@/config/game-phases';
import { GameConfig } from '@/types';

interface GameContext {
  width: number;
  height: number;
  mineCount: number;
  minePositions: Record<number, boolean>;
  initializeGameConfig: ({ width, height }: GameConfig) => void;
  revealedCells: Array<boolean>;
  revealCell: (row: number, column: number) => void;
  neighborCounts: Array<number>;
  flagState: Array<number>;
  flagCount: number;
  updateCellFlag: (row: number, column: number, newFlagValue: number) => void;
  gamePhase: string;
  isFlagMode: boolean;
  setIsFlagMode: (value: boolean) => void;
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
  isFlagMode: false,
  setIsFlagMode: () => {},
});

export default gameContext;
