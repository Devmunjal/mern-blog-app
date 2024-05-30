import React from "react";
import moment from "moment";
import ReactMarkdown from "react-markdown";

function Cards({ blog }) {
  return (
    <>
      <article
        key={blog?._id}
        className="flex max-w-xl flex-col items-start justify-between"
      >
        <div className="flex items-center gap-x-4 text-xs">
          <time dateTime={blog?.createdAt} className="text-gray-500">
            {moment(blog?.createdAt).format("DD-MMM-YYYY")}
          </time>
        </div>
        <div className="group relative text-left">
          <h3 className="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
            <a href={`/blog/${blog?.slug}`}>
              <span className="absolute inset-0" />
              {blog.title}
            </a>
          </h3>
          <p className="mt-5 text-sm leading-6 text-gray-600 overflow-hidden line-clamp-5">
            <ReactMarkdown>{blog.content}</ReactMarkdown>
          </p>
        </div>
        <div className="relative mt-8 flex items-center gap-x-4">
          <img
            src="https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
            alt=""
            className="h-10 w-10 rounded-full bg-gray-50"
          />
          <div className="text-sm leading-6">
            <p className="font-semibold text-gray-900">
              <span>
                <span className="absolute inset-0" />
                {blog.author.userName}
              </span>
            </p>
          </div>
        </div>
      </article>
    </>
  );
}

export default Cards;
