import { Provider } from 'react-redux';
// import { store } from './store';
// import AppRouter from './router/AppRouter';
import Dashboard from './pages/Dashboard';
import LoadingScreen from './pages/LoadingScreen';
import NotFound from './pages/NotFound';
import AddTaskModal from './pages/AddTaskModal';
import TaskCard from './pages/TaskCard';

export default function App() {
  return (
    <div>
      <Dashboard />
      {/* <LoadingScreen /> */}
      {/* <NotFound /> */}
     
    </div>
  );
}