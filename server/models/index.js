const dbConfig = require("../config/db.config.js");
const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = dbConfig.url;
db.tests = require("./test.js")(mongoose);
db.users = require("./user.model.js")(mongoose);
db.videos = require("./videos.model.js")(mongoose);
db.musics = require("./musics.model.js")(mongoose);
db.foods = require("./food.modal.js")(mongoose);

module.exports = db;