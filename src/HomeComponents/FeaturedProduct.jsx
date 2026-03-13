import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { HiOutlineArrowRight, HiOutlineShoppingBag, HiOutlineHeart, HiStar } from 'react-icons/hi';
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
                        className="flex items-center gap-2 bg-[#059669] text-white px-6 py-3 rounded-full font-bold text-sm hover:bg-green-700 transition-all shadow-lg shadow-green-200"
                    >
                        View All Products <HiOutlineArrowRight />
                    </Link>
                </div>

                {/* Products Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {products.map((product) => {
                        const { _id, name, category, price, discount, img, ratings = 4.8, unit } = product;
                        const discountedPrice = discount > 0 ? (price - (price * discount) / 100).toFixed(2) : price;

                        return (
                            <div key={_id} className="group bg-white rounded-2xl border border-gray-100 p-5 hover:shadow-2xl hover:shadow-green-100 transition-all duration-300 relative">
                                {/* Discount Badge */}
                                {discount > 0 && (
                                    <span className="absolute top-5 left-5 bg-[#059669] text-white text-[10px] font-bold px-3 py-1 rounded-md z-10">
                                        {discount}% off
                                    </span>
                                )}

                                {/* Wishlist */}
                                <button className="absolute top-5 right-5 p-2 bg-white rounded-full text-gray-400 shadow-sm border border-gray-100 hover:text-red-500 transition-colors z-10">
                                    <HiOutlineHeart size={20} />
                                </button>

                                {/* Image */}
                                <div className="aspect-square mb-6 overflow-hidden rounded-xl">
                                    <img 
                                        src={img} 
                                        alt={name} 
                                        className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500"
                                    />
                                </div>

                                {/* Info */}
                                <div>
                                    <div className="flex justify-between items-center mb-1">
                                        <span className="text-[11px] font-bold text-[#059669]/60 uppercase tracking-tighter">{category}</span>
                                        <div className="flex items-center gap-1 text-yellow-500 font-bold text-xs">
                                            <HiStar /> {ratings}
                                        </div>
                                    </div>
                                    <h3 className="font-extrabold text-gray-800 mb-1 group-hover:text-[#059669] transition-colors">{name}</h3>
                                    <p className="text-xs text-gray-400 font-medium mb-4">{unit || '500 g'}</p>

                                    <div className="flex justify-between items-center">
                                        <div className="flex items-center gap-2">
                                            <span className="text-lg font-black text-gray-900">${discountedPrice}</span>
                                            {discount > 0 && (
                                                <span className="text-sm text-gray-300 line-through font-bold">${price}</span>
                                            )}
                                        </div>
                                        <button className="flex items-center gap-1 bg-green-50 text-[#059669] px-3 py-2 rounded-lg font-bold text-xs hover:bg-[#059669] hover:text-white transition-all border border-green-100">
                                            <HiOutlineShoppingBag size={16} /> Add
                                        </button>
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