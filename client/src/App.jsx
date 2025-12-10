import React, { useState, useEffect } from 'react';

import TransactionHistory from './pages/transactionHistory/TransactionHistory';
import AuthPage from './components/AuthPage';
  
const App = () => {
  // 1. State to track the authenticated user
  const [user, setUser] = useState(null);

  // 2. Effect to check for an existing session on page load
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error("Invalid user data in storage");
        localStorage.removeItem("user");
      }
    }
  }, []);

  // 3. Handler called when AuthPage completes login/signup
  const handleAuthSuccess = (userData) => {
    // Note: AuthPage already saves to localStorage, we just update state here
    setUser(userData);
  };

  // 4. Handler for logging out
  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* 5. Conditional Rendering */}
      {user ? (
        // CHANGE: We now pass 'user' and 'onLogout' as props
        <TransactionHistory user={user} onLogout={handleLogout} />
      ) : (
        // If no user, show the Auth Page
        <AuthPage onAuthSuccess={handleAuthSuccess} />
      )}
    </div>
  )
}

export default App;