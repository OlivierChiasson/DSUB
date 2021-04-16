// Main imports.
const config = require('./config/config');
const Discord = require('discord.js');

// Init Discord class.
const client = new Discord.Client();

// Discord events.
client.on('ready', () => {
    console.log('Ready!');
});

client.on('message', (msg) => {
    console.log('MSG::' + msg.content);
});

client.login(config.token);