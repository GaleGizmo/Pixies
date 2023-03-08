const { isAdmin } = require("../../middlewares/auth")
const { postSong, getAllSongs } = require("./cancion.controller")

const SongsRoutes=require("express").Router()

SongsRoutes.post("/", [isAdmin], postSong)
SongsRoutes.get("/", getAllSongs)

module.exports=SongsRoutes