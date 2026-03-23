import React, { useRef } from 'react';
import { useReactToPrint } from 'react-to-print';
import { Printer } from 'lucide-react';

const Invoice = ({ order }) => {
    const componentRef = useRef();
    const handlePrint = useReactToPrint({
        contentRef: componentRef, 
        documentTitle: `Invoice_${order?.transactionId?.slice(-8)}`,
    });

    if (!order) return null;

    return (
        <div className="p-4">
            <div className="flex justify-end gap-4 mb-6 no-print">
                <button 
                    onClick={() => handlePrint()} 
                    className="flex items-center gap-2 bg-[#059669] text-white px-6 py-2 rounded-xl font-bold hover:bg-[#047857] transition-all"
                >
                    <Printer size={18} /> Print Invoice
                </button>
            </div>
            <div ref={componentRef} className="bg-white p-10 border border-gray-100 max-w-4xl mx-auto shadow-sm print:shadow-none print:border-none">
                <div className="flex justify-between items-start border-b-2 border-gray-50 pb-8">
                    <div>
                        <div className="mb-2">
                             <svg width="150" height="60" viewBox="0 0 500 300" xmlns="http://www.w3.org/2000/svg">
                                <g transform="translate(250, 100)">
                                    <path d="M-45,-30 L45,-30 L55,40 C55,55 40,65 0,65 C-40,65 -55,55 -55,40 Z" fill="#059669" />
                                    <path d="M-25,-30 L-25,-45 C-25,-60 -15,-65 0,-65 C15,-65 25,-60 25,-45 L25,-30" fill="none" stroke="#FBBF24" strokeWidth="10" strokeLinecap="round"/>
                                    <path d="M-15,30 L-15,-5 L15,30 L15,-5" fill="none" stroke="white" strokeWidth="8" strokeLinecap="round" />
                                </g>
                                <text x="250" y="220" fontFamily="Arial" fontSize="55" fontWeight="900" textAnchor="middle">
                                    <tspan fill="#064E3B">Shop</tspan><tspan fill="#F59E0B">Nest</tspan>
                                </text>
                            </svg>
                        </div>
                        <p className="text-gray-500 text-sm">Chittagong, Bangladesh</p>
                        <p className="text-gray-500 text-sm">support@shopnest.com</p>
                    </div>
                    <div className="text-right">
                        <h1 className="text-3xl font-black text-gray-800 uppercase tracking-tighter">Invoice</h1>
                        <p className="text-[#059669] font-bold mt-1">#{order.transactionId?.slice(-8).toUpperCase()}</p>
                        <p className="text-gray-500 text-xs mt-4">Date: {new Date(order.orderDate).toLocaleDateString()}</p>
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-8 py-10">
                    <div>
                        <h3 className="text-xs uppercase font-bold text-gray-400 mb-2">Bill To:</h3>
                        <p className="font-bold text-gray-800 text-lg">{order.firstName} {order.lastName}</p>
                        <p className="text-gray-600">{order.email}</p>
                        <p className="text-gray-600">{order.phone}</p>
                    </div>
                    <div className="text-right">
                        <h3 className="text-xs uppercase font-bold text-gray-400 mb-2">Payment Method:</h3>
                        <p className="font-bold text-gray-800">Online Payment (SSLCommerz)</p>
                        <p className="text-emerald-600 font-bold uppercase text-xs mt-1">Status: Paid</p>
                    </div>
                </div>
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-gray-50">
                            <th className="p-4 text-xs uppercase font-bold text-gray-600 border-b">Item Description</th>
                            <th className="p-4 text-xs uppercase font-bold text-gray-600 border-b text-center">Qty</th>
                            <th className="p-4 text-xs uppercase font-bold text-gray-600 border-b text-right">Price</th>
                            <th className="p-4 text-xs uppercase font-bold text-gray-600 border-b text-right">Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        {order.cartItems?.map((item, index) => (
                            <tr key={index} className="border-b border-gray-50">
                                <td className="p-4">
                                    <p className="font-bold text-gray-800">{item.name}</p>
                                    <p className="text-xs text-gray-400">Standard Pack</p>
                                </td>
                                <td className="p-4 text-center text-gray-700">{item.quantity}</td>
                                <td className="p-4 text-right text-gray-700">৳{item.price}</td>
                                <td className="p-4 text-right font-bold text-gray-800">৳{item.price * item.quantity}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div className="flex justify-end mt-8">
                    <div className="w-full max-w-xs space-y-3">
                        <div className="flex justify-between text-gray-600">
                            <span>Subtotal:</span>
                            <span>৳{order.totalAmount}</span>
                        </div>
                        <div className="flex justify-between text-gray-600">
                            <span>Shipping:</span>
                            <span>৳0.00</span>
                        </div>
                        <div className="flex justify-between text-xl font-black text-gray-800 border-t-2 border-gray-100 pt-3">
                            <span>Grand Total:</span>
                            <span className="text-[#059669]">৳{order.totalAmount}</span>
                        </div>
                    </div>
                </div>
                <div className="mt-20 pt-10 border-t border-gray-100 text-center">
                    <p className="text-gray-400 text-sm italic">Thank you for shopping with ShopNest! Your smart grocery partner.</p>
                </div>
            </div>
        </div>
    );
};

export default Invoice;