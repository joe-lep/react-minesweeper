import { useMemo, useRef } from "react";
import Row from "./Row";
import './Grid.css';
import { useGameConfig } from "../GameManager";

export default function Grid() {
  const gridContainerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const { width, height } = useGameConfig();

  const renderedRows = useMemo(
    () => Array.from({ length: height }).map((_, index) => (
      <Row key={`${index}x${width}`} rowIndex={index} width={width} />
    )),
    [width, height]
  );

  return (
    <div className="grid-container-outer">
      <div className="grid-container" ref={gridContainerRef}>
        <div className="grid" ref={gridRef}>{renderedRows}</div>
      </div>
    </div>
  );
}
