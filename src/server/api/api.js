let router = require('express').Router();

// api router will mount all other routes
// all resources has a resource routes.js
router.use('/users', require('./users/userRoutes'));
router.use('/contacts', require('./contacts/contactsRoutes'));
router.use('/auth', require('./auth/authRoutes'));

module.exports = router;
