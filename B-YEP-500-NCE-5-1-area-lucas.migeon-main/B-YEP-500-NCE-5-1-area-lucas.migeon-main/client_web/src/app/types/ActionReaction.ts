import { ActionReactionData } from "./ActionReactionData";

export interface ActionReaction {
    title: string;
    actionService: string;
    action: ActionReactionData;
    reactionService: string;
    reaction: ActionReactionData;
}
