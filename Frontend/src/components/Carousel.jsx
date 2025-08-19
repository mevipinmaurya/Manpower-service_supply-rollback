import React, { useState } from "react";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { FaStar } from "react-icons/fa";
import Avatar from 'react-avatar';


const reviews = [
    {
        id: 1, name: "Alice Johnson", rating: 5, review:
            "Exceptional security services! The guards are professional, punctual, and highly trained. They've significantly improved our workplace security."
    },
    { id: 2, name: "Mark Smith", rating: 4, review: "The housekeeping staff is amazing! They maintain our properties to the highest standards. Reliable and thorough service every time." },
    { id: 3, name: "Sarah Lee", rating: 5, review: "Their event security team is top-notch! Professional, courteous, and extremely efficient. Made our event management so much easier." },
    { id: 4, name: "David Brown", rating: 4, review: "The housekeeping staff is amazing! They maintain our properties to the highest standards. Reliable and thorough service every time." },
    {
        id: 5, name: "Emma Wilson", rating: 5, review:
            "Exceptional security services! The guards are professional, punctual, and highly trained. They've significantly improved our workplace security."
    },
    { id: 6, name: "James Anderson", rating: 4, review: "Their event security team is top-notch! Professional, courteous, and extremely efficient. Made our event management so much easier." }
];

const Carousel = () => {
    const [startIndex, setStartIndex] = useState(0);

    // Determine number of visible slides based on screen size
    const getVisibleSlides = () => {
        if (window.innerWidth >= 1024) return 3; // Large screens: Show 3 reviews
        if (window.innerWidth >= 640) return 2;  // Medium screens: Show 2 reviews
        return 1; // Small screens: Show 1 review
    };

    const [visibleSlides, setVisibleSlides] = useState(getVisibleSlides());

    // Update visible slides on window resize
    React.useEffect(() => {
        const handleResize = () => setVisibleSlides(getVisibleSlides());
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const nextSlide = () => {
        if (startIndex < reviews.length - visibleSlides) {
            setStartIndex(startIndex + 1);
        }
    };

    const prevSlide = () => {
        if (startIndex > 0) {
            setStartIndex(startIndex - 1);
        }
    };

    return (
        <div className='flex w-full flex-col mt-7 lg:mt-10 gap-4 justify-center items-center p-10 lg:p-16'>
            <h1 className='text-3xl lg:text-4xl font-bold text-[#000000] '>What our clients say</h1>
            <p className='text-lg mb-10 text-gray-700 text-center w-[90%] lg:w-[60%]'>Discover why businesses and homeowners trust our manpower services.</p>

            <div className="relative w-full max-w-6xl mx-auto mt-5 lg:mt-8 px-4">
                {/* Carousel Container */}
                <div className="overflow-hidden">
                    <div
                        className="flex transition-transform duration-300 ease-in-out"
                        style={{ transform: `translateX(-${(startIndex * 100) / visibleSlides}%)` }}
                    >
                        {reviews.map((review) => (
                            <div
                                key={review.id}
                                className="min-w-full sm:min-w-1/2 lg:min-w-1/3 flex flex-col items-center justify-center p-6 bg-white text-gray-800 shadow-lg rounded-lg mx-2"
                            >
                                <Avatar name={review.name} size="60" round={true} />
                                <p className="text-xl mt-4 font-semibold">{review.name}</p>
                                <div className="flex my-4">
                                    {[...Array(5)].map((_, i) => (
                                        <FaStar key={i} size={20} className={i < review.rating ? "text-yellow-500" : "text-gray-300"} />
                                    ))}
                                </div>
                                <p className="text-center text-gray-600 italic">{review.review}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Navigation Buttons */}
                <button
                    className="absolute left-0 top-1/2 -translate-y-1/2 bg-[#000000] text-white p-2 rounded-full cursor-pointer shadow-md hover:bg-[#000000]"
                    onClick={prevSlide}
                >
                    <ChevronLeft />
                </button>
                <button
                    className="absolute right-0 top-1/2 -translate-y-1/2 bg-[#000000] cursor-pointer text-white p-2 rounded-full shadow-md hover:bg-[#000000]"
                    onClick={nextSlide}
                >
                    <ChevronRight />
                </button>
            </div>
        </div>
    );
};

export default Carousel;
