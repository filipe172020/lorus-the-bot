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
        [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent, GatewayIntentBits.GuildPresences, GatewayIntentBits.GuildMembers]
});

async function generateResponse(prompt: string) {
    const response = await openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'user', content: prompt }],
    });
    return response.choices?.[0]?.message?.content ?? 'Desculpe, não consegui gerar uma resposta.';
}

client.on("ready", async () => {
    console.log(`Lorus está online como ${client.user?.tag}`);

    const server = client.guilds.cache.get(process.env.GUILD_ID!);
    if (!server) { console.log("Servidor não encontrado!"); return; }
    const channel = server.channels.cache.get(process.env.CHANNEL_ID!);
    if (!channel || !channel.isTextBased()) { console.log("Canal não encontrado!"); return; }

    channel.send("Lorus está pronto pra te ajudar, só não me peça um café...ainda não aprendi essa habilidade...");
})

client.on("interactionCreate", async interaction => {
    if (!interaction.isChatInputCommand()) return;

    if (interaction.commandName === "chat") {
        const mensagem = interaction.options.getString("mensagem")!;
        const respostaIA = await generateResponse(mensagem);
        await interaction.reply(respostaIA);
    }
});

client.on("guildMemberAdd", (member) => {
    const channel = member.guild.systemChannel;
    if (channel) {
        channel.send(`🎉 Bem-vindo(a)! ${member.user.tag}...não aceite bala de estranhos em...tipo esses caras aqui`);
    }
});

client.on("guildMemberRemove", (member) => {
    const channel = member.guild.systemChannel;
    if (channel) {
        channel.send(`😢 Adeus, ${member.user.tag}. Que os bots te tratem melhor do que a gente...`);
    }
})

client.on("messageCreate", async (message) => {
    if (message.author.bot) return;

    function wait(ms: number) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    // if (message.content.includes("lorus")) {
    //     await message.channel.sendTyping();
    //     await wait(500);
    //     message.channel.send(`Opa, ${message.author}! Qual a boa de hoje?`);
    //     return;
    // } else if (message.content.includes("conta uma piada")) {
    //     await message.channel.sendTyping();
    //     await wait(2000);
    //     message.channel.send("você sabia que o Batman não usa relógio? Porque ele é o Bat-móvel!");
    //     return;
    // } else if (message.content.includes("kkkkkk")) {
    //     await message.channel.sendTyping();
    //     await wait(500);
    //     message.channel.send("KKKKKKKKKKKKKKKKKKKKKKKKK");
    //     return;
    // } else if (message.content.includes("quem é o membro mais bonito do grupo?")) {
    //     await message.channel.sendTyping();
    //     await wait(2000);
    //     message.channel.send("É Você, claro! 😍");
    //     return;
    // } else if (message.content.includes("sobrou alguma coisa?")) {
    //     await message.channel.sendTyping();
    //     await wait(1500);
    //     message.channel.send("Pro beta não sobra nada...nem o osso!");
    //     return;
    // } else if (message.content.includes("you can hear me?")) {
    //     await message.channel.sendTyping();
    //     await wait(1000);
    //     message.channel.send("Yes, I can hear you loud and clear! How can I assist you today?");
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