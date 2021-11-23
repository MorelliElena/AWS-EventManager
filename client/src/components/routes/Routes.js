exports.home = "/"
exports.defaultRoot = "/app"

exports.event = exports.defaultRoot + "/events/:id"

exports.profile = exports.defaultRoot + "/user/:id"
exports.notification = exports.defaultRoot + "/user/:id"

exports.eventFromId = id => exports.defaultRoot + "/events/" + id