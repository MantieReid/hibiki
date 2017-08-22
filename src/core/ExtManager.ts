// ExtManager.ts - Extension manager (noud02)

import { EventEmitter } from "events";
import * as sanic from "sanic";
import { Shard } from "../client/Shard";
import { Command, ICommandConfig, ISubcommandConfig } from "./Command";
// import { Context } from "./Context";

/**
 * Extension manager
 *
 * @export
 * @class ExtManager
 * @extends {EventEmitter}
 */
export class ExtManager extends EventEmitter {

    /**
     * Loaded commands
     *
     * @type {Map<string, Command>}
     * @memberof ExtManager
     */
    public commands: Map<string, Command> = new Map<string, Command>();

    /**
     * Loaded subcommands
     *
     * @type {Map<string, Command>}
     * @memberof ExtManager
     */
    public subcommands: Map<string, Command> = new Map<string, Command>();

    /**
     * Creates an instance of ExtManager.
     * @param {Shard} shard
     * @memberof ExtManager
     */
    constructor (private shard: Shard) {
        super();
    }

    /**
     * Initializes the extension manager
     *
     * @returns {Promise<void>}
     * @memberof ExtManager
     */
    public init (): Promise<void> {
        return new Promise((resolve, reject) => {
            sanic(function* () {
                /** @todo add command loader */
                yield Promise.resolve("temp yield here");
            })()
                .then(resolve)
                .catch(reject);
        });
    }

    /**
     * Breaks/Stops the extension manager
     *
     * @returns {Promise<void>}
     * @memberof ExtManager
     */
    public break (): Promise<void> {
        this.commands.clear();
        this.subcommands.clear();

        return Promise.resolve();
    }

    /**
     * Decorator for commands
     *
     * @decorator
     * @param {ICommandConfig} config
     * @returns {(target: any, key: string, descriptor: PropertyDescriptor) => void}
     * @memberof ExtManager
     */
    public command (config: ICommandConfig): (target: any, key: string, descriptor: PropertyDescriptor) => void {
        return (_target: any, key: string, descriptor: PropertyDescriptor) => {

            const cmd: Command = new Command(config, descriptor.value);

            this.commands.set(config.name || key, cmd);
        };
    }

    /**
     * Decorator for subcommands
     *
     * @decorator
     * @param {string} command
     * @param {ISubcommandConfig} config
     * @returns {(target: any, key: string, descriptor: PropertyDescriptor) => void}
     * @memberof ExtManager
     */
    public subcommand (command: string, config: ISubcommandConfig): (target: any, key: string, descriptor: PropertyDescriptor) => void {
        return (_target: any, key: string, descriptor: PropertyDescriptor) => {
            const cmd: Command = new Command(config, descriptor.value);

            this.subcommands.set(`${command}.${config.name || key}`, cmd);
        };
    }

    /**
     * Decorator for client events
     *
     * @decorator
     * @param {string} event
     * @returns {(target: any, key: string, descriptor: PropertyDescriptor) => void}
     * @memberof ExtManager
     */
    public event (event: string): (target: any, key: string, descriptor: PropertyDescriptor) => void {
        return (_target: any, _key: string, descriptor: PropertyDescriptor) => {
            this.shard.client.on(event, descriptor.value);
        };
    }
}
