import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { SignUp } from "./pages/SignUp";
import { SignIn } from "./pages/SignIn";
import { TasksPage } from "./pages/Taskpage";
import { Notifications } from "./components/Notifications";
import { Profile } from "./components/Profile"; 

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/tasks" element={<TasksPage />} />
        <Route path="/notifications" element={<Notifications />} />
        <Route path="/profile" element={<Profile />} /> 
        <Route path="/" element={<Navigate to="/tasks" />} />
      </Routes>
    </Router>
  );
}

export default App;
