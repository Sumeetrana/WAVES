const express = require('express')
const router = express.Router();
const mongoose = require('mongoose')

const auth = require('../middleware/auth')
const admin = require('../middleware/admin')
const Brand = require('../models/brand.model')
const Wood = require('../models/wood.model')
const Product = require('../models/product.model')

router.post('/brand', auth, admin, (req,res) => {
    const brand = new Brand(req.body);

    brand.save((err, doc) => {

        if (err) {
            return res.status(400).json({success: false, err})
        }
        res.status(200).json({
            success: true,
            brand: doc
        })
        
    })
        
})

router.get('/allbrands', (req, res) => {
    Brand.find({}, (err, brands) => {
        if (err) {
            return res.status(400).send(err)
        }
        res.status(200).send(brands)
    })
})

router.post('/wood', (req, res) => {
    const wood = new Wood(req.body)

    wood.save((err, doc) => {
        if (err) {
            return res.json({ success: false, err })
        }
        res.status(200).json({
            success: true,
            wood: doc
        })
    })
})

router.get('/allwoods', (req, res) => {
    Wood.find({}, (err, woods) => {
        if (err) {
            return res.status(400).send(err)
        }
        res.status(200).send(woods)
    })
})

// api/product/article?id=HBHBHA,AHBHA,AJSHAJA,HJASAJ&type=array
router.get('/article_by_id', (req, res) => {
    let type = req.query.type;
    let items = req.query.id;
    let ids = items.split(',')
    // if (type === 'array') {
    //     let ids = req.query.type.split(',');
    //     items = []
    //     items = ids.map(item => {
    //         return mongoose.Types.ObjectId.createFromHexString(item)
    //     })
    // }
    console.log(ids);
    
    Product.find({ 
        '_id': {$in:ids}
     }).
     populate('brand').
     populate('wood').
     exec((err, docs) => {
        return res.status(200).send(docs)
     })
})

router.post('/article', (req, res) => {
    const product = new Product(req.body);

    product.save((err, doc) => {
        if (err) {
            return res.json({ success: false, err })
        }
        res.status(200).json({
            success: true,
            article: doc
        })
    })
})

module.exports = router