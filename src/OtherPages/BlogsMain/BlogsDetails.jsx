import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; 
import Loader from '../../Shared Components/Loader/Loader';
import useAxiosPublic from '../../Hooks/useAxiosPublic';
import { IoArrowBack } from "react-icons/io5"; 

const BlogsDetails = () => {
    const { id } = useParams(); 
    const navigate = useNavigate();
    const [blog, setBlog] = useState(null);
    const [loading, setLoading] = useState(true);
    const axiosPublic = useAxiosPublic();

    useEffect(() => {
        window.scrollTo(0, 0); 
        axiosPublic.get(`/blogs/${id}`)
            .then(res => {
                setBlog(res.data);
                setLoading(false);
            })
            .catch(err => {
                console.error("Error fetching blog:", err);
                setLoading(false);
            });
    }, [id, axiosPublic]);

    if (loading) {
        return <div className="flex h-screen items-center justify-center"><Loader /></div>;
    }

    if (!blog) return <div className="text-center py-20 text-xl font-bold">Blog not found!</div>;

    return (
        <div className="bg-gray-50 min-h-screen py-16 px-4">
            <div className="max-w-4xl mx-auto mb-6">
                <button 
                    onClick={() => navigate(-1)}
                    className="flex items-center gap-2 text-gray-600 font-bold hover:text-green-600 transition-colors group"
                >
                    <IoArrowBack className="text-xl group-hover:-translate-x-1 transition-transform" />
                    Back to Blogs
                </button>
            </div>

            <article className="max-w-4xl mx-auto bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">
                <img src={blog.image} alt={blog.title} className="w-full h-96 object-cover" />
                
                <div className="p-8 md:p-12">
                    <div className="flex items-center gap-4 mb-6">
                        <span className="bg-green-100 text-green-700 font-bold px-4 py-1 rounded-full text-sm uppercase tracking-wider">
                            {blog.category}
                        </span>
                        <p className="text-gray-500 text-sm font-medium">{blog.date}</p>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-8 leading-tight">
                        {blog.title}
                    </h1>
                    
                    <div className="flex items-center gap-4 mb-10 p-4 bg-gray-50 rounded-2xl">
                        <div className="w-14 h-14 rounded-full bg-green-500 flex items-center justify-center font-bold text-white text-xl shadow-md">
                            {blog.author?.charAt(0)}
                        </div>
                        <div>
                            <p className="font-bold text-gray-900 text-lg">{blog.author}</p>
                            <p className="text-sm text-gray-500">Expert Contributor</p>
                        </div>
                    </div>

                    <div className="text-gray-700 text-lg leading-relaxed space-y-6">
                        <p className="whitespace-pre-line">{blog.content}</p>
                    </div>
                </div>
            </article>
        </div>
    );
};

export default BlogsDetails;