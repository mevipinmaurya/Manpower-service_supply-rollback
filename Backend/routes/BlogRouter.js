import express from 'express'
import { addBlog, delBlog, getBlog, updateBlog } from '../controllers/BlogController.js'

const blogRouter = express.Router()

blogRouter.post('/addblog', addBlog)
blogRouter.get('/getblog', getBlog)
blogRouter.post('/delblog', delBlog)
blogRouter.post('/updateblog', updateBlog)

export default blogRouter