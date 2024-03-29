const Cart = require('../models/cart');
const User = require('../models/user'); // Import the User model

// Function to get cart items for a user
exports.getCartItems = async (req, res) => {
    try {
        const userId = req.user.id; // Assuming you have middleware to extract user ID from the request
        const cart = await Cart.findOne({ user: userId }).populate('items.product');
        res.status(200).json(cart);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

// Function to add an item to the cart
exports.addToCart = async (req, res) => {
    try {
        const userId = req.user.id; // Assuming you have middleware to extract user ID from the request
        const { product, quantity } = req.body;

        let cart = await Cart.findOne({ user: userId });

        if (!cart) {
            // If the cart doesn't exist for the user, create a new one
            cart = new Cart({ user: userId, items: [] });
        }

        // Check if the product already exists in the cart
        const existingItem = cart.items.find(item => item.product.toString() === product);

        if (existingItem) {
            // If the product already exists, update its quantity
            existingItem.quantity += quantity;
        } else {
            // If the product doesn't exist, add it to the cart
            cart.items.push({ product, quantity });
        }

        await cart.save();
        res.status(200).json(cart);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};
