import React, { useState } from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'

const AddServices = () => {
    const URL = 'http://localhost:3000'
    const [image, setImage] = useState("")

    const imageHandler = (e) => {
        e.preventDefault()
        setImage(e.target.value)
    }

    const [category, setCategory] = useState('Cleaner');
    const [title, setTitle] = useState("");
    const [price, setPrice] = useState("");
    const [description, setDescription] = useState("")

    const submitHandler = async (e) => {
        e.preventDefault();

        const res = await axios.post(`${URL}/api/v1/user/addservice`, {
            "title": title,
            "description": description,
            "image": image,
            "category": category,
            "price": price,
        })

        if (res.data.success) {
            setCategory("");
            setTitle("")
            setPrice("")
            setDescription("")
            setImage("")

            toast.success(res.data.message)
        } else {
            toast.error(res.data.message)
        }
    }



    return (
        <div className='w-[90%] md:w-[50%] h-fit flex justify-center flex-col'>
            <h2 className='text-2xl font-bold mb-5'>Add Service</h2>
            <form onSubmit={submitHandler} className='w-full gap-3 flex justify-center items-center flex-col'>
                <div className='w-full flex gap-2 flex-col'>
                    <label htmlFor="">Category</label>
                    <select value={category} onChange={(e) => setCategory(e.target.value)} className='border p-2 rounded-md border-gray-300'>
                        <option value="cleaner">Cleaner</option>
                        <option value="electrician">Electrician</option>
                        <option value="plumber">Plumber</option>
                        <option value="mechanic">Mechanic</option>
                        <option value="therapist">Therapist</option>
                    </select>
                </div>
                <div className='w-full flex gap-2 flex-col'>
                    <label htmlFor="">Title</label>
                    <input value={title} onChange={(e) => setTitle(e.target.value)} className='border p-2 rounded-md border-gray-300' type="text" />
                </div>
                <div className='w-full flex gap-2 flex-col'>
                    <label htmlFor="">Price (Per Hour)</label>
                    <input value={price} onChange={(e) => setPrice(e.target.value)} className='border p-2 rounded-md border-gray-300' type="text" />
                </div>
                <div className='w-full flex gap-2 flex-col'>
                    <label htmlFor="">Description</label>
                    <textarea value={description} onChange={(e) => setDescription(e.target.value)} className='border p-2 rounded-md resize-none border-gray-300' rows="5" cols="10"></textarea>
                </div>
                <div className='w-full flex gap-2 flex-col'>
                    <label htmlFor="">
                        Upload Image
                    </label>
                    <input value={image} onChange={imageHandler} type="text" className='border p-2 rounded-md resize-none border-gray-300' />
                    {
                        image
                            ? <img
                                src={image}
                                className='w-[200px] rounded-md p-2 cursor-pointer'
                                alt="Upload Preview"
                            />
                            : <></>
                    }
                </div>
                <div className='w-full flex flex-col mb-5'>
                    <button className='p-2 bg-[#6E42E5] text-white rounded-md cursor-pointer'>Add Service</button>
                </div>
            </form>
        </div>
    )
}

export default AddServices