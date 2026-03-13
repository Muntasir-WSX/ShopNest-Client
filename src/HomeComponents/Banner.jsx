import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, EffectFade } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';
import { Link } from 'react-router';

const slides = [
  { id: 1, title: "Fresh Vegetables", img: "https://res.cloudinary.com/dnk0bvpym/image/upload/v1773090765/carousole1_b5n5oc.jpg", desc: "Farm-fresh greens at your doorstep." },
  { id: 2, title: "Healthy Veggie Covers", img: "https://res.cloudinary.com/dnk0bvpym/image/upload/v1773090765/carousole_2_mx4g9q.jpg", desc: "Top quality hand-picked veggies." },
  { id: 3, title: "Organic Goodness", img: "https://res.cloudinary.com/dnk0bvpym/image/upload/v1773091675/5_szkesx.jpg", desc: "Pure, organic produce for a healthier you." },
];

const Banner = () => {
  return (
    <div className="w-full h-[350px] md:h-[450px] lg:h-[500px] overflow-hidden shadow-2xl relative group">
      <Swiper
        modules={[Autoplay, Pagination, EffectFade]}
        effect="fade"
        loop={true}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        pagination={{ 
          clickable: true,
          bulletClass: "swiper-pagination-bullet !w-2 !h-2 md:!w-3 md:!h-3 !bg-white !opacity-60",
          bulletActiveClass: "!opacity-100 !bg-[#ffe70b] !w-6 md:!w-8 !rounded-full transition-all"
        }}
        className="h-full w-full"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div 
              className="h-full w-full bg-cover bg-center flex items-center relative"
              style={{ backgroundImage: `url(${slide.img})` }}
            >
              <div className="absolute inset-0 bg-linear-to-r from-black/90 via-black/40 to-black/20 md:via-black/30 md:to-transparent" />
              <div className="relative z-10 px-6 md:px-12 lg:px-16 max-w-full md:max-w-2xl text-left">
                <span className="text-[#ffe70b] font-bold tracking-widest uppercase text-xs md:text-sm mb-2 block">
                  100% Organic
                </span>
                <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-extrabold text-white mb-4 md:mb-6 leading-tight drop-shadow-lg">
                  {slide.title}
                </h1>
                <p className="text-sm md:text-lg lg:text-xl text-gray-200 mb-6 md:mb-8 font-light italic line-clamp-2 md:line-clamp-none">
                  {slide.desc}
                </p>
                <div className="flex flex-wrap items-center gap-4 md:gap-6">
                  <Link to="shop" className="px-5 py-2 md:px-8 md:py-3 bg-[#059669] hover:bg-[#047857] transition-all text-white rounded-lg font-bold flex items-center gap-2 text-sm md:text-base">
                    Shop Now →
                  </Link>
                  <Link to="shop" className="text-white font-semibold underline hover:text-[#ffe70b] text-xs md:text-sm">
                    View All Products
                  </Link>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Banner;