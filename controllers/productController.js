const {Product} = require('../models/models')
const ApiError = require('../error/ApiError')
const uuid = require('uuid')
const path = require('path')

class ProductController {
    async create(req, res, next){
        try{
            const {name, price, status, description} = req.body
            const {img} = req.files
            let fileName = uuid.v4() + ".jpg"
            img.mv(path.resolve(__dirname, '..', 'static', fileName))
            const product = await Product.create({name, price, status, description, img: fileName})
            return res.json(product)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async getAll(req, res){
        const products = await Product.findAll()
        return res.json(products)
    }

    async getOneById(req, res){
        let {id} = req.params
        const product = await Product.findOne({
            where: {id}
        })
        return res.json(product)
    }
}

module.exports = new ProductController() 