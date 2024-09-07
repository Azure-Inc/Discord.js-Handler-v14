const client = require(`..`);
const { Collection } = require('discord.js');
const prefix = client.prefix;
const { developers } = require('../config.json')
const Data = require(`../Models/userDB`)

client.on(`messageCreate`, async (message) => {
    if (message.author.bot || !message.guild.id === process.env.GUILD_ID) return;
    const UserD = await Data.findOne({ _id: message.author.id, guildid: message.guild.id })

    if (message.content.includes(client.user.id)) {
        message.reply(` ** Hi ${message.author.username}, My prefix is \`${prefix}\`**`);
    }



    let args, commandName, command;
    if (message.content.startsWith(prefix)) {
        args = message.content.slice(prefix.length).trim().split(/ +/);
        commandName = args.shift().toLowerCase();
        command = client.commands.get(commandName);
    } else {
        args = message.content.trim().split(/ +/);
        commandName = args.shift().toLowerCase();
        command = client.commands.get(client.aliases.get(commandName));
    }

    if (!command) return;

    if (UserD?.blacklisted && UserD.blacklisted === true) {
        return message.reply(`** :X: You Blacklisted From Used This Bot Commands **`)
    }
    const cooldown = command.cooldown;
    if (cooldown > 0) {
        const now = Date.now();
        const timestamps = client.cooldowns || new Collection();
        const timestamp = timestamps.get(`${message.author.id}-${command.name}`);
        if (timestamp && now < timestamp) {
            const timeLeft = timestamp - now;
            const formattedTimeLeft = require('ms')(timeLeft, { long: true });
            await message.reply(`** :x: You must wait ${formattedTimeLeft} before using the \`${command.name}\` command again!**`)
            return message.delete();
        }
    }
    if (command.developerOnly && !developers.includes(message.author.id)) {
        return message.reply('** :x: This command is only available to developers.**');
    }
    if (command.permissions && command.permissions.length > 0) {
        const missingPermissions = command.permissions.filter(permission => !message.member.permissions.has(permission));
        if (missingPermissions.length > 0) {
            return message.reply(`** :x: You don't have the required permissions to use this command. Missing: ${missingPermissions.join(', ')}**`);
        }
    }
    try {
        command.run(client, message, args);
        if (cooldown > 0) {
            const timestamps = client.cooldowns || new Collection();
            timestamps.set(`${message.author.id}-${command.name}`, Date.now() + cooldown);
            client.cooldowns = timestamps;
        }
    } catch (error) {
        console.error(error);
        message.reply(`** :x: There was an error trying to execute that command!**`);
    }
});
