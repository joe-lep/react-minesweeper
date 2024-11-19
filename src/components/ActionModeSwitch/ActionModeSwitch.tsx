import { ChangeEvent, useCallback } from "react";
import { useFlagModeState } from "../GameManager";
import clsx from "clsx";
import PickaxeMonochromeVector from '../../assets/pickaxe-monochrome.svg?react';
import FlagMonochromeVector from '../../assets/flag-monochrome.svg?react';
import './ActionModeSwitch.scss';

export default function ActionModeSwitch() {
  const { isFlagMode, setIsFlagMode } = useFlagModeState();

  const handleChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setIsFlagMode(event.target.checked);
    },
    [setIsFlagMode],
  );

  return (
    <div className="flag-mode-toggle-touch-highlight-container">
      <label className={clsx('flag-mode-toggle', { 'is-flag-mode': isFlagMode })}>
        <input type="checkbox" checked={isFlagMode} onChange={handleChange} />
        <span className="dig-mode-side"><PickaxeMonochromeVector /></span>
        <span className="flag-mode-side"><FlagMonochromeVector /></span>
      </label>
    </div>
  );
}
