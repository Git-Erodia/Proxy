//process.env.DEBUG = 'minecraft-protocol' // packet logging
/* eslint-disable */
const bedrock = require('bedrock-protocol');
const { Server } = require('bedrock-protocol');

const { join } = require('path')
const {loadWorld} = require("./chunk/Chunk");
const Logger = require("./utils/Logger");
const EClient = require("./client/EClient");
const {ProxyServer, getInstance} = require("./ProxyServer");
const {Config} = require("./utils/Config");
const Path = require("path");
const {QueueHandler} = require("./handler/QueueHandler");
const config = new Config(Path.join(process.cwd() + "/server.properties.json"), "json");

class Main
{
    constructor()
    {
        this.startServer().then(r => {})
    }

    async startServer()
    {
        let loop
        new ProxyServer();

        const server = new Server(config.config)
        await server.listen();
        await Logger.notice('Proxy server started.');

        server.on('connect', client => {
            client.on('join', () => getInstance().addClient(new EClient(client)));
        });

        return {
            kill: () => {
                clearInterval(loop)
                server.close()
            }
        }
    }
}
module.exports = Main;