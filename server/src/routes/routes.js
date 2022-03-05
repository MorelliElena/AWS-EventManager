const usersController = require("../controllers/usersController");
module.exports = function(app) {
    const eventsController = require('../controllers/eventsController');
    const tagsController = require('../controllers/tagsController');
    const placesController = require('../controllers/placesController');
    const usersController = require('../controllers/usersController');

    app.route('/api/tags')
        .get(tagsController.tag_list);

    app.route('/api/events')
        .get(eventsController.list_events);

    app.route('/api/places')
        .get(placesController.places_list);

    app.route('/api/events/:id')
        .get(eventsController.read_event)

    app.route('/api/login')
        .post(usersController.checkAuthentication)

    app.route('/api/login/:id')
        .get(usersController.getProfileData)

    app.route('/api/update')
        .post(usersController.updateUserData)
};