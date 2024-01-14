import React, { useState } from 'react'
import ImageModal from './ImageModal';

export default function AddImageModal() {
    const [open,setOpen] = useState(false);
    const close = ()=>setOpen(false)

  return (
    <>
        <button onClick={()=>setOpen(true)} className='w-36 h-8 cursor-pointer flex justify-center items-center rounded-2xl bg-[#5ccebf] text-white'>
            Add Image
        </button>
        {open&&<ImageModal closeModal={close}/>}
    </>
  )
}
