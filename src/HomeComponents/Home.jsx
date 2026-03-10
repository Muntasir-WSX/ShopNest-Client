import React from 'react';
import Banner from './Banner';
import Categories from './Categories';
import DiscountCard from './DiscountCard';
import SummerDiscount from './SummerDiscount';

const Home = () => {
    return (
        <div>
            {/* banner */}
            <Banner></Banner>
            {/* Categories Section */}
            <Categories></Categories>
            {/* discount 2 card */}
            <DiscountCard></DiscountCard>
            {/* products */}
            {/* need to come from backend */}

            {/* summer discount (timer) */}

            <SummerDiscount></SummerDiscount>
           
            {/* offers */}
            {/* best selleing products */}
             {/* testimonials */}
            {/* blogs  */}
            {/* faq */}
            {/* newsletter */}
                
        </div>
    );
};

export default Home;