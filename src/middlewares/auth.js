const User = require("../api/users/users.model");
const { verifyJwt } = require("../utils/jwt");

const isAuth = async (req, res, next) => {

    try {
        
       
        const token = req.headers.authorization;

       
        if (!token) {
            return res.json("No estás autorizado crack");
        }

      
        const parsedToken = token.replace("Bearer ", "");

        const validToken = verifyJwt(parsedToken);

        const userLogued = await User.findById(validToken.id);

        userLogued.password = null;
        req.user = userLogued;
        next();


    } catch (error) {
        return res.json(error);
    }

}

const isAdmin = async (req, res, next) => {

    try {
        
        const token = req.headers.authorization;

        if (!token) {
            return res.json("No estás autorizado neng");
        }

        const parsedToken = token.replace("Bearer ", "");
        const validToken = verifyJwt(parsedToken);
        const userLogued = await User.findById(validToken.id);

        if (userLogued.rol === "admin") {
            userLogued.password = null;
            req.user = userLogued;
            next();
        } else {
            return res.json("A donde vas máquina, no eres admin");
        }

    } catch (error) {
        return res.json(error);
    }

}

module.exports = {isAuth, isAdmin}