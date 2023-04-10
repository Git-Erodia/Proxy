const {ping} = require("bedrock-protocol");
const libquery = require("libquery");

class Query
{
    address;
    port;

    ServerData = new Map();

    constructor(address, port, callable)
    {
        this.address=address;
        this.port=port;
        this.execute(callable).catch(e => function (){});
    }

    async execute(callable)
    {
        let time = Date.now();
        let latency = "";

        await libquery.query(this.address, this.port).then((data) => {
            if(data.plugins === undefined){
                this.ServerData.set("plugins", "None");
            }else this.ServerData.set("plugins", data.plugins);
            this.ServerData.set("software", data.software);
            this.ServerData.set("levelName", data.levelName);
            this.ServerData.set("gamemodeId", data.gamemode);
            this.ServerData.set("serverId", data.serverId);
            this.ServerData.set("portV4", this.port);
            this.ServerData.set("portV6", this.port);
            this.ServerData.set("protocol", data.protocol);
            this.ServerData.set("version", data.version);
            this.ServerData.set("header", data.header);
            this.ServerData.set("motd", data.motd);
            this.ServerData.set("playersOnline", data.online);
            this.ServerData.set("playersMax", data.max);
        }).catch(err => {
        });

        latency += `${Date.now() - time}:`;

        await ping({ host: this.address, port: this.port }).then(async res => {
            this.ServerData.set("levelName", res.levelName);
            this.ServerData.set("gamemodeId", res.gamemode);
            this.ServerData.set("serverId", res.serverId);
            this.ServerData.set("portV4", this.port);
            this.ServerData.set("portV6", this.port);
            this.ServerData.set("protocol", res.protocol);
            this.ServerData.set("version", res.version);
            this.ServerData.set("header", res.header);
            this.ServerData.set("motd", res.motd);
            this.ServerData.set("playersOnline", res.playersOnline);
            this.ServerData.set("playersMax", res.playersMax);
        }).catch(err => {
        });

        latency += `${Date.now() - time}`;
        this.ServerData.set("latency", latency);

        callable();
    }

    /**
     * @return {string}
     */
    getLevelName()
    {
        return this.ServerData.get("levelName");
    }

    /**
     * @return {number}
     */
    getGamemodeId()
    {
        return this.ServerData.get("gamemodeId");
    }

    /**
     * @return {string}
     */
    getServerId()
    {
        return this.ServerData.get("serverId");
    }

    /**
     * @return {number}
     */
    getPortV4()
    {
        return this.ServerData.get("portV4");
    }

    /**
     * @return {number}
     */
    getPortV6()
    {
        return this.ServerData.get("portV6");
    }

    /**
     * @return {string}
     */
    getProtocol()
    {
        return this.ServerData.get("protocol");
    }

    /**
     * @return {string}
     */
    getVersion()
    {
        return this.ServerData.get("version");
    }

    /**
     * @return {string}
     */
    getHeader()
    {
        return this.ServerData.get("header");
    }

    /**
     * @return {string}
     */
    getMotd()
    {
        return this.ServerData.get("motd");
    }

    /**
     * @return {number}
     */
    getOnlinesPlayers()
    {
        return this.ServerData.get("playersOnline");
    }

    /**
     * @return {number}
     */
    getMaxOnlinesPlayers()
    {
        return this.ServerData.get("playersMax");
    }

    getPlugins()
    {
        return this.ServerData.get("plugins");
    }

    getSoftWare()
    {
        return this.ServerData.get("software");
    }

    getLatency()
    {
        return this.ServerData.get("latency");
    }

    getServerData()
    {
        return this.ServerData;
    }

}

module.exports = {
    create(address , port, callable)
    {
        return new Query(address, port, callable);
    }
}