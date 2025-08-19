import { useEffect, useState } from 'react';
import '../components/Blog.css';
import {
  GiThornedArrow,
  GiVacuumCleaner,
  GiMechanicGarage,
} from "react-icons/gi";
import {
  MdStars,
  MdOutlinePlumbing,
  MdOutlineElectricalServices,
  MdOutlineDownloadDone,
} from "react-icons/md";
import { RiPsychotherapyFill } from "react-icons/ri";
import { IoIosArrowRoundForward, IoIosAddCircleOutline } from "react-icons/io";
import { HiShoppingCart } from "react-icons/hi";

import cart from "../assets/cart.png";
import useGetAllServices from '../hooks/useGetAllServices';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { USER_API_ENDPOINT } from '../utils/Constants';
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import {
  setCartItems,
  setError,
  setLoading,
} from "../redux/cartSlice";

const Services = () => {
  useGetAllServices();

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector(state => state.user.user);
  const { services } = useSelector(state => state.services);
  const { cartItems } = useSelector(state => state.cart);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [serviceId, setServiceId] = useState(0);
  const [selectedService, setSelectedService] = useState('All');

  const serviceCat = ['All', 'Cleaner', 'Electrician', 'Plumber', 'Mechanic', 'Therapist'];

  const categoryIcons = {
    Cleaner: <GiVacuumCleaner className="text-3xl text-black" />,
    Mechanic: <GiMechanicGarage className="text-3xl text-black" />,
    Plumber: <MdOutlinePlumbing className="text-3xl text-black" />,
    Electrician: <MdOutlineElectricalServices className="text-3xl text-black" />,
    Therapist: <RiPsychotherapyFill className="text-3xl text-black" />,
  };

  useEffect(() => {
    const fetchCart = async () => {
      if (!user?.userId) return;
      dispatch(setLoading(true));
      try {
        const res = await axios.post(`${USER_API_ENDPOINT}/fetchcartitems`, {
          userId: user.userId
        }, { withCredentials: true });

        if (res.data.success) {
          dispatch(setCartItems(res.data.userCart || []));
        } else {
          dispatch(setError(res.data.message));
        }
      } catch (error) {
        dispatch(setError(error.response?.data?.message || "Error fetching cart"));
      } finally {
        dispatch(setLoading(false));
      }
    };

    fetchCart();
  }, [user, dispatch]);


  // For adding and deleting items in cart
  const toggleService = async (id) => {
    if (!user?.userId) {
      toast.error("Login First");
      return navigate("/login");
    }

    try {
      // Check if the service is already in the cart
      const isInCart = cartItems.some(item => item.serviceId === id);

      const endpoint = isInCart ? "removefromcart" : "addtocart";
      const res = await axios.post(`${USER_API_ENDPOINT}/${endpoint}`, {
        userId: user.userId,
        serviceId: id,
      }, { withCredentials: true });

      if (res.data.success) {
        toast.success(res.data.message);
        dispatch(setCartItems(res.data.updatedCart || []));
        // console.log("Updated cart is")
        // console.log(res.data.updatedCart)
      } else {
        toast.error(res.data.message || "Something went wrong!");
      }

    } catch (error) {
      toast.error(error.response?.data?.message || "Error updating cart");
    }
  };


  const openModal = (id) => {
    setIsModalOpen(true);
    setServiceId(id);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const isAddedToCart = (id) => {
    return cartItems.some(item => item.serviceId === id);
  };

  const totalPrice = cartItems.reduce((acc, item) => acc + item.priceAtAddition, 0);

  const filteredServices = selectedService === 'All'
    ? services
    : services.filter(post => post.category === selectedService);

  return (
    <div className='w-full h-auto lg:h-screen overflow-hidden px-4'>
      <div className='max-w-[1200px] mx-auto flex flex-col gap-4 mt-5 h-full'>
        <div className='w-full flex flex-col lg:flex-row gap-5 h-full'>

          {/* Left Column - Categories */}
          <div className='h-fit p-3 w-full lg:w-[20%] order-1 rounded-md'>
            <h1 className='text-xl font-semibold mb-4 flex items-center gap-2 text-gray-500'>
              Select a service <GiThornedArrow />
            </h1>
            <ul className='flex flex-row lg:flex-col flex-wrap gap-4 text-gray-500'>
              {serviceCat.map(category => (
                <li
                  key={category}
                  className={`w-fit flex items-center gap-2 cursor-pointer hover:text-gray-900 font-medium ${selectedService === category ? 'text-black font-semibold' : ''}`}
                  onClick={() => setSelectedService(category)}
                >
                  {category !== 'All' && categoryIcons[category]}
                  {category}
                </li>
              ))}
            </ul>
          </div>

          {/* Middle Column - Services List */}
          <div className='w-full p-3 lg:w-[50%] order-2 pr-2 lg:overflow-y-auto scrollbar-hidden'>
            <div className='lg:max-h-[calc(100vh-6rem)] lg:overflow-y-auto scrollbar-hidden'>
              <h2 className='font-semibold flex items-center text-lg md:text-xl mb-3 sticky top-0 bg-white z-10 text-[#6E42E5]'>
                Service <IoIosArrowRoundForward /> {selectedService}
              </h2>

              {filteredServices.length === 0 ? (
                <p className='text-gray-500'>No services found for "{selectedService}".</p>
              ) : (
                filteredServices.map((items, index) => (
                  <div key={index} className='w-full mt-2 md:mt-3 flex flex-col md:flex-row items-center justify-center gap-5 py-5'>
                    <div className='w-full flex flex-col md:flex-row'>
                      <div className='md:w-3/4 p-3 flex flex-col md:order-1 order-2'>
                        <h2 className='font-semibold text-md sm:text-lg md:text-xl'>{items.title}</h2>
                        <p className='flex items-center'><MdStars className='text-[#6E42E5] text-lg' />&nbsp;({items.review} 1k+ Reviews)</p>
                        <p>₹ {items.price}</p>
                        <div className='w-full gap-4 flex items-center justify-between'>
                          <p className='text-[#6E42E5] w-fit text-bold text-md cursor-pointer mt-2' onClick={() => openModal(items._id)}>
                            View Details
                          </p>
                          <div className='flex items-center gap-2'>
                            {isAddedToCart(items._id) ? (
                              <p onClick={() => toggleService(items._id)} className='bg-red-500 cursor-pointer border border-red-500 text-white rounded-md p-[5px] flex gap-2 justify-center items-center'>
                                Remove <MdOutlineDownloadDone />
                              </p>
                            ) : (
                              <p onClick={() => toggleService(items._id)} className='bg-gray-50 cursor-pointer border border-[#6E42E5] text-[#6E42E5] rounded-md p-[5px] flex gap-2 justify-center items-center'>
                                Add Service <IoIosAddCircleOutline />
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className='md:w-1/4 flex justify-center md:order-2 order-1'>
                        <img src={items.image} alt='Service' className='w-full max-w-sm mt-4 rounded md:max-w-full h-auto' />
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Right Column - Cart */}
          <div className='border border-gray-300 rounded-md w-full lg:w-[30%] order-3'>
            <div className='w-full flex px-4 justify-between items-center'>
              <h1 className='font-semibold text-lg p-3'>Cart Items</h1>
              <div className='relative'>
                <HiShoppingCart className='text-[#6E42E5] text-2xl' />
                <span className='absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full px-1'>
                  {cartItems.length}
                </span>
              </div>
            </div>

            <div className='w-full flex justify-center items-center'>
              {cartItems.length > 0 ? (
                <div className='w-full'>
                  <div className='hidden md:block overflow-y-auto h-[70vh] scrollbar-hidden p-4'>
                    
                    
                    {cartItems.map((item, index) => {

                      const matchedServices = services.find(
                        (service) => service._id === item.serviceId
                      );

                      if (!matchedServices) return null;

                      return (
                        <div key={index}>
                          <div onClick={() => openModal(matchedServices._id)} className='hover:bg-purple-100 cursor-pointer w-full flex justify-between p-2 items-center'>
                            <div>
                              <p>{matchedServices.title}</p>
                              <p>₹ {matchedServices.price}</p>
                            </div>
                            <img src={matchedServices.image} alt={matchedServices.title} className='w-[20%] rounded-md h-[20%]' />
                          </div>
                        </div>
                      )
                    })}


                  </div>
                  <div className='w-full flex justify-center items-center'>
                    <div className='mb-3 w-[95%] flex justify-between items-center bg-[#6E42E5] rounded-md p-4 text-white mt-5'>
                      <p>₹ {totalPrice}.00</p>
                      <Link to={"/cart"} className='cursor-pointer underline'>View Cart</Link>
                    </div>
                  </div>
                </div>
              ) : (
                <div className='w-full flex justify-center items-center'>
                  <div className='w-full justify-center items-center'>
                    <img src={cart} alt="Empty_Cart" className='w-[35%] h-[35%] m-auto' />
                    <p className='w-full flex justify-center items-center text-gray-400'>No items in your cart</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-transparent flex items-center justify-center z-50">
          <div className="bg-gray-100 w-[95%] md:1/2 lg:w-1/3 p-5 rounded-lg shadow-lg relative">
            <button onClick={closeModal} className="absolute top-2 cursor-pointer right-2 text-gray-600 hover:text-black text-3xl">
              &times;
            </button>
            {services.filter(post => post._id === serviceId).map((items, index) => (
              <div key={index} className='w-full flex justify-center flex-col'>
                <img src={items.image} alt="" className='w-[50%] h-[50%] flex justify-center m-auto' />
                <h1 className='font-semibold text-xl mt-4'>{items.title}</h1>
                <p className='flex items-center mt-2'><MdStars className='text-yellow-600 text-lg' />&nbsp;({items.review} 1k+ Reviews)</p>
                <p className='mt-2'><span className='text-yellow-700'>Price</span>: ₹ {items.price}</p>
                <p className='mt-2 text-sm'>{items.description}</p>
                {isAddedToCart(items._id) ? (
                  <p onClick={() => toggleService(items._id)} className='bg-red-500 w-fit mt-4 cursor-pointer border border-red-500 text-white rounded-md p-[5px] flex gap-2 justify-center items-center'>
                    Remove <MdOutlineDownloadDone />
                  </p>
                ) : (
                  <p onClick={() => toggleService(items._id)} className='bg-gray-50 w-fit mt-4 cursor-pointer border border-[#6E42E5] text-[#6E42E5] rounded-md p-[5px] flex gap-2 justify-center items-center'>
                    Add Service<IoIosAddCircleOutline />
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Services;
