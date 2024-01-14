import React from 'react'
import ImageCard from './ImageCard'

export default function ImagesComponent() {
  return (
    <>
        <section>
          <div className='mt-32'>
            <h2 className='text-center text-5xl underline underline-offset-4 text-white'>Images</h2>
            <div className="grid justify-items-center grid-cols-3 gap-8 my-20">
              <ImageCard/>
              <ImageCard/>
              <ImageCard/>
              <ImageCard/>
              <ImageCard/>
              <ImageCard/>
            </div>
          </div>
        </section>
    </>
  )
}
