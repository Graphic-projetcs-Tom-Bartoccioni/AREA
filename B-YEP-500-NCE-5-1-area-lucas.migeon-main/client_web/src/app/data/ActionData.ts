import { ActionReactionData } from "../types/ActionReactionData"

export class ActionData {
    private discordAction: ActionReactionData[] = [
        {
            id: 1,
            title: "New pinned message in channel",
            description: "This trigger fires when a new message is pinned in a channel you select."
        },
        {
            id: 2,
            title: "New message in channel",
            description: "This trigger fires when a new message is pinned in a channel you select."
        },
    ]
    private youtubeAction = [
        {
            id: 1,
            title: "New subscription",
            description: "This trigger fires when you have a new subscriber."
        },
    ]
    private timerAction = [
        {
            id: 1,
            title: "Every minute",
            description: "This trigger fires every minute"
        },
    ]
    private githubAction = [
        {
            id: 1,
            title: "Any new commit",
            description: "This trigger fires every time a new commit in a repo is created on Github."
        },
        {
            id: 2,
            title: "Any new push",
            description: "This trigger fires every time a person push on a Github repository."
        }
    ]
    private weatherAction = [
        {
            id: 1,
            title: "Nice temperature is lesser than 10 degree",
            description: "This trigger when the temperature of Nice is less than 10 degree"
        },
        {
            id: 2,
            title: "Nice temperature is superior than 10 degree",
            description: "This trigger when the temperature of Nice is superior than 10 degree"
        }
    ]
    private randomUserAction= [
      {
        id: 1,
        title: "Create a random user",
        description: "This trigger when a new random user has been created"
      }
    ]

    public getDiscordAction() {
        return this.discordAction;
    }

    public getYoutubeAction() {
        return this.youtubeAction;
    }

    public getTimerAction() {
        return this.timerAction;
    }

    public getGithubAction() {
        return this.githubAction;
    }

    public getWeatherAction() {
        return this.weatherAction;
    }

    public getRandomUserAction() {
        return this.randomUserAction;
    }
}
