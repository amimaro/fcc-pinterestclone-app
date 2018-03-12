const Facade = require('../../lib/facade');
const wonder = require('./schema');

class Wonder extends Facade {}

module.exports = new Wonder(wonder);
