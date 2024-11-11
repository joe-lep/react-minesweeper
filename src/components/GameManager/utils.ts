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

  console.log(positionArray.slice(-mineCount));

  return minePositionSet;
}
