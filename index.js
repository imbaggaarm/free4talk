const crypto = require("crypto");
const readline = require('readline');

const ENCRYPTION_KEY = "kYAXem2RiME0BThJFNuS4zQfUC8pyH7D";

function decode(token) {
    var tk_parts = token.split(":"),
        iv = Buffer.from(tk_parts.shift(), "hex"),
        encryptedText = Buffer.from(tk_parts.join(":"), "hex"), // tk_parts only has one element yet, the join function makes it become a string.
        decipher = crypto.createDecipheriv("aes-256-cbc", Buffer.from(ENCRYPTION_KEY), iv),
        decrypted = decipher.update(encryptedText);
    return (decrypted = Buffer.concat([decrypted, decipher.final()])).toString()
}

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question('Please enter the room token: ', (token) => {
    url = decode(token, [token])
    console.log('The room url is: ', url)
    rl.close();
});