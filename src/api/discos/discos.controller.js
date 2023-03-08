const Disco = require("./discos.model");

const getAllDiscos = async (req, res, next) => {
  try {
    const discos = await Disco.find().populate("songs");

    return res.json(discos);
  } catch (error) {
    return next(error);
  }
};

// const getDiscoById = async (req,res)=>{
//     try {
//         const {id}=req.params
//         const disco=await Disco.findById(id)
//         return res.json(disco)

//     } catch (error) {
//         return res.json({mensaje:"Error al recoger el disco", error:error})
//     }
// }
const getOneDisco = async (req, res) => {
  try {
    const { title } = req.params;

    const disco = await Disco.find({ title });
    if (!disco){
      return res.json("No hay discos de los Pixies con ese título")
    }
    return res.json(disco);
  } catch (error) {
    return next(error);
  }
};

const getByYear = async (req, res) => {
  try {
    const { year } = req.params;
    const resultado = await Disco.findOne({ year: year });

    return res.json(resultado);
  } catch (error) {
    return next(error);
  }
};
const getAllTitles = async (req, res) => {
  try {
    // const{title}=req.params

    const discos = await Disco.find();
    const discosFiltered = discos.map((disco) => disco.title);

    return res.json(discosFiltered);
  } catch (error) {
    return next(error);
  }
};

const postDisco = async (req, res, next) => {
  try {
    const newDisco = new Disco(req.body);
    if (req.file) {
      newDisco.caratula = req.file.path;
    }
    await newDisco.save();

    return res.json(newDisco);
  } catch (error) {
    return next(error);
  }
};

const deleteDisco= async(req,res,next)=>{
try {

  const {id}=req.params
  const deletedDisco= await Disco.findByIdAndDelete(id)
  return res.status(200).json(deletedDisco)
  
} catch (error) {
  next(error)
}

}

const updateDisco= async(req,res,next)=>{
try {
  const {id}=req.params
  const updatedDisco=await Disco.findByIdAndUpdate(id, req.body, {new:true})

  return res.status(200).json(updatedDisco)
  
} catch (error) {
  next(error)
  
}

}
module.exports = {
  getAllDiscos,
  getOneDisco,
  getByYear,
  getAllTitles,
  postDisco,
  deleteDisco,
  updateDisco
};
