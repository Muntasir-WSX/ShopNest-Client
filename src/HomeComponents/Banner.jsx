import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, EffectFade } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';

const slides = [
  { id: 1, title: "Fresh Vegetables", img: "https://res.cloudinary.com/dnk0bvpym/image/upload/v1773090765/carousole1_b5n5oc.jpg", desc: "Farm-fresh greens at your doorstep." },
  { id: 2, title: "Healthy Veggie Covers", img: "https://res.cloudinary.com/dnk0bvpym/image/upload/v1773090765/carousole_2_mx4g9q.jpg", desc: "Top quality hand-picked veggies." },
  { id: 3, title: "Organic Goodness", img: "https://res.cloudinary.com/dnk0bvpym/image/upload/v1773091675/5_szkesx.jpg", desc: "Pure, organic produce for a healthier you." },
];

const Banner = () => {
  return (
    <div className="w-full h-[500px]  overflow-hidden shadow-2xl relative group">
      <Swiper
        modules={[Autoplay, Pagination, EffectFade]}
        effect="fade"
        loop={true}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        pagination={{ 
          clickable: true,
          bulletClass: "swiper-pagination-bullet !w-3 !h-3 !bg-white !opacity-60",
          bulletActiveClass: "!opacity-100 !bg-[#ffe70b] !w-8 !rounded-full transition-all"
        }}
        className="h-full w-full"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div 
              className="h-full w-full bg-cover bg-center flex items-center relative"
              style={{ backgroundImage: `url(${slide.img})` }}
            >
              <div className="absolute inset-0 bg-linear-to-r from-black/80 via-black/30 to-transparent" />
              
              <div className="relative z-10 px-16 max-w-2xl">
                <span className="text-[#ffe70b] font-bold tracking-widest uppercase text-sm mb-2 block">100% Organic</span>
                <h1 className="text-7xl font-extrabold text-white mb-6 leading-tight drop-shadow-lg">
                  {slide.title}
                </h1>
                <p className="text-xl text-gray-200 mb-8 font-light italic">{slide.desc}</p>
                
                <div className="flex items-center gap-6">
                  <button className="px-8 py-3 bg-[#059669] hover:bg-[#047857] transition-all text-white rounded-lg font-bold flex items-center gap-2">
                    Shop Now →
                  </button>
                  <a href="#" className="text-white font-semibold underline hover:text-[#ffe70b]">View All Products</a>
                </div>

                {/* rating */}
                {/* <div className="mt-8 flex items-center gap-4 text-white">
                  <div className="flex -space-x-3">
                    {[1,2,3,4].map((i) => (
                      <div key={i} className="w-10 h-10 rounded-full border-2 border-white bg-gray-300" />
                    ))}
                    <div className="w-10 h-10 rounded-full border-2 border-white bg-[#ffe70b] flex items-center justify-center font-bold text-gray-900">+</div>
                  </div>
                  <div>
                    <p className="font-bold">4.8 Ratings+</p>
                    <p className="text-sm text-gray-300">Trusted by 75k+ Customers</p>
                  </div>
                </div> */}
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Banner;