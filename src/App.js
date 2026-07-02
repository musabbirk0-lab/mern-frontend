import React, { useState } from 'react';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import ProjectList from './components/ProjectList';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

function App() {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [page, setPage] = useState('home');

  const handleLogout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setPage('home');
  };

  if (!token) {
    return (
      <div style={{ padding: 20, maxWidth: 500, margin: 'auto' }}>
        <h1>MERN Portfolio</h1>
        <div>
          <button onClick={() => setPage('login')}>Login</button>
          <button onClick={() => setPage('register')}>Register</button>
          <button onClick={() => setPage('home')}>View Projects</button>
        </div>
        {page === 'login' && <Login setToken={setToken} API_URL={API_URL} />}
        {page === 'register' && <Register setToken={setToken} API_URL={API_URL} />}
        {page === 'home' && <ProjectList API_URL={API_URL} />}
      </div>
    );
  }

  return (
    <div style={{ padding: 20 }}>
      <button onClick={handleLogout}>Logout</button>
      <Dashboard API_URL={API_URL} token={token} />
      <ProjectList API_URL={API_URL} />
    </div>
  );
}

export default App;
