const Chalk = require('chalk').constructor;
const clk = new Chalk({ enabled: true });
const moment = require('moment');

class Logger {
    constructor(opt) {
        this.opt = opt || {};
        this.debug = this.opt.debug || false
    }

    get time() {
        return clk.cyan.bold(`[${moment().format('l')} @ ${moment().format('HH:mm:ss')}]`);
    }

    info() {
        const time = clk.cyan.bold(`[${moment().format('l')} @ ${moment().format('HH:mm:ss')}]`);
        return console.info(time, clk.bgMagenta(' INFO '), Array.from(arguments).join(' '));
    }

    warn() {
        const time = clk.cyan.bold(`[${moment().format('l')} @ ${moment().format('HH:mm:ss')}]`);
        return console.warn(time, clk.black.bgYellow(' WARN '), Array.from(arguments).join(' '));
    }

    error() {
        const time = clk.cyan.bold(`[${moment().format('l')} @ ${moment().format('HH:mm:ss')}]`);
        return console.error(time, clk.bgRed(' ERROR '), Array.from(arguments).join(' '));
    }

    log() {
        const time = clk.cyan.bold(`[${moment().format('l')} @ ${moment().format('HH:mm:ss')}]`);
        return console.log(time, Array.from(arguments).join(' '));
    }

    debug() {
        if (!this.debug) return;
        const time = clk.cyan.bold(`[${moment().format('l')} @ ${moment().format('HH:mm:ss')}]`);
        return console.log(time, clk.black.bgWhite(' DEBUG '), Array.from(arguments).join(' '));
    }

    message(msg) {
        const time = clk.cyan.bold(`[${moment().format('l')} @ ${moment().format('HH:mm:ss')}]`);
        return console.log(time, clk.black.bgCyan(' CMD '), clk.green(msg.channel.guild.name), clk.blue(msg.author.username), clk.cyan(msg.cleanContent), Array.from(arguments).slice(1).join(' '));
    }

    custom(opt) {
        if (!opt) throw new Error("No options specified");
        if (!opt.bgColor) opt.bgColor = 'black';
        if (!opt.color) opt.color = 'white';
        if (!clk[opt.color.toLocaleLowerCase()]) throw new Error("Invalid color");
        const bg = clk[`bg${opt.bgColor.toLocaleLowerCase().charAt(0).toLocaleUpperCase()}${opt.bgColor.toLocaleLowerCase().slice(1)}`];
        if (!bg) throw new Error("Invalid background color");
        const str = `${this.time} ${bg[opt.color.toLocaleLowerCase()](` ${opt.name} `)} ${Array.from(arguments).slice(1).join(' ')}`;
        return opt.error && console.error(str) || console.log(str);
    }

}

module.exports = Logger;