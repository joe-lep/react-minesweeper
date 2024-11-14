import './App.css'
import { GameManager } from './components/GameManager';
import Grid from './components/Grid';
import Header from './components/Header';
import StatsSection from './components/StatsSection';
import Toolbar from './components/Toolbar';

function App() {
  return (
    <GameManager>
      <div className="app-container">
        <Header />
        <StatsSection />
        <Toolbar />
        <Grid />
      </div>
    </GameManager>
  )
}

export default App
