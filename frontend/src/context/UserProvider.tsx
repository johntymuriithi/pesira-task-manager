import { useState } from 'react';
import UserContext from './UserContext';


export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
 

  const login = async ( info ) => {
    try {
      const res = await fetch('http://localhost:8080/api/auth/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
         
        },
        body: JSON.stringify(info),
      });

      if (!res.ok) throw new Error('Login failed');

      const data = await res.json();
      console.log(data)
      
      setUser(data);
      localStorage.setItem('token', data.token);
    } catch (err) {
      console.error('Login error:', err.message);
      alert('Invalid credentials');
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('token');
  };


  const signup = async (userInfo) => {
    try {
      const res = await fetch('http://localhost:8080/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userInfo),
      });

      if (!res.ok) throw new Error('Signup failed');
      const data = await res.json();

      setUser(data.user);
      localStorage.setItem('token', data.token);
    } catch (err) {
      alert(err.message);
    }
  };

 

  

  return (
    <UserContext.Provider value={{ user, login, signup, logout}}>
      {children}
    </UserContext.Provider>
  );
};
