// controllers/productController.js
const multer = require('multer');
const Product = require('../models/product');

exports.getAllProducts = async (req, res) => {
    // Implement logic to fetch all products
    try{
        const products = await Product.find();
        if(products.length === 0){
            res.status(404).json({msg:'Products not found'})
        }
        res.status(200).json(products);
    }catch(err){
        console.error(err.message);
        res.status(500).send('Server Error')
    }

};
exports.addProduct = async (req, res) => {
    // Implement logic to fetch all products
    try{
        const {name, description, price, category,subcategory} = req.body;
        const image = req.file.path; //get the path of the uploaded image

        const newProduct = new Product({
            name,
            description,
            price,
            category,
            image,
            subcategory
        })
        await newProduct.save();
        res.status(201).json({msg:'Product Created Successfully', product:newProduct})
    }
    catch(err){
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};
exports.editProduct = async (req, res) => {
    // Implement logic to fetch all products
try{
    const productId =  req.params.id;
    const {name,description,category,price,subcategory} = req.body;

    const product = await Product.findById(productId);

    if(!product){
        return res.status(404).json({msg:'Product not found'})
    }
    // Update the product fields with the new values
    product.name = name;
    product.description = description;
    product.price = price;
    product.category = category;
    product.subcategory = subcategory;

    // Check if a new image is uploaded
    if(req.file){
        product.image = req.file.path;
    }

    await product.save();

    res.status(200).json({msg:'Product updated Successfully!',product})
}
catch(err){
    console.error(err.message)
    res.status(500).send('Server Error')
}
};
exports.updateProductImage = async (req, res) => {
    try {
        const productId = req.params.id;

        const product = await Product.findById(productId);

        if (!product) {
            return res.status(404).json({ msg: 'Product not found' });
        }

        // Update the image field with the new image path
        product.image = req.file.path;

        await product.save();

        res.status(200).json({ msg: 'Product image updated successfully!', product });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

exports.deleteProduct = async (req, res) => {
    // Implement logic to delete a product
    try{
        const productId = req.params.id;
        const deleteProduct =  await Product.findByIdAndDelete(productId);
        if(!deleteProduct){
            return res.status(404).json({msg:"Product not found"})
        }
        res.status(200).json({msg:'Product Deleted Successfully!'})
    }catch(err){

        res.status(500).send('Server Error');
    }
};
