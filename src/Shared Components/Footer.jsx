import React from 'react';
import FooterLogo from './Logo/FooterLogo';

const Footer = () => {
    return (
        <footer className="bg-white border-t border-gray-200 py-12">
            <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
                <div className="col-span-1">
                    <div className="mb-4">
                       <FooterLogo></FooterLogo>
                    </div>
                    <p className="text-gray-600 text-sm">
                        ShopNest is your smart grocery partner, bringing fresh quality products directly to your doorstep.
                    </p>
                </div>
                <div>
                    <h4 className="font-bold text-gray-900 mb-4">Shop</h4>
                    <ul className="text-gray-600 space-y-2 text-sm">
                        <li>Fruits</li>
                        <li>Vegetables</li>
                        <li>Beverages</li>
                        <li>Dairy & Eggs</li>
                    </ul>
                </div>
                <div>
                    <h4 className="font-bold text-gray-900 mb-4">Support</h4>
                    <ul className="text-gray-600 space-y-2 text-sm">
                        <li>Help Center</li>
                        <li>Track Order</li>
                        <li>Privacy Policy</li>
                        <li>Terms & Conditions</li>
                    </ul>
                </div>
                <div>
                    <h4 className="font-bold text-gray-900 mb-4">Contact Us</h4>
                    <p className="text-gray-600 text-sm">CTG, Bangladesh</p>
                    <p className="text-gray-600 text-sm mt-2">Email: support@shopnest.com</p>
                    <p className="text-gray-600 text-sm">Phone: +880 1960551472</p>
                </div>
            </div>
            <div className="container mx-auto px-4 mt-8 pt-8 border-t border-gray-100 text-center text-gray-500 text-xs">
                © 2026 ShopNest. All rights reserved.
            </div>
        </footer>
    );
};

export default Footer;