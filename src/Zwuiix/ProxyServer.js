
const EClient = require('./client/EClient');
const Logger = require("./utils/Logger");
const {Config} = require("./utils/Config");
const Path = require("path");
const config = new Config(Path.join(process.cwd() + "/proxy.json"), "json");

let instance;
class ProxyServer
{
    /**
     * @type {EClient[]}
     */
    clients = [];

    constructor()
    {
    }

    /**
     *
     * @returns {EClient[]}
     */
    getAllClients()
    {
        return this.clients;
    }

    /**
     *
     * @param client
     */
    addClient(client)
    {
        this.clients.push(client);
    }

    /**
     *
     * @param client
     */
    async removeClient(client) {
        this.broadCastMessage(`§7[§c-§7] §c${client.getName()}`);
        await Logger.info(`[-] ${client.getName()}`);
        delete (this.clients[client]);
    }

    /**
     *
     * @param str
     */
    broadCastMessage(str)
    {
        this.clients.forEach(client => client.sendMessage(str));
    }

    /**
     *
     * @returns {Config}
     */
    getConfig()
    {
        return config;
    }
}
module.exports = {
    getInstance()
    {
        return instance ? instance : (instance = new ProxyServer());
    }, ProxyServer
};