export async function TodayScores(league: string): Promise<string[]> {
    const today = new Date().toLocaleDateString("en-CA", { timeZone: "America/Sao_Paulo" });
    const apiKey = process.env.THE_SPORTS_TOKEN;

    const url = `https://www.thesportsdb.com/api/v1/json/${apiKey}/searchevents.php?d=${today}&l=${league}`;
    console.log("🔍 URL chamada:", url); // VERIFICAR URL

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Erro na resposta da API de esportes: ${response.status}`);
        }

        const data = await response.json();
        if (!data || !data.events) {
            return ["Nenhum jogo encontrado para hoje!"];
        }

        return data.events.map(
            (event: any) => `${event.strEvent} - ${event.intHomeScore ?? 0} x ${event.intAwayScore}`
        );

    } catch (error) {
        console.error("Erro ao buscar dados do jogo", error);
        return ["Desculpe, não consegui buscar os dados dos jogos que você pediu, parece que algo deu errado aqui ☹️"];
    }
}