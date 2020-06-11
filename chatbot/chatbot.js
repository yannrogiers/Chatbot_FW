'use strict';
const dialogflow = require('dialogflow');
const structjson = require('./structjson');
const config = require('../config/keys');
const mongoose = require('mongoose');

const projectID = config.googleProjectID;
const sessionID = config.dialogFlowSessionID;
const languageCode = config.dialogFlowSessionLanguageCode;


//Credentials van google
const credentials = {
    client_email: config.googleClientEmail,
    private_key: config.googlePrivateKey
}

//Instantiate a DialogFlow client.
const sessionClient = new dialogflow.SessionsClient({ projectID, credentials });

//Nieuw model voor registration in de database
const Registration = mongoose.model('registration');


module.exports = {
    //Antwoord voor textquery
    /* https://cloud.google.com/dialogflow/docs/reference/rest/v2beta1/DetectIntentResponse */
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
        //Bepaal intent voo response te senden
        let responses = await sessionClient.detectIntent(request)
        responses = await self.handleAction(responses)
        return responses;
    },
    //Antwoord voor event query
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

    //actie die wordt uitgevoerd wanneer op Yes wordt geduwd bij recommend
    handleAction: function (responses) {
        let self = module.exports;
        let queryResult = responses[0].queryResult;

        switch (queryResult.action) {
            case 'recommendsecuritysystems-yes':
                if (queryResult.allRequiredParamsPresent) {
                    self.saveRegistration(queryResult.parameters.fields)
                }
                break;
        }

        return responses;
    },

    //Nieuwe info verkregen van user in database zetten
    saveRegistration: async function (fields) {
        const registration = new Registration({
            name: fields.name.stringValue,
            address: fields.address.stringValue,
            phone: fields.phone.stringValue,
            email: fields.email.stringValue,
            dateSent: Date.now()
            
        });
        try{
            let reg = await registration.save();
            console.log(reg);
        } catch(err){
            console.log(err);
        }
    }
};