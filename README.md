
![Logo](https://raw.githubusercontent.com/Git-Erodia/Discord-Bot/main/img/logo.png)

[![AGPL License](https://img.shields.io/badge/license-AGPL-blue.svg)](http://www.gnu.org/licenses/agpl-3.0)


# Git-Erodia / Proxy
Ce Proxy été réaliser pour le serveur Minecraft Bedrock Edition @Erodia.

Il permet de gérer votre serveur, il transfer les joueurs toutes les 5 secondes les un les autres, il permet donc de réduire les requêtes venant de plusieurs joueur en même temps, de plus il détecte quelque type de Client froduleux.

Il peut être utilisé très simplement pour optimisé les connexion entrante de sont serveur, cela est minime mais fait un effet l'hors d'une ouverture d'un serveur ou d'un évènement, il permettra de laisser plus de temps au serveur d'effectuer ces actions.

Celui-ci utilise plusieurs API, dont "bedrock-protocol", "libquery".

## Langage
#### Javascript
![JavaScript](https://raw.githubusercontent.com/Git-Erodia/Discord-Bot/main/img/javascript.png)
## Fonctionnalités

- Informations concernant le serveur (Query)
- Module de file d'attente
- Module de détection de SpoofClient de type A

## Installation

Pour utiliser le bot, il vous faut [NodeJS](https://nodejs.org/fr)

```bash
  git clone --branch="main" https://github.com/Git-Erodia/Proxy
  cd Proxy
  npm install
  node index.js
```

## Running

Pour commencer, exécutez la commande suivante

```bash
  npm index.js
```

## Running

Les différentes configurations néssaisaire

#### server.propertises.json
```json
{
  "host": "0.0.0.0",
  "port": 19132,
  "version": "1.19.70",
  "motd": {
    "motd": "Érodia Proxy 1.0.0",
    "levelName": "Érodia Proxy 1.0.0"
  }
}
```

Permet de configurer les différentes informations du serveur, l'adresse vers la quel il vas pointé, le port et la version du jeu du client.

#### proxy.json
```json
{
  "redirect-host": "play.erodia.fr",
  "redirect-port": 19132
}
```

Permet de configurer la rediréction une fois que le client a fini la file d'attente.

## Feedback

Si vous avez des commentaires, n'hésitez pas à nous contacter à l'adresse suivante : contact@erodia.fr
## Auteurs
- [@Zwuiix-cmd](https://www.github.com/Zwuiix-cmd)

## Utilisé par
Ce projet est utilisé par les entreprises suivantes :

- Erodia