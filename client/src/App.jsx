import React from "react";
import {  BrowserRouter,  Route,  Routes} from "react-router-dom";
import Main from "./pages/Main";
import Landing from "./pages/Landing";
import Navbar from "./components/Navbar";
import SignUp from "./components/auth/SignUp";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/main" element={<Main />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
