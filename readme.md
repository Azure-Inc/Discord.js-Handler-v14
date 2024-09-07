# Discord.js Handler V14 🚀
**This project is a Discord bot that includes various commands and functionalities to manage user interactions and permissions within a Discord server. The bot is built using Node.js and the discord.js library, and it utilizes MongoDB for database operations.**
## Features ✨

1. 📝 **Command Handling**: Supports both traditional prefix commands and slash commands.
2. ⏳ **Cooldown System**: Prevents spam by implementing cooldowns on commands.
3. 🔒 **Permission System**: Checks for user permissions before executing commands.
4. 👨‍💻 **Developer-Only Commands**: Restricts certain commands to bot developers.
5. 🚫 **Blacklist System**: Allows blacklisting users from using the bot.
6. 🎉 **Event Handling**: Efficiently manages Discord events.
7. 🗄️ **Database Integration**: Uses MongoDB for data persistence.
8. 🖼️ **Embed Builder**: Utility for creating rich embeds easily.
9. 🚀 **Aliases**: Allows you to use multiple names for a command.
10. 🔘 **Button Builder**: Simplifies the creation of Discord buttons.
11. 🛠️ **Error Handling**: Robust error catching and logging.
12. 😍 **Easy-to-use**: Includes a convenient `start.bat` launcher for quick and hassle-free bot startup on Windows systems.
## Key Components 🛠️

- 📁 **Command Structure**: Organized command files with properties like name, description, aliases, permissions, and cooldown.
- ⚙️ **Slash Command Support**: Implements Discord's slash command feature for easier command usage.
- 🗄️ **User Database**: Stores user-specific data, including blacklist status.
- 🛠️ **Utility Functions**: Helper functions for common tasks like creating embeds and buttons.
- 📝 **Configuration File**: Centralized configuration for bot settings and developer IDs.

## Getting Started 🚀

1. 🌀 Clone the repository
2. 📦 Install dependencies with `npm install`, or using `start.bat`
3. 🗄️ Set up your MongoDB database
4. ⚙️ Configure your bot token and other settings in `config.json`
5. 🚀 Run the bot with `node index.js` or use `start.bat`

## Contributing 🤝

Contributions are welcome! Please feel free to submit a Pull Request.

## License 📜

This project is licensed under the MIT License - see the LICENSE file for details.

- 🏓 **Ping Command**: Replies with "Pong!" to check if the bot is responsive.
- 🚫 **Blacklist Command**: Allows developers to blacklist users from using the bot.
- ✅ **Unblacklist Command**: Allows developers to remove users from the blacklist.
- ⏳ **Cooldown Management**: Implements cooldowns for commands to prevent spam.
- 🔒 **Permission Checks**: Ensures that only users with the required permissions can execute certain commands.
- 👨‍💻 **Developer-Only Commands**: Restricts certain commands to bot developers only.
- 🚷 **User Blacklist Check**: Prevents blacklisted users from using the bot.

## File Structure 📁

- 🗄️ **Models/userDB.js**: Defines the MongoDB schema for user data, including blacklist status.
- 🏓 **SlashCommands/info/ping.js**: Contains the implementation of the ping command.
- 🚫 **Commands/Developers/blacklist.js**: Contains the implementation of the blacklist command.
- ✅ **Commands/Developers/unblacklist.js**: Contains the implementation of the unblacklist command.
- 🎉 **Events/InteractionCreate.js**: Handles interaction events and command execution, including cooldown and permission checks.

## Setup 🛠️

1. 🌀 Clone the repository.
2. 📦 Install the required dependencies using `npm install`.
3. ⚙️ Configure the bot token and other settings in the `config.json` file.
4. 🚀 Run the bot using `node index.js`.

## Usage 📋

- 🏓 Use the `ping` command to check if the bot is online.
- 🚫 Use the `blacklist <user>` command to blacklist a user.
- ✅ Use the `unblacklist <user>` command to remove a user from the blacklist.

## Contributing 🤝

Feel free to contribute to this project by submitting pull requests or opening issues. Make sure to follow the code style and include tests for any new features or bug fixes.

## License 📜

This project is licensed under the MIT License.
All copyright saved for Azure Team.