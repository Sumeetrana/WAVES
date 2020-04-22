require('dotenv/config')
const express = require('express')
const router = express.Router();
const { hash, compare } = require('bcrypt')
const jwt = require('jsonwebtoken')
const formidable = require('express-formidable')
const cloudinary = require('cloudinary')
const mongoose = require('mongoose')

const User = require('../models/user.model')
const auth = require('../middleware/auth')
const admin = require('../middleware/admin')

router.post('/register', async (req, res) => {
        const { email, password, name, lastname } = req.body
        const user = await User.findOne({ email: email })
        if(user) {
            return res.status(400).json({ "Error": "User already exits"})
        } else {

            const user = new User({
                email,
                password,
                name,
                lastname
            })
            const hashedPassword = await hash(password, 10);
            user.password = hashedPassword
            user.save((err, doc) => {
                if (err) {
                    return res.json({ success: false, err })
                }
                res.status(200).json({
                    success: true,
                    userdata: doc
                })
            })
        }
    })

router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    // find the email
    const user = await User.findOne({email: email})
    
    if(!user) return res.status(400).json({ loginSuccess: false, message: "User not found" })
    
    // Check the password
    const isMatch = await compare(password, user.password);
    if(!isMatch) return res.status(400).json({ loginSucces: false, message: "Password Not Matched" })

    // generate a token
    let token = jwt.sign( user._id.toHexString(), process.env.SECRET)
    user.token = token  
    await user.save();
    res.cookie('w_auth', user.token).status(200).json({ loginSucces: true })
    
})

router.get('/auth', auth, (req, res) => {
    const { email, name, lastname, role, cart, history } = req.user
    res.status(200).json({
        // user: req.user
        isAdmin: role === 0 ? false : true,
        isAuth: true,
        email,
        name,
        lastname,
        role,
        cart,
        history
    })
})

router.get('/logout', auth ,(req, res) => {
    User.findByIdAndUpdate(req.user._id, { token: '' }, (err, doc) => {
        if (err) {
            return res.json({ success: false })
        }
        return res.status(200).send({
            success: true
        })
    })
})

router.post('/uploadimage', auth, admin, formidable(), (req, res) => {
    cloudinary.uploader.upload(req.files.file.path, (result) => {
        console.log(result);
        res.status(200).send({
            public_id: result.public_id,
            url: result.url
        })
    }, {
        public_id: `${Date.now()}`,
        resource_type: 'auto'
    })
})

router.get('/removeimage', auth, admin, (req ,res) => {
    let image_id =req.query.public_id;

    cloudinary.uploader.destroy(image_id, (err, result) => {
        if (err) {
            return res.json({success: false, err})
        }
        res.status(200).send('ok')
    })
})

router.post('/addToCart', auth, (req, res) => {
    User.findOne({_id: req.user._id}, (err, doc) => {
        let duplicate = false
        
        doc.cart.forEach(item => {
            if (item.id == req.query.productId) {
                duplicate = true
            }
        })

        if (duplicate) {
            
        } else {
            User.findOneAndUpdate(
                {_id: req.user._id},
                { $push: { cart: {
                    id: mongoose.Types.ObjectId(req.query.productId),
                    quantity: 1,
                    date: Date.now()
                }} },
                { new: true },
                (err, doc) => {
                    if (err) {
                        return res.json({ success: false, err })
                    }
                    res.status(200).json(doc.cart)
                }
            )
        }
    })
})

module.exports = router 