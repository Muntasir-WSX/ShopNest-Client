import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { HiOutlineArrowRight, HiOutlineShoppingBag, HiOutlineHeart } from 'react-icons/hi';
import { Link } from 'react-router-dom';
import useAxiosSecure from '../Hooks/useAxiosSecure';
import Loader from '../Shared Components/Loader/Loader';

const FeaturedProduct = () => {
    const axiosSecure = useAxiosSecure();
    const { data: products = [], isLoading } = useQuery({
        queryKey: ['featured-products'],
        queryFn: async () => {
            const res = await axiosSecure.get('/products');
            return res.data.slice(0, 4); 
        }
    });

    if (isLoading) return <Loader />;

    return (
        <section className="py-16 bg-white">
            <div className="container mx-auto px-4">
                {/* Header Section */}
                <div className="flex justify-between items-end mb-10">
                    <div>
                        <span className="text-[#059669] font-bold text-sm uppercase tracking-widest">Products</span>
                        <h2 className="text-3xl md:text-4xl font-black text-gray-800 mt-2">
                            Featured <span className="text-[#059669]">Products</span>
                        </h2>
                    </div>
                    <Link 
                        to="/shop" 
                        className="bg-[#059669] text-white px-6 py-2 rounded-lg font-semibold hover:bg-[#047857] transition-all flex items-center gap-2"
                    >
                        View All Products <HiOutlineArrowRight />
                    </Link>
                </div>

                {/* Products Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {products.map((product) => {
                        const { _id, name, category, price, discount, img, stockStatus } = product;
                        const discountedPrice = discount > 0 ? (price - (price * discount) / 100).toFixed(0) : price;

                        return (
                            <div key={_id} className="group bg-white rounded-xl border border-gray-100 p-3 hover:border-[#059669]/30 hover:shadow-2xl hover:shadow-green-500/10 transition-all duration-300 relative">
                                {/* Badges */}
                                <div className="absolute top-4 left-4 z-10">
                                    {discount > 0 && (
                                        <span className="bg-red-500 text-white text-[10px] font-black px-2 py-1 rounded-md">
                                            {discount}% OFF
                                        </span>
                                    )}
                                </div>
                                <div className="absolute top-4 right-4 z-10">
                                    <button className="p-2 bg-white/80 backdrop-blur-sm rounded-full text-gray-400 hover:bg-red-50 hover:text-red-500 shadow-sm transition-all duration-300">
                                        <HiOutlineHeart size={18} />
                                    </button>
                                </div>

                                {/* Image */}
                                <Link to={`/product/${_id}`} className="block relative aspect-square overflow-hidden rounded-lg bg-gray-50 mb-4">
                                    <img src={img} alt={name} className="w-full h-full object-cover" />
                                </Link>

                                {/* Info */}
                                <div className="px-1">
                                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">{category}</p>
                                    <h3 className="text-sm font-bold text-gray-800 mb-2 truncate group-hover:text-[#059669] transition-colors">
                                        {name}
                                    </h3>
                                    
                                    <div className="flex items-center gap-2 mt-3 mb-4">
                                        <span className="text-lg font-black text-[#059669]">৳{discountedPrice}</span>
                                        {discount > 0 && <span className="text-[11px] text-gray-400 line-through">৳{price}</span>}
                                    </div>

                                    {/* Buttons */}
                                    <div className="flex flex-col gap-2">
                                        <Link to={`/shopdetails/${_id}`} className="w-full py-2 bg-gray-100 text-gray-700 hover:bg-gray-200 text-[11px] font-bold rounded-lg flex items-center justify-center transition-all uppercase tracking-widest">
                                            View Details
                                        </Link>
                                        {stockStatus === 'out-of-stock' ? (
                                            <button disabled className="w-full py-2 bg-gray-50 text-gray-300 text-[11px] font-bold rounded-lg cursor-not-allowed uppercase tracking-widest">
                                                Sold Out
                                            </button>
                                        ) : (
                                            <button className="w-full py-2 bg-green-50 text-[#059669] hover:bg-[#059669] hover:text-white text-[11px] font-black rounded-lg flex items-center justify-center gap-2 border border-green-100 transition-all uppercase tracking-widest">
                                                <HiOutlineShoppingBag size={15} /> Add to Cart
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default FeaturedProduct;