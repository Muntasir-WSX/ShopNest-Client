import React from 'react';

const DiscountCard = () => {
  const cards = [
    {
      title: "Organic Daily Staples",
      discount: "Save up to 30%",
      desc: "Get your essential daily groceries delivered fresh and fast every morning.",
      bg: "bg-gradient-to-l from-green-100 to-white", 
      img: "https://res.cloudinary.com/dnk0bvpym/image/upload/v1773161683/frute1_pie8tf.jpg"
    },
    {
      title: "Premium Imported Treats",
      discount: "Flash Sale 15%",
      desc: "Indulge in our finest selection of exotic fruits and gourmet delicacies.",
      bg: "bg-[#FFC933]", 
      img: "https://res.cloudinary.com/dnk0bvpym/image/upload/v1773161683/frute2_mb5ysd.jpg"
    }
  ];

  return (
    <div className="flex flex-col md:flex-row gap-6 p-6">
      {cards.map((card, index) => (
        <div key={index} className={`${card.bg} flex-1 rounded-3xl p-8 flex items-center justify-between shadow-lg hover:shadow-2xl transition-shadow duration-300 border border-gray-100`}>
          <div className="max-w-[250px]">
            <span className="bg-white/80 text-green-800 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
              {card.discount}
            </span>
            <h2 className="text-3xl font-extrabold text-gray-900 mt-4 mb-2">{card.title}</h2>
            <p className="text-gray-600 mb-6">{card.desc}</p>
            <button className="bg-[#059669] text-white px-6 py-2 rounded-lg font-semibold hover:bg-[#047857] transition-all flex items-center gap-2">
              Shop Now →
            </button>
          </div>
          <div className="w-40 h-40">
            <img src={card.img} alt="product" className="w-full h-full object-cover rounded-full shadow-lg" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default DiscountCard;