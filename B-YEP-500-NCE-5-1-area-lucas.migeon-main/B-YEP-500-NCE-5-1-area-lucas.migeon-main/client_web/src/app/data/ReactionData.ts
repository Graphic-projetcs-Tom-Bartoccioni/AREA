import { ActionReactionData } from "../types/ActionReactionData";

export class ReactionData {
    private discordReaction: ActionReactionData[] = [
        {
            id: 1,
            title: "Post a message to a channel",
            description: "This action will send a message with your discord bot to the channel you specify."
        },
        {
            id: 2,
            title: "React with an emote",
            description: "React with an emote to a specific message"
        },
        {
          id: 3,
          title: "Reply to message",
          description: "Reply to the message of an user"
      }
    ]

    public getDiscordReaction() {
        return this.discordReaction;
    }
}
