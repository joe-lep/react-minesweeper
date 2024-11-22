import { useCallback } from 'react';

export interface InstructionsToggleProps {
  open: boolean;
  setOpen: (value: boolean) => void;
}

export default function InstructionsToggle({ open, setOpen }: InstructionsToggleProps) {
  const handleClick = useCallback(
    () => {
      setOpen(true);
    },
    [setOpen],
  );

  if (open) {
    return (
      <div className="instructions">
        <p>
          Use the hints provided to try to figure out where the mines are.
          Click a tile to reveal what&apos;s underneath it. If the tile contains a mine, you lose the game.
          If the tile contains a number, that is how many of its neightboring tiles (adjacent and diagonal) contain mines.
          Plant flags on the tiles where you think the mines are.
          Uncover every tile without a mine underneath it to win the game.
        </p>
        <ul>
          <li>Click (tap on mobile) a tile to reveal its contents.</li>
          <li>Click and drag with the middle mouse button (touch and drag on mobile) to pan around the area if the grid is larger than the screen.</li>
          <li>Use the mouse wheel (pinch on mobile) to zoom in and out.</li>
          <li>Right click to plant a flag on tiles you suspect of containing mines.</li>
          <li>On mobile, you can plant flags by using the pickaxe/flag toggle to enable or disable flag mode. In flag mode, clicking or tapping a tile will plant a flag rather than uncovering the tile.</li>
        </ul>
      </div>
    );
  }

  return (
    <div className="instructions-button-wrapper">
      <button type="button" onClick={handleClick}>
        Show Instructions
      </button>
    </div>
  );
}
