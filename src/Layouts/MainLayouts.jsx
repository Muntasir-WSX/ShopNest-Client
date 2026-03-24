import React from 'react';
import Navbar from '../Shared Components/NavBar';
import { Outlet } from 'react-router';
import Footer from '../Shared Components/Footer';
import { CartProvider } from '../Context/CartProvider';
import { WishlistProvider } from '../Context/WishlistProvider';

const MainLayouts = () => {
    return (
        <div>
         <CartProvider>
            <WishlistProvider>
                <Navbar></Navbar>
                <div className="min-h-screen">
                    <Outlet />
                </div>
               <Footer></Footer>
            </WishlistProvider>
        </CartProvider>
        </div>
    );
};

export default MainLayouts;