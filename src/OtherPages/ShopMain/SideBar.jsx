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
            {/* Category Filter */}
            <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
                <div className="flex justify-between items-center mb-5 pb-2 border-b-2 border-yellow-400">
                    <h3 className="text-lg font-bold text-gray-800">Category</h3>
                    <button 
                        onClick={handleClearFilters}
                        className="text-[10px] font-bold text-[#059669] hover:underline uppercase"
                    >
                        Clear
                    </button>
                </div>
                <ul className="space-y-3">
                    {categories.map(cat => (
                        <li key={cat} className="flex items-center gap-3 group cursor-pointer">
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
                                className={`text-sm font-semibold cursor-pointer ${filters?.category === cat ? 'text-[#059669]' : 'text-gray-600'} group-hover:text-[#059669] transition-colors`}
                            >
                                {cat}
                            </label>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Banner */}
            <div className="bg-linear-to-br from-[#059669] to-green-800 rounded-2xl p-6 text-white overflow-hidden relative group">
                <div className="relative z-10">
                    <h4 className="text-xl font-black mb-2 leading-tight">Organic <br/> Healthy Food</h4>
                    <p className="text-[10px] text-yellow-400 font-bold uppercase tracking-widest mb-4">Up to 25% Off</p>
                    <span className="bg-yellow-400 text-gray-900 px-3 py-1 rounded-xl text-[10px] font-black uppercase tracking-widest shadow-sm">
  Limited Stock Left!
</span>
                </div>
            </div>
        </aside>
    );
};

export default SideBar;