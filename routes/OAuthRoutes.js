'use strict';

let router = require('express').Router();
const fs = require('fs');
const jwt = require('jsonwebtoken');

router.post('/', async (request, response) => {

  // const issuer = 'bproject.com' // Issuer for JWT, should be derived from your redirect URL
  // const client_id = '<CLIENT_ID>' // Your client ID
  // const aud = 'https://revolut.com' // Constant
  // const payload = {
  //   "iss": issuer,
  //   "sub": client_id,
  //   "aud": aud
  // }
  // const privateKey = fs.readFileSync(privateKeyName);
  // const token = jwt.sign(payload, privateKey, { algorithm: 'RS256', expiresIn: 60 * 60});


  //create the jwt token and get the refresh and access tokens
  response.status(200);
  response.headers()
  response.send("")
});

module.exports = router;
