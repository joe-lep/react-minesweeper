import { useMemo } from "react";
import Row from "./Row";
import './Grid.css';
import { useGameConfig } from "../GameManager";

export default function Grid() {
  const { width, height } = useGameConfig();

  const renderedRows = useMemo(
    () => Array.from({ length: height }).map((_, index) => (
      <Row key={`${index}x${width}`} rowIndex={index} width={width} />
    )),
    [width, height]
  );

  return (
    <div className="grid-container-outer">
      <div className="grid-container">
        <div className="grid">{renderedRows}</div>
      </div>
    </div>
  );
}
