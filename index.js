//"mongoPath" : "mongodb+srv://Coding-Dominion-DC-Bot:v8oI8oW3A0DF8Teh@coding-dominion-dc-bot.q5bgy.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
const path = require('path')
const fs = require('fs')
const {token} = require('./config.json')
const EventEmitter = require('events')
const emitter = new EventEmitter()
EventEmitter.defaultMaxListeners = 100
const { Client, Intents, Message, DiscordAPIError, MessageEmbed, Presence, BaseClient } = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_VOICE_STATES] });

const commandBase = require('./commands/commands-base')

client.on('ready', () => {
    console.log(`Logged In As ${client.user.tag}`)

    console.log(`No Mongoose Database Found, Hence : Not Connected`)

    const name = `A.help`
    console.log(`Changed ${client.user.tag}'s Status To Playing ${name}`)
    client.user.setPresence({
        activity: {
            name ,
            type: 0,
        }
    })

    client.on('guildMemberAdd',async(member) => {
        const aniraidGuild = client.guilds.cache.get(`857361612411633664`)
        client.channels.cache.get('857758680631214090').setName(`🌏 Total Members : ${aniraidGuild.memberCount}`)
        client.channels.cache.get('857759127904452618').setName(`👨 Total Humans : ${aniraidGuild.members.cache.filter(m => !m.user.bot).size}`)
        client.channels.cache.get('857759201001472061').setName(`🤖 Total Bots : ${aniraidGuild.members.cache.filter(m => m.user.bot).size}`)
    })


    const baseFile = 'commands-base.js'
    const CommandBase = require(`./commands/${baseFile}`)
    const readCommands = dir => {
        const files = fs.readdirSync(path.join(__dirname, dir))
        //files.shift(1)
        for (const file of files) {
            const stat = fs.lstatSync(path.join(__dirname, dir, file))
            if (stat.isDirectory()) {
                readCommands(path.join(dir, file))
            } else if (file !== baseFile) {
                const option = require(path.join(__dirname, dir, file))
                CommandBase(client, option)
            }
        }
    }

    // All Functions And Commands : -

    readCommands('commands')
})

client.login(`${token}`)