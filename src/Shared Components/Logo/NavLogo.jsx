import React from 'react';
import { Link } from 'react-router-dom';

const NavLogo = () => {
    
    const svgLogo = (
        <svg width="200" height="90" viewBox="0 0 500 350" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <linearGradient id="yellowGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style={{ stopColor: '#FBBF24', stopOpacity: 1 }} />
                    <stop offset="100%" style={{ stopColor: '#F59E0B', stopOpacity: 1 }} />
                </linearGradient>
            </defs>

            <g transform="translate(250, 100)">     
                <path d="M-45,-30 L45,-30 L55,40 C55,55 40,65 0,65 C-40,65 -55,55 -55,40 Z" fill="white" stroke="#FBBF24" strokeWidth="4" />
                <path d="M-25,-30 L-25,-45 C-25,-60 -15,-65 0,-65 C15,-65 25,-60 25,-45 L25,-30" fill="none" stroke="url(#yellowGrad)" strokeWidth="10" strokeLinecap="round"/>
                <path d="M-15,30 L-15,-5 L15,30 L15,-5" fill="none" stroke="#F59E0B" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round"/>
            </g>

            <text x="250" y="240" fontFamily="Arial, sans-serif" fontSize="48" fontWeight="900" textAnchor="middle">
                <tspan fill="white">Shop</tspan>
                <tspan fill="#F59E0B">Nest</tspan>
            </text>
            
            <text x="250" y="275" fontFamily="Arial, sans-serif" fontSize="16" fontWeight="600" textAnchor="middle" fill="white" letterSpacing="1">YOUR SMART GROCERY PARTNER</text>
        </svg>
    );

    return (
        <Link to="/" className="inline-block p-2">
            {svgLogo}
        </Link>
    );
};

export default NavLogo;