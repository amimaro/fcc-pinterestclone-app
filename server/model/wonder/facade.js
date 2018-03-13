const Facade = require('../../lib/facade');
const wonder = require('./schema');

class Wonder extends Facade {

  find(...args) {
    return this.model
      .find(...args)
      .populate('owner', 'twitter.username')
      .exec();
  }

}

module.exports = new Wonder(wonder);
