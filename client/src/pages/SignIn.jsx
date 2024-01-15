import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Loader from '../component/Loader';

export default function SignIn() {

  const baseUrl = import.meta.env.VITE_BASE_URL
  const notify = toast
  const navigate = useNavigate()
  const [isLoading,setIsLoading] = useState(false)
  const userToken = localStorage.getItem("user_token")
  const [user, setUser] = useState({
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    setUser({ ...user, [e.target.id]: e.target.value });
  };

  const handleSubmit =async (e)=>{
    e.preventDefault();
    try{
      setIsLoading(true)
      const {data} =await axios.post(`${baseUrl}/api/v1/auth/login`,user)
      if(data.success) {
        setIsLoading(false)
        localStorage.setItem("user_token",data.token)
        notify.success("Logged In successfully");
        navigate("/")
      }
    }catch(err){
      setIsLoading(false)
      notify.error(err?.response?.data?.msg)
      console.log(err);}
  }
  useEffect(()=>{
    if(userToken)
    {
      navigate("/")
    }
  })

  return (
    <>
      {isLoading&&<Loader/>}
      <div className='flex justify-center mt-20 mb-20'>
        <form onSubmit={handleSubmit} autoComplete='off' className='w-5/12 flex flex-col gap-8 border-2 border-solid border-gray-500 p-16 rounded-xl'>
          <div className='flex flex-col gap-1'>
            <label className='text-white' htmlFor="email">Email</label>
            <input onChange={handleChange} required className='text-sm border-b-[1px] text-gray-400 outline-none leading-7 border-solid border-slate-500 bg-transparent' id="email" type="email" value={user.email} placeholder='Enter your email'/>
          </div>
          <div className='flex flex-col gap-1'>
            <label className='text-white' htmlFor="pass">Password</label>
            <input onChange={handleChange} minLength={6} required className='text-sm border-b-[1px] text-gray-400 outline-none leading-7 border-solid border-slate-500 bg-transparent' id="password" type="password" value={user.password} placeholder='Enter your password'/>
          </div>
          <div className='flex items-center gap-6'>
          <button className='p-2 w-36 text-sm font-normal text-white rounded-3xl bg-[#5ccebf]' type='submit'>SignIn</button>
          <Link to="/register"><span className='cursor-pointer text-gray-400 underline underline-offset-4 decoration-[#5ccebf]'>Not a member? SignUp !</span></Link>
          </div>
        </form>
      </div>
    </>
  )
}
