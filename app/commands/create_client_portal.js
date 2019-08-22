/**
 * Created by brunthavan on 6/20/17.
 */
const prompt = require('prompt');
const models = require('../../models/');
const randomString = require("randomstring");

prompt.start();
createClientCredentials();
prompt.stop();

function createClientCredentials() {
    console.log('Creating client id and client credential...');
    models.oauth_client.create({
        clientId: randomString.generate({
            length: 16,
            charset: 'alphabetic'
        }), clientSecret: randomString.generate({
            length: 30,
            charset: 'alphabetic'
        }), scope: 'PORTAL'
    }).then(function (results) {
        console.log("Client Id : " + results.clientId);
        console.log("Client Secret : " + results.clientSecret);
        console.log("Encoded Basic Token : " + new Buffer(results.clientId + ":" + results.clientSecret).toString('base64'));
    }).catch(function (err) {
        console.log("Error occurred " + err);
    });
}