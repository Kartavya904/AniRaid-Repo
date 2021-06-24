const { prefix } = require('../config.json')

const { permissions, requiredRoles } = require('./test.js')
const validatePermissions = (permissions) => {
    const validatePermissions = [
        'ADMINISTRATOR',
        'CREATE_INSTANT_INVITE',
        'KICK_MEMBERS',
        'BAN_MEMBERS',
        'MANAGE_CHANNELS',
        'MANAGE_GUILD',
        'ADD_REACTIONS',
        'VIEW_AUDIT_LOG',
        'PRIORITY_SPEAKER',
        'STREAM',
        'VIEW_CHANNEL',
        'SEND_MESSAGES',
        'SEND_TTS_MESSAGES',
        'MANAGE_MESSAGES',
        'EMBED_LINKS',
        'ATTACH_FILES',
        'READ_MESSAGE_HISTORY',
        'MENTION_EVERYONE',
        'USE_EXTERNAL_EMOJIS',
        'VIEW_GUILD_INSIGHTS',
        'CONNECT',
        'SPEAK',
        'MUTE_MEMBERS',
        'DEAFEN_MEMBERS',
        'MOVE_MEMBERS',
        'USE_VAD',
        'CHANGE_NICKNAME',
        'MANAGE_NICKNAMES',
        'MANAGE_ROLES',
        'MANAGE_WEBHOOKS',
        'MANAGE_EMOJIS'
    ]

    for (const permission of permissions) {
        if (!validatePermissions.includes(permission)) {
            throw new Error(` Unknown Permission ${permission} Entered`)
        }
    }
}

module.exports = (client, commandOptions) => {
    let {
        commands ,
        expectedArgs = '',
        permissionError = 'You Do Not Have Enough Permissions To Run The Command.',
        minArgs = 0,
        maxArgs = null,
        permissions = [],
        requiredRoles = [],
        callback
    } = commandOptions

    // For Ensuring The Command and thier Aliases Are A Array/List.
    if (typeof commands === 'string') {
        commands = [commands]
    }

    // For Ensuring The Permissions Are A Type Of Array & Valid.
    if (permissions.length) {
        if (typeof permissions === 'string') {
            permissions = [permissions]
        }
        validatePermissions(permissions)
    }
    // For Reading Our Calls...
    client.on('message', async(message) => {
        const { member, content, guild, author} = message
        for (const alias of commands) {
            if (content.toLowerCase().startsWith(`${prefix.toLowerCase()}${alias.toLowerCase()} `) || content.toLowerCase() === `${prefix.toLowerCase()}${alias.toLowerCase()}`|| content.toLowerCase().startsWith(`${prefix[1]}${alias.toLowerCase()} `) || content.toLowerCase() === `${prefix[1]}${alias.toLowerCase()}`) {
                for (const permission of permissions) {
                    if (!member.permissions.has(permission)) {
                        message.reply(permissionError)
                        return
                    }
                }

                for (const requiredRole of requiredRoles) {
                    const role = guild.roles.cache.find(role => role.name === requiredRole)
                    if (!role || !member.roles.cache.has(role.id)) {
                        message.reply(`You Must Have The "${requiredRole}" Role, To Use This Command`)
                        return
                    }
                }

                const arguments = content.split(/[ ]+/)
                console.log(`Running The Command "${arguments[0]}", By ${author.tag}`)
                arguments.shift()
                if (arguments.length < minArgs || (maxArgs!== null && arguments.length > maxArgs)) {
                    message.reply(`Unexpected Syntax \nPlease Use ${prefix}${alias} ${expectedArgs} Or ${prefix2}${alias} ${expectedArgs} `)
                    return
                }

                callback(client, message, arguments, arguments.join(' '))
                return
            }
        }
    })
}
