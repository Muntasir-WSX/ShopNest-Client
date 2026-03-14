import React from 'react';

const AboutUsBanner = () => {
    return (
        <div className="relative w-full h-[400px] md:h-[500px] rounded-2xl overflow-hidden shadow-2xl">
           
            <img 
                src="https://res.cloudinary.com/dnk0bvpym/image/upload/v1773090765/carousole4_bnxned.jpg" 
                alt="About Us Banner" 
                className="w-full h-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-black/80"></div>
            <div className="absolute inset-0 flex items-center px-8 md:px-16 lg:px-24">
                <div className="max-w-2xl text-white">
                    <span className="bg-[#059669] text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-widest shadow-lg">
                        About Us
                    </span>
                    <h1 className="text-4xl md:text-6xl font-extrabold mt-6 leading-tight">
                        Your Trusted Partner in <span className="text-[#FBBF24]">Fresh Grocery Delivery</span>
                    </h1>
                    <p className="mt-6 text-lg text-gray-200 font-medium leading-relaxed">
                        We are committed to delivering fresh, organic, and high-quality groceries right to your doorstep, making your life healthier and easier.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default AboutUsBanner;