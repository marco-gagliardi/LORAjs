/***
 *
 */
var codec = require("./codec");

var exports = module.exports = {};

var bytes = [0x4, 0xFF, 0x01, 0x20, 0x01, 0x20,0x01, 0x20,0x01, 0x20,0x01, 0x20, 0x0];
exports.test = function () {
    console.log(codec.decode("",bytes));
};

exports.test();
