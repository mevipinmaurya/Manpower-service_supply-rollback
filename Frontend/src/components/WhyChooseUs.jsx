import React from 'react'
import { GrUserManager } from "react-icons/gr";
import { IoIosCheckmarkCircleOutline } from "react-icons/io";
import { LuClock4 } from "react-icons/lu";
import { IoShieldHalfOutline } from "react-icons/io5";
import { FaStar } from "react-icons/fa";
import { FaHeadphonesAlt } from "react-icons/fa";



const WhyChooseUs = () => {
    return (
        <div className='flex w-full flex-col mt-20 bg-black gap-4 justify-center items-center p-16'>
            <h1 className='text-3xl lg:text-4xl font-bold text-white'>Why Choose Us ?</h1>
            <p className='text-sm md:text-md lg:text-lg mb-10 text-gray-300 text-center w-[90%] lg:w-[60%]'>Experience the difference with our comprehensive manpower solutions backed by years of expertise and professional excellence.</p>

            <div className='w-full max-w-6xl grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-8'>
                <div className='flex flex-col bg-gray-700 shadow rounded-xl hover:bg-gray-600 hover:scale-105 p-6'>
                    <div className='rounded-full p-1 flex md:block justify-center items-center'>
                        <GrUserManager size={60} className='bg-[#6E42E5] text-white p-2 rounded-full' />
                    </div>
                    <h2 className='mt-4 text-xl text-white font-bold'>Experienced Staff</h2>
                    <p className='text-md text-gray-300 mt-4'>Highly trained and vetted professionals with years of industry experience.</p>
                    <p className='flex items-center gap-1 text-sm lg:text-lg mt-5 text-white'> <IoIosCheckmarkCircleOutline className='text-yellow-600  text-2xl font-bold' /> Rigorous Background Checks</p>
                    <p className='flex items-center gap-1 text-sm lg:text-lg text-white'> <IoIosCheckmarkCircleOutline className='text-yellow-600  text-2xl font-bold' /> Regular Training Programs</p>
                </div>

                <div className='flex flex-col bg-gray-700 hover:bg-gray-600  shadow rounded-xl hover:scale-105 p-6'>
                    <div className='rounded-full p-1 flex md:block justify-center items-center'>
                        <LuClock4 size={60} className='bg-[#6E42E5] text-white p-2 rounded-full' />
                    </div>
                    <h2 className='mt-4 text-xl text-white font-bold'>24/7 Availability</h2>
                    <p className='text-md text-gray-300 mt-4'>Round-the-clock service with immediate response to your requirements.</p>
                    <p className='flex items-center gap-1 text-sm lg:text-lg mt-5 text-white'> <IoIosCheckmarkCircleOutline className='text-yellow-600 text-2xl font-bold' />Emergency Response</p>
                    <p className='flex items-center gap-1 text-sm lg:text-lg text-white'> <IoIosCheckmarkCircleOutline className='text-yellow-600 text-2xl font-bold' />Flexible Scheduling</p>
                </div>


                <div className='flex flex-col bg-gray-700 hover:bg-gray-600  shadow rounded-xl hover:scale-105 p-6'>
                    <div className='rounded-full p-1 flex md:block justify-center items-center'>
                        <IoShieldHalfOutline size={60} className='bg-[#6E42E5] text-white p-2 rounded-full' />
                    </div>
                    <h2 className='mt-4 text-xl text-white font-bold'>Fully Insured</h2>
                    <p className='text-md text-gray-300 mt-4'>Complete coverage and liability protection for your peace of mind.</p>
                    <p className='flex items-center gap-1 text-sm lg:text-lg mt-5 text-white'> <IoIosCheckmarkCircleOutline className='text-yellow-600  text-2xl font-bold' />Liability Coverage</p>
                    <p className='flex items-center gap-1 text-sm lg:text-lg text-white'> <IoIosCheckmarkCircleOutline className='text-yellow-600  text-2xl font-bold' />Worker's Compensation</p>
                </div>
            </div>



            <div className='w-full max-w-6xl grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 mt-10 gap-8'>
                <div className='flex flex-col hover:bg-gray-600  bg-gray-700 shadow rounded-xl hover:scale-105 p-6 gap-2 lg:gap-0'>
                    <h2 className='mt-4 text-xl text-white font-bold'>Quality Assurance</h2>
                    <p className='flex items-center gap-1 text-sm lg:text-lg mt-5 text-white'> <FaStar className='text-yellow-600  text-xl font-bold' /> 
                    Regular Performance Monitoring</p>
                    <p className='flex items-center gap-1 text-sm lg:text-lg text-white'> <FaStar className='text-yellow-600  text-xl font-bold' /> Client Feedback Integration</p>
                    <p className='flex items-center gap-1 text-sm lg:text-lg text-white'> <FaStar className='text-yellow-600  text-xl font-bold' /> 
                    Continuous Improvement Program</p>
                </div>

                <div className='flex flex-col bg-gray-700 hover:bg-gray-600  shadow rounded-xl hover:scale-105 p-6 gap-2 lg:gap-0'>
                    <h2 className='mt-4 text-xl text-white font-bold'>Customer Support</h2>
                    <p className='flex items-center gap-1 text-sm lg:text-lg mt-5 text-white'> <FaHeadphonesAlt className='text-yellow-600 text-xl lg:text-xl font-bold' />Dedicated Account Manager</p>
                    <p className='flex items-center gap-1 text-sm lg:text-lg text-white'> <FaHeadphonesAlt className='text-yellow-600 text-xl lg:text-xl font-bold' />
                    Quick Query Resolution</p>
                    <p className='flex items-center gap-1 text-sm lg:text-lg text-white'> <FaHeadphonesAlt className='text-yellow-600 text-xl lg:text-xl font-bold' />
                    Regular Service Updates</p>
                </div>

            </div>
        </div>
    )
}

export default WhyChooseUs