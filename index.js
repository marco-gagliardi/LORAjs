/***
 *
 */
var codec = require("./codec");

var exports = module.exports = {};

exports.test = function () {

    var msg = [
        //MHDR (1B)
        0xFF,
        //MACPayload
            //FHDR
                //DevAddr (4B)   
                0xFF, 0x01, 0x20, 0x01,
                //FCtrl (1B) -> last 3 bits = 101 = 5 (Fopts length)
                0x25,
                //FCnt (2B)
                0x01, 0x20,
                //FOpts (5B)
                0x01, 0x20, 0x01, 0x20,0x20,
            //FPort (1B)
            0x01,
            //FRMPayload  
            0x01, 0x20, 0x01, 0x20,0x01, 0x20, 0x01, 0x20,
        //MIC (4B)
        0x01, 0x20, 0x01, 0x0];

    console.log("Message: %j",  codec.decode("",msg));
};

exports.test();