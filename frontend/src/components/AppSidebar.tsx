
import React, { useState } from 'react';
import { AlignJustify, FileText, Gauge, User, LogOut, Plus } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { Card, CardContent } from '@/components/ui/card';

type SidebarItemProps = {
  icon: React.ReactNode;
  label: string;
  onClick?: () => void;
  active?: boolean;
};

const SidebarItem = ({ icon, label, onClick, active }: SidebarItemProps) => {
  return (
    <Button
      variant="ghost"
      onClick={onClick}
      className={cn(
        "w-full flex items-center justify-start gap-3 px-4 py-3 text-sm font-medium rounded-md hover:bg-udbhava-purple/20 transition-colors",
        active ? "bg-udbhava-purple/30 text-white" : "text-white/80"
      )}
    >
      {icon}
      <span>{label}</span>
    </Button>
  );
};

const AppSidebar = () => {
  const activeMode = localStorage.getItem("activeMode") || "validator";
  const [collapsed, setCollapsed] = useState(false);
  const [activeItem, setActiveItem] = useState<string | null>(activeMode);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const storedUser = localStorage.getItem('user');
  const navigate = useNavigate();
  if (!storedUser) {
    alert('User not logged in.');
    navigate('/login'); // Redirect to login if user is not logged in
  }


  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  const handleProfileClick = () => {
    setShowUserMenu(!showUserMenu);
  }

  const handleItemClick = (itemName: string) => {
    localStorage.setItem("activeMode", itemName);
    setActiveItem(itemName);
    toast.info(`Switched to ${itemName} mode`);
    
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    setShowUserMenu(false);
    navigate('/login');
    toast.info("Logged out successfully");
  };
  return (
    <div
      className={cn(
        "h-screen bg-sidebar flex flex-col border-r border-white/10 transition-all duration-300",
        collapsed ? "w-10" : "w-64"
      )}
    >
      <div className="flex items-center p-4 border-b border-white/10">
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={toggleSidebar}
          className="text-white/80 hover:text-white hover:bg-white/10"
        >
          <AlignJustify size={20} />
        </Button>
        {!collapsed && (
          <h1 className="ml-2 text-xl font-bold tracking-widest text-white">UDBHAVA</h1>
        )}
      </div>

      <div className="flex-1 overflow-y-auto py-4 space-y-1 px-2">
        <div className="mb-6 h-24 bg-black/20 rounded-md"></div>
        <SidebarItem
          icon={<FileText size={20} />}
          label="Validator mode"
          active={activeItem === "validator"}
          onClick={() => handleItemClick("validator")}
        />
        <SidebarItem
          icon={<Gauge size={20} />}
          label="Risk mode"
          active={activeItem === "risk"}
          onClick={() => handleItemClick("risk")}
        />
        <SidebarItem
          icon={<FileText size={20} />}
          label="Planner mode"
          active={activeItem === "planner"}
          onClick={() => handleItemClick("planner")}
        />
        
        {/* <SidebarItem
          icon={<Plus size={20} />}
          label="Start a new chat"
          active={activeItem === "new-chat"}
          onClick={() => handleItemClick("new-chat")}
        /> */}
      </div>
      <div className='relative flex items-center'>
      {showUserMenu && (
                      <Card className="absolute left-0 mt-2 w-48 bg-black/90 border-white/10 text-white z-20">
                        <CardContent className="p-2 space-y-1">
                          <div className="flex items-center gap-2 p-2 text-sm">
                            <User size={16} />
                            <span>Username</span>
                          </div>
                          <div className="flex items-center gap-2 p-2 text-sm">
                            <FileText size={16} />
                            <span>Email</span>
                          </div>
                        </CardContent>
                      </Card>
                    )}
      </div>

      <div className="border-t border-white/10 pt-2 pb-4 px-2 space-y-1">
      
        <SidebarItem
          icon={<User size={20} />}
          label="User profile"
          active={activeItem === "profile"}
          onClick={() => handleProfileClick()}
        />
        <SidebarItem
          icon={<LogOut size={20} />}
          label="Logout"
          onClick={() => handleLogout()}
        />
      </div>
    </div>
  );
};

export default AppSidebar;
