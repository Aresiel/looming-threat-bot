require('dotenv').config()

const Discord = require('discord.js');
const client = new Discord.Client();
const perms = ["CREATE_INSTANT_INVITE", "KICK_MEMBERS", "BAN_MEMBERS", "MANAGE_CHANNELS", "MANAGE_GUILD",
    "ADD_REACTIONS", "VIEW_AUDIT_LOG", "PRIORITY_SPEAKER", "STREAM", "VIEW_CHANNEL", "SEND_MESSAGES",
    "SEND_TTS_MESSAGES", "MANAGE_ROLES", "EMBED_LINKS", "ATTACH_FILES", "READ_MESSAGE_HISTORY", "MENTION_EVERYONE",
    "USE_EXTERNAL_EMOJIS", "VIEW_GUILD_INSIGHTS", "CONNECT", "SPEAK", "MUTE_MEMBERS", "DEAFEN_MEMBERS", "MOVE_MEMBERS",
    "USE_VAD", "CHANGE_NICKNAME", "MANAGE_NICKNAMES", "MANAGE_ROLES", "MANAGE_WEBHOOKS", "MANAGE_EMOJIS"]


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
});

client.on('guildCreate', async guild => {
    if(!guild.me.hasPermission(perms)) {
        await guild.leave()
    }
});

client.login(process.env.TOKEN);