const router = require('express').Router();
const controller = require('./contactController');
const contactValidation = require('./contactsValidation');
const auth = require('../auth/auth');

router.param('id', controller.params);

router.route('/')
  .get([auth.decodeToken(), auth.getFreshUser()], controller.get)
  .post([contactValidation(), auth.decodeToken(), auth.getFreshUser()], controller.post);

router.route('/:id')
  .get([auth.decodeToken(), auth.getFreshUser()], controller.getOne)
  .put([contactValidation(), auth.decodeToken(), auth.getFreshUser()], controller.put)
  .delete([auth.decodeToken(), auth.getFreshUser()], controller.delete);

module.exports = router;
