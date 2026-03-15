import { useContext } from 'react';
import { WishlistContext } from '../../../Context/WishlistProvider';


const Wishlist = () => {
    const { wishlist, removeFromWishlist } = useContext(WishlistContext);

    return (
        <div className="max-w-7xl mx-auto py-12">
            <h2 className="text-3xl font-bold mb-8">My Wishlist</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {wishlist.map(item => (
                    <div key={item._id} className="border p-4 rounded-xl">
                        <img src={item.img} alt={item.name} />
                        <h3>{item.name}</h3>
                        <button onClick={() => removeFromWishlist(item._id)} className="text-red-500">
                            Remove
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Wishlist;