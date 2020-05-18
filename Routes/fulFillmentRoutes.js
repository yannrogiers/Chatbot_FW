const { WebhookClient } = require('dialogflow-fulfillment')


const mongoose = require('mongoose');
const Demand = mongoose.model('demand');
const Item = mongoose.model('item')

module.exports = app => {
    app.post('/', async (req, res) => {
        const agent = new WebhookClient({request: req, response: res})

            function snoopy(agent){
            agent.add(`Welcome to an intent`);
        }
      
        
       async function SSystems(agent){
            Demand.findOne({'securitySystem': agent.parameters.securityTypes}, function(err, securitySystem){
                if (securitySystem !== null){
                    securitySystem.counter++;
                    securitySystem.save();
                }else{
                    const demand = new Demand({securitySystem: agent.parameters.securitytypes});
                    demand.save();
                }
            });
            let responseText = `You want to know more about ${agent.parameters.securitytypes}.
            Here is a link to all of our systems available: https://google.be`;

            let item = await Item.findOne({'item': agent.parameters.securityTypes});
            if(item !== null){
                responseText = `You want to know more about ${agent.parameters.securitytypes}.
            Here is a link to all of our systems available: ${item.link}`;
            }

            agent.add(responseText);
        }
        function fallback(agent) {
            agent.add("I didn't understand, sorry");
            agent.add("Could you try that again?")
        }

        let intentMap = new Map();
        intentMap.set("Securtiy Systems", SSystems);
        intentMap.set("Default Fallback Intent", fallback)

        agent.handleRequest(intentMap);
    });
}