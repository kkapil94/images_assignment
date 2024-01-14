import React from "react";

export default function ImageCard({ img }) {
  return (
    <>
      <div className="border-2 xs:max-sm:w-[17rem] sm:max-md:w-80 w-[23rem]  bg-[#0d1b2a] border-solid border-white rounded-2xl">
        <span>
          <img
            className="rounded-t-2xl w-full"
            src="https://t3.gstatic.com/licensed-image?q=tbn:ANd9GcS4WH3Cpe1X75X4LhbHdyJo3vPEs0ufiHQhHjkqEnMjbPqViSEVI-nqF0NpeLscSR-7"
            alt=""
          />
        </span>
        <div className="xs:max-md:px-4 px-6 xs:max-md:mt-0 mt-4">
          <h4 className="xs:max-md:text-sm text-xl text-white xs:max-md:my-2 my-6">
            flowers
          </h4>
          <p className="xs:max-md:text-xs text-gray-300">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga
            pariatur, repudiandae possimus cum doloribus, quo vitae
            reprehenderit dignissimos nam optio explicabo qui ipsam.
          </p>
          <div className="my-6">
            <a href target="_blank">
              <button className="group rounded-3xl bg-white py-1 xs:max-md:text-sm xs:max-md:px-2 px-4">
                Check it out
                <img
                  className="transition-all duration-150 ease-in-out inline group-hover:relative relative left-0 group-hover:left-1 ml-3 xs:max-md:w-4"
                  // src="/images/next.png"
                  alt=""
                />
              </button>
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
