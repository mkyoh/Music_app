
const dotenv = require('dotenv').config()

const ConnectDB = async () => {
    try {
        const conn = await mongoose.connect("mongodb+srv://mesmak:Makyoh123@cluster0.nbl0ae1.mongodb.net/MusicApp?retryWrites=true&w=majority")

        console.log(`DB connected ${conn.connection.host}`)
    } catch (error) {
        console.log(error)
        process.exit(1)
    }
}

module.exports = ConnectDB
