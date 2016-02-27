
// module.exports = __dirname + '/modules/';

fs = require('fs');

module.exports = modName => fs.readFileSync(`${__dirname}/modules/${modName}.js`);
