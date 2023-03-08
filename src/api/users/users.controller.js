const User = require("./users.model");
const bcrypt = require("bcrypt");
const { generateSign } = require("../../utils/jwt");

const registro = async (req, res, next) => {
  try {
    if (req.body.rol === "admin") {
      req.body.rol = "user";
    }
    const newUser = new User(req.body);
    await newUser.save();

    return res.status(201).json(newUser);
  } catch (error) {
    next(error);
  }
};

const getUsers=async (req,res,next)=>{
try {
  const users=await User.find()
  return res.json(users)

} catch (error) {
  next(error)
}
 

}
const modifyUser = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (req.user.rol !== "admin") {
      req.body.rol = "user";
    }

    const idUser = JSON.stringify(req.user._id);

    const idUserParsed = idUser.slice(1, idUser.length - 1);

    if (idUserParsed === id || req.user.rol === "admin") {
      const userUpdated = await User.findByIdAndUpdate(id, req.body, {
        new: true,
      });
      return res.json(userUpdated);
    } else {
      return res.json("No puedes modificar a otro usuario si no eres admin");
    }
  } catch (error) {
    return next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const userToLog = await User.findOne({ email: req.body.email });

    if (!userToLog) {
      return res.status(500).json("No se encuentra el usuario");
    }

    if (bcrypt.compareSync(req.body.password, userToLog.password)) {
      const token = generateSign(userToLog._id, userToLog.email);
      return res.status(200).json({ token: token });
    } else {
      return res.status(500).json("Te has equivocado de contraseña chaval");
    }
  } catch (error) {
    next(error);
  }
};

module.exports = { registro, login, modifyUser, getUsers };
