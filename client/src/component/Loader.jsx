import React, { useEffect } from "react";
import { Blocks } from "react-loader-spinner";

export default function Loader() {
  useEffect(() => {
    document.body.style.overflowY = "hidden";
  
    return () => {
      document.body.style.overflowY = "scroll";
    }
  }, [])
  return (
    <>
      <div className="modal-wrapper fixed top-0 bottom-0 left-0 right-0 bg-black opacity-75 "></div>
      <Blocks
        height="80"
        width="80"
        color="#5ccebf"
        ariaLabel="blocks-loading"
        wrapperStyle={{}}
        wrapperClass="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2  rounded-2xl"
        visible={true}
      />
    </>
  );
}
