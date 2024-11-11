import { createContext } from "react";
import { DEFAULT_HEIGHT, DEFAULT_WIDTH } from "../../config/values";
import { GameConfig } from "../../types";

interface GameContext {
  width: number
  height: number
  // mineCount: number
  // mineLocations: Map<number, boolean>
  initializeGameConfig: ({ width, height }: GameConfig) => void
}

const gameContext = createContext<GameContext>({
  width: DEFAULT_WIDTH,
  height: DEFAULT_HEIGHT,
  initializeGameConfig: () => {},
});

export default gameContext;
