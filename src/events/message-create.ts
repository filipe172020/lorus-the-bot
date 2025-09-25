import { client } from "../client";
import { generateResponse } from "../services/aiService";
import { TodayScores } from "../services/sportsService";
import { detectLeague } from "../utils/detect-league";

client.on("messageCreate", async (message) => {
    if (message.author.bot) return;

    if (!message.mentions.has(client.user!)) return;
    const prompt = message.content.replace(`<@${client.user!.id}>`, "").trim();

    // comando para buscar placar da liga hoje
    const league = detectLeague(message.content);
    if (league) {
        try {
            const scores = await TodayScores(league);
            if (scores && scores.length > 0) {
                message.channel.send(scores.join("\n"));
            } else {
                console.error("Nenhum placar encontrado para a liga:", league);
            }
        } catch (error) {
            console.error("Erro ao buscar placares:", error);
            message.channel.send("Desculpe, ocorreu um erro ao tentar buscar os placares.");
        }
    }

    try {
        await message.channel.sendTyping();
        const responseIA = await generateResponse(prompt || "Oi!");
        await message.channel.send(responseIA);
    } catch (err) {
        console.log("Erro ao gerar resposta:", err);
        await message.channel.send("Desculpe, ocorreu um erro ao tentar gerar uma resposta.");
    }
});