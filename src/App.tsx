import './App.css'
import { GameManager } from './components/GameManager';
import Grid from './components/Grid';
import Header from './components/Header';
import Toolbar from './components/Toolbar';

function App() {
  return (
    <GameManager>
      <div className="app-container">
        <Header />
        <Toolbar />
        <Grid />
      </div>
    </GameManager>
  )
}

export default App
