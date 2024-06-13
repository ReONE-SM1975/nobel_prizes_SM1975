import React from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom'
import Home from "../pages/Home"
import '../styles/App.css';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App;
