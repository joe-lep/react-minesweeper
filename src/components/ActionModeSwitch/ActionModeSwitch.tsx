import { ChangeEvent, useCallback } from "react";
import { DIG_MODE, FLAG_MODE } from "../../config/action-modes";
import { useActionModeState } from "../GameManager";

export default function ActionModeSwitch() {
  const { actionMode, setActionMode } = useActionModeState();

  const handleChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      switch (event.target.value) {
        case DIG_MODE:
          setActionMode(DIG_MODE);
          return;
        case FLAG_MODE:
          setActionMode(FLAG_MODE);
          return;
      }
    },
    [setActionMode],
  );
  

  return (
    <div className="action-mode-switch">
      <label><input type="radio" name="action-mode" value={DIG_MODE} checked={actionMode === DIG_MODE} onChange={handleChange} />Dig</label>
      <label><input type="radio" name="action-mode" value={FLAG_MODE} checked={actionMode === FLAG_MODE} onChange={handleChange} />Flag</label>
    </div>
  );
}
