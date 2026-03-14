import React from 'react';

const AboutUsBanner = () => {
    return (
        <div className="relative w-full h-[300px] md:h-[400px] overflow-hidden flex items-center justify-center">
            <img 
                src="https://res.cloudinary.com/dnk0bvpym/image/upload/v1773090765/carousole4_bnxned.jpg" 
                alt="About Us" 
                className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/40"></div>
            <div className="relative text-center text-white px-4">
                <h1 className="text-4xl md:text-5xl font-extrabold mb-2">About Us</h1>
                <p className="text-sm md:text-base font-medium opacity-90">Home / About Us</p>
            </div>
        </div>
    );
};

export default AboutUsBanner;