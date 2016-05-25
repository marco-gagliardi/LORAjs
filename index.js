/***
 *
 */
var codec = require("./codec");

var exports = module.exports = {};

exports.test = function () {

    var msg = [
        //MHDR (1B)
        0x4,
        //MACPayload
            //FHDR
                //DevAddr (4 B)   
                0xFF, 0x01, 0x20, 0x01,
                //FCtrl (1 B) -> ultimi 3 bit = 101 = 5 (lunghezza Fopts)
                0x25,
                //FCnt (2 B)
                0x01, 0x20,
                //FOpts [5 B]
                0x01, 0x20, 0x01, 0x20,0x20,
            //FPort [1 B]
            0x01,
            //FRMPayload (? B) 
            0x01, 0x20, 0x01, 0x20,
        //MIC (4B)
        0x01, 0x20, 0x01, 0x0];

    console.log("Message: %j",  codec.decode("",msg));
};

exports.test();