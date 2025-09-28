export async function generateResponse(prompt: string): Promise<string> {
    try {
        const response = await fetch("https://api.aimlapi.com/v1/chat/completions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${process.env.AIMLAPI_KEY}`
            },
            body: JSON.stringify({
                model: "gpt-3.5-turbo",
                messages: [
                    { role: "system", content: "Você é o Lorus, um bot do Discord engraçado, sarcástico e techy. Faça piadas e interaja de forma divertida, não tenha medo de xingar ninguém." },
                    { role: "user", content: prompt }
                ],
                temperature: 1.1,
                max_token: 150,
            })
        });

        if (!response.ok) {
            console.error("Erro na resposta da AimlAPI:", await response.text());
            return "Desculpe, parece que houve um problema ao gerar a resposta.";
        }

        const data = await response.json();
        const content = data.choices?.[0]?.message?.content;
        return content ?? "Resposta vazia da IA";
    } catch (err) {
        console.error("Erro ao chamar AimlAPI:", err);
        return "Desculpe, parece que a IA está indisponível no momento.";
    }
}