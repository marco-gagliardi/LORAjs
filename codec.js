/***
 *  phyPayload  bytestring =  MHDR  (1 B) + MACPayload + MIC (4 B)
 *
 *  MACPayload = FHDR  (da 7 a 23) +      FPort (1 B opzionale)  +     FRMPayload
 *
 *  FHDR : DevAddr (4 B) + FCtrl (1B) + FCnt (2 B) + FOpts (0..15) La lunghezza di FOpts è indicata negli ultimi 4 bit di Fctrl
 *
 *  FPort :  1 Byte obbligatorio se FRMPayload è presente
 *
 *  FRMPayload: N byte lunghezza variabile. FHDR + Fport (1) + N ≤ maximum MAC payload length.
 *
 */

var exports = module.exports = {};

function PhyPayload (bytes) {

    /***
     * @type {null}
     *
     * PhyPayload  =  MHDR  (1 B)
     *                MACPayload [1, length-5]
     *                MIC (4 B)
     *
     */

    this.MHDR = [bytes[0]] ;
    this.MACPayload = bytes.length > 5 ? new MACPayload(bytes.slice(1,bytes.length-4)) : null;
    this.MIC = bytes.slice(-4);

}

function MACPayload(bytes) {
    /***
     * MACPayload = FHDR  (da 7 a 23) +      FPort (1 B opzionale)  +     FRMPayload
     *
     *  FHDR : DevAddr (4 B) +
     *         FCtrl (1B) +
     *         FCnt (2 B) +
     */

    var getFOptsLength = function(fctrl) {
        //FOpts (0..15) La lunghezza di FOpts è indicata negli ultimi 4 bit di Fctrl

    };

    this.FHDR = {
        DevAddr: bytes.slice(0,4),
        FCtrl: bytes[4] ? [bytes[4]] : [],
        FCnt: bytes.slice(5,6),
    };
    this.FHDR.FOpts = bytes.length == 7 ? [] : bytes.slice(6, getFOptsLength(this.FHDR.FCtrl));

    var FHDRLength = this.FHDR.DevAddr.length + this.FHDR.FCtrl.length + this.FHDR.FCnt.length  + this.FHDR.FOpts.length;

    this.FPort = bytes.length > FHDRLength ? bytes[FHDRLength] : [];

    this.FRMPayload = bytes.length > FHDRLength+1 ?  bytes.slice(FHDRLength+1) : []

}


exports.decode = function(keyStore, phyPayload) {

    return new PhyPayload(phyPayload);
};

exports.encode = function(keyStore, phyPayload) {
    return "encode";
};


