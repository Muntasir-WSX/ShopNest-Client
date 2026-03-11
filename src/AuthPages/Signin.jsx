import React from 'react';
import { Link } from 'react-router-dom';
import { FcGoogle } from 'react-icons/fc'; 
import FooterLogo from '../Shared Components/Logo/FooterLogo';

const Signin = () => {
    return (
        <div className="h-screen flex items-center justify-center bg-gray-50 p-4 overflow-hidden">
            <div className="max-w-4xl w-full bg-white rounded-3xl shadow-xl overflow-hidden flex flex-col md:flex-row h-full max-h-[580px]">
                
                {/* Left Side: Image Content */}
                <div className="md:w-5/12 relative hidden md:block">
                    <img 
                        src="https://res.cloudinary.com/dnk0bvpym/image/upload/v1773162540/women1_jqzi1z.jpg" 
                        alt="Shopping" 
                        className="absolute inset-0 w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/30 flex flex-col justify-end p-6 text-white">
                        <div className="bg-white/10 backdrop-blur-md p-4 rounded-xl border border-white/10">
                            <p className="italic text-xs mb-2 leading-relaxed opacity-90">
                                "Fresh groceries at my doorstep every day. ShopNest has completely changed how I manage my kitchen!"
                            </p>
                            <h4 className="font-bold text-sm">Cameron Williamson</h4>
                            <p className="text-[10px] text-gray-200">Housewife</p>
                        </div>
                    </div>
                </div>

                {/* Right Side: Form Content */}
                <div className="md:w-7/12 p-6 md:p-10 flex flex-col justify-center">
                    {/* Compact Logo */}
                    <div className="mb-4 transform scale-90 origin-left">
                       <FooterLogo />
                    </div>

                    <div className="mb-6">
                        <h3 className="text-2xl font-black text-gray-900 leading-tight">Sign In</h3>
                        <p className="text-gray-500 text-sm">Please fill your detail to access your account.</p>
                    </div>

                    <form className="space-y-4">
                        <div>
                            <label className="block text-xs font-bold text-gray-700 mb-1.5 ml-1">Email *</label>
                            <input 
                                type="email" 
                                placeholder="Enter Email Address"
                                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50 outline-none focus:bg-white focus:border-green-600 focus:ring-1 focus:ring-green-600 transition text-sm"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-xs font-bold text-gray-700 mb-1.5 ml-1">Password *</label>
                            <input 
                                type="password" 
                                placeholder="Enter Password"
                                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50 outline-none focus:bg-white focus:border-green-600 focus:ring-1 focus:ring-green-600 transition text-sm"
                                required
                            />
                        </div>

                        <div className="flex items-center justify-between text-xs px-1">
                            <label className="flex items-center gap-2 cursor-pointer">
                                <input type="checkbox" className="accent-green-600 w-3.5 h-3.5" />
                                <span className="text-gray-600">Remember me</span>
                            </label>
                            <button type="button" className="text-green-700 font-bold hover:underline">Forgot Password?</button>
                        </div>

                        <button className="w-full bg-[#059669] text-white py-2.5 rounded-xl font-bold hover:bg-[#047857] transition-all transform active:scale-95 shadow-lg">
                            Sign In
                        </button>
                    </form>

                    <div className="relative my-6">
                        <div className="absolute inset-0 flex items-center">
                            <span className="w-full border-t border-gray-100"></span>
                        </div>
                        <div className="relative flex justify-center text-[10px] uppercase font-bold">
                            <span className="bg-white px-3 text-gray-400">Or Sign In with</span>
                        </div>
                    </div>

                    <button className="w-full border border-gray-200 py-2.5 rounded-xl flex items-center justify-center gap-2 hover:bg-gray-50 transition text-sm font-semibold text-gray-700 shadow-sm active:scale-[0.98]">
                        <FcGoogle className="text-xl" />
                        Sign In With Google
                    </button>

                    <p className="mt-6 text-center text-gray-600 text-xs">
                        Don't have an account? 
                        <Link to="/signup" className="text-green-700 font-bold ml-1 hover:underline">Sign Up</Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Signin;