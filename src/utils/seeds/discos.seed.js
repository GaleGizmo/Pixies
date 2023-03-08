const mongoose = require("mongoose");

const Disco = require("../../api/discos/discos.model");

require("dotenv").config();

const DB_URL = process.env.DB_URL;

const discos = [
  {
    title: "Demos",
    cover:
      "https://m.media-amazon.com/images/I/61sIT2ffZHL._UXNaN_FMjpg_QL85_.jpg",
    year: 1987,
    songs: [
      "Broken face",
      "Build high",
      "Im amazed",
      "In Heaven",
      "Down to the Well",
      "Subbacultcha",
      "Break my body",
      "Here comes your man",
      "Rock a My Soul",
    ],
      // { songTitle: "Broken face", duration: 85 },
      // { songTitle: "Build high", duration: 87 },
      // { songTitle: "Im amazed", duration: 96 },
      // { songTitle: "In Heaven", duration: 99 },
      // { songTitle: "Down to the Well", duration: 133 },
      // { songTitle: "Subbacultcha", duration: 189 },
      // { songTitle: "Break my body", duration: 112 },
      // { songTitle: "Here comes your man", duration: 186 },
      // { songTitle: "Rock a My Soul", duration: 106 },
    label: "Cooking Vynil",
    producer: "",
  },
  {
    title: "Surfer Rosa",
    cover: "https://m.media-amazon.com/images/I/819v8QwrNWL._SL1500_.jpg",
    year: 1988,
    songs: [
      "Cactus",
      "Brick is red",
      "Broken face",
      "Something Against You",
      "Tonys Theme",
      "Vamos",
      "Break my body",
      "Im Amazed",
      "Bone Machine",
      "Oh my Golly!",
      "Gigantic",
      "River Euphrates",
      "Where is my mind?",
    ],
    //   { songTitle: "Cactus", duration: 139, author: "Frank Black" },
    //   { songTitle: "Brick is red", duration: 123, author: "Frank Black" },
    //   { songTitle: "Broken face", duration: 93, author: "Frank Black" },
    //   { songTitle: "Something Against You", duration: 111, author: "Frank Black" },
    //   { songTitle: "Tonys Theme", duration: 115, author: "Frank Black" },
    //   { songTitle: "Vamos", duration: 265, author: "Frank Black" },
    //   { songTitle: "Break my body", duration: 112, author: "Frank Black" },
    //   { songTitle: "Im Amazed", duration: 105, author: "Frank Black" },
    //   { songTitle: "Bone Machine", duration: 185, author: "Frank Black" },
    //   { songTitle: "Oh my Golly!", duration: 155, author: "Frank Black" },
    //   { songTitle: "Gigantic", duration: 238, author: "Frank Black" },
    //   { songTitle: "River Euphrates", duration: 155, author: "Frank Black" },
    //   { songTitle: "Where is my mind?", duration: 237, author: "Frank Black" },
    label: "4AD",
    producer: "Steve Albini",
  },
  {
    title: "Doolittle",
    cover: "https://m.media-amazon.com/images/I/81D+wuLfeIL._SL1081_.jpg",
    year: 1989,
    songs: [
      "Here comes your man",
      "Debaser",
      "Crackity Jones",
      "La La Love You",
      "Monkey Gone To Heaven",
      "Silver",
      "There goes my gun",
      "There goes my gun",
      "No 13 Baby",
      "Tame",
      "I Bleed",
      "Wave of mutilation",
      "Mr Greaves",
      "Hey",
    ],
    //   { songTitle: "Here comes your man", duration: 202 },
    //   { songTitle: "Debaser", duration: 172 },
    //   { songTitle: "Crackity Jones", duration: 84 },
    //   { songTitle: "La La Love You", duration: 164 },
    //   { songTitle: "Monkey Gone To Heaven", duration: 176 },
    //   { songTitle: "Silver", duration: 145 },
    //   { songTitle: "There goes my gun", duration: 170 },
    //   { songTitle: "Dead", duration: 141 },
    //   { songTitle: "No 13 Baby", duration: 232 },
    //   { songTitle: "Tame", duration: 116 },
    //   { songTitle: "I Bleed", duration: 155 },
    //   { songTitle: "Wave of mutilation", duration: 125 },
    //   { songTitle: "Debaser", duration: 172 },
    //   { songTitle: "Mr Greaves", duration: 126 },
    //   { songTitle: "Hey", duration: 211 }
    label: "4AD",
    producer: "Steve Albini",
  },
];

mongoose
  .connect(DB_URL)
  .then(async () => {
    const discos = await Disco.find();

    if (discos.length) {
      await Disco.collection.drop();
    }
  })
  .catch((error) => console.log("Error borrando datos", error))
  .then(async () => {
    await Disco.insertMany(discos);
    console.log("discos CREADOS");
  })
  .catch((error) => console.log("Error subiendo discos", error))
  .finally(() => mongoose.disconnect());
