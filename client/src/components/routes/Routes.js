exports.home = "/"
exports.defaultRoot = "/app"

exports.event = exports.defaultRoot + "/events/:id"

exports.eventFromId = id => exports.defaultRoot + "/events/" + id