const EventEmitter = require('events');
const _ = require('lodash')

// EventBus class.
class EventBus extends EventEmitter {
    onDiscordCommandEvent(eventName, callBack) {
        this.on('discord::' + eventName, callBack);
    }

    releaseDiscordCommandEvent(eventName) {
        this.off(eventName);
    }

    discordCommandEventExists(eventName) {
        let val = false;

        this.eventNames().forEach((ele) => {
            if (_.isEqual('discord::' + eventName, ele)) {
                val = true;
            }
        });

        return val;
    }

    dispatchDiscordCommandEvent(eventName, args) {
        this.emit('discord::' + eventName, args);
    }

    onWsEvent(eventName, callBack) {
        this.on('ws::' + eventName, callBack);
    }

    releaseWsEvent(eventName) {
        this.off(eventName);
    }

    wsEventExists(eventName) {
        let val = false;

        this.eventNames().forEach((ele) => {
            if (_.isEqual('ws::' + eventName, ele)) {
                val = true;
            }
        });

        return false;
    }

    dispatchWsEvent(eventName, args) {
        this.emit('ws::' + eventName, args);
    }
}

// Export out EventBus.
module.exports = new EventBus();