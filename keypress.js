// This is a helped scipt for getting the process.stdin key codes for use in the cli.

process.stdin.setRawMode(true);
process.stdin.resume();
process.stdin.setEncoding('utf8');

process.stdin.on('data', function (key) {
    console.log(toUnicode(key)); //Gives you the unicode of the pressed key
    if (key == '\u0003') { process.exit(); }    // ctrl-c
});

function toUnicode(theString) {
    var unicodeString = '';
    for (var i = 0; i < theString.length; i++) {
        var theUnicode = theString.charCodeAt(i).toString(16).toUpperCase();
        while (theUnicode.length < 4) {
            theUnicode = '0' + theUnicode;
        }
        theUnicode = '\\u' + theUnicode;
        unicodeString += theUnicode;
    }
    return unicodeString;
}