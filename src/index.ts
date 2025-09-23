import "dotenv/config";
import { client } from "./client";

import "./events/ready";
import "./events/message-create";
import "./events/member-added";
import "./events/member-remove";
import "./events/int";

// login do bot
client.login(process.env.DISCORD_BOT_TOKEN);
