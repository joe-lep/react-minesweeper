import { TransformWrapper } from 'react-zoom-pan-pinch';
import './App.css'
import { GameManager } from './components/GameManager';
import Grid from './components/Grid';
import Header from './components/Header';
import StatsSection from './components/StatsSection';
import Toolbar from './components/Toolbar';

function App() {
  return (
    <TransformWrapper centerOnInit minScale={0.25} doubleClick={{ disabled: true }} panning={{ allowLeftClickPan: false, allowRightClickPan: false }}>
      <GameManager>
        <div className="app-container">
          <Header />
          <StatsSection />
          <Toolbar />
          <Grid />
        </div>
      </GameManager>
    </TransformWrapper>
  )
}

export default App
