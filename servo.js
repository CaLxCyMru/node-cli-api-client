#!/usr/bin/env node
const rp = require('request-promise');
const Slider = require('./slider.js')
const ora = require('ora');

const argv = require('minimist')(process.argv.slice(2));

const spinner = ora('Getting Servo current value');

spinner.start();
getServo()
.then(function (response) {
    spinner.stop();
    const slider = new Slider(response, 360);
    
    slider.on('value', (value) => {
        postServo(value)
        .then(function (parsedBody) {
            console.log(`Value Changed to ${value}`);
            process.exit();
        });
    })
    if (argv.l){
        slider.on('changed', (value) => {
            postServo(value)
            .then(function (parsedBody) {
                
            }).catch( err =>{
                console.log(err.message);
                process.exit();
            })
        });
    }
})
.catch(function (err) {
    spinner.fail()
    console.log(err.message);
});

function postServo(value){
    const optionsPost = {
        method: 'POST',
        uri: 'http://zbestsolutions.it:5000/api/servo',
        body: {
            "servo": value
        },
        json: true // Automatically stringifies the body to JSON
    };
    
    return rp(optionsPost)
}

function getServo(){
    const optionsGet = {
        uri: 'http://zbestsolutions.it:5000/api/servo',
        headers: {
            'User-Agent': 'Request-Promise'
        },
        json: true // Automatically parses the JSON string in the response
    };
    return rp(optionsGet);
}