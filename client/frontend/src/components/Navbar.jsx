import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="relative w-full bg-white my-6">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-2 sm:px-6 lg:px-8">
        <Link to="/">
          <div className="inline-flex items-center space-x-2 cursor-pointer">
            <span className="font-bold">Attendance GPT</span>
          </div>
        </Link>
        <div className="gap-x-4 lg:flex items-center">
          {localStorage.getItem("user") ? (
            <h2>
              Welcome,{" "}
              <span className="font-bold text-purple-500">
                {JSON.parse(localStorage.getItem("user"))}
              </span>
            </h2>
          ) : (
            <div></div>
          )}
          {localStorage.getItem("user") ? (
            <button
              type="button"
              className="rounded-md border border-black px-3 py-2 text-sm font-semibold text-black shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
              onClick={() => {
                localStorage.removeItem("user");
                window.location.reload();
              }}
            >
              Log Out
            </button>
          ) : (
            <div></div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
