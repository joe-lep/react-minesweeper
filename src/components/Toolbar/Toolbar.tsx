import './Toolbar.scss';
import ActionModeSwitch from '@/components/ActionModeSwitch';
import GameStartModal from '@/components/GameStartModal';

export default function Toolbar() {
  return (
    <div className="toolbar-container">
      <span className="toolbar-padder" />
      <div><ActionModeSwitch /></div>
      <div><GameStartModal /></div>
    </div>
  );
}
