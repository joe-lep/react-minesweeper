import { MouseEvent, useCallback, useMemo } from "react";
import { useCellContext, useGamePhase } from "../GameManager";
import clsx from "clsx";
import { GAME_LOST, GAME_READY, GAME_WON } from "../../config/game-phases";
import MineVector from '../../assets/mine.svg?react';
import FlagVector from '../../assets/flag.svg?react';
import { QUESTION_FLAG, YES_FLAG } from "../../config/flags";

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

      if (cellFlag === YES_FLAG) {
        return (<FlagVector />);
      }

      if (cellFlag === QUESTION_FLAG) {
        return '?';
      }

      return null;
    },
    [gamePhase, isRevealed, hasMine, cellFlag, neighboringMineCount],
  );

  const neighborCountClassName = useMemo(
    () => {
      if (!isRevealed || hasMine) {
        return '';
      }

      return `neighboring-mine-count--${neighboringMineCount}`;
    },
    [hasMine, isRevealed, neighboringMineCount],
  );
  
  return (
    <span className="cell" tabIndex={0} onClick={handleClick} onContextMenu={handleContextMenu}>
      <span
        className={clsx(
          'cell-inner',
          isRevealed ? 'revealed' : 'covered',
          neighborCountClassName,
          {
            winner: gamePhase === GAME_WON && hasMine,
            loser: gamePhase === GAME_LOST && hasMine,
          },
        )}
      >{cellContent}</span>
    </span>
  );
}
