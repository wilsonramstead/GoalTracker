
const controller = require('./controller');

module.exports = function(app){
    app.get('/goals', controller.index);
    app.post('/goals', controller.create);
    app.get('/goals/:id', controller.findOne);
    app.put('/goals/:id', controller.changeStatus);
    app.delete('/goals/:id', controller.delete);
}