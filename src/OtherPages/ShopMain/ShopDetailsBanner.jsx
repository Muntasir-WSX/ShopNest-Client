import React from 'react';
import { IoFlash, IoShieldCheckmark, IoLeaf } from "react-icons/io5";

const ShopDetailsBanner = () => {
  return (
    <div className="relative w-full h-[400px] overflow-hidden bg-gray-900">
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url('https://res.cloudinary.com/dnk0bvpym/image/upload/v1773520032/family_dkk8jk.jpg')` }}
      >
        <div className="absolute inset-0 bg-linear-to-r from-black/80 via-black/50 to-transparent"></div>
      </div>
      <div className="relative max-w-7xl mx-auto h-full flex flex-col justify-center px-8 md:px-16">
        <div className="max-w-2xl space-y-6">
          <div className="inline-flex items-center gap-2 bg-green-500/20 text-green-400 px-4 py-1.5 rounded-lg border border-green-500/30 backdrop-blur-sm">
            <IoLeaf className="text-sm" />
            <span className="text-xs font-bold uppercase tracking-[0.2em]">100% Organic Certified</span>
          </div>
          
          <h2 className="text-5xl md:text-7xl font-extrabold text-white tracking-tight">
            Freshness Delivered <br />
            <span className="text-transparent bg-clip-text bg-linear-to-r from-green-400 to-emerald-500">To Your Doorstep</span>
          </h2>
          
          <p className="text-gray-300 text-lg md:text-xl font-light leading-relaxed max-w-lg">
            Experience the finest quality organic products, hand-picked from sustainable farms to your kitchen.
          </p>
        </div>
      </div>
      <div className="absolute top-8 right-8 md:right-16 flex items-center gap-3 bg-white/5 backdrop-blur-md border border-white/10 px-6 py-3 rounded-2xl">
        <IoShieldCheckmark className="text-2xl text-green-400" />
        <div>
          <p className="text-[10px] text-gray-400 uppercase tracking-widest font-bold">Verified</p>
          <p className="text-sm text-white font-semibold">Premium Quality</p>
        </div>
      </div>
      <div className="absolute bottom-8 right-8 md:right-16 bg-[#fbbf24] text-gray-900 px-8 py-4 rounded-2xl shadow-2xl flex items-center gap-3  cursor-pointer">
        <div className="bg-white/30 p-2 rounded-full">
            <IoFlash className="text-xl" />
        </div>
        <div>
          <p className="text-[10px] font-black uppercase">Flash Deal</p>
          <p className="text-lg font-black ">Save Up to 30%</p>
        </div>
      </div>
    </div>
  );
};

export default ShopDetailsBanner;