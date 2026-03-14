import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Loader from '../Shared Components/Loader/Loader'; 
import Banner from './Banner';
import Categories from './Categories';
import DiscountCard from './DiscountCard';
import FeaturedProduct from './featuredProduct';
import SummerDiscount from './SummerDiscount';
import Weekly from './Weekly';
import Testimonials from './Testimonials';
import Blogs from './blogs';
import Newsletter from './newsLetter';
import FAQ from './FAQ';

const sectionVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.6, ease: "easeOut" } 
  }
};

const Home = () => {
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        const timer = setTimeout(() => setIsLoading(false), 1200); 
        return () => clearTimeout(timer);
    }, []);

    const sections = [
        Banner, Categories, DiscountCard, FeaturedProduct, 
        SummerDiscount, Weekly, Testimonials, Blogs, FAQ, Newsletter
    ];

    return (
        <div className="overflow-hidden">
            <AnimatePresence>
                {isLoading ? (
                    <motion.div
                        key="loader"
                        initial={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center bg-white"
                    >
                        <Loader />
                    </motion.div>
                ) : (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5 }}
                    >
                        {sections.map((Component, index) => (
                            <motion.div
                                key={index}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true, amount: 0.2 }}
                                variants={sectionVariants}
                            >
                                <Component />
                            </motion.div>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Home;