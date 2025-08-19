import React from 'react';
import electrician from "../assets/electrician.jpg";
import cleaner from "../assets/cleaner.jpg";
import plumber from "../assets/plumber.jpg";
import mechanic from "../assets/mechanic.png";

const services = [
    { id: 1, img: electrician, title: "Electrician", description: "Expert electrical services for safe and efficient systems." },
    { id: 2, img: cleaner, title: "Cleaner", description: "High-quality cleaning solutions for a spotless environment." },
    { id: 3, img: mechanic, title: "Mechanic", description: "Professional auto repair and maintenance services." },
    { id: 4, img: plumber, title: "Plumber", description: "Reliable plumbing services for homes and businesses." },
];

const ServicesHome = () => {
    return (
        <div className="w-full flex flex-col items-center justify-center mt-10 px-6">
            {/* Section Title */}
            <div className="text-center max-w-3xl mb-10">
                <h1 className="text-4xl font-bold text-[#000000]">Our Services</h1>
                <p className="text-lg text-gray-700 mt-4">Expert manpower services tailored to your needs.</p>
            </div>

            {/* Services Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 w-full max-w-6xl">
                {services.map((service) => (
                    <div
                        key={service.id}
                        className="relative flex flex-col items-center bg-white shadow-md rounded-xl p-5 border border-gray-200 transition-all duration-300 hover:scale-105 hover:shadow-xl"
                    >
                        {/* Image */}
                        <div className="w-16 h-16 rounded-full overflow-hidden">
                            <img src={service.img} alt={service.title} className="w-full h-full object-cover" />
                        </div>

                        {/* Title */}
                        <h2 className="mt-3 text-lg font-semibold text-[#000000]">{service.title}</h2>

                        {/* Description */}
                        <p className="text-center text-gray-600 mt-2 text-sm leading-tight">{service.description}</p>

                        {/* Learn More Button */}
                        <button className="mt-4 px-4 py-2 text-sm bg-[#6E42E5] text-white rounded-full transition-all duration-300 hover:bg-[#6E42E5] cursor-pointer">
                            Learn More
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ServicesHome;
