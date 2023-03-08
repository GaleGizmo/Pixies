require("dotenv").config();
const express = require("express");
const cors=require("cors")
const server = express();

server.use(express.urlencoded({extended:true}))
server.use(express.json())
const cloudinary=require("cloudinary").v2
cloudinary.config({
  cloud_name:process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET

})
const PORT = process.env.PORT;

server.use(cors())

const discosRoutes=require("./SRC/api/discos/discos.routes")
const SongsRoutes = require("./src/api/canciones/cancion.routes");
server.use("/discos", discosRoutes)
server.use("/canciones", SongsRoutes )

const db=require("./src/utils/db.js");

db.connectDB()
server.use("/", (req, res) => {
  res.send("its alive!");
});

server.use((err,req,res,next)=>{
  return res.status(err.status || 500 ).json(err.message || "Error sorpresa")
})

server.use("*", (req,res,next)=>{
  const error =new Error("Route not found")
  error.status = 404
  next(error)
})


server.listen(PORT, () => {
  console.log("El server pita en http://localhost:" + PORT);
});
