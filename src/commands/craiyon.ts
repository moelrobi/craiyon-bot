import { Client, CommandInteraction, MessageEmbed, MessageAttachment } from "discord.js";
import { Command } from "../Command";
import axios from "axios";
import config from "../config.json";

export const Craiyon: Command = {
    run: function (client: Client, interaction: CommandInteraction): void {
        const input = interaction.options.getString("input");

        if(!input) {
            interaction.followUp("Your input was invalid, i am sorry. :(");
            return;
        }

        let start = Date.now();

        console.log("Started processing prompt %s from %s in %s", input, interaction.user.tag, interaction.channel?.id);

        axios.post(config["craiyon-backend-url"], {prompt: input})
            .then(value => {
                let end = Date.now();
                let resultTime = end - start;

                console.log("Finish processing prompt %s from %s in %s | Took %d ms", input, interaction.user.tag, interaction.channel?.id, resultTime);

                const array: Array<string> = value.data.images;

                const embed = new MessageEmbed()
                    .setTitle("Images created!")
                    .setDescription("Craiyon took " + resultTime + " ms to process the request: " + input)
                    .setAuthor({
                        name: interaction.user.username,
                        iconURL: interaction.user.displayAvatarURL()
                    }).setColor("AQUA")
                    .setFooter({
                        text: "Created using Craiyon Version: " + value.data.version + " | Made with Love by Spades#4200",
                        iconURL: client.user?.displayAvatarURL()
                    }).setURL("https://craiyon.com");

                let imageArray: Array<MessageAttachment> = [];

                array.forEach(element => {
                    let buffer: Buffer = Buffer.from(element, 'base64');
                    imageArray.push(new MessageAttachment(buffer));
                })

                interaction.followUp({content: "Hey <@" + interaction.user.id + ">, your request " + input + " finished!",embeds: [embed], files: imageArray});
            })
            .catch(error => {
                interaction.followUp("The Generation failed.. I am sorry.");
                console.error("Generation request with prompt %s for %s, failed with StatusCode %d", input, interaction.user.tag, error.response.status);
                console.error(error);
            })
    },
    description: "Ask the bot to generate images from any prompt!",
    name: "craiyon",
    options: [
        {name: "input", description: "The legendary prompt, you will think of something", type: "STRING", required: true}
    ]
}