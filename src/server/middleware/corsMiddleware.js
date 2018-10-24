config = require('../config/config');
// passes cors header to the header
module.exports = () => {
  return (request, response, next) => {
  // front end website is set in the .env file
  response.setHeader('Access-Control-Allow-Origin', config.front_end);

  // Request methods you wish to allow
  response.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  // Request headers you wish to allow
  response.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  response.setHeader('Access-Control-Allow-Credentials', true);

  // Pass to next layer of middleware
  next();
  }
}

