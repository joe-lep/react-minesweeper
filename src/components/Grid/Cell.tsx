import { useCallback } from "react";
import { useCellContext } from "../GameManager";
import CellContent from "./CellContent";
import CellCover from "./CellCover";

interface CellProps {
  rowIndex: number
  columnIndex: number
}

export default function Cell({ rowIndex, columnIndex }: CellProps) {
  const { isRevealed, revealCell, hasMine } = useCellContext(rowIndex, columnIndex);

  const handleClick = useCallback(
    () => {
      if (!isRevealed) {
        revealCell(rowIndex, columnIndex);
      }
    },
    [rowIndex, columnIndex, revealCell, isRevealed],
  );

  return (
    <span className="cell" tabIndex={0} onClick={handleClick}>
      {isRevealed ? (<CellContent hasMine={hasMine} />) : (<CellCover />)}
    </span>
  );
}
