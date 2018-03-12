const Controller = require('../../lib/controller');
const wonder = require('./facade');

class Wonder extends Controller {}

module.exports = new Wonder(wonder);
