import { Client } from "discord.js";
import { ActivityTypes } from "discord.js/typings/enums";
import { Commands } from "../Commands";

export default(client: Client): void => {
    client.on("ready", async() => {
        if(!client.user || !client.application) {
            return;
        }

        await client.application.commands.set(Commands);
        client.user.setActivity({
            name: "all your drawings",
            type: ActivityTypes.WATCHING
        })

        console.log("Started Bot on account: ", client.user.tag);
    })
}