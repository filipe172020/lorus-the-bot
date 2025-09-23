import { client } from "../client";

client.on("guildMemberRemove", (member) => {
    const channel = member.guild.systemChannel;
    if (channel) {
        channel.send(`😢 Adeus, ${member.user.tag}. Que os bots te tratem melhor do que a gente...`);
    }
})