import React, { useEffect, useState } from 'react';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import { 
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
    PieChart, Pie, Cell, Legend
    
} from 'recharts';
import { DollarSign, Users, ShoppingBag, Truck, TrendingUp } from 'lucide-react';

const Analytics = () => {
    const axiosSecure = useAxiosSecure();
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axiosSecure.get('/admin-stats')
            .then(res => {
                setStats(res.data);
                setLoading(false);
            });
    }, []);

    if (loading) return <div className="flex justify-center py-20"><span className="loading loading-spinner loading-lg text-emerald-600"></span></div>;

    // Pie Chart Colors
    const COLORS = ['#10b981', '#f59e0b', '#ef4444', '#3b82f6'];

    const cardData = [
        { id: 1, title: 'Total Revenue', value: `$${stats?.revenue}`, icon: <DollarSign />, color: 'bg-emerald-50 text-emerald-600' },
        { id: 2, title: 'Total Users', value: stats?.users, icon: <Users />, color: 'bg-blue-50 text-blue-600' },
        { id: 3, title: 'Total Products', value: stats?.products, icon: <ShoppingBag />, color: 'bg-purple-50 text-purple-600' },
        { id: 4, title: 'Total Orders', value: stats?.orders, icon: <Truck />, color: 'bg-orange-50 text-orange-600' },
    ];

    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            <h2 className="text-3xl font-black text-gray-800 mb-8">Business Analytics</h2>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
                {cardData.map((item) => (
                    <div key={item.id} className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex items-center gap-5">
                        <div className={`p-4 rounded-2xl ${item.color}`}>
                            {item.icon}
                        </div>
                        <div>
                            <p className="text-sm font-medium text-gray-500">{item.title}</p>
                            <h3 className="text-2xl font-bold text-gray-800">{item.value}</h3>
                        </div>
                    </div>
                ))}
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                
                {/* 1. Order Status Pie Chart */}
                <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm h-[400px]">
                    <h3 className="text-lg font-bold text-gray-800 mb-6 flex items-center gap-2">
                        <TrendingUp size={20} className="text-emerald-600"/> Order Distribution
                    </h3>
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                data={stats?.orderStats}
                                innerRadius={80}
                                outerRadius={120}
                                paddingAngle={5}
                                dataKey="count"
                                nameKey="_id"
                            >
                                {stats?.orderStats.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip />
                            <Legend verticalAlign="bottom" height={36}/>
                        </PieChart>
                    </ResponsiveContainer>
                </div>

                {/* 2. Simple Revenue Visualization (Dummy data based on total) */}
                <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm h-[400px]">
                    <h3 className="text-lg font-bold text-gray-800 mb-6">Sales Performance</h3>
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={stats?.orderStats}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                            <XAxis dataKey="_id" axisLine={false} tickLine={false} tick={{fill: '#9ca3af', fontSize: 12}} />
                            <YAxis axisLine={false} tickLine={false} tick={{fill: '#9ca3af', fontSize: 12}} />
                            <Tooltip cursor={{fill: '#f9fafb'}} />
                            <Bar dataKey="count" fill="#10b981" radius={[10, 10, 0, 0]} barSize={40} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>

            </div>
        </div>
    );
};

export default Analytics;