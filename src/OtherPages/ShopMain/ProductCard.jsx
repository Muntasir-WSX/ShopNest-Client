import React from 'react';
import { HiOutlineShoppingBag, HiOutlineHeart, HiOutlineEye } from 'react-icons/hi';
import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => {
    const { _id, name, category, price, discount, unit, img, stockStatus } = product;
    
    // ডিসকাউন্ট প্রাইস ক্যালকুলেশন
    const discountedPrice = discount > 0 ? (price - (price * discount) / 100).toFixed(0) : price;

    return (
        <div className="group bg-white rounded-2xl border border-gray-100 hover:border-green-200 hover:shadow-xl hover:shadow-green-500/5 transition-all duration-500 overflow-hidden relative">
            {/* Discount Badge */}
            {discount > 0 && (
                <div className="absolute top-3 left-3 z-10 bg-green-600 text-white text-[10px] font-bold px-2 py-1 rounded-lg shadow-sm">
                    {discount}% OFF
                </div>
            )}

            {/* Product Image Area */}
            <div className="relative aspect-square overflow-hidden bg-gray-50 p-4">
                <img 
                    src={img} 
                    alt={name} 
                    className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-700"
                />
                
                {/* Quick Actions Hover */}
                <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                    <button className="p-2.5 bg-white rounded-full text-gray-700 hover:bg-[#059669] hover:text-white shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                        <HiOutlineHeart size={20} />
                    </button>
                    <Link to={`/product/${_id}`} className="p-2.5 bg-white rounded-full text-gray-700 hover:bg-[#059669] hover:text-white shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 delay-75">
                        <HiOutlineEye size={20} />
                    </Link>
                </div>
            </div>

            {/* Product Details */}
            <div className="p-4 md:p-5 text-center">
                <p className="text-[10px] text-[#059669] font-bold uppercase tracking-widest mb-1">{category}</p>
                <h3 className="text-sm md:text-base font-bold text-gray-800 line-clamp-1 group-hover:text-[#059669] transition-colors">
                    {name}
                </h3>
                <p className="text-[11px] text-gray-400 font-medium mb-3">{unit} • {product.origin || 'Organic'}</p>

                <div className="flex items-center justify-center gap-2 mb-4">
                    <span className="text-lg font-black text-gray-900">৳{discountedPrice}</span>
                    {discount > 0 && (
                        <span className="text-xs text-gray-400 line-through font-medium">৳{price}</span>
                    )}
                </div>

                {/* Stock Check & Add to Cart */}
                {stockStatus === 'out-of-stock' ? (
                    <button disabled className="w-full py-2.5 bg-gray-100 text-gray-400 text-xs font-bold rounded-xl cursor-not-allowed">
                        Out of Stock
                    </button>
                ) : (
                    <button className="w-full py-2.5 bg-white border border-[#059669] text-[#059669] hover:bg-[#059669] hover:text-white text-xs font-bold rounded-xl flex items-center justify-center gap-2 transition-all active:scale-95 group/btn">
                        <HiOutlineShoppingBag size={18} className="group-hover/btn:animate-bounce" />
                        Add to Cart
                    </button>
                )}
            </div>
        </div>
    );
};

export default ProductCard;