import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { FcGoogle } from 'react-icons/fc'; 
import FooterLogo from '../Shared Components/Logo/FooterLogo';
import useAuth from '../Context/UseAuth';


const Signin = () => {
    const { userLogin, googleLogin } = useAuth();
    const navigate = useNavigate();
    
    // React Hook Form initialization
    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = async (data) => {
        try {
            await userLogin(data.email, data.password);
            toast.success("Successfully Signed In!");
            navigate('/'); 
        } catch (error) {
            toast.error(error.message.split('/')[1].replace(')', ''));
            console.error(error);
        }
    };

    const handleGoogleSignIn = async () => {
        try {
            await googleLogin();
            toast.success("Signed in with Google!");
            navigate('/');
        } catch (error) {
            toast.error(error.message);
        }
    };

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
                <div className="md:w-7/12 p-6 md:p-10 flex flex-col justify-center overflow-y-auto">
                    <div className="mb-4 transform scale-90 origin-left">
                       <FooterLogo />
                    </div>

                    <div className="mb-6">
                        <h3 className="text-2xl font-black text-gray-900 leading-tight">Sign In</h3>
                        <p className="text-gray-500 text-sm">Please fill your detail to access your account.</p>
                    </div>

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                        <div>
                            <label className="block text-xs font-bold text-gray-700 mb-1.5 ml-1">Email *</label>
                            <input 
                                {...register("email", { required: "Email is required" })}
                                type="email" 
                                placeholder="Enter Email Address"
                                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50 outline-none focus:bg-white focus:border-green-600 focus:ring-1 focus:ring-green-600 transition text-sm"
                            />
                            {errors.email && <span className="text-[10px] text-red-500 ml-1">{errors.email.message}</span>}
                        </div>

                        <div>
                            <label className="block text-xs font-bold text-gray-700 mb-1.5 ml-1">Password *</label>
                            <input 
                                {...register("password", { required: "Password is required" })}
                                type="password" 
                                placeholder="Enter Password"
                                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50 outline-none focus:bg-white focus:border-green-600 focus:ring-1 focus:ring-green-600 transition text-sm"
                            />
                            {errors.password && <span className="text-[10px] text-red-500 ml-1">{errors.password.message}</span>}
                        </div>

                        <div className="flex items-center justify-between text-xs px-1">
                            <label className="flex items-center gap-2 cursor-pointer">
                                <input type="checkbox" className="accent-green-600 w-3.5 h-3.5" />
                                <span className="text-gray-600">Remember me</span>
                            </label>
                            <button type="button" className="text-green-700 font-bold hover:underline">Forgot Password?</button>
                        </div>

                        <button type="submit" className="w-full bg-[#059669] text-white py-2.5 rounded-xl font-bold hover:bg-[#047857] transition-all transform active:scale-95 shadow-lg">
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

                    <button 
                        onClick={handleGoogleSignIn}
                        className="w-full border border-gray-200 py-2.5 rounded-xl flex items-center justify-center gap-2 hover:bg-gray-50 transition text-sm font-semibold text-gray-700 shadow-sm active:scale-[0.98]"
                    >
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