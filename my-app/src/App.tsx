import React from 'react';
import { BrowserRouter as Router, Route, Routes, } from 'react-router-dom';
import Home from './pages/Home';
import Posting from './pages/Posting';
import Detail from './pages/Detail';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/posting" element={<Posting />} />
        <Route path="/detail" element={<Detail></Detail>} />
      </Routes>
    </Router>
  );
}

export default App;
