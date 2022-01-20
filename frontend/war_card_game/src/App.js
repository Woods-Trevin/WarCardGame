import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Mainpage from "./components/mainpage"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Mainpage />} />
        <Route path="/results" element={ } />
      </Routes>
    </BrowserRouter>


  );
}

export default App;
