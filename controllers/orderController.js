const Order = require('../models/order');
const Product = require('../models/product');

// Function to get all orders
exports.getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find().populate('username', 'username').populate('products', 'name');
        res.status(200).json(orders);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

// Function to create a new order
exports.createOrder = async (req, res) => {
    try {
        const { username, products, status } = req.body;

        // Fetch the details of the products included in the order
        const productsInOrder = await Product.find({ _id: { $in: products } });

        // Calculate the total amount by summing up the prices of all products
        const totalAmount = productsInOrder.reduce((total, product) => total + product.price, 0);

        const newOrder = new Order({
            username,
            products,
            totalAmount,
            status
        });

        await newOrder.save();
        res.status(201).json({ msg: 'Order created successfully', order: newOrder });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};