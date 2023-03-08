const mongoose = require("mongoose");
// const Schema=mongoose.Schema es un paso optativo
const DiscoSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    cover: { type: String },
    year: { type: Number, required: true },
    length: { type: Number },
    songs: [{ type: mongoose.Types.ObjectId, ref:"canciones" }],
    label: { type: String },
    producer: { type: String },
  },
  {
    timestamps: true,
  }
);

const Disco = mongoose.model("discos", DiscoSchema);
module.exports = Disco;
