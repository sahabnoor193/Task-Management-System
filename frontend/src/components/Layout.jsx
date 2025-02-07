import { Outlet, NavLink } from "react-router-dom";
import { Home, ListChecks, Calendar, MessageSquare } from "lucide-react";

const Layout = () => {
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white p-5 shadow-md flex flex-col justify-between">
        {/* Title */}
        <h2 className="text-lg font-semibold mb-6">Start Your Day ✌️</h2>

        {/* Navigation Links */}
        <nav className="space-y-4">
          <NavItem to="/" icon={<Home size={20} />} label="Dashboard" />
          <NavItem to="/tasks" icon={<ListChecks size={20} />} label="My Tasks" />
          <NavItem to="/calendar" icon={<Calendar size={20} />} label="Calendar" />
          <NavItem to="/messages" icon={<MessageSquare size={20} />} label="Messages" badge={6} />
        </nav>

        {/* User Section */}
        <div className="flex items-center space-x-3 border-t pt-4 mt-4">
          <img src="https://i.pravatar.cc/40" alt="User Avatar" className="w-10 h-10 rounded-full" />
          <div>
            <p className="text-sm font-semibold">Michie ✌️</p>
            <span className="text-xs text-gray-500">+2</span>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
};

const NavItem = ({ to, icon, label, badge }) => (
  <NavLink
    to={to}
    className={({ isActive }) =>
      `flex items-center p-2 rounded-lg transition ${isActive ? "bg-black text-white" : "hover:bg-gray-200"}`
    }
  >
    {icon}
    <span className="ml-3">{label}</span>
    {badge && <span className="ml-auto bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">{badge}</span>}
  </NavLink>
);

export default Layout;
