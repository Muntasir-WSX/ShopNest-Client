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
  HiOutlineViewGrid 
} from 'react-icons/hi';
import NavLogo from './Logo/NavLogo';
import useAuth from '../Context/UseAuth';
import { LogOut, PackageSearch } from 'lucide-react';
import useAdmin from '../Context/useAdmin';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logOut } = useAuth();
  const [isAdmin] = useAdmin(); 
  const commonLinks = [
    { name: 'Home', path: '/', icon: <HiOutlineHome /> },
    { name: 'Shop', path: '/shop', icon: <HiOutlineShoppingCart /> },
    { name: 'Track Order', path: '/track', icon: <PackageSearch size={18}/> },
  ];

  // only for admin
  const adminDashboardLink = { name: 'Dashboard', path: '/dashboard', icon: <HiOutlineViewGrid /> };

  // user link
  const otherLinks = [
    { name: 'Blogs', path: '/blogs', icon: <HiOutlineBookOpen /> },
    { name: 'FAQ', path: '/faq', icon: <HiOutlineQuestionMarkCircle /> },
    { name: 'About Us', path: '/about', icon: <HiOutlineInformationCircle /> },
  ];

  let finalNavLinks = [];
  if (user && isAdmin) {
    finalNavLinks = [...commonLinks, adminDashboardLink];
  } else {
    finalNavLinks = [...commonLinks, ...otherLinks];
  }

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
          
          <NavLogo />

          {/* Desktop Navigation Links */}
          <ul className="hidden lg:flex items-center gap-6 ml-6">
            {finalNavLinks.map(link => (
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

          {/* Actions Section */}
          <div className="flex items-center gap-3 md:gap-5 border-l border-white/20 pl-4">
            
            <Link to="/wishlist" className="relative text-white hover:text-yellow-400 transition">
              <HiOutlineHeart className="text-2xl" />
            </Link>

            <Link to="/cart" className="relative text-white hover:text-yellow-400 transition">
              <HiOutlineShoppingBag className="text-2xl" />
            </Link>

            {user ? (
              <div className="flex items-center gap-3">
                <Link to="/profile" title="My Profile">
                   <div className="relative group">
                      <img 
                        src={user?.photoURL || "https://i.ibb.co/mJR9Hxc/user-avatar.png"} 
                        className="w-9 h-9 rounded-full border-2 border-yellow-400 object-cover shadow-md hover:scale-105 transition-transform"
                        alt="User"
                      />
                      <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 border-2 border-[#059669] rounded-full"></div>
                   </div>
                </Link>
                <button onClick={logOut} className="text-white/80 hover:text-red-300 transition-colors hidden md:block" title="Logout">
                  <LogOut size={20} />
                </button>
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

      {/* Mobile Drawer */}
      <div className={`fixed inset-0 bg-black/60 z-110 transition-opacity duration-300 lg:hidden ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} onClick={() => setIsOpen(false)}>
        <div className={`bg-white w-72 h-full shadow-2xl transition-transform duration-300 flex flex-col ${isOpen ? 'translate-x-0' : '-translate-x-full'}`} onClick={e => e.stopPropagation()}>
          <div className="p-5 bg-[#059669] text-white flex justify-between items-center">
            <NavLogo />
            <div className="p-2 hover:bg-white/10 rounded-full cursor-pointer transition" onClick={() => setIsOpen(false)}>
              <HiX className="text-2xl" />
            </div>
          </div>
          
          <div className="p-4 flex flex-col gap-2 overflow-y-auto">
            <p className="px-3 text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">Navigation</p>
            {finalNavLinks.map(link => (
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
            {user ? (
               <>
                <Link to="/profile" onClick={() => setIsOpen(false)} className="flex items-center gap-3 p-3 mb-3 bg-white rounded-xl border border-gray-100">
                  <img src={user?.photoURL || "https://i.ibb.co/mJR9Hxc/user-avatar.png"} className="w-8 h-8 rounded-full" alt="" />
                  <span className="text-sm font-bold text-gray-700">My Profile</span>
                </Link>
                <button onClick={() => { logOut(); setIsOpen(false); }} className="flex items-center justify-center gap-2 w-full py-3 bg-red-50 text-red-600 rounded-xl font-bold border border-red-100">
                  <LogOut size={18} /> Logout
                </button>
               </>
            ) : (
               <Link to="/signin" onClick={() => setIsOpen(false)} className="flex items-center justify-center gap-2 w-full py-3 bg-[#059669] text-white rounded-xl font-bold shadow-lg">
                 <HiOutlineUser className="text-lg" /> Login / Register
               </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;