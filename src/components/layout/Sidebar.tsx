
import { useState } from "react";
import { 
  Calendar, 
  Clock, 
  UserCircle, 
  ClipboardList, 
  Settings,
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import { cn } from "@/lib/utils";

type NavItemProps = {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  onClick?: () => void;
  collapsed: boolean;
};

const NavItem = ({ icon, label, active, onClick, collapsed }: NavItemProps) => (
  <button
    onClick={onClick}
    className={cn(
      "flex items-center w-full px-3 py-2 rounded-md transition-colors",
      "hover:bg-hr-blue-light",
      active ? "bg-hr-blue-light text-hr-blue font-medium" : "text-hr-gray-600"
    )}
  >
    <div className="flex items-center">
      <span className="mr-3">{icon}</span>
      {!collapsed && <span>{label}</span>}
    </div>
  </button>
);

type SidebarProps = {
  activePath: string;
  onNavigate: (path: string) => void;
};

const Sidebar = ({ activePath, onNavigate }: SidebarProps) => {
  const [collapsed, setCollapsed] = useState(false);

  const navItems = [
    { 
      path: "dashboard", 
      label: "Dashboard", 
      icon: <UserCircle size={20} /> 
    },
    { 
      path: "schedule", 
      label: "My Schedule", 
      icon: <Calendar size={20} /> 
    },
    { 
      path: "time-off", 
      label: "Time Off", 
      icon: <Clock size={20} /> 
    },
    { 
      path: "requests", 
      label: "Requests", 
      icon: <ClipboardList size={20} /> 
    },
    { 
      path: "settings", 
      label: "Settings", 
      icon: <Settings size={20} /> 
    },
  ];

  return (
    <div
      className={cn(
        "h-screen bg-white border-r border-hr-gray-200 flex flex-col transition-all duration-300",
        collapsed ? "w-16" : "w-64"
      )}
    >
      <div className="flex items-center justify-between p-4 border-b border-hr-gray-200">
        {!collapsed && <h1 className="text-lg font-semibold">HR Portal</h1>}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="p-1 rounded-full hover:bg-hr-gray-100 focus:outline-none"
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
        </button>
      </div>

      <nav className="flex-1 p-2 space-y-1 overflow-y-auto scrollbar-hidden">
        {navItems.map((item) => (
          <NavItem
            key={item.path}
            icon={item.icon}
            label={item.label}
            collapsed={collapsed}
            active={activePath === item.path}
            onClick={() => onNavigate(item.path)}
          />
        ))}
      </nav>

      <div className="p-4 border-t border-hr-gray-200">
        <div className="flex items-center">
          <div className="w-8 h-8 bg-hr-blue rounded-full flex items-center justify-center text-white font-medium">
            JD
          </div>
          {!collapsed && (
            <div className="ml-3">
              <p className="text-sm font-medium">John Doe</p>
              <p className="text-xs text-hr-gray-500">Software Engineer</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
