import { client } from "../client";
import { generateResponse } from "../services/aiService";
import { TodayScores } from "../services/sportsService";
import { detectLeague } from "../utils/detect-league";

import { saveMemory, getLastMemories, setCache, getCache } from "../services/dbService";

client.on("messageCreate", async (message) => {
    if (message.author.bot) return;
    if (!message.mentions.has(client.user!)) return;
    const prompt = message.content.replace(`<@${client.user!.id}>`, "").trim();

    const league = detectLeague(message.content);
    if (league) {
        try {
            const cacheKey = `scores_${league}`;
            let scores = await getCache(cacheKey);

            if (!scores) {
                const scoresArr = await TodayScores(league);
                scores = scoresArr.join("\n");
                await setCache(cacheKey, scores, 3600);
            }

            await message.channel.send(scores);
        } catch (error) {
            console.error("Erro ao buscar placares:", error);
            message.channel.send("Desculpe, ocorreu um erro ao tentar buscar os placares.");
        }
    }

    await saveMemory(message.author.id, message.content);
    const memories = await getLastMemories(message.author.id, 5);
    const context = memories.map(m => m.content).reverse().join("\n");

    try {
        await message.channel.sendTyping();
        const responseIA = await generateResponse(`${context}\nUsuário: ${prompt}`);
        await message.channel.send(responseIA);
    } catch (err) {
        console.log("Erro ao gerar resposta:", err);
        await message.channel.send("Desculpe, ocorreu um erro ao tentar gerar uma resposta.");
    }
});
