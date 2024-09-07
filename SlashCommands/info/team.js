const { ApplicationCommandType } = require('discord.js');
const { Button, Embed } = require(`../../Util/main`)
module.exports = {
    name: 'team',
    description: 'View the team information',
    type: ApplicationCommandType.ChatInput,
    run: async (client, interaction) => {
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
            .setThumbnail(interaction.guild.iconURL({ dynamic: true }))
            .setFooter({ text: `Requested by ${interaction.user.username}`, iconURL: interaction.user.avatarURL() })
            .setAuthor({ name: `Building new world toghter`, iconURL: interaction.guild.iconURL({ dynamic: true }) })
            .build();
        await interaction.reply({ components: [button], embeds: [teamEmbed] });    }
};