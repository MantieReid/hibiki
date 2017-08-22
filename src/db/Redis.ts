// Redis.ts - Redis wrapper (noud02)

import * as redis from "redis";

/**
 * Redis wrapper
 *
 */
export class Redis {

    /**
     * Redis client
     *
     * @private
     */
    private client: redis.RedisClient;

    /**
     * Creates an instance of Redis.
     * @param {Shard} shard
     * @param {redis.ClientOpts} options
     */
    constructor (private options: redis.ClientOpts) {}

    /**
     * Connect to redis
     *
     * @returns {Promise<void>}
     */
    public connect (): Promise<void> {
        this.client = redis.createClient(this.options);

        return Promise.resolve();
    }

    /**
     * Disconnect from redis
     *
     * @returns {Promise<void>}
     */
    public disconnect (): Promise<void> {
        this.client.end(true);

        return Promise.resolve();
    }

    /**
     * Set a key to an object
     *
     * @param {string} key
     * @param {object} value
     * @returns {Promise<any>}
     */
    public set (key: string, value: object): Promise<any> {
        return new Promise((resolve, reject) => {
            this.client.set(key, JSON.stringify(value), (err: Error, res: any) => {
                if (err) {
                    return reject(err);
                }

                return resolve(res);
            });
        });
    }

    /**
     * Get a key
     *
     * @param {string} key
     * @returns {Promise<object>}
     */
    public get (key: string): Promise<object> {
        return new Promise((resolve, reject) => {
            this.client.get(key, (err: Error, res: string) => {
                if (err) {
                    return reject(err);
                }

                return resolve(JSON.parse(res));
            });
        });
    }
}