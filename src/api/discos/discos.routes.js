const { isAdmin } = require("../../middlewares/auth");
const upload = require("../../middlewares/file");

const {
  getAllDiscos,
  getOneDisco,
  getByYear,
  getAllTitles,
  postDisco,
  deleteDisco,
  updateDisco,
} = require("./discos.controller");

const discosRoutes = require("express").Router();

discosRoutes.get("/Disco/:title", getOneDisco);
discosRoutes.get("/year/:year", getByYear);
discosRoutes.post("/",[isAdmin], upload.single("cover"), postDisco)
discosRoutes.get("/titles", getAllTitles)
discosRoutes.get("/", getAllDiscos);
discosRoutes.delete("/:id", [isAdmin], deleteDisco)
discosRoutes.put("/:id",[isAdmin], updateDisco)

module.exports = discosRoutes;
