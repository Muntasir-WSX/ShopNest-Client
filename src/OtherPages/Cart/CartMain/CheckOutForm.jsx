import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useCart } from '../../../Context/CartProvider';

const CheckOutForm = () => {
    const { totalAmount, subTotal, shippingCharge } = useCart();
    const [locations, setLocations] = useState([]);
    const { register, handleSubmit, formState: { errors } } = useForm();

    useEffect(() => {
        fetch('/ctgLocations.json')
            .then((res) => res.json())
            .then((data) => setLocations(data.locations))
            .catch((err) => console.error("Error loading areas:", err));
    }, []);

    const onSubmit = (data) => {
        const orderDetails = {
            ...data,
            district: "Chittagong",
            totalAmount,
            orderDate: new Date().toISOString()
        };
        console.log("Order Data Ready for SSLCOMMERZ:", orderDetails);
        
    };

    return (
        <div className="bg-gray-50 min-h-screen py-10 px-4 sm:px-10">
            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
                
                {/* Billing Details Form */}
                <div className="lg:col-span-2 bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
                    <h2 className="text-2xl font-black text-gray-800 mb-8 underline decoration-[#059669] decoration-4 underline-offset-8">Billing Details</h2>
                    
                    <form id="checkout-form" onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">First Name *</label>
                                <input 
                                    {...register("firstName", { required: "First name is required" })}
                                    type="text" placeholder="Enter Your Name" 
                                    className={`w-full p-3 border rounded-xl outline-none transition-all ${errors.firstName ? 'border-red-500' : 'border-gray-200 focus:ring-2 focus:ring-[#059669]'}`} 
                                />
                                {errors.firstName && <span className="text-red-500 text-xs mt-1">{errors.firstName.message}</span>}
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">Last Name *</label>
                                <input 
                                    {...register("lastName", { required: "Last name is required" })}
                                    type="text" placeholder="Enter Your Last Name" 
                                    className={`w-full p-3 border rounded-xl outline-none transition-all ${errors.lastName ? 'border-red-500' : 'border-gray-200 focus:ring-2 focus:ring-[#059669]'}`} 
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">District *</label>
                                <input type="text" value="Chittagong" disabled className="w-full p-3 border border-gray-200 rounded-xl bg-gray-50 text-gray-400 font-bold cursor-not-allowed" />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">Select Area (Ctg City) </label>
                                <select 
                                    {...register("area", { required: "Please select an area" })}
                                    className={`w-full p-3 border rounded-xl outline-none bg-white transition-all ${errors.area ? 'border-red-500' : 'border-gray-200 focus:ring-2 focus:ring-[#059669]'}`}
                                >
                                    <option value="">Choose your location</option>
                                    {locations.map((loc) => (
                                        <option key={loc.id} value={loc.area}>{loc.area}</option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">Street Address *</label>
                            <input 
                                {...register("address", { required: "Address is required" })}
                                type="text" placeholder="House no, Road name, Flat info" 
                                className={`w-full p-3 border rounded-xl outline-none transition-all ${errors.address ? 'border-red-500' : 'border-gray-200 focus:ring-2 focus:ring-[#059669]'}`} 
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">Phone Number *</label>
                                <input 
                                    {...register("phone", { 
                                        required: "Phone number is required",
                                        pattern: { value: /^01[3-9]\d{8}$/, message: "Invalid BD Phone Number" }
                                    })}
                                    type="tel" placeholder="01XXXXXXXXX" 
                                    className={`w-full p-3 border rounded-xl outline-none transition-all ${errors.phone ? 'border-red-500' : 'border-gray-200 focus:ring-2 focus:ring-[#059669]'}`} 
                                />
                                {errors.phone && <span className="text-red-500 text-xs mt-1">{errors.phone.message}</span>}
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">Email Address *</label>
                                <input 
                                    {...register("email", { 
                                        required: "Email is required",
                                        pattern: { value: /^\S+@\S+$/i, message: "Invalid email address" }
                                    })}
                                    type="email" placeholder="mail@example.com" 
                                    className={`w-full p-3 border rounded-xl outline-none transition-all ${errors.email ? 'border-red-500' : 'border-gray-200 focus:ring-2 focus:ring-[#059669]'}`} 
                                />
                                {errors.email && <span className="text-red-500 text-xs mt-1">{errors.email.message}</span>}
                            </div>
                        </div>
                    </form>
                </div>

                {/* Order Summary Sidebar */}
                <div className="lg:col-span-1">
                    <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 sticky top-10">
                        <h2 className="text-xl font-black text-gray-800 mb-6">Order Summary</h2>
                        <div className="space-y-4 border-b pb-6 text-sm">
                            <div className="flex justify-between text-gray-500 ">
                                <span>Subtotal</span>
                                <span className="font-bold text-gray-800">৳{subTotal}</span>
                            </div>
                            <div className="flex justify-between text-gray-500">
                                <span>Shipping Fee (Ctg City)</span>
                                <span className="font-bold text-gray-800">৳{shippingCharge}</span>
                            </div>
                        </div>
                        <div className="py-6 flex justify-between items-center">
                            <span className="text-lg font-bold">Total Amount</span>
                            <span className="text-2xl font-black text-[#059669]">৳{totalAmount}</span>
                        </div>

                        <button 
                            form="checkout-form"
                            type="submit"
                            className="w-full mt-10 py-4 bg-[#059669] text-white px-6 rounded-lg font-semibold hover:bg-[#047857] transition-all flex items-center justify-center gap-2 group"
                        >
                            Proceed to Payment
                            <span>→</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CheckOutForm;