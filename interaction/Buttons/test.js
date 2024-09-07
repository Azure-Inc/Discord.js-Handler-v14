const client = require("../../index");

client.on("interactionCreate", async (interaction) => {
    if (!interaction.isButton()) return;
    if (interaction.customId === "test") {
        interaction.reply({ content: "Test button clicked", ephemeral: true });
    }
});