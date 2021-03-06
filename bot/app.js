// Main imports.
const _ = require('lodash');
const config = require('./config/config');
const emoji = require('./enum/emoji');
const utils = require('./utils');
const eventBus = require('./eventbus');
const Discord = require('discord.js');
const ws = require('./websocket');
const db = require('./db');

// Init Discord class.
const client = new Discord.Client({
    partials: ['MESSAGE', 'CHANNEL', 'REACTION'],
});

/**
 * Event fired once we connect to Discord.
 */
client.on('ready', () => {
    console.log('Connected to Discord!');
});

/**
 * Event fired when a message is send in a channel.
 */
client.on('message', (msg) => {
    if (msg.embeds.length > 0) {
        console.log('[EMBED] [#' + msg.channel.name + '] ' + msg.author.username + ': (' + msg.embeds[0].title + ') ' + msg.embeds[0].description);
    } else {
        console.log('[MESSAGE] [#' + msg.channel.name + '] ' + msg.author.username + ': ' + msg.content);
    }
    

    if (utils.isDiscordCommand(msg.content)) {
        const command = utils.getParsedCommand(msg.content);

        if (eventBus.discordCommandEventExists(command.command)) {
            eventBus.dispatchDiscordCommandEvent(command.command, msg);
        }
    }
});

/**
 * Event fired when someone reacts to a message, even non cached ones.
 */
client.on('messageReactionAdd', (reaction, user) => {
    // Check to make sure the reaction is in our emoji list.
    if (utils.isValidReaction(reaction)) {
        if (utils.isReactionFromOriginalPost(reaction)) {

        }
    }
});

/**
 * Event fired when someone un-reacts to a message, even non cached ones.
 */
 client.on('messageReactionRemove', (reaction, user) => {
    // Check to make sure the reaction is in our emoji list.
    if (utils.isValidReaction(reaction)) {
        if (utils.isReactionFromOriginalPost(reaction)) {
            
        }
    }
});

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
        .setFooter(author + ' ??? ' + date);

    channel.send({
        embed: testEmbed
    }).then(embedMessage => {
        for (let i = 0; i < emojiArray.length; i++) {
            embedMessage.react(emojiArray[i]);
        }
    });
};

// TODO: Make this save to the database.
const savePost = (json) => {

};

/**
 * Discord command event.
 * 
 * @command abc
 * @param {object} msg Discord.js message object.
 */
 eventBus.onDiscordCommandEvent('abc', (msg) => {
    sendEmbed(msg.channel, 
        'A / B / C', 
        'Veuillez s??lectionner une ou plusieurs options avec les r??actions ci-dessous.', 
        utils.getUserNickName(msg), 
        new Date().toLocaleDateString(), 
        [emoji.letter_a, emoji.letter_b, emoji.letter_c]
    );

    // TODO: Handle database save, ws event.
});

/**
 * Discord command event.
 * 
 * @command abcd
 * @param {object} msg Discord.js message object.
 */
 eventBus.onDiscordCommandEvent('abcd', (msg) => {
    sendEmbed(msg.channel, 
        'A / B / C / D', 
        'Veuillez s??lectionner une ou plusieurs options avec les r??actions ci-dessous.', 
        utils.getUserNickName(msg), 
        new Date().toLocaleDateString(), 
        [emoji.letter_a, emoji.letter_b, emoji.letter_c, emoji.letter_d]
    );

    // TODO: Handle database save, ws event.
});

/**
 * Discord command event.
 * 
 * @command abcde
 * @param {object} msg Discord.js message object.
 */
 eventBus.onDiscordCommandEvent('abcde', (msg) => {
    sendEmbed(msg.channel, 
        'A / B / C / D / E', 
        'Veuillez s??lectionner une ou plusieurs options avec les r??actions ci-dessous.', 
        utils.getUserNickName(msg), 
        new Date().toLocaleDateString(), 
        [emoji.letter_a, emoji.letter_b, emoji.letter_c, emoji.letter_d, emoji.letter_e]
    );

    // TODO: Handle database save, ws event.
});

/**
 * Discord command event.
 * 
 * @command vraifaux
 * @param {object} msg Discord.js message object.
 */
 eventBus.onDiscordCommandEvent('vraifaux', (msg) => {
    sendEmbed(msg.channel, 
        'Vrai ou Faux?', 
        'Veuillez s??lectionner une des options avec les r??actions ci-dessous.', 
        utils.getUserNickName(msg), 
        new Date().toLocaleDateString(), 
        [emoji.check, emoji.cross]
    );

    // TODO: Handle database save, ws event.
});

/**
 * Discord command event.
 * 
 * @command main
 * @param {object} msg Discord.js message object.
 */
 eventBus.onDiscordCommandEvent('main', (msg) => {
    sendEmbed(msg.channel, 
        'Vous avez une question?', 
        'Appuyer sur la r??action ci-dessous pour lever votre main!', 
        utils.getUserNickName(msg), 
        new Date().toLocaleDateString(), 
        [emoji.hand_up]
    );

    // TODO: Handle database save, ws event.
});

/**
 * Websocket event GET_GROUPS_WITH_USERS_AND_CHANNELS
 */
eventBus.onWsEvent('get_groups_with_users_and_channels', (json) => {
    // TODO: reply to the request.
});

/**
 * Websocket event CREATE_DEFAULT_MESSAGE
 */
 eventBus.onWsEvent('create_default_message', (json) => {
    // TODO: make it happen. check ws.js for the json example.
    // TODO: save to database.
});

/**
 * Websocket event CREATE_CUSTOM_MESSAGE
 */
 eventBus.onWsEvent('create_custom_message', (json) => {
    // TODO: make it happen. check ws.js for the json example.
    // TODO: save to database.
});

// Connect to Discord.
client.login(config.token);