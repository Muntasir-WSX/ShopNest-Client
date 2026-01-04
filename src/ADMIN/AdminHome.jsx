import React from 'react';
import { motion } from "framer-motion";
import { 
    Users, 
    Package, 
    DollarSign, 
    ShoppingBag, 
    ArrowUpRight, 
    Activity,
    Plus
} from "lucide-react";

const AdminHome = () => {
    // Animation Variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
    };

    const cardVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: { y: 0, opacity: 1 }
    };

    const stats = [
        { label: "Total Revenue", value: "৳1,25,430", icon: <DollarSign />, color: "bg-green-500", trend: "+12.5%" },
        { label: "Total Orders", value: "450", icon: <ShoppingBag />, color: "bg-orange-500", trend: "+5.2%" },
        { label: "Active Customers", value: "1,205", icon: <Users />, color: "bg-blue-500", trend: "+10%" },
        { label: "Products in Stock", value: "45", icon: <Package />, color: "bg-purple-500", trend: "Stable" },
    ];

    return (
        <motion.div 
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="max-w-[1440px] mx-auto p-6 lg:p-10 space-y-10"
        >
            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h1 className="text-3xl font-black text-gray-800">Admin Overview</h1>
                    <p className="text-gray-500 font-medium">Welcome back! Here's what's happening today.</p>
                </div>
                <motion.button 
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center justify-center gap-2 bg-gray-900 text-white px-6 py-3 rounded-2xl font-bold shadow-lg shadow-gray-200"
                >
                    <Plus size={20} /> Add New Product
                </motion.button>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, index) => (
                    <motion.div 
                        key={index}
                        variants={cardVariants}
                        whileHover={{ y: -5 }}
                        className="bg-white p-6 rounded-4xl border border-gray-100 shadow-xl shadow-gray-500/5 group"
                    >
                        <div className="flex justify-between items-start mb-4">
                            <div className={`p-4 rounded-2xl ${stat.color} text-white shadow-lg`}>
                                {stat.icon}
                            </div>
                            <span className="flex items-center gap-1 text-green-600 text-sm font-bold bg-green-50 px-2 py-1 rounded-lg">
                                {stat.trend} <ArrowUpRight size={14} />
                            </span>
                        </div>
                        <p className="text-gray-500 font-bold text-sm uppercase tracking-wider">{stat.label}</p>
                        <h3 className="text-3xl font-black text-gray-800 mt-1">{stat.value}</h3>
                    </motion.div>
                ))}
            </div>

            {/* Bottom Section: Recent Activity & Quick Preview */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                
                {/* Activity Feed */}
                <motion.div variants={cardVariants} className="lg:col-span-2 bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm">
                    <div className="flex items-center justify-between mb-8">
                        <h2 className="text-xl font-black text-gray-800 flex items-center gap-2">
                            <Activity className="text-green-600" /> Recent Sales
                        </h2>
                        <button className="text-sm font-bold text-green-600 hover:underline">View All</button>
                    </div>
                    
                    <div className="space-y-6">
                        {[1, 2, 3].map((_, i) => (
                            <div key={i} className="flex items-center justify-between p-4 rounded-2xl hover:bg-gray-50 transition-colors border border-transparent hover:border-gray-100">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-full bg-gray-200 overflow-hidden">
                                        <img src={`https://i.pravatar.cc/150?u=${i}`} alt="user" />
                                    </div>
                                    <div>
                                        <p className="font-bold text-gray-800">Customer #{i + 120}</p>
                                        <p className="text-xs text-gray-400 font-medium">2 minutes ago</p>
                                    </div>
                                </div>
                                <p className="font-black text-gray-800">+৳1,200</p>
                            </div>
                        ))}
                    </div>
                </motion.div>

                {/* Quick Info / System Status */}
                <motion.div variants={cardVariants} className="bg-gray-900 p-8 rounded-[2.5rem] text-white relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-green-500/20 rounded-full blur-3xl -mr-16 -mt-16"></div>
                    <h2 className="text-xl font-bold mb-6 relative z-10">System Status</h2>
                    <div className="space-y-6 relative z-10">
                        <div className="flex justify-between items-center">
                            <span className="text-gray-400 font-medium">Server Status</span>
                            <span className="flex items-center gap-2 text-green-400 font-bold text-sm">
                                <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span> Online
                            </span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="text-gray-400 font-medium">Database (MongoDB)</span>
                            <span className="text-green-400 font-bold text-sm">Connected</span>
                        </div>
                        <div className="pt-6 border-t border-gray-800">
                            <p className="text-xs text-gray-500 mb-2 uppercase tracking-widest font-bold">Storage Usage</p>
                            <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden">
                                <div className="w-1/3 h-full bg-green-500"></div>
                            </div>


                            
                        </div>
                    </div>
                </motion.div>

            </div>
        </motion.div>
    );
};

export default AdminHome;