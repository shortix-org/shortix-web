import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import CreateUrlForm from '@/components/CreateUrlForm';
import UrlList from '@/components/UrlList';

export default function Dashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-4xl mx-auto space-y-6">
        <header className="flex items-center justify-between">
            <h1 className="text-3xl font-bold">Shortix Dashboard</h1>
            <div className="flex items-center gap-4">
                <span className="text-gray-600">Hello, {user?.getUsername()}</span>
                <Button variant="outline" onClick={handleLogout}>Logout</Button>
            </div>
        </header>

        <CreateUrlForm />
        
        <UrlList />
      </div>
    </div>
  );
}
