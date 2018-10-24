const router = require('express').Router();
const controller = require('./userController');
const userValidation = require('./userValidation');
const userEditValidation = require('./userEditValidation');
const auth = require('../auth/auth');
const isAdmin = require('../../middleware/adminMiddleware');

router.param('id', controller.params);

router.route('/')
  .get([auth.decodeToken(), auth.getFreshUser(), isAdmin()], controller.get)
  .post([userValidation(), auth.decodeToken(), auth.getFreshUser(), isAdmin()], controller.post);

router.route('/:id')
  .get([auth.decodeToken(), auth.getFreshUser(), isAdmin()], controller.getOne)
  .put([userEditValidation(), auth.decodeToken(), auth.getFreshUser(), isAdmin()], controller.put)
  .delete([auth.decodeToken(), auth.getFreshUser(), isAdmin()], controller.delete);

module.exports = router;
