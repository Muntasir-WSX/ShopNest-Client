import React, { useEffect, useState } from 'react';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import { Mail, Trash2, Calendar, ChevronLeft, ChevronRight, User } from 'lucide-react';
import Swal from 'sweetalert2';
import Loader from '../../Shared Components/Loader/Loader';

const NewsLetterMessage = () => {
    const axiosSecure = useAxiosSecure();
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [totalMessages, setTotalMessages] = useState(0);
    const [currentPage, setCurrentPage] = useState(0);
    const itemsPerPage = 6;

    const fetchMessages = async () => {
        setLoading(true);
        try {
            const res = await axiosSecure.get(`/admin/messages?page=${currentPage}&size=${itemsPerPage}`);
            setMessages(res.data.result);
            setTotalMessages(res.data.total);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching messages:", error);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchMessages();
    }, [currentPage]);

    const handleDelete = (id) => {
        Swal.fire({
            title: "Delete message?",
            text: "This action cannot be undone!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#ef4444",
            confirmButtonText: "Yes, delete it!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                const res = await axiosSecure.delete(`/admin/messages/${id}`);
                if (res.data.deletedCount > 0) {
                    Swal.fire("Deleted!", "Message removed.", "success");
                    fetchMessages();
                }
            }
        });
    };

    const totalPages = Math.ceil(totalMessages / itemsPerPage);

    if (loading) return <div className="flex justify-center py-20"><Loader></Loader></div>;

    return (
        <div className="p-6">
            <h2 className="text-2xl font-black text-gray-800 mb-8 flex items-center gap-3">
                <Mail className="text-emerald-600" /> Customer Inquiries 
                <span className="text-sm font-normal bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full">{totalMessages} Total</span>
            </h2>

            {messages.length === 0 ? (
                <div className="text-center py-20 bg-gray-50 rounded-3xl border-2 border-dashed border-gray-200">
                    <p className="text-gray-400 font-medium">No messages found!</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {messages.map((msg) => (
                        <div key={msg._id} className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow relative group">
                            <button 
                                onClick={() => handleDelete(msg._id)}
                                className="absolute top-4 right-4 p-2 text-gray-300 hover:text-red-500 transition-colors"
                            >
                                <Trash2 size={18} />
                            </button>
                            
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-10 h-10 bg-emerald-50 rounded-full flex items-center justify-center text-emerald-600">
                                    <User size={20} />
                                </div>
                                <div>
                                    <h4 className="font-bold text-gray-800">{msg.email || "Anonymous Sender"}</h4>
                                    <p className="text-[10px] text-gray-400 flex items-center gap-1 uppercase tracking-wider">
                                        <Calendar size={10} /> {new Date(msg._id.getTimestamp?.() || Date.now()).toLocaleDateString()}
                                    </p>
                                </div>
                            </div>
                            
                            <div className="bg-gray-50 p-4 rounded-2xl">
                                <p className="text-sm text-gray-600 leading-relaxed italic">
                                    "{msg.message || msg.text || "No message content provided."}"
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Pagination Controls */}
            {totalPages > 1 && (
                <div className="mt-12 flex justify-center items-center gap-6">
                    <button 
                        disabled={currentPage === 0}
                        onClick={() => setCurrentPage(currentPage - 1)}
                        className="p-3 bg-white border border-gray-200 rounded-2xl hover:bg-emerald-50 hover:text-emerald-600 disabled:opacity-30 transition-all"
                    >
                        <ChevronLeft size={20} />
                    </button>
                    
                    <span className="text-sm font-bold text-gray-500 uppercase tracking-widest">
                        Page {currentPage + 1} of {totalPages}
                    </span>

                    <button 
                        disabled={currentPage === totalPages - 1}
                        onClick={() => setCurrentPage(currentPage + 1)}
                        className="p-3 bg-white border border-gray-200 rounded-2xl hover:bg-emerald-50 hover:text-emerald-600 disabled:opacity-30 transition-all"
                    >
                        <ChevronRight size={20} />
                    </button>
                </div>
            )}
        </div>
    );
};

export default NewsLetterMessage;