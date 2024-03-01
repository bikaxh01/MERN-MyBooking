import React from "react";
import { Link } from "react-router-dom";


function Header() {
  return (
    <div className=" bg-blue-800 py-6 ">
      <div className=" container mx-auto flex justify-between">
        <span className=" text-3xl text-white font-bold tracking-tight">
          <Link to="/">MyBooking.com</Link>
        </span>
        <span className=" flex space-x-2">
          <Link
            to="/sign-in"
            className=" flex items-center rounded-full p-2 bg-slate-100 text-blue-600 px-3 font-bold  hover:bg-slate-300"
          >
            Sign-In
          </Link>
        </span>
      </div>
    </div>
  );
}

export default Header;
