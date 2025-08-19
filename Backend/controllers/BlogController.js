import BlogModel from "../models/BlogModel.js"


// Add Blog
const addBlog = async (req, res) => {

    const blog = new BlogModel({
        title: req.body.title,
        description: req.body.description,
        category: req.body.category,
        image: req.body.image
    })

    try {
        await blog.save()
        res.json({
            success: true,
            message: "Blog Added Successfully."
        })
    } catch (error) {
        res.json({
            success: false,
            message: "Failed !"
        })
    }
}


// Get Blog
const getBlog = async (req, res) => {
    try {
        const blogs = await BlogModel.find({})
        res.json(
            {
                success: true,
                message: blogs
            }
        )
    } catch (error) {
        res.json(
            {
                success: false,
                message: "Some Error Occured !"
            }
        )
    }
}


// Remove Blog
const delBlog = async (req, res) => {
    try {
        await BlogModel.findByIdAndDelete(req.body.id);
        res.json({
            success: true,
            message: "Blog Deleted"
        })
    } catch (error) {
        res.json({
            success: false,
            message: "Some error occured"
        })
    }
}


// Update Blog
const updateBlog = async (req, res) => {
    try {
        const { title, description, category, image } = req.body;
        const blog = await BlogModel.findByIdAndUpdate(req.body.id, {
            title: title,
            description: description,
            category: category,
            image: image
        })

        await blog.save();
        res.json({
            success : true,
            message : "Blog Updated"
        })
    } catch (error) {
        res.json({
            success : false,
            message : "Failed to update !"
        })
    }
}

export { addBlog, getBlog, delBlog, updateBlog }