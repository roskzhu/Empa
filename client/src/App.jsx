import React from "react";
import {  BrowserRouter,  Route,  Routes} from "react-router-dom";
import Main from "./pages/Main";
import Landing from "./pages/Landing";
import Navbar from "./components/Navbar";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/main" element={<Main />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
