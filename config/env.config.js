let env = null;

if(process && process.env && process.env.NODE_ENV){
	env = require(`./env/${process.env.NODE_ENV}.js`);
}else{
	env = require("./env/development.js");
};

module.exports = env;