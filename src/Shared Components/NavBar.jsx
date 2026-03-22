import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { 
  HiMenuAlt3, 
  HiX, 
  HiOutlineShoppingBag, 
  HiOutlineUser, 
  HiOutlineHeart, 
  HiOutlineHome, 
  HiOutlineShoppingCart, 
  HiOutlineBookOpen, 
  HiOutlineQuestionMarkCircle, 
  HiOutlineInformationCircle,
  HiOutlineUserCircle
} from 'react-icons/hi';
import NavLogo from './Logo/NavLogo';
import useAuth from '../Context/UseAuth';
import { LogOut, PackageSearch, Settings, Train, TrainTrackIcon } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logOut } = useAuth();
  const navLinks = [
    { name: 'Home', path: '/', icon: <HiOutlineHome /> },
    { name: 'Shop', path: '/shop', icon: <HiOutlineShoppingCart /> },
    { name: 'Track Order', path: '/track', icon: <PackageSearch/> },

    { name: 'Blogs', path: '/blogs', icon: <HiOutlineBookOpen /> },
    { name: 'FAQ', path: '/faq', icon: <HiOutlineQuestionMarkCircle /> },
    { name: 'About Us', path: '/about', icon: <HiOutlineInformationCircle /> },
  ];

  return (
    <nav className="w-full shadow-sm font-sans sticky top-0 z-100 bg-white">
      {/* 1. Top Bar */}
      <div className="bg-[#FBBF24] py-1 text-[10px] md:text-xs text-gray-800 font-medium">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <span className="hidden sm:inline">
            {user ? (
              <span>Welcome back, <span className="font-bold underline">{user?.displayName?.split(' ')[0]}</span>!</span>
            ) : (
              <span>Call Us: +880 1960551472</span>
            )}
          </span>
          <span className="mx-auto sm:mx-0 font-bold uppercase tracking-wider">
            Free Shipping on orders over ৳500! 🚚
          </span>
        </div>
      </div>

      {/* 2. Main Header */}
      <div className="bg-[#059669] py-1.5 md:py-2">
        <div className="container mx-auto px-4 flex items-center justify-between">
          
          {/* Logo Section */}
          <NavLogo />

          {/* Desktop Navigation Links */}
          <ul className="hidden lg:flex items-center gap-8 ml-10">
            {navLinks.map(link => (
              <li key={link.name}>
                <NavLink 
                  to={link.path}
                  className={({ isActive }) => 
                    `text-sm font-bold transition-all duration-300 flex items-center gap-1.5 ${
                      isActive ? 'text-yellow-400' : 'text-white hover:text-yellow-300'
                    }`
                  }
                >
                  <span className="text-lg">{link.icon}</span>
                  {link.name}
                </NavLink>
              </li>
            ))}
          </ul>

          {/* Actions: Wishlist, Cart, User */}
          <div className="flex items-center gap-3 md:gap-6 border-l border-white/20 pl-4 md:pl-6">
            
            {/* Wishlist */}
            <Link to="/wishlist" className="relative text-white hover:text-yellow-400 transition group">
              <HiOutlineHeart className="text-2xl" />
            </Link>

            {/* Cart */}
            <Link to="/cart" className="relative text-white hover:text-yellow-400 transition group">
              <HiOutlineShoppingBag className="text-2xl" />
            </Link>

            {/* Profile Dropdown */}
            {user ? (
              <div className="dropdown dropdown-end">
                <div tabIndex={0} role="button" className="flex items-center gap-2 outline-none cursor-pointer">
                  <div className="relative">
                    <img 
                      src={user?.photoURL || "https://i.ibb.co/mJR9Hxc/user-avatar.png"} 
                      className="w-9 h-9 md:w-10 md:h-10 rounded-full border-2 border-yellow-400 object-cover shadow-md"
                      alt="User"
                    />
                    <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 border-2 border-[#059669] rounded-full"></div>
                  </div>
                </div>
                <ul tabIndex={0} className="dropdown-content z-110 p-2 shadow-2xl bg-white rounded-2xl w-60 mt-4 border border-gray-100 list-none text-gray-800 animate-in fade-in slide-in-from-top-2 duration-200">
                  <li className="px-4 py-4 border-b border-gray-50 mb-2 bg-gray-50/50 rounded-t-xl">
                    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-1">Signed in as</p>
                    <p className="text-sm font-black text-gray-800 truncate">{user?.displayName || 'User'}</p>
                    <p className="text-[10px] text-gray-500 truncate">{user?.email}</p>
                  </li>
                  
                  <li>
                    <Link to="/profile" className="flex items-center gap-3 p-3 hover:bg-green-50 rounded-xl text-sm font-bold text-gray-700 transition group/item">
                      <HiOutlineUserCircle className="text-xl text-gray-400 group-hover/item:text-[#059669]" />
                      <span>My Profile</span>
                    </Link>
                  </li>

                  <li className="border-t border-gray-50 mt-1 pt-1">
                    <button 
                      onClick={logOut} 
                      className="w-full flex items-center gap-3 p-3 text-red-600 hover:bg-red-50 rounded-xl text-sm font-bold transition group/logout"
                    >
                      <LogOut size={18} className="transition-transform group-hover/logout:-translate-x-1" />
                      <span>Sign Out</span>
                    </button>
                  </li>
                </ul>
              </div>
            ) : (
              <Link to="/signin" className="text-white hover:text-yellow-400 transition group flex flex-col items-center">
                <HiOutlineUser className="text-2xl" />
                <span className="text-[8px] uppercase font-bold hidden md:block">Login</span>
              </Link>
            )}

            {/* Mobile Menu Toggle */}
            <button className="lg:hidden text-white text-2xl active:scale-90 transition-transform" onClick={() => setIsOpen(true)}>
              <HiMenuAlt3 />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Overlay */}
      <div className={`fixed inset-0 bg-black/60 z-101 transition-opacity duration-300 lg:hidden ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} onClick={() => setIsOpen(false)}>
        <div className={`bg-white w-72 h-full shadow-2xl transition-transform duration-300 flex flex-col ${isOpen ? 'translate-x-0' : '-translate-x-full'}`} onClick={e => e.stopPropagation()}>
          <div className="p-5 bg-[#059669] text-white flex justify-between items-center">
            <NavLogo />
            <div className="p-2 hover:bg-white/10 rounded-full cursor-pointer transition" onClick={() => setIsOpen(false)}>
              <HiX className="text-2xl" />
            </div>
          </div>
          
          <div className="p-4 flex flex-col gap-2 overflow-y-auto">
            <p className="px-3 text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">Menu</p>
            {navLinks.map(link => (
              <NavLink 
                key={link.name} 
                to={link.path} 
                onClick={() => setIsOpen(false)}
                className={({ isActive }) => 
                  `flex items-center gap-4 p-3.5 rounded-xl font-bold text-sm transition-all ${
                    isActive ? 'bg-green-50 text-[#059669] shadow-sm' : 'text-gray-700 hover:bg-gray-50'
                  }`
                }
              >
                <span className="text-xl opacity-70">{link.icon}</span>
                {link.name}
              </NavLink>
            ))}
          </div>

          <div className="mt-auto p-4 border-t border-gray-100 bg-gray-50">
            {!user ? (
               <Link 
                to="/signin" 
                onClick={() => setIsOpen(false)}
                className="flex items-center justify-center gap-2 w-full py-3 bg-[#059669] text-white rounded-xl font-bold shadow-lg"
               >
                 <HiOutlineUser className="text-lg" />
                 Login / Register
               </Link>
            ) : (
              <button 
                onClick={() => { logOut(); setIsOpen(false); }}
                className="flex items-center justify-center gap-2 w-full py-3 bg-red-50 text-red-600 rounded-xl font-bold border border-red-100"
              >
                <LogOut size={18} />
                Logout
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;