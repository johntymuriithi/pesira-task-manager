import { useContext } from 'react';
import UserContext from './context/UserContext';
import HomePage from './pages/HomePage';
import Dashboard from './pages/Dashboard';

function App() {
  const { user } = useContext(UserContext);

  return <div>{user ? <Dashboard /> : <HomePage />}</div>;
}

export default App;
