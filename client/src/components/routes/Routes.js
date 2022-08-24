exports.home = "/"
exports.defaultRoot = "/app"

exports.event = exports.defaultRoot + "/events/:id"

exports.notification = exports.defaultRoot + "/notification/:id"
exports.login = exports.defaultRoot + "/login/"
exports.booking = exports.defaultRoot +"/booking/:id"
exports.likes = exports.defaultRoot +"/likes/:id"
exports.registration = exports.defaultRoot +"/registration/"
exports.manager = exports.defaultRoot + "/manager/"

exports.eventFromId = id => exports.defaultRoot + "/events/" + id
exports.bookingUserId = id => exports.defaultRoot + "/booking/" + id
exports.likesUserId = id => exports.defaultRoot + "/likes/" + id