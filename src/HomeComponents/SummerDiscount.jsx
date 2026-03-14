import React, { useState, useEffect } from 'react';
import { Link } from 'react-router';

const SummerDiscount = () => {
  const [timeLeft, setTimeLeft] = useState({ days: 4, hours: 14, minutes: 48, seconds: 18 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        let { days, hours, minutes, seconds } = prev;
        if (seconds > 0) seconds--;
        else {
          seconds = 59;
          if (minutes > 0) minutes--;
          else {
            minutes = 59;
            if (hours > 0) hours--;
            else {
              hours = 23;
              if (days > 0) days--;
            }
          }
        }
        return { days, hours, minutes, seconds };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="py-16 bg-white w-full">

      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-center gap-8 px-6">
        <div className="hidden md:block w-64 h-[400px] rounded-3xl overflow-hidden shadow-2xl">
          <img src="https://res.cloudinary.com/dnk0bvpym/image/upload/v1773162540/women1_jqzi1z.jpg" className="w-full h-full object-cover" />
        </div>
        <div className="bg-[#f9f9f9] p-10 rounded-4xl text-center shadow-lg border border-gray-100 max-w-lg w-full">
          <h2 className="text-4xl font-extrabold text-gray-900 mb-3">Summer Discount</h2>
          <p className="text-gray-500 mb-8 font-medium">Get 50% off - Limited Time Offer!</p>
          <div className="flex justify-center gap-4 mb-8">
            {Object.entries(timeLeft).map(([label, value]) => (
              <div key={label} className="bg-white p-3 rounded-xl shadow-sm border border-gray-100 w-20">
                <div className="text-2xl font-bold text-[#059669]">{String(value).padStart(2, '0')}</div>
                <div className="text-[10px] uppercase text-gray-400 font-bold tracking-widest">{label}</div>
              </div>
            ))}
          </div>
          
          <Link to="shop" className="bg-[#059669] text-white px-10 py-4 rounded-xl font-bold hover:bg-[#047857] transition-all transform active:scale-95 shadow-lg">
            Shop Now →
          </Link>
        </div>
        <div className="hidden md:block w-64 h-[400px] rounded-3xl overflow-hidden shadow-2xl">
          <img src="https://res.cloudinary.com/dnk0bvpym/image/upload/v1773162539/women_2_xlzyab.jpg" className="w-full h-full object-cover" />
        </div>
        
      </div>
    </div>
  );
};

export default SummerDiscount;