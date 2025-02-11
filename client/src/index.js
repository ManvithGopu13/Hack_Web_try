import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CreateAccount from './CreateAccount'; // New component
import Login from './Login';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<CreateAccount />} />
        <Route path="/login" element={<Login />} /> {/* Added Login route */}
        <Route path="/app" element={<App />} />
      </Routes>
    </Router>
  </React.StrictMode>
);
