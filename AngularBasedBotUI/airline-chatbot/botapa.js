import OpenAI from "openai";
const openai = new OpenAI({apiKey: "3b1aac713e2430c5", baseURL: "https://hexavarsity-secureapi.azurewebsites.net/api/azureai"});
async function main() {
    try {
        const completion = await openai.chat.completions.create({
            messages: [
                { role: "system", content: "You are an airline information assistant. Provide accurate and helpful information related to flight status, booking details, baggage policies, and other airline-related inquiries." },
                { role: "user", content: "Hello" }
            ],
            model: "gpt-4o", // Ensure this is the correct model name
            temperature: 0.7,
            max_tokens: 256,
            top_p: 0.6,
            frequency_penalty: 0.7
        });
        console.log(completion);
    } catch (error) {
        console.error("Error:", error);
    }
}

main();