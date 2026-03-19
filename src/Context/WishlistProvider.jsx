import { createContext, useState, useEffect, useCallback } from 'react';
import useAxiosSecure from '../Hooks/useAxiosSecure';
import useAuth from './UseAuth';
import toast from 'react-hot-toast';

export const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
    const [wishlist, setWishlist] = useState([]);
    const [count, setCount] = useState(0); 
    const [currentPage, setCurrentPage] = useState(0);
    const [loading, setLoading] = useState(true);
    const itemsPerPage = 10;
    
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();
    const fetchWishlist = useCallback(async () => {
        if (!user?.email) {
            setLoading(false);
            return;
        }
        setLoading(true);
        try {
            const res = await axiosSecure.get(`/wishlist/${user.email}?page=${currentPage}&size=${itemsPerPage}`);
            setWishlist(res.data.result || []); 
            setCount(res.data.count || 0);
        } catch (err) {
            console.error("Wishlist fetch failed:", err);
        } finally {
            setLoading(false);
        }
    }, [user?.email, axiosSecure, currentPage]);

    useEffect(() => {
        fetchWishlist();
    }, [fetchWishlist]);
    const addToWishlist = async (product) => {
        if (!user?.email) {
            return toast.error("Please login first!", { id: 'auth-error' });
        }
        const isAlreadyAdded = wishlist.some(item => String(item.productId) === String(product._id));
        
        if (isAlreadyAdded) {
            return toast.error("Already added to your wishlist!", { id: 'duplicate-wishlist' });
        }

        const wishItem = {
            productId: String(product._id), 
            userEmail: user.email,
            name: product.name,
            price: product.price,
            img: product.img,
            unit: product.unit,
            stockStatus: product.stockStatus,
            addedAt: new Date()
        };

        try {
            const res = await axiosSecure.post('/wishlist', wishItem);
            if (res.data.insertedId) {
                toast.success(`${product.name} added to wishlist!`, { id: 'wishlist-success' });
                const newItem = { ...wishItem, _id: res.data.insertedId };
                setWishlist(prev => [newItem, ...prev].slice(0, itemsPerPage));
                setCount(prev => prev + 1);
                fetchWishlist(); 
            }
        } catch (err) {
            if (err.response?.status === 400) {
                toast.error("Already in wishlist!", { id: 'duplicate-wishlist' });
            } else {
                console.error("Wishlist addition failed", err);
                toast.error("Something went wrong!", { id: 'server-error' });
            }
        }
    };
const removeFromWishlist = async (id) => {
    try {
        const res = await axiosSecure.delete(`/wishlist/${id}`);
        if (res.data.deletedCount > 0) {
          
            setWishlist((prev) => prev.filter((item) => item._id !== id));
            setCount((prev) => prev - 1);
            if (wishlist.length === 1 && currentPage > 0) {
                setCurrentPage((prev) => prev - 1);
            }
            return true;
        }
        return false;
    } catch (err) {
        console.error("Delete failed", err);
        return false;
    }
};

    const totalPages = Math.ceil(count / itemsPerPage);

    return (
        <WishlistContext.Provider value={{ 
            wishlist, 
            addToWishlist, 
            removeFromWishlist, 
            currentPage, 
            setCurrentPage, 
            totalPages,
            count,
            loading 
        }}>
            {children}
        </WishlistContext.Provider>
    );
};