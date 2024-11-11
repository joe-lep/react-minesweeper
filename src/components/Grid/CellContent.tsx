interface CellContentProps {
  hasMine: boolean
}

export default function CellContent({ hasMine }: CellContentProps) {
  return (
    <div className="cell-content">{hasMine ? 'M' : 0}</div>
  );
}
