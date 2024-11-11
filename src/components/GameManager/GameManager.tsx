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

  const initializeGameConfig = useCallback(
    ({ width, height }: GameConfig) => {
      setConfigState({ width, height })
    },
    [setConfigState],
  );

  return (
    <Provider value={{...configState, initializeGameConfig}}>
      {children}
    </Provider>
  );
}
