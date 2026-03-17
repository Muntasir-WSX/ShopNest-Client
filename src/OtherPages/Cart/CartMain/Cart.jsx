import React from 'react';
import { HiOutlineTrash, HiMinus, HiPlus } from 'react-icons/hi';
import { Link } from 'react-router-dom';
import Loader from '../../../Shared Components/Loader/Loader';
import FooterLogo from '../../../Shared Components/Logo/FooterLogo';
import useCart from '../../../Context/useCart';


const Cart = () => {
    const { 
        cart, 
        cartLoading, 
        removeFromCart, 
        updateQuantity, 
        subTotal, 
        shippingCharge, 
        totalAmount 
    } = useCart();

    if (cartLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
              <Loader></Loader>
            </div>
        );
    }

    if (cart.length === 0) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
                <FooterLogo></FooterLogo>
                <h2 className="text-2xl font-bold text-gray-800">Your cart is empty</h2>
                <p className="text-gray-500 mt-2 mb-6 text-center">Looks like you hasn't added anything to your cart yet.</p>
                <Link to="/shop" className="bg-[#059669] text-white px-8 py-3 rounded-xl font-bold hover:bg-[#047857] transition-all">
                    Return to Shop
                </Link>
            </div>
        );
    }

    return (
        <div className="bg-gray-50 min-h-screen py-10 px-4 sm:px-10">
            {/* Header Section */}
            <div className="text-center mb-10">
                <h1 className="text-3xl font-bold text-gray-800">Shopping Cart</h1>
                <p className="text-gray-500 text-sm mt-2">Home / Shopping Cart</p>
            </div>

            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
                
                {/* Product Table Section */}
                <div className="lg:col-span-2">
                    <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="bg-[#FFD400] text-gray-800 uppercase text-[11px] font-black tracking-wider">
                                        <th className="px-6 py-4">Product</th>
                                        <th className="px-6 py-4 text-center">Price</th>
                                        <th className="px-6 py-4 text-center">Quantity</th>
                                        <th className="px-6 py-4 text-center">Subtotal</th>
                                        <th className="px-6 py-4"></th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                    {cart.map((item) => (
                                        <tr key={item._id} className="hover:bg-gray-50/50 transition-colors">
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-4">
                                                    <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded-lg border border-gray-100 shadow-sm" />
                                                    <div>
                                                        <h3 className="text-sm font-bold text-gray-800 leading-tight">{item.name}</h3>
                                                        <p className="text-[11px] text-gray-400 mt-1 uppercase font-semibold">{item.unit || '1kg'}</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-center font-bold text-gray-700">৳{item.price}</td>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center justify-center gap-3">
                                                    <button 
                                                        onClick={() => updateQuantity(item._id, 'decrease', item.quantity)}
                                                        className={`w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center transition-all 
                                                            ${item.quantity <= 1 ? 'opacity-30 cursor-not-allowed' : 'hover:bg-red-50 hover:text-red-500'}`}
                                                    >
                                                        <HiMinus size={14} />
                                                    </button>
                                                    <span className="text-sm font-black w-6 text-center text-gray-800">{item.quantity}</span>
                                                    <button 
                                                        onClick={() => updateQuantity(item._id, 'increase', item.quantity)}
                                                        className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center hover:bg-green-50 hover:text-[#059669] transition-all"
                                                    >
                                                        <HiPlus size={14} />
                                                    </button>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-center font-black text-[#059669]">৳{item.price * item.quantity}</td>
                                            <td className="px-6 py-4 text-right">
                                                <button 
                                                    onClick={() => removeFromCart(item._id)}
                                                    className="p-2 text-gray-300 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
                                                >
                                                    <HiOutlineTrash size={20} />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        
                        <div className="p-6 bg-gray-50/30 flex justify-between items-center border-t border-gray-100">
                            <Link to="/shop" className="text-xs font-bold text-[#059669] hover:underline uppercase tracking-widest">
                                ← Continue Shopping
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Order Summary Section */}
                <div className="lg:col-span-1">
                    <div className="bg-white rounded-2xl shadow-sm p-8 border border-gray-100 sticky top-10">
                        <h2 className="text-xl font-black text-gray-800 mb-8 flex items-center gap-2">
                            Order Summary
                        </h2>
                        
                        <div className="space-y-5">
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-500 font-medium">Subtotal</span>
                                <span className="font-bold text-gray-800">৳{subTotal}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-500 font-medium">Shipping Fee</span>
                                <span className="font-bold text-gray-800">৳{shippingCharge}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-500 font-medium">Tax (0%)</span>
                                <span className="font-bold text-gray-800">৳0</span>
                            </div>
                            
                            <div className="border-t border-dashed pt-5 mt-5 flex justify-between items-center">
                                <span className="text-lg font-bold text-gray-800">Total Amount</span>
                                <div className="text-right">
                                    <span className="text-2xl font-black text-[#059669]">৳{totalAmount}</span>
                                    <p className="text-[10px] text-gray-400 mt-1 uppercase tracking-tighter">VAT Included</p>
                                </div>
                            </div>
                        </div>

                        <button className="w-full mt-10 py-4 bg-[#059669] text-white font-black rounded-xl hover:bg-[#047857] transition-all shadow-xl shadow-green-100 uppercase tracking-widest text-xs flex items-center justify-center gap-2 group">
                            Proceed to Checkout
                            <span className="group-hover:translate-x-1 transition-transform">→</span>
                        </button>

                        <div className="mt-8 pt-6 border-t border-gray-100">
    <div className="flex flex-col items-center gap-3">
        <div className="flex items-center gap-2 px-4 py-2 bg-gray-50 rounded-full border border-gray-100">
            <svg className="w-4 h-4 text-[#059669]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
            <p className="text-[11px] font-bold text-gray-500 uppercase tracking-widest">
                Secure Payment via <span className="text-[#059669]">SSLCOMMERZ</span>
            </p>
        </div>
        <div className="flex items-center gap-3 opacity-60 grayscale hover:grayscale-0 transition-all cursor-default">
             <span className="text-[10px] font-black text-blue-800 italic">VISA</span>
             <span className="text-[10px] font-black text-red-600 italic">mastercard</span>
             <span className="text-[10px] font-black text-orange-500">bkash</span>
             <span className="text-[10px] font-black text-pink-600">Nagad</span>
        </div>
    </div>
</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cart;