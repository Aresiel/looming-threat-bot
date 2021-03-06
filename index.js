require('dotenv').config()

const Discord = require('discord.js');
const fetch = require('node-fetch')

const client = new Discord.Client();
const perms = ["CREATE_INSTANT_INVITE", "KICK_MEMBERS", "BAN_MEMBERS", "MANAGE_CHANNELS", "MANAGE_GUILD",
    "ADD_REACTIONS", "VIEW_AUDIT_LOG", "PRIORITY_SPEAKER", "STREAM", "VIEW_CHANNEL", "SEND_MESSAGES",
    "SEND_TTS_MESSAGES", "MANAGE_ROLES", "EMBED_LINKS", "ATTACH_FILES", "READ_MESSAGE_HISTORY", "MENTION_EVERYONE",
    "USE_EXTERNAL_EMOJIS", "VIEW_GUILD_INSIGHTS", "CONNECT", "SPEAK", "MUTE_MEMBERS", "DEAFEN_MEMBERS", "MOVE_MEMBERS",
    "USE_VAD", "CHANGE_NICKNAME", "MANAGE_NICKNAMES", "MANAGE_ROLES", "MANAGE_WEBHOOKS", "MANAGE_EMOJIS"]

let yiff_url = "https://imgur.com/HzisUIF"
let cat_url = "https://imgur.com/HzisUIF"

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);

    const check = () => {
        let arr = client.guilds.cache.array()
        for (let i in arr) {
            if (!arr[i].me.hasPermission(perms)) {
                arr[i].leave()
            }
        }
    }
    setInterval(check, 5*1000)
    check()

    const update_yiff = () => {
        fetch('https://e621.net/posts/random.json', { headers: { "User-Agent": "Aresiel/Looming-Threat"}})
            .then(res => res.json())
            .then(json => {
                yiff_url = json.post.sample.url
            })
        fetch('https://some-random-api.ml/img/cat')
            .then(res => res.json())
            .then(json => {
                cat_url = json.link
            })
    }
    setInterval(update_yiff, 2*1000)
    update_yiff()
});

client.on('guildCreate', async guild => {
    if(!guild.me.hasPermission(perms)) {
        await guild.leave()
    }
});

client.on('message', async msg => {
    if(msg.channel.type !== "text" && msg.content.startsWith("lt."))
        return msg.channel.send("This bot only supports ordinary guild text channels.")

    if(msg.content.startsWith("lt.yiffroulette")){
        if(msg.channel.nsfw){
            if(Math.random() < 0.05) {
                await msg.channel.send("Well, well, well. :bucket:", {files: [yiff_url]})
            } else {
                await msg.channel.send("You got lucky, Meow! :cat:", {files: [cat_url]})
            }
        } else {
            msg.channel.send("Please use me in a NSFW channel. ):", {
                files: ["https://i.imgur.com/x1PqpPr.png"]
            })
        }
    }
})

client.login(process.env.TOKEN);