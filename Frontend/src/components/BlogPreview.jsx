import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { IoIosArrowDroprightCircle } from "react-icons/io";
import { IoIosArrowDropleftCircle } from "react-icons/io";
import { useDispatch, useSelector } from 'react-redux';
import store from '../redux/store';


const BlogPreview = () => {
  const { blogs } = useSelector((state) => state.blogs)
  const { id } = useParams();
  
  // console.log(id)
  const blog = blogs.find((post) => post._id === id);

  if (!blog) {
    return <p className='text-center mt-10 text-red-500'>Blog not found.</p>;
  }

  return (
    <div className='max-w-5xl mx-auto mt-10 px-4 mb-10'>
      <div className='w-full gap-6'>
        <div className='w-full flex justify-center items-center mb-6'>
          <img
            src={blog.image}
            alt={blog.title}
            className='w-full md:w-[70%] lg:w-[60%] rounded shadow'
          />
        </div>
        <div className='w-full mb-10 flex flex-col gap-4'>
          <h2 className='text-3xl font-bold'>{blog.title}</h2>
          <p className='bg-amber-100 w-fit px-3 py-1 rounded'>{blog.category}</p>
          <p className='text-md text-gray-700'>{blog.description}</p>
        </div>
      </div>

      {/* <div className='w-full flex justify-center items-center'>
        {blogs.find((post) => post._id === parseInt(id, 10) - 1) && (
          <Link
            to={`/blog/${parseInt(id, 10) - 1}`}
            className="mr-6 flex justify-center items-center text-lg gap-2 bg-[#6E42E5] text-white p-2 rounded-lg"
          >
            <IoIosArrowDropleftCircle /> Prev
          </Link>
        )}

        {blogs.find((post) => post._id === parseInt(id, 10) + 1) && (
          <Link
            to={`/blog/${parseInt(id, 10) + 1}`}
            className="flex justify-center items-center text-lg gap-2 bg-[#6E42E5] text-white p-2 rounded-lg"
          >
            Next <IoIosArrowDroprightCircle />
          </Link>
        )}
      </div> */}
    </div>
  );
};

export default BlogPreview;
