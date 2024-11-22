import { DIG_MODE, FLAG_MODE } from './config/action-modes';

export type GameConfig = {
  width: number;
  height: number;
  mineCount: number;
};

export type CellPosition = {
  row: number;
  column: number;
};

export type RevelationState = {
  revealedCells: Array<boolean>;
  coveredCellCount: number;
};

export type FlagStateAndCount = {
  flagState: Array<number>;
  flagCount: number;
};

export type StopWatchApi = {
  getTime: () => number;
  setTime: (time: number) => void;
  getFormattedTime: () => string;
  start: () => void;
  pause: () => void;
  reset: () => void;
};

export type ActionMode = typeof DIG_MODE | typeof FLAG_MODE;
