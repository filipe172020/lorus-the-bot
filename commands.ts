import { REST, Routes, SlashCommandBuilder } from "discord.js";
import * as dotenv from "dotenv";
dotenv.config();

const commands = [
  new SlashCommandBuilder()
    .setName("chat")
    .setDescription("Fale com o bot")
    .addStringOption(option =>
      option.setName("mensagem")
            .setDescription("O que você quer dizer ao bot")
            .setRequired(true)
    )
].map(command => command.toJSON());

const token = process.env.DISCORD_BOT_TOKEN;
if (!token) {
    throw new Error("O token do bot não está definido nas variáveis de ambiente.");
}
const rest = new REST({ version: "10" }).setToken(token);

(async () => {
  try {
    console.log("Atualizando comandos slash...");
    await rest.put(
      Routes.applicationCommands("1419835724748034149"),
      { body: commands }
    );
    console.log("Comandos atualizados!");
  } catch (err) {
    console.error(err);
  }
})();
