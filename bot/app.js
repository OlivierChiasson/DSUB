// Main imports.
const Lodash = require('lodash');
const config = require('./config/config');
const emoji = require('./emoji');
const eventBus = require('./eventbus');
const Discord = require('discord.js');
const ws = require('./websocket');

// Init Discord class.
const client = new Discord.Client();

/**
 * Creates an embed.
 * 
 * @param {object} channel Channel objecy
 * @param {string} title Title of the embed
 * @param {string} desc Description of the embed
 * @param {string} author Author for the embed
 * @param {string} date Date of the embed.
 * @param {array} emojiArray Array of the emojies
 * @param {string} color Color of the embed
 */
const sendEmbed = (channel, title, desc, author, date, emojiArray, color = '#00ff00') => {
    const testEmbed = new Discord.MessageEmbed()
        .setColor(color)
        .setTitle(title)
        .setDescription(desc)
        .setFooter(author + ' • ' + date);

    channel.send({
        embed: testEmbed
    }).then(embedMessage => {
        for (let i = 0; i < emojiArray.length; i++) {
            embedMessage.react(emojiArray[i]);
        }
    });
}


/**
 * Command event for discord.
 */
eventBus.onDiscordCommandEvent('abc', (event) => {
    // Also, pas besoin de faire *abc, le prefix vas etre checquer un fois durant le parsing. The command prefix peut etre changer dans le config.
    // basically event est l'object de discord.js du client.on::message, so tu peut pogner event.content.
});


// Discord events.
client.on('ready', () => {
    console.log('Ready!');
});

client.on('message', (msg) => {
    console.log('MSG:: ' + msg.content);

    if(msg.content == "*abc") sendEmbed(msg.channel, "A / B / C", "Veuillez sélectionner une ou plusieurs options avec les réactions ci-dessous", "Bobby", "16/04/2021", [emoji.letter_a, emoji.letter_b, emoji.letter_c]);
    if(msg.content == "*abcd") sendEmbed(msg.channel, "A / B / C / D", "Veuillez sélectionner une ou plusieurs options avec les réactions ci-dessous", "Bobby", "16/04/2021", [emoji.letter_a, emoji.letter_b, emoji.letter_c, emoji.letter_d]);
    if(msg.content == "*vraifaux") sendEmbed(msg.channel, "Vrai ou Faux?", "Veuillez sélectionner une des options avec les réactions ci-dessous", "Bobby", "16/04/2021", [emoji.letter_hand_up, emoji.letter_cross]);
    if(msg.content == "*question") sendEmbed(msg.channel, "Avez-vous des questions?", "Veuillez sélectionner une des options avec les réactions ci-dessous", "Bobby", "16/04/2021", [emoji.letter_check, emoji.letter_cross]);
    if(msg.content == "*main") sendEmbed(msg.channel, "Vous avez une question?", "Appuyer sur la réaction ci-dessous pour lever votre main", "Bobby", "16/04/2021", [emoji.letter_hand_up]);
    
    
    
});







client.login(config.token);