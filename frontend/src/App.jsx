import React, { useState } from 'react';
import Navbar from './components/Navbar';
import HomePage from './components/HomePage';
import LoginForm from './components/LoginForm';
import SignupForm from './components/SignupForm';
import Dashboard from './components/Dashboard';

function App() {
  const [currentView, setCurrentView] = useState('home');
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleViewChange = (view) => {
    setCurrentView(view);
  };

  const handleLogin = (credentials) => {
    // TODO: Implement authentication
    setIsAuthenticated(true);
    setCurrentView('dashboard');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar 
        onViewChange={handleViewChange}
        isAuthenticated={isAuthenticated}
        onLogout={() => {
          setIsAuthenticated(false);
          setCurrentView('home');
        }}
      />
      <main className="container mx-auto px-4 py-8 mt-16">
        {!isAuthenticated ? (
          <>
            {currentView === 'home' && <HomePage onViewChange={handleViewChange} />}
            {currentView === 'login' && <LoginForm onViewChange={handleViewChange} onLogin={handleLogin} />}
            {currentView === 'signup' && <SignupForm onViewChange={handleViewChange} />}
          </>
        ) : (
          <Dashboard />
        )}
      </main>
    </div>
  );
}

export default App;