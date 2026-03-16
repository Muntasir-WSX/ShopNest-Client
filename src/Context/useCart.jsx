import { useContext } from 'react';
import { CartContext } from './CartProvider';


const useCart = () => {
    return useContext(CartContext);
};
export default useCart;