// Returns promises containing the parsed json values.
const rp = require('request-promise');
function format(uri) {
    if (!uri.startsWith('http://')) {
        return `http://${uri}`
    }
    return uri;
}
module.exports = {
    get(uri){
        uri = format(uri);
        const optionsGet = {
            uri,
            headers: {
                'User-Agent': 'Request-Promise'
            },
            json: true // Automatically parses the JSON string in the response
        };
        return rp(optionsGet);
    },
    post(uri, body){
        uri = format(uri);
        const optionsPost = {
            method: 'POST',
            uri,
            body,
            json: true // Automatically stringifies the body to JSON
        };

        return rp(optionsPost)
    }
};