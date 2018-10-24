const User = require('../api/user/userModel');
const Contact = require('../api/contacts/contactModel');
const _ = require('lodash');
const winston = require('./logger');

winston.info('Seeding the Database');

const users = [
    {
    "firstName": "Bald",
    "last_name": "O' Cuolahan",
    "email": "bocuolahan0@slideshare.net",
    "phone": "5962368856",
    "password": "q5LXdbJR9bgv"
    }, {
    "firstName": "Bogart",
    "last_name": "MacPharlain",
    "email": "bmacpharlain1@printfriendly.com",
    "phone": "4535858037",
    "password": "Ke4zlQPTt6u"
  }, {
    "firstName": "Sheena",
    "last_name": "McDugal",
    "email": "smcdugal2@boston.com",
    "phone": "5488390325",
    "password": "FDqZONWmB4rx"
  }, {
    "firstName": "Rozelle",
    "last_name": "Roylance",
    "email": "rroylance3@github.io",
    "phone": "8786630443",
    "password": "OqFC55"
  }, {
    "firstName": "Alfie",
    "last_name": "Viggars",
    "email": "aviggars4@cam.ac.uk",
    "phone": "2192065268",
    "password": "cOKUnRzLNZ"
  }, {
    "firstName": "Gil",
    "last_name": "Skippings",
    "email": "gskippings5@rambler.ru",
    "phone": "6409622487",
    "password": "kFC2SNi"
  }
];

const contacts = [
  {
    "first_name": "Linnie",
    "last_name": "Conisbee",
    "emails": [
      {
        "email": "ldownage0@wiley.com",
        "emailType": "work"
      },
      {
        "email": "dgoodbanne1@alexa.com",
        "emailType": "work"
      },
      {
        "email": "dmcmearty2@i2i.jp",
        "emailType": "work"
      }
    ],
    "phones": [
      {
        "phone": "575-547-9213",
        "phoneType": "home"
      },
      {
        "phone": "214-293-9329",
        "phoneType": "home"
      },
      {
        "phone": "504-241-2458",
        "phoneType": "home"
      }
    ]
  }, {
    "first_name": "Daren",
    "last_name": "Pellissier",
    "emails": [
      {
        "email": "scatherine0@washington.edu",
        "emailType": "work"
      },
      {
        "email": "estudeart1@feedburner.com",
        "emailType": "home"
      },
      {
        "email": "marbuckle2@pen.io",
        "emailType": "work"
      },
      {
        "email": "dburel3@disqus.com",
        "emailType": "home"
      }
    ],
    "phones": [
      {
        "phone": "395-488-1035",
        "phoneType": "mobile"
      }
    ]
  }, {
    "first_name": "Osgood",
    "last_name": "Rolfi",
    "emails": [
      {
        "email": "daizlewood0@prnewswire.com",
        "emailType": "home"
      },
      {
        "email": "bboylin1@dot.gov",
        "emailType": "work"
      },
      {
        "email": "amaccaffrey2@businessinsider.com",
        "emailType": "work"
      }
    ],
    "phones": [
      {
        "phone": "299-991-5491",
        "phoneType": "mobile"
      },
      {
        "phone": "705-777-1379",
        "phoneType": "mobile"
      },
      {
        "phone": "955-355-0050",
        "phoneType": "work"
      }
    ]
  }, {
    "first_name": "Devinne",
    "last_name": "Duffil",
    "emails": [
      {
        "email": "wrakestraw0@businessinsider.com",
        "emailType": "home"
      },
      {
        "email": "mchalder1@hp.com",
        "emailType": "home"
      },
      {
        "email": "cdecruce2@skyrock.com",
        "emailType": "work"
      }
    ],
    "phones": [
      {
        "phone": "488-568-7158",
        "phoneType": "home"
      },
      {
        "phone": "450-608-1580",
        "phoneType": "home"
      },
      {
        "phone": "801-681-6335",
        "phoneType": "mobile"
      }
    ]
  }, {
    "first_name": "Creighton",
    "last_name": "Cretney",
    "emails": [
      {
        "email": "sleander0@fotki.com",
        "emailType": "home"
      },
      {
        "email": "tsommersett1@sina.com.cn",
        "emailType": "home"
      },
      {
        "email": "klinnett2@woothemes.com",
        "emailType": "work"
      },
      {
        "email": "ayonnie3@bravesites.com",
        "emailType": "work"
      }
    ],
    "phones": [
      {
        "phone": "139-799-4818",
        "phoneType": "work"
      },
      {
        "phone": "698-820-6066",
        "phoneType": "home"
      },
      {
        "phone": "243-502-3224",
        "phoneType": "work"
      }
    ]
  }, {
    "first_name": "Ingar",
    "last_name": "Sweeney",
    "emails": [
      {
        "email": "rcrossby0@hubpages.com",
        "emailType": "work"
      },
      {
        "email": "cmuckleston1@ftc.gov",
        "emailType": "home"
      }
    ],
    "phones": [
      {
        "phone": "129-365-6829",
        "phoneType": "home"
      },
      {
        "phone": "854-448-7935",
        "phoneType": "work"
      },
      {
        "phone": "378-387-0918",
        "phoneType": "mobile"
      }
    ]
  }, {
    "first_name": "Ainslie",
    "last_name": "Poytress",
    "emails": [
      {
        "email": "bfarmar0@pen.io",
        "emailType": "home"
      },
      {
        "email": "owillstrop1@hp.com",
        "emailType": "home"
      }
    ],
    "phones": [
      {
        "phone": "588-817-0246",
        "phoneType": "work"
      },
      {
        "phone": "741-267-4450",
        "phoneType": "home"
      }
    ]
  }
];

/**
 *
 * @param model
 * @param doc
 * @return {Promise}
 */
const createDoc = function(model, doc) {
  return new Promise(function(resolve, reject) {
    new model(doc).save(function(err, saved) {
      return err ? reject(err) : resolve(saved);
    });
  });
};

/**
 * removes all data from the database
 * @return {Promise.<*>}
 */
const cleanDB = function() {
  winston.info('... cleaning the DB');
  const cleanPromises = [User, Contact]
    .map(function(model) {
      return model.remove().exec();
    });
  return Promise.all(cleanPromises);
}

/**
 * seeds the user database
 * @param data
 * @return {Promise.<TResult>|Promise}
 */
const createUsers = function(data) {

  const promises = users.map(function(user) {
    return createDoc(User, user);
  });

  return Promise.all(promises)
    .then(function(users) {
      return _.merge({users: users}, data || {});
    });
};

/**
 * creates contacts
 * @param data
 * @return {Promise.<TResult>|Promise}
 */
const createContacs = function(data) {
  const promises = contacts.map(function(contact) {
    return createDoc(Contact, contact);
  });

  return Promise.all(promises)
    .then(function(contacts) {
      return _.merge({contacts: contacts}, data || {});
    });
};

cleanDB()
  .then(createUsers)
  .then(createContacs)
  .catch(logger.log.bind(logger));
