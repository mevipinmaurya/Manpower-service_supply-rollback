import axios from "axios";
import { useDispatch } from "react-redux"
import { USER_API_ENDPOINT } from "../utils/Constants";
import toast from "react-hot-toast";
import { useEffect } from "react";
import { setBlogs } from "../redux/blogsSlice";


const useGetAllBlogs = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        const getBlogs = async () => {
            try {
                const res = await axios.get(`${USER_API_ENDPOINT}/getblog`, { withCredentials: true })
                dispatch(setBlogs(res.data.message))
            } catch (error) {
                console.log(error)
                toast.error("Something went wrong !!!")
            }
        }

        getBlogs();
    }, [dispatch])
}

export default useGetAllBlogs