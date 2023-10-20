const mongoose = require('mongoose')

const songSchema = mongoose.Schema({
    title: {
        type: String,
        required: ['true' , 'Please insert title']
    },
    artist: {
        type: String,
        required: ['true' , 'Please insert artist']
    },
    album: {
        type: String,
        required: ['true' , 'Please insert album']
    },
    gener: {
        type: String,
        required: ['true' , 'Please insert gener']
    },
},{
    timestamps: true
})

module.exports = mongoose.model('Song', songSchema)