const client = require(`..`)
const colors = require(`colors/safe`)
const mongoose = require('mongoose')

client.on(`ready`, async () => {
    try {
        client.user.setStatus(`dnd`)
        client.user.setActivity(`Azure Team`, { type: `PLAYING` });
        console.log(colors.green(`[READY]`), colors.blue(`${client.user.tag}`), colors.green(`is ready`))

    } catch (error) {
        console.error(colors.red(`[ERROR]`), error);
    }
})
