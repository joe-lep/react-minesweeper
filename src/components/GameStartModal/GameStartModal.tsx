import { ChangeEvent, useCallback, useMemo, useState } from "react";
import { useGameConfig, useInitializeGameConfig } from "../GameManager";
import Modal from "../Modal";
import { DEFAULT_MINE_COUNT, EASY_CONFIG, HARD_CONFIG, MEDIUM_CONFIG, MOBILE_EASY_CONFIG, MOBILE_HARD_CONFIG, MOBILE_MEDIUM_CONFIG } from "../../config/values";
import CapsuleControl from "../CapsuleControl";
import './GameStartModal.scss';
import DifficultyButton from "./DifficultyButton";
import { GameConfig } from "../../types";
import InstructionsToggle from "./InstructionsToggle";

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
  const [instructionsOpen, setInstructionsOpen] = useState(false);
  const [newMineCount, setNewMineCount] = useState(String(mineCount || DEFAULT_MINE_COUNT));
  const [open, setOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleOpenClick = useCallback(
    () => {
      setNewWidth(String(width));
      setNewHeight(String(height));
      setNewMineCount(String(mineCount || DEFAULT_MINE_COUNT));
      setErrorMessage('');
      setInstructionsOpen(false);
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

  const currentConfig = useMemo(
    () => ({
      width: Number(newWidth),
      height: Number(newHeight),
      mineCount: Number(newMineCount),
    }),
    [newWidth, newHeight, newMineCount],
  );

  const handleDifficultyClick = useCallback(
    (targetConfig: GameConfig) => {
      setNewWidth(String(targetConfig.width));
      setNewHeight(String(targetConfig.height));
      setNewMineCount(String(targetConfig.mineCount));
    },
    [],
  );
  
  return (
    <>
      <button type="button" onClick={handleOpenClick} className="primary">New Game</button>
      <Modal open={open || !mineCount}>
        <h2 className="modal-header">New Game</h2>
        <div className="modal-body game-config-modal--body">
          <div className="difficulty-options-container">
            <h3>Difficulty Options</h3>
            <CapsuleControl className="difficulty-capsule">
              <DifficultyButton currentConfig={currentConfig} targetConfig={EASY_CONFIG} onClick={handleDifficultyClick}>
                Easy
              </DifficultyButton>
              <DifficultyButton currentConfig={currentConfig} targetConfig={MEDIUM_CONFIG} onClick={handleDifficultyClick}>
                Medium
              </DifficultyButton>
              <DifficultyButton currentConfig={currentConfig} targetConfig={HARD_CONFIG} onClick={handleDifficultyClick}>
                Hard
              </DifficultyButton>
            </CapsuleControl>
          </div>
          <div className="difficulty-options-container vertical-screen-difficulty">
            <h3>For Portrait Screens</h3>
            <CapsuleControl className="difficulty-capsule">
            <DifficultyButton currentConfig={currentConfig} targetConfig={MOBILE_EASY_CONFIG} onClick={handleDifficultyClick}>
                Easy
              </DifficultyButton>
              <DifficultyButton currentConfig={currentConfig} targetConfig={MOBILE_MEDIUM_CONFIG} onClick={handleDifficultyClick}>
                Medium
              </DifficultyButton>
              <DifficultyButton currentConfig={currentConfig} targetConfig={MOBILE_HARD_CONFIG} onClick={handleDifficultyClick}>
                Hard
              </DifficultyButton>
            </CapsuleControl>
          </div>

          <div className="game-config-inputs">
            <label htmlFor="game-config--width">Grid Width</label>
            <input id="game-config--width" type="number" min={4} value={newWidth} onChange={handleWidthChange} />
            <label htmlFor="game-config--height">Grid Height</label>
            <input id="game-config--height" type="number" min={4} value={newHeight} onChange={handleHeightChange} />
            <label htmlFor="game-config--mines"># of Mines</label>
            <input id="game-config--mines" type="number" min={1} value={newMineCount} onChange={handleMineCountChange} />
          </div>

          {errorMessage && (
            <div className="error-message">{errorMessage}</div>
          )}

          <InstructionsToggle open={instructionsOpen} setOpen={setInstructionsOpen} />
        </div>
        <div className="modal-footer game-start-modal-buttons">
          <button type="button" onClick={handleCloseClick} disabled={!mineCount}>Cancel</button>
          <button type="button" onClick={handleSubmitClick} className="action-button">Start Game</button>
        </div>
      </Modal>
    </>
  );
}
