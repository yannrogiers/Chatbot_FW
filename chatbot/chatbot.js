'use strict';
const dialogflow = require('dialogflow');
const structjson = require('./structjson');
const config = require('../config/keys');

const projectID = config.googleProjectID;
const sessionID = config.dialogFlowSessionID;
const languageCode = config.dialogFlowSessionLanguageCode;

const credentials = {
    client_email: config.googleClientEmail,
    private_key: config.googlePrivateKey
}

//Instantiate a DialogFlow client.
const sessionClient = new dialogflow.SessionsClient({ projectID, credentials });

//Define session path
//const sessionPath = sessionClient.sessionPath(config.googleProjectID, config.dialogFlowSessionID);


module.exports = {
    textQuery: async function (text, userID, parameters = {}) {
        let sessionPath = sessionClient.sessionPath(projectID, sessionID + userID);
        let self = module.exports;
        const request = {
            session: sessionPath,
            queryInput: {
                text: {
                    text: text,
                    languageCode: languageCode,
                },
            },
            queryParams: {
                payload: {
                    data: parameters
                }
            }
        };

        let responses = await sessionClient.detectIntent(request)
        responses = await self.handleAction(responses)
        return responses;
    },

    eventQuery: async function (event, userID, parameters = {}) {
        let sessionPath = sessionClient.sessionPath(projectID, sessionID + userID);
        let self = module.exports;
        const request = {
            session: sessionPath,
            queryInput: {
                event: {
                    name: event,
                    parameters: structjson.jsonToStructProto(parameters),
                    languageCode: languageCode,
                },
            }
        };

        let responses = await sessionClient.detectIntent(request)
        responses = await self.handleAction(responses)
        return responses;
    },

    handleAction: function (responses) {
        return responses;
    }
}