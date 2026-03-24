import React, { useEffect, useRef, useState } from 'react';
import toast from 'react-hot-toast';
import { Camera } from 'lucide-react';
import useAuth from '../../Context/UseAuth';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import Branding from '../../Shared Components/Branding/Branding';
import Newsletter from '../../HomeComponents/newsLetter';

const PersonalInfo = () => {
    const { user, updateUserProfile, loading: authLoading } = useAuth();
    const axiosSecure = useAxiosSecure();
    const [loading, setLoading] = useState(false);
    const nameParts = user?.displayName?.split(" ") || ["", ""];
    const fileInputRef = useRef(null); 
    const [uploading, setUploading] = useState(false);

    const handleCameraClick = () => {
        fileInputRef.current.click();
    };

    const handleFileChange = async (e) => {
        const file = e.target.files[0];
        if (!file) return;
        console.log("Selected file:", file.name);
    };

    const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true); 
    
    const form = e.target;
    const firstName = form.firstName.value;
    const lastName = form.lastName.value;
    const phone = form.phone.value;
    const gender = form.gender.value;
    const photoURL = user?.photoURL;

    try {
        await updateUserProfile(`${firstName} ${lastName}`, photoURL);
        const userData = {
            firstName,
            lastName,
            phone,
            gender,
            email: user?.email,
            lastUpdated: new Date()
        };
        const res = await axiosSecure.put(`/users/${user?.email}`, userData);
        if (res.data.acknowledged) {
            toast.success("Profile updated successfully!");
        }
        
    } catch (error) {
        toast.error("Failed to update profile");
    } finally {
        setLoading(false); 
    }
};

    const inputStyle = "input input-bordered w-full focus:outline-none focus:border-[#059669] bg-gray-50 border-gray-200 rounded-xl py-6";

    return (
        <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
            <div className="relative w-32 h-32 mx-auto mb-10">
                <img 
                    src={user?.photoURL || "https://i.ibb.co/5GzXkwq/user.png"} 
                    alt="Profile" 
                    className="w-full h-full rounded-full object-cover border-4 border-[#059669]/10"
                />
                <input 
                    type="file" 
                    ref={fileInputRef} 
                    onChange={handleFileChange} 
                    className="hidden" 
                    accept="image/*"
                />
                <button 
                    onClick={handleCameraClick}
                    type="button" 
                    className="absolute bottom-1 right-1 bg-[#059669] p-2 rounded-full text-white shadow-lg hover:scale-110 transition-all cursor-pointer"
                >
                    <Camera size={16} />
                </button>
            </div>

            <form onSubmit={handleUpdate} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="form-control">
                        <label className="label text-sm font-bold text-gray-700">First Name *</label>
                        <input name="firstName" type="text" defaultValue={nameParts[0]} className={inputStyle} required />
                    </div>
                    <div className="form-control">
                        <label className="label text-sm font-bold text-gray-700">Last Name *</label>
                        <input name="lastName" type="text" defaultValue={nameParts[1]} className={inputStyle} required />
                    </div>
                </div>

                <div className="form-control">
                    <label className="label text-sm font-bold text-gray-700">Email *</label>
                    <input type="email" value={user?.email} readOnly className={`${inputStyle} opacity-60 cursor-not-allowed`} />
                </div>

                <div className="form-control">
                    <label className="label text-sm font-bold text-gray-700">Phone *</label>
                    <input name="phone" type="text" placeholder="+880123456789" className={inputStyle} />
                </div>

                <div className="form-control">
                    <label className="label text-sm font-bold text-gray-700">Gender *</label>
                    <select name="gender" className="select select-bordered focus:outline-none focus:border-[#059669] bg-gray-50 rounded-xl h-[52px]">
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                    </select>
                </div>

                <button 
                    disabled={loading || authLoading}
                    className="bg-[#059669] text-white py-3 rounded-xl font-semibold hover:bg-[#047857] transition-all flex items-center justify-center gap-2 px-10 w-fit"
                >
                    {(loading || authLoading) ? <span className="loading loading-spinner"></span> : "Update Changes"}
                </button>
            </form>
            <div className='mt-15'>
 <Branding></Branding>
            </div>

            <div className='mt-15'>
 <Newsletter></Newsletter>
            </div>
           
           
        </div>
    );
};

export default PersonalInfo;