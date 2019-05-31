module.exports = {
    name: 'led',
    description: 'Changes the color of the led thru keywords or hex values',
    usage: '[command name]',
    execute(args) {
        console.log(`LED works... not realy, but this is just a test!`);
        console.log(args);
        
    },
};