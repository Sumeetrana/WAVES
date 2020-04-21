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

// BY ARRIVAL
// /article?sortBy=createdAt&order=desc&limit=4

// BY SELL
// /article?sortBy=SOLD&order=desc&limit=4
router.get('/articles', (req, res) => {
    let sortBy = req.query.sortBy ? req.query.sortBy : "_id";
    let order = req.query.order ? req.query.order : "asc";
    let limit = req.query.limit ? parseInt(req.query.limit) : 100

    Product.
    find().
    populate('brand').
    populate('wood').
    sort([[sortBy, order]]).
    limit(limit).
    exec((err, articles) => {
        if (err) {
            return res.status(400).json(err)
        }
        res.send(articles)
    }) 
})

router.post('/shop', (req, res) => {
    let order = req.body.order ? req.body.order : "desc"
    let sortBy = req.body.sortBy ? req.body.sortBy : "_id"
    let limit = req.body.limit ? parseInt(req.body.limit) : 100
    let skip = parseInt(req.body.skip)
    let findArgs = {}

    for(let key in req.body.filters) {
        if (req.body.filters[key] === 'prices') {
            $gte: req.body.filters['prices'][0]
            $lte: req.body.filters['prices'][1]
        } else {
            findArgs[key] = req.body.filters[key]
        }
    }

    Product.
    find(findArgs).
    populate('brand'). 
    populate('wood'). 
    sort([[sortBy, order]]).
    skip(skip).
    limit(limit).
    exec(() => {
        
    })

    res.status(200)
    
})
module.exports = router