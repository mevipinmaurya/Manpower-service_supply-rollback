import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {

  return (
    <nav className='w-full p-2 bg-white border-b border-gray-300 text-black'>
      <div className='flex justify-between items-center max-w-6xl mx-auto'>
        <div className='text-xl font-bold'>
          <Link to={'/'} className='font-bold text-3xl text-[#000000] font-sans'>ManPower </Link>
        </div>
      </div>

    </nav>
  );
};

export default Navbar;