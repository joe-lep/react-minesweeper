import MineVector from '../../assets/mine.svg?react';

interface CellContentProps {
  hasMine: boolean
  neighboringMineCount: number
}

export default function CellContent({ hasMine, neighboringMineCount }: CellContentProps) {
  return (
    <div className="cell-content">{hasMine ? (<MineVector />) : neighboringMineCount}</div>
  );
}
