import React, { useState } from "react";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { motion, AnimatePresence } from "framer-motion";
import toast from "react-hot-toast";
import { Package, CheckCircle, Truck, Clock, MapPin } from "lucide-react";
import Loader from "../../Shared Components/Loader/Loader";

const TrackingOrder = () => {
  const [tranId, setTranId] = useState("");
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(false);
  const axiosSecure = useAxiosSecure();

  const handleTrack = () => {
    if (!tranId) return toast.error("Please enter a Transaction ID");

    setLoading(true);
    axiosSecure
      .get(`/orders/track/${tranId}`)
      .then((res) => {
        setOrder(res.data);
        toast.success("Order Found!");
        setLoading(false);
      })
      .catch((err) => {
        toast.error("Order not found or Invalid ID");
        setLoading(false);
      });
  };

  const statusSteps = [
    "Pending",
    "Accepted",
    "Processing",
    "On the Way",
    "Delivered",
  ];
  const currentStatusIndex = statusSteps.indexOf(order?.status || "Pending");

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <AnimatePresence mode="wait">
          {!order ? (
            /* --- Search Section --- */
            <motion.div
              key="search"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="bg-white p-8 rounded-2xl shadow-sm border text-center"
            >
              <h2 className="text-3xl font-bold text-gray-800 mb-2">
                Track Your Order
              </h2>
              <p className="text-gray-500 mb-8">
                Enter your transaction ID to see the current status of your
                delivery.
              </p>

              <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
                <input
                  type="text"
                  placeholder="Enter Transaction ID (e.g. 69bd84...)"
                  className="input input-bordered w-full max-w-md focus:outline-none focus:border-green-500"
                  onChange={(e) => setTranId(e.target.value)}
                />
                <button
                  onClick={handleTrack}
                  disabled={loading}
                  className="bg-[#059669] text-white py-2 rounded-lg font-semibold hover:bg-[#047857] transition-all flex items-center gap-2 px-8"
                >
                  {loading ? Loader : "Track Order"}
                </button>
              </div>
            </motion.div>
          ) : (
            /* --- Order Detail Section --- */
            <motion.div
              key="details"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="space-y-6"
            >
              <button
                onClick={() => setOrder(null)}
                className="bg-[#059669] text-white py-2 rounded-lg font-semibold hover:bg-[#047857] transition-all flex items-center gap-2 px-8"
              >
                ← Back to search
              </button>

              {/* Status Stepper Card */}
              <div className="bg-white p-8 rounded-2xl shadow-sm border">
                <div className="flex justify-between items-center mb-10">
                  <div>
                    <h3 className="text-lg font-bold">Order Status</h3>
                    <p className="text-sm text-gray-400">
                      Order ID: #{order.transactionId.slice(-8).toUpperCase()}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium">Estimated Delivery</p>
                    <p className="text-green-600 font-bold">24-48 Hours</p>
                  </div>
                </div>

                {/* Stepper Logic */}
                <div className="relative flex justify-between">
                  {statusSteps.map((step, index) => (
                    <div
                      key={step}
                      className="flex flex-col items-center z-10 w-full text-center"
                    >
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 transition-colors duration-500 ${index <= currentStatusIndex ? "bg-green-600 text-white" : "bg-gray-200 text-gray-400"}`}
                      >
                        {index <= currentStatusIndex ? (
                          <CheckCircle size={20} />
                        ) : (
                          <Clock size={20} />
                        )}
                      </div>
                      <p
                        className={`text-xs font-bold ${index <= currentStatusIndex ? "text-gray-800" : "text-gray-400"}`}
                      >
                        {step}
                      </p>
                    </div>
                  ))}
                  {/* Connecting Line */}
                  <div className="absolute top-5 left-0 w-full h-1 bg-gray-100 z-0">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{
                        width: `${(currentStatusIndex / (statusSteps.length - 1)) * 100}%`,
                      }}
                      className="h-full bg-green-600"
                    />
                  </div>
                </div>
              </div>

              {/* Order Products & Summary */}
              <div className="grid md:grid-cols-3 gap-6">
                <div className="md:col-span-2 bg-white p-6 rounded-2xl border shadow-sm">
                  <h4 className="font-bold mb-4 flex items-center gap-2">
                    <Package size={18} /> Products
                  </h4>
                  <div className="divide-y">
                    {order.cartItems?.map((item, idx) => (
                      <div
                        key={idx}
                        className="py-4 flex items-center justify-between"
                      >
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-gray-100 rounded-lg overflow-hidden flex items-center justify-center">
                            {item.image ? (
                              <img
                                src={item.image}
                                alt={item.name}
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <span className="text-xs">No IMG</span>
                            )}
                          </div>
                          <div>
                            <p className="font-medium text-sm">
                              {item.name || "Product"}
                            </p>
                            <p className="text-xs text-gray-400">
                              Quantity: {item.quantity}
                            </p>
                          </div>
                        </div>
                        <p className="text-sm font-bold">{item.price} BDT</p>
                      </div>
                    )) || (
                      <p className="text-gray-400 text-sm italic">
                        Items details will be shown here.
                      </p>
                    )}
                  </div>
                </div>

                <div className="bg-white p-6 rounded-2xl border shadow-sm h-fit">
                  <h4 className="font-bold mb-4 flex items-center gap-2">
                    <MapPin size={18} /> Delivery Info
                  </h4>
                  <div className="text-sm space-y-2 text-gray-600">
                    <p>
                      <span className="font-bold text-gray-800">Address:</span>{" "}
                      {order.address}
                    </p>
                    <p>
                      <span className="font-bold text-gray-800">Area:</span>{" "}
                      {order.area}, {order.district}
                    </p>
                    <p>
                      <span className="font-bold text-gray-800">Phone:</span>{" "}
                      {order.phone}
                    </p>
                    <hr className="my-4" />
                    <div className="flex justify-between text-lg font-bold text-gray-800 pt-2">
                      <span>Total:</span>
                      <span>{order.totalAmount} BDT</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default TrackingOrder;
