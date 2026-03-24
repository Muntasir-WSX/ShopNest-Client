import React, { useState } from 'react';
import { NavLink, Outlet, Link } from 'react-router-dom';
import { 
  HiOutlineChartBar, 
  HiOutlineClipboardList, 
  HiOutlinePlusCircle, 
  HiOutlineCube, 
  HiOutlineUsers,
  HiOutlineHome,
  HiMenuAlt2
} from 'react-icons/hi';
import { LogOut, X } from 'lucide-react';
import useAuth from '../Context/UseAuth';
import FooterLogo from '../Shared Components/Logo/FooterLogo';

const AdminLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { logOut, user } = useAuth();

  const menuItems = [
    { name: 'Analytics', path: '/dashboard', icon: <HiOutlineChartBar />, index: true },
    { name: 'Manage Orders', path: '/dashboard/manage-orders', icon: <HiOutlineClipboardList /> },
    { name: 'Post New Product', path: '/dashboard/add-product', icon: <HiOutlinePlusCircle /> },
    { name: 'All Products', path: '/dashboard/all-products', icon: <HiOutlineCube /> },
    { name: 'Users', path: '/dashboard/users', icon: <HiOutlineUsers /> },
  ];

  const SidebarContent = () => (
    <div className="flex flex-col h-full bg-white border-r border-gray-100">
      {/* 1. Profile Section */}
      <div className="p-6 border-b border-gray-50 bg-green-50/30">
        <div className="flex items-center gap-3">
          <img 
            src={user?.photoURL || "https://i.ibb.co/mJR9Hxc/user-avatar.png"} 
            className="w-12 h-12 rounded-2xl border-2 border-white shadow-sm object-cover" 
            alt="Admin" 
          />
          <div>
            <h2 className="text-sm font-black text-gray-800 truncate w-32">{user?.displayName}</h2>
            <span className="text-[10px] bg-[#059669] text-white px-2 py-0.5 rounded-full font-bold uppercase tracking-wider">Admin</span>
          </div>
        </div>
      </div>

      {/* 2. Menu Links */}
      <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
        <p className="px-3 text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-4">Main Menu</p>
        {menuItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            end={item.index}
            onClick={() => setIsSidebarOpen(false)}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3.5 rounded-2xl text-sm font-bold transition-all duration-300 ${
                isActive 
                ? 'bg-[#059669] text-white shadow-lg shadow-green-100 translate-x-1' 
                : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'
              }`
            }
          >
            <span className="text-xl">{item.icon}</span>
            {item.name}
          </NavLink>
        ))}
        
        <div className="pt-4 mt-4 border-t border-gray-100">
            <Link to="/" className="flex items-center gap-3 px-4 py-3.5 rounded-2xl text-sm font-bold text-gray-500 hover:bg-gray-50 transition-all">
                <HiOutlineHome className="text-xl" />
                Back to Home
            </Link>
        </div>
      </nav>

      {/* 3. Footer / Logout */}
      <div className="p-4 border-t border-gray-50">
        <button 
          onClick={logOut}
          className="flex items-center gap-3 w-full px-4 py-3.5 text-red-600 font-bold text-sm bg-red-50 hover:bg-red-100 rounded-2xl transition-all group"
        >
          <LogOut size={18} className="group-hover:-translate-x-1 transition-transform" />
          Sign Out
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#F9FAFB] flex font-sans">
      
      {/* Desktop Sidebar (Fixed) */}
      <aside className="hidden lg:block w-72 sticky top-0 h-screen shadow-sm">
        <SidebarContent />
      </aside>

      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/40 z-110 lg:hidden backdrop-blur-sm"
          onClick={() => setIsSidebarOpen(false)}
        >
          <div 
            className="w-72 h-full animate-in slide-in-from-left duration-300"
            onClick={e => e.stopPropagation()}
          >
            <SidebarContent />
            <button 
              className="absolute top-5 -right-12 p-2 bg-white rounded-full text-gray-800 shadow-xl"
              onClick={() => setIsSidebarOpen(false)}
            >
              <X size={20} />
            </button>
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
        
        {/* Dashboard Header (Mobile Toggle) */}
        <header className="bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between lg:justify-end shrink-0">
          <button 
            className="lg:hidden p-2 hover:bg-gray-100 rounded-xl transition"
            onClick={() => setIsSidebarOpen(true)}
          >
            <HiMenuAlt2 className="text-2xl text-gray-600" />
          </button>
          
          <div className="flex items-center gap-4">
            <div className="text-right hidden sm:block">
               <p className="text-xs font-bold text-gray-400">Dashboard Panel</p>
               <p className="text-sm font-black text-gray-800">Control Center</p>
            </div>
            <FooterLogo /> 
          </div>
        </header>

        {/* Dynamic Page Content */}
        <div className="flex-1 overflow-y-auto p-4 md:p-8">
            <div className="max-w-6xl mx-auto">
                <Outlet />
            </div>
        </div>
      </main>
    </div>
  );
};



export default AdminLayout;