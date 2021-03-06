require('dotenv/config')
const express = require('express')
const cookieParser = require('cookie-parser')
const mongoose = require('mongoose')
const fromidable = require('express-formidable')
const cloudinary = require('cloudinary')
const path = require('path')

const app = express();


mongoose.connect(process.env.DATABASE, { autoIndex: false }, { useNewUrlParser: true })
    .then(() => {
        console.log("Connection established");
        
    })
    .catch((err) => {
        console.log("Error:", err);
        
    })

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET
})

app.use('/api/user', require('./routes/user'))
app.use('/api/product', require('./routes/product'))
app.use('/api/site', require('./routes/site'))

if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'))

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, '../client', 'build', 'index.html'));
    })
}

const port = process.env.PORT || 3002

app.listen(port, () => {
    console.log(`Server running at ${port}`);
    
})