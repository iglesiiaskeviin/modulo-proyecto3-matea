const moongose = require("mongoose");
const cors = require("cors");
const db = 'mongodb+srv://kevin:123asd@cluster0.vahxu.azure.mongodb.net/proyectoModulo3?retryWrites=true&w=majority'
moongose.connect(db,
{ 
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
})
.then(() => console.log('MongoDB connected...'))
.catch(err => console.log("An error has ocurred:" + err));

/* EXPRESS */
const express = require("express");

const songsParam = require('./songs/route.js');
const usersParam = require('./users/route.js')

/* SERVER INIT */
var server = express();
server.use(cors());
server.use(express.json());
server.listen(4100);


/* CONSOLE LOGS */
console.log(`Server working`);

/* SONGS  */

server.get("/songs", songsParam.getAllSongs)


/* USERS */

server.get('/users', usersParam.getAllUsers)


/* Adding by post method */

server.post('/songs', songsParam.onPostAddSong)
server.post('/users', usersParam.onPostAddUser)


/* Deleting by delete method */

server.delete('/songs/:songId', songsParam.onDeleteSong)
server.delete('/users/:userId', usersParam.onDeleteUser)

/* Updating by put method */

server.put('/songs/:id', songsParam.onUpdateSong)
server.put('/users/:id', usersParam.onUpdateUser)

/* Adding fav song to user */

server.put('/songs/adduserfavsong/:userId/:songName', usersParam.onAddFavoriteSongToUser)
