import axios from "axios";
import { useDispatch } from "react-redux"
import { USER_API_ENDPOINT } from "../utils/Constants";
import toast from "react-hot-toast";
import { useEffect } from "react";
import { setServices } from "../redux/servicesSlice";

const useGetAllServices = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        const getServices = async () => {
            try {
                const res = await axios.get(`${USER_API_ENDPOINT}/getservice`, { withCredentials: true })
                dispatch(setServices(res.data.message))
            } catch (error) {
                console.log(error)
                toast.error("Something went wrong !!!")
            }
        }

        getServices();
    }, [dispatch])
}

export default useGetAllServices