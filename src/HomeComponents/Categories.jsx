import React from 'react';
import { motion } from 'framer-motion';
import { GiCarrot, GiFruitBowl, GiMilkCarton, GiBreadSlice, GiShoppingBag, GiAlmond, GiWaterBottle } from 'react-icons/gi';

const categories = [
    { name: "Vegetables", products: "52 Products", icon: <GiCarrot /> },
    { name: "Fresh Fruits", products: "48 Products", icon: <GiFruitBowl /> },
    { name: "Milk & Eggs", products: "12 Products", icon: <GiMilkCarton /> },
    { name: "Bakery", products: "62 Products", icon: <GiBreadSlice /> },
    { name: "House Hold", products: "25 Products", icon: <GiShoppingBag /> },
    { name: "Dry Fruits", products: "8 Products", icon: <GiAlmond /> },
    { name: "Beverages", products: "20 Products", icon: <GiWaterBottle /> },
];

const Categories = () => {
    return (
        <div className="py-10 bg-white overflow-hidden">
            <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">Featured Categories</h2>
            
            <div className="flex overflow-hidden">
                <motion.div 
                    className="flex gap-8"
                    animate={{ x: ["0%", "-50%"] }} 
                    transition={{ duration: 20, ease: "linear", repeat: Infinity }}
                >
                    {[...categories, ...categories].map((item, index) => (
                        <div key={index} className="flex flex-col items-center min-w-[150px]">
                            <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center text-4xl text-green-600 shadow-sm border border-gray-100 hover:bg-green-50 transition-all cursor-pointer">
                                {item.icon}
                            </div>
                            <h3 className="mt-4 font-semibold text-gray-700">{item.name}</h3>
                            <p className="text-sm text-gray-400">{item.products}</p>
                        </div>
                    ))}
                </motion.div>
            </div>
        </div>
    );
};

export default Categories;