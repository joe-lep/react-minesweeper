import { ReactNode, useCallback, useEffect, useLayoutEffect, useState } from 'react';
import { useControls } from 'react-zoom-pan-pinch';

import { cellBorderSize, cellHeight, cellWidth, gridBorderSize, gridMargin } from '@/config/sass-vars';
import { CellPosition, FlagStateAndCount, GameConfig, RevelationState } from '@/types';
import { DEFAULT_HEIGHT, DEFAULT_WIDTH } from '@/config/values';
import { GAME_IN_PROGRESS, GAME_LOST, GAME_READY, GAME_WON } from '@/config/game-phases';
import { generateMinePositions, generateNeighborCounts, searchZeroNeighborCells } from './utils';
import { NO_FLAG, YES_FLAG } from '@/config/flags';
import gameContext from './context';
import { ZOOM_ANIMATION_TIME } from '@/config/zoom';

const { Provider } = gameContext;

function getTargetZoom(width: number, height: number) {
  const gridArea = document.getElementById('grid-container-area');
  if (!gridArea) {
    return undefined;
  }

  const gridAreaRect = gridArea.getBoundingClientRect();

  // eslint-disable-next-line no-magic-numbers
  const gridWidth = width * (cellWidth + cellBorderSize * 2) + gridBorderSize * 2 + gridMargin * 2;
  // eslint-disable-next-line no-magic-numbers
  const gridHeight = height * (cellHeight + cellBorderSize * 2) + gridBorderSize * 2 + gridMargin * 2;

  return Math.min(gridAreaRect.width / gridWidth, gridAreaRect.height / gridHeight);
}

export interface GameManagerProps {
  children: ReactNode;
}

export function GameManager({ children }: GameManagerProps) {
  const [configState, setConfigState] = useState<GameConfig>({
    width: DEFAULT_WIDTH,
    height: DEFAULT_HEIGHT,
    mineCount: 0,
  });

  const [minePositions, setMinePositions] = useState<Record<number, boolean>>({});
  const [neighborCounts, setNeighborCounts] = useState<Array<number>>([]);
  const [flagStateAndCount, setFlagStateAndCount] = useState<FlagStateAndCount>({
    flagState: [],
    flagCount: 0,
  });
  const [gamePhase, setGamePhase] = useState<string>(GAME_READY);
  const [mineWasHit, setMineWasHit] = useState(false);
  const [revalationState, setRevelationState] = useState<RevelationState>({
    revealedCells: [],
    coveredCellCount: DEFAULT_WIDTH * DEFAULT_HEIGHT,
  });
  const [isFlagMode, setIsFlagMode] = useState(false);

  const { flagState, flagCount } = flagStateAndCount;

  const { centerView } = useControls();

  useEffect(() => {
    if (mineWasHit) {
      setGamePhase(GAME_LOST);
    }
    else if (revalationState.coveredCellCount <= configState.mineCount) {
      setGamePhase(GAME_WON);
    }
  }, [mineWasHit, revalationState, configState]);

  useEffect(() => {
    function handleWindowResize() {
      centerView(getTargetZoom(configState.width, configState.height), ZOOM_ANIMATION_TIME);
    }

    window.addEventListener('resize', handleWindowResize);

    return () => {
      window.removeEventListener('resize', handleWindowResize);
    };
  }, [configState, centerView]);

  const updateCellFlag = useCallback(
    (row: number, column: number, newFlagValue: number) => {
      setFlagStateAndCount((prevState) => {
        const newFlagState = [...prevState.flagState];
        const rowIndex = row * configState.width + column;
        newFlagState[rowIndex] = newFlagValue;
        const newFlagCount = prevState.flagCount - (prevState.flagState[rowIndex] === YES_FLAG ? 1 : 0) + (newFlagValue === YES_FLAG ? 1 : 0);

        return { flagState: newFlagState, flagCount: newFlagCount };
      });
    },
    [setFlagStateAndCount, configState],
  );

  const executeRevealCell = useCallback(
    (row: number, column: number) => {
      const cellIndex = row * configState.width + column;

      setRevelationState((prevState) => {
        if (prevState.revealedCells[cellIndex]) {
          return prevState;
        }

        const newRevealedCells = [...prevState.revealedCells];

        newRevealedCells[cellIndex] = true;

        return {
          revealedCells: newRevealedCells,
          coveredCellCount: prevState.coveredCellCount - 1,
        };
      });

      if (minePositions[cellIndex]) {
        setMineWasHit(true);
      }

      updateCellFlag(row, column, NO_FLAG);
    },
    [setRevelationState, configState, minePositions, setMineWasHit, updateCellFlag],
  );

  const revealCell = useCallback(
    (row: number, column: number) => {
      if (gamePhase !== GAME_IN_PROGRESS) {
        return;
      }

      const cellIndex = row * configState.width + column;

      if (minePositions[cellIndex] || neighborCounts[cellIndex] > 0) {
        executeRevealCell(row, column);
      }
      else {
        const currentCell = { row, column };
        const cellMap: Record<string, CellPosition> = {};

        searchZeroNeighborCells(neighborCounts, currentCell, cellMap, configState.width, configState.height);

        Object.values(cellMap).forEach((item) => {
          executeRevealCell(item.row, item.column);
        });
      }
    },
    [gamePhase, executeRevealCell, minePositions, neighborCounts, configState],
  );

  const initializeGameConfig = useCallback(
    ({ width, height, mineCount }: GameConfig) => {
      setConfigState({ width, height, mineCount });
      setRevelationState({
        revealedCells: Array.from({ length: width * height }).map(() => false),
        coveredCellCount: width * height,
      });
      const newMinePositions = generateMinePositions(mineCount, width * height);
      setMinePositions(newMinePositions);
      setNeighborCounts(generateNeighborCounts(newMinePositions, width, height));
      setFlagStateAndCount({ flagState: Array.from({ length: width * height }).map(() => NO_FLAG), flagCount: 0 });
      setGamePhase(GAME_IN_PROGRESS);
      setMineWasHit(false);
    },
    [setConfigState, setRevelationState, setMinePositions, setNeighborCounts],
  );

  useLayoutEffect(
    () => {
      if (configState.mineCount) {
        centerView(getTargetZoom(configState.width, configState.height), 0);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [configState, minePositions],
  );

  return (
    <Provider value={{ ...configState, minePositions, initializeGameConfig, revealedCells: revalationState.revealedCells, revealCell, neighborCounts, flagState, flagCount, updateCellFlag, gamePhase, isFlagMode, setIsFlagMode }}>
      {children}
    </Provider>
  );
}
