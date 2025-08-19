import React from 'react';
import bannerImage from '../assets/preview.webp';
import { Link } from 'react-router-dom';

const HomeBanner = () => {
    return (
        <div className="w-full flex justify-center items-center mt-10 mb-10">
            <div
                className="w-full h-[350px] bg-fixed bg-cover bg-center relative"
                style={{ backgroundImage: `url(${bannerImage})` }}
            >
                <div className="absolute inset-0 bg-black/80"></div> {/* Overlay for better readability */}
                <div className="relative z-10 gap-3 text-center text-white flex flex-col items-center justify-center h-full">
                    <h1 className="text-4xl md:text-5xl font-bold">Need Custom <span className='text-[#6E42E5]'>Manpower</span> Solutions?</h1>
                    <p className="text-md mt-2">We offer tailored services to meet your specific requirements.</p>
                    <Link to={"/services"}>
                        <button className="mt-4 px-6 py-3 bg-white text-[#000000] font-semibold rounded-full shadow-md hover:bg-gray-200 transition-all cursor-pointer">
                            Request a Quote
                        </button>
                    </Link>
                </div>
            </div>

        </div>
    );
};

export default HomeBanner;
