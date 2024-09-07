const mongoose = require(`mongoose`)
const colors = require(`colors/safe`)

module.exports = async (client) => {
    await mongoose.connect(process.env.MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
        .then(() => {
            console.log(colors.green('[DATABASE]'), colors.blue('MongoDB has Connected'))
        })
        .catch((err) => {
            console.log(colors.red('[DATABASE]'), colors.red('MongoDB has Error'), err)
        })
}