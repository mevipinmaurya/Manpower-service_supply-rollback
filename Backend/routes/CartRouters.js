import express from 'express'
import authMiddleware from '../middleware/authMiddleware.js'
import { addToCart, fetchCartItems, removeFromCart } from '../controllers/CartController.js'

const cartRouter = express.Router()

cartRouter.post('/addtocart', authMiddleware, addToCart)
cartRouter.post('/removefromcart', authMiddleware, removeFromCart)
cartRouter.post('/fetchcartitems', authMiddleware, fetchCartItems)

export default cartRouter;