var exports = module.exports = {}

exports.uplinkMessage = function(bytes) {

    if(typeof bytes == "object" && Array.isArray(bytes))
        return bytes;

}


exports.downLinkMessage = function(bytes) {

    if(typeof bytes == "object" && Array.isArray(bytes))
        return bytes;

}