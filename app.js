const express = require("./config/express.js");
const mongoose = require("./config/mongoose.js");

/*-------实例化mongoose-----*/
const db = mongoose();
/*-------实例化exprss------*/
const app = express();

module.exports = app;