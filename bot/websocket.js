const WebSocket = require('ws');
const config = require('./config/config');
const eventBus = require('./eventbus');
const _ = require('lodash');

let authClients = [];
let handlers;

class WebSocketServer {
    constructor() {
        this.ws = new WebSocket.Server({
            port: config.ws_port
        });

        // Register our on connection event for the server.
        this.ws.on('connection', this._onConnection);

        // Event registers.
        handlers = {
            event: {
                // Create message event from websocket.
                // This would be one of the default messages chosen.
                // Message example:
                /**
                 * {
                 *    type: 'event',
                 *    id: 'unique_id_for_this_request',
                 *    name: 'CREATE_DEFAULT_MESSAGE',
                 *    from: 'bobby/michel/dominique',
                 *    message: {
                 *       type: 'one of the types from ./enum/messagetypes.js'
                 *    },
                 *     channel: 'id_of_channel'
                 * }
                 */
                CREATE_DEFAULT_MESSAGE: () => {
                    if (eventBus.wsEventExists(this.name)) {
                        eventBus.dispatchWsEvent(this.name, this);
                    }
                },
                // Create message event from websocket.
                // This would be a custom message messages chosen.
                // Message example:
                /**
                 * {
                 *    type: 'event',
                 *    id: 'unique_id_for_this_request',
                 *    name: 'CREATE_DEFAULT_MESSAGE',
                 *    from: 'bobby/michel/dominique',
                 *    message: {
                 *       type: 'custom',
                 *       title: 'title here',
                 *       desciption: 'description',
                 *       emojis: ['letter_a', 'letter_b', 'etc'] // Same as emoji.js, with the key names.
                 *    },
                 *    channel: 'id_of_channel'
                 * }
                 */
                 CREATE_CUSTOM_MESSAGE: () => {
                    if (eventBus.wsEventExists(this.name)) {
                        eventBus.dispatchWsEvent(this.name, this);
                    }
                }
            },
            listeners: {

            },
            requests: {
                // Request from the ws to get groups with their users.
                // Message example:
                /**
                 * {
                 *    type: 'requests',
                 *    id: 'unique_id_for_this_request',
                 *    name: 'GET_GROUPS_WITH_USERS',
                 *    from: 'bobby/michel/dominique',
                 * }
                 */
                // Reply example:
                /**
                 * {
                 *    type: 'reply',
                 *    id: 'unique_id_from_request',
                 *    groups: [
                 *      
                 *    ],
                 *    users: [
                 *        {
                 *            username: '',
                 *            group: ''
                 *        }
                 *    ],
                 *    channels: [
                 * 
                 *    ]
                 * }
                 */
                GET_GROUPS_WITH_USERS_AND_CHANNELS: () => {
                    if (eventBus.wsEventExists(this.name)) {
                        eventBus.dispatchWsEvent(this.name, this);
                    }
                }
            }
        };
    }

    // Called when a new client connects to the websocket.
    _onConnection(ws) {
        ws.on('message', data => {
            try {
                let json = JSON.parse(data);

                console.log('ws::message::' + json);

                if (json.hasOwnProperty('authentication')) {
                    if (json.hasOwnProperty('username')) {
                        if (json.authentication == config.basic_ws_auth_token) {
                            // If the client already is connected, or exists, terminate it.
                            _.find(authClients, {
                                username: json.username.toLowerCase()
                            })?.ws.terminate();

                            authClients.push({
                                username: json.username,
                                ws: ws
                            });

                            ws.send(JSON.stringify({
                                authentication: 'SUCCESS',
                                error: ''
                            }));
                        } else {
                            ws.terminate();
                        }
                    } else {
                        ws.terminate();
                    }

                } else {

                    /**
                     * {
                     *    type: event|request|listener
                     *    name: name_of_the_type
                     * }
                     */
                    if (json.hasOwnProperty('type')) {
                        switch (json.type) {
                            case 'event':
                                handlers.event[json.name]?.call(json);
                                break;
                            case 'request':
                                handlers.request[json.name]?.call(json);
                                break;
                            case 'listener':
                                handlers.listener[json.name]?.call(json);
                                break;
                            default:
                                break;
                        }
                    }
                }
            } catch (ex) {
                ws.send(JSON.stringify({
                    authentication: 'FAILED',
                    error: 'Authentication invalid.'
                }));
                ws.terminate();
                console.error('ws::error::' + ex);
            }
        });
    }

    // Sends a message to all authenticated ws clients.
    broadcast(json) {
        _.forEach(this.authClients, (client) => {
            try {
                client.send(JSON.stringify(json));
            } catch (ex) {
                console.error('ws::broadcast::send::' + ex);
            }
        });
    }

    // Sends a message to a specific client on the authenticated list.
    sendTo(username, json) {
        _.find(this.authClients, {
            username: username.toLowerCase()
        })?.ws.send(JSON.stringify(json));
    }
}

module.exports = new WebSocketServer();