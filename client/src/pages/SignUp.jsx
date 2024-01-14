import React, { useState, useRef } from 'react'
import axios from "axios"
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Loader from '../component/Loader';

export default function SignUp() {

  const [pre,setPre] = useState(null)
  const [isLoading,setIsLoading] = useState(false)
  const baseUrl = import.meta.env.VITE_BASE_URL
  const navigate = useNavigate()
  const formRef = useRef()
  const notify = toast
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    avatar:''
  });

  const handleChange = (e) => {
    setUser({ ...user, [e.target.id]: e.target.value });
  };

  const handleSetFile = (e)=>{
    setPre(URL.createObjectURL(e.target.files[0]))
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(formRef.current);
    console.log('ok');
    try {
      setIsLoading(true)
      const {data} = await axios.post(`${baseUrl}/api/v1/auth/register`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      if (data?.success) {
        setUser({
        name: "",
        email: "",
        password: "",
        avatar:''
      })
        setIsLoading(false)
        notify.success("Registered successfully");
        navigate("/login")
      }
    } catch (err) {
      console.log(err);
      setIsLoading(false)
      const error = err?.response?.data?.msg;
      notify(error);
    }
  };


  return (
    <>
    {isLoading&&<Loader/>}
      <div className='flex justify-center mt-20 mb-20'>
        <form onSubmit={handleSubmit} autoComplete='off' ref={formRef} className='w-5/12 flex flex-col gap-8 border-2 border-solid border-gray-500 p-16 rounded-xl'>
          <div className='flex flex-col gap-1'>
            <label className='text-white' htmlFor="name">Full name</label>
            <input name="name" onChange={handleChange} required className='text-sm border-b-[1px] text-gray-400 outline-none leading-7 border-solid border-slate-500 bg-transparent' id="name" type="text" value={user.name} placeholder='Enter your full name'/>
          </div>
          <div className='flex flex-col gap-1'>
            <label className='text-white' htmlFor="email">Email</label>
            <input name="email" onChange={handleChange} required className='text-sm border-b-[1px] text-gray-400 outline-none leading-7 border-solid border-slate-500 bg-transparent' id="email" type="email" value={user.email} placeholder='Enter your email'/>
          </div>
          <div className='flex flex-col gap-1'>
            <label className='text-white' htmlFor="pass">Password</label>
            <input name="password" onChange={handleChange} required className='text-sm border-b-[1px] text-gray-400 outline-none leading-7 border-solid border-slate-500 bg-transparent' id="password" type="password" value={user.password} placeholder='Enter your password'/>
          </div>
          <div>
              <label htmlFor="avatar" className="text-md text-white block">Avatar</label>
              <div className="flex items-center mt-2">
                <label htmlFor="avatar"className="inline-block mr-4 cursor-pointer">
                  <img src={pre?pre:"https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"} alt="" className='h-10 w-10 rounded-full object-cover'/>
                </label>
                <input
                      name="file"
                      type="file"
                      id="avatar"
                      value={user.avatar}
                      onChange={(e)=>{handleChange(e);handleSetFile(e);}}
                      required 
                      className="file:bg-transparent cursor-pointer xs:max-md:text-sm w-3/5 md:max-lg:w-4/5 xs:max-md:w-4/5 file:border-2 file:rounded-2xl file:border-white text-white file:text-white"
                      />
              </div>
          </div>
          <div className='flex items-center gap-6'>
          <button className='p-2 w-36 text-sm font-normal text-white rounded-3xl bg-[#5ccebf]' type='submit'>SignUp</button>
          <Link to="/login"><span className='cursor-pointer text-gray-400 underline underline-offset-4 decoration-[#5ccebf]'>I'm already member</span></Link>
          </div>
        </form>
      </div>
    </>
  )
}
