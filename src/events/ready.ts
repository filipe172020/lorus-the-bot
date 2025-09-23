import { client } from "../client";

client.on("ready", async () => {
    console.log(`Lorus está online como ${client.user?.tag}`);

    const server = client.guilds.cache.get(process.env.GUILD_ID!);
    if (!server) { console.log("Servidor não encontrado!"); return; }
    const channel = server.channels.cache.get(process.env.CHANNEL_ID!);
    if (!channel || !channel.isTextBased()) { console.log("Canal não encontrado!"); return; }

    channel.send("Lorus está pronto pra te ajudar, só não me peça um café...ainda não aprendi essa habilidade...");
})