const EventEmitter = require('eventemitter3');

/**
 * Command base class.
 * 
 * @class Command
 * @extends {EventEmitter}
 */
class Command extends EventEmitter {
    /**
     * Creates an instance of Command.
     * @param {object?} client 
     * 
     * @memberof Command
     */
    constructor(client) {
        super();
        this.client = client;
        this.bot = client;
        this.db = client.db;
        this.logger = client.logger;

        this.cooldown = 5000;
        this.aliases = [];
        this.subcommands = {};
        this.flags = {};
        this.arguments = {};
        this.buttons = {};

    }

    /**
     * Runs the command.
     * 
     * @param {object?} ctx 
     * 
     * @memberof Command
     */
    run(ctx) {

    }
}

module.exports = Command;