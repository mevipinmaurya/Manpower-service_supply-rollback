import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import logo from "../assets/logo1.svg";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Link as ScrollLink } from "react-scroll";
import { useDispatch, useSelector } from 'react-redux';
import { clearUser } from '../redux/userSlice';
import { clearCart } from '../redux/cartSlice';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const user = useSelector((state) => state.user.user);

  const dispatch = useDispatch();
  const logoutHandler = () => {
    localStorage.removeItem("token")
    dispatch(clearUser())
    dispatch(clearCart())
    // navigate("/")
  }


  return (
    <nav className='w-full p-2 bg-white text-black'>
      <div className='flex justify-between items-center max-w-6xl mx-auto'>
        {/* Logo */}
        <div className='text-xl font-bold'>
          <Link to={'/'} className='font-bold text-3xl text-[#000000] font-sans'>ManPower</Link>
        </div>

        {/* Desktop Menu (Hidden on Small Screens) */}
        <ul className='hidden md:flex text-md md:text-lg gap-6 items-center'>
          <Link to={'/about'} className={`cursor-pointer ${location.pathname === '/about' ? 'text-black font-bold p-2 rounded' : 'text-black'}`}>About Us</Link>
          <Link to={'/services'} className={`cursor-pointer ${location.pathname === '/services' ? 'text-black font-bold p-2 rounded' : 'text-black'}`}>Services</Link>
          {/* <Link to={'/pricing'} className={`cursor-pointer ${location.pathname === '/pricing' ? 'text-black font-bold p-2 rounded' : 'text-black'}`}>Pricing</Link> */}
          {
            location.pathname === '/' ?
              <Link to={'/about'} className={`cursor-pointer ${location.pathname === '/about' ? 'text-black font-bold p-2 rounded' : 'text-black'}`}> <ScrollLink to="faq" smooth={true} duration={500}>FAQs</ScrollLink></Link>
              : <></>
          }
          <Link to={'/contact'} className={`cursor-pointer ${location.pathname === '/contact' ? 'text-black font-bold p-2 rounded' : 'text-black'}`}>Contact Us</Link>
          <Link to={'/blog'} className={`cursor-pointer ${location.pathname === '/blog' ? 'text-black font-bold p-2 rounded' : 'text-black'}`}>Blogs</Link>
          {
            user == null
              ? <Link to={'/login'}>
                <button className={`rounded-4xl w-[100px] p-2 cursor-pointer font-bold ${location.pathname === '/login' ? 'bg-[#6E42E5] text-white' : 'bg-[#6E42E5] text-white'}`}>Login</button>
              </Link>
              :
              <button>
                <button onClick={logoutHandler} className={`rounded-4xl w-[100px] p-2 cursor-pointer font-bold bg-[#6E42E5] text-white`}>Logout</button>
              </button>
          }
        </ul>

        {/* Mobile Menu Toggle (Visible on Small Screens) */}
        <div className='md:hidden flex ml-auto'>
          <button onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <ul className='md:hidden flex flex-col items-center gap-4 mt-4 p-4 rounded-lg shadow-lg'>
          <Link to={'/about'} className={`cursor-pointer ${location.pathname === '/about' ? 'text-black font-bold p-2 rounded' : 'text-black'}`}>About Us</Link>
          <Link to={'/services'} className={`cursor-pointer ${location.pathname === '/services' ? 'text-black font-bold p-2 rounded' : 'text-black'}`}>Services</Link>
          {/* <Link to={'/pricing'} className={`cursor-pointer ${location.pathname === '/pricing' ? 'text-black font-bold p-2 rounded' : 'text-black'}`}>Pricing</Link> */}
          {
            location.pathname === '/' ?
              <Link to={'/about'} className={`cursor-pointer ${location.pathname === '/about' ? 'text-black font-bold p-2 rounded' : 'text-black'}`}> <ScrollLink to="faq" smooth={true} duration={500}>FAQs</ScrollLink></Link>
              : <></>
          }
          <Link to={'/contact'} className={`cursor-pointer ${location.pathname === '/contact' ? 'text-black font-bold p-2 rounded' : 'text-black'}`}>Contact Us</Link>
          <Link to={'/blog'} className={`cursor-pointer ${location.pathname === '/blog' ? 'text-black font-bold p-2 rounded' : 'text-black'}`}>Blogs</Link>
          {
            user == null
              ? <Link to={'/login'}>
                <button className={`rounded-4xl w-[100px] p-2 cursor-pointer font-bold ${location.pathname === '/login' ? 'bg-[#6E42E5] text-white' : 'bg-[#6E42E5] text-white'}`}>Login</button>
              </Link>
              :
              <button onClick={logoutHandler} className={`rounded-4xl w-[100px] p-2 cursor-pointer font-bold bg-[#6E42E5] text-white`}>Logout</button>
          }
        </ul>
      )}
    </nav>
  );
};

export default Navbar;