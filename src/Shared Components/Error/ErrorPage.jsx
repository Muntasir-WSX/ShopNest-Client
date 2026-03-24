import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { HiOutlineArrowLeft, HiOutlineHome } from 'react-icons/hi';

const ErrorPage = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-white flex items-center justify-center p-6">
            <div className="max-w-2xl w-full text-center">
                
                {/* Visual Section */}
                <div className="relative mb-8">
                    {/* Big 404 Background */}
                    <h1 className="text-[150px] md:text-[200px] font-black text-gray-50 leading-none select-none">
                        404
                    </h1>
                    
                    {/* Floating Bag Illustration (Your Logo Style) */}
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="animate-bounce duration-2000">
                            <svg width="120" height="120" viewBox="0 0 500 300" xmlns="http://www.w3.org/2000/svg">
                                <g transform="translate(250, 150)">
                                    <path d="M-45,-30 L45,-30 L55,40 C55,55 40,65 0,65 C-40,65 -55,55 -55,40 Z" fill="#059669" />
                                    <path d="M-25,-30 L-25,-45 C-25,-60 -15,-65 0,-65 C15,-65 25,-60 25,-45 L25,-30" fill="none" stroke="#FBBF24" strokeWidth="15" strokeLinecap="round"/>
                                    <path d="M-15,30 L-15,-5 L15,30 L15,-5" fill="none" stroke="white" strokeWidth="12" strokeLinecap="round" strokeLinejoin="round"/>
                                </g>
                            </svg>
                        </div>
                    </div>
                </div>

                {/* Text Content */}
                <h2 className="text-2xl md:text-4xl font-black text-gray-800 mb-4">
                    Oops! This Nest is Empty.
                </h2>
                <p className="text-gray-500 font-medium mb-10 max-w-md mx-auto">
                    The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
                </p>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <button 
                        onClick={() => navigate(-1)}
                        className="flex items-center gap-2 px-8 py-3 bg-gray-100 text-gray-700 rounded-2xl font-bold hover:bg-gray-200 transition-all active:scale-95 w-full sm:w-auto justify-center"
                    >
                        <HiOutlineArrowLeft size={20} />
                        Go Back
                    </button>
                    
                    <Link 
                        to="/"
                        className="px-5 py-2 md:px-8 md:py-3 bg-[#059669] hover:bg-[#047857] transition-all text-white rounded-lg font-bold flex items-center gap-2 text-sm md:text-base"
                    >
                        <HiOutlineHome size={20} />
                        Back to Home
                    </Link>
                </div>

                {/* Helpful Links */}
                <div className="mt-16 pt-8 border-t border-gray-100">
                    <p className="text-sm text-gray-400 font-bold uppercase tracking-widest mb-4">Need Help?</p>
                    <div className="flex justify-center gap-6 text-sm font-bold text-[#059669]">
                        <Link to="/about" className="hover:underline">About Us</Link>
                        <Link to="/contact" className="hover:underline">Contact Support</Link>
                        <Link to="/faq" className="hover:underline">FAQs</Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ErrorPage;