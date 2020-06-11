const { WebhookClient } = require('dialogflow-fulfillment')


const mongoose = require('mongoose');
const Demand = mongoose.model('demand');
const Item = mongoose.model('item')

module.exports = app => {
    app.post('/', async (req, res) => {
        const agent = new WebhookClient({request: req, response: res})
      
        
       async function SSystems(agent){

        //system verwijst naar "s"
            Demand.findOne({'system': agent.parameters.SecurityTypes}, function(err, system){
                if (system !== null){
                    system.counter++;
                    system.save();
                }else{
                    const demand = new Demand({system: agent.parameters.securitytypes});
                    demand.save();
                }
            });
          /*  let responseText = `You want to know more about ${agent.parameters.securitytypes}.
            Here is a link to all of our systems available: https://google.be`;*/

            //securitytypes verwijst naar "parametername" in dialogflow

            //SecurityTypes verwijst naar entity in dialogflow
            let item = await Item.findOne({'item': agent.parameters.SecurityTypes});
            
            if(item !== null){
                responseText = `You want to know more about a ${agent.parameters.securitytypes}.
             ${item.info}`;
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