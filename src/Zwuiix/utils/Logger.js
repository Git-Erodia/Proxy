let SERVER_LOGS = [];

const colors = require('colors');
const fs = require("fs");
const Path = require("path");

let TYPE = {
    info: "INFO",
    notice: "NOTICE",
    warning: "WARNING",
    debug: "DEBUG",
    error: "ERROR"
};

module.exports = {

    async info(log)
    {
        await this.writePrefix(TYPE.info, log);
    },

    async notice(log)
    {
        await this.writePrefix(colors.cyan(TYPE.notice), log);
    },

    async warn(log)
    {
        await this.writePrefix(colors.yellow(TYPE.warning), log);
    },

    async debug(log)
    {
        await this.writePrefix(colors.underline(TYPE.debug), log);
    },

    async error(log)
    {
        await this.writePrefix(colors.red(TYPE.error), log);
    },

    async writePrefix(prefix, log)
    {
        await write(`${colors.gray(new Date().toLocaleDateString().replaceAll('/', "-"))} ${colors.gray("[" + Date.now() + "]")} [Proxy Thread/${prefix}]: ${log}`, prefix !== colors.underline(TYPE.debug));
    },
};

async function write(log, sendMessages)
{
    if(sendMessages) console.log(log);

    try {
        fs.readFileSync(Path.join(process.cwd() + '\\logs.txt'), 'utf-8');
    }catch (e) {
        fs.writeFileSync(Path.join(process.cwd() + '\\logs.txt'), "");
    }

    let fileSync = fs.readFileSync(Path.join(process.cwd() + '\\logs.txt'), 'utf-8');
    fileSync += `${log}\n`;
    fs.writeFileSync(Path.join(process.cwd() + '\\logs.txt'), fileSync, 'utf-8');
}