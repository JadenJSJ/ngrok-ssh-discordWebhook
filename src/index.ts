import ngrok from 'ngrok';
import webhook from 'webhook-discord';
import * as dotenv from 'dotenv'

// __dirname on ES6
import { dirname } from 'path';
import { fileURLToPath } from 'url';
const __dirname = dirname(fileURLToPath(import.meta.url));

dotenv.config({path:__dirname+'/../.env'})

// @ts-ignore
const hook = new webhook.Webhook(process.env.discordWebhookUrl)

const ngrokSshTunnel = await ngrok.connect({
    authtoken: process.env.authtoken, // Token located on .env file
    proto: 'tcp',           // Protocol used
    addr: '127.0.0.1:22',   // ip and port to forward, example: 127.0.0.1:22 or 22
    region: 'ap',           // Set your own region
    // onLogEvent: data => {}   // debug
})

// ### Example of adding another tunnel to the program
// const ngrokOtherTunnel = await ngrok.connect({
//     authtoken: process.env.authtoken, // Token located on .env file
//     proto: 'tcp',          // Protocol used
//     addr: '127.0.0.1:443',   // ip and port to forward, example: 127.0.0.1:22 or 22
//     region: 'ap',           // Set your own region
//     // onLogEvent: data => {}  // debug
// })

const ngrokApi = await ngrok.getApi();

// we know it is not 'null' so there is a ! after ngrokApi
const tunnel = await ngrokApi!.listTunnels();

// console.log("SSH Tunnel running on " + ngrokSshTunnel)
// console.log("==========================")


var tunnelsData = []

// @ts-ignore
for (var i = 0; i < tunnel.tunnels.length; i = i + 1) {
    console.log("Tunnel " + i + " " + tunnel.tunnels[i].name)

    // @ts-ignore
    console.log(tunnel.tunnels[i].config.addr + " > " + tunnel.tunnels[i].public_url)

    // @ts-ignore
    tunnelsData[i] = [tunnel.tunnels[i].config.addr, tunnel.tunnels[i].public_url]
}

const embed = new webhook.MessageBuilder()
        .setName("ngrok")
        .setAvatar('https://cdn.discordapp.com/avatars/1052846223813529640/7a22209940c32e6c54b892de90fc0c5c.png?size=4096')
        // .setTitle('')
        .setAuthor('ngrok Tunnel Started', 'https://cdn.discordapp.com/avatars/1052846223813529640/7a22209940c32e6c54b892de90fc0c5c.png?size=4096')
        // .setDescription("Tunnel was started")
        // .addField('Tunnel ' + i, tunnel.tunnels[i].public_url, true)
        .setColor('#031D8E')
        .setFooter('ngrok Tunnel Notification', 'https://avatars.githubusercontent.com/u/44781632')
        .setTime();

for (let f = 0; f < i; f = f + 1) {
    // @ts-ignore
    embed.addField('Tunnel ' + f, "**Local: **" + tunnelsData[f][0] + "\n**External: **" + tunnelsData[f][1], true)
}

// console.log(JSON.stringify(embed))
hook.send(embed);

// // @ts-ignore
// console.log(JSON.stringify(tunnelsData))