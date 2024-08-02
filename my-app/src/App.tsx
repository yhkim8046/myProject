import React from 'react';
import { BrowserRouter as Router, Route, Routes, } from 'react-router-dom';
import Home from './pages/Home';
import Posting from './pages/Posting';
import Detail from './pages/Detail';
import Feedback from './pages/Feedback';
import Signup from './pages/Signup';
import Diaries from './pages/Diaries';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Home" element={<Home />} />
        <Route path="/Signup" element={<Signup/>}/>
        <Route path="/posting" element={<Posting />} />
        <Route path="/detail/:id" element={<Detail />} />
        <Route path="/Feedback" element={<Feedback />} />
        <Route path="/DiariesList" element={<Diaries />} />
      </Routes>
    </Router>
  );
}

export default App;
