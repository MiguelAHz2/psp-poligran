import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './components/LoginPage';
import HomePage from './components/HomePage';
import RegisterPage from './components/RegisterPage'; 
import AdminUsersPage from './components/AdminUsersPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/register" element={<RegisterPage />} /> 
        <Route path="/admin-users" element={<AdminUsersPage />} />
      </Routes>
    </Router>
  );
}

export default App;
