const fs = require(`fs`)
let AsciiTable = require('ascii-table')
let table = new AsciiTable()
const colors = require(`colors/safe`)
table.setHeading('Events', 'Stats').setBorder('|', '=', "0", "0")

module.exports = (client) => {
    fs.readdir(`./Events`, (err, files) => {
        files.forEach(file => {
            require(`../Events/${file}`)
            table.addRow(file.split('.js')[0], '✅')
        })
        console.log(colors.green(table.toString()))
    })
} 
