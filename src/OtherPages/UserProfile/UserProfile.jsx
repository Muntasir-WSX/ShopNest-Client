import React from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { User, ShoppingBag, MapPin, LogOut } from 'lucide-react';
import useAuth from '../../Context/UseAuth';


const UserProfile = () => {
    const { pathname } = useLocation();
    const { logOut } = useAuth();

    const menuItems = [
        { name: "Information", path: "/profile/Info", icon: <User size={20}/> },
        { name: "My Orders", path: "/profile/my-orders", icon: <ShoppingBag size={20}/> },
    ];

    // Responsive Style Logic
    const sidebarBtnStyle = (path) => `flex items-center gap-3 px-6 py-3 rounded-xl font-medium transition-all whitespace-nowrap ${
        pathname === path 
        ? "bg-[#059669] text-white shadow-lg" 
        : "hover:bg-gray-100 text-gray-500 bg-white md:bg-transparent"
    }`;

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 py-6 md:py-10">
                <div className="flex flex-col lg:flex-row gap-8">
                    
                    {/* --- Sidebar Navigation --- */}
                    <div className="lg:w-1/4">
                        {/* Desktop & Tablet: Fixed/Sticky Sidebar */}
                        <div className="hidden lg:block sticky top-24 bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
                            <h2 className="text-xl font-bold mb-6 px-2 text-gray-800">Settings</h2>
                            <nav className="space-y-2">
                                {menuItems.map((item) => (
                                    <Link key={item.path} to={item.path} className={sidebarBtnStyle(item.path)}>
                                        {item.icon} {item.name}
                                    </Link>
                                ))}
                                <button 
                                    onClick={logOut}
                                    className="w-full flex items-center gap-3 px-6 py-3 rounded-xl font-medium text-red-500 hover:bg-red-50 mt-10 transition-all"
                                >
                                    <LogOut size={20}/> Logout
                                </button>
                            </nav>
                        </div>
                        <div className="lg:hidden flex overflow-x-auto gap-3 pb-2 no-scrollbar">
                            {menuItems.map((item) => (
                                <Link key={item.path} to={item.path} className={sidebarBtnStyle(item.path)}>
                                    {item.icon} <span className="text-sm">{item.name}</span>
                                </Link>
                            ))}
                            <button 
                                onClick={logOut}
                                className="flex items-center gap-3 px-6 py-3 rounded-xl font-medium bg-red-50 text-red-500 whitespace-nowrap"
                            >
                                <LogOut size={18}/>
                            </button>
                        </div>
                    </div>

                    {/* --- Content Area --- */}
                    <div className="lg:w-3/4 w-full">
                        <div className="bg-white md:p-8 p-5 rounded-3xl shadow-sm border border-gray-100 min-h-[60vh]">
                            <Outlet />
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default UserProfile;