import axios from "axios";
import React from "react";
import { Link } from "react-router-dom";

export default function ImageCard({ image}) {
  const userToken = localStorage.getItem("user_token")
  const baseUrl = import.meta.env.VITE_BASE_URL

  const handleViews = async(id)=>{
    const data = await axios.post(`${baseUrl}/api/v1/image/inc-view/${id}`,{},{
      headers:{
        "Authorization":`Bearer ${userToken}`
      }
    })
    console.log(data);
  }


  return (
    <>
      <div className="border-2 xs:max-sm:w-[17rem] sm:max-md:w-80 w-[23rem]  bg-[#0d1b2a] border-solid border-white rounded-2xl">
        <span>
          <img
            className="rounded-t-2xl w-full h-40 object-cover"
            src={image?.url}
            alt=""
          />
        </span>
        <div className="xs:max-md:px-4 px-6 xs:max-md:mt-0 mt-4">
          <h4 className="xs:max-md:text-sm text-xl text-white xs:max-md:my-2 my-6">
            {image?.name}
          </h4>
          <p className="xs:max-md:text-xs text-gray-300">
            {image?.description}
          </p>
          <div className="my-6 w-full flex justify-between items-center">
            <Link to={"image/"+image?._id}>
              <button onClick={()=>handleViews(image._id)} className="group rounded-3xl bg-white  xs:max-md:text-sm xs:max-md:px-2 px-2">
                Check it out
                <img
                  className="transition-all duration-150 ease-in-out inline group-hover:relative relative left-0 group-hover:left-1 ml-3 xs:max-md:w-4"
                  src="/img/next.png"
                  alt=""
                />
              </button>
            </Link>
            <div className="flex gap-2">
              <img className="w-6" src="/img/viewLogo.png" alt="" />
              <span className="text-white">{image?.views}</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
