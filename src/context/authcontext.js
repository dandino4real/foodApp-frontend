import React, { createContext,useState} from "react";
import { apiGet, apiPost } from "../utils/api/axios";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const dataContext = createContext();

const DataProvider = ({children}) => {
const [getVendors,setGetVendors]= useState([])
const [getVendorsFood,setGetVendorsFood]= useState([])
  const registerConfig = async(formData) => {
    try{
      const registerData = {
        email: formData.email,
        password: formData.password,
        confirm_password: formData.confirm_password, 
        phone: formData.phone
      }
   await apiPost('users/signup', registerData).then((res) =>{
      console.log(res.data)
        toast.success(res.data.message);
        localStorage.setItem("signature",res.data.signature)
        setTimeout(()=>{
          window.location.href = "/otp";
        }, 2000)
      })
    }catch(err){
      console.log(err)
      toast.error(err.response.data.Error)
    }
  }



  const OTPConfig = async(formData,signature) => {
    try{
      const otpData ={
        otp:formData
      }
   await apiPost(`users/verify${signature}`,otpData).then((res) =>{
      console.log(res.data)
        toast.success(res.data.message);
        setTimeout(()=>{
          window.location.href = "/login";
        }, 2000)
      })
    }catch(err){
      console.log(err)
      toast.error(err.response.data.Error)
    }
  }

  const ResendOTP = async(signature) => {
   try{ 
    await apiGet(`/resend-otp${signature}`).then((res) =>{
      console.log(res.data)
        toast.success(res.data.message);
        setTimeout(()=>{
          window.location.href = "/otp";
        }, 2000)
      })
  }catch(err){
    console.log(err)
    toast.error(err.response.data.Error)
   }
  }

  const LoginConfig = async(formData) => {
    try{
      const LoginData = {
        email: formData.email,
        password: formData.password,
       
      }
   await apiPost('users/login', LoginData).then((res) =>{
      console.log(res.data)
        toast.success(res.data.message);
        localStorage.setItem("signature",res.data.signature)
        localStorage.getItem("role",res.data.role)
        setTimeout(()=>{
          // window.location.href = "/";
          if(res.data.role === "admin" || res.data.role ==="superadmin"){
            window.location.href ="/admin/dashboard"
          }else if(res.data.role === "vendor" ){
            window.location.href ="/vendor/dashboard"
          }else{window.location.href ="/"}

        }, 2000)
      })
    }catch(err){
      console.log(err)
      toast.error(err.response.data.Error)
    }

   
  }
  const Logout =async()=>{
    localStorage.clear()
    window.location.href = "/login";
  }

  const GetAllVendors =async()=>{
    try{
      await apiGet(`/vendors/get-all-vendors`).then((res)=>{
        setGetVendors(...res.data.vendor);
      })
    }catch(err){
      console.log(err)
    }
  }
  const GetAllVendorsFood =async(vendorId)=>{
    try{
      await apiGet(`/vendors/get-vendor-food/${vendorId}`).then((res)=>{
        setGetVendorsFood(...res.data.Vendor);
      })
    }catch(err){
      console.log(err)
    }
  }

  return <dataContext.Provider value={{ registerConfig,OTPConfig,ResendOTP,LoginConfig,Logout,GetAllVendors,getVendors,getVendorsFood,GetAllVendorsFood}}>
      {children}
  </dataContext.Provider>;
};



export const useAuth = () => {
  const context = React.useContext(dataContext);
  if (context === "undefined") {
    throw new Error("useAuth must be used within the auth provider");
  }
  return context;
};

export default DataProvider;


