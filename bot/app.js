// Main imports.
const Lodash = require('lodash');
const config = require('./config/config');
const emoji = require('./emoji');
const Discord = require('discord.js');


// Init Discord class.
const client = new Discord.Client();


const sendEmbed = (channel, title, desc, author, date, color) => {
    const testEmbed = new Discord.MessageEmbed()
        .setColor('#00ff00')
        .setTitle(title)
        .setDescription(desc)
        .setFooter(author + " • " + date);
    testEmoji = "Negative Squared Latin Capital Letter A";
        //channel.send(testEmbed);
        channel.send({embed: testEmbed}).then(embedMessage =>{
            embedMessage.react(emoji.letter_a);
            embedMessage.react(emoji.letter_b);
            embedMessage.react(emoji.letter_c);
        
        
        });
}






// Discord events.
client.on('ready', () => {
    console.log('Ready!');
});

client.on('message', (msg) => {
    console.log('MSG:: ' + msg.content);

    if(msg.content == "*abc"){
        sendEmbed(msg.channel, "A / B / C", "Veuillez sélectionner une ou plusieurs options avec les réactions ci-dessous", "Bobby", "16/04/2021");
    }
});







client.login(config.token);