"use strict";
// main.ts - Where all the (client) magic happens (noud02)
Object.defineProperty(exports, "__esModule", { value: true });
const minimist = require("minimist");
const Shard_1 = require("./Shard");
const config = require("../../config.json"); // tslint:disable-line:no-var-requires
const args = minimist(process.argv);
const shard = new Shard_1.Shard(args.shard, config.token, config);
process.on("SIGINT", () => {
    shard.disconnect();
});
shard.connect().catch((e) => {
    console.error(e);
});
