import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import axiosInstance from "../../utils/axiosInterceptor";
import urls from "../../utils/Constants";
import moment from "moment";
import Loader from "../../components/Loader";
import { useSelector } from "react-redux";

function BlogDetail() {
  const slug = useParams().slug;
  const [loading, setloading] = useState(false);
  const [blog, setblog] = useState();
  const navigate = useNavigate();

  const getBlogDetails = async () => {
    setloading(true);
    let response = await axiosInstance.get(
      `${urls.baseUrl}${urls.blogs}/${slug}`
    );
    if (response.data.success) {
      setloading(false);
      setblog(response.data.data);
    } else {
      setloading(false);
      navigate("/");
      alert("something went wrong!!");
    }
  };

  const user = useSelector((state) => state.user);

  const handleDelete = async () => {
    const result = window.confirm("Do you want to delete?");
    if (result) {
      const response = await axiosInstance.delete(
        `${urls.baseUrl}${urls.blogs}/${slug}`
      );

      if (response.data.success) {
        navigate(`/`);
      } else {
        alert("Something went wrong please try again later!!");
      }
    } else {
      console.log("User clicked Cancel");
    }
  };

  useEffect(() => {
    getBlogDetails();
    return () => {};
  }, []);

  return (
    <>
      {loading && <Loader />}
      {blog && !loading && (
        <div className="max-w-2xl px-6 py-16 mx-auto space-y-12">
          <article className="space-y-8 dark:bg-gray-100 dark:text-gray-900">
            {user && user._id == blog.author._id && (
              <div className="flex justify-end">
                <img
                  onClick={() => {
                    navigate(`/blog/${slug}/edit`);
                  }}
                  className="cursor-pointer py-2"
                  width="20"
                  height="20"
                  src="https://img.icons8.com/ios-glyphs/30/edit--v1.png"
                />
                <img
                  onClick={() => {
                    handleDelete();
                  }}
                  className="cursor-pointer py-2"
                  width="20"
                  height="20"
                  src="https://img.icons8.com/material-sharp/24/filled-trash.png"
                  alt="filled-trash"
                />
              </div>
            )}
            <div className="space-y-6">
              <h1 className="text-4xl font-bold md:tracking-tight md:text-5xl">
                {blog?.title}
              </h1>
              <div className="flex flex-col items-start justify-between w-full md:flex-row md:items-center dark:text-gray-600">
                <div className="flex items-center md:space-x-2">
                  <img
                    src="https://source.unsplash.com/75x75/?portrait"
                    alt=""
                    className="w-4 h-4 border rounded-full dark:bg-gray-500 dark:border-gray-300"
                  />
                  <p className="text-sm">
                    {blog?.author?.userName} •{" "}
                    {moment(blog?.createdAt).format("DD-MMM-YYYY")}
                  </p>
                </div>
              </div>
            </div>
            <div className="dark:text-gray-800 text-left">
              <p>
                <ReactMarkdown>{blog?.content}</ReactMarkdown>
              </p>
            </div>
          </article>
        </div>
      )}
    </>
  );
}

export default BlogDetail;
