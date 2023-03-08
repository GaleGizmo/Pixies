const { isAuth, isAdmin } = require("../../middlewares/auth");
const { registro, login, modifyUser, getUsers } = require("./users.controller");
const userRoutes = require("express").Router();

userRoutes.get("/", [isAdmin], getUsers)
userRoutes.post("/", registro);
userRoutes.post("/login", login);
userRoutes.put("/:id", [isAuth], modifyUser);

module.exports = userRoutes;