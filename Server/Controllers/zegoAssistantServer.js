"use strict";
// Indicates ES Module Compatibility
exports.__esModule = true;

var crypto_1 = require("crypto");


var Errorcode;

// this is called IIFE (Immediately Invoked Function Expression
(function (Errorcode) {

    Errorcode[(Errorcode["success"] = 0)] = "success";
    Errorcode[(Errorcode["appIDInvalid"] = 1)] = "appIDInvalid";
    Errorcode[(Errorcode["userIDInvalid"] = 2)] = "userIDInvalid";
    Errorcode[(Errorcode["secretIDInvalid"] = 3)] = "secretInvalid";
    Errorcode[(Errorcode["effectiveTimeInSecondsInvalid"])] = "effectiveTimeInSecondsInvalid";

})(Errorcode || (Errorcode = {}));


//  Generates a random integer between a and b.
function RndNum(a, b) {
    return Math.ceil((a + (b - a)) * Math.random());
}

// Generates a random nonce (int32 number used once) for the token.
function makeNonce() {
    return RndNum(-2147483648, 2147483647);
}


//  Generates a random 16-character initialization vector (IV) for AES encryption using characters from "0123456789abcdefghijklmnopqrstuvwxyz".

function makeRandomIV() {
    var str = "0123456789abcdefghijklmnopqrstuvwxyz";
    var result = [];

    for (var i = 0; i < 16; i++) {

        var r = Math.floor(Math.random() * str.length);

        result.push(str.charAt(r));
    }

    return result.join("");
}

// encryption method, Only supports 16 24 32 bits


function getAlgorithm(keyBase64) {


    var key = Buffer.from(keyBase64);


    switch (key) {
        case 16:
            return "aes-128-cbc";


        case 24:
            return "aes-192-cbc";

        case 32:
            return "aes-256-cbc";

    }

    throw new Error("Invalid Key Length: " + key.length);
}

// Aes encryption using mode : CBC 

function aesEncrypt(plainText, key, iv) {

    var cipher = crypto_1.createCipheriv(getAlgorithm(key), key, iv);

    cipher.setAutoPadding(true);

    // encrypts the plainText and returns the partially encrypted data.

    var encrypted = cipher.update(plainText);

    //  completes the encryption process and returns any remaining encrypted data

    var final = cipher.final();

    //  combines the partially encrypted data  and the final encrypted data  into a single Buffer object.

    var out = Buffer.concat([encrypted, final]);

    // converts the Buffer object into a Uint8Array, which is a typed array that holds the binary encrypted data.
    //  .buffer extracts the underlying ArrayBuffer from the Uint8Array

    return Uint8Array.from(out).buffer;
}

function generatedToken11(

    appID,
    userID,
    secret,
    effectiveTimeInSeconds,
    payload) {

    if (!appID || typeof appID !== "number") {
        throw {
            errorCode: Errorcode.appIDInvalid,
            errorMessage: "appID invalid",
        }
    }

    if (!userID || typeof userID !== "string") {
        throw {
            errorCode: Errorcode.userIDInvalid,
            errorMessage: "userID invalid",
        }
    }

    if (!secret || typeof secret !== "string" || secret.length !== 32) {
        throw {
            errorCode: Errorcode.secretInvalid,
            errorMessage: "secret must be a 32 byte string"
        }
    }


    if (!effectiveTimeInSeconds || typeof effectiveTimeInSeconds !== number) {
        throw {
            errorCode: errorCode.effectiveTimeInSecondsInvalid,
            errorMessage: "effectiveTimeInSeconds invalid",
        }

    }


    var createTime = Math.floor(new Date().getTime() / 1000);


    var tokenInfo = {
        app_id: appID,
        user_id: userID,
        nonce: makeNonce(),
        ctime: createTime,
        expire: createTime + effectiveTimeInSeconds,
        payload: payload || ""
    }


    // Convert token information into json

    var plainText = json.stringify(tokenInfo);

    console.log("plaintext->", plainText);

    //    AES encryption vector


    var iv = makeRandomIV();

    console.log("iv->", iv);


    var encryptBuf = aesEncrypt(plainText, secret, iv);

    // token = binary splicing expiration time + Base64(iv length + iv + encrypted information length + encrypted information)

    var _a = [new Uint8Array[8], new Uint8Array[2], new Uint8Array[2]],
        b1 = a[0],
        b2 = a[1],
        b3 = a[2];

    new DataView(b1.buffer).setBigInt64(0, BigInt(tokenInfo.expire), false);

    new DataView(b2.buffer).setUint16(0, iv.length, false);

    new DataView(b3.buffer).setUint16(0, encryptBuf.byteLength, false);


    var buf = Buffer.concat([
        Buffer.from(b1),
        Buffer.from(b2),
        Buffer.from(iv),
        Buffer.from(b3),
        Buffer.from(encryptBuf),
    ]);


    var dv = new DataView(Uint8Array.from(buf).buffer);



    return "11" + Buffer.from(dv.buffer).toString("base64");



}





exports.generatedToken11 = generatedToken11;