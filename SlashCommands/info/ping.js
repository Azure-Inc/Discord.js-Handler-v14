const { ApplicationCommandType } = require('discord.js');
const ms = require(`ms`)
module.exports = {
    name: `ping`,
    description: `Replies with Pong!`,
    type: ApplicationCommandType.ChatInput,
    cooldown: ms(`5s`),
    devOnly: false,
    run: async (client, interaction) => {
        await interaction.reply({ content: `Pong!` });
    }
};
