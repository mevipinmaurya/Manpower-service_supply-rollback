import React, { useState } from 'react'
import axios from 'axios'
import toast from 'react-hot-toast';

const AddBlog = () => {
    const url = "http://localhost:3000"
    const [image, setImage] = useState("");
    const imageHandler = (e) => {
        e.preventDefault()
        setImage(e.target.value);
    };

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState('All');

    const submitHandler = async (e) => {
        e.preventDefault();
        // const formData = new FormData();
        // formData.append("title", title);
        // formData.append("description", description);
        // formData.append("category", category);
        // formData.append("image", image);

        // console.log(formData)

        const res = await axios.post(`${url}/api/v1/user/addblog`,
            {
                "title": title,
                "description": description,
                "category": category,
                "image": image
            }
        )

        if (res.data.success) {
            setTitle("");
            setImage("");
            setCategory("");
            setDescription("");

            toast.success(res.data.message)
        }
        else {
            toast.error(res.data.message)
        }
    }


    return (
        <div className='w-[90%] md:w-[50%] h-fit flex justify-center flex-col'>
            <h2 className='text-2xl font-bold mb-5'>Add Blog</h2>
            <form onSubmit={submitHandler} className='w-full gap-3 flex justify-center items-center flex-col'>
                <div className='w-full flex gap-2 flex-col'>
                    <label htmlFor="">Category</label>
                    <select value={category} onChange={(e) => setCategory(e.target.value)} name='category' className='border p-2 rounded-md border-gray-300' required>
                        <option value="all">All</option>
                        <option value="happyHomes">Happy Homes</option>
                        <option value="interior">Interior</option>
                        <option value="wellness">Wellness</option>
                        <option value="beauty">Beauty</option>
                    </select>
                </div>
                <div className='w-full flex gap-2 flex-col'>
                    <label htmlFor="">Title</label>
                    <input value={title} onChange={(e) => setTitle(e.target.value)} className='border p-2 rounded-md border-gray-300' type="text" required />
                </div>
                <div className='w-full flex gap-2 flex-col'>
                    <label htmlFor="">Description</label>
                    <textarea value={description} onChange={(e) => setDescription(e.target.value)} className='border p-2 rounded-md resize-none border-gray-300' rows="5" cols="10" required></textarea>
                </div>
                <div className='w-full flex gap-2 flex-col'>
                    <label htmlFor="">
                        Upload Image (URL)
                    </label>
                    <input value={image} onChange={imageHandler} type="text" className='border border-gray-300 rounded-md p-2' required />
                    {
                        image
                            ? <img
                                src={image}
                                className='w-[200px] rounded-md p-2 cursor-pointer'
                                alt="Upload Preview"
                            />
                            :
                            <></>
                    }
                    {/* <label>
                        <input
                            onChange={imageHandler}
                            className='hidden'
                            type="file"
                        />
                        <img
                            src={image ? URL.createObjectURL(image) : uploadArea}
                            className='w-[200px] rounded-md border p-2 border-gray-300 cursor-pointer'
                            alt="Upload Preview"
                        />
                    </label> */}
                </div>
                <div className='w-full flex flex-col mb-5'>
                    <button className='p-2 bg-[#6E42E5] text-white rounded-md cursor-pointer'>Add Blog</button>
                </div>
            </form>
        </div>
    )
}

export default AddBlog