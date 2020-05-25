'use strict';

process.env.NODE_CONFIG_DIR = './config';

let http = require('http'),
  port = process.env.PORT || 3000;


'use strict';

let express = require('express'),
  bodyParser = require('body-parser'),
  cookieParser = require('cookie-parser'),
  config = require('config');

let service = express();
service.set('port', port);
service.set('trust proxy', config.trustProxy);
service.use(bodyParser.json());
service.use(bodyParser.urlencoded({extended: false}));
service.use(cookieParser());
service.use((request, response, next) => {
  response.header('Access-Control-Allow-Origin', config.cors.allowedHost);
  response.header('Access-Control-Allow-Headers', config.cors.allowedHeaders);
  response.header('Access-Control-Allow-Methods', config.cors.allowedMethods);
  response.header('Access-Control-Allow-Credentials', true);
  next();
});


service.use('/v1/auth/', require('./routes/OAuthRoutes'));
service.use('/v3/api/accounts', require('./routes/AccountRoutes'));
service.use('/', require('./routes/IndexRoute'));

// Default error handlers
service.use((request, response, next) => {
  let error = new Error(`Not Found: ${request.method} ${request.originalUrl}`);
  error.status = 404;
  next(error);
});

service.use((error, request, response) => {
  response.status(error.status || 500);
  response.send({
    message: error.message,
    error: process.env.NODE_ENV === 'production' ? {} : error
  });
});


let server = http.createServer(service);
server.listen(port);
server.on('listening', onListening);
server.on('error', onError);

function onListening() {
  //use advanced logging with winston
  console.debug(`Listening on ${server.address().port}`);
}

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  switch (error.code) {
    case 'EACCES':
      console.error(`Port ${port} requires elevated privileges`);
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(`Port ${port} is already in use`);
      process.exit(1);
      break;
    default:
      throw error;
  }
}
