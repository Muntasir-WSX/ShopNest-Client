import React, { useEffect, useState } from 'react';
import AboutUsBanner from './AboutUsBanner';
import Newsletter from '../../HomeComponents/newsLetter';
import Loader from '../../Shared Components/Loader/Loader';

const AboutUs = () => {
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 1000);
        
        return () => clearTimeout(timer);
    }, []);

    if (isLoading) {
        return (
            <div className="flex h-screen items-center justify-center">
                <Loader />
            </div>
        );
    }
    return (
        <div className="bg-white">
            <AboutUsBanner />
            <div className="max-w-7xl mx-auto px-4 py-20">
                <div className="grid md:grid-cols-2 gap-16 items-center">
                    <img 
                        src="https://res.cloudinary.com/dnk0bvpym/image/upload/v1773168957/grocery_family_hksyqy.jpg" 
                        alt="Grocery Family" 
                        className="rounded-3xl shadow-xl w-full h-[500px] object-cover"
                    />
                    <div>
                        <h2 className="text-sm font-bold text-[#059669] uppercase tracking-widest mb-2">About Us</h2>
                        <h3 className="text-4xl font-extrabold text-gray-900 mb-6">Your Trusted Partner in Fresh Grocery Delivery</h3>
                        <p className="text-gray-600 mb-8 leading-relaxed">
                            We provide high-quality organic groceries with a commitment to sustainability and fast delivery. 
                            Our team works tirelessly to bring the best products to your doorstep.
                        </p>
                        <div className="mt-10 p-6 bg-white border-2 border-gray-100 rounded-3xl shadow-sm hover:shadow-md transition-shadow">
                            <h4 className="text-lg font-bold text-gray-900 mb-4">Developed By</h4>
                            <div className="flex items-center gap-5">
                                <img 
                                    src="https://res.cloudinary.com/dnk0bvpym/image/upload/v1769974393/IMG_20240202_014303_140_bi3kwg.jpg" 
                                    alt="Muntasir" 
                                    className="w-20 h-20 rounded-2xl object-cover"
                                />
                                <div>
                                    <h3 className="text-xl font-black text-gray-900">Muntasir</h3>
                                    <p className="text-[#059669] font-bold text-sm">Mern Developer</p>
                                    <p className="text-gray-500 text-xs mt-1 uppercase tracking-wider">CSE, IIUC</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Newsletter />
        </div>
    );
};

export default AboutUs;