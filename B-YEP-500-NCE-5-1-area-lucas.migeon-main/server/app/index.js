const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const discord = require('./services/discord.service');
const { Worker } = require('worker_threads');

const { SERVER } = require('./config');

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', require('./middlewares/check_jwt.middleware'), require('./routes/api'));

app.use('/about.json', require('./routes/about.route'));

const { start } = require('./models');

start()
    .then(() => {
        const server = app.listen(
            SERVER.PORT, '0.0.0.0', () => console.log(`listening: http://localhost:${SERVER.PORT}`)
        );
        discord.on('ready', () => {
            console.log(discord.user.tag);
            
            const worker = new Worker('./app/worker.js');
            worker.on('message', console.log);
            worker.on('error', console.error);
            worker.on('exit', (code) => {
                if (code !== 0) console.error(`worker stopped with ${code} exit code`);
            });
        })
    })
    .catch((err) => {
        console.error(err);
    });

// // GITHUB CONNECTION TEST

// app.get('/auth/github', (req, res) => {
//     res.header("Access-Control-Allow-Origin: http://localhost:4200")
//     res.redirect(
//         'https://github.com/login/oauth/authorize?client_id=34a1d5858eaccbdfc04f&redirect_uri=http://localhost:4200/&scope=repo,repo:status,user&state=Miaw'
//     )
// });

// // YOUTUBE CONNECTION

// const { google } = require('googleapis');

// const oauth2Client = new google.auth.OAuth2(
//     "284715382868-nml2sr0miius6oqk8frr6e4qt3clqoal.apps.googleusercontent.com",
//     "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",
//     "http://localhost:4200/create"
// );

// const scopes = [
//     "https://www.googleapis.com/auth/youtube.readonly",
// ];

// const url = oauth2Client.generateAuthUrl({
//     access_type: 'offline',
//     scope: scopes
// });

// console.log(url);