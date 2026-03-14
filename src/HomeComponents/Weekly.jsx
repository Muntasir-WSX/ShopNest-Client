import React from 'react';
import { Link } from 'react-router';

const Weekly = () => {
  return (
    <div className="bg-[#FFC933] rounded-3xl p-8 md:p-16 mx-4 shadow-lg overflow-hidden">
      <div className="grid md:grid-cols-2 gap-8 items-center max-w-6xl mx-auto">
        <div className="space-y-6">
          <span className="text-gray-900 font-bold uppercase tracking-widest text-xs bg-white/30 px-4 py-1 rounded-full inline-block">
            Exclusive Weekly Savings
          </span>
          <h1 className="text-3xl md:text-5xl font-extrabold text-gray-900 leading-tight">
            Fresh Groceries Delivered To Your Doorstep
          </h1>
          <p className="text-gray-900 text-sm md:text-base leading-relaxed max-w-md">
            Hand-picked quality produce and everyday essentials at unbeatable prices. Shop your favorites now!
          </p>
          <Link to="shop" className="bg-[#059669] w-50 h-15 text-white px-8 py-4 rounded-xl font-bold hover:bg-[#047857] transition-all shadow-md flex items-center gap-2">
            Shop Now →
          </Link>
        </div>
        <div className="flex justify-center md:justify-end">
          <img 
            src="https://res.cloudinary.com/dnk0bvpym/image/upload/v1773163716/frute1-removebg-preview_epjvuv.png" 
            alt="Grocery Basket" 
            className="w-full max-w-[300px] md:max-w-[400px] h-auto object-contain transform hover:scale-105 transition-transform duration-500" 
          />
        </div>
        
      </div>
    </div>
  );
};

export default Weekly;