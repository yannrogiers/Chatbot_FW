const { WebhookClient } = require('dialogflow-fulfillment')

module.exports = app => {
    app.post('/', async (req,res) => {
        const agent = new WebhookClient({request: req, respone: res});

        function fallback(agent) {
            agent.add(`I do not understand, please try rephrasing your question.`);
            agent.add(`Try to ask another question please.`);
        }

        function Security(agent){
            agent.add(`Welcome to security fulfillment`);
        }
        let intentMap = new Map();

        intentMap.set('Securtiy Systems', Security)

        intentMap.set('Default Fallback Intent', fallback)


        agent.handleRequest(intentMap);
    });
}