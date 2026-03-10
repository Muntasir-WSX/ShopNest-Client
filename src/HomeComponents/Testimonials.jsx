import React, { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import useAxiosPublic from '../Hooks/useAxiosPublic';

const Testimonials = () => {
  const [testimonials, setTestimonials] = useState([]);
  const axiosPublic = useAxiosPublic(); 

  useEffect(() => {
    axiosPublic.get('/testimonials')
      .then(res => setTestimonials(res.data))
      .catch(error => console.error("Error fetching testimonials:", error));
  }, [axiosPublic]);

  return (
    <div className="py-16 px-4 max-w-6xl mx-auto">
      <div className="text-center mb-10">
        <p className="text-green-600 font-bold uppercase tracking-widest text-sm">Testimonials</p>
        <h2 className="text-4xl font-extrabold text-gray-900 mt-2">Testimonials from Our Loyal Customers</h2>
      </div>

      <Swiper
        modules={[Navigation, Autoplay]}
        spaceBetween={30}
        slidesPerView={1}
        loop={true}
        autoplay={{ delay: 3000 }}
        navigation={true}
        breakpoints={{
          768: { slidesPerView: 3 }, 
        }}
        className="mySwiper"
      >
        {testimonials.map(item => (
          <SwiperSlide key={item._id}>
            <div className="flex flex-col items-center text-center p-6 border rounded-3xl shadow-sm hover:shadow-xl transition-all">
              <img 
                src={item.image} 
                alt={item.name} 
                className="w-20 h-20 rounded-full border-4 border-yellow-400 mb-4" 
              />
              <p className="text-gray-600 text-sm italic mb-4 h-24 overflow-hidden">"{item.review}"</p>
              <div className="text-yellow-500 mb-2">★★★★★</div>
              <h3 className="font-bold text-lg">{item.name}</h3>
              <p className="text-sm text-gray-500">{item.role}</p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Testimonials;