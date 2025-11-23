import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import logo from './logo.svg';
import './App.css';
import Portfolio from './portfolio';
import EnhancedPortfolio from './perfesionalporfolio';

function App() {
  return (
    <Router>
      <div className="App">

        <Routes>
          {/* Home route */}
          <Route path="/" element={<Portfolio />} />
  <Route path="/updated-portfolio" element={<EnhancedPortfolio />} />
          {/* Add more routes here */}
          {/* 
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          */}
        </Routes>

      </div>
    </Router>
  );
}

export default App;
