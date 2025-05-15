
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { FileText, Gauge, LogOut, SendHorizontal, User } from 'lucide-react';


const Dashboard = () => {
  const navigate = useNavigate();
  const [idea, setIdea] = useState('');
  const [activeMode, setActiveMode] = useState<string | null>("validator");
  const [showUserMenu, setShowUserMenu] = useState(false);
  const storedUser = localStorage.getItem('user');
      if (!storedUser) {
        alert('User not logged in.');
        navigate('/login'); // Redirect to login if user is not logged in
      }
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (idea.trim()) {
      toast.success("Idea submitted successfully!");
      setIdea('');
    }
  };

  const handleModeClick = (mode: string) => {
    localStorage.setItem('activeMode', mode);
    setActiveMode(mode);
    toast.info(`Switched to ${mode} mode`);
    navigate('/welcome');
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    setShowUserMenu(false);
    navigate('/login');
    toast.info("Logged out successfully");
  };

  return (
    <div className="flex h-screen w-full font-orbitron overflow-hidden">
      <header className="fixed top-0 left-0 right-0 flex items-center justify-between p-4 border-b border-white/10 bg-sidebar z-10">
        <div className="flex items-center">
          <h1 className="text-xl font-bold tracking-widest text-white">UDBHAVA</h1>
          <p className="text-xs text-white/70 tracking-widest ml-2">START UP VALIDATOR</p>
        </div>
        
        <div className="relative">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => setShowUserMenu(!showUserMenu)}
            className="text-white/80 hover:text-white hover:bg-white/10 rounded-full"
          >
            <User size={20} />
          </Button>
          
          {showUserMenu && (
            <Card className="absolute right-0 mt-2 w-48 bg-black/90 border-white/10 text-white z-20">
              <CardContent className="p-2 space-y-1">
                <div className="flex items-center gap-2 p-2 text-sm">
                  <User size={16} />
                  <span>Username</span>
                </div>
                <div className="flex items-center gap-2 p-2 text-sm">
                  <FileText size={16} />
                  <span>Email</span>
                </div>
                <Button 
                  onClick={handleLogout} 
                  variant="ghost" 
                  className="w-full flex items-center justify-start gap-2 p-2 text-sm hover:bg-white/10"
                >
                  <LogOut size={16} />
                  <span>Logout</span>
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center p-8 bg-gradient-to-br from-udbhava-dark-purple to-udbhava-darker-purple mt-16">
        <div className="max-w-3xl w-full flex flex-col items-center space-y-12 animate-fade-in">
          <div className="text-center space-y-3">
            <h1 className="text-5xl font-bold tracking-wider text-white animate-pulse-slow">
              WELCOME TO UDBHAVA
            </h1>
            <p className="text-xl text-white/80 tracking-widest">
              WHERE IDEAS EARN THEIR WINGS
            </p>
          </div>
          
          <div className="w-full flex flex-wrap justify-center gap-4">
            <Button
              onClick={() => handleModeClick("validator")}
              className={`w-36 py-6 ${activeMode === "validator" ? 'bg-udbhava-purple' : 'bg-udbhava-darker-purple border border-white/20'}`}
            >
              <div className="flex flex-col items-center gap-2">
                <FileText size={24} />
                <span>Validator mode</span>
              </div>
            </Button>
            
            <Button
              onClick={() => handleModeClick("risk")}
              className={`w-36 py-6 ${activeMode === "risk" ? 'bg-udbhava-purple' : 'bg-udbhava-darker-purple border border-white/20'}`}
            >
              <div className="flex flex-col items-center gap-2">
                <Gauge size={24} />
                <span>Risk mode</span>
              </div>
            </Button>
            
            <Button
              onClick={() => handleModeClick("planner")}
              className={`w-36 py-6 ${activeMode === "planner" ? 'bg-udbhava-purple' : 'bg-udbhava-darker-purple border border-white/20'}`}
            >
              <div className="flex flex-col items-center gap-2">
                <FileText size={24} />
                <span>Planner mode</span>
              </div>
            </Button>
          </div>
          
          
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
