import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { toast } from 'react-hot-toast';

const ServiceLists = () => {
  const URL = 'http://localhost:3000';
  const [list, setList] = useState([]);
  const [filteredList, setFilteredList] = useState([]);
  const [filter, setFilter] = useState('');
  const [searchVal, setSearchVal] = useState("");

  const fetchAPI = async () => {
    try {
      const res = await axios.get(`${URL}/api/v1/user/getservice`);
      if (res.data.success) {
        setList(res.data.message);
        setFilteredList(res.data.message);
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      toast.error("Failed to fetch blogs");
    }
  };

  const handleFilterChange = (value) => {
    setFilter(value);
    let sorted = [...list];
    switch (value) {
      case 'date':
        sorted.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        break;
      case 'name':
        sorted.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case 'category':
        sorted.sort((a, b) => a.category.localeCompare(b.category));
        break;
      case 'price':
        sorted.sort((a, b) => a.price.localeCompare(b.price));
      default:
        break;
    }
    setFilteredList(sorted);
  };

  const deleteService = async (id) => {
    const res = await axios.post(`${URL}/api/v1/user/delservice`, { id: id })
    await fetchAPI()
    if (res.data.success) {
      toast.success(res.data.message)
    } else {
      toast.error(res.data.message)
    }
  }


  const [isModalOpen, setIsModalOpen] = useState(false);
  const [serviceId, setserviceId] = useState(0);

  // 2. Function to handle opening the modal
  const openModal = (id) => {
    setIsModalOpen(true);
    setserviceId(id);
  };

  // 3. Function to handle closing the modal
  const closeModal = () => {
    setIsModalOpen(false);
  };


  const fetchFilteredData = (value) => {
    setSearchVal(value);

    if (value.trim() === "") {
      setFilteredList(list); // Reset to original full list
      return;
    }

    const result = list.filter(item =>
      item.title.toLowerCase().includes(value.toLowerCase()) ||
      item.category.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredList(result);
  };


  const [image, setImage] = useState("");
  const imageHandler = (e) => {
    e.preventDefault()
    setImage(e.target.value);
  };


  const url = "http://localhost:3000"

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");

  const updateSubmitHandler = async (e) => {
    e.preventDefault();

    const res = await axios.post(`${url}/api/v1/user/updateservice`,
      {
        "title": title,
        "description": description,
        "category": category,
        "image": image,
        "price": price,
        "id": serviceId
      }
    )

    if (res.data.success) {
      setTitle("");
      setImage("");
      setCategory("All");
      setDescription("");
      setIsModalOpen(false)

      toast.success(res.data.message)
    }
    else {
      toast.error(res.data.message)
    }
  }

  useEffect(() => {
    fetchAPI();
    if (isModalOpen) {
      const service = filteredList.find(post => post._id === serviceId);
      if (service) {
        setTitle(service.title);
        setDescription(service.description);
        setCategory(service.category);
        setImage(service.image);
        setPrice(service.price)
      }
    }
  }, [isModalOpen, serviceId]);

  return (
    <div className="w-full min-h-screen bg-gray-50 px-4 py-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:justify-between items-start sm:items-center bg-white shadow rounded-lg p-4">
          <h3 className="text-2xl font-semibold mb-2 sm:mb-0">List of Services we offer</h3>
          <input
            value={searchVal}
            onChange={(e) => fetchFilteredData(e.target.value)}
            type="search"
            placeholder='Search'
            className='p-2 px-2 text-sm border border-gray-300 outline-none rounded-md'
          />
          <select
            value={filter}
            onChange={(e) => handleFilterChange(e.target.value)}
            className="border border-gray-300 p-2 rounded-md text-sm cursor-pointer outline-none"
          >
            <option value="">Filter</option>
            <option value="date">SORT BY DATE</option>
            <option value="name">SORT BY NAME</option>
            <option value="price">SORT BY PRICE</option>
            <option value="category">SORT BY CATEGORY</option>
          </select>
        </div>

        <div className="mt-6 space-y-4">
          {filteredList.length === 0 ? (
            <p className="text-center text-gray-500">No services available.</p>
          ) : (
            filteredList.map((service, index) => (
              <div
                key={index}
                className="bg-white shadow-sm hover:shadow-md transition-all duration-300 rounded-lg p-4 flex flex-col lg:flex-row justify-between gap-4"
              >
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 w-full lg:w-2/3">
                  <p className="font-medium">{index + 1}.</p>
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-28 h-20 object-cover rounded-md"
                  />
                  <div className="flex flex-col gap-1">
                    <p className="text-lg font-semibold">{service.title}</p>
                    <p className="text-sm">Price : {service.price}/hr</p>
                    <p className="text-sm text-gray-600">Date: {service.createdAt.substring(0, 10)}</p>
                    <p className="bg-amber-100 text-amber-800 text-xs px-2 py-1 rounded w-fit">{service.category}</p>
                  </div>
                </div>

                <div className="flex justify-start lg:justify-end items-center gap-4 w-full lg:w-1/3">
                  <button title="Edit">
                    <FaEdit onClick={() => openModal(service._id)} className="text-xl cursor-pointer hover:scale-115 text-indigo-600 hover:text-indigo-800 transition" />
                  </button>
                  <button title="Delete">
                    <MdDelete onClick={() => deleteService(service._id)} className="text-xl cursor-pointer hover:scale-115 text-red-600 hover:text-red-800 transition" />
                  </button>
                </div>
              </div>
            ))
          )}

          {/* Openning modal for updating the service */}
          {isModalOpen && (
            <div className="fixed inset-0 bg-transparent flex items-center justify-center z-50">
              <div className="bg-gray-100 w-[95%] md:1/2 lg:w-1/2 p-5 overflow-auto h-[80vh] rounded-lg shadow-lg relative">
                <button
                  onClick={closeModal}
                  className="absolute top-2 cursor-pointer right-2 text-gray-600 hover:text-black text-3xl"
                >
                  &times;
                </button>
                {
                  filteredList.filter(post => post._id === serviceId).map((items, index) => (
                    <>
                      <h2 className='text-2xl font-bold mb-5'>Update Service</h2>
                      <form onSubmit={updateSubmitHandler} className='w-full gap-3 flex justify-center items-center flex-col'>
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
                                className='w-[100px] rounded-md p-2 cursor-pointer'
                                alt="Upload Preview"
                              />
                              : <></>
                          }
                        </div>
                        <div className='w-full flex flex-col mb-5'>
                          <button className='p-2 bg-[#6E42E5] text-white rounded-md cursor-pointer'>Update Service</button>
                        </div>
                      </form>
                    </>
                  ))
                }
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ServiceLists;
