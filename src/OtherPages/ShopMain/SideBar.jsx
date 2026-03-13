import React from 'react';

const SideBar = ({ filters, setFilters }) => {
    const categories = ["All", "Vegetables", "Fresh Fruits", "Milk & Eggs", "Bakery", "House Hold", "Dry Fruits", "Beverages", "Meat & Fish"];

    const handleClearFilters = () => {
        if (typeof setFilters === 'function') {
            setFilters({
                category: 'All',
                sortBy: 'newest'
            });
        }
    };

    return (
        <aside className="w-full space-y-8">
            {/* Category Filter Section */}
            <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
                <div className="flex justify-between items-center mb-5 pb-2 border-b-2 border-yellow-400">
                    <h3 className="text-lg font-bold text-gray-800 tracking-tight">Category</h3>
                    <button 
                        onClick={handleClearFilters}
                        className="text-[10px] font-bold text-[#059669] hover:text-green-700 hover:underline transition-colors uppercase tracking-wider"
                    >
                        Clear
                    </button>
                </div>
                
                <ul className="space-y-3">
                    {categories.map(cat => (
                        <li key={cat} className="flex items-center gap-3 group">
                            <input 
                                type="radio" 
                                name="category"
                                id={cat}
                                checked={filters?.category === cat}
                                onChange={() => setFilters?.({ ...filters, category: cat })}
                                className="w-4 h-4 accent-[#059669] cursor-pointer" 
                            />
                            <label 
                                htmlFor={cat}
                                className={`text-sm font-semibold cursor-pointer transition-all duration-200 ${
                                    filters?.category === cat ? 'text-[#059669]' : 'text-gray-600'
                                } group-hover:text-[#059669] group-hover:translate-x-1`}
                            >
                                {cat}
                            </label>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Banner Section - Gradient & Spacing Fixed */}
            <div className="relative overflow-hidden bg-linear-to-br from-[#059669] to-green-900 rounded-2xl p-7 text-white group cursor-default">
                {/* Background Decorative Element */}
                <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-white/10 rounded-full blur-2xl group-hover:bg-white/20 transition-all duration-500"></div>
                
                <div className="relative z-10">
                    <h4 className="text-xl font-black mb-2 leading-tight">
                        Organic <br/> 
                        <span className="text-yellow-400">Healthy</span> Food
                    </h4>
                    
                    <p className="text-[10px] text-gray-100 font-bold uppercase tracking-[0.2em] mb-5">
                        Up to 25% Off
                    </p>
                    
                    <div className="inline-block">
                        <span className="bg-yellow-400 text-gray-900 px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest shadow-lg shadow-yellow-900/20 animate-pulse">
                            Limited Stock Left!
                        </span>
                    </div>
                </div>
            </div>
        </aside>
    );
};

export default SideBar;