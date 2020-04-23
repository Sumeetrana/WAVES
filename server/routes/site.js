const express = require('express')

const router = express()
const Site = require('../models/site.model')

router.get('/site_data', (req, res) => {
    Site.find({}, (err, site) => {
        if (err) {
            res.status(400).send(err)
        }
        
        res.status(200).send(site[0].siteInfo)
    })
})

module.exports = router