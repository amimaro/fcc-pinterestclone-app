const controller = require('./controller');
const Router = require('express').Router;
const router = new Router();

router.route('/')
  .get((...args) => controller.find(...args))
  .post((...args) => controller.create(...args));

router.route('/tag/:tag')
  .get((...args) => controller.findByTag(...args));

router.route('/user/tag/:tag')
  .get((...args) => controller.findByTagByUser(...args));
router.route('/user')
  .get((...args) => controller.findByUser(...args));

router.route('/like/:id')
  .put((...args) => controller.like(...args));
router.route('/unlike/:id')
  .put((...args) => controller.unlike(...args))

router.route('/:id')
  .put((...args) => controller.update(...args))
  .get((...args) => controller.findById(...args))
  .delete((...args) => controller.remove(...args));

module.exports = router;
