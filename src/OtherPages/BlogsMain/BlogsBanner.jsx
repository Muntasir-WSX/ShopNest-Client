import React from 'react';

const BlogsBanner = () => {
    return (
        <div className="relative w-full h-[400px] md:h-[500px] rounded-2xl overflow-hidden shadow-2xl">
            <img 
                src="https://res.cloudinary.com/dnk0bvpym/image/upload/v1773162540/women1_jqzi1z.jpg" 
                alt="Blogs Banner" 
                className="w-full h-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-black/80"></div>
            <div className="absolute inset-0 flex items-center px-8 md:px-16 lg:px-24">
                <div className="max-w-2xl text-white">
                    <span className="bg-[#059669] text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-widest shadow-lg">
                        Our Latest Insights
                    </span>
                    <h1 className="text-4xl md:text-6xl font-extrabold mt-6 leading-tight">
                        Discover Expert Tips for a <span className="text-[#FBBF24]">Healthier Life</span>
                    </h1>
                    <p className="mt-6 text-lg text-gray-200 font-medium leading-relaxed">
                        Explore our curated collection of articles, news, and guides designed to help you make smarter grocery choices every day.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default BlogsBanner;