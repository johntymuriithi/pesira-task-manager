import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import HomePage from './HomePage';
import Dashboard from './Dashboard';
import NotFound from './NotFound';
import LoadingScreen from './LoadingScreen';

export default function AppRouter() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  
  // Simulating auth check on component mount
  useEffect(() => {
    // In a real app, this would check for a token in localStorage or cookies
    // and potentially validate it with the backend
    const checkAuth = () => {
      const token = localStorage.getItem('authToken');
      setIsAuthenticated(!!token);
      setIsLoading(false);
    };
    
    // Small delay to mimic network request
    setTimeout(checkAuth, 500);
  }, []);
  
  // Auth functions to be passed as props
  const login = (token) => {
    localStorage.setItem('authToken', token);
    setIsAuthenticated(true);
  };
  
  const logout = () => {
    localStorage.removeItem('authToken');
    setIsAuthenticated(false);
  };
  
  if (isLoading) {
    return <LoadingScreen />;
  }
  
  return (
    <Router>
      <Routes>
        {/* Public routes */}
        <Route 
          path="/" 
          element={isAuthenticated ? <Navigate to="/dashboard" /> : <HomePage onLogin={login} />} 
        />
        
        {/* Protected routes */}
        <Route 
          path="/dashboard/*" 
          element={isAuthenticated ? <Dashboard onLogout={logout} /> : <Navigate to="/" />} 
        />
        
        {/* 404 route */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}