
const mongoose = require("mongoose")
const slugify = require("slugify")

const BlogSchema = new mongoose.Schema({
    author: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true
    },
    slug: {type: String, unique: true},
    title: {
        type: String,
        required: [true, "Please provide a title"],
        unique: true,
        minlength: [4, "Please provide a title least 4 characters "],
    },
    content: {
        type: String,
        required: [true, "Please a provide a content "],
        minlength: [10, "Please provide a content least 10 characters "],
        maxlength: [6000, "Content cannot exceed 1000 characters"]
    },
    likes: [{
        type: mongoose.Schema.ObjectId,
        ref: "User"
    }]

}, { timestamps: true })

BlogSchema.index({ slug: 1 }, { unique: true });

BlogSchema.pre("save",  function (next) {
    if (!this.isModified("title")) {
        next();
    }
    this.slug = this.makeSlug()
    next()
})


BlogSchema.methods.makeSlug = function () {
    return slugify(this.title, {
        replacement: '-',
        remove: /[*+~.()'"!:@/?]/g,
        lower: true,
        strict: false,
        locale: 'tr',
        trim: true
    })
}

const Blog = mongoose.model("blog", BlogSchema)

module.exports = Blog;