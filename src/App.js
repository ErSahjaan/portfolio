import { useState } from 'react';
import { BrowserRouter as Router, Navigate, Routes, Route } from 'react-router-dom';
import Portfolio from './perfesionalporfolio';
import PortfolioBuilder, { SharedPortfolio, VerifyPortfolio } from './PortfolioBuilder';
import './App.css';

function App() {
  const [portfolioSession, setPortfolioSession] = useState(null);

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Navigate to="/portfolio" replace />} />
          <Route path="/portfolio" element={<Portfolio
            initialResumeDraft={portfolioSession?.resumeDraft}
            onOpenPortfolioBuilder={setPortfolioSession}
            onCloseResume={() => setPortfolioSession(null)}
          />} />
          <Route path="/portfolio/build" element={<PortfolioBuilder
            seed={portfolioSession?.seed}
            returnToResume={Boolean(portfolioSession)}
          />} />
          <Route path="/portfolio/custom/:slug?" element={<SharedPortfolio />} />
          <Route path="/portfolio/verify" element={<VerifyPortfolio />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
