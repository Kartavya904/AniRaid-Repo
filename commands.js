const { prefix,prefix2 } = require('./config.json')

module.exports = (client,aliases,callback) => {
    if (typeof aliases === 'string') {
        aliases=[aliases]
    }
    client.on('message', message => {
        const { content,author } = message;
        aliases.forEach(alias => {
            const command = `${prefix}${alias}`
            const command2 = `${prefix2}${alias}`
            if (content.startsWith(`${command} `) || content === command || content.startsWith(`${command2} `) || content === command2) {
                console.log(`Running The Command ${command}, By ${author.tag}`);
                callback(message)
            }
        })
    })
}  