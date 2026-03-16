import React, { useContext } from 'react';
import { HiOutlineShoppingBag, HiOutlineHeart } from 'react-icons/hi';
import { Link } from 'react-router-dom';
import { WishlistContext } from '../../Context/WishlistProvider';
import { useCart } from '../../Context/CartProvider';

const ProductCard = ({ product }) => {
    const { _id, name, category, price, discount, img, stockStatus } = product;
    const discountedPrice = discount > 0 ? (price - (price * discount) / 100).toFixed(0) : price;

    const { addToWishlist } = useContext(WishlistContext);
    const { addToCart } = useCart();
    const handleAddToWishlist = (product) => {
        addToWishlist(product);
        
    };
        const handleAddToCart = async () => {
        const cartItem = {
            productId: _id,
            name: name,
            price: parseFloat(discountedPrice),
            image: img,
            quantity: 1, 
        };

     await addToCart(cartItem);
    };


    return (
        <div className="group bg-white rounded-xl border border-gray-100 p-3 hover:border-[#059669]/30 hover:shadow-2xl hover:shadow-green-500/10 transition-all duration-300 relative">
            
            {/* Top Badges */}
            <div className="absolute top-4 left-4 z-10 flex flex-col gap-2">
                {discount > 0 && (
                    <span className="bg-red-500 text-white text-[10px] font-black px-2 py-1 rounded-md">
                        {discount}% OFF
                    </span>
                )}
            </div>
            <div className="absolute top-4 right-4 z-10">
                <button onClick={()=> handleAddToWishlist(product)} className="p-2 bg-white/80 backdrop-blur-sm rounded-full text-gray-400 hover:bg-red-50 hover:text-red-500 shadow-sm transition-all duration-300">
                    <HiOutlineHeart size={18} />
                </button>
            </div>

            {/* Image Section */}
            <Link to={`/product/${_id}`} className="block relative aspect-square overflow-hidden rounded-lg bg-gray-50 mb-4">
                <img 
                    src={img} 
                    alt={name} 
                    className="w-full h-full object-cover "
                />
                <div className="absolute inset-0 bg-[#059669]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </Link>

            {/* Content Section */}
            <div className="px-1">
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">{category}</p>
                <Link to={`/product/${_id}`}>
                    <h3 className="text-sm font-bold text-gray-800 mb-2 truncate group-hover:text-[#059669] transition-colors">
                        {name}
                    </h3>
                </Link>
                
                <div className="flex items-center gap-2 mt-3 mb-4">
                    <span className="text-lg font-black text-[#059669]">৳{discountedPrice}</span>
                    {discount > 0 && (
                        <span className="text-[11px] text-gray-400 line-through">৳{price}</span>
                    )}
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col gap-2">
                    <Link 
                        to={`/shopdetails/${_id}`}
                        className="w-full py-2 bg-gray-100 text-gray-700 hover:bg-gray-200 text-[11px] font-bold rounded-lg flex items-center justify-center transition-all duration-300 uppercase tracking-widest"
                    >
                        View Details
                    </Link>

                    {/* Add to Cart Button */}
                    {stockStatus === 'out-of-stock' ? (
                        <button disabled className="w-full py-2 bg-gray-50 text-gray-300 text-[11px] font-bold rounded-lg cursor-not-allowed uppercase tracking-widest">
                            Sold Out
                        </button>
                    ) : (
                        <button onClick={handleAddToCart} className="w-full py-2 bg-green-50 text-[#059669] hover:bg-[#059669] hover:text-white text-[11px] font-black rounded-lg flex items-center justify-center gap-2 border border-green-100 hover:border-[#059669] transition-all duration-300 uppercase tracking-widest">
                            <HiOutlineShoppingBag size={15} />
                            Add to Cart
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProductCard;