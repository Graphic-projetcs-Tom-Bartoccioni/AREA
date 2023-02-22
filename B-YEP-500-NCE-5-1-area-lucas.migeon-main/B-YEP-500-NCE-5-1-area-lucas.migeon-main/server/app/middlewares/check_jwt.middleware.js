const { auth } = require('express-oauth2-jwt-bearer');
const { AUTH0 } = require('../config');

module.exports = auth({
    audience: AUTH0.API_AUDIENCE,
    issuerBaseURL: `https://${AUTH0.DOMAIN}/`
});