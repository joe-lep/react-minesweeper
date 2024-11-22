import './Header.scss';
import HeaderVector from '@/assets/flag-and-mine-icon.svg?react';

export default function Header() {
  return (
    <div className="header-container">
      <header>
        <h1 className="header-regular">
          <HeaderVector />
          <span className="header-text">React Minesweeper</span>
        </h1>
      </header>
    </div>
  );
}
