import React, { useState } from 'react';
import SideBar from './SideBar';
import ShopMain from './ShopMain'; 
import Branding from '../../Shared Components/Branding/Branding';

const ShopLayout = () => {
   
    const [filters, setFilters] = useState({
        category: 'All',
        priceRange: 2000,
        sortBy: 'newest'
    });

    return (
        <div className="bg-gray-50/50 min-h-screen">
            <div className="flex flex-col lg:flex-row gap-8">
    <aside className="lg:w-1/4 w-full">
        <div className="lg:sticky lg:top-24 self-start">
            <SideBar filters={filters} setFilters={setFilters} />
        </div>
    </aside>
    <main className="lg:w-3/4 w-full">
        <ShopMain filters={filters} setFilters={setFilters} />
    </main>
</div>
            <div className="container mx-auto px-4 pb-16">
                <div className="border-t border-gray-200 pt-16">
                    <Branding />
                </div>
            </div>
        </div>
    );
};

export default ShopLayout;