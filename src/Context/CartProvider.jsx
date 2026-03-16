import { createContext, useContext, useState } from 'react';
import useAxiosPublic from '../Hooks/useAxiosPublic';
import toast from 'react-hot-toast';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const axiosPublic = useAxiosPublic();
    const [cart, setCart] = useState([]);

    const addToCart = async (cartItem) => {
    try {
        const res = await axiosPublic.post('/carts', cartItem);
        if (res.data.insertedId) {
            await axiosPublic.patch(`/products/update-stock/${cartItem.productId}`, {
                orderQuantity: cartItem.quantity
            })
            toast.success("Added to cart & stock updated!"); 
            return true;
        }
    } catch (err) {
        toast.error("Error adding to cart."); 
        return false;
    }
};

    return (
        <CartContext.Provider value={{ addToCart, cart }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => useContext(CartContext);