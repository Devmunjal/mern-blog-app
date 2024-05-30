const asyncHandler = require("express-async-handler");
const Blog = require("../../models/blogs");

const all = asyncHandler(async (req, res) => {
  const { page, perPage } = req.query;
  let skip = page && perPage ? page * perPage : 0;
  let limit = perPage ? parseInt(perPage) : 20;
  const blogs = await Blog.find().populate("author").skip(skip).limit(limit);
  return res.status(200).send({
    success: true,
    message: "Blogs fetched",
    data: blogs,
  });
});

const details = asyncHandler(async (req, res) => {
  const { slug } = req.params;
  const blog = await Blog.findOne({ slug: slug }).populate("author");
  if (!blog) return res.status(404).send("Blog not found");
  return res.status(200).send({
    success: true,
    message: "Story Details",
    data: blog,
  });
});

const edit = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  const { slug } = req.params;
  const { title, content } = req.body;
  if (!title) return res.status(500).send("Please enter title");
  if (!content) return res.status(500).send("Please enter content");
  const blog = await Blog.findOneAndUpdate(
    { slug: slug, author: _id },
    { title: title, content: content, updatedAt: Date() },
    { $new: true }
  );
  if (!blog) {
    return res.status(500).send("This blog is not allowed to update.");
  }
  return res.status(200).send({
    success: true,
    message: "Blog update successfully",
    data: blog,
  });
});

const deleteBlog = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  const { slug } = req.params;
  let blog = await Blog.findOneAndDelete({ slug: slug, author: _id });
  if (!blog) {
    return res.status(500).send("You are not allowed to perform this action.");
  }
  return res.status(200).send({
    success: true,
    message: "Blog delete successfully.",
    data: "Blog delete successfully.",
  });
});

const create = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  const { title, content } = req.body;
  if (!title) return res.status(500).send("Please enter title");
  if (!content) return res.status(500).send("Please enter content");
  const blog = await Blog.create({
    title: title,
    content: content,
    author: _id,
  });
  return res.status(200).send({
    success: true,
    message: "Blog created successfully",
    data: blog,
  });
});

const like = asyncHandler(async (req, res) => {
  const { slug } = req.params;
  const { _id } = req.user;
  const { action } = req.body;

  const blog = await Blog.findOne({ slug: slug });

  if (!blog) {
    return res.status(404).send("Blog not found.");
  }

  if (action == "like") {
    await Blog.findOneAndUpdate(
      { slug: slug },
      {
        $addToSet: { likes: _id },
      }
    );
  } else if (action == "dislike") {
    await Blog.findOneAndUpdate(
      { slug: slug },
      {
        $pull: { likes: _id },
      }
    );
  } else {
    return res.status(500).send("Action is not handled.");
  }

  return res.status(200).send({
    success: true,
    message: `${action.toUpperCase()} is done successfully.`,
    data: `${action.toUpperCase()} is done successfully.`,
  });
});

module.exports = {
  all,
  details,
  edit,
  deleteBlog,
  create,
  like,
};
