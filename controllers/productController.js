const {Product} = require('../models/models')
const ApiError = require('../error/ApiError')
const uuid = require('uuid')
const path = require('path')

class ProductController {
    async create(req, res, next){
        try{
            const {name, price, status, description, categoryId} = req.body
            const {img} = req.files
            let fileName = uuid.v4() + ".jpg"
            img.mv(path.resolve(__dirname, '..', 'static', fileName))
            const product = await Product.create({name, price, status, description, img: fileName, categoryId})
            const imgURL = `${req.protocol}://${req.get('host')}/static/${fileName}`
            return res.json({ ...product.toJSON(), img: imgURL })
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async remove(req,res,next){
        try{
            const {product_id} = req.body
            const product = await Product.findOne({where:{id: product_id}})
            await product.destroy()
            return req.json({message: "Product was removed"})
        } catch(e){
            return next(ApiError.badRequest(e.message))
        }
    }

    async getAll(req, res) {
        const products = await Product.findAll();
        const productsWithUrls = products.map(product => {
            const imgURL = `${req.protocol}://${req.get('host')}/static/${product.img}`;
            return { ...product.toJSON(), img: imgURL };
        });
        return res.json(productsWithUrls);
    }

    async getOneById(req, res) {
        let { id } = req.params;
        const product = await Product.findOne({ where: { id } });
        if (product) {
            const imgURL = `${req.protocol}://${req.get('host')}/static/${product.img}`;
            return res.json({ ...product.toJSON(), img: imgURL });
        } else {
            return res.status(404).json({ message: "Product not found" });
        }
    }
}

module.exports = new ProductController() 