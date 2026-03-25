import React, { useEffect, useState } from 'react';
import { CheckCircle, Clock, Package, ChevronLeft, ChevronRight } from 'lucide-react';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../Hooks/useAxiosSecure';

const ManageOrders = () => {
    const axiosSecure = useAxiosSecure();
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [totalOrders, setTotalOrders] = useState(0);
    const [currentPage, setCurrentPage] = useState(0);
    const itemsPerPage = 10;
    const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
    });

    const fetchAllOrders = async () => {
        setLoading(true);
        try {
            const res = await axiosSecure.get(`/admin/orders?page=${currentPage}&size=${itemsPerPage}`);
            setOrders(res.data.result);
            setTotalOrders(res.data.total);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching orders:", error);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAllOrders();
    }, [currentPage]);

    const handleUpdateStatus = async (id) => {
        try {
            const res = await axiosSecure.patch(`/orders/status-update/${id}`, { status: 'Accepted' });
            if (res.data.modifiedCount > 0) {
                Toast.fire({
                    icon: 'success',
                    title: 'Order accepted successfully'
                });
                fetchAllOrders(); 
            }
        } catch (error) {
            Toast.fire({
                icon: 'error',
                title: 'Failed to update status'
            });
        }
    };

    const totalPages = Math.ceil(totalOrders / itemsPerPage);

    if (loading) return <div className="flex justify-center py-20"><span className="loading loading-spinner loading-lg text-emerald-600"></span></div>;

    return (
        <div className="p-6 bg-white rounded-3xl shadow-sm border border-gray-100">
            <div className="flex justify-between items-center mb-8">
                <h2 className="text-2xl font-black text-gray-800">Manage Orders <span className="text-sm font-normal text-gray-400">({totalOrders})</span></h2>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full text-left border-separate border-spacing-y-3">
                    <thead>
                        <tr className="text-gray-400 text-xs uppercase tracking-widest">
                            <th className="px-6 py-4">Customer</th>
                            <th className="px-6 py-4">Order Details</th>
                            <th className="px-6 py-4">Amount</th>
                            <th className="px-6 py-4">Status</th>
                            <th className="px-6 py-4">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map((order) => (
                            <tr key={order._id} className="bg-gray-50/50 hover:bg-gray-50 transition-colors group">
                                <td className="px-6 py-4 rounded-l-2xl">
                                    <p className="font-bold text-gray-800 text-sm">{order.firstName} {order.lastName}</p>
                                    <p className="text-xs text-gray-400">{order.email}</p>
                                </td>
                                <td className="px-6 py-4">
                                    <p className="text-xs font-mono text-emerald-600 font-bold">#{order.transactionId?.slice(-8).toUpperCase()}</p>
                                    <p className="text-xs text-gray-500">{new Date(order.orderDate).toLocaleDateString()}</p>
                                </td>
                                <td className="px-6 py-4">
                                    <p className="font-black text-gray-800">৳{order.totalAmount}</p>
                                </td>
                                <td className="px-6 py-4">
                                    <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-tighter border ${
                                        order.status === 'Pending' ? 'bg-orange-50 text-orange-600 border-orange-100' : 
                                        order.status === 'Accepted' ? 'bg-blue-50 text-blue-600 border-blue-100' : 
                                        'bg-emerald-50 text-emerald-600 border-emerald-100'
                                    }`}>
                                        {order.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4 rounded-r-2xl">
                                    {order.status === 'Pending' ? (
                                        <button 
                                            onClick={() => handleUpdateStatus(order._id)}
                                            className="flex items-center gap-1 bg-emerald-600 hover:bg-emerald-700 text-white text-[10px] font-bold py-2 px-4 rounded-lg transition-all shadow-sm"
                                        >
                                            <CheckCircle size={14} /> Accept Order
                                        </button>
                                    ) : (
                                        <button disabled className="text-gray-300 cursor-not-allowed text-[10px] font-bold px-4">
                                            No Action
                                        </button>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Pagination Controls */}
            <div className="mt-8 flex justify-center items-center gap-4">
                <button 
                    disabled={currentPage === 0}
                    onClick={() => setCurrentPage(prev => prev - 1)}
                    className="p-2 rounded-xl border border-gray-200 hover:bg-gray-50 disabled:opacity-30 transition-all"
                >
                    <ChevronLeft size={20} />
                </button>
                
                <div className="flex gap-2">
                    {[...Array(totalPages).keys()].map(page => (
                        <button
                            key={page}
                            onClick={() => setCurrentPage(page)}
                            className={`w-10 h-10 rounded-xl font-bold text-sm transition-all ${currentPage === page ? 'bg-emerald-600 text-white' : 'hover:bg-gray-100 text-gray-600'}`}
                        >
                            {page + 1}
                        </button>
                    ))}
                </div>

                <button 
                    disabled={currentPage === totalPages - 1}
                    onClick={() => setCurrentPage(prev => prev + 1)}
                    className="p-2 rounded-xl border border-gray-200 hover:bg-gray-50 disabled:opacity-30 transition-all"
                >
                    <ChevronRight size={20} />
                </button>
            </div>
        </div>
    );
};

export default ManageOrders;