import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import useAxiosPublic from '../../Hooks/useAxiosPublic';
import Loader from '../../Shared Components/Loader/Loader';
import { IoCartOutline, IoHeartOutline, IoAdd, IoRemove } from "react-icons/io5";
import ShopDetailsBanner from './ShopDetailsBanner';

const ShopDetails = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [quantity, setQuantity] = useState(1);
    const axiosPublic = useAxiosPublic();

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

    const discountedPrice = (product.price - (product.price * (product.discount / 100))).toFixed(2);

    return (
        <div className="bg-white min-h-screen">
            <ShopDetailsBanner />

            <div className="max-w-7xl mx-auto py-12 px-4">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                    
                    {/* Left: Product Gallery */}
                    <div className="space-y-4">
                        <div className="w-full h-[450px] bg-gray-50 rounded-3xl flex items-center justify-center border border-gray-100">
                            <img src={product.img} alt={product.name} className="max-h-full object-contain p-8" />
                        </div>
                    </div>

                    {/* Right: Product Info */}
                    <div className="flex flex-col">
                        <span className="text-[#059669] uppercase font-bold tracking-widest text-sm mb-2">{product.category}</span>
                        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">{product.name}</h1>
                        
                        <div className="flex items-center gap-4 mb-6">
                            <span className="text-3xl font-black text-[#059669]">৳{discountedPrice}</span>
                            <span className="text-xl text-gray-400 line-through">৳{product.price}</span>
                        </div>

                        <p className="text-gray-600 mb-8 leading-relaxed">{product.desc}</p>

                        {/* Quantity & Actions */}
                        <div className="flex items-center gap-4 mb-8">
                            <div className="flex items-center border-2 border-gray-200 rounded-lg">
                                <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="px-4 py-3 hover:bg-gray-100"><IoRemove /></button>
                                <span className="px-4 font-bold">{quantity}</span>
                                <button onClick={() => setQuantity(quantity + 1)} className="px-4 py-3 hover:bg-gray-100"><IoAdd /></button>
                            </div>
                            
                            <button className="flex-1 bg-[#059669] text-white py-4 rounded-xl font-bold hover:bg-[#047857] flex items-center justify-center gap-2">
                                <IoCartOutline className="text-xl" /> Add To Cart
                            </button>
                            
                            <button className="bg-yellow-400 text-gray-900 px-8 py-4 rounded-xl font-bold hover:bg-yellow-500">
                                Buy Now
                            </button>

                            <button className="p-4 border-2 border-gray-200 rounded-xl hover:text-red-500 hover:border-red-500">
                                <IoHeartOutline className="text-2xl" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ShopDetails;