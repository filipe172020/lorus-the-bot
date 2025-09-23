import { client } from "../client";
import { generateResponse } from "../services/aiService";

client.on("interactionCreate", async interaction => {
    if (!interaction.isChatInputCommand()) return;

    if (interaction.commandName === "chat") {
        const mensagem = interaction.options.getString("mensagem")!;
        const respostaIA = await generateResponse(mensagem);
        await interaction.reply(respostaIA);
    }
});