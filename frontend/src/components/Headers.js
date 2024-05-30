import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { updateToken, updateUser } from "../store/action";

function Headers() {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  return (
    <>
      <nav class="bg-gray-800">
        <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div class="flex h-16 items-center justify-between">
            <div class="flex items-center">
              <div class="flex-shrink-0">
                <img
                  class="h-8 w-8"
                  src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
                  alt="Your Company"
                />
              </div>
            </div>
            <div>
              {Object.keys(user).length == 0 && (
                <Link
                  to="/login"
                  className="rounded-md font-medium bg-gray-900 p-2"
                >
                  <span className="text-white">Login / Register</span>
                </Link>
              )}
              {Object.keys(user).length != 0 && (
                <span onClick={() => {
                  localStorage.clear();
                  dispatch(updateToken(''));
      dispatch(updateUser({}));
                }} className="text-white cursor-pointer">
                  Logout
                </span>
              )}
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Headers;
