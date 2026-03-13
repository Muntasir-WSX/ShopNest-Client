import React from 'react';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import ProductCard from './ProductCard';
import Loader from '../../Shared Components/Loader/Loader';

const ShopMain = ({ filters, setFilters }) => {
    const axiosSecure = useAxiosSecure();

    const { data: products = [], isLoading } = useQuery({
        queryKey: ['products'],
        queryFn: async () => {
            const res = await axiosSecure.get('/products');
            return res.data;
        }
    });

    if (isLoading) return <Loader />;
    let displayProducts = [...products];

    if (filters?.category && filters.category !== 'All') {
        displayProducts = displayProducts.filter(
            (product) => product.category === filters.category
        );
    }
    displayProducts.sort((a, b) => {
        if (filters?.sortBy === 'price-low') return a.price - b.price;
        if (filters?.sortBy === 'price-high') return b.price - a.price;
        if (filters?.sortBy === 'newest') return (b.id || 0) - (a.id || 0);
        return 0;
    });

    return (
        <main className="w-full">
            {/* Toolbar */}
            <div className="flex justify-between items-center mb-6 bg-gray-50 p-4 rounded-xl border border-gray-100">
                <p className="text-sm font-bold text-gray-600">
                    Found <span className="text-[#059669]">{displayProducts.length}</span> items
                </p>
                <div className="flex items-center gap-3">
                    <span className="text-xs font-bold text-gray-400 uppercase">Sort by:</span>
                    <select 
                        className="bg-transparent text-sm font-bold outline-none cursor-pointer text-gray-700"
                        onChange={(e) => setFilters({ ...filters, sortBy: e.target.value })}
                        value={filters?.sortBy}
                    >
                        <option value="newest">Newest Items</option>
                        <option value="price-low">Price: Low to High</option>
                        <option value="price-high">Price: High to Low</option>
                    </select>
                </div>
            </div>

            {/* Grid */}
            {displayProducts.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                    {displayProducts.map(product => (
                        <ProductCard key={product._id || product.id} product={product} />
                    ))}
                </div>
            ) : (
                <div className="text-center py-20 bg-white rounded-2xl border border-dashed border-gray-200">
                    <p className="text-gray-400 font-bold italic text-lg">
                        No products found in "{filters?.category}"
                    </p>
                </div>
            )}
        </main>
    );
};

export default ShopMain;