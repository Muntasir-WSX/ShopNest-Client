import React, { useEffect, useState } from 'react';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import { PlusCircle, Trash2, ChevronLeft, ChevronRight } from 'lucide-react';
import Swal from 'sweetalert2';
import Loader from '../../Shared Components/Loader/Loader';

const AllProducts = () => {
    const axiosSecure = useAxiosSecure();
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [totalProducts, setTotalProducts] = useState(0);
    const [currentPage, setCurrentPage] = useState(0);
    const itemsPerPage = 8;

    const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true
    });

    const fetchProducts = async () => {
        setLoading(true);
        try {
            const res = await axiosSecure.get(`/admin/products?page=${currentPage}&size=${itemsPerPage}`);
            setProducts(res.data.result);
            setTotalProducts(res.data.total);
            setLoading(false);
        } catch (error) {
            console.error(error);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, [currentPage]);

    const handleAddStock = async (id, currentQty) => {
        const { value: addedQty } = await Swal.fire({
            title: 'Add New Stock',
            input: 'number',
            inputLabel: `Current Stock: ${currentQty}`,
            inputPlaceholder: 'Enter quantity to add',
            showCancelButton: true
        });

        if (addedQty && addedQty > 0) {
            try {
                const res = await axiosSecure.patch(`/admin/products/add-stock/${id}`, { newQuantity: addedQty });
                if (res.data.modifiedCount > 0) {
                    Toast.fire({ icon: 'success', title: 'Stock updated!' });
                    fetchProducts();
                }
            } catch (err) {
                Toast.fire({ icon: 'error', title: 'Update failed' });
            }
        }
    };
    const handleDelete = async (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "This product will be removed permanently!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#10b981",
            confirmButtonText: "Yes, delete it!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                const res = await axiosSecure.delete(`/products/${id}`);
                if (res.data.deletedCount > 0) {
                    Swal.fire("Deleted!", "Product has been deleted.", "success");
                    fetchProducts();
                }
            }
        });
    };

    const totalPages = Math.ceil(totalProducts / itemsPerPage);

    if (loading) return <div className="text-center py-20"> <Loader></Loader></div>;

    return (
        <div className="p-6 bg-white rounded-3xl shadow-sm border border-gray-100">
            <h2 className="text-2xl font-black text-gray-800 mb-6">Inventory Management</h2>
            
            <div className="overflow-x-auto">
                <table className="w-full text-left border-separate border-spacing-y-2">
                    <thead>
                        <tr className="text-gray-400 text-xs uppercase">
                            <th className="px-4 py-3">Product</th>
                            <th className="px-4 py-3">Category</th>
                            <th className="px-4 py-3">Price</th>
                            <th className="px-4 py-3">Stock</th>
                            <th className="px-4 py-3 text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map(product => (
                            <tr key={product._id} className="bg-gray-50/50 hover:bg-gray-50 transition-all">
                                <td className="px-4 py-3 rounded-l-xl">
                                    <div className="flex items-center gap-3">
                                        <img src={product.img} className="w-10 h-10 rounded-lg object-cover" alt="" />
                                        <div>
                                            <p className="font-bold text-sm text-gray-800">{product.name}</p>
                                            <p className="text-[10px] text-gray-400">{product.unit}</p>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-4 py-3 text-sm text-gray-600">{product.category}</td>
                                <td className="px-4 py-3 font-bold">৳{product.price}</td>
                                <td className="px-4 py-3">
                                    <span className={`px-2 py-1 rounded-md text-xs font-bold ${product.quantity === 0 ? 'bg-red-100 text-red-600' : 'bg-emerald-100 text-emerald-600'}`}>
                                        {product.quantity} left
                                    </span>
                                </td>
                                <td className="px-4 py-3 rounded-r-xl text-center">
                                    <div className="flex justify-center gap-2">
                                        <button onClick={() => handleAddStock(product._id, product.quantity)} className="p-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-all" title="Add Stock">
                                            <PlusCircle size={16} />
                                        </button>
                                        <button onClick={() => handleDelete(product._id)} className="p-2 bg-red-50 text-red-500 rounded-lg hover:bg-red-500 hover:text-white transition-all">
                                            <Trash2 size={16} />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Pagination */}
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

export default AllProducts;