module.exports = function(app) {
    var eventsController = require('../controllers/eventsController');

    app.route('/api/events')
        .get(eventsController.list_events);

};