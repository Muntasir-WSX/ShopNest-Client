import React, { useEffect, useState } from 'react';
import useAuth from '../../Context/UseAuth';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import { Package, Download, X } from 'lucide-react';
import Swal from 'sweetalert2';
import Invoice from './Invoice';

const MyOrder = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedOrder, setSelectedOrder] = useState(null); 

    const fetchOrders = async () => {
        try {
            const res = await axiosSecure.get(`/orders/user/${user?.email}`);
            setOrders(res.data);
            setLoading(false);
        } catch (error) {
            console.error(error);
            setLoading(false);
        }
    };

    useEffect(() => {
        if (user?.email) fetchOrders();
    }, [user?.email]);
    const handleCancelOrder = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You want to cancel this order?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#EF4444", 
            cancelButtonColor: "#059669",
            confirmButtonText: "Yes, Cancel it!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const res = await axiosSecure.patch(`/orders/cancel/${id}`);
                    if (res.data.modifiedCount > 0) {
                        Swal.fire("Cancelled!", "Your order has been cancelled.", "success");
                        fetchOrders(); 
                    }
                } catch (error) {
                    Swal.fire("Error", "Could not cancel order", "error");
                }
            }
        });
    };
    const handleOpenInvoice = (order) => {
        setSelectedOrder(order);
    };

    if (loading) return <div className="flex justify-center py-10"><span className="loading loading-spinner loading-lg text-[#059669]"></span></div>;

    return (
        <div className="space-y-6 relative min-h-screen pb-20">
            <h2 className="text-2xl font-bold text-gray-800 px-2">Orders ({orders.length})</h2>
            {selectedOrder && (
                <div className="fixed inset-0 z-100 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
                    <div className="bg-white rounded-3xl w-full max-w-5xl max-h-[90vh] overflow-y-auto relative shadow-2xl animate-in fade-in zoom-in duration-300">
                        <button 
                            onClick={() => setSelectedOrder(null)}
                            className="absolute top-5 right-5 p-2 bg-gray-100 hover:bg-red-50 hover:text-red-500 rounded-full transition-all z-20"
                        >
                            <X size={20} />
                        </button>
                        <Invoice order={selectedOrder} />
                    </div>
                </div>
            )}

            {orders.length === 0 ? (
                <div className="text-center py-20 bg-gray-50 rounded-3xl border-2 border-dashed border-gray-200">
                    <Package className="mx-auto text-gray-400 mb-4" size={48} />
                    <p className="text-gray-500 font-medium">No orders found yet.</p>
                </div>
            ) : (
                <div className="space-y-8">
                    {orders.map((order) => (
                        <div key={order._id} className={`border border-gray-100 rounded-3xl overflow-hidden shadow-sm bg-white transition-all ${order.status === 'Cancelled' ? 'grayscale-[0.5] opacity-80' : 'hover:shadow-md'}`}>
                            <div className={`p-5 grid grid-cols-2 md:grid-cols-4 gap-4 ${order.status === 'Cancelled' ? 'bg-gray-200 text-gray-600' : 'bg-[#FBBF24] text-gray-800'}`}>
                                <div>
                                    <p className="text-[10px] uppercase font-bold opacity-70 tracking-wider">Order ID</p>
                                    <p className="font-bold">#{order.transactionId?.slice(-10).toUpperCase()}</p>
                                </div>
                                <div>
                                    <p className="text-[10px] uppercase font-bold opacity-70 tracking-wider">Total Amount</p>
                                    <p className="font-bold">৳{order.totalAmount}</p>
                                </div>
                                <div>
                                    <p className="text-[10px] uppercase font-bold opacity-70 tracking-wider">Status</p>
                                    <p className="font-bold">{order.status}</p>
                                </div>
                                <div>
                                    <p className="text-[10px] uppercase font-bold opacity-70 tracking-wider">Order Date</p>
                                    <p className="font-bold">{new Date(order.orderDate).toLocaleDateString('en-GB')}</p>
                                </div>
                            </div>
                            <div className="p-6 space-y-4">
                                {order.cartItems?.map((item, idx) => (
                                    <div key={idx} className="flex items-center gap-4 py-3 border-b border-gray-50 last:border-0">
                                        <div className="relative">
                                            <img src={item.image} alt={item.name} className="w-16 h-16 rounded-2xl object-cover bg-gray-50 border border-gray-100" />
                                            <span className="absolute -top-2 -right-2 bg-[#059669] text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-sm">x{item.quantity}</span>
                                        </div>
                                        <div className="flex-1">
                                            <h4 className="font-bold text-gray-800 text-sm md:text-base">{item.name}</h4>
                                            <p className="text-xs text-[#059669] font-semibold">৳{item.price}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="px-6 py-5 bg-gray-50/50 flex flex-wrap justify-between items-center border-t border-gray-100 gap-4">
                                <div className="flex items-center gap-3">
                                    <span className={`px-4 py-1.5 rounded-full text-[11px] font-bold uppercase border tracking-tight ${
                                        order.status === 'Delivered' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 
                                        order.status === 'Cancelled' ? 'bg-red-50 text-red-600 border-red-100' : 
                                        'bg-orange-50 text-orange-600 border-orange-100'
                                    }`}>
                                        {order.status}
                                    </span>
                                    <p className="hidden sm:block text-xs text-gray-500 font-medium italic">
                                        {order.status === 'Cancelled' ? "This transaction was cancelled." : `Successfully ${order.status.toLowerCase()}.`}
                                    </p>
                                </div>
                                
                                <div className="flex items-center gap-3 ml-auto">
                                    {order.status === 'Pending' && (
                                        <button 
                                            onClick={() => handleCancelOrder(order._id)}
                                            className="bg-red-500 hover:bg-red-600 text-white text-xs font-bold py-2.5 px-5 rounded-xl transition-all shadow-sm hover:shadow-md"
                                        >
                                            Cancel Order
                                        </button>
                                    )}

                                    {order.status === 'Delivered' && (
                                        <button className="bg-[#059669] hover:bg-[#047857] text-white text-xs font-bold py-2.5 px-5 rounded-xl transition-all shadow-sm">
                                            Add Review
                                        </button>
                                    )}

                                    <button 
                                        onClick={() => handleOpenInvoice(order)}
                                        className="flex items-center gap-2 bg-[#047857] hover:bg-[#046247] text-white text-xs font-bold py-2.5 px-5 rounded-xl transition-all shadow-sm group"
                                    >
                                        <Download size={14} /> 
                                        View Invoice
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default MyOrder;