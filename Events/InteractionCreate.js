const client = require('..');
const { Collection } = require('discord.js');
const { developers } = require('../config.json') 
const userDB = require(`../Models/userDB`)
client.on(`interactionCreate`, async (interaction) => {
    if (!interaction.isChatInputCommand()) return;

    const command = client.slashCommands.get(interaction.commandName);
    if (!command) return;
    const ms = require(`ms`)
    const cooldown = command.cooldown;
    if (cooldown > 0) {
        const now = Date.now();
        const timestamps = client.cooldowns || new Collection();
        const timestamp = timestamps.get(`${interaction.user.id}-${command.name}`);
        if (timestamp && now < timestamp) {
            const timeLeft = timestamp - now;
            const formattedTimeLeft = ms(timeLeft, { long: true });
            if (interaction.replied || interaction.deferred) {
                return interaction.followUp({ content: `** :x: You must wait ${formattedTimeLeft} before using this command again!**`, ephemeral: true });
            } else {
                return interaction.reply({ content: `** :x: You must wait ${formattedTimeLeft} before using this command again!**`, ephemeral: true });
            }
        }
    }

    const user = await userDB.findOne({ _id: interaction.user.id, guildid: interaction.guild.id });
    if (user && user.blacklisted === true) {
        return interaction.reply({ content: `** :x: You are blacklisted from using this bot.**`, ephemeral: true });
    }

    if (command.devOnly && !developers.includes(interaction.user.id)) {
        return interaction.reply({ content: `** :x: This command is only available to developers.**`, ephemeral: true });
    }

    
    if (command.permissions && command.permissions.length > 0) {
        const missingPermissions = command.permissions.filter(permission => !interaction.member.permissions.has(permission));
        if (missingPermissions.length > 0) {
            return interaction.reply({ content: `** :x: You don't have the required permissions to use this command. Missing: ${missingPermissions.join(', ')}**`, ephemeral: true });
        }
    }
    try {
        await command.run(client, interaction);
        if (cooldown > 0) {
            const timestamps = client.cooldowns || new Collection();
            timestamps.set(`${interaction.user.id}-${command.name}`, Date.now() + cooldown);
            client.cooldowns = timestamps;
        }
    } catch (error) {
        console.error(error);
        if (interaction.replied || interaction.deferred) {
            return interaction.followUp({ content: `** :x: There was an issue while Running this command!**`, ephemeral: true });
        } else {
            return interaction.reply({ content: `** :x: There was an issue while Running this command!**`, ephemeral: true });
        }
    }
})