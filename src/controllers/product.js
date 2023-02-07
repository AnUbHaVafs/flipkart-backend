const Product = require('../models/Product');
const slugify = require('slugify');
const Category = require('../models/category');

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

exports.getProductsBySlug = (req, res) => {
    const { slug } = req.params;
    Category.findOne({ slug: slug })
        .select('_id')
        .exec((error, category) => {
            if (error) {
                return res.status(400).json({ error });
            }

            if (category) {
                Product.find({ category: category._id })
                    .exec((error, products) => {


                        if (error) {
                            return res.status(400).json({ error });
                        }
                        if (products) {
                            res.status(200).json({
                                products,
                                productsByPrice: {
                                    under5k: products.filter(product => product.price <= 5000),
                                    under10k: products.filter(products => products.price > 5000 && products.price <= 10000),
                                    under15k: products.filter(products => products.price > 10000 && products.price <= 15000),
                                    under20k: products.filter(products => products.price > 15000 && products.price <= 20000),
                                    under30k: products.filter(products => products.price > 20000 && products.price <= 30000),
                                }
                            });
                        }

                    })
            }
            // res.status(200).json({ category });

        })
}