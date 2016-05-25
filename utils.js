var exports = module.exports = {

    /***
     * Splits a byte into an array of bits
     *
     * @param octet
     * @returns {Array}
     */
    splitByte: function (octet) {
        var bits = [];
        for (var i = 7; i >= 0; i--) {
            var bit = octet & (1 << i) ? 1 : 0;
            bits.push(bit);
        }
        return bits;
    },

    /***
     * Converts an array to an unsigned 8 bit array
     * @param arr
     * @returns {Uint8Array}
     */
    arr2Uint8Array: function (arr) {
        var buf = new ArrayBuffer(arr.length);
        var bufView = new Uint8Array(buf);
        for (var i=0;  i<arr.length; i++) {
            bufView[i] = arr[i];
        }
        return bufView;
    },
    /***
     * Reads a subset of bits within a byte and parses its value
     * @param octet: byte
     * @param s : start bit position
     * @param t : to bit position
     * @returns {number}
     */
    readBits: function (octet, s, t) {
        var start = s || 0;
        var to = t || 7;
        var n = to  >= start ? to - start + 1 : 0;
        var shift = 7-to;
        var mask;
        switch(n) {
            case 1:
                mask="0x1";
                break;
            case 2:
                mask="0x3";
                break;
            case 3:
                mask="0x7";
                break;
            case 4:
                mask="0xF";
                break;
            case 5:
                mask="0x1F";
                break;
            case 6:
                mask="0x3F";
                break;
            case 7:
                mask="0x7F";
                break;
            case 8:
            default:
                mask="0xFF";
        }
        // console.log("Input:   ", octet);
        // console.log("octet:   ",  this.splitByte(octet));
        // console.log("shifted  ", this.splitByte(octet >> shift));
        // console.log("mask     ", this.splitByte(mask));
        return ((octet >> shift) & mask) ;
    }
};

