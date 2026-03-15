import { createContext, useState, useEffect } from 'react';
import useAxiosSecure from '../Hooks/useAxiosSecure';
import useAuth from './UseAuth';

export const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
    const [wishlist, setWishlist] = useState([]);
    const [count, setCount] = useState(0); 
    const [currentPage, setCurrentPage] = useState(0);
    const [loading, setLoading] = useState(true);
    const itemsPerPage = 10;

    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();

   useEffect(() => {
        if (user?.email) {
            setLoading(true);
            axiosSecure.get(`/wishlist/${user.email}?page=${currentPage}&size=${itemsPerPage}`)
                .then(res => {
                    setWishlist(res.data.result || []); 
                    setCount(res.data.count || 0);
                    setLoading(false);
                })
                .catch(err => {
                    console.error(err);
                    setLoading(false);
                });
                } else {
        setLoading(false);
        }
    }, [user, axiosSecure, currentPage]);

    const addToWishlist = async (product) => {
        if (!user?.email) return;

        const wishItem = {
            productId: product._id,
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
                const newItem = { ...wishItem, _id: res.data.insertedId };
                if(currentPage === 0) {
                    setWishlist(prev => [newItem, ...prev].slice(0, itemsPerPage));
                }
                setCount(prev => prev + 1);
            }
        } catch (err) {
            console.error("Wishlist addition failed", err);
        }
    };

    const removeFromWishlist = async (id) => {
        try {
            const res = await axiosSecure.delete(`/wishlist/${id}`);
            if (res.data.deletedCount > 0) {
                setWishlist(prev => prev.filter(item => item._id !== id));
                setCount(prev => prev - 1);
                if (wishlist.length === 1 && currentPage > 0) {
                    setCurrentPage(currentPage - 1);
                }
            }
        } catch (err) {
            console.error("Delete failed", err);
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