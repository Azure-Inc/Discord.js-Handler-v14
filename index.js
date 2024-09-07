const { Client, GatewayIntentBits } = require(`discord.js`)
const fs = require(`fs`)
const client = new Client({
    intents: [
		GatewayIntentBits.Guilds, 
		GatewayIntentBits.GuildMessages, 
		GatewayIntentBits.GuildMembers,
		GatewayIntentBits.GuildMessagePolls,
		GatewayIntentBits.GuildInvites,
		GatewayIntentBits.GuildPresences, 
		GatewayIntentBits.GuildMessageReactions, 
		GatewayIntentBits.DirectMessages,
		GatewayIntentBits.MessageContent
    ]
})

require(`dotenv`).config()
client.prefix = process.env.PREFIX

fs.readdir(`./Handlers`, (err, files) => {
    files.forEach(file => {
        require(`./Handlers/${file}`)(client)
    })
})


client.login(process.env.TOKEN)
module.exports = client;
