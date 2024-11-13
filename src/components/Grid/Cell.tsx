import { MouseEvent, useCallback } from "react";
import { useCellContext } from "../GameManager";
import CellContent from "./CellContent";
import CellCover from "./CellCover";

interface CellProps {
  rowIndex: number
  columnIndex: number
}

export default function Cell({ rowIndex, columnIndex }: CellProps) {
  const { isRevealed, revealCell, hasMine, neighboringMineCount, cellFlag, updateCellFlag } = useCellContext(rowIndex, columnIndex);

  const handleClick = useCallback(
    () => {
      if (!isRevealed) {
        revealCell(rowIndex, columnIndex);
      }
    },
    [rowIndex, columnIndex, revealCell, isRevealed],
  );

  const handleContextMenu = useCallback(
    (event: MouseEvent<HTMLDivElement>) => {
      event.preventDefault();
      updateCellFlag(rowIndex, columnIndex, (cellFlag + 1) % 3);
    },
    [updateCellFlag, rowIndex, columnIndex, cellFlag],
  );
  

  return (
    <span className="cell" tabIndex={0} onClick={handleClick} onContextMenu={handleContextMenu}>
      {isRevealed ? (<CellContent hasMine={hasMine} neighboringMineCount={neighboringMineCount} />) : (<CellCover cellFlag={cellFlag} />)}
    </span>
  );
}
