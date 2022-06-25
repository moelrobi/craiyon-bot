import { Client } from "discord.js";
import interactionCreate from "./listener/interactionCreate";
import ready from "./listener/ready";
import config from "./config.json";

console.log("Bot booting up!");

const client = new Client({intents: []});

ready(client);
interactionCreate(client);

client.login(config["discord-token"]);