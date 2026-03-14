import React from 'react';

const FaqBanner = () => {
    return (
        <div className="relative w-full h-[300px] rounded-2xl overflow-hidden flex items-center justify-center bg-linear-to-r from-[#059669] to-[#047857]">
            <div className="text-center text-white px-4">
                <h1 className="text-4xl md:text-5xl font-extrabold mb-4">Frequently Asked Questions</h1>
                <p className="text-lg opacity-90">Got questions? We've got answers.</p>
            </div>
        </div>
    );
};

export default FaqBanner;