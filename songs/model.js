const moongose = require("mongoose");

const db = 'mongodb+srv://kevin:123asd@cluster0.vahxu.azure.mongodb.net/proyectoModulo3?retryWrites=true&w=majority'
moongose.connect(db,
{ 
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected...'))
.catch(err => console.log("An error has ocurred:" + err));

const Schema = moongose.Schema;

const songsSchema = new Schema({
    name: {type: String, required: true},
    album: String,
    duration: String,
    artist: String, 
}, {collection: "songs"});

const Song = moongose.model("songs", songsSchema);


async function getAllSongs(){
    return await Song.find({});
}

async function addModelSong(song){
    var newS = new Song(song);
    await newS.save();
}

async function deleteModelSong(songQuery){
    console.log(`Id llegado : ${songQuery}`)
    console.log("Entrando en deleteModelSong")
    await db.collection.deleteOne( { "_id" : ObjectId(songQuery) } );
    console.log("Termina await de deleteModelSong")
}

module.exports = {
    getAllSongs,
    addModelSong,
    deleteModelSong
}