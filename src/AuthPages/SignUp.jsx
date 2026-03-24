import React, { useEffect } from 'react'; 
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { FcGoogle } from 'react-icons/fc'; 
import FooterLogo from '../Shared Components/Logo/FooterLogo';
import toast from 'react-hot-toast'; 
import useAuth from '../Context/UseAuth';

const SignUp = () => {
    const { createUser, updateUserProfile, googleLogin, user } = useAuth();
    const navigate = useNavigate();
    useEffect(() => {
        if (user) {
            navigate('/');
        }
    }, [user, navigate]);

    const { register, handleSubmit, formState: { errors } } = useForm();

   const onSubmit = async (data) => {
    const fullName = `${data.firstName} ${data.lastName}`;
    const defaultPhoto = "https://cdn-icons-png.flaticon.com/512/149/149071.png";

    try {
        const result = await createUser(data.email, data.password);
        await updateUserProfile(fullName, defaultPhoto);
        const userData = {
            name: fullName,
            email: data.email,
            photo: defaultPhoto,
        };

        fetch(`http://localhost:5000/users/${data.email}`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(userData)
        })
        .then(res => res.json())
        .then(data => {
            if(data.upsertedCount > 0 || data.modifiedCount > 0 || data.matchedCount > 0){
                toast.success("Account created and saved to database!");
            }
        });

    } catch (error) {
        toast.error(error.message);
    }
};

const handleGoogleSignUp = async () => {
    try {
        const result = await googleLogin();
        const user = result.user;
        const userData = {
            name: user.displayName,
            email: user.email,
            photo: user.photoURL,
        };

        fetch(`http://localhost:5000/users/${user.email}`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(userData)
        })
        .then(res => res.json())
        .then(() => {
            toast.success("Signed up with Google!");
        });

    } catch (error) {
        toast.error(error.message);
    }
};

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4 font-sans">
            <div className="max-w-4xl w-full bg-white rounded-3xl shadow-xl overflow-hidden flex flex-col md:flex-row-reverse md:h-[680px]">
                
                {/* Right Side: Visual Content */}
                <div className="md:w-5/12 relative hidden md:block">
                    <img 
                        src="https://res.cloudinary.com/dnk0bvpym/image/upload/v1773248862/women_r8pi3q.jpg" 
                        alt="Shopping at ShopNest" 
                        className="absolute inset-0 w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/20 flex flex-col justify-end p-6 text-white">
                        <div className="bg-white/10 backdrop-blur-md p-5 rounded-xl border border-white/10">
                            <p className="italic text-xs mb-3 leading-relaxed opacity-90">
                                "The variety of organic products and the lightning-fast delivery at ShopNest is simply unmatched."
                            </p>
                            <h4 className="font-bold text-sm">Darlene Robertson</h4>
                            <p className="text-[10px] text-green-300">Happy Customer</p>
                        </div>
                    </div>
                </div>

                {/* Left Side: Form */}
                <div className="md:w-7/12 p-6 md:p-8 flex flex-col justify-center overflow-y-auto">
                    <div className="mb-4 transform scale-90 origin-left">
                       <FooterLogo />
                    </div>

                    <div className="mb-5">
                        <h3 className="text-2xl font-black text-gray-900 leading-tight">Sign Up</h3>
                        <p className="text-gray-500 text-xs">Fill your information below to register.</p>
                    </div>

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            <div>
                                <label className="block text-[10px] font-bold text-gray-700 mb-1 ml-1">First Name *</label>
                                <input 
                                    {...register("firstName", { required: "First name is required" })}
                                    type="text" 
                                    placeholder="First Name"
                                    className="w-full px-4 py-2 rounded-xl border border-gray-200 bg-gray-50 outline-none focus:bg-white focus:border-green-600 focus:ring-1 focus:ring-green-600 transition text-sm"
                                />
                                {errors.firstName && <span className="text-[9px] text-red-500 ml-1">{errors.firstName.message}</span>}
                            </div>
                            <div>
                                <label className="block text-[10px] font-bold text-gray-700 mb-1 ml-1">Last Name *</label>
                                <input 
                                    {...register("lastName", { required: "Last name is required" })}
                                    type="text" 
                                    placeholder="Last Name"
                                    className="w-full px-4 py-2 rounded-xl border border-gray-200 bg-gray-50 outline-none focus:bg-white focus:border-green-600 focus:ring-1 focus:ring-green-600 transition text-sm"
                                />
                                {errors.lastName && <span className="text-[9px] text-red-500 ml-1">{errors.lastName.message}</span>}
                            </div>
                        </div>

                        <div>
                            <label className="block text-[10px] font-bold text-gray-700 mb-1 ml-1">Email Address *</label>
                            <input 
                                {...register("email", { 
                                    required: "Email is required",
                                    pattern: { value: /^\S+@\S+$/i, message: "Invalid email address" }
                                })}
                                type="email" 
                                placeholder="Enter Email Address"
                                className="w-full px-4 py-2 rounded-xl border border-gray-200 bg-gray-50 outline-none focus:bg-white focus:border-green-600 focus:ring-1 focus:ring-green-600 transition text-sm"
                            />
                            {errors.email && <span className="text-[9px] text-red-500 ml-1">{errors.email.message}</span>}
                        </div>

                        <div>
                            <label className="block text-[10px] font-bold text-gray-700 mb-1 ml-1">Password *</label>
                            <input 
                                {...register("password", { 
                                    required: "Password is required",
                                    minLength: { value: 6, message: "Minimum 6 characters required" }
                                })}
                                type="password" 
                                placeholder="Enter Password"
                                className="w-full px-4 py-2 rounded-xl border border-gray-200 bg-gray-50 outline-none focus:bg-white focus:border-green-600 focus:ring-1 focus:ring-green-600 transition text-sm"
                            />
                            {errors.password && <span className="text-[9px] text-red-500 ml-1">{errors.password.message}</span>}
                        </div>

                        <div className="flex items-start gap-2 text-[10px] py-1">
                            <input type="checkbox" {...register("terms", { required: true })} className="accent-green-600 w-3.5 h-3.5 mt-0.5 cursor-pointer rounded" id="terms" />
                            <label htmlFor="terms" className="text-gray-500 leading-tight cursor-pointer">
                                I agree with <span className="text-green-700 font-bold hover:underline">Terms & Condition</span>
                            </label>
                        </div>

                        <button type="submit" className="w-full bg-[#059669] text-white py-2.5 rounded-xl font-bold hover:bg-[#047857] transition-all transform active:scale-95 shadow-lg text-sm">
                            Sign Up
                        </button>
                    </form>

                    <div className="relative my-4">
                        <div className="absolute inset-0 flex items-center">
                            <span className="w-full border-t border-gray-100"></span>
                        </div>
                        <div className="relative flex justify-center text-[9px] uppercase font-bold tracking-widest">
                            <span className="bg-white px-3 text-gray-400">or Sign Up with</span>
                        </div>
                    </div>

                    <button 
                        onClick={handleGoogleSignUp}
                        className="w-full border border-gray-200 py-2.5 rounded-xl flex items-center justify-center gap-2 hover:bg-gray-50 transition text-sm font-semibold text-gray-700 shadow-sm active:scale-[0.98]"
                    >
                        <FcGoogle className="text-lg" />
                        Sign Up With Google
                    </button>

                    <p className="mt-4 text-center text-gray-600 text-[11px] font-medium">
                        Already have an account? 
                        <Link to="/signin" className="text-green-700 font-bold ml-1 hover:underline">Sign In</Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default SignUp;