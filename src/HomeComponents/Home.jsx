import React, { Suspense, lazy } from 'react';
import Loader from '../Shared Components/Loader/Loader';

const Banner = lazy(() => import('./Banner'));
const Categories = lazy(() => import('./Categories'));
const DiscountCard = lazy(() => import('./DiscountCard'));
const FeaturedProduct = lazy(() => import('./featuredProduct'));
const SummerDiscount = lazy(() => import('./SummerDiscount'));
const Weekly = lazy(() => import('./Weekly'));
const Testimonials = lazy(() => import('./Testimonials'));
const Blogs = lazy(() => import('./blogs'));
const FAQ = lazy(() => import('./faq'));
const Newsletter = lazy(() => import('./newsLetter'));

const Home = () => {
    return (
        
        <Suspense fallback={<Loader />}>
            <div>
                <Banner />
                <Categories />
                <DiscountCard />
                <FeaturedProduct />
                <SummerDiscount />
                <Weekly />
                <Testimonials />
                <Blogs />
                <FAQ />
                <Newsletter />
            </div>
        </Suspense>
    );
};

export default Home;