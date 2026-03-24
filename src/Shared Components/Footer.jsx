import React from 'react';
import FooterLogo from './Logo/FooterLogo';
import { FaFacebookF, FaGithub, FaLinkedinIn, FaGlobe } from 'react-icons/fa'; // আইকন ইমপোর্ট

const Footer = () => {
    const socialLinks = [
        { name: 'Facebook', icon: <FaFacebookF />, url: 'https://myportfolio-ea142.web.app/' },
        { name: 'GitHub', icon: <FaGithub />, url: 'https://myportfolio-ea142.web.app/' },
        { name: 'LinkedIn', icon: <FaLinkedinIn />, url: 'https://myportfolio-ea142.web.app/' },
        { name: 'Website', icon: <FaGlobe />, url: 'https://myportfolio-ea142.web.app/' },
    ];

    return (
        <footer className="bg-white border-t border-gray-200 py-12 font-sans">
            <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
                {/* 1. Brand Section */}
                <div className="col-span-1">
                    <div className="mb-4">
                        <FooterLogo />
                    </div>
                    <p className="text-gray-600 text-sm mb-6">
                        ShopNest is your smart grocery partner, bringing fresh quality products directly to your doorstep.
                    </p>
                    {/* Social Media Icons */}
                    <div className="flex items-center gap-3">
                        {socialLinks.map((social, index) => (
                            <a 
                                key={index}
                                href={social.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-[#059669] hover:text-white transition-all duration-300"
                                title={social.name}
                            >
                                {social.icon}
                            </a>
                        ))}
                    </div>
                </div>

                {/* 2. Shop Categories */}
                <div>
                    <h4 className="font-bold text-gray-900 mb-4">Shop</h4>
                    <ul className="text-gray-600 space-y-2 text-sm">
                        <li className="hover:text-[#059669] cursor-pointer transition">Fruits</li>
                        <li className="hover:text-[#059669] cursor-pointer transition">Vegetables</li>
                        <li className="hover:text-[#059669] cursor-pointer transition">Beverages</li>
                        <li className="hover:text-[#059669] cursor-pointer transition">Dairy & Eggs</li>
                    </ul>
                </div>

                {/* 3. Support Links */}
                <div>
                    <h4 className="font-bold text-gray-900 mb-4">Support</h4>
                    <ul className="text-gray-600 space-y-2 text-sm">
                        <li className="hover:text-[#059669] cursor-pointer transition">Help Center</li>
                        <li className="hover:text-[#059669] cursor-pointer transition">Track Order</li>
                        <li className="hover:text-[#059669] cursor-pointer transition">Privacy Policy</li>
                        <li className="hover:text-[#059669] cursor-pointer transition">Terms & Conditions</li>
                    </ul>
                </div>

                {/* 4. Contact Section */}
                <div>
                    <h4 className="font-bold text-gray-900 mb-4">Contact Us</h4>
                    <p className="text-gray-600 text-sm">CTG, Bangladesh</p>
                    <p className="text-gray-600 text-sm mt-2 font-medium">Email: <span className="hover:text-[#059669] cursor-pointer">support@shopnest.com</span></p>
                    <p className="text-gray-600 text-sm">Phone: <span className="hover:text-[#059669] cursor-pointer">+880 1960551472</span></p>
                </div>
            </div>

            {/* Copyright Section */}
            <div className="container mx-auto px-4 mt-8 pt-8 border-t border-gray-100 text-center">
                <p className="text-gray-500 text-xs">
                    © 2026 <span className="font-bold text-[#059669]">ShopNest</span>. All rights reserved. Built by <a href="https://myportfolio-ea142.web.app/" className="underline hover:text-green-700">Muntasir Mahmud</a>
                </p>
            </div>
        </footer>
    );
};

export default Footer;