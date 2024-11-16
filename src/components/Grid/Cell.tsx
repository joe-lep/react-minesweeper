import { MouseEvent, useCallback } from "react";
import { useCellContext } from "../GameManager";
import CellContent from "./CellContent";
import CellCover from "./CellCover";

interface CellProps {
  rowIndex: number
  columnIndex: number
}

export default function Cell({ rowIndex, columnIndex }: CellProps) {
  const { isRevealed, hasMine, neighboringMineCount, cellFlag, handleCellClick } = useCellContext(rowIndex, columnIndex);

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
  

  return (
    <span className="cell" tabIndex={0} onClick={handleClick} onContextMenu={handleContextMenu}>
      {isRevealed ? (<CellContent hasMine={hasMine} neighboringMineCount={neighboringMineCount} />) : (<CellCover cellFlag={cellFlag} />)}
    </span>
  );
}
