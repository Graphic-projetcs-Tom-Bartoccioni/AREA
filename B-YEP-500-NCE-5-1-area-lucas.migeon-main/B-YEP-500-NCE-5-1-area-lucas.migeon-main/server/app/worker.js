const { workerData, parentPort } = require('worker_threads');
const axios = require('axios').default;
const discord = require('./services/discord.service');
const db = require('./models');
const client = require('./services/discord.service');

async function timerAction(doc) {
    switch (doc.action.id) {
        case 1:
            var req = {
                method: 'GET',
                url: `https://timercheck.io/${doc.userId}${doc.title}`
            }

            var res;
            try {
                res = await axios.request(req);
            } catch (err) {
                req = {
                    method: 'GET',
                    url: `https://timercheck.io/${doc.userId}${doc.title}/60`
                }
                try {
                    res = await axios.request(req);
                } catch (err) {
                    throw err;
                }
                return true;
            }
            return false;
        default: return false;
    }
}

async function weatherAction(doc) {
    switch (doc.action.id) {
        case 1:
            var req = {
                method: 'GET',
                url: `http://api.openweathermap.org/data/2.5/weather?q=nice&appid=3738bee0a2867ba75295917aecc7b833`
            }
            
            var res;
            try {
                res = await axios.request(req);
            } catch (err) {
                throw err;
            }
            if (res.data.main.temp - 273,15 < 10) return true;
            return false;
        case 2: 
            var req = {
                method: 'GET',
                url: `http://api.openweathermap.org/data/2.5/weather?q=nice&appid=3738bee0a2867ba75295917aecc7b833`
            }

            var res;
            try {
                res = await axios.request(req);
            } catch (err) {
                throw err;
            }
            if (res.data.main.temp - 273,15 < 10) return false;
            return true;
        default: return false;
    }
}


var tmpMessage = null;
var newMessage = null;

discord.on('messageCreate', (message) => {
    // console.log("messageCreate");
    if (message.author.bot === false) {
        tmpMessage = message;
    }
});

async function discordAction(doc) {
    switch (doc.action.id) {
        case 2:
            return newMessage !== null;
        default: return false;
    }
}

let newUser = {
    firstname: '',
    lastname: '',
};

async function randomUserAction(doc) {
    switch (doc.action.id) {
        case 1:
            var req = {
                method: 'GET',
                url: `https://randomuser.me/api`
            }
            
            var res;
            try {
                res = await axios.request(req);
            } catch (err) {
                throw err;
            }
            newUser.firstname = res.data.results[0].name.first;
            newUser.lastname = res.data.results[0].name.last;
            return true;
        default: return false;
    }
}

let subscribers = 0;
async function youtubeAction(doc) {
    switch (doc.action.id) {
        case 1:
            var req = {
                method: 'GET',
                url: `https://www.googleapis.com/youtube/v3/channels?part=statistics,snippet&id=UCWnsNI_cZqbVHfQMGWl_x_Q&key=AIzaSyD26rRhbVbCI2VRLGrxAmC_9meBzvDDrDk`
            }
            
            var res;
            try {
                res = await axios.request(req);
            } catch (err) {
                throw err;
            }
            if (res.data.items[0].statistics.subscriberCount != subscribers) {
                subscribers = res.data.items[0].statistics.subscriberCount;
                return true;
            }
            return false;
        default: return false;
    }
}

const actions = {
    'timer': timerAction,
    'discord': discordAction,
    'weather': weatherAction,
    'randomUser': randomUserAction,
    'youtube': youtubeAction,
};

function discordSendMessage(doc) {
    switch (doc.actionService) {
        case 'timer':
            discord.channels.cache.get(`949326414287634452`).send(`ring!! ring!! 1 minute passed ⏲`);
            return true;
        case 'weather':
            if (doc.action.id === 1)
                discord.channels.cache.get(`949326414287634452`).send(`Temperature in Nice is lesser than 10 degree 🌡`);
            if (doc.action.id === 2)
                discord.channels.cache.get(`949326414287634452`).send(`Temperature in Nice is superior to 10 degree 🌡`);
            return true;
        case 'discord':
            discord.channels.cache.get(`949326414287634452`).send(`Noice`);
            return true;
        case 'randomUser':
            discord.channels.cache.get(`949326414287634452`).send(`New User has been created. Welcome "${newUser.lastname} "${newUser.firstname}"`);
            return true;
        case 'youtube':
            discord.channels.cache.get(`949326414287634452`).send(`Your subscriber count has changed, it now is: ${subscribers}`);
            return true;
        default: return false
    }
}

function discordReactWithEmote(doc) {
    switch (doc.actionService) {
        case 'discord':
            newMessage.react("👍");
            return true;
        default: return false;
    }
}

async function discordReaction(doc) {
    switch (doc.reaction.id) {
        case 1:
            return discordSendMessage(doc);
        case 2:
            return discordReactWithEmote(doc);
        case 3:
            if (doc.actionService == 'discord') {
                newMessage.reply("Hello " + newMessage.author.username + " 👋");
                return true;
            }
        default: return false;
    }
}

const reactions = {
    'discord': discordReaction,
};

var processed = 0;

function end(array) {
    ++processed;
    if (processed === array.length) {
        setTimeout(worker, timeout);
        newMessage = null;
    }
}

const timeout = 2000;
function worker() {
    processed = 0;
    if (tmpMessage !== null) {
        newMessage = tmpMessage;
        tmpMessage = null;
    }
    db.mongo.data.find({}).exec((err, docs) => {
        if (err) return console.error(err);
        if (docs.length === 0) return setTimeout(worker, timeout);

        docs.forEach((element, index, array) => {
            try {
                const action = actions[element._doc.actionService];

                if (action) {
                    action(element._doc).then((value) => {
                        if (value === true) {
                            const reaction = reactions[element._doc.reactionService];

                            if (reaction)
                                reaction(element._doc).then((value) => {
                                    end(array);
                                }).catch((err) => {
                                    end(array);
                                });
                        }
                        end(array);
                    }).catch((err) => {
                        end(array);
                    });
                }
            } catch (err) {
                end(array);
            }
        });
    });
}
db.start().then(worker);