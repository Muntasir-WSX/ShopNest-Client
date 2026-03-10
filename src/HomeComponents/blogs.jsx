import React, { useState, useEffect } from 'react';
import useAxiosSecure from '../Hooks/useAxiosSecure';
import { Link } from 'react-router-dom'; 

const Blogs = () => {
    const [blogs, setBlogs] = useState([]);
    const axiosSecure = useAxiosSecure();

    useEffect(() => {
        axiosSecure.get('/blogs')
            .then(res => setBlogs(res.data))
            .catch(error => console.error("Error fetching blogs:", error));
    }, [axiosSecure]);

    return (
        <div className="py-16 px-4 max-w-7xl mx-auto">
            <div className="flex justify-between items-end mb-12">
                <div>
                    <p className="text-green-600 font-bold uppercase tracking-widest text-sm">News & Blogs</p>
                    <h2 className="text-4xl font-extrabold text-gray-900 mt-2">Our Latest News & Blogs</h2>
                </div>
                <Link to="/all-blogs" className="bg-green-700 text-white px-6 py-2 rounded-full font-semibold hover:bg-green-800 transition">
                    View All →
                </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {blogs.slice(0, 3).map((blog) => (
                    <div key={blog._id} className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all border border-gray-100">
                        <img src={blog.image} alt={blog.title} className="w-full h-56 object-cover" />
                        <div className="p-6">
                            <span className="text-xs font-bold text-yellow-600 bg-yellow-100 px-3 py-1 rounded-full uppercase">
                                {blog.category}
                            </span>
                            <h3 className="text-xl font-bold mt-4 mb-2 text-gray-800 leading-snug">{blog.title}</h3>
                            <div className="flex items-center text-xs text-gray-500 mt-4 mb-4 gap-4">
                                <span>{blog.author}</span>
                                <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>
                                <span>{blog.date}</span>
                            </div>
                            <button className="text-green-600 font-bold hover:underline">Read More</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Blogs;