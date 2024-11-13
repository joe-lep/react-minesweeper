interface CellContentProps {
  hasMine: boolean
  neighboringMineCount: number
}

export default function CellContent({ hasMine, neighboringMineCount }: CellContentProps) {
  return (
    <div className="cell-content">{hasMine ? 'M' : neighboringMineCount}</div>
  );
}
