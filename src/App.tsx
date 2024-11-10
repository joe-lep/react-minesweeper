import './App.css'
import Grid from './components/Grid'
import Header from './components/Header'
import Toolbar from './components/Toolbar'

function App() {
  return (
    <div className="app-container">
      <Header />
      <Toolbar />
      <Grid width={20} height={20} />
    </div>
  )
}

export default App
