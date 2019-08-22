const models = require('../../models/index');
var bcrypt = require('bcryptjs');
const model = module.exports;

model.getAccessToken = function (bearerToken, callback) {


    models.oauth_access_token.findAll({
        where: {
            accessToken: bearerToken
        }
    }).then(function (results) {
        if (!results || !results.length) return callback(null);

        // This object will be exposed in req.oauth.token
        // The user_id field will be exposed in req.user (req.user = { id: "..." }) however if
        // an explicit user object is included (token.user, must include id) it will be exposed
        // in req.user instead
        let token = results[0];

        callback(null, {
            accessToken: token.accessToken,
            clientId: token.clientId,
            expires: token.expires,
            userId: token.userId
        });
    }).catch(function (err) {
        if (err) return callback(err);
    });
};


model.getClient = function (clientId, clientSecret, callback) {
    models.oauth_client.findAll({
        where: {
            clientId: clientId
        }
    }).then(function (oauth_clients) {
        let client = oauth_clients[0];

        if (!client)
            return callback();

        if (clientSecret !== null && client.clientSecret !== clientSecret) return callback();

        // This object will be exposed in req.oauth.client
        callback(null, {
            clientId: client.id,
            clientSecret: client.clientSecret,
            userId: client.user_id,
            redirectUri: client.redirectUri
        });
    }).catch(function (err) {
        if (err) return callback(err);
    });

};

model.getUserFromClient = function (clientId, clientSecret, callback) {
    models.oauth_client.findAll({
        where: {
            clientId: clientId
        }
    }).then(function (oauth_clients) {
        let client = oauth_clients[0];

        if (clientSecret !== null && client.clientSecret !== clientSecret) return callback();

        // This object will be exposed in req.oauth.client
        callback(null, {
            clientId: client.id,
            clientSecret: client.clientSecret,
            userId: client.user_id,
            redirectUri: client.redirectUri
        });
    }).catch(function (err) {
        if (err) return callback(err);
    });

};

/* REFRESH TOKEN IS NOT TESTED */
model.getRefreshToken = function (bearerToken, callback) {
    models.oauth_refresh_token.findAll({
        where: {
            refreshToken: bearerToken
        }
    }).then((results) => {
        callback(null, results && results.length ? results[0] : false);
    }).catch(function (err) {
        if (err) return callback(err);
    });
};

// This will very much depend on your setup, I wouldn't advise doing anything exactly like this but
// it gives an example of how to use the method to resrict certain grant types


model.grantTypeAllowed = function (clientId, grantType, callback) {
    // LOGIC TO CHECK IF THE grantType is allowed for the particular clientId


    models.oauth_client.find({
        where: {
            clientId: clientId

        }
    }).then(client => {
        console.log('find')
        return callback(false, true);
    }).catch(e => {
        console.log('find catch')
        return callback(false, false);
    });
};


model.saveAccessToken = function (accessToken, clientId, expires, userId, callback) {
    models.oauth_access_token.create({
        accessToken: accessToken, clientId: clientId, userId: userId['id'], expires: expires
    }).then(function (results) {
        callback(null);
    }).catch(function (err) {
        console.log(err);
        if (err) return callback(err);
    });
};

/* REFRESH TOKEN IS NOT TESTED */
model.saveRefreshToken = function (refreshToken, clientId, expires, userId, callback) {
    models.oauth_refresh_token.create({
        refreshToken: refreshToken, clientId: clientId, userId: userId['id'], expires: expires
    }).then(function (results) {
        callback(null);
    }).catch(function (err) {
        if (err) return callback(err);
    });
};

/*
 * Required to support password grant type
 */
model.getUser = function (username, password, callback) {
    models.user.findOne({
        where: {
            email: username,
        }
    }).then(function (mobileUser) {
        if (!mobileUser)
            callback(null, false);
        if (!mobileUser.isActive)
            callback(null, false);

        bcrypt.compare(password, mobileUser.password, (err, res) => {
            if (res) {
                callback(null, mobileUser);
            } else {
                callback(null, false);
            }
        });

    }).catch(function (err) {
        if (err) return callback(err);
    });
};
//auth code grant type
model.saveAuthCode = function (authCode, clientId, expires, user, callback) {
    let code = {
        authCode: authCode,
        clientId: clientId,
        userId: user.id
    };
    if (expires) code.expires = parseInt(expires / 1000, 10);
    db.oauth_codes.save(code, callback);
};
model.getAuthCode = function (bearerCode, callback) {
    db.oauth_codes.find({authCode: bearerCode}, function (err, codes) {
        code = codes[0];
        if (code && code.expires) {
            code.expires = new Date(code.expires * 1000);
        }
        callback(err, code);
    })
};







