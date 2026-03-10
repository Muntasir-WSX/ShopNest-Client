import React from 'react';
import Banner from './Banner';
import Categories from './Categories';
import DiscountCard from './DiscountCard';
import SummerDiscount from './SummerDiscount';
import Weekly from './Weekly';
import Testimonials from './Testimonials';
import Blogs from './blogs';
import FAQ from './faq';
import Newsletter from './newsLetter';

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
            {/* Weekly Deals */}
            <Weekly></Weekly>
            {/* best selleing products */}
             {/* testimonials */}
             <Testimonials></Testimonials>
            {/* blogs  */}
            <Blogs></Blogs>
            {/* faq */}
            <FAQ></FAQ>
            {/* newsletter */}
            <Newsletter></Newsletter>
                
        </div>
    );
};

export default Home;