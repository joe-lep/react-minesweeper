import { ReactNode, useCallback, useEffect, useState } from "react";
import { DEFAULT_HEIGHT, DEFAULT_MINE_COUNT, DEFAULT_WIDTH } from "../../config/values";
import gameContext from './context';
import { GameConfig } from "../../types";
import { generateMinePositions } from "./utils";

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

  useEffect(() => {
    console.log('minePositons', minePositions);
  }, [minePositions])

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

  const initializeGameConfig = useCallback(
    ({ width, height, mineCount }: GameConfig) => {
      setConfigState({ width, height, mineCount });
      setRevealedCells(Array.from({ length: width * height }).map(() => false));
      setMinePositions(generateMinePositions(mineCount, width * height));
    },
    [setConfigState, setRevealedCells],
  );

  return (
    <Provider value={{...configState, minePositions, initializeGameConfig, revealedCells, revealCell }}>
      {children}
    </Provider>
  );
}
