import { createContext, useContext, useState } from 'react';
import useAxiosPublic from '../Hooks/useAxiosPublic';


export const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const axiosPublic = useAxiosPublic();
    const [cart, setCart] = useState([]);

    const addToCart = async (cartItem) => {
        try {
            const res = await axiosPublic.post('/carts', cartItem);
            if (res.data.insertedId) {
                alert("Product added to cart!");
                return true;
            }
        } catch (err) {
            console.error("Error adding to cart:", err);
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