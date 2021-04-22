const config = require('./config/config');
const emoji = require('./emoji');

module.exports = utils = {
    // Checks if the message is a discord command.
    isDiscordCommand: (str) => {
        return str.startsWith(config.comamnd_prefix);
    },
    
    // Returns a object with the discord command information.
    getParsedCommand: (str) => {
        let spl = str.substring(config.comamnd_prefix.length).split(' ');

        return {
            prefix: config.comamnd_prefix,
            command: spl[0],
            args: spl.slice(1)
        }
    },

    // Checks if the reaction is valid, meaning if it is in our emoji list.
    isValidReaction(reaction) {
        const emojis = Object.keys(emoji);

        for (let i = 0; i < emojis.length; i++) {
            if (emoji[emojis[i]] === reaction._emoji.name) {
                return true;
            }
        }

        return false;
    },

    // Gets a user's nickname in Discord.
    getUserNickName(msg) {
        return (msg.guild.member(msg.author).displayName ?? msg.author.username);
    }
};