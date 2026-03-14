import React, { useState, useEffect } from 'react';
import useAxiosSecure from '../../Hooks/useAxiosSecure'; 
import BlogsBanner from './BlogsBanner';
import Loader from '../../Shared Components/Loader/Loader';
import { Link } from 'react-router';


const BlogsMain = () => {
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const axiosSecure = useAxiosSecure();

    useEffect(() => {
        axiosSecure.get('/blogs')
            .then(res => {
                setBlogs(res.data);
                setLoading(false);
            })
            .catch(error => {
                console.error("Error fetching blogs:", error);
                setLoading(false);
            });
    }, [axiosSecure]);

    if (loading) {
        return (
            <div className="flex h-screen items-center justify-center">
                <Loader />
            </div>
        );
    }
    return (
        <div className="bg-white">
            <div className="max-w-7xl mx-auto px-4 pt-8">
                <BlogsBanner />
            </div>
            <div className="py-16 px-4 max-w-7xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {blogs.map((blog) => (
                        <div key={blog._id} className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all border border-gray-100 flex flex-col">
                            <img src={blog.image} alt={blog.title} className="w-full h-60 object-cover" />
                            <div className="p-6 grow flex flex-col">
                                <span className="text-xs font-bold text-yellow-600 bg-yellow-100 px-3 py-1 rounded-full uppercase self-start">
                                    {blog.category}
                                </span>
                                <h3 className="text-xl font-bold mt-4 mb-3 text-gray-800 leading-snug">{blog.title}</h3>
                                <p className="text-gray-600 text-sm mb-4 line-clamp-3">{blog.description}</p>
                                
                                <div className="mt-auto pt-4 border-t border-gray-100 flex items-center justify-between">
                                    <div className="text-xs text-gray-500">
                                        <p className="font-bold text-gray-800">{blog.author}</p>
                                        <p>{blog.date}</p>
                                    </div>
                                     <Link to={`/blogsDetails/${blog._id}`} className="mt-auto">
                                <button className="text-green-600 font-bold hover:underline">
                                    Read More
                                </button>
                            </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default BlogsMain;