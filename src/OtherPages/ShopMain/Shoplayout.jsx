import React, { useState } from 'react';
import SideBar from './SideBar';
import ShopMain from './ShopMain'; 
import Branding from '../../Shared Components/Branding/Branding';
import { motion } from 'framer-motion'; 
import ProductChatBot from './ProductChatBot';

const ShopLayout = () => {
    const [filters, setFilters] = useState({
        category: 'All',
        priceRange: 2000,
        sortBy: 'newest'
    });
    const fadeInUp = {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.5, ease: "easeOut" }
    };

    const testProduct = {
    name: "Fresh Broccoli",
    price: 300,
    origin: "Bogura, BD",
    desc: "Crispy and nutrient-rich organic broccoli harvested daily."
};

    return (
        <div className="bg-gray-50/50 min-h-screen">
            <div className="container mx-auto px-4 py-8">
                <div className="flex flex-col lg:flex-row gap-8">
                    <motion.aside 
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5 }}
                        className="lg:w-1/4 w-full"
                    >
                        <div className="lg:sticky lg:top-24 self-start">
                            <SideBar filters={filters} setFilters={setFilters} />
                        </div>
                    </motion.aside>
                    <motion.main 
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="lg:w-3/4 w-full"
                    >
                        <ShopMain filters={filters} setFilters={setFilters} />
                    </motion.main>
                </div>
            </div>

          
            <div className="container mx-auto px-4 pb-16">
                <motion.div 
                    initial="initial"
                    whileInView="animate" 
                    viewport={{ once: true }}
                    variants={fadeInUp}
                    className="border-t border-gray-200 pt-16"
                >
                    <Branding />
                </motion.div>
            </div>
            <ProductChatBot product={testProduct} />
        </div>
    );
};

export default ShopLayout;