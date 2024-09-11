const { align } = require('ascii-table');
const { EmbedBuilder, PermissionFlagsBits } = require('discord.js');
const { Button, Embed } = require(`../../Util/main`)
module.exports = {
    name: 'source',
    description: 'Get a h',
    aliases: [`team`, `info`],
    permissions: [],
    developerOnly: false,
    cooldown: 5000,
    run: async (client, message, args) => {
        const button = new Button()
            .setStyle(5)
            .setLabel(`Github`)
            .setURL(`https://github.com/azure-inc`)
            .setEmoji(`🔗`)
            .build()


        const teamEmbed = new Embed()
            .setTitle('Team Information')
            .setDescription('** Azure Team Members  And Information **')
            .setColor('#00FF00')
            .addField('** 👥 Black, Moussa **', '** Role: Developer **', true)
            .addField('** 💻 Moussa **', '** Role: Designer **', true)
            .addField('** 🧑‍💼 Black, Moussa, Dark **', '** Role: Server Manager **', true)
            .setThumbnail(message.guild.iconURL({ dynamic: true }))
            .setFooter({ text: `Requested by ${message.author.username}`, iconURL: message.author.avatarURL() })
            .setAuthor({ name: `Building new world toghter`, iconURL: message.guild.iconURL({ dynamic: true }) })
            .build();
        await message.reply({ components: [button], embeds: [teamEmbed] });
    },
};