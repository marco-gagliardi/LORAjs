/***
 *
 */
var exports = module.exports = {};

var codec = require("./codec");

exports.decode = codec.decode;

console.log(exports.decode("",[0x4, 0xFF, 0x01, 0x20, 0x01, 0x20,0x01, 0x20,0x01, 0x20,0x01, 0x20, 0x0]))
