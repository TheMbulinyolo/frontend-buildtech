import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/home';
import List from './pages/list';
import Subscription from './pages/subscription';
import Login from './pages/login';

const App = () => {
  return (
    <Router>
      <div id="top">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/list" element={<List />} />
          <Route path="/subscription" element={<Subscription />} />
          <Route path="/login" element={<Login />} />
          {/* Ajoutez d'autres routes ici si nécessaire */}
        </Routes>
      </div>    
    </Router>
  );
};

export default App;