const fs = require('fs');
const path = require('path');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const AsciiTable = require('ascii-table');
const colors = require('colors/safe');
const ms = require(`ms`)
const wait = require(`util`).promisify(setTimeout)

const TOKEN = process.env.TOKEN;
const CLIENT_ID = process.env.CLIENT_ID;
const GUILD_ID = process.env.GUILD_ID;

const rest = new REST({ version: '9' }).setToken(TOKEN);

module.exports = async(client) => {
    if (!client.slashCommands) {
        client.slashCommands = new Map();
    }

    const table = new AsciiTable().setHeading('Slash Commands', 'Status');
    const slashCommands = [];

    const slashCommandsPath = path.join(process.cwd(), 'SlashCommands');

    const readCommands = (dir) => {
        const commandFiles = fs.readdirSync(dir).filter(file => file.endsWith('.js'));

        for (const file of commandFiles) {
            const filePath = path.join(dir, file);
            const command = require(filePath);

            if ('name' in command && 'description' in command && 'type' in command) {
                slashCommands.push(
                    {
                        name: command.name,
                        description: command.description,
                        options: command.options ? command.options : [],
                        type: command.type,
                        cooldown: command.cooldown ? command.cooldown : ms(`0s`),
                        permissions: command.permissions ? command.permissions : [],
                        devOnly: command.devOnly ? command.devOnly : false,
                    }
                );
                if(command.name) {
                    client.slashCommands.set(command.name, command);
                    table.addRow(command.name, '🟢');
                } else {
                    console.log(colors.yellow(`[WARNING] The command at ${filePath} is missing a required "name", "description", or "type" property.`));
                }
            } else {
                console.log(colors.yellow(`[WARNING] The command at ${filePath} is missing a required "name", "description", or "type" property.`));
            }
        }

        const subDirs = fs.readdirSync(dir).filter(subDir => fs.lstatSync(path.join(dir, subDir)).isDirectory());
        for (const subDir of subDirs) {
            readCommands(path.join(dir, subDir));
        }
    };

    readCommands(slashCommandsPath);

    await console.log(colors.red(table.toString()));
    await wait(1000)
    console.log(colors.green('[HANDLER]'), colors.red('SlashCommands'), colors.green('[SUCCESS]'), colors.red(`Loaded ${slashCommands.length} Slash Commands`));
    (async () => {
        try {
            await rest.put(
                process.env.GUILD_ID ?
                    Routes.applicationGuildCommands(CLIENT_ID, process.env.GUILD_ID) :
                    Routes.applicationCommands(CLIENT_ID),
                { body: slashCommands }
            );
            // console.log(colors.yellow(`[HANDLER] SlashCommands ${colors.green('[SUCCESS]')} Registered ${slashCommands.length} Slash Commands`))
        } catch (error) {
            console.log(error);
        }
    })();
};