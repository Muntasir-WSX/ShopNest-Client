import { useContext } from "react";
import { WishlistContext } from "../../../Context/WishlistProvider";
import { IoCloseOutline, IoArrowBackOutline, IoArrowForwardOutline } from "react-icons/io5";
import Branding from "../../../Shared Components/Branding/Branding";
import Loader from "../../../Shared Components/Loader/Loader";
import toast from "react-hot-toast";
import { useCart } from "../../../Context/CartProvider";

const Wishlist = () => {
 const context = useContext(WishlistContext) || {};
  const { wishlist = [], removeFromWishlist, currentPage, setCurrentPage, totalPages, loading } = context;
const { addToCart } = useCart();

const handleMoveToCart = async (item) => {
    const cartItem = {
      productId: item.productId, 
      name: item.name,
      price: parseFloat(item.price),
      image: item.img,
      quantity: 1,
      userEmail: item.userEmail 
    };

    const success = await addToCart(cartItem);
    if (success) {
      const removed = await removeFromWishlist(item._id); 
      if(removed) {
        toast.success(`${item.name} moved to cart!`);
      }
    }
  };

if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
       <Loader></Loader>
      </div>
    );
  }
  return (
    <div className="bg-white min-h-screen">
      <div className="bg-gray-50 py-16 text-center border-b border-gray-100">
        <h1 className="text-4xl font-black text-gray-900 mb-2">Wishlist</h1>
        <p className="text-gray-500 font-medium">Home / Wishlist</p>
      </div>

      <div className="max-w-7xl mx-auto py-12 px-4">
        {wishlist.length > 0 ? (
          <>
            <div className="overflow-x-auto border border-gray-100 rounded-2xl shadow-sm">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-[#FFC107] text-gray-900 uppercase text-sm font-bold">
                    <th className="px-6 py-4">Product</th>
                    <th className="px-6 py-4">Price</th>
                    <th className="px-6 py-4">Stock Status</th>
                    <th className="px-6 py-4 text-center">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {wishlist.map((item) => (
                    <tr key={item._id} className="hover:bg-gray-50/50 transition-colors">
                      <td className="px-6 py-6">
                        <div className="flex items-center gap-4">
                          <button
                            onClick={() => removeFromWishlist(item._id)}
                            className="text-gray-400 hover:text-red-500 transition-colors"
                          >
                            <IoCloseOutline size={24} />
                          </button>
                          <div className="w-20 h-20 bg-gray-50 rounded-xl p-2 border border-gray-100">
                            <img src={item.img} alt={item.name} className="w-full h-full object-contain" />
                          </div>
                          <div>
                            <h3 className="font-bold text-gray-900">{item.name}</h3>
                            <span className="text-xs text-gray-400 font-medium">{item.unit}</span>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-6 font-black text-[#059669]">৳{item.price}</td>
                      <td className="px-6 py-6">
                        <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                          item.stockStatus === "in-stock" ? "bg-green-50 text-green-600" : "bg-red-50 text-red-600"
                        }`}>
                          {item.stockStatus === "in-stock" ? "Instock" : "Out of Stock"}
                        </span>
                      </td>
                      <td className="px-6 py-6 text-center">
                        {item.stockStatus === "out-of-stock" ? (
                          <button disabled className="bg-gray-100 text-gray-400 px-6 py-2.5 rounded-lg font-bold cursor-not-allowed text-sm uppercase">Sold Out</button>
                        ) : (
                          <button onClick={() =>handleMoveToCart(item)} className="bg-[#059669] text-white px-6 py-2.5 rounded-lg font-bold hover:bg-[#047857] transition-all text-sm uppercase">Add to Cart</button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination controls with Prev and Next */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-6 mt-10">
                <button
                  disabled={currentPage === 0}
                  onClick={() => setCurrentPage(prev => prev - 1)}
                  className="flex items-center gap-2 px-5 py-2.5 bg-gray-900 text-white rounded-xl font-bold disabled:bg-gray-200 disabled:text-gray-400 transition-all hover:bg-gray-800"
                >
                  <IoArrowBackOutline size={20} /> Prev
                </button>
                
                <span className="text-gray-600 font-bold">
                  Page {currentPage + 1} of {totalPages}
                </span>

                <button
                  disabled={currentPage >= totalPages - 1}
                  onClick={() => setCurrentPage(prev => prev + 1)}
                  className="flex items-center gap-2 px-5 py-2.5 bg-gray-900 text-white rounded-xl font-bold disabled:bg-gray-200 disabled:text-gray-400 transition-all hover:bg-gray-800"
                >
                  Next <IoArrowForwardOutline size={20} />
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-20 bg-gray-50 rounded-3xl border-2 border-dashed border-gray-200">
            <h3 className="text-2xl font-bold text-gray-400">Your wishlist is empty!</h3>
            <p className="text-gray-500 mt-2">Add some items to see them here.</p>
          </div>
        )}
      </div>
      <Branding />
    </div>
  );
};

export default Wishlist;