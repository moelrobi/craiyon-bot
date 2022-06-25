import { Client, BaseCommandInteraction, MessageEmbed } from "discord.js";
import { Command } from "../Command";

export const Ping: Command = {
    name: "ping",
    type: "CHAT_INPUT",
    run: function (client: Client, interaction: BaseCommandInteraction): void {
        interaction.followUp({
            ephemeral: true,
            content: "Pong!"
        });
    },
    description: "A simple ping pong command."
}