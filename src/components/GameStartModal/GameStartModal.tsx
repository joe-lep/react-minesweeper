import { ChangeEvent, useCallback, useState } from "react";
import { useGameConfig, useInitializeGameConfig } from "../GameManager";
import Modal from "../Modal";
import { DEFAULT_MINE_COUNT } from "../../config/values";

function testInt(value: number, minimum?: number) {
  if (Number.isInteger(value)) {
    return minimum != null ? value >= minimum : true;
  }

  return false;
} 

export default function GameStartModal() {
  const { width, height, mineCount } = useGameConfig();
  const initializeGameConfig = useInitializeGameConfig();
  const [newWidth, setNewWidth] = useState(String(width));
  const [newHeight, setNewHeight] = useState(String(height));
  const [newMineCount, setNewMineCount] = useState(String(mineCount || DEFAULT_MINE_COUNT));
  const [open, setOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleOpenClick = useCallback(
    () => {
      setNewWidth(String(width));
      setNewHeight(String(height));
      setNewMineCount(String(mineCount || DEFAULT_MINE_COUNT));
      setErrorMessage('');
      setOpen(true);
    },
    [width, height, mineCount, setNewWidth, setNewHeight, setNewMineCount, setOpen, setErrorMessage],
  );

  const handleCloseClick = useCallback(
    () => {
      setOpen(false);
    },
    [setOpen],
  );

  const handleSubmitClick = useCallback(
    () => {
      const newWidthNumber = Number(newWidth);
      const newHeightNumber = Number(newHeight);
      const newMineCountNumber = Number(newMineCount);

      if (!testInt(newWidthNumber, 4)) {
        setErrorMessage('Invalid width');
        return;
      }

      if (!testInt(newHeightNumber, 4)) {
        setErrorMessage('Invalid height');
        return;
      }

      if (!testInt(newMineCountNumber, 1)) {
        setErrorMessage('Invalid mine count');
        return;
      }

      if (newMineCountNumber >= newWidthNumber * newHeightNumber) {
        setErrorMessage(`Cannot fit ${newMineCountNumber} mines in ${newWidthNumber * newHeightNumber} spaces and have a playable game`);
        return;
      }

      initializeGameConfig({ width: newWidthNumber, height: newHeightNumber, mineCount: newMineCountNumber });
      setOpen(false);
    },
    [setOpen, initializeGameConfig, newWidth, newHeight, newMineCount, setErrorMessage],
  );

  const handleWidthChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setNewWidth(event.target.value);
    },
    [setNewWidth],
  );

  const handleHeightChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setNewHeight(event.target.value);
    },
    [setNewHeight],
  );

  const handleMineCountChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setNewMineCount(event.target.value);
    },
    [setNewMineCount],
  );

  return (
    <>
      <button type="button" onClick={handleOpenClick}>Start Game</button>
      <Modal open={open || !mineCount}>
        <h2 className="modal-header">New Game</h2>
        <div className="modal-body">
          <div><label>Width: <input type="number" min={4} value={newWidth} onChange={handleWidthChange} /></label></div>
          <div><label>Height: <input type="number" min={4} value={newHeight} onChange={handleHeightChange} /></label></div>
          <div><label>Mines: <input type="number" min={1} value={newMineCount} onChange={handleMineCountChange} /></label></div>
          {errorMessage && (
            <div className="error-message">{errorMessage}</div>
          )}
        </div>
        <div className="modal-footer">
          <button type="button" onClick={handleCloseClick} disabled={!mineCount}>Cancel</button>
          <button type="button" onClick={handleSubmitClick}>Submit</button>
        </div>
      </Modal>
    </>
  );
}
