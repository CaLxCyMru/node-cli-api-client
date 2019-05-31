// Could change this to imports
const req = require('../lib/requests');

const execute = async (args) => {
    const color = args._[1];

    if (!colour) {
       console.log('todo: keywords w/ autocomplete');
       return;   
    }

    if (color.search(/^[0-9a-f]{6}$/i) === -1) {
        return;
    }

    try { 
         const response = await req.post('zbestsolutions.it:5000/api/rgb', { "rgb" : `#${color}` });
        console.log(`Color changed to ${response.rgb}`);
    } catch(err) { 
        console.log(err.message);
    }

    process.exit();
};

export default {
    name: 'led',
    description: 'Changes the color of the led thru keywords or hex values',
    usage: '[command name] or shorform [command name] hexvalue without the #',
    argsUsage: [],
    execute,
};
