const Controller = require('../../lib/controller');
const wonder = require('./facade');

class Wonder extends Controller {

  create(req, res, next) {
    if (req.isAuthenticated()) {
      req.body.owner = req.user._id;
      req.body.likes = 0;
      this.facade.create(req.body)
        .then(doc => res.status(201).json(doc))
        .catch(err => next(err));
    } else {
      res.sendStatus(401);
    }
  }

  findByUser(req, res, next) {
    if (req.isAuthenticated()) {
      return this.facade.find({
          owner: req.user._id
        })
        .then(collection => res.status(200).json(collection))
        .catch(err => next(err));
    } else {
      res.sendStatus(401);
    }
  }

}

module.exports = new Wonder(wonder);
