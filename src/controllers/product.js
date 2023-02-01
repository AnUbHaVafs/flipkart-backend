const Product = require('../models/Product');
const slugify = require('slugify');
exports.createProduct = (req, res) => {
    // res.status(200).json({ message: 'Hello' });
    // res.status(200).json({ files: req.files, body: req.body });
    const { name, price, description, category, quantity, createdBy } = req.body;

    let productPictures = [];

    if (req.files.length > 0) {
        productPictures = req.files.map(file => {
            return { img: file.filename };
        });
    }




    const product = new Product({
        name: name,
        slug: slugify(name),
        price,
        description,
        quantity,
        productPictures,
        category,
        createdBy: req.user._id
    })
    product.save((error, product) => {
        if (error) res.status(400).json({ error });
        if (product) {
            res.status(201).json({ product });
        }
    })
}