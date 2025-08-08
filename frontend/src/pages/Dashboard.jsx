import { Link } from 'react-router-dom';
import Button from '../components/Button.jsx';
import { useAuth } from '../context/AuthContext.jsx';

export default function Dashboard() {
  const { user, logout } = useAuth();
  return (
    <div className="p-4 space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <div className="space-x-2">
          <span className="text-gray-600">{user.role}</span>
          <Button onClick={logout}>Logout</Button>
        </div>
      </div>
      <div className="grid gap-4 grid-cols-2 md:grid-cols-4">
        <Link to="/fuel">
          <div className="bg-white p-4 shadow rounded text-center">Fuel</div>
        </Link>
        {/* Additional module links can be added here */}
      </div>
    </div>
  );
}
