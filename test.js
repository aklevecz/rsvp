var crypto = require("crypto");
var shasum = crypto.createHash("sha1");
shasum.update("fooaaa");
const b = shasum.digest("hex"); // => "0beec7b5ea3f0fdbc95d0dd47f3c5bc275da8a33"
console.log(b);
