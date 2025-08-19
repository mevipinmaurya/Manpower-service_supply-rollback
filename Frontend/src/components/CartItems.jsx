import React, { useEffect } from 'react'
import { IoIosRemoveCircle } from "react-icons/io";
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios';
import { USER_API_ENDPOINT } from '../utils/Constants'
import { setCartItems, setError, setLoading } from '../redux/cartSlice'
import toast from 'react-hot-toast';
import cart from "../assets/cart.png";

const CartItems = () => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.user.user)
    const { cartItems } = useSelector(state => state.cart)
    const { services } = useSelector(state => state.services)

    const removeFromCart = async (id) => {
        try {
            const res = await axios.post(`${USER_API_ENDPOINT}/removefromcart`, {
                userId: user.userId,
                serviceId: id,
            }, { withCredentials: true });

            if (res.data.success) {
                toast.success(res.data.message);
                dispatch(setCartItems(res.data.updatedCart || []));
            } else {
                toast.error(res.data.message || "Something went wrong!");
            }

        } catch (error) {
            toast.error(error.response?.data?.message || "Error updating cart");
        }
    }

    // Function for checkout Handling
    const checkoutHandler = async (amount) => {
        // console.log(amount)
        const { data: keyData } = await axios.get(`${USER_API_ENDPOINT}/getkey`);
        const { key } = keyData;
        // console.log(key)
        const { data: orderData } = await axios.post(`${USER_API_ENDPOINT}/payment/process`, { amount })
        const { order } = orderData
        // console.log(order)

        const options = {
            key,
            amount,
            currency: 'INR',
            name: 'Manpower Service Supply',
            description: 'Manpower Service Supply Razorpay Integration',
            order_id: order.id,
            callback_url: 'https://manpower-service-supply-rollback.vercel.app/api/v1/user/payment/verification', // success URL
            prefill: {
                name: 'Vipin Maurya',
                email: 'vipinblogpsot@gmail.com',
                contact: '6389441466'
            },
            theme: {
                color: '#6E42E5'
            },
        };

        const rzp = new Razorpay(options);
        rzp.open();

    }

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


    const totalPrice = cartItems.reduce((acc, item) => acc + item.priceAtAddition, 0)
    const deliveryFee = 40

    return (
        <div className='w-full px-4 md:px-10 mb-20 mt-10'>
            <div className='max-w-7xl mx-auto'>
                <div className="overflow-x-auto">
                    <table className="table table-fixed w-full min-w-[700px]">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="w-1/5 p-4 text-left">Service</th>
                                <th className="w-1/5 p-4 text-left">Category</th>
                                <th className="w-1/5 p-4 text-left">Title</th>
                                <th className="w-1/5 p-4 text-left">Price</th>
                                <th className="w-1/5 p-4 text-left">Remove</th>
                            </tr>
                        </thead>
                        <tbody>
                            {cartItems.length > 0
                                ? cartItems.map((item, index) => {
                                    const matchedServices = services.find(service => service._id === item.serviceId);
                                    if (!matchedServices) return null;

                                    return (
                                        <tr key={index} className="border-t">
                                            <td className="p-4">
                                                <div className="avatar">
                                                    <div className="mask mask-squircle w-16 h-16">
                                                        <img src={matchedServices.image} alt="service" />
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="p-4">{matchedServices.category}</td>
                                            <td className="p-4">{matchedServices.title}</td>
                                            <td className="p-4">₹ {matchedServices.price}</td>
                                            <td className="p-4">
                                                <button onClick={() => removeFromCart(matchedServices._id)} className='text-3xl cursor-pointer text-red-500'>
                                                    <IoIosRemoveCircle />
                                                </button>
                                            </td>
                                        </tr>
                                    );
                                })
                                :
                                (
                                    <tr>
                                        <td colSpan="5" className="py-5 text-center">
                                            <div className="flex flex-col items-center justify-center">
                                                <img src={cart} alt="Empty Cart" className="w-40 h-40 mb-2" />
                                                <p className="text-gray-400 text-sm">No items in your cart</p>
                                            </div>
                                        </td>
                                    </tr>
                                )
                            }
                        </tbody>
                    </table>
                </div>

                <div className='flex flex-col-reverse md:flex-row mt-16 gap-10 justify-between'>
                    {/* Promo code section */}
                    <div className='w-full md:w-[50%]'>
                        <div className='flex flex-col gap-4'>
                            <p className='text-base md:text-lg'>If you have a promocode, enter it here:</p>
                            <div className="flex w-full max-w-full md:max-w-md">
                                <input
                                    type="text"
                                    placeholder="Promo code"
                                    className="flex-grow h-12 px-4 rounded-l-full border border-gray-300 focus:outline-none"
                                />
                                <button
                                    className="h-12 px-6 bg-[#6E42E5] cursor-pointer text-white rounded-r-full hover:bg-gray-900"
                                >
                                    Apply
                                </button>
                            </div>

                        </div>
                    </div>

                    {/* Cart Totals */}
                    <div className='w-full md:w-[40%] flex flex-col gap-3'>
                        <h1 className='text-2xl font-semibold'>Cart Totals</h1>
                        <div className='flex border-b py-2 justify-between items-center'>
                            <h1 className='text-lg'>Subtotal</h1>
                            <h1 className='text-lg'>₹ {totalPrice}</h1>
                        </div>
                        <div className='flex border-b py-2 justify-between items-center'>
                            <h1 className='text-lg'>Delivery Fee</h1>
                            <h1 className='text-lg'>₹ {deliveryFee}</h1>
                        </div>
                        <div className='flex border-b py-2 justify-between items-center font-semibold'>
                            <h1 className='text-lg'>Total</h1>
                            <h1 className='text-lg'>₹ {totalPrice + deliveryFee}</h1>
                        </div>
                        <div className='mt-6'>
                            <button onClick={() => checkoutHandler(totalPrice + deliveryFee)} className='btn hover:bg-black cursor-pointer text-white w-full p-3 rounded-xl bg-[#6E42E5]'>
                                PROCEED TO CHECKOUT
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CartItems
