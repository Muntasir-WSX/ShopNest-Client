import React, { useState, useEffect } from 'react';
import useAxiosSecure from '../../Hooks/useAxiosSecure'; 
import BlogsBanner from './BlogsBanner';

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
        return <div className="text-center py-20 font-bold text-xl">Loading Blogs...</div>;
    }

    return (
        <div className="py-16 px-4 max-w-7xl mx-auto">
            {/* Header */}
            <div className="text-center mb-16">
                <BlogsBanner></BlogsBanner>
            </div>

            {/* Blogs Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {blogs.map((blog) => (
                    <div key={blog._id} className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all border border-gray-100 flex flex-col">
                        <img src={blog.image} alt={blog.title} className="w-full h-60 object-cover" />
                        <div className="p-6 grow">
                            <span className="text-xs font-bold text-yellow-600 bg-yellow-100 px-3 py-1 rounded-full uppercase">
                                {blog.category}
                            </span>
                            <h3 className="text-xl font-bold mt-4 mb-3 text-gray-800 leading-snug">{blog.title}</h3>
                            <p className="text-gray-600 text-sm mb-4 line-clamp-3">{blog.description}</p>
                            
                            <div className="mt-auto pt-4 border-t border-gray-100 flex items-center justify-between">
                                <div className="text-xs text-gray-500">
                                    <p className="font-bold text-gray-800">{blog.author}</p>
                                    <p>{blog.date}</p>
                                </div>
                                <button className="text-green-600 font-bold hover:underline transition-all">Read More →</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default BlogsMain;