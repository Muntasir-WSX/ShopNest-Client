import React from 'react';
import { useForm } from "react-hook-form";
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import Swal from 'sweetalert2';

const PostProducts = () => {
    const { register, handleSubmit, reset } = useForm();
    const axiosSecure = useAxiosSecure();
    const onSubmit = async (data) => {
        const productData = {
            name: data.name,
            quantity: parseInt(data.quantity),
            category: data.category,
            price: parseFloat(data.price),
            discount: parseFloat(data.discount),
            unit: data.unit,
            origin: data.origin,
            stockStatus: parseInt(data.quantity) > 0 ? "in-stock" : "out-of-stock",
            desc: data.desc,
            img: data.img
        };
        try {
            const res = await axiosSecure.post('/products', productData);
            if (res.data.insertedId) {
                reset();
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Product added successfully!",
                    showConfirmButton: false,
                    timer: 1500
                });
            }
        } catch (error) {
            Swal.fire("Error", "Something went wrong", "error");
        }
    };

    return (
        <div className="p-8 bg-white rounded-3xl shadow-sm border border-gray-100 max-w-4xl mx-auto">
            <h2 className="text-3xl font-black text-gray-800 mb-8 text-center">Add New Product</h2>
            
            <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Product Name */}
                <div className="form-control">
                    <label className="label font-bold text-gray-700">Product Name</label>
                    <input {...register("name")} type="text" placeholder="e.g. Fresh Broccoli" className="input input-bordered rounded-xl focus:outline-emerald-500" required />
                </div>

                {/* Category */}
                <div className="form-control">
                    <label className="label font-bold text-gray-700">Category</label>
                    <select {...register("category")} className="select select-bordered rounded-xl focus:outline-emerald-500" required>
                        <option value="Vegetables">Vegetables</option>
                        <option value="Fresh Fruits">Fresh Fruits</option>
                        <option value="Milk & Eggs">Milk & Eggs</option>
                        <option value="Bakery">Bakery</option>
                        <option value="House Hold">House Hold</option>
                        <option value="Dry Fruits">Dry fruits</option>
                        <option value="Beverages">Beverage</option>
                        <option value="Meat & Fish">Meat & Fish</option>

                    </select>
                </div>

                {/* Quantity */}
                <div className="form-control">
                    <label className="label font-bold text-gray-700">Quantity</label>
                    <input {...register("quantity")} type="number" placeholder="48" className="input input-bordered rounded-xl focus:outline-emerald-500" required />
                </div>

                {/* Unit */}
                <div className="form-control">
                    <label className="label font-bold text-gray-700">Unit</label>
                    <input {...register("unit")} type="text" placeholder="e.g. 1kg or 500g" className="input input-bordered rounded-xl focus:outline-emerald-500" required />
                </div>

                {/* Price */}
                <div className="form-control">
                    <label className="label font-bold text-gray-700">Price (৳)</label>
                    <input {...register("price")} type="number" step="0.01" placeholder="300" className="input input-bordered rounded-xl focus:outline-emerald-500" required />
                </div>

                {/* Discount */}
                <div className="form-control">
                    <label className="label font-bold text-gray-700">Discount (%)</label>
                    <input {...register("discount")} type="number" placeholder="5" className="input input-bordered rounded-xl focus:outline-emerald-500" defaultValue="0" />
                </div>

                {/* Origin */}
                <div className="form-control">
                    <label className="label font-bold text-gray-700">Origin</label>
                    <input {...register("origin")} type="text" placeholder="e.g. Bogura, BD" className="input input-bordered rounded-xl focus:outline-emerald-500" required />
                </div>

                {/* Image URL */}
                <div className="form-control">
                    <label className="label font-bold text-gray-700">Image URL</label>
                    <input {...register("img")} type="text" placeholder="Cloudinary/ImgBB link" className="input input-bordered rounded-xl focus:outline-emerald-500" required />
                </div>

                {/* Description */}
                <div className="form-control md:col-span-2">
                    <label className="label font-bold text-gray-700">Description</label>
                    <textarea {...register("desc")} className="textarea textarea-bordered rounded-xl h-24 focus:outline-emerald-500" placeholder="Product details..." required></textarea>
                </div>

                {/* Submit Button */}
                <div className="md:col-span-2 mt-4">
                    <button type="submit" className="btn bg-emerald-600 hover:bg-emerald-700 text-white w-full rounded-xl border-none font-bold text-lg">
                        Add Product to Store
                    </button>
                </div>
            </form>
        </div>
    );
};

export default PostProducts;