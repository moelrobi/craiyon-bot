import { Command } from "./Command";
import { Craiyon } from "./commands/craiyon";
import { Invite } from "./commands/invite";
import { Ping } from "./commands/ping";

export const Commands: Command[] = [Ping, Invite, Craiyon];