interface CellCoverProps {
  cellFlag: number;
}

const flagDisplayMap: Record<number, string> = {
  0: '',
  1: 'F',
  2: '?',
};

export default function CellCover({ cellFlag }: CellCoverProps) {
  const flagDisplay = flagDisplayMap[cellFlag] ?? '';

  return (
    <div className="cell-cover">{flagDisplay}</div>
  );
}
