require('dotenv/config')
const express = require('express')
const cookieParser = require('cookie-parser')
const mongoose = require('mongoose')

const app = express();


mongoose.connect(process.env.DATABASE, { autoIndex: false })
    .then(() => {
        console.log("Connection established");
        
    })
    .catch((err) => {
        console.log("Error:", err);
        
    })

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())

app.use('/api/user', require('./routes/user'))
app.use('/api/product', require('./routes/product'))

const port = process.env.PORT || 3000

app.listen(port, () => {
    console.log(`Server running at ${port}`);
    
})