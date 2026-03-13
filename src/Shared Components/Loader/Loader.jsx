import React from 'react';

const Loader = () => {
    return (
        <div className="fixed inset-0 bg-white/80 backdrop-blur-sm z-999 flex flex-col items-center justify-center">
            <div className="relative flex flex-col items-center">
                
                {/* animated Logo Icon Container */}
                <div className="relative animate-bounce duration-1000">
                    <svg width="100" height="100" viewBox="0 0 500 300" xmlns="http://www.w3.org/2000/svg">
                        <defs>
                            <linearGradient id="loaderYellow" x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" style={{ stopColor: '#FBBF24', stopOpacity: 1 }} />
                                <stop offset="100%" style={{ stopColor: '#F59E0B', stopOpacity: 1 }} />
                            </linearGradient>
                        </defs>
                        <g transform="translate(250, 150)">
                            {/* Bag Body */}
                            <path d="M-45,-30 L45,-30 L55,40 C55,55 40,65 0,65 C-40,65 -55,55 -55,40 Z" fill="#059669" />
                            {/* Bag Handle */}
                            <path d="M-25,-30 L-25,-45 C-25,-60 -15,-65 0,-65 C15,-65 25,-60 25,-45 L25,-30" fill="none" stroke="url(#loaderYellow)" strokeWidth="12" strokeLinecap="round"/>
                            {/* The "N" Symbol */}
                            <path d="M-15,30 L-15,-5 L15,30 L15,-5" fill="none" stroke="white" strokeWidth="10" strokeLinecap="round" strokeLinejoin="round"/>
                        </g>
                    </svg>

                    {/* Shadow Effect */}
                    <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-12 h-2 bg-gray-200 rounded-[100%] blur-sm animate-pulse"></div>
                </div>

                {/* Text Animation */}
                <div className="mt-4 flex items-center space-x-1">
                    <span className="text-2xl font-black text-[#064E3B]">Shop</span>
                    <span className="text-2xl font-black text-[#F59E0B]">Nest</span>
                    <div className="flex space-x-1 ml-2">
                        <div className="w-1.5 h-1.5 bg-[#059669] rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                        <div className="w-1.5 h-1.5 bg-[#059669] rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                        <div className="w-1.5 h-1.5 bg-[#F59E0B] rounded-full animate-bounce"></div>
                    </div>
                </div>

                {/* Tagline */}
                <p className="mt-2 text-[10px] font-bold text-gray-400 tracking-[0.2em] uppercase">
                    Loading Freshness
                </p>
            </div>
        </div>
    );
};

export default Loader;