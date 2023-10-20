// const express = require('express');
// const mongoose = require('mongoose');

// // Create an Express app
// const app = express();

// // Middleware to parse JSON in request body
// app.use(express.json());

// // Connect to MongoDB
// mongoose.connect('mongodb+srv://mesmak:Makyoh123@cluster0.nbl0ae1.mongodb.net/MusicList?retryWrites=true&w=majority', {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
// })
//     .then(() => {
//         console.log('Connected to MongoDB');
//     })
//     .catch((error) => {
//         console.error('Error connecting to MongoDB:', error);
//     });

// // Define the Song schema
// const songSchema = new mongoose.Schema({
//     title: String,
//     artist: String,
//     album: String,
//     genre: String,
// });

// // Create the Song model
// const Song = mongoose.model('Song', songSchema);

// // API endpoints

// // Create a new song
// app.post('/songs', (req, res) => {
//     const { title, artist, album, genre } = req.body;

//     const song = new Song({
//         title,
//         artist,
//         album,
//         genre,
//     });

//     song.save()
//         .then(() => {
//             res.status(201).json(song);
//         })
//         .catch((error) => {
//             res.status(500).json({ error: 'An error occurred' });
//         });
// });

// // List all songs
// app.get('/songs', (req, res) => {
//     Song.find()
//         .then((songs) => {
//             res.json(songs);
//         })
//         .catch((error) => {
//             res.status(500).json({ error: 'An error occurred' });
//         });
// });

// // Update a song
// app.put('/songs/:id', (req, res) => {
//     const { id } = req.params;
//     const { title, artist, album, genre } = req.body;

//     Song.findByIdAndUpdate(
//         id,
//         { title, artist, album, genre },
//         { new: true }
//     )
//         .then((song) => {
//             if (!song) {
//                 return res.status(404).json({ error: 'Song not found' });
//             }
//             res.json(song);
//         })
//         .catch((error) => {
//             res.status(500).json({ error: 'An error occurred' });
//         });
// });

// // Remove a song
// app.delete('/songs/:id', (req, res) => {
//     const { id } = req.params;

//     Song.findByIdAndRemove(id)
//         .then((song) => {
//             if (!song) {
//                 return res.status(404).json({ error: 'Song not found' });
//             }
//             res.sendStatus(204);
//         })
//         .catch((error) => {
//             res.status(500).json({ error: 'An error occurred' });
//         });
// });

// // Generate overall statistics
// app.get('/statistics', (req, res) => {
//     const statistics = {};

//     // Total number of songs, artists, albums, genres
//     Song.countDocuments()
//         .then((totalSongs) => {
//             statistics.totalSongs = totalSongs;
//             return Song.distinct('artist').countDocuments();
//         })
//         .then((totalArtists) => {
//             statistics.totalArtists = totalArtists;
//             return Song.distinct('album').countDocuments();
//         })
//         .then((totalAlbums) => {
//             statistics.totalAlbums = totalAlbums;
//             return Song.distinct('genre').countDocuments();
//         })
//         .then((totalGenres) => {
//             statistics.totalGenres = totalGenres;
//             res.json(statistics);
//         })
//         .catch((error) => {
//             res.status(500).json({ error: 'An error occurred' });
//         });
// });

// // Start the server
// const port = process.env.PORT || 3000;
// app.listen(port, () => {
//     console.log(`Server is listening on port ${port}`);
// });