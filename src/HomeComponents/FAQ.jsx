import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react'; 

const faqData = [
  { question: "How do I ensure the freshness of the products?", answer: "At ShopNest, we source our produce directly from local farms. Our quality control team inspects every item for freshness before it is packed and dispatched to your doorstep." },
  { question: "What is your delivery timeframe?", answer: "We offer same-day delivery for orders placed before 12:00 PM. For orders placed after that, your groceries will be delivered the following morning." },
  { question: "Can I track my order in real-time?", answer: "Yes! Once your order is out for delivery, you will receive a notification with a tracking link in our app where you can see the delivery agent's location." },
  { question: "What if I receive a damaged or wrong product?", answer: "We have a hassle-free return policy. If you receive a damaged or incorrect item, please notify our customer support via the app within 2 hours of delivery for an instant replacement or refund." },
  { question: "Is there a minimum order value for free delivery?", answer: "Yes, we offer free delivery on all orders above 500 BDT. For orders below this amount, a small delivery charge of 30 BDT is applied." }
];

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(0); 

  return (
    <section className="py-20 rounded-3xl bg-[#FFC933]">
      <div className="max-w-3xl mx-auto px-6">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h4 className="text-Black font-bold uppercase tracking-widest text-sm mb-2">Support Center</h4>
          <h2 className="text-4xl font-extrabold text-gray-900">Need Help? We've Got You Covered</h2>
          <p className="text-gray-500 mt-4">Find quick answers to common questions about ShopNest services.</p>
        </div>

        {/* FAQ Cards */}
        <div className="space-y-4">
          {faqData.map((item, index) => (
            <div 
              key={index} 
              className={`bg-white rounded-2xl border transition-all duration-300 ${activeIndex === index ? 'border-green-500 shadow-lg' : 'border-gray-200 shadow-sm'}`}
            >
              <button
                onClick={() => setActiveIndex(index)}
                className="w-full text-left p-6 flex justify-between items-center"
              >
                <span className={`font-bold text-lg ${activeIndex === index ? 'text-green-700' : 'text-gray-800'}`}>
                  {item.question}
                </span>
                <ChevronDown className={`w-6 h-6 transition-transform ${activeIndex === index ? 'rotate-180 text-green-600' : 'text-gray-400'}`} />
              </button>
              
              {activeIndex === index && (
                <div className="px-6 pb-6 pt-0 text-gray-600 leading-relaxed animate-in fade-in duration-500">
                  {item.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;