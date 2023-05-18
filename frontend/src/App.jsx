import { useState } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NavBar from "./components/NavBar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Chat from "./pages/Chat";

function App() {
  return (
    <BrowserRouter>
      <NavBar /> 
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/login" element={<Login />}/>
        <Route path="/signup" element={<Signup />}/>
        <Route path="/chat" element={<Chat />}/>
      </Routes>
      {/* <h1>Chat App</h1> */}
    </BrowserRouter>
  );
}

export default App;
