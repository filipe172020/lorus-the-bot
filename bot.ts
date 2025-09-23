import { Client, GatewayIntentBits } from 'discord.js';
import OpenAI from 'openai';
import * as dotenv from 'dotenv';
dotenv.config();

process.on("unhandledRejection", (reason, promise) => {
    console.error("💥 Unhandled Rejection:", reason);
});

process.on("uncaughtException", (err) => {
    console.error("💥 Uncaught Exception:", err);
});

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

const client = new Client({
    intents:
        [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent]
});

async function generateResponse(prompt: string) {
    const response = await openai.chat.completions.create({
        model: 'gpt-4o-mini',
        messages: [{ role: 'user', content: prompt }],
    });
    return response.choices?.[0]?.message?.content ?? 'Desculpe, não consegui gerar uma resposta.';
}

client.on("ready", () => {
    console.log(`Lorus está online como ${client.user?.tag}`);
})

client.on("interactionCreate", async interaction => {
    if (!interaction.isChatInputCommand()) return;

    if (interaction.commandName === "chat") {
        const mensagem = interaction.options.getString("mensagem")!;
        const respostaIA = await generateResponse(mensagem);
        await interaction.reply(respostaIA);
    }
});

client.on("messageCreate", async (message) => {
    if (message.author.bot) return;

    // if (message.content.includes("lorus")) {
    //     message.channel.send("Sim, em que posso ajudar?");
    //     return;
    // } else if (message.content.includes("ta ai?")) {
    //     message.channel.send("fala dai, chefe");
    //     return;
    // } else if (message.content.includes("kkkkkk")) {
    //     message.channel.send("KKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKK");
    //     return;
    // }

    try {
        const responseIA = await generateResponse(message.content);
        await message.channel.send(responseIA);
    } catch (err) {
        console.log("Erro ao gerar resposta:", err);
        await message.channel.send("Desculpe, ocorreu um erro ao tentar gerar uma resposta.");
    }
});

client.login(process.env.DISCORD_BOT_TOKEN);