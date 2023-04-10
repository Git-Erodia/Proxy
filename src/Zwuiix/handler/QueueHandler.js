const Query = require('../utils/Query');
const ProxyServer = require("../ProxyServer");
let instance;
class QueueHandler
{
    players = [];

    constructor()
    {
        instance=this;
        this.start();
    }

    start()
    {
        let config = ProxyServer.getInstance().getConfig();
        let address = config.get("redirect-host", "play.erodia.fr");
        let port = config.get("redirect-port", 19132);

        setInterval(() => {
            for (let i = 0; i < this.players.length; i++) {
                let player = this.players[i];
                player.sendTip(`§aVous êtes a la §e${i + 1}/${this.players.length} place§a dans la file d'attente.`);
            }
        }, 50);

        setInterval(() => {
            /**
             * @type {EClient}
             */
            let player = this.players[0];
            if(player !== undefined) {
                let query = Query.create(address, port, async () => {
                    if (query.getVersion() === undefined) {
                        player.sendMessage("§cTrop de délai, il semblerai que le serveur sois arrêter!");
                    } else {
                        if((query.getMaxOnlinesPlayers() - 1)  <= query.getOnlinesPlayers()){
                            player.sendMessage("§cLe serveur est actuellement plein, veuillez patientez!");
                        } else {
                            player.transfer(address, port);
                            await ProxyServer.getInstance().removeClient(player);
                            this.players.shift();
                        }
                    }
                });
            }
        }, 5000);
    }

    addPlayer(client)
    {
        this.players.push(client);
    }
}
module.exports = {
    getInstance()
    {
        return instance ?? (instance = new QueueHandler());
    }
}