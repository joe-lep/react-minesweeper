import { ChangeEvent, useCallback, useState } from "react";
import { useGameConfig, useInitializeGameConfig } from "../GameManager";
import Modal from "../Modal";

export default function GameStartModal() {
  const { width, height } = useGameConfig();
  const initializeGameConfig = useInitializeGameConfig();
  const [newWidth, setNewWidth] = useState(width);
  const [newHeight, setNewHeight] = useState(height);
  const [newMineCount, setNewMineCount] = useState(10);
  const [open, setOpen] = useState(false);

  const handleOpenClick = useCallback(
    () => {
      setNewWidth(width);
      setNewHeight(height);
      setOpen(true);
    },
    [width, height, setNewWidth, setNewHeight, setOpen],
  );

  const handleCloseClick = useCallback(
    () => {
      setOpen(false);
    },
    [setOpen],
  );

  const handleSubmitClick = useCallback(
    () => {
      initializeGameConfig({ width: newWidth, height: newHeight, mineCount: newMineCount });
      setOpen(false);
    },
    [setOpen, initializeGameConfig, newWidth, newHeight, newMineCount],
  );

  const handleWidthChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const value = Number(event.target.value);

      if (Number.isInteger(value) && value >= 4) {
        setNewWidth(value);
      }
    },
    [setNewWidth],
  );

  const handleHeightChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const value = Number(event.target.value);

      if (Number.isInteger(value) && value >= 4) {
        setNewHeight(value);
      }
    },
    [setNewHeight],
  );

  const handleMineCountChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const value = Number(event.target.value);

      if (Number.isInteger(value) && value >= 1) {
        setNewMineCount(value);
      }
    },
    [setNewMineCount],
  );

  return (
    <>
      <button type="button" onClick={handleOpenClick}>Start Game</button>
      <Modal open={open}>
        <h2>New Game</h2>
        <div><label>Width: <input type="number" value={newWidth} onChange={handleWidthChange} /></label></div>
        <div><label>Width: <input type="number" value={newHeight} onChange={handleHeightChange} /></label></div>
        <div><label>Mines: <input type="number" value={newMineCount} onChange={handleMineCountChange} /></label></div>
        <div>
          <button type="button" onClick={handleCloseClick}>Cancel</button>
          <button type="button" onClick={handleSubmitClick}>Submit</button>
        </div>
      </Modal>
    </>
  );
}
