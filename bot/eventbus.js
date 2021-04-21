const EventEmitter = require('events');

// EventBus class.
class EventBus extends EventEmitter {
    onDiscordCommandEvent(eventName, callBack) {
        this.on('discord::' + eventName, callBack);
    }

    releaseDiscordCommandEvent(eventName) {
        this.off(eventName);
    }

    discordCommandEventExists(eventName) {
        this.eventNames().foreach((ele) => {
            if ('discord::' + ele === eventName) {
                return true;
            }
        });

        return false;
    }

    onWsEvent(eventName, callBack) {
        this.on('ws::' + eventName, callBack);
    }

    releaseWsEvent(eventName) {
        this.off(eventName);
    }

    wsEventExists(eventName) {
        this.eventNames().foreach((ele) => {
            if ('ws::' + ele === eventName) {
                return true;
            }
        });

        return false;
    }
}

// Export out EventBus.
module.exports = new EventBus();