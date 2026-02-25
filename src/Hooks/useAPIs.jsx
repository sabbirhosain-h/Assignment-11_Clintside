import axios from "axios";

const axiosInstance = axios.create({
    baseURL : "https://the-book-heaven-server-delta.vercel.app"
})
const useAPIs = () => {
    
    return axiosInstance;

}

export default useAPIs;