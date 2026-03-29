import axios from "axios";
import { useContext, useEffect } from "react";
import {AuthContext} from "../Context/AuthProvider"
import { useNavigate } from "react-router";

const axiosSecure = axios.create({
    baseURL: "http://localhost:3000"
})

const useSecure = () => {
    const {user, signOut} = useContext(AuthContext);
    const token = user?.accessToken;
    const navigate = useNavigate();
  
    useEffect(()=>{
        const requestInterseptor = axiosSecure.interceptors.request.use(config => {
            config.headers.Authorization = `Bearer ${token}`
            return config;
        });
        const responseInterseptor = axiosSecure.interceptors.response.use(function onSuccess(response) {return response } , 
        function onFail(error) {
            
            const errorCode = error.sratus;
            if (errorCode === 401 || errorCode === 403){
                
                signOut().then(()=> {
                    navigate("Login")
                })
            }
            return Promise.reject(error);
        });
        return () => {
            axiosSecure.interceptors.request.eject(requestInterseptor);
            axiosSecure.interceptors.response.eject(responseInterseptor);
        }
    },[user])
    return axiosSecure;
}

export default useSecure;