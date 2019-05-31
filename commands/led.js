const req = require('../lib/requests');
module.exports = {
    name: 'led',
    description: 'Changes the color of the led thru keywords or hex values',
    usage: '[command name] or shorform [command name] hexvalue without the #',
    argsUsage: [],
    execute(args) {
        const color = args._[1];
        
        if (color) {
            if (color.search(/^[0-9a-f]{6}$/i) != -1) {
                req.post('zbestsolutions.it:5000/api/rgb', { "rgb" : `#${color}` })
                .then(response =>{
                    console.log(`Color changed to ${response.rgb}`);
                    process.exit();
                })
                .catch(err =>{
                    console.log(err.message);
                    process.exit();
                })
            }
        } else{
            //keywords
            console.log('todo: keywords w/ autocomplete');
        }
    },
};