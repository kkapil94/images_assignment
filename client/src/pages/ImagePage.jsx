import React, { useEffect, useState } from 'react'
import axios from "axios"
import { useParams } from 'react-router-dom'

export default function ImagePage({}) {
    const {imgId} = useParams();
    const baseUrl = import.meta.env.VITE_BASE_URL
    const [image,setImage] = useState();
    const userToken = localStorage.getItem("user_token");
    const fetchImage = async ()=>{
        const {data} = await axios.get(`${baseUrl}/api/v1/image/image/${imgId}`,{
            headers:{
                "Authorization":`Bearer ${userToken}`
            }
        })
        setImage(data.image)
    }
    useEffect(()=>{
        fetchImage()
    },[])
  return (
    <>
        {image&&<div className='flex gap-40 justify-center items-center mt-20'>
            <div className='border-2 rounded-2xl border-solid border-slate-400 p-4'> 
                <img className='w-80 h-96 object-contain ' src={image?.url} alt="" />
            </div>
            <div className='flex flex-col gap-16 '>
                <span className='text-4xl text-white'><span className='mr-8 underline underline-offset-6'>Name:</span> {image?.name}</span>
                <span className='text-4xl text-white'><span className='mr-8 underline underline-offset-6'>Description:</span> {image?.description}</span>
                <span className='text-4xl text-white'><span className='mr-8 underline underline-offset-6'>Views:</span> {image?.views}</span>
            </div>
        </div>}
    </>
  )
}
