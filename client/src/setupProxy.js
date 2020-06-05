const {createProxyMiddleware} = require('http-proxy-middleware');


//alle requests die naar root api gestuurd worden, worden geredirect naar backend app (localhost:5000)
module.exports = function(app) {
    app.use(createProxyMiddleware('/api', {target: 'https://infinite-castle-02083.herokuapp.com'}));
};