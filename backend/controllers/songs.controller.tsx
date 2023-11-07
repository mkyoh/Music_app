const AsyncHandler = require('express-async-handler')
const Songs = require('../models/songModel')

// @desc get all songs
// @route GET /api/songs
// @access public 

const getSongs = AsyncHandler(async (req,res) => {
    const songs = await Songs.find()
    res.status(200).json(songs)
})

// @desc create song
// @route POST /api/songs
// @access public

const createSongs = AsyncHandler( async(req,res) => {

    const {title,artist,album,gener} = req.body

    // if (!req.body.title || !req.body.album || !req.body.gener || !req.body.artist) {
    //     res.status(400)
    //     throw new Error("One of the fields is missing")
    // }

    const song = await Songs.create({
        title: title,
        artist: artist,
        album: album,
        gener: gener
    })

    res.status(200).json(song)
})

const createAlbum = AsyncHandler( async (req,res) => {
    const {songs,album} = req.body
    const songArray = []
    await songs.map((song) => {
        const songData = {
            title: song.title,
            album: album,
            artist: song.artist,
            gener: song.gener
        }

        
    })

    const albums = Songs.create(songArray)
    res.status(200).json({message: `${req.body.album} created successfully`})

})

// @desc update song
// @route PUT /api/songs
// @access public

const updateSongs = AsyncHandler( async (req,res) => {
    const {title,artist,album,gener} = req.body

    const song = await Songs.findById(req.params.id)

    if (!song) {
        res.status(400)

        throw new Error("Song not found")
    }

    const updatedSong = await Songs.findByIdAndUpdate(req.params.id,req.body,{
        new: true
    })
    res.status(200).json(updatedSong)
})

// @desc delete song
// @route DELETE /api/songs
// @access public
const deleteSongs = AsyncHandler( async (req,res) => {
    const song = await Songs.findById(req.params.id)
    Songs.findByIdAndRemove(req.params.id)
        .then((deletedSong) => {
        console.log(`Deleted car: ${deletedSong}`);
        })
        .catch((error) => {
        console.error(error);
        });
    // if (!song) {
    //     res.status(400)

    //     throw new Error("Song not found")
    // }
    res.status(200).json({message: `song with id ${req.params.id} deleted `})
})





