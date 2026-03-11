import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { HiMenuAlt3, HiX, HiSearch, HiOutlineShoppingBag, HiOutlineUser } from 'react-icons/hi';
import { IoLocationOutline } from "react-icons/io5";
import NavLogo from './Logo/NavLogo';
import useAuth from '../Context/UseAuth';
import { LogOut } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logOut } = useAuth();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Shop', path: '/shop' },
    { name: 'Fruits', path: '/fruits' },
    { name: 'Vegetables', path: '/vegetables' },
    { name: 'Beverages', path: '/beverages' },
    { name: 'About Us', path: '/about' },
  ];

  return (
    <nav className="w-full shadow-sm font-sans">
      {/* 1. Top Bar */}
      <div className="bg-[#FBBF24] py-2 text-[10px] md:text-xs text-gray-800 font-medium">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <span className="hidden sm:inline">Call Us: +880 1960551472</span>
          <span className="mx-auto sm:mx-0">
            Sign up and GET 25% OFF for your first order. 
            <Link to="/signup" className="underline font-bold ml-1">Sign up now</Link>
          </span>
        </div>
      </div>

      {/* 2. Main Header */}
      <div className="bg-[#059669] py-3 md:py-4">
        <div className="container mx-auto px-4 flex items-center justify-between gap-2 md:gap-4">
          <NavLogo />
          
          {/* Location - Hidden on Mobile */}
          <div className="hidden lg:flex items-center gap-2 text-white bg-[#067352] px-3 py-2 rounded-lg border border-white/10">
            <IoLocationOutline className="text-xl text-yellow-400" />
            <div className="flex flex-col leading-tight">
              <span className="text-[10px] opacity-80">Deliver to</span>
              <span className="text-xs font-bold">CTG, Bangladesh</span>
            </div>
          </div>

          {/* Search Bar - Responsive */}
          <div className="flex-1 max-w-md bg-white rounded-lg flex items-center overflow-hidden h-10 md:h-11">
            <select className="hidden sm:block bg-gray-100 px-3 h-full text-xs border-r outline-none text-gray-600">
              <option>All</option>
              <option>Fruits</option>
            </select>
            <input 
              type="text" 
              placeholder="Search products..." 
              className="w-full px-4 text-xs md:text-sm outline-none text-gray-700" 
            />
            <button className="bg-yellow-400 px-4 h-full text-gray-800 hover:bg-yellow-500 transition">
              <HiSearch className="text-xl" />
            </button>
          </div>
<div className="border-l border-white/20 pl-3 md:pl-5">
  {user ? (
    <div className="dropdown dropdown-end group">
    
      <div 
        tabIndex={0} 
        role="button" 
        className="flex items-center gap-2 cursor-pointer outline-none focus:outline-none"
      >
        <div className="relative">
          <img 
            src={user?.photoURL || "https://i.ibb.co/mJR9Hxc/user-avatar.png"} 
            alt="User" 
            className="w-9 h-9 md:w-11 md:h-11 rounded-full border-2 border-yellow-400 object-cover shadow-lg transition-transform active:scale-95"
          />
          <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-[#059669] rounded-full"></div>
        </div>
        <div className="hidden xl:block text-left">
           <p className="text-[10px] text-white/70 leading-none mb-0.5">Welcome,</p>
           <p className="text-xs font-bold text-white truncate w-20">
             {user?.displayName ? user.displayName.split(' ')[0] : 'User'}
           </p>
        </div>
      </div>
      <ul 
        tabIndex={0} 
        className="dropdown-content z-100 p-2 shadow-2xl bg-white rounded-2xl w-60 mt-4 border border-gray-100 animate-fadeIn list-none"
      >
        <div className="px-4 py-4 flex items-center gap-3 border-b border-gray-50 mb-2">
            <img 
              src={user?.photoURL || "https://i.ibb.co/mJR9Hxc/user-avatar.png"} 
              className="w-10 h-10 rounded-full border border-gray-100" 
              alt="Profile"
            />
            <div className="flex flex-col overflow-hidden text-left">
              <span className="text-sm font-black text-gray-800 truncate">
                {user?.displayName || 'User Name'}
              </span>
              <span className="text-[10px] text-gray-500 truncate w-36">
                {user?.email}
              </span>
            </div>
        </div>
   
        <li>
          <Link to="/profile" className="flex items-center gap-3 p-3 text-gray-700 hover:bg-green-50 rounded-xl transition group/item">
            <div className="p-2 bg-blue-50 text-blue-600 rounded-lg group-hover/item:bg-blue-600 group-hover/item:text-white transition-colors">
              <HiOutlineUser className="text-lg" />
            </div>
            <span className="font-bold text-sm">My Profile</span>
          </Link>
        </li>
        
        <li>
          <button 
            onClick={logOut}
            className="w-full flex items-center gap-3 p-3 text-red-600 hover:bg-red-50 rounded-xl transition group/logout mt-1"
          >
            <div className="p-2 bg-red-50 text-red-600 rounded-lg group-hover/logout:bg-red-600 group-hover/logout:text-white transition-colors">
               <LogOut />
            </div>
            <span className="font-bold text-sm">Sign Out</span>
          </button>
        </li>
      </ul>
    </div>
  ) : (
    <Link to="/signin" className="flex items-center gap-2 group transition">
       <div className="w-9 h-9 md:w-11 md:h-11 rounded-full bg-white/10 flex items-center justify-center border border-white/20 group-hover:bg-yellow-400 group-hover:text-gray-900 transition-all duration-300">
          <HiOutlineUser className="text-xl" />
       </div>
       <div className="hidden lg:block text-left leading-tight">
          <p className="text-[10px] text-white/70">Guest Account</p>
          <p className="text-xs font-bold uppercase tracking-wider text-white">Login / Sign Up</p>
       </div>
    </Link>
  )}
</div>
        </div>
      </div>

      {/* 3. Bottom Nav & Categories */}
      <div className="bg-white border-b hidden md:block">
        <div className="container mx-auto px-4 flex items-center justify-between py-0">
          <div className="flex items-center gap-8">
            <button className="bg-[#FBBF24] px-6 py-3 font-bold text-sm flex items-center gap-3 text-gray-900">
              <HiMenuAlt3 className="text-xl" /> Browse All Categories
            </button>
            
            <ul className="flex items-center gap-6">
              {navLinks.map(link => (
                <li key={link.name}>
                  <NavLink 
                    to={link.path}
                    className={({ isActive }) => 
                      `text-sm font-semibold transition-colors py-4 inline-block border-b-2 ${
                        isActive ? 'text-[#059669] border-[#059669]' : 'text-gray-600 border-transparent hover:text-[#059669]'
                      }`
                    }
                  >
                    {link.name}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Mobile Bottom Navigation (Floating style for handheld) */}
      <div className="md:hidden fixed bottom-0 left-0 w-full bg-white border-t flex justify-around py-3 z-[100] shadow-[0_-2px_10px_rgba(0,0,0,0.1)]">
         <NavLink to="/" className="flex flex-col items-center text-gray-400">
            <HiMenuAlt3 className="text-xl" />
            <span className="text-[10px]">Home</span>
         </NavLink>
         <div className="flex flex-col items-center text-gray-400" onClick={() => setIsOpen(!isOpen)}>
            <HiSearch className="text-xl" />
            <span className="text-[10px]">Menu</span>
         </div>
         <Link to="/cart" className="relative flex flex-col items-center text-gray-400">
            <HiOutlineShoppingBag className="text-xl" />
            <span className="text-[10px]">Cart</span>
            <span className="absolute -top-1 right-0 bg-green-600 text-white text-[8px] w-3 h-3 rounded-full flex items-center justify-center">0</span>
         </Link>
         <Link to={user ? "/profile" : "/signin"} className="flex flex-col items-center text-gray-400">
            {user ? (
               <img src={user?.photoURL} className="w-5 h-5 rounded-full border border-green-600" />
            ) : (
               <HiOutlineUser className="text-xl" />
            )}
            <span className="text-[10px]">{user ? 'Me' : 'Account'}</span>
         </Link>
      </div>

      {/* Mobile Drawer Overlay */}
      <div className={`fixed inset-0 bg-black/50 z-[101] transition-opacity duration-300 md:hidden ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`} onClick={() => setIsOpen(false)}>
         <div className={`bg-white w-72 h-full shadow-2xl transition-transform duration-300 flex flex-col ${isOpen ? 'translate-x-0' : '-translate-x-full'}`} onClick={e => e.stopPropagation()}>
            <div className="p-5 bg-[#059669] text-white flex justify-between items-center">
               <NavLogo />
               <HiX className="text-2xl cursor-pointer" onClick={() => setIsOpen(false)} />
            </div>
            <div className="p-4 space-y-2 overflow-y-auto">
               <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-4">Main Menu</p>
               {navLinks.map(link => (
                  <NavLink 
                     key={link.name} 
                     to={link.path} 
                     onClick={() => setIsOpen(false)}
                     className="block p-3 rounded-lg text-gray-700 font-semibold hover:bg-green-50 hover:text-green-700 transition"
                  >
                     {link.name}
                  </NavLink>
               ))}
            </div>
         </div>
      </div>
    </nav>
  );
};

export default Navbar;