const NetworkSession = require("./NetworkSession");
const Logger = require("../utils/Logger");
const ProxyServer = require("../ProxyServer");
const QueueHandler = require("../handler/QueueHandler");

class EClient
{
    client;
    name = "";
    xuid = "";
    identity = "";
    titleId = "";
    userData;
    networkSession;

    constructor(client)
    {
        this.client=client;
        this.userData=client.getUserData();
        this.name=this.userData.displayName;
        this.xuid=this.userData.XUID;
        this.identity=this.userData.identity;
        this.titleId=this.userData.titleId;
        this.networkSession = new NetworkSession(this);
    }

    getBedrockClient()
    {
        return this.client;
    }

    getName()
    {
        return this.name;
    }

    getXuid()
    {
        return this.xuid;
    }

    getIdentity()
    {
        return this.identity;
    }

    getTitleID()
    {
        return this.titleId;
    }

    async onSpawn()
    {
        if(this.verify()) {
            this.client.disconnect("§cDésolée, Une erreur est survenue!");
            return;
        }
        setTimeout(async () => {
            ProxyServer.getInstance().broadCastMessage(`§7[§a+§7] §a${this.getName()}`);
            await Logger.info(`[+] ${this.getName()}`);
            QueueHandler.getInstance().addPlayer(this);
        }, 2500);
    }

    verify()
    {
        let found = false;
        if(
            this.getName() === "" ||
            this.getXuid() === "" ||
            this.getIdentity() === "" ||
            this.getTitleID() === ""
        ) {
            found = true;
        }

        let spoof = 0;
        // TODO: SPOOF CLIENT
        let IDS = ["896928775", "2047319603", "1739947436", "2044456598", "1828326430", "1810924247"];
        for (let i = 0; i <= IDS.length; i++) {
            let id = IDS[i];
            if(this.getTitleID() === id) spoof++;
        }

        if(spoof === 0) {
            found = true;
        }

        return found;
    }

    sendMessage(str)
    {
        this.client.queue('text', {
            type: "chat",
            needs_translation: false,
            source_name: '',
            xuid: '',
            platform_chat_id: '',
            message: str
        });
    }

    sendTip(str)
    {
        this.client.queue('text', {
            type: "tip",
            needs_translation: false,
            source_name: '',
            xuid: '',
            platform_chat_id: '',
            message: str
        });
    }

    sendPopup(str)
    {
        this.client.queue('text', {
            type: "popup",
            needs_translation: false,
            source_name: '',
            xuid: '',
            platform_chat_id: '',
            message: str
        });
    }

    transfer(address, port)
    {
        this.client.queue('transfer', {
            server_address: address,
            port: port
        })
    }
}
module.exports = EClient;