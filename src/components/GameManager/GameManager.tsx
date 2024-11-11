import { ReactNode, useCallback, useState } from "react";
import { DEFAULT_HEIGHT, DEFAULT_WIDTH } from "../../config/values";
import gameContext from './context';
import { GameConfig } from "../../types";

const { Provider } = gameContext;

export interface GameManagerProps {
  children: ReactNode
}

export function GameManager({ children }: GameManagerProps) {
  const [configState, setConfigState] = useState<GameConfig>({
    width: DEFAULT_WIDTH,
    height: DEFAULT_HEIGHT,
  });

  const [revealedCells, setRevealedCells] = useState<Array<boolean>>([]);

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
    ({ width, height }: GameConfig) => {
      setConfigState({ width, height });
      setRevealedCells(Array.from({ length: width * height }).map(() => false));
    },
    [setConfigState, setRevealedCells],
  );

  return (
    <Provider value={{...configState, initializeGameConfig, revealedCells, revealCell }}>
      {children}
    </Provider>
  );
}
