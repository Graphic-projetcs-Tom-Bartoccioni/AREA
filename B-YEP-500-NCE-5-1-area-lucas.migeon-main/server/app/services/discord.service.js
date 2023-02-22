const { Client, Intents } = require("discord.js");

const TOKEN = "OTQ5MzA0NjM2NDE2ODU2MDc0.YiIa1g.1z0ZbSp8ggfT5-vu5EbcRjErHKE";

const client = new Client({
    intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MESSAGE_REACTIONS],
})

// client.on("ready", () => {
//     const weather = false;
//     const temp = 10;
//     const timer = false;
//     console.log(`Logged in as ${client.user.tag}`)
    // if (timer) {
    //     setInterval(() => {
    //         client.channels.cache.get(`949326414287634452`).send(`ring!! ring!! 1 minute passed ⏲`);
    //     }, 60000)
    // }
    // if (weather) {
    //     if (temp < 10)
    //         client.channels.cache.get(`949326414287634452`).send(`Temperature in Nice is lesser than 10 degree 🌡`);
    //     if (temp > 10)
    //     client.channels.cache.get(`949326414287634452`).send(`Temperature in Nice is superior to 10 degree 🌡`);
    //     if (temp == 10)
    //     client.channels.cache.get(`949326414287634452`).send(`Temperature in Nice is equal to 10 degree 🌡`);
    // }
// })

// client.on("messageCreate", (message) => {
//     if (message.content != '' && message.author.username != client.user.username) {
//         message.reply("Hello World");
//     }
// })

// client.on("messageCreate", (message) => {
//     if (message.content != '' && message.author.username != client.user.username) {
//         message.react('👍');
//     }
// })

client.login(TOKEN);

module.exports = client;