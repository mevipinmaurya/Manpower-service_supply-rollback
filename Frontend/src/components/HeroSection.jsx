import React from 'react';
import electrician from "../assets/electrician.jpg";
import heroImage from "../assets/hero_Image.png";
import { Link } from 'react-router-dom';

const HeroSection = () => {
    return (
        <div className='flex flex-col md:flex-row w-full bg-white py-10 px-6 md:px-10 items-center h-auto md:h-[550px]'>
            {/* Left Section - Text Content */}
            <div className='md:w-[60%] w-full flex order-2 md:order-1 flex-col justify-center text-left p-4 md:p-8'>
                <h2 className='text-3xl sm:text-4xl md:text-6xl font-bold text-gray-800'>
                    Reliable, Professional <span className='text-[#6E42E5]'>Manpower</span> Services
                </h2>
                <p className='text-gray-600 mt-4 text-base sm:text-lg'>
                    We provide top-notch manpower solutions tailored to your business needs. Our experienced team ensures efficiency and reliability at every step, delivering exceptional results you can trust.
                </p>
                <Link to={"/services"}>
                    <button className='bg-[#6E42E5] cursor-pointer hover:bg-[#6E42E5] text-white font-semibold py-3 px-4 sm:py-4 sm:px-6 rounded-full w-[180px] sm:w-[200px] mt-6 text-xs sm:text-sm'>
                        Get Started
                    </button></Link>
            </div>

            {/* Right Section - Image Placeholder */}
            <div className='md:w-[40%] w-full order-1 md:order-2 flex relative h-[300px] sm:h-[400px] md:h-[500px] p-4 sm:p-5 mt-6 md:mt-0 justify-center md:justify-end'>
                <div className='w-[300px] sm:w-[340px] md:w-[400px] h-[280px] sm:h-[340px] md:h-[450px] rounded-2xl overflow-hidden'>
                    <img src={heroImage} alt="Electrician" className='w-full h-full object-cover' />
                </div>
            </div>
        </div>
    );
};

export default HeroSection;
