export function generateMinePositions(mineCount: number, cellCount: number) {
  const positionArray = Array.from({ length: cellCount }).map((_, index) => index);

  for (let i = 0; i < mineCount; i++) {
    const randomIndex = Math.floor(Math.random() * (cellCount - i));
    const randomValue = positionArray[randomIndex];
    positionArray[randomIndex] = positionArray[cellCount - 1 - i];
    positionArray[cellCount - 1 - i] = randomValue;
  }

  const minePositionSet: Record<number, boolean> = {};

  for (let i = 0; i < mineCount; i++) {
    minePositionSet[positionArray[cellCount - 1 - i]] = true;
  }

  return minePositionSet;
}

export function generateNeighborCounts(minePositionSet: Record<number, boolean>, width: number, height: number) {
  const cellCount = width * height;
  const neighborCounts = Array.from({ length: cellCount }).map(
    (_, index) => countNeighbors(index, minePositionSet, width, height)
  );

  return neighborCounts;
}

function countNeighbors(index: number, minePositionSet: Record<number, boolean>, width: number, height: number) {
  const rowIndex = Math.floor(index / width);
  const columnIndex = index % width;

  let neighborCount = 0;

  for (let deltaRow = (-1); deltaRow <= 1; deltaRow++) {
    for (let deltaCol = (-1); deltaCol <= 1; deltaCol++) {
      neighborCount += isMinePosition(rowIndex + deltaRow, columnIndex + deltaCol, minePositionSet, width, height) ? 1 : 0;
    }
  }

  return neighborCount;
}

function isMinePosition(rowIndex: number, columnIndex: number, minePositionSet: Record<number, boolean>, width: number, height: number) {
  return rowIndex >= 0 && columnIndex >= 0 && rowIndex < height && columnIndex < width && minePositionSet[rowIndex * width + columnIndex];
}
