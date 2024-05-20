// App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Lobby from "./pages/Lobby";
import CodeBlock from "./pages/CodeBlock"; // Assuming you have a component for displaying code blocks

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Lobby />} />
        <Route path="/codeblock/:id" element={<CodeBlock />} />
      </Routes>
    </Router>
  );
}

export default App;
