import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Portfolio from './perfesionalporfolio';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/portfolio" element={<Portfolio />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
