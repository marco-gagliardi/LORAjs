/***
 *  PhyPayload:
 *      MHDR  (1B)                     //First byte
 *      MACPayload (total length - 5B) // Variable length
 *          FHDR  [7 .. 23 B]           // Minimum 7 Bytes, up to 23.
 *              DevAddr (4 B)           // Mandatory
 *              FCtrl (1 B)             // Mandatory
 *              FCnt (2 B)              // Mandatory
 *              FOpts [0..15 B]         // Optional. FOpts length is stated by the last 4 bits of Fctrl (max 2^4 - 1 = 15 bytes)
 *          FPort [0, 1 B]              // 1 Byte. Mandatory if  FRMPayload is present
 *          FRMPayload (? B)            // Variable length. FHDR + Fport + FRMPayload ≤ maximum MAC payload length
 *      MIC (4 B)                       // last 4 bytes
 *
 *
 */
var message = require("./message");
var utils = require("./utils");
var exports = module.exports = {};

function PhyPayload (bytes) {
    this.MHDR = bytes[0];
    this.MType = utils.readBits(this.MHDR, 0,2);
    this.MACPayload = bytes.length > 5 ? new MACPayload(bytes.slice(1,bytes.length-4)) : null;
    this.MIC = bytes.slice(-4);
}

function MACPayload(bytes) {
    
    var getFOptsLength = function(fctrl) {
        //FOpts length is stated by the last 4 bits of Fctrl (max 2^4 - 1 = 15 bytes)
        return utils.readBits(fctrl, 4,7)
    };

    this.FHDR = {
        DevAddr: bytes.slice(0,4),
        FCtrl: bytes[4] ? bytes[4] : null,
        FCnt: bytes.slice(5,7)
    };
    this.FHDR.FOpts = bytes.length == 7 ? null : bytes.slice(7, 7+getFOptsLength(this.FHDR.FCtrl));

    var FHDRLength = 7 + this.FHDR.FOpts.length;

    //  FPort:  1 Byte, Mandatory if  FRMPayload is present
    this.FPort = bytes.length > FHDRLength ? bytes[FHDRLength] : null;
    this.FRMPayload = bytes.length > FHDRLength+1 ?  bytes.slice(FHDRLength+1) : null;
}


exports.decode = function(keyStore, m) {
    return new PhyPayload(message.uplinkMessage(m));
};

exports.encode = function(keyStore, phyPayload) {
    return "encode";
};


