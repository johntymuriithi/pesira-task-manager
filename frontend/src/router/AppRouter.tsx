// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import { useState, useEffect } from 'react';
// import HomePage from '@/pages/HomePage';
// import Dashboard from '@/pages/Dashboard';

// export default function AppRouter() {
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   const [isLoading, setIsLoading] = useState(true);
  
//   useEffect(() => {
//     const token = localStorage.getItem('authToken');
//     setIsAuthenticated(!!token);
//     setIsLoading(false);
//   }, []);
  
//   const login = (token) => {
//     localStorage.setItem('authToken', token);
//     setIsAuthenticated(true);
//   };
  
//   const logout = () => {
//     localStorage.removeItem('authToken');
//     setIsAuthenticated(false);
//   };

//   // Optional loading screen
//   // if (isLoading) return <LoadingScreen />;

//   return (
//     <Router>
//       <Routes>
//         {/* Always render HomePage on root */}
//         <Route path="/" element={<Dashboard />} />

//         {/* Dashboard is still protected */}
//         <Route 
//           path="/dashboard/*" 
//           element={isAuthenticated ? <Dashboard onLogout={logout} /> : <HomePage onLogin={login} />} 
//         />
//       </Routes>
//     </Router>
//   );
// }
