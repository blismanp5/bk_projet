'use strict';

let router = require('express').Router();


router.get('/', async (request, response) => {
  response.status(200);
  response.send("<html><body><form method='post'><button type='submit' value='Authenticate'>Authenticate</button></form></body></html>")
});

router.post('/', async (request, response) => {
  //trigger the OAuth mechanism from Revolut

});

module.exports = router;
