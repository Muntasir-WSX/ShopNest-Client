import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';

import { HiOutlineFilter, HiOutlineChevronRight } from 'react-icons/hi';

const ShopMain = () => {
    const axiosSecure = useAxiosSecure();
    const [priceRange, setPriceRange] = useState(1500); 

    const { data: products = [], isLoading } = useQuery({
        queryKey: ['products'],
        queryFn: async () => {
            const res = await axiosSecure.get('/products');
            return res.data;
        }
    });

    const categories = ["Vegetables", "Fresh Fruits", "Milk & Eggs", "Bakery", "House Hold", "Dry Fruits", "Beverages"];

    if (isLoading) return <div className="h-screen flex justify-center items-center font-bold text-[#059669]">Loading Shop...</div>;

    return (
        <div className="bg-white min-h-screen">
            {/* Breadcrumb/Header */}
            <div className="bg-gray-50 py-8 border-b border-gray-100">
                <div className="container mx-auto px-4">
                    <h1 className="text-2xl font-black text-gray-800">Shop Page</h1>
                    <p className="text-xs text-gray-500 mt-1 flex items-center gap-1">
                        Home <HiOutlineChevronRight /> Shop <HiOutlineChevronRight /> <span className="text-[#059669]">All Products</span>
                    </p>
                </div>
            </div>

            <div className="container mx-auto px-4 py-10">
                <div className="flex flex-col lg:flex-row gap-8">
                    
                    {/* --- LEFT SIDEBAR --- */}
                    <aside className="lg:w-1/4 w-full space-y-8">
                        {/* Category Filter */}
                        <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
                            <h3 className="text-lg font-bold text-gray-800 mb-5 pb-2 border-b border-green-100">Category</h3>
                            <ul className="space-y-3">
                                {categories.map(cat => (
                                    <li key={cat} className="flex items-center gap-3 group cursor-pointer">
                                        <input type="checkbox" className="w-4 h-4 accent-[#059669] rounded cursor-pointer" />
                                        <span className="text-sm font-semibold text-gray-600 group-hover:text-[#059669] transition-colors">{cat}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Price Range Filter */}
                        <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
                            <h3 className="text-lg font-bold text-gray-800 mb-5 pb-2 border-b border-green-100">Price Range</h3>
                            <input 
                                type="range" 
                                min="0" 
                                max="2000" 
                                value={priceRange}
                                onChange={(e) => setPriceRange(e.target.value)}
                                className="w-full h-2 bg-gray-100 rounded-lg accent-[#059669] cursor-pointer"
                            />
                            <div className="flex justify-between mt-4">
                                <span className="text-xs font-bold text-gray-500 font-sans">৳0</span>
                                <span className="text-sm font-black text-[#059669] font-sans">৳{priceRange}</span>
                            </div>
                        </div>

                        {/* Banner/Ad Placeholder */}
                        <div className="bg-[#059669] rounded-2xl p-6 text-white overflow-hidden relative group">
                            <div className="relative z-10">
                                <h4 className="text-xl font-black mb-2">Organic <br/> Healthy Food</h4>
                                <p className="text-[10px] opacity-80 mb-4 font-bold uppercase tracking-widest">Up to 25% Off</p>
                                <button className="bg-yellow-400 text-gray-900 px-4 py-2 rounded-lg text-xs font-bold active:scale-95 transition">Shop Now</button>
                            </div>
                            <HiOutlineFilter className="absolute -bottom-4 -right-4 text-white/10 text-8xl group-hover:scale-110 transition-transform" />
                        </div>
                    </aside>

                    {/* --- RIGHT PRODUCT GRID --- */}
                    <main className="lg:w-3/4 w-full">
                        {/* Toolbar */}
                        <div className="flex justify-between items-center mb-6 bg-gray-50 p-4 rounded-xl border border-gray-100">
                            <p className="text-sm font-bold text-gray-600">
                                Found <span className="text-[#059669]">{products.length}</span> items
                            </p>
                            <div className="flex items-center gap-3">
                                <span className="text-xs font-bold text-gray-400 uppercase">Sort by:</span>
                                <select className="bg-transparent text-sm font-bold outline-none cursor-pointer text-gray-700">
                                    <option>Newest Items</option>
                                    <option>Price: Low to High</option>
                                    <option>Price: High to Low</option>
                                </select>
                            </div>
                        </div>

                        {/* Grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                            {products.map(product => (
                                <ProductCard key={product._id} product={product} />
                            ))}
                        </div>
                    </main>

                </div>
            </div>
        </div>
    );
};

export default ShopMain;