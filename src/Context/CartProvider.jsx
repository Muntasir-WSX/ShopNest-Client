import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import toast from 'react-hot-toast';
import useAxiosSecure from '../Hooks/useAxiosSecure';
import useAuth from './UseAuth';


export const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);
    const [cartLoading, setCartLoading] = useState(true);
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();
    const clearCart = useCallback(() => {
        setCart([]); 
    }, []);
    const fetchCart = useCallback(async () => {
        if (!user?.email) return;
        try {
            setCartLoading(true);
            const res = await axiosSecure.get(`/carts/${user.email}`);
            setCart(res.data);
        } catch (error) {
            console.error("Cart fetch error:", error);
        } finally {
            setCartLoading(false);
        }
    }, [user?.email, axiosSecure]);

    useEffect(() => {
        fetchCart();
    }, [fetchCart]);


    const addToCart = async (product) => {
        if (!user|| !user.email) return toast.error("Please login to add items!");
    
        const currentProductId = product._id || product.productId;
   if (!currentProductId) {
        console.error("ID missing in product:", product);
        return toast.error("Product ID not found!");
    }
       const cartItem = {
        productId: currentProductId, 
        userEmail: user.email,
        name: product.name,
        price: product.price,
        image: product.image || product.img, 
        quantity: product.quantity || 1, 
        unit: product.unit || '1kg',
        addedAt: new Date().toISOString(),
    };

    try {
        const res = await axiosSecure.post('/carts', cartItem);
        if (res.data.insertedId || res.data.modifiedCount > 0) {
            await axiosSecure.patch(`/products/update-stock/${currentProductId}`, {
                orderQuantity: product.quantity || 1
            });
            
            // toast.success(`${product.name} added to cart!`);
            fetchCart(); 
            return true;
        }
        return false;
    } catch (error) {
        toast.error(error.response?.data?.message || "Failed to add to cart");
        return false;
    }
};

    const updateQuantity = async (id, action, currentQty) => {
        if (action === 'decrease' && currentQty <= 1) return;
        try {
            const res = await axiosSecure.patch(`/carts/${id}`, { action });
            if (res.data.modifiedCount > 0) {
                fetchCart();
            }
        } catch (error) {
            console.error("Update qty error", error);
        }
    };
    const removeFromCart = async (id) => {
        try {
            const res = await axiosSecure.delete(`/carts/${id}`);
            if (res.data.deletedCount > 0) {
                toast.success("Item removed");
                fetchCart();
            }
        } catch (error) {
            toast.error("Could not remove item");
        }
    };

    const subTotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    const shippingCharge = cart.length > 0 ? 50 : 0;
    const totalAmount = subTotal + shippingCharge;

    return (
        <CartContext.Provider value={{
            cart, cartLoading, addToCart, removeFromCart, clearCart, updateQuantity,
            subTotal, shippingCharge, totalAmount, refetch: fetchCart
        }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => useContext(CartContext);