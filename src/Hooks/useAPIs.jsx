import axios from "axios";

const useAPIs = () => {
  return axios.create({
    baseURL: "https://librisgo.vercel.app",
  });
};

export default useAPIs;