import { useMemo } from "react";
import Cell from "./Cell";

export interface RowProps {
  rowIndex: number
  width: number
}

export default function Row({ rowIndex, width }: RowProps) {
  const renderedCells = useMemo(
    () => Array.from({ length: width }).map((_, index) => (
      <Cell key={`${rowIndex},${index}`} rowIndex={rowIndex} columnIndex={index} />
    )),
    [rowIndex, width]
  );

  return (
    <div className="row">{renderedCells}</div>
  );
}
