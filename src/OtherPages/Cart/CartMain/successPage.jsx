import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import { useCart } from '../../../Context/CartProvider';
import useAuth from '../../../Context/UseAuth';


const SuccessPage = () => {
    const { tranId } = useParams();
    const { clearCart } = useCart();
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    useEffect(() => {
        if (user?.email) {
            axiosSecure.delete(`/carts/clear/${user.email}`)
                .then(res => {
                    if (res.data.acknowledged) {
                    clearCart();
                }
            })
            .catch(err => console.error("Error clearing cart:", err));
    }
}, [user?.email, axiosSecure, clearCart]);

    return (
        <div className="text-center py-20">
            <h1 className="text-4xl font-bold text-green-600">Payment Successful!</h1>
            <p className="mt-4">Transaction ID: <span className="font-mono font-bold">{tranId}</span></p>
        </div>
    );
};


export default SuccessPage;