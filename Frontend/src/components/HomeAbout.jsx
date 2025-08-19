import React from 'react'
import aboutMid from "../assets/about-mid.png";
import { Link } from 'react-router-dom';

const HomeAbout = () => {
    return (
        <div className="w-full flex flex-col items-center justify-center mt-14 px-6">

            <div className=' w-full max-w-6xl flex flex-col md:flex-row items-center justify-center gap-10 px-6 py-20'>
                <div className='w-full max-w-6xl flex flex-col md:flex-row items-center'>
                    <div className='md:w-1/2 flex flex-col items-center md:items-start text-center md:text-left'>
                        <h2 className='font-bold text-3xl sm:text-4xl md:text-5xl text-[#000000]'>About Us</h2>
                        <p className='mt-5 text-lg'>We provide skilled, semi-skilled, and general workforce solutions tailored to your industry needs. From temporary staffing to permanent placements, our reliable manpower ensures smooth operations and business growth. Whether you need temporary, contract-based, or permanent staffing, we provide tailored manpower solutions to ensure efficiency and success.</p>
                        <Link to={'/about'}>
                            <button className='bg-[#6E42E5] mt-6 w-[200px] hover:bg-[#6E42E5] cursor-pointer p-3 rounded-xl text-white font-bold'>Read More</button>
                        </Link>
                    </div>
                    <div className='md:w-1/2 flex justify-center rounded-xl'>
                        <img src={aboutMid} alt='About Us' className='p-10 w-full max-w-sm mt-4 rounded-xl md:max-w-full h-auto' />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HomeAbout