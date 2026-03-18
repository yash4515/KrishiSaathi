const OPENAI_API_KEY = "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";

export const sendMessageToOpenAI = async (messagesHistory) => {
    try {
        // Formatting messages for OpenAI API
        const formattedMessages = [
            { role: "system", content: "You are KrishiSaathi, a helpful and knowledgeable agricultural assistant designed to help farmers in India. You provide advice on crop management, farming techniques, weather, current market prices of crops, government agricultural schemes and insurance. Keep your answers concise, practical, and friendly." },
            ...messagesHistory.map(msg => ({
                role: msg.sender === 'user' || msg.type === 'user' ? 'user' : 'assistant',
                content: msg.text
            }))
        ];

        const response = await fetch("https://api.openai.com/v1/chat/completions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${OPENAI_API_KEY}`
            },
            body: JSON.stringify({
                model: "gpt-3.5-turbo",
                messages: formattedMessages,
                temperature: 0.7,
            })
        });

        if (!response.ok) {
            console.error("OpenAI API Error:", response.status, response.statusText);
            throw new Error(`API returned ${response.status}`);
        }

        const data = await response.json();
        return data.choices[0].message.content;
    } catch (error) {
        console.error("Error communicating with OpenAI:", error);
        return "Sorry, I am having trouble connecting right now. Please try again later.";
    }
};
