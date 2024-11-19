import { ChangeEvent, useCallback } from "react";
import { useFlagModeState } from "../GameManager";
import clsx from "clsx";
import PickaxeMonochromeVector from '../../assets/pickaxe-monochrome.svg?react';
import FlagMonochromeVector from '../../assets/flag-monochrome.svg?react';
import CapsuleControl from "../CapsuleControl";

export default function ActionModeSwitch() {
  const { isFlagMode, setIsFlagMode } = useFlagModeState();

  const handleChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setIsFlagMode(event.target.checked);
    },
    [setIsFlagMode],
  );

  return (
    <CapsuleControl Component="label">
      <input type="checkbox" checked={isFlagMode} onChange={handleChange} />
      <span className={clsx({ active: !isFlagMode })}><PickaxeMonochromeVector /></span>
      <span className={clsx({ active: isFlagMode })}><FlagMonochromeVector /></span>
    </CapsuleControl>
  );
}
