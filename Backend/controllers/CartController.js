import Cart from '../models/CartModel.js'
import Service from '../models/ServiceModel.js'


// Adding Items to cart
const addToCart = async (req, res) => {
    try {
        // const userId = req.user;
        const { userId, serviceId } = req.body;
        const service = await Service.findById(serviceId);
        if (!service) {
            return res.json({
                success: false,
                message: "Service not found!",
            })
        }

        const price = parseFloat(service.price)     // Converting String to number
        let cart = await Cart.findOne({ userId })
        if (!cart) {
            cart = new Cart({ userId, items: [] })
        }
        
        cart.items.push({
            serviceId,
            priceAtAddition: price
        })

        cart.updateAt = new Date();
        await cart.save()

        res.json({
            success: true,
            message: "Item added to cart",
            updatedCart : cart.items
        })

    } catch (error) {
        res.json({
            success: false,
            message: "Some Error Occured!"
        })
    }
}

// Deleting items from the cart
const removeFromCart = async (req, res) => {
    try {
        const userId = req.user;
        const { serviceId } = req.body;

        // Check service exists
        const service = await Service.findById(serviceId);
        if (!service) {
            return res.json({
                success: false,
                message: "Service not found!"
            });
        }

        if (!userId) {
            return res.json({
                success: false,
                message: "Something went wrong!!"
            });
        }

        const cart = await Cart.findOne({ userId });
        if (!cart) {
            return res.json({
                success: false,
                message: "Cart not found!"
            });
        }

        const existingItem = cart.items.find(
            (item) => item.serviceId.toString() === serviceId
        );

        if (!existingItem) {
            return res.json({
                success: false,
                message: "Item not found in the cart!"
            });
        }

        // Remove the item from the array
        cart.items = cart.items.filter(     // Filter() function is used to create the new array that includes only the elements that pass a certain condition
            (item) => item.serviceId.toString() !== serviceId
        );

        await cart.save();

        return res.json({
            success: true,
            message: "Cart updated successfully.",
            updatedCart : cart.items
        });

    } catch (error) {
        // console.error(error);
        res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
};


// Fetching cart items (for logged in users)
const fetchCartItems = async (req, res) => {
    try {
        const { userId } = req.body;
        if (!userId) {
            return res.json({
                success: false,
                message: "Access Denied"
            })
        }

        const userCart = await Cart.findOne({ userId })
        if (!userCart) {
            return res.json({
                success: false,
                message: "user not found!"
            })
        }

        const userCartItems = userCart.items;
        res.json({
            success: true,
            message: "User cart items fetched",
            userCart: userCartItems
        })
    } catch (error) {
        res.json({
            success: false,
            message: "Some error occured"
        })
    }
}

export { addToCart, removeFromCart, fetchCartItems }