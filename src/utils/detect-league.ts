export function detectLeague(messageContent: string): string | void {
    const lowerContent = messageContent.toLowerCase();
    const leagues: { [key: string]: string[] } = {
        "English_Premier_League": ["premier league", "inglaterra", "inglês", "championship england"],
        "La_Liga": ["la liga", "espanha", "liga espanhola", "primera division"],
        "Serie_A": ["serie a", "italia", "italiano", "liga italiana"],
        "Bundesliga": ["bundesliga", "alemanha", "liga alemã"],
        "Ligue_1": ["ligue 1", "frança", "liga francesa"],
        "UEFA_Champions_League": ["champions league", "uefa", "liga dos campeões", "liga dos campeoes"],
        "Brazil_Serie_A": ["brasileirao", "brasileirão", "serie a brasil", "brasileiro", "brasileirao serie a"],
        "MLS": ["mls", "major league soccer", "liga americana"],
        "Primeira_Liga": ["primeira liga", "portugal", "liga portuguesa"],
        "Eredivisie": ["eredivisie", "holanda", "liga holandesa"],
        "Liga_MX": ["liga mx", "mexico", "liga mexicana", "méxico"],
        "AFC_Champions_League": ["afc champions league", "liga asiática", "asia", "liga da ásia"],
    };

    for (const league in leagues) {
        for (const alias of leagues[league]) {
            if (lowerContent.includes(alias)) {
                return league;
            }
        }
    }

    return;
} 