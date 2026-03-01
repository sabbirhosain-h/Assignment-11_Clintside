import axios from "axios";

const useAPIs = () => {
  return axios.create({
    baseURL: "http://localhost:3000", // 🔥 BACKEND PORT
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export default useAPIs;