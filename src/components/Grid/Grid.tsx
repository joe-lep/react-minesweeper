import { useCallback, useMemo, useRef, useState, useEffect, MouseEvent } from "react";
import Row from "./Row";
import './Grid.css';

const MIN_ZOOM = -10;
const MAX_ZOOM = 10;

export interface GridProps {
  width: number
  height: number
}

export default function Grid({ width, height }: GridProps) {
  const gridContainerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const [zoomLevel, setZoomLevel] = useState(0);

  const renderedRows = useMemo(
    () => Array.from({ length: height }).map((_, index) => (
      <Row key={`${index}x${width}`} rowIndex={index} width={width} />
    )),
    [width, height]
  );

  const handleWheel = useCallback(
    (event: WheelEvent) => {
      event.preventDefault();

      if (event.deltaY < 0) {
        setZoomLevel(state => Math.max(state - 1, MIN_ZOOM));
      }

      if (event.deltaY > 0) {
        setZoomLevel(state => Math.min(state + 1, MAX_ZOOM));
      }
    },
    [setZoomLevel],
  );

  const handleMouseDown = useCallback(
    (event: MouseEvent<HTMLDivElement>) => {
      event.preventDefault();
    },
    [],
  );

  const handleMouseMove = useCallback(
    (event: MouseEvent<HTMLDivElement>) => {
      if ((event.buttons & 4) && gridContainerRef.current) {
        gridContainerRef.current.scrollBy(-event.movementX, -event.movementY);
      }
    },
    [gridContainerRef],
  );

  useEffect(
    () => {
      if (gridRef.current) {
        gridRef.current.style.zoom = '' + Math.pow(1.1, zoomLevel)
      }
    },
    [zoomLevel, gridRef],
  );

  // Circumvent React's forced passive event listenting for wheel events
  useEffect(
    () => {
      const currentRef = gridContainerRef.current;

      if (currentRef) {
        currentRef.addEventListener('wheel', handleWheel, { passive: false });
      }

      return () => {
        if (currentRef) {
          currentRef.removeEventListener('wheel', handleWheel);
        }
      };
    },
    [gridContainerRef, handleWheel],
  );

  return (
    <div className="grid-container-outer">
      <div className="grid-container" ref={gridContainerRef} onMouseDown={handleMouseDown} onMouseMove={handleMouseMove}>
        <div className="grid" ref={gridRef}>{renderedRows}</div>
      </div>
    </div>
  );
}
