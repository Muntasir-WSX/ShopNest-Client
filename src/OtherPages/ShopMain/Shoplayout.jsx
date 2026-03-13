import React, { useState } from 'react';
import SideBar from './SideBar';
import ShopMain from './ShopMain'; // ShopMain এখানে ইমপোর্ট হবে
import Branding from '../../Shared Components/Branding/Branding';

const ShopLayout = () => {
    // ফিল্টার স্টেট লেআউটে রাখা হলো যাতে সাইডবার ও মেইন পেজ দুটাই আপডেট হতে পারে
    const [filters, setFilters] = useState({
        category: 'All',
        priceRange: 2000,
        sortBy: 'newest'
    });

    return (
        <div className="bg-gray-50/50 min-h-screen">
            <div className="container mx-auto px-4 py-10">
                <div className="flex flex-col lg:flex-row gap-8">
                    {/* বাম পাশের সাইডবার */}
                    <aside className="lg:w-1/4 w-full">
                        <SideBar filters={filters} setFilters={setFilters} />
                    </aside>

                    {/* ডান পাশে মেইন কন্টেন্ট */}
                    <main className="lg:w-3/4 w-full">
                        {/* Outlet এর বদলে সরাসরি ShopMain কল করা হলো */}
                        <ShopMain filters={filters} setFilters={setFilters} />
                    </main>
                </div>
            </div>

            {/* Branding Section - নিচে সুন্দর মার্জিন দিয়ে রাখা হলো */}
            <div className="container mx-auto px-4 pb-16">
                <div className="border-t border-gray-200 pt-16">
                    <Branding />
                </div>
            </div>
        </div>
    );
};

export default ShopLayout;