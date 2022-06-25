import { Client, CommandInteraction } from "discord.js";
import { Command } from "src/Command";

export const Invite: Command = {
    run: function (client: Client, interaction: CommandInteraction): void {
        interaction.followUp({
            ephemeral: true,
            content: "Get this bot now: " + client.generateInvite({scopes: ["applications.commands", "bot"], permissions: ["ATTACH_FILES", "SEND_MESSAGES", "VIEW_CHANNEL"]})
        })
    },
    description: "Get this cool bot on your own discord",
    name: "invite"
}