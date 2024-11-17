import { MouseEvent, useCallback, useMemo } from "react";
import { useCellContext, useGamePhase } from "../GameManager";
import clsx from "clsx";
import { GAME_READY } from "../../config/game-phases";
import MineVector from '../../assets/mine.svg?react';

interface CellProps {
  rowIndex: number
  columnIndex: number
}

export default function Cell({ rowIndex, columnIndex }: CellProps) {
  const { isRevealed, hasMine, neighboringMineCount, cellFlag, handleCellClick } = useCellContext(rowIndex, columnIndex);
  const gamePhase = useGamePhase();

  const handleClick = useCallback(
    () => {
      handleCellClick();
    },
    [handleCellClick],
  );

  const handleContextMenu = useCallback(
    (event: MouseEvent<HTMLDivElement>) => {
      event.preventDefault();
      handleCellClick(true);
    },
    [handleCellClick],
  );

  const cellContent = useMemo(
    () => {
      if (gamePhase === GAME_READY) {
        return null;
      }

      if (isRevealed) {
        if (hasMine) {
          return (<MineVector />)
        }

        return neighboringMineCount || null;
      }

      if (cellFlag) {
        return 'F';
      }

      return null;
    },
    [gamePhase, isRevealed, hasMine, cellFlag, neighboringMineCount],
  );
  

  return (
    <span className="cell" tabIndex={0} onClick={handleClick} onContextMenu={handleContextMenu}>
      <span className={clsx('cell-inner', isRevealed ? 'revealed' : 'covered')}>{cellContent}</span>
    </span>
  );
}
