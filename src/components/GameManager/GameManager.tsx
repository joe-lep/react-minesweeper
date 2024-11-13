import { ReactNode, useCallback, useState } from "react";
import { DEFAULT_HEIGHT, DEFAULT_MINE_COUNT, DEFAULT_WIDTH } from "../../config/values";
import gameContext from './context';
import { GameConfig } from "../../types";
import { generateMinePositions, generateNeighborCounts } from "./utils";

const { Provider } = gameContext;

export interface GameManagerProps {
  children: ReactNode
}

export function GameManager({ children }: GameManagerProps) {
  const [configState, setConfigState] = useState<GameConfig>({
    width: DEFAULT_WIDTH,
    height: DEFAULT_HEIGHT,
    mineCount: DEFAULT_MINE_COUNT,
  });

  const [revealedCells, setRevealedCells] = useState<Array<boolean>>([]);

  const [ minePositions, setMinePositions ] = useState<Record<number, boolean>>({});

  const [ neighborCounts, setNeighborCounts ] = useState<Array<number>>([]);

  const [flagState, setFlagState] = useState<Array<number>>([]);

  const revealCell = useCallback(
    (row: number, column: number) => {
      setRevealedCells((prevState) => {
        const newState = [...prevState];
        newState[row * configState.width + column] = true;

        return newState;
      });
    },
    [setRevealedCells, configState],
  );

  const updateCellFlag = useCallback(
    (row: number, column: number, newFlagValue: number) => {
      setFlagState((prevState) => {
        const newState = [...prevState];
        newState[row * configState.width + column] = newFlagValue;

        return newState;
      });
    },
    [setFlagState, configState],
  );

  const initializeGameConfig = useCallback(
    ({ width, height, mineCount }: GameConfig) => {
      setConfigState({ width, height, mineCount });
      setRevealedCells(Array.from({ length: width * height }).map(() => false));
      const newMinePositions = generateMinePositions(mineCount, width * height);
      setMinePositions(newMinePositions);
      setNeighborCounts(generateNeighborCounts(newMinePositions, width, height));
      setFlagState(Array.from({ length: width * height }).map(() => 0));
    },
    [setConfigState, setRevealedCells, setMinePositions, setNeighborCounts],
  );

  return (
    <Provider value={{...configState, minePositions, initializeGameConfig, revealedCells, revealCell, neighborCounts, flagState, updateCellFlag }}>
      {children}
    </Provider>
  );
}
