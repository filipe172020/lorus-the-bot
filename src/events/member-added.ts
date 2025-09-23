import { client } from "../client";

client.on("guildMemberAdd", (member) => {
    const channel = member.guild.systemChannel;
    if (channel) {
        channel.send(`🎉 Bem-vindo(a)! ${member.user.tag}...não aceite bala de estranhos em...tipo esses caras aqui`);
    }
});