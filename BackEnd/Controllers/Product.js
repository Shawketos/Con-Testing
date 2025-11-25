const Product = require('../Models/Product');
const mongoose = require('mongoose');


const createProduct = async (req, res) => {
    if (req.user.role !== 'admin') {
        return res.status(403).json({ msg: 'Unauthorized action' });
    }
    try {
        const { name, description, price, stock } = req.body;

        // Validation
        if (!name || typeof name !== 'string' || name.trim() === '') {
            return res.status(400).json({ error: 'Invalid product name' });
        }
        if (typeof price !== 'number' || price <= 0) {
            return res.status(400).json({ error: 'Invalid price' });
        }
        if (typeof stock !== 'number' || stock < 0) {
            return res.status(400).json({ error: 'Invalid stock quantity' });
        }

        const newProduct = await Product.create({ name, description, price, stock });
        res.status(201).json({ message: 'Product added successfully', product: newProduct });
    } catch (error) {
        console.error('Error adding product:', error.message);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const updateProduct = async (req, res) => {
    if (req.user.role !== 'admin') {
        return res.status(403).json({ msg: 'Unauthorized action' });
    }
    try {
        const { productId } = req.params;

        // Validate productId
        if (!mongoose.Types.ObjectId.isValid(productId)) {
            return res.status(400).json({ error: 'Invalid product ID' });
        }

        const product = await Product.findByIdAndUpdate(
            productId,
            req.body,
            { new: true, runValidators: true }
        );

        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }
        res.json({ message: 'Product updated successfully', product });
    } catch (error) {
        console.error('Error updating product:', error.message);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const deleteProduct = async (req, res) => {
    if (req.user.role !== 'admin') {
        return res.status(403).json({ msg: 'Unauthorized action' });
    }
    try {
        const { productId } = req.params;

        // Validate productId
        if (!mongoose.Types.ObjectId.isValid(productId)) {
            return res.status(400).json({ error: 'Invalid product ID' });
        }

        const product = await Product.findByIdAndDelete(productId);
        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }
        res.status(200).json({ message: 'Product deleted successfully' });
    } catch (error) {
        console.error('Error deleting product:', error.message);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const buildSearchQuery = (term) => {
    if (!term) {
        return {};
    }

    return {
        $or: [
            { name: { $regex: term, $options: 'i' } },
            { description: { $regex: term, $options: 'i' } },
        ],
    };
};

const searchProducts = async (req, res) => {
    try {
        const rawQuery = req.query.query || '';
        const searchTerm = rawQuery.trim();
        const mongoQuery = buildSearchQuery(searchTerm);

        const products = await Product.find(mongoQuery)
            .sort({ createdAt: -1 })
            .limit(24);

        const message =
            products.length > 0
                ? 'Products fetched successfully'
                : searchTerm
                ? 'No products matched your search'
                : 'No products available yet';

        res.status(200).json({ message, products });
    } catch (error) {
        console.error('Error searching products:', error.message);
        res.status(500).json({ error: 'Internal server error' });
    }
};



module.exports = {

    createProduct,
    updateProduct,
    deleteProduct,
    searchProducts
};
