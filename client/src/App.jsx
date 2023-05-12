import { useState } from "react";
import IndexPage from "./pages/IndexPage";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<IndexPage />} />
      <Route path="/login" element={<LoginPage />} />
    </Routes>
  );
}

export default App;
