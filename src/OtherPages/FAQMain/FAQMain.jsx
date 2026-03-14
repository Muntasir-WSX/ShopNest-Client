import React from 'react';
import FaqBanner from './FaqBanner';
import FAQ from '../../HomeComponents/FAQ';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// ম্যাপ মার্কোরের ডিফল্ট আইকন ঠিক করার জন্য
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import Branding from '../../Shared Components/Branding/Branding';
import Newsletter from '../../HomeComponents/newsLetter';
let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41]
});
L.Marker.prototype.options.icon = DefaultIcon;

const FAQMain = () => {
    const position = [22.3569, 91.7832]; 

    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            <FaqBanner />
            
            <div className="my-10">
                <FAQ />
            </div>
            <div className="py-10">
                <h2 className="text-3xl font-bold mb-6 text-center text-gray-900">Visit Our Office</h2>
                <div className="h-[400px] w-full rounded-2xl overflow-hidden shadow-xl border border-gray-100">
                    <MapContainer center={position} zoom={14} className="h-full w-full">
                        <TileLayer
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        />
                        <Marker position={position}>
                            <Popup>
                                ShopNest HQ, Chattogram
                            </Popup>
                        </Marker>
                    </MapContainer>
                </div>
            </div>
            <div className='py-10'>
                <Branding></Branding>
            </div>
            <div className='py-10'>
                <Newsletter></Newsletter>
            </div>
        </div>
    );
};

export default FAQMain;