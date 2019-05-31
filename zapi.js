#!/usr/bin/env node
const fs = require('fs');
const argv = require('minimist')(process.argv.slice(2));

const file = fs.readdirSync('./commands').filter(file => file == `${argv._[0]}.js`)[0];
if (file) {
    const command = require(`./commands/${file}`);
    command.execute(argv);
    
} else{
    console.log(`Command "${argv._[0]}" not found.`);
}