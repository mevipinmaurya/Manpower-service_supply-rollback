import mongoose from 'mongoose'
const Schema = mongoose.Schema;


const cartItemSchema = new Schema({
    serviceId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Service',
        required: true
    },
    // quantity: { type: Number, default: 1, required: true },
    priceAtAddition: { type: Number, required: true },
})


const cartSchema = new Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        unique: true,
    },
    items: [cartItemSchema],
    updatedAt: {
        type: Date,
        default: Date.now,
    }
})


const Cart = mongoose.models.Cart || mongoose.model('Cart', cartSchema)
export default Cart;