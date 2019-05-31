const req = require('../lib/requests');
const Slider = require('../slider.js');
const ora = require('ora');

module.exports = {
    name: 'servo',
    description: 'Renders a slider for chaning ',
    usage: '[command name]',
    argsUsage: [`-l : Activates live change mode.`],
    execute(args) {
        const spinner = ora('Getting Servo current value').start();
        req.get('http://zbestsolutions.it:5000/api/servo')
            .then(function (response) {
                spinner.stop();
                const slider = new Slider(response, 360);

                slider.on('value', (value) => {
                    spinner.text = 'Chaning value...';
                    spinner.start();
                    req.post('http://zbestsolutions.it:5000/api/servo', { "servo": value })
                        .then(function (parsedBody) {
                            spinner.stop();
                            console.log(`Value Changed to ${value}`);
                            process.exit();
                        }).catch(err => {
                            spinner.fail();
                            console.log(err.message);
                            process.exit();
                        })
                })
                if (args.l) {
                    slider.on('changed', (value) => {
                        req.post('http://zbestsolutions.it:5000/api/servo', { "servo": value })
                            .then(function (parsedBody) {
                                // Post went thru
                            }).catch(err => {
                                spinner.fail();
                                console.log(err.message);
                                process.exit();
                            })
                    });
                }
            })
            /* Fairly certain this final catch isn't needed.
            .catch(function (err) {
                spinner.fail();
                console.log(err.message);
            }); */
    },
};