const Cancion = require("./cancion.model");


const getAllSongs = async (req, res) => {
    try {
      const songs = await Cancion.find();
  
      return res.json(songs);
    } catch (error) {
      return next(error);
    }
  };

const postSong=async(req,res,next)=>{

    try {

        const newSong= await new Cancion(req.body)
        await newSong.save()
        return res.status(201).json(newSong)

        
    } catch (error) {
        next(error)
    }
}

module.exports={postSong, getAllSongs}