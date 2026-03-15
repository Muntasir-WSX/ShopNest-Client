import React from 'react';
import { HiOutlineTruck, HiOutlineShieldCheck, HiOutlineSupport } from 'react-icons/hi';

const Branding = () => {
    const brandingData = [
        {
            id: 1,
            title: "Free Shipping",
            subtitle: "On orders above $50",
            icon: <HiOutlineTruck className="text-2xl md:text-3xl" />,
            bgColor: "bg-green-50",
            iconColor: "text-green-600"
        },
        {
            id: 2,
            title: "Flexible Payment",
            subtitle: "Multiple secure options",
            icon: <HiOutlineShieldCheck className="text-2xl md:text-3xl" />,
            bgColor: "bg-yellow-50",
            iconColor: "text-yellow-600"
        },
        {
            id: 3,
            title: "24x7 Support",
            subtitle: "Online all days",
            icon: <HiOutlineSupport className="text-2xl md:text-3xl" />,
            bgColor: "bg-green-50",
            iconColor: "text-green-600"
        }
    ];

    return (
        <section className="py-6 rounded-2xl bg-[#fbbf24] border-b border-gray-100">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {brandingData.map((item) => (
                        <div 
                            key={item.id} 
                            className="flex items-center gap-4 p-2 "
                        >
                            {/* Icon Container */}
                            <div className={`shrink-0 w-12 h-12 md:w-14 md:h-14 ${item.bgColor} ${item.iconColor} rounded-2xl flex items-center justify-center`}>
                                {item.icon}
                            </div>
                            
                            {/* Text Content */}
                            <div className="flex flex-col">
                                <h3 className="text-sm md:text-base uppercase font-extrabold text-black leading-tight">
                                    {item.title}
                                </h3>
                                <p className="text-[11px] md:text-xs text-gray-800 font-medium">
                                    {item.subtitle}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Branding;