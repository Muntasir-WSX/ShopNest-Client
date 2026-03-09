import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { HiMenuAlt3, HiX, HiSearch, HiOutlineShoppingBag, HiOutlineHeart, HiOutlineUser } from 'react-icons/hi';
import { IoLocationOutline } from "react-icons/io5";
import NavLogo from './Logo/NavLogo';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="w-full">
      <div className="bg-[#FBBF24] py-2 text-sm text-gray-800">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <span>Call Us : +880 1960551472</span>
          <span>Sign up and GET 25% OFF for your first order. <Link to="/signup" className="underline font-bold">Sign up now</Link></span>
        </div>
      </div>
      <div className="bg-[#059669] py-4">
        <div className="container mx-auto px-4 flex items-center justify-between gap-4">
          <NavLogo />
          
          {/* Location & Search */}
          <div className="hidden md:flex items-center gap-2 text-white bg-[#067352] px-3 py-2 rounded-md">
            <IoLocationOutline className="text-xl" />
            <span className="text-sm">CTG, Bangladesh</span>
          </div>

          <div className="flex-1 max-w-lg bg-white rounded-md flex items-center overflow-hidden">
            <select className="bg-gray-100 p-2 text-sm border-r outline-none">
              <option>All Categories</option>
            </select>
            <input type="text" placeholder="Search for products..." className="w-full p-2 outline-none text-sm" />
            <button className="px-4 text-gray-500"><HiSearch /></button>
          </div>

          {/* User Actions */}
          <div className="hidden md:flex items-center gap-6 text-white text-2xl">
            <HiOutlineHeart />
            <HiOutlineShoppingBag />
            <HiOutlineUser />
          </div>
        </div>
      </div>

      {/* ৩. Navigation Links & Browse Categories */}
      <div className="bg-[#059669] border-t border-[#067352]">
        <div className="container mx-auto px-4 flex items-center justify-between py-2">
          <button className="bg-[#FBBF24] px-4 py-2 rounded font-bold text-sm flex items-center gap-2">
            <HiMenuAlt3 /> Browse All Categories
          </button>
          
          <ul className="hidden md:flex space-x-6 text-white font-medium text-sm">
            {['Home', 'Shop', 'Fruits', 'Vegetables', 'Beverages', 'About Us', 'Blogs'].map(item => (
              <li key={item}><Link to={`/${item.toLowerCase()}`}>{item}</Link></li>
            ))}
          </ul>

          <button className="md:hidden text-white text-2xl" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <HiX /> : <HiMenuAlt3 />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="md:hidden bg-white p-4 space-y-4 border-b">
           {['Home', 'Shop', 'Fruits', 'Vegetables', 'Beverages'].map(item => (
              <Link key={item} to={`/${item.toLowerCase()}`} className="block">{item}</Link>
           ))}
        </div>
      )}
    </nav>
  );
};

export default Navbar;