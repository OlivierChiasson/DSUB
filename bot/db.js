const levelup = require('levelup');
const leveldown = require('leveldown');
const config = require('./config/config');

class db {
    constructor() {
        this.db = levelup(leveldown(config.db_name));
    }

    instance() {
        return this.db;
    }
}

module.exports = new db();