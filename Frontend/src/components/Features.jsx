import React from "react";
import electrician from "../assets/electrician.jpg";
import cleaner from "../assets/cleaner.jpg";
import mechanic from "../assets/mechanic.png";
import plumber from "../assets/plumber.jpg";
import { Link } from "react-router-dom";

const features = [
    { id: 1, img: electrician, title: "Skilled & Trained Workforce", description: "Access a pool of qualified professionals tailored to your industry needs." },
    { id: 2, img: cleaner, title: "Flexible Hiring Options", description: "Temporary, permanent, and contract-based staffing to suit business demands." },
    { id: 3, img: plumber, title: "Industry-Specific Expertise", description: "Manpower solutions for construction, IT, healthcare, manufacturing, and more." },
    { id: 4, img: mechanic, title: "24/7 Support & Assistance", description: "Dedicated support to ensure smooth workforce management." },
    { id: 5, img: electrician, title: "Cost-Effective Solutions", description: "Reduce hiring costs while maintaining workforce quality and efficiency." },
    { id: 6, img: mechanic, title: "Compliance & Documentation", description: "We handle all legal formalities, background checks, and contracts." },
];

const Features = () => {
    return (
        <div className="w-full flex flex-col items-center justify-center mt-10 px-6">
            {/* Section Header */}
            <div className="w-full max-w-3xl text-center mb-12">
                <h1 className="text-4xl font-bold text-[#000000]">Features & Benefits</h1>
                <p className="text-lg text-gray-700 mt-4">
                    Our expertise in manpower solutions ensures efficiency, reliability, and industry-specific excellence.
                </p>
            </div>

            {/* Feature List with Two-Column Layout */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl w-full">
                {features.map((feature, index) => (
                    <div
                        key={feature.id}
                        className="relative flex flex-col p-6 bg-white shadow-md rounded-xl overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-xl border border-gray-200"
                    >
                        {/* Background Shape Effect */}
                        <div className="absolute top-0 left-0 w-full h-1 bg-[#000000] rounded-t-xl"></div>

                        {/* Image Wrapper */}
                        <div className="flex items-center justify-center w-14 h-14 bg-[#000000] rounded-full shadow-lg mx-auto">
                            <img src={feature.img} alt={feature.title} className="w-12 h-12 rounded-full object-cover" />
                        </div>

                        {/* Feature Title */}
                        <h2 className="mt-6 text-xl font-semibold text-[#176ABC] text-center">{feature.title}</h2>

                        {/* Feature Description */}
                        <p className="text-center text-gray-600 mt-2 text-sm leading-relaxed">{feature.description}</p>

                        {/* CTA Button */}
                        <Link to={'/blog'}>
                            <button className="mt-5 px-5 py-2 bg-[#6E42E5] text-white text-sm font-semibold rounded-full shadow-md transition-all duration-300 ease-in-out hover:bg-[#6E42E5] cursor-pointer mx-auto">
                                Learn More
                            </button></Link>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Features;
