import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import useAxiosPublic from '../Hooks/useAxiosPublic';

const Testimonials = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const axiosPublic = useAxiosPublic();

  useEffect(() => {
    axiosPublic.get('/testimonials')
      .then(res => setTestimonials(res.data))
      .catch(error => console.error("Error fetching testimonials:", error));
  }, [axiosPublic]);

  // অটো-স্লাইড লজিক
  useEffect(() => {
    if (testimonials.length === 0) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [testimonials]);

  return (
    <div className="py-16 px-4 max-w-4xl mx-auto overflow-hidden">
      <div className="text-center mb-10">
        <p className="text-green-600 font-bold uppercase tracking-widest text-sm">Testimonials</p>
        <h2 className="text-4xl font-extrabold text-gray-900 mt-2">What Our Customers Say</h2>
      </div>

      <div className="relative h-[350px] flex justify-center items-center">
        <AnimatePresence mode="wait">
          {testimonials.length > 0 && (
            <motion.div
              key={testimonials[currentIndex]._id}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5 }}
              className="absolute w-full p-8 border rounded-3xl shadow-lg bg-white flex flex-col items-center text-center"
            >
              <img 
                src={testimonials[currentIndex].image} 
                alt={testimonials[currentIndex].name} 
                className="w-20 h-20 rounded-full border-4 border-yellow-400 mb-4" 
              />
              <p className="text-gray-600 text-base italic mb-4">"{testimonials[currentIndex].review}"</p>
              <div className="text-yellow-500 mb-2">★★★★★</div>
              <h3 className="font-bold text-lg">{testimonials[currentIndex].name}</h3>
              <p className="text-sm text-gray-500">{testimonials[currentIndex].role}</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Testimonials;