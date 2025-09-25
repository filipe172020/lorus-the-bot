import { client } from "../client";

process.on("SIGINT", async () => {
    console.log("👋 Bot sendo desligado (Ctrl+C detectado).");
    await sendShutdownMessage();
    process.exit(0);
});

export async function sendShutdownMessage() {
    try {
        const server = client.guilds.cache.get(process.env.GUILD_ID!);
        if (!server) return;
        const channel = server.channels.cache.get(process.env.CHANNEL_ID!);
        if (!channel || !channel.isTextBased()) return;

        await channel.send("💤 Lorus está indo descansar... volto logo!");
    } catch (err) {
        console.error("Erro ao enviar mensagem de despedida:", err);
    }
}