import React, { useEffect, useState } from 'react';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import { ShieldCheck, User, Trash2 } from 'lucide-react';
import Swal from 'sweetalert2';
import Loader from '../../Shared Components/Loader/Loader';
const AllUsers = () => {
    const axiosSecure = useAxiosSecure();
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchUsers = async () => {
        setLoading(true);
        try {
            const res = await axiosSecure.get('/users');
            setUsers(res.data);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching users:", error);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const handleMakeAdmin = (user) => {
        Swal.fire({
            title: "Are you sure?",
            text: `Do you want to make ${user.name} an Admin?`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#10b981",
            confirmButtonText: "Yes, make Admin!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const res = await axiosSecure.patch(`/users/admin/${user._id}`);
                    if (res.data.modifiedCount > 0) {
                        Swal.fire("Success!", `${user.name} is now an Admin.`, "success");
                        fetchUsers(); 
                    }
                } catch (error) {
                    Swal.fire("Error", "Failed to update role", "error");
                }
            }
        });
    };

    if (loading) return <div className="flex justify-center py-20"> <Loader></Loader></div>;

    return (
        <div className="p-6 bg-white rounded-3xl shadow-sm border border-gray-100">
            <div className="flex justify-between items-center mb-8">
                <h2 className="text-2xl font-black text-gray-800">Manage Users <span className="text-sm font-normal text-gray-400">({users.length})</span></h2>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full text-left border-separate border-spacing-y-3">
                    <thead>
                        <tr className="text-gray-400 text-xs uppercase tracking-widest">
                            <th className="px-6 py-4">User</th>
                            <th className="px-6 py-4">Email</th>
                            <th className="px-6 py-4">Role</th>
                            <th className="px-6 py-4 text-center">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => (
                            <tr key={user._id} className="bg-gray-50/50 hover:bg-gray-50 transition-colors group">
                                <td className="px-6 py-4 rounded-l-2xl">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600">
                                            {user.photoURL ? (
                                                <img src={user.photoURL} alt="" className="w-full h-full rounded-full object-cover" />
                                            ) : (
                                                <User size={20} />
                                            )}
                                        </div>
                                        <span className="font-bold text-gray-800">{user.name || "Anonymous"}</span>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <span className="text-sm text-gray-500">{user.email}</span>
                                </td>
                                <td className="px-6 py-4">
                                    <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase ${
                                        user.role === 'admin' ? 'bg-purple-100 text-purple-600' : 'bg-blue-100 text-blue-600'
                                    }`}>
                                        {user.role}
                                    </span>
                                </td>
                                <td className="px-6 py-4 rounded-r-2xl text-center">
                                    {user.role !== 'admin' ? (
                                        <button 
                                            onClick={() => handleMakeAdmin(user)}
                                            className=" bg-[#059669] hover:bg-emerald-500 text-xs text-white flex p-2 transition-normal rounded-lg  "
                                            title="Make Admin"
                                        >
                                            <ShieldCheck size={18} /> Make Admin
                                        </button>
                                    ) : (
                                        <span className="text-xs text-gray-400 font-medium">Full Access</span>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AllUsers;