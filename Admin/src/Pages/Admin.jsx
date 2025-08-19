import React from 'react'
import { Routes, Route } from 'react-router-dom'
import AddServices from '../Components/AddServices'
import AddBlog from '../Components/AddBlog'
import Sidebar from '../Components/Sidebar'
import BlogLists from '../Components/BlogLists'
import ServiceLists from '../Components/ServiceLists'

const Admin = () => {
    return (
        <div className='w-full flex'>
            <div className='w-1/6 border-r h-screen border-gray-300'>
                <Sidebar />
            </div>
            <div className='w-5/6 flex justify-center'>
                <Routes>
                    <Route path='/' element={<AddServices />} />
                    <Route path='/addblog' element={<AddBlog />} />
                    <Route path='/bloglist' element={<BlogLists />} />
                    <Route path='/servicelist' element={<ServiceLists />} />
                </Routes>
            </div>
        </div>
    )
}

export default Admin