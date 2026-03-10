import React, { useState } from 'react';
import useAxiosPublic from '../Hooks/useAxiosPublic'; 
import FooterLogo from '../Shared Components/Logo/FooterLogo';

const Newsletter = () => {
    const [message, setMessage] = useState('');
    const axiosPublic = useAxiosPublic();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axiosPublic.post('/messages', { message, date: new Date() });
            alert("Thank you for your feedback!");
            setMessage(''); 
        } catch (error) {
            console.error("Error:", error);
            alert("Something went wrong!");
        }
    };

    return (
        <section className="py-20 rounded-3xl bg-linear-to-l from-green-100 to-green-white">
            <div className="max-w-3xl mx-auto px-6 text-center">
                <div className="flex justify-center mb-6">
                    <FooterLogo></FooterLogo>
                </div>

                <h2 className="text-4xl font-extrabold text-gray-900 mb-4">Your Feedback Matters!</h2>
                <p className="text-gray-600 mb-10 text-lg">
                    We're always striving to improve. Share your suggestions, questions, or updates.
                </p>
                
                <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-4 justify-center items-center">
                    <input 
                        type="text" 
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Enter your suggestions..." 
                        className="px-6 py-4 rounded-full border border-gray-300 w-full md:w-96 outline-none focus:border-green-600 shadow-sm"
                        required
                    />
                    <button 
                        type="submit" 
                        className="px-8 py-4 bg-green-800 hover:bg-green-900 text-white font-bold rounded-full transition-all shadow-lg"
                    >
                        Send Message
                    </button>
                </form>
            </div>
        </section>
    );
};

export default Newsletter;