import { ChangeEvent, useCallback } from 'react';
import clsx from 'clsx';

import CapsuleControl from '@/components/CapsuleControl';
import { useFlagModeState } from '@/components/GameManager';

import FlagMonochromeVector from '@/assets/flag-monochrome.svg?react';
import PickaxeMonochromeVector from '@/assets/pickaxe-monochrome.svg?react';

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
