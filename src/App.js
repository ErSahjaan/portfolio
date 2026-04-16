import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import logo from './logo.svg';
import './App.css';



import PrintCraft from './pages/AITeacher/CrapftTshirt';

function App() {
  return (
    <Router>
      <div className="App">

        <Routes>
            <Route path="/ai-design" element={<PrintCraft/>} />
           
           
          {/* <Route path="/" element={<TestCode />} /> */}
             <Route path="/" element={<PrintCraft />} />
 
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
