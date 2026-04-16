import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import logo from './logo.svg';
import './App.css';
import Portfolio from './portfolio';
import EnhancedPortfolio from './perfesionalporfolio';
import MultiIndustryPlatform from './pages/Agentwork';
import Home from './PurneaAirPort/PurneaairPortHome';
import TestCode from './pages/TestCode';
import JobMatchingUI from './pages/Agentwork';
import Plumber from './pages/Plumber/Plumber';
import PlumbingWebsite from './pages/Plumber/Service';
import AppAITeacher from './pages/AITeacher/AIInfluncer';
import PrintCraft from './pages/AITeacher/CrapftTshirt';

function App() {
  return (
    <Router>
      <div className="App">

        <Routes>
            <Route path="/ai-design" element={<PrintCraft/>} />
             <Route path="/ai-teacher" element={<AppAITeacher/>} />
             <Route path="/plumber-service" element={<PlumbingWebsite/>} />
             <Route path="/plumber" element={<Plumber/>} />
            <Route path="/test1" element={<JobMatchingUI/>} />
             <Route path="/test" element={<TestCode/>} />
             <Route path="/purnia-airport" element={<Home />} />
          {/* Home route */}
            <Route path="/agent" element={<MultiIndustryPlatform />} />
          {/* <Route path="/" element={<TestCode />} /> */}
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
