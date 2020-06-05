module.exports = {
    googleProjectID: process.env.GOOGLE_PROJECT_ID,
    dialogFlowSessionID: process.env.DIALOG_SESSION_ID,
    dialogFlowSessionLanguageCode: process.env.DIALOGFLOW_LANGUAGE_CODE,
    googleClientEmail: process.env.GOOGLE_CLIENT_EMAIL,
    googlePrivateKey: JSON.parse(process.env.GOOGLE_PRIVATE_KEY),
    mongoURI: 'mongodb+srv://yannrogiers:A602.11g*@finalworkcluster-mavxa.mongodb.net/chatbot?retryWrites=true&w=majority',
    JWT_SECRET: process.env.JWT_SECRET || 'somethingsecret',
    paypalId: 'AS2LGkNfGLIioBc8ZeLhBlImUYh7lsPveEJJ8SwG5v0klYv-zBDT03U6i4P2D0HvT_vBgLwBiR0LNVuj'

}