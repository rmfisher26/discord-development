//AWS NodeJS Lambda Handler
const nacl = require('tweetnacl');
const AWS = require('aws-sdk')

exports.handler = async (event) => {
    // Checking signature (requirement 1.)
    // Your public key can be found on your application in the Developer Portal
    const PUBLIC_KEY = process.env.DISCORD_PUBLIC_KEY; //need to pull in public key
  
    const signature = event.headers['x-signature-ed25519']
    const timestamp = event.headers['x-signature-timestamp'];
    const strBody = event.body; // should be string, for successful sign
  
    const isVerified = nacl.sign.detached.verify(
      Buffer.from(timestamp + strBody),
      Buffer.from(signature, 'hex'),
      Buffer.from(PUBLIC_KEY, 'hex')
    );
  
    if (!isVerified) {
      return {
        statusCode: 401,
        body: JSON.stringify('invalid request signature'),
      };
    }

    //TODO: Do AWS stuff here


    // If no handler implemented for Discord's request
    return {
        statusCode: 404  
      }
};

//UNCOMMENT FOR TESTING:
/* 
var event
exports.handler(event).then(result => {
  console.log(result)
});
*/
