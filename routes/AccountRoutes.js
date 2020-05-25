'use strict';

let router = require('express').Router(),
  controller = require('../controllers/OAuthController');


router.post('/user', async (request, response) => {
  let result = await loginProvider.verifyAuthToken(request);

  if (result.status !== Constants.HTTP_200_OK) {
    response.clearCookie(Constants.AUTH_COOKIE_NAME);
    response.status(result.status);
    response.send(result.data);
    return;
  }

  request.body.userId = result.data.id;

  result = await provider.activateLicenseForUser(request);
  response.status(result.status);
  response.send(result.data);
});

module.exports = router;
