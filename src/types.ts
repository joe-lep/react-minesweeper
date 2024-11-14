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
}
