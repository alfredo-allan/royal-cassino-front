import React, { useEffect } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { Toaster } from "./components/ui/toaster";
import Header from "./components/Header";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import CookieModal from "./components/modals/CookieModal";

function App() {
  return (
    <AuthProvider>
      <div className="App min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 dark:from-black dark:via-purple-950 dark:to-black">
        <BrowserRouter>
          <Header />
          <main className="pt-20">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/profile" element={<Profile />} />
            </Routes>
          </main>
          <CookieModal />
          <Toaster />
        </BrowserRouter>
      </div>
    </AuthProvider>
  );
}

export default App;