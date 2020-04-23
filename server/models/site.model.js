const mongoose = require('mongoose')

const siteSchema = new mongoose.Schema({
    featured: {
        required: true,
        type: Array,
        default: []
    },
    siteInfo: {
        required: true,
        type: Array,
        default: []
    }
})

module.exports = mongoose.model('Site', siteSchema)