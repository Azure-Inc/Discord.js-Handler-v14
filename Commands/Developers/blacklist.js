const { EmbedBuilder, PermissionFlagsBits } = require('discord.js');
const { Button, Embed } = require(`../../Util/main`)
const Model = require('../../Models/userDB');

module.exports = {
    name: 'blacklist',
    description: 'Add user to blacklist',
    aliases: [`darkside`, `blacklist`],
    permissions: [],
    developerOnly: true,
    cooldown: 5000,
    run: async (client, message, args) => {
        let user = message.mentions.users.first() || client.users.cache.get(args[0]);
        if (!user) {
            return message.reply(`** :x: Please mention a valid user or provide a valid user ID.**`);
        }
        let data = await Model.findOne({ _id: user.id, guildid: message.guild.id });
        let blacklisted = data?.blacklisted || false;
        if (blacklisted === true) {
            return message.reply(`** :x: ${user.tag} is already blacklisted from using the bot.**`);
        } else {
            if (!data) {
                data = new Model({ _id: user.id, blacklisted: true , guildid: message.guild.id});
            } else {
                data.blacklisted = true;
            }
            await data.save();
            return message.reply(`** :white_check_mark: ${user.tag} has been blacklisted from using the bot.**`);
        }
    },
};