import React from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Home from "../pages/Home";

import ResultContextProvider from "../context/ResultContext";

import '../styles/App.css';

function App() {
  return (
    <div className="App">
      <ResultContextProvider>

      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </BrowserRouter>
      </ResultContextProvider>
    </div>
  )
}

export default App;
