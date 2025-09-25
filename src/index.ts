import "dotenv/config";
import { client } from "./client";

// eventos
import "./events/ready";
import "./events/message-create";
import "./events/member-added";
import "./events/member-remove";
import "./events/interaction-create";

// utils
import { sendShutdownMessage } from "./utils/shutdown";
import "./utils/wait";

// comandos de barra
import "./commands/chat";

// handlers de erro
import "./error/errorHandler";

process.on("SIGINT", async () => {
    console.log("👋 Bot sendo desligado (Ctrl+C detectado).");
    await sendShutdownMessage();
    process.exit(0);
});

client.login(process.env.DISCORD_BOT_TOKEN);
