const Contact = require('./contactModel');
const config = require('../../config/config');
const winston = require('../../utils/logging');
const _ = require('lodash');

/**
 * if there is a parameter id in the query string then it will find the contact
 * associated with that id
 * then it will create a request property named contact
 * @param request
 * @param response
 * @param next
 * @param id
 */
exports.params = (request, response, next, id) => {
  winston.info('Setting contact based on id parameter');
  Contact.findById(id)
    .then((contact) => {
      if(!contact) {
        next(new Error('Contact could not be found'))
      } else {
        request.contact = contact;
        next();
      }
    }, (error) => {
      next(error);
    });
};

/**
 * gets all contactss and paginates the results
 * @param request
 * @param response
 * @param next
 */
exports.get = (request, response, next) => {
  const offset = (request.query.offset) ? parseInt(request.query.offset) : config.paginate.offset;
  const limit = (request.query.limit) ? parseInt(request.query.limit) : config.paginate.limit;
  winston.info(request.auth.firstName + "'s contacts are being collected");

  Contact.paginate({
    owner: request.auth._id
  }, {
    offset: offset,
    limit: limit
  })
    .then((contacts) => {
      response.json(contacts);
    }, (error) => {
      next(error);
    });
};

/**
 * finds a single record and returns it
 * @param request
 * @param response
 * @param next
 */
exports.getOne = (request, response, next) => {
  let contact = request.contact;
  if(contact.owner.toString() !== request.auth._id.toString()) {
    response.status(401).json('Unauthorised');
    return;
  }
  response.status(200).json(contact);
};

/**
 * finds a contact and updates their information
 * @param request
 * @param response
 * @param next
 */
exports.put = (request, response, next) => {
  let contact = request.contact;

  let update = request.body;

  _.merge(contact, update);

  contact.save((error, saved) => {
    if (error) {
      next(error);
    } else {
      response.status(200)
        .json('You updated the record for ' + saved.firstName + ' ' + saved.lastName);
    }
  })
};

/**
 * creates a new contact
 * @param request
 * @param response
 * @param next
 */
exports.post = (request, response, next) => {
  let newContact = request.body;
  newContact.owner = request.auth._id;

  Contact.create(newContact)
    .then(
      (contact) => {
        response.status(201).json("You created a contact for " + contact.firstName + ' ' + contact.lastName);
      },
      (error) => {
        winston.info('There was an error creating a new contact, mongo rejected the request');
        next(error);
      });
};

/**
 * finds and deletes a contact
 * @param request
 * @param response
 * @param next
 */
exports.delete = (request, response, next) => {
  winston.info('Checking delete permission in controller');
  const name = request.contact.firstName + ' ' + request.contact.lastName;
  if(request.contact.owner.toString() !== request.auth._id.toString()) {
    winston.info('User is not permitted to perform this function');
    response.status(401).json('Unauthorised');
    return;
  }
  winston.info('Beginning delete function');

  request.contact.remove((error, removed) => {
    if (error) {
      next(error);
    } else {
      response.status(200).json("You deleted " + name + ' from your contact list!');
    }
  });
};
