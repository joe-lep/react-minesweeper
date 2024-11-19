import { ReactNode, useCallback, useMemo } from "react";
import { GameConfig } from "../../types";
import clsx from "clsx";

export interface DifficultyButtonProps {
  currentConfig: GameConfig
  targetConfig: GameConfig
  onClick: (config: GameConfig) => void
  children?: ReactNode
}

export default function DifficultyButton({ currentConfig, targetConfig, onClick, children }: DifficultyButtonProps) {
  const handleClick = useCallback(
    () => {
      onClick(targetConfig)
    },
    [onClick, targetConfig],
  );

  const active = useMemo(
    () => {
      return currentConfig.width === targetConfig.width
        && currentConfig.height === targetConfig.height
        && currentConfig.mineCount === targetConfig.mineCount;
    },
    [currentConfig, targetConfig],
  );
  
  return (
    <button className={clsx({ active })} onClick={handleClick}>
      {children}
    </button>
  );
}
