import React from "react";
import ImageCard from "./ImageCard";
import AddImageModal from "../component/AddImageModal"
import { useSelector } from "react-redux";

export default function ImagesComponent() {
  const { images } = useSelector((state) => state.images);
  return (
    <>
      <section>
        <div className="mt-32">
          <h2 className="text-center text-5xl underline underline-offset-4 text-white">
            Images
          </h2>
          {images.length ? (
            <div className="grid justify-items-center grid-cols-3 gap-8 my-20">
              {images?.map((image) => (
                <ImageCard image={image} key={image._id}/>
              ))}
            </div>
          ) : (
            <div className="flex flex-col gap-8 items-center my-20">
              <span className="text-2xl text-slate-500">No images here!</span>
              <AddImageModal/>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
