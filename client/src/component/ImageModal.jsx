import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import {useDispatch} from "react-redux"
import {fetchImages} from "../features/images/imageSlice"
import { toast } from "react-toastify";

export default function ImageModal({closeModal}) {

  const [pre,setPre] = useState(null)
  const formRef = useRef()
  const notify = toast
  const dispatch = useDispatch()
  const [isLoading,setIsLoading] = useState(false)
  const userToken = localStorage.getItem("user_token")
  const [image, setImage] = useState({
    name: "",
    description: "",
    img:''
  });

  const handleChange = (e) => {
    setImage({ ...image, [e.target.id]: e.target.value });
  };

  const handleSetFile = (e)=>{
    setPre(URL.createObjectURL(e.target.files[0]))
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(formRef.current);
    try {
      setIsLoading(true)
      const {data} = await axios.post(`${process.env.VITE_BASE_URL}/api/v1/image/add`, formData, {
        headers: {
          "Authorization": `Bearer ${userToken}`,
          "Content-Type": "multipart/form-data",
        },
      });
      if (data?.success) {
        setImage({
        name: "",
        description: "",
        img:''
      })
        setIsLoading(false)
        dispatch(fetchImages(userToken));
        notify.success("Image added successfully");
        closeModal()
      }
    } catch (err) {
      setIsLoading(false)
      const error = err?.response?.data?.msg;
      notify(error);
    }
  };

  useEffect(() => {
    document.body.style.overflowY = "hidden";
  
    return () => {
      document.body.style.overflowY = "scroll";
    }
  }, [])
  

  return (
    <div>
      <div onClick={closeModal} className="modal-wrapper fixed top-0 bottom-0 left-0 right-0 bg-black opacity-75"></div>
      <div className="fixed z-0 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4/12 bg-[#36485e] p-4 rounded-2xl">
        <div className="flex justify-between ">
          <span className="text-lg text-slate-400">Add Image</span>
          <button onClick={closeModal}>
            <img className="h-6" src="/img/cross.png" alt="" />
          </button>
        </div>
        <form
          onSubmit={handleSubmit}
          ref={formRef}
          className="w-full flex flex-col gap-4 p-8 rounded-xl"
        >
          <div className="flex flex-col gap-1">
            <label className="text-white" htmlFor="name">
              Name
            </label>
            <input
              name="name"
              onChange={handleChange}
              required
              className="text-sm border-b-[1px] text-gray-400 outline-none leading-7 border-solid border-slate-500 bg-transparent"
              id="name"
              type="text"
              value={image.name}
              placeholder="Enter your full name"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-white" htmlFor="description">
              Description
            </label>
            <input
              name="description"
              onChange={handleChange}
              required
              className="text-sm border-b-[1px] text-gray-400 outline-none leading-7 border-solid border-slate-500 bg-transparent"
              id="description"
              type="string"
              value={image.description}
              placeholder="Enter the description"
            />
          </div>
          <div >
            <label htmlFor="img" className="text-md text-white block">
              Image
            </label>
            <div className="flex flex-col items-center mt-2">
              <label
                htmlFor="img"
                className="inline-block mr-4 cursor-pointer"
              >
                <div className="flex justify-center items-center h-44 w-[22rem] my-4 bg-slate-800 rounded-2xl">
                    {
                        pre?<img className="w-full h-full object-contain rounded-2xl" src={pre} alt="" />:<img className="" src="/img/upload.png"/>
                    }
                </div>
                
              </label>
              <input
                name="file"
                type="file"
                id="img"
                value={image.img}
                onChange={(e) => {
                  handleChange(e);
                  handleSetFile(e);
                }}
                required
                className="file:bg-transparent hidden cursor-pointer xs:max-md:text-sm w-3/5 md:max-lg:w-4/5 xs:max-md:w-4/5 file:border-2 file:rounded-2xl file file:border-white text-white file:text-white"
              />
            </div>
          </div>
          <div className="">
            <button
              className="p-2 w-full text-sm font-normal text-white rounded-3xl bg-[#5ccebf]"
              type="submit"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
