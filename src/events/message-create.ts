import { client } from "../client";
import { generateResponse } from "../services/aiService";

client.on("messageCreate", async (message) => {
    if (message.author.bot) return;

    try {
        const responseIA = await generateResponse(message.content);
        await message.channel.send(responseIA);
    } catch (err) {
        console.log("Erro ao gerar resposta:", err);
        await message.channel.send("Desculpe, ocorreu um erro ao tentar gerar uma resposta.");
    }
});