import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Mainpage from "./components/mainpage"
import ScorePage from "./components/scorepage"
import Navbar from "./components/navbar"

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Mainpage />} />
        <Route path="/results" element={<ScorePage />} />
      </Routes>
    </BrowserRouter>


  );
}

export default App;
