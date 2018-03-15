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

  like(req, res, next) {
    if (req.isAuthenticated()) {
      this.facade.update({
          _id: req.params.id
        }, {
          $inc: {
            likes: 1
          }
        })
        .then((results) => {
          if (results.n < 1) {
            return res.sendStatus(404);
          }
          if (results.nModified < 1) {
            return res.sendStatus(304);
          }
          res.sendStatus(204);
        })
        .catch(err => next(err));
    } else {
      res.sendStatus(401);
    }
  }

}

module.exports = new Wonder(wonder);
