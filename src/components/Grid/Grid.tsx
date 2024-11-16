import { useMemo } from "react";
import Row from "./Row";
import './Grid.css';
import { useGameConfig } from "../GameManager";
import { TransformComponent } from "react-zoom-pan-pinch";

export default function Grid() {
  const { width, height } = useGameConfig();

  const renderedRows = useMemo(
    () => Array.from({ length: height }).map((_, index) => (
      <Row key={`${index}x${width}`} rowIndex={index} width={width} />
    )),
    [width, height]
  );

  return (
    <div className="grid-container">
      <div className="grid-container-inner">
        <TransformComponent wrapperClass="grid-transform-wrapper">
          <div className="grid">
            {renderedRows}
          </div>
        </TransformComponent>
      </div>
    </div>
  );
}
