exports.home = "/"
exports.defaultRoot = "/app"

exports.event = exports.defaultRoot + "/events/:id"

exports.profile = exports.defaultRoot + "/user/"
exports.notification = exports.defaultRoot + "/notification/:id"
exports.login = exports.defaultRoot + "/login/"

exports.eventFromId = id => exports.defaultRoot + "/events/" + id