import React from 'react';
import Navbar from '../Shared Components/NavBar';
import { Outlet } from 'react-router';
import Footer from '../Shared Components/Footer';

const MainLayouts = () => {
    return (
        <div>
            <Navbar></Navbar>
            <Outlet></Outlet>
            <Footer></Footer>
        </div>
    );
};

export default MainLayouts;