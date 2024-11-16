import ActionModeSwitch from '../ActionModeSwitch';
import GameStartModal from '../GameStartModal';
import './Toolbar.css'

export default function Toolbar() {
  return (
    <div className="toolbar-container">
      <span className="toolbar-padder" />
      <div><ActionModeSwitch /></div>
      <div><GameStartModal /></div>
    </div>
  );
}
