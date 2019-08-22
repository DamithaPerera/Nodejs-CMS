const env = process.env.NODE_ENV || "development";
const properties = require('./properties.json')[env];
const oauthServer = require('oauth2-server');

let oauth = oauthServer({
    model: require('./oauth_repository'),
    grants: ['password','client_credentials','refresh_token'],
    debug: true,
    accessTokenLifetime: properties.oauth.accessTokenLifetime,
    refreshTokenLifetime: properties.oauth.refreshTokenLifetime,
    clientIdRegex: '^[A-Za-z0-9-_\^]{5,30}$'
});

module.exports = oauth;
