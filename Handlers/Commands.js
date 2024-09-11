const fs = require('fs');
const path = require('path');
const AsciiTable = require('ascii-table');
const colors = require('colors/safe');
const wait = require(`util`).promisify(setTimeout)
module.exports = (client) => {
    client.commands = new Map();
    client.aliases = new Map();
    client.categories = new Set();
    client.cooldowns = new Map();

    const loadCommand = (filePath) => {
        try {
            const command = require(filePath);
            if (!command.name) {
                throw new Error('Command is missing a name property');
            }

            client.commands.set(command.name, command);
            if (command.aliases && Array.isArray(command.aliases)) {
                command.aliases.forEach((alias) => client.aliases.set(alias, command.name));
            }

            const category = path.basename(path.dirname(filePath));
            client.categories.add(category);
            command.category = category;

            if (command.cooldown && typeof command.cooldown !== 'number') {
                throw new Error('Cooldown must be a number');
            }

            if (command.cooldown && command.cooldown < 0) {
                throw new Error('Cooldown for ' + command.name + ' must be a positive number');
            }

            if (command.cooldown) {
                client.cooldowns.set(command.name, command.cooldown);
            }

            return { name: command.name, status: '✅' };
        } catch (error) {
            return { name: path.basename(filePath), status: `❌ -> ${error.message}` };
        }
    };

    const loadCommands = (dir) => {
        const results = [];
        const files = fs.readdirSync(dir, { withFileTypes: true });

        for (const file of files) {
            const filePath = path.join(dir, file.name);
            if (file.isDirectory()) {
                results.push(...loadCommands(filePath));
            } else if (file.name.endsWith('.js')) {
                results.push(loadCommand(filePath));
            }
        }

        return results;
    };

    const commandsDir = path.join(process.cwd(), 'Commands');
    const loadedCommands = loadCommands(commandsDir);

    const table = new AsciiTable('Commands');
    table.setHeading('Prefix Commands', 'Status').setBorder('|', '=', "0", "0");
    loadedCommands.forEach(({ name, status }) => table.addRow(name, status));

    console.log(colors.green(table.toString()));
     wait(1000);
    console.log(colors.yellow(`Loaded ${client.commands.size} commands.`));
    // console.log(colors.cyan(`Categories: ${Array.from(client.categories).join(', ')}`));

    process.on('unhandledRejection', (error) => {
        console.error(colors.red('Unhandled promise rejection:'), error);
    });
}