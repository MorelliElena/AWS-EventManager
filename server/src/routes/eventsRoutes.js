module.exports = function(app) {
    const eventsController = require('../controllers/eventsController');

    app.route('/api/events')
        .get(eventsController.list_events);

    app.route('/api/events/:id')
        .get(eventsController.read_event)
};