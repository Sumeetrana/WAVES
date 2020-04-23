require('dotenv/config')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    name: {
        type: String,
        name: true,
        maxlength: 100
    },
    lastname: {
        type: String,
        name: true,
        maxlength: 100
    },
    cart: {
        type: Array,
        default: []
    },
    history: {
        type: Array,
        default: []
    },
    role: {
        type: Number,
        default: 0     // 0 -> User, 1 -> Admin
    },
    token: {
        type: String
    }
})

// userSchema.pre('save', function(next) {
//     var user = this;

//     if(user.isModified('password')) {
//         bcrypt.genSalt(10, function(err, salt) {
//             if (err) {
//                 return next(err)
//             }

//             bcrypt.hash(user.password, salt, function(err, hashedPassword) {
//                 if (err) {
//                     return next(err)
//                 }
//                 user.password = hashedPassword
//                 next();
//             })
//         })
//     } else {
//         next()
//     }
// })

userSchema.statics.findByToken = async function(token, cb) {
    let user = this;

    jwt.verify(token, SUPERSECRETPASSWORD123, (err, decode) => {
        user.findOne({ "_id": decode, "token": token }, (err, user) => {
            if (err) {
                return cb(err)
            }
            cb(null, user)
        })
    })
    
}

module.exports = mongoose.model('User', userSchema)