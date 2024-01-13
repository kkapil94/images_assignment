import React from 'react'

export default function Navbar() {
  return (
    <>
        <nav>
            <div className='flex justify-between items-center p-8 '>
                <span><img className='w-12' src="/img/logo.png" alt="" /></span>
                <div className='flex mr-3'>
                    <div className='w-20 h-8 flex justify-center items-center rounded-l-2xl text-gray-400 bg-gray-500'>Sign In</div>
                    <div className='w-20 h-8 flex justify-center items-center rounded-r-2xl  bg-slate-200'>Sign Up</div>
                </div>
            </div>
        </nav>
    </>
  )
}
