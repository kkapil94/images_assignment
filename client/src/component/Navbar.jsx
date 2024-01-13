import React from "react";
import { Link, useLocation } from "react-router-dom";

export default function Navbar() {
  const { pathname } = useLocation();
  const user = localStorage.getItem("user_token");
  console.log(user);
  return (
    <>
      <nav>
        <div className="flex justify-between items-center p-8 ">
          <span>
            <img className="w-12" src="/img/logo.png" alt="" />
          </span>

          {user ? (
            <div className="w-36 h-8 cursor-pointer flex justify-center items-center rounded-2xl bg-[#5ccebf] text-white">
              Logout
            </div>
          ) : (
            <div className="flex mr-3">
              <Link to="/login">
                <div
                  className={
                    pathname === "/login"
                      ? "w-20 h-8 cursor-pointer flex justify-center items-center rounded-l-2xl bg-[#5ccebf] text-white"
                      : "w-20 h-8 cursor-pointer flex justify-center items-center rounded-l-2xl text-gray-400 bg-gray-600"
                  }
                >
                  Sign In
                </div>
              </Link>
              <Link to="/register">
                <div
                  className={
                    pathname === "/register"
                      ? "w-20 h-8 cursor-pointer flex justify-center items-center rounded-r-2xl  bg-[#5ccebf] text-white"
                      : "w-20 h-8 cursor-pointer flex justify-center items-center rounded-r-2xl  text-gray-400 bg-gray-600"
                  }
                >
                  Sign Up
                </div>
              </Link>
            </div>
          )}
        </div>
      </nav>
    </>
  );
}
