import React, { useState } from "react";
import { HashRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import Profile from "./pages/Profile";

function App() {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("loggedInUser");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const handleLogin = (userData) => {
    setUser(userData);
    localStorage.setItem("loggedInUser", JSON.stringify(userData));
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("loggedInUser");
  };

  const handleSignup = (newUser) => {
    setUser(newUser);
    localStorage.setItem("loggedInUser", JSON.stringify(newUser));
  };

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={<Home onLogout={handleLogout} user={user} />}
        />
        <Route
          path="/login"
          element={user ? <Navigate to="/" /> : <Login onLogin={handleLogin} />}
        />
        <Route
          path="/profile"
          element={user ? <Profile user={user} setUser={setUser} /> : <Navigate to="/login" />}
        />
        <Route
          path="/signup"
          element={user ? <Navigate to="/" /> : <Signup onSignup={handleSignup} />}
        />
      </Routes>
    </Router>
  );
}

export default App;
