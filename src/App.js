import React from "react";
import Header from "./components/Header";
import Form from "./components/Form";
import Timeline from "./components/Timeline";
import { Routes,Route } from "react-router-dom";


function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
      <Route path="/" element={<Form />} />
      <Route path="/timeline" element={<Timeline />} />
      </Routes>
    </div>
  );
}

export default App;
