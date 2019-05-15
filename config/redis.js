const redis = require("redis");
const env = require("./env.config.js");

module.exports = redis.createClient(env.redis);