const config = require('./config/config');

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
};