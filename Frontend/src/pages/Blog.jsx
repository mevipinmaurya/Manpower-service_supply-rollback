import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import useGetAllBlogs from '../hooks/useGetAllBlogs';
import { useSelector } from 'react-redux';
import store from '../redux/store';

const Blog = () => {
    useGetAllBlogs()

    const {blogs} = useSelector(store => store.blogs)

    const [selectedTag, setSelectedTag] = useState('All');

    const categories = ['All', 'Happy Homes', 'Interior', 'Wellness', 'Beauty'];

    const filteredPosts =
        selectedTag === 'All'
            ? blogs
            : blogs.filter((post) => post.category === selectedTag);

    return (
        <div className='w-full px-4'>
            <div className='max-w-[1200px] mx-auto flex flex-col gap-4 mt-5'>

                <div className='w-full flex flex-col md:flex-row gap-5'>

                    {/* Categories */}
                    <div className='w-full md:w-[25%] order-1 md:order-2'>
                        <div className='w-full'>
                            <h1 className='text-xl font-semibold mb-4'>Categories</h1>
                            <ul className='flex flex-row md:flex-col flex-wrap gap-4 text-gray-500'>
                                {categories.map((category) => (
                                    <li
                                        key={category}
                                        className={`w-fit cursor-pointer hover:border-b-[1px] hover:text-gray-900 font-medium ${selectedTag === category ? 'text-[#6E42E5] font-bold border-b-[1px]' : ''
                                            }`}
                                        onClick={() => {
                                            setSelectedTag(category);
                                        }}
                                    >
                                        {category}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    {/* Blog List */}
                    <div className='w-full md:w-[75%] order-2 md:order-1'>
                        <h2 className='font-semibold text-gray-950 text-xl md:text-2xl mb-3'>
                            {selectedTag === 'All' ? 'Checkout Our Latest Blogs' : `Category: ${selectedTag}`}
                        </h2>

                        {filteredPosts.length === 0 ? (
                            <p className='text-gray-500'>No posts found for "{selectedTag}".</p>
                        ) : (
                            filteredPosts.map((items, index) => (
                                <div
                                    key={index}
                                    className='w-full mt-2 md:mt-3 flex flex-col md:flex-row items-center justify-center gap-5 py-5'
                                >
                                    <div className='w-full flex flex-col md:flex-row'>
                                        <div className='md:w-1/3 flex justify-center'>
                                            <img
                                                src={items.image}
                                                alt='Blog'
                                                className='w-full max-w-sm mt-4 rounded md:max-w-full h-auto'
                                            />
                                        </div>
                                        <div className='md:w-2/3 p-3 flex flex-col'>
                                            <h2 className='font-bold text-xl sm:text-xl md:text-2xl'>{items.title}</h2>
                                            <p className='bg-amber-100 p-2 rounded-lg w-fit mt-1'>{items.category}</p>
                                            <p className='mt-5 text-lg'>{items.description.substring(0, 100)}...</p>
                                            <Link
                                                to={`/blog/${items._id}`}
                                                className='text-[#6E42E5] w-fit border-b-[1px] font-semibold text-xl cursor-pointer mt-2'
                                            >
                                                read more
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Blog;
