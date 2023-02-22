const router = require('express').Router();

router.get('/', (req, res) => {
    function about(remoteAddress) {
        return {
            "client": {
                "host": remoteAddress
            },
            "server": {
                "current_time": Date.now().toString(),
                "services": [
                    {
                        "name": "discord",
                        "actions": [
                            {
                                "name": "New pinned message in channel",
                                "description": "This trigger fires when a new message is pinned in a channel you select."
                            },
                            {
                                "name": "New message in channel",
                                "description": "his trigger fires when a new message is pinned in a channel you select."
                            },
                        ],
                        "reactions": [
                            {
                                "name": "Post a message to a channel",
                                "description": "This action will send a message with your discord bot to the channel you specify."
                            },
                            {
                                "name": "React with an emote",
                                "description": "React with an emote to a specific message"
                            },
                            {
                                "name": "Reply to message",
                                "description": "Reply to the message of an user"
                            }
                        ]
                    },
                    {
                        "name": "timer",
                        "actions": [
                            {
                                "name": "Every minute",
                                "description": "This trigger fires every minute"
                            },
                        ],
                    },
                    {
                        "name": "weather",
                        "actions": [
                            {
                                "name": "temperature lesser than 10 degree",
                                "description": "This trigger when the temperature of the city is less than 10 degree"
                            },
                            {
                                "title": "temperature superior than 10 degree",
                                "description": "This trigger when the temperature of the city is superior than 10 degree"
                            }
                        ],
                    },
                ]
            }
        };
    }
    res.json(about(req.socket.remoteAddress));
});

module.exports = router;