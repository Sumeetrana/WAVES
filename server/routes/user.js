const express = require('express')
const User = require('../models/user.model')
const router = express.Router();

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



module.exports = router 