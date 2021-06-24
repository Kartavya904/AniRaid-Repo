module.exports = {
    commands : ['test','testme','mytest'],
    expectedArgs : '',
    permissionError : 'You Need Some Permissions To Run This Command.',
    minArgs : 0,
    maxArgs : 0,
    callback : async(client, message, arguments, text) => {
        message.channel.send(`${client.user.tag} Is Online, And In Working Condition.`)
    },
    permissions : [],
    requiredRoles : []
}