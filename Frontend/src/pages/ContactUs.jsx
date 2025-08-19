import React from 'react'
import { useForm } from 'react-hook-form';
import axios from "axios"
import toast from 'react-hot-toast';
import { USER_API_ENDPOINT } from '../utils/Constants';
import { useState } from 'react';
import { FaCheckCircle, FaSpinner } from 'react-icons/fa';

const ContactUs = () => {

  // react hook form
  const { register, handleSubmit, formState: { errors }, watch } = useForm()
  const messageLength = watch("message")

  const [isLoading, setIsLoading] = useState(false)
  const [isSuccessful, setIsSuccessful] = useState(false)

  const onSubmit = async (data) => {
    // console.log(data)

    try {
      // request to backend
      setIsLoading(true)
      const res = await axios.post(
        `${USER_API_ENDPOINT}/contactUs`,
        data,
        { withCredentials: true },
      )

      // console.log(res)
      if (res.data.success) {
        setIsSuccessful(true)
        console.log("contactus mail send")
        toast.success("we will reach out soon")
      }

    } catch (error) {
      console.log("error in contactUs", error)
      toast.error("error in contactUs")
    }
    finally {
      setIsLoading(false)
    }
  }

  return (

    <>
      {
        isSuccessful 

        ?
        
          <div className="w-full min-h-screen flex items-center justify-center bg-gray-100 p-4">
            <div className="w-full max-w-[600px] bg-white p-6 sm:p-8 rounded-2xl shadow-lg text-center">
              <FaCheckCircle className="mx-auto text-green-500 mb-4" size={48} />
              <h2 className="text-3xl font-bold mb-2 text-green-700">Message Sent Successfully!</h2>
              <p className="text-gray-700 mb-6">
                Thank you for reaching out. We have received your message and will get back to you shortly.
              </p>
              <button
                onClick={() => window.location.reload()} // same page p wapas aa jao
                className="mt-4 bg-[#6E42E5] text-white py-3 px-6 rounded-lg font-semibold hover:bg-[#5933b8] transition cursor-pointer"
              >
                Send Another Message
              </button>
            </div>
          </div>

          :

          <div className="w-full min-h-screen flex items-center justify-center bg-gray-100 p-4">
            <div className="w-full max-w-[600px] bg-white p-6 sm:p-8 rounded-2xl shadow-lg">
              <h2 className="text-2xl sm:text-3xl font-bold mb-6 ">Contact Us</h2>

              <form
                onSubmit={handleSubmit(onSubmit)}
                className="space-y-5">
                <div className="flex flex-col">
                  <label htmlFor="fullName" className="mb-1 text-sm font-medium text-gray-700">Full Name</label>
                  <input
                    type='text'
                    id="fullName"
                    placeholder="Enter your full name"
                    className="p-3 border rounded-lg focus:outline-none focus:ring-0"
                    {...register(
                      "fullName",
                      { required: "fullName is required" }
                    )}
                  />
                  {errors?.fullName && <p className='text-red-600 font-italic'>{errors?.fullName?.message}</p>}
                </div>

                <div className="flex flex-col">
                  <label htmlFor="email" className="mb-1 text-sm font-medium text-gray-700">Email Address</label>
                  <input
                    type="email"
                    id="email"
                    placeholder="Enter your email"
                    className="p-3 border rounded-lg focus:outline-none focus:ring-0"
                    {...register(
                      "email",
                      {
                        required: "email is required",
                        pattern: {
                          value: /^\S+@\S+$/i,
                          message: "Invalid email address"
                        }
                      })}
                  />
                  {errors?.email && <p className='text-red-600 font-italic'>{errors?.email?.message}</p>}
                </div>

                <div className="flex flex-col">
                  <label htmlFor="phone" className="mb-1 text-sm font-medium text-gray-700">Phone Number</label>
                  <input
                    type="number"
                    id="phone"
                    placeholder="Enter your phone number"
                    className="p-3 border rounded-lg focus:outline-none focus:ring-0"
                    {...register(
                      "number",
                      {
                        required: "phone number is required",
                        pattern: {
                          value: /^[0-9]{10}$/,  // Example: 10 digits only (US format)
                          message: "Invalid phone number. Enter 10 digits."
                        }
                      }
                    )}
                  />
                  {errors?.number && <p className='text-red-600 font-italic'>{errors?.number?.message}</p>}
                </div>

                <div className="flex flex-col">
                  <label htmlFor="message" className="mb-1 text-sm font-medium text-gray-700">Message</label>
                  <textarea
                    id="message"
                    rows="5"
                    placeholder="Write your message here..."
                    className="p-3 border rounded-lg resize-none focus:outline-none focus:ring-0"
                    {...register("message",
                      {
                        required: "message is required",
                        maxLength: {
                          value: 250,
                          message: "Message cannot exceed 250 characters"
                        }
                      }
                    )}
                  >
                  </textarea>
                  <div className='text-grey-400 text-sm text-right'>{messageLength?.length || 0}/250</div>
                  {errors?.message && <p className='text-red-600 font-italic'>{errors?.message?.message}</p>}
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full cursor-pointer bg-[#6E42E5] text-white py-3 rounded-lg text-lg font-semibold transition duration-300 flex justify-center items-center"
                >
                  {isLoading ? <FaSpinner className="animate-spin" size={24} /> : "Send Message"}
                </button>
              </form>
            </div>
          </div>
      }
    </>

  )
}

export default ContactUs
