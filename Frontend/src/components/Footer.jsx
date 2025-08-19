import React from "react";
import { FaFacebook, FaLinkedin, FaInstagramSquare, FaPhoneAlt } from "react-icons/fa";
import { FaSquareTwitter, FaLocationDot } from "react-icons/fa6";
import { IoMail } from "react-icons/io5";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="w-full bg-black">
      <div className="w-full text-white p-10 lg:p-16">
        {/* Responsive Container */}
        <div className="w-full mt-14 max-w-6xl mx-auto flex flex-col md:flex-row flex-wrap justify-between gap-5">

          {/* Company Info */}
          <div className="w-full md:w-1/4 space-y-3">
            <h1 className="text-2xl font-bold text-white">ManPower</h1>
            <p className="text-gray-300 text-lg leading-6">
              Professional security and housekeeping services for businesses and homes. Available 24/7 with trained and certified staff.
            </p>
            <div className="flex gap-3">
              <FaFacebook className="text-[#6E42E5] text-2xl cursor-pointer hover:scale-110 transition" />
              <FaLinkedin className="text-[#6E42E5] text-2xl cursor-pointer hover:scale-110 transition" />
              <FaSquareTwitter className="text-[#6E42E5] text-2xl cursor-pointer hover:scale-110 transition" />
              <FaInstagramSquare className="text-[#6E42E5] text-2xl cursor-pointer hover:scale-110 transition" />
            </div>
          </div>

          {/* Quick Links */}
          <div className="w-full md:w-1/5 space-y-2">
            <h1 className="text-2xl font-bold text-white">Quick Links</h1>
            <Link to={"/about"}><p className="text-gray-300 text-lg hover:text-white cursor-pointer">About Us</p></Link>
            <Link to={"/services"}><p className="text-gray-300 text-lg hover:text-white cursor-pointer">Our Services</p></Link>
            <Link to={"/blog"}><p className="text-gray-300 text-lg hover:text-white cursor-pointer">Blogs</p></Link>
            <Link to={"/contact"}><p className="text-gray-300 text-lg hover:text-white cursor-pointer">Contact Us</p></Link>
          </div>

          {/* Our Services */}
          <div className="w-full md:w-1/5 space-y-2">
            <h1 className="text-2xl font-bold text-white">Our Services</h1>
            <Link to={"/services"}><p className="text-gray-300 text-lg hover:text-white cursor-pointer">Cleaner</p></Link>
            <Link to={"/services"}><p className="text-gray-300 text-lg hover:text-white cursor-pointer">Electrician</p></Link>
            <Link to={"/services"}><p className="text-gray-300 text-lg hover:text-white cursor-pointer">Plumber</p></Link>
            <Link to={"/services"}><p className="text-gray-300 text-lg hover:text-white cursor-pointer">Mechanic</p></Link>
            <Link to={"/services"}><p className="text-gray-300 text-lg hover:text-white cursor-pointer">Therapist</p></Link>
          </div>

          {/* Contact Info */}
          <div className="w-full md:w-1/4 space-y-3">
            <h1 className="text-2xl font-bold text-white">Contact Us</h1>
            <p className="text-gray-300 text-lg flex items-center gap-3">
              <FaLocationDot className="text-[#6E42E5]" /> 123 Business Street, Suite 100, New York, NY 10001
            </p>
            <p className="text-gray-300 text-lg flex items-center gap-3">
              <FaPhoneAlt className="text-[#6E42E5]" /> +1 (234) 567-890
            </p>
            <p className="text-gray-300 text-lg flex items-center gap-3">
              <IoMail className="text-[#6E42E5]" /> info@manpower.com
            </p>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="text-center text-gray-400 mt-14 border-t border-gray-700 pt-5">
          © {new Date().getFullYear()} ManPower. All Rights Reserved.
        </div>
      </div>
    </div>
  );
};

export default Footer;
