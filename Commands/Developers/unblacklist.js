const { EmbedBuilder, PermissionFlagsBits } = require('discord.js');
const { Button, Embed } = require(`../../Util/main`)
const Model = require('../../Models/userDB');

module.exports = {
    name: 'unblacklist',
    description: 'Remove user from blacklist',
    aliases: [`whitelist`, `unblacklist`],
    permissions: [],
    developerOnly: true,
    cooldown: 5000,
    run: async (client, message, args) => {
        let user = message.mentions.users.first() || client.users.cache.get(args[0]);
        if (!user) {
            return message.reply(`** :x: Please mention a valid user or provide a valid user ID.**`);
        }
        let data = await Model.findOne({ _id: user.id });
        let blacklisted = data?.blacklisted || false;
        if (blacklisted === false) {
            return message.reply(`** :x: ${user.tag} is not blacklisted from using the bot.**`);
        } else {
            data.blacklisted = false;
            await data.save();
            return message.reply(`** :white_check_mark: ${user.tag} has been removed from the blacklist.**`);
        }
    },
};