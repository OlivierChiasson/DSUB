const WebSocket = require('ws');
const config = require('./config/config');
const _ = require('lodash');

let authClients = [];
let handlers;

class WebSocketServer {
    constructor() {
        this.ws = new WebSocket.Server({
            port: config.ws_port
        });

        // Register our on connection event for the server.
        this.ws.on('connection', this.onConnection);

        // Event registers.
        handlers = {
            event: {

            },
            listeners: {

            },
            requests: {

            }
        };
    }

    // Called when a new client connects to the websocket.
    onConnection(ws) {
        ws.on('message', data => {
            try {
                let json = JSON.parse(data);
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
                        }
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
                console.log('ws::error::' + ex);
            }
        });
    }

    // Sends a message to all authenticated ws clients.
    broadcast(json) {
        _.forEach(this.authClients, (client) => {
            client.send(JSON.stringify(json));
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