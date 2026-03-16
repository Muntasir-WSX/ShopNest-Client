import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import useAxiosPublic from '../../Hooks/useAxiosPublic';
import Loader from '../../Shared Components/Loader/Loader';
import { IoCartOutline, IoAdd, IoRemove } from "react-icons/io5";
import ShopDetailsBanner from './ShopDetailsBanner';
// নিশ্চিত করুন এই পাথটি সঠিক, প্রয়োজনে আপনার প্রজেক্ট অনুযায়ী পাথ ঠিক করুন
import { useCart } from '../../Context/CartProvider'; 

const ShopDetails = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null); 
    const [loading, setLoading] = useState(true);
    const [quantity, setQuantity] = useState(1);
    const axiosPublic = useAxiosPublic();
    
    // কন্টেক্সট থেকে ফাংশনটি নিয়ে নিলাম
    const { addToCart } = useCart();

    useEffect(() => {
        window.scrollTo(0, 0);
        axiosPublic.get(`/products/${id}`)
            .then(res => {
                setProduct(res.data);
                setLoading(false);
            })
            .catch(err => {
                console.error("Error fetching product details:", err);
                setLoading(false);
            });
    }, [id, axiosPublic]);

    if (loading) return <div className="flex h-screen items-center justify-center"><Loader /></div>;
    if (!product) return <div>Product not found!</div>;

    const discountedPrice = (product.price - (product.price * (product.discount / 100))).toFixed(2);
    const isOutOfStock = product.quantity <= 0 || product.stockStatus === "out-of-stock";

    const handleAddToCart = async () => {
        const cartItem = {
            productId: product._id,
            name: product.name,
            price: parseFloat(discountedPrice), // price নাম্বার ফরম্যাটে রাখা ভালো
            image: product.img,
            quantity: quantity,
        };

        // কন্টেক্সট ফাংশন কল
        await addToCart(cartItem);
    };

    return (
        <div className="bg-white min-h-screen">
            <ShopDetailsBanner />
            <div className="max-w-7xl mx-auto py-12 px-4">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                    {/* Left: Product Gallery */}
                    <div className="space-y-4">
                        <div className="w-full h-[450px] bg-gray-50 rounded-3xl flex items-center justify-center border border-gray-100 relative">
                            <img src={product.img} alt={product.name} className="max-h-full object-contain p-8" />
                            {isOutOfStock && (
                                <div className="absolute top-4 left-4 bg-red-600 text-white px-4 py-1 rounded-full font-bold">
                                    Out of Stock
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Right: Product Info */}
                    <div className="flex flex-col">
                        <span className="text-[#059669] uppercase font-bold tracking-widest text-sm mb-2">
                            {product.category} | <span className="text-gray-500">{product.origin}</span>
                        </span>
                        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">{product.name}</h1>
                        
                        <div className="flex items-center gap-4 mb-6">
                            <span className="text-3xl font-black text-[#059669]">৳{discountedPrice}</span>
                            <span className="text-xl text-gray-400 line-through">৳{product.price}</span>
                            <span className="text-sm font-bold bg-gray-100 px-3 py-1 rounded-full text-gray-600">{product.unit}</span>
                        </div>

                        <div className="mb-4 text-gray-700 font-semibold">
                            Available Stock: <span className={isOutOfStock ? "text-red-600" : "text-[#059669]"}>{product.quantity}</span>
                        </div>

                        <p className="text-gray-600 mb-8 leading-relaxed">{product.desc}</p>

                        <div className="flex items-center gap-4 mb-8">
                            <div className="flex items-center border-2 border-gray-200 rounded-lg">
                                <button 
                                    disabled={isOutOfStock || quantity <= 1}
                                    onClick={() => setQuantity(Math.max(1, quantity - 1))} 
                                    className="px-4 py-3 hover:bg-gray-100 disabled:opacity-50"><IoRemove /></button>
                                <span className="px-4 font-bold">{isOutOfStock ? 0 : quantity}</span>
                                <button 
                                    disabled={isOutOfStock || quantity >= product.quantity}
                                    onClick={() => setQuantity(quantity + 1)} 
                                    className="px-4 py-3 hover:bg-gray-100 disabled:opacity-50"><IoAdd /></button>
                            </div>
                            
                            <button 
                                disabled={isOutOfStock} 
                                onClick={handleAddToCart}
                                className={`flex-1 py-4 rounded-xl font-bold flex items-center justify-center gap-2 ${isOutOfStock ? 'bg-gray-400 cursor-not-allowed' : 'bg-[#059669] hover:bg-[#047857] text-white'}`}
                            >
                                <IoCartOutline className="text-xl" /> 
                                {isOutOfStock ? "Out of Stock" : "Add To Cart"}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ShopDetails;