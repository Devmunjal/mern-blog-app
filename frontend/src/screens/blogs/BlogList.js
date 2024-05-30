import React, { useEffect, useState } from "react";
import Cards from "../../components/Cards";
import { useDispatch, useSelector } from "react-redux";
import { updateToken, updateUser } from "../../store/action";
import { Link } from "react-router-dom";
import axiosInstance from "../../utils/axiosInterceptor";
import urls from "../../utils/Constants";
import Loader from "../../components/Loader";

function BlogList() {
  const [blogs, setblogs] = useState([]);
  const [loading, setloading] = useState(false);

  const getBlogs = async () => {
    setloading(true);
    const response = await axiosInstance.get(`${urls.baseUrl}${urls.blogs}`);
    if (response.data.success) {
      setblogs(response.data.data);
      setloading(false);
    } else {
      setloading(false);
      alert("Something went wrong please try again later!!");
    }
  };

  useEffect(() => {
    getBlogs();
    return () => {};
  }, []);

  const user = useSelector((state) => state.user);

  return (
    <>
      {loading && <Loader />}
      {!loading && (
        <div className="bg-white py-10 sm:py-10">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            {Object.keys(user).length != 0 && (
              <div className="flex justify-end">
                <Link
                  to="/blog/add"
                  className="bg-blue-700 p-1 rounded-md w-20 text-white"
                >
                  Create
                </Link>
              </div>
            )}
            <div className="mx-auto max-w-2xl lg:mx-0 text-left">
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                Blogs
              </h2>
              <p className="mt-2 text-lg leading-8 text-gray-600">
                Learn how to grow your business with our expert advice.
              </p>
            </div>
            <div className="mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 border-t border-gray-200 pt-10 sm:mt-16 sm:pt-16 lg:mx-0 lg:max-w-none lg:grid-cols-3">
              {blogs.map((blog) => (
                <Cards blog={blog} />
              ))}
              {blogs.length == 0 && <p>No Blog Found. Please login and create</p>}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default BlogList;
