module.exports = function(app) {
    const eventsController = require('../controllers/eventsController');
    const tagsController = require('../controllers/tagsController');
    const placesController = require('../controllers/placesController');

    app.route('/api/tags')
        .get(tagsController.tag_list);

    app.route('/api/events')
        .get(eventsController.list_events);

    app.route('/api/places')
        .get(placesController.places_list);

    app.route('/api/events/:id')
        .get(eventsController.read_event)
};