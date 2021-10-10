const tagsController = require("../controllers/tagsController");
module.exports = function(app) {
    const eventsController = require('../controllers/eventsController');
    const tagsController = require('../controllers/tagsController');

    app.route('/api/tags')
        .get(tagsController.tag_list);

    app.route('/api/events')
        .get(eventsController.list_events);

    app.route('/api/events/:id')
        .get(eventsController.read_event)
};