const { EmbedBuilder, WebhookClient, Colors } = require('discord.js');
const url = process.env.WEBHOOK_URL;
const wait = (ms) => new Promise(resolve => setTimeout(resolve, ms));
if (!url) throw new Error(`[AntiCrash] Missing WEBHOOK_URL in .env`);
const webhookClient = new WebhookClient({ url: url });
if(!webhookClient) return;
const colors = require(`colors/safe`)
const client = require(`..`)
process.on('unhandledRejection', (reason, promise) => {
    console.log('Unhandled Rejection at:', promise, 'reason:', reason);

    const embed = new EmbedBuilder()
        .setTitle('Unhandled Rejection')
        .setColor(Colors.Red)
        .setDescription(`\`\`\`${reason}\`\`\``)
        .setTimestamp();

    webhookClient.send({ embeds: [embed] });
});

process.on('uncaughtException', (error) => {
    console.log('Uncaught Exception:', error);

    const embed = new EmbedBuilder()
        .setTitle('Uncaught Exception')
        .setColor(Colors.DarkRed)
        .setDescription(`\`\`\`${error.stack}\`\`\``)
        .setTimestamp();

    webhookClient.send({ embeds: [embed] });
});

process.on('warning', (warning) => {
    console.warn('Warning:', warning);

    const embed = new EmbedBuilder()
        .setTitle('Warning')
        .setColor(Colors.Yellow)
        .setDescription(`\`\`\`${warning.stack}\`\`\``)
        .setTimestamp();

    webhookClient.send({ embeds: [embed] });
});
wait(1000).then(() => {
    console.log(colors.green(`[AntiCrash]`) + colors.blue(` Anti-Crash handler has been initialized`));
});

client.on(`disconnect`, () => {
    console.warn('Client Disconnected');

    const embed = new EmbedBuilder()
        .setTitle('Client Disconnected')
        .setColor(Colors.red)
        .setDescription(`\`\`\`Client Disconnected\`\`\``)
        .setTimestamp();

    webhookClient.send({ embeds: [embed] });
});
