const fs = require(`fs`)
const path = require('path');
const colors = require(`colors/safe`)
module.exports = (client) => {
    const interactionDir = path.join(__dirname, `../interaction`)
    fs.readdirSync(interactionDir).forEach(dir => {
        const interactionFiles = fs.readdirSync(path.join(interactionDir, dir)).filter(file => file.endsWith(`.js`))
        interactionFiles.forEach(file => {
            require(path.join(`${interactionDir}/${dir}/${file}`))
        })
    })

}