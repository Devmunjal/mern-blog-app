import React, { useEffect, useState } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { convertMarkdownToHTML, htmlToMarkdown } from "../../utils/helpers";
import axiosInstance from "../../utils/axiosInterceptor";
import urls from "../../utils/Constants";
import { useNavigate, useParams } from "react-router-dom";

function CreateBlog(props) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const navigate = useNavigate();

  const handleCreate = async () => {
    if (!title) {
      alert("Please enter title");
      return;
    }
    if (!content) {
      alert("Please enter content");
      return;
    }
    const markdown = await htmlToMarkdown(content);
    const response = await axiosInstance.post(`${urls.baseUrl}${urls.blogs}`, {
      title: title,
      content: markdown,
    });

    if (response.data.success) {
      navigate("/");
    } else {
      alert("Something went wrong please try again later!!");
    }
  };

  const slug = useParams()?.slug;

  const getBlogDetails = async () => {
    let response = await axiosInstance.get(
      `${urls.baseUrl}${urls.blogs}/${slug}`
    );
    if (response.data.success) {
      setTitle(response.data.data.title);
      setContent(convertMarkdownToHTML(response.data.data.content));
    } else {
      navigate("/");
      alert("something went wrong!!");
    }
  };

  const handleUpdate = async () => {
    if (!title) {
      alert("Please enter title");
      return;
    }
    if (!content) {
      alert("Please enter content");
      return;
    }

    const markdown = await htmlToMarkdown(content);
    const response = await axiosInstance.put(
      `${urls.baseUrl}${urls.blogs}/${slug}`,
      {
        title: title,
        content: markdown,
      }
    );

    if (response.data.success) {
      navigate(`/blog/${slug}`);
    } else {
      alert("Something went wrong please try again later!!");
    }
  };

  useEffect(() => {
    if (slug) {
      getBlogDetails();
    }
    return () => {};
  }, []);

  return (
    <>
      <div className="mt-5">
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <div className="flex items-center justify-between">
            <label
              htmlFor="password"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Title
            </label>
          </div>
          <div className="mt-2">
            <input
              id="text"
              name="text"
              type="text"
              required
              onChange={(e) => {
                setTitle(e.target.value);
              }}
              value={title}
              className="block w-full rounded-md border-0 py-1.5 pl-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>

        <div className="md:flex md:justify-center mt-5">
          <CKEditor
            editor={ClassicEditor}
            onChange={(e, editor) => {
              const data = editor.getData();
              setContent(data);
            }}
            data={content}
          />
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm items-end">
          <button
            onClick={() => {
              slug ? handleUpdate() : handleCreate();
            }}
            className="bg-blue-700 p-1 rounded-md w-20 text-white"
          >
            {slug ? "Update" : "Create"}
          </button>
        </div>
      </div>
    </>
  );
}

export default CreateBlog;
