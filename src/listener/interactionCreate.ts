import { BaseCommandInteraction, Client, CommandInteraction, Interaction } from "discord.js";
import { Commands } from "../Commands";

export default(client: Client): void => {
    client.on("interactionCreate", async (interaction: Interaction) => {
        if(interaction.isCommand()) {
            handleSlashCommand(client, interaction);
        }
    });
}

const handleSlashCommand = async (client: Client, interaction: CommandInteraction): Promise<void> => {
    const command = Commands.find(c => c.name == interaction.commandName);

    if(!command) {
        interaction.followUp({ content: "Sorry bruvv, but i've failed you.", ephemeral: true});
    }

    await interaction.deferReply();

    command?.run(client, interaction);
}