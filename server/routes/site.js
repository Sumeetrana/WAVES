const express = require('express')

const router = express()
const Site = require('../models/site.model')

const auth = require('../middleware/auth')
const admin = require('../middleware/admin')

router.get('/site_data', (req, res) => {
    Site.find({}, (err, site) => {
        if (err) {
            res.status(400).send(err)
        }
        
        res.status(200).send(site[0].siteInfo)
    })
})

router.post('/site_data', auth, admin, (req, res) => {
    Site.findOneAndUpdate(
        {name: 'Site'},
        { "$set": {siteInfo: req.body}},
        { new: true },
        (err, doc) => {
            if (err) {
                return res.json({success: false, err})
            }
            res.status(200).json({success: true, siteInfo: doc.siteInfo})
        }
    )
})

module.exports = router