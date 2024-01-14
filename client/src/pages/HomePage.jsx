import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { setUser } from "../features/users/userSlice";
import ImagesComponent from "../component/ImagesComponent";

export default function HomePage() {
  const userToken = localStorage.getItem("user_token");
  const notify = toast;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const getUser = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:4000/api/v1/auth/get-user",
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        }
      );
      dispatch(setUser(data.user));
    } catch (err) {
      localStorage.removeItem("user_token");
      navigate("/login");
      notify.error(err.msg);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <>
      <main>
        <div className="px-8">
          <div className="flex flex-col items-center mt-8">
            <div>
              <span>
                <img className="w-72" src={user?.avatar} alt="" />
              </span>
              <div className="text-center mt-4 text-2xl text-white">
                {user.name}
              </div>
            </div>
            <div className="mt-8 flex gap-8 ">
              <span className="w-32 p-2 text-center text-sm rounded-2xl text-white bg-[#5ccebf]">
                100 images
              </span>
              <span className="w-32 p-2 text-center text-sm rounded-2xl text-white bg-[#5ccebf]">
                100 views
              </span>
            </div>
          </div>
          <div>
            <ImagesComponent />
          </div>
        </div>
      </main>
    </>
  );
}
