const Controller = require('../../lib/controller');
const userFacade = require('./facade');
const passport = require('passport');


class UserController extends Controller {

  addLike(req, res, next) {
    if (req.isAuthenticated()) {
      for (let wonder of req.user.likedWonders) {
        if (wonder == req.params.id)
          return res.sendStatus(404);
      }
      req.user.likedWonders.push(req.body);
      this.facade.update({
          _id: req.user._id
        }, req.user)
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

  removeLike(req, res, next) {
    if (req.isAuthenticated()) {
      req.user.likedWonders = req.user.likedWonders.filter((wonder) => {
        if (wonder == req.params.id)
          return false;
        return true;
      });
      this.facade.update({
          _id: req.user._id
        }, req.user)
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

  // Returns Session if Logged-in
  getSession(req, res, next) {
    res.json(req.user);
  }

  // Logout
  logout(req, res, next) {
    req.logout();
    res.redirect('/');
  }

  // Twitter

  authenticateTwitter(req, res, next) {
    passport.authenticate('twitter')(req, res, next);
  }

  authorizeTwitter(req, res, next) {
    passport.authorize('twitter')(req, res, next);
  }

  callbackAuthTwitter(req, res, next) {
    passport.authenticate('twitter', function(err, data) {
      if (err)
        return next(err);
      req.login(data, function(err) {
        if (err)
          return next(err);
        return res.redirect('/');
      });
    })(req, res, next);
  }

  callbackAuthzTwitter(req, res, next) {
    passport.authorize('twitter', function(err, data) {
      if (err)
        return next(err);
      if (data)
        req.session.user = data
      res.redirect('/')
    })(req, res, next);
  }

  unlinkTwitter(req, res, next) {
    this.facade.update({
        _id: req.user._id
      }, {
        $unset: {
          twitter: 1
        }
      })
      .then((results) => {
        delete req.user.twitter
        res.redirect('/');
      })
      .catch(err => next(err));
  }

}

module.exports = new UserController(userFacade);
