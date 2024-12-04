//Use the Azure OpenAI API to send user queries and retrieve responses from the AI model.
const axios = require('axios');

const OPENAI_API_KEY = '<Your Azure OpenAI API Key>';
const OPENAI_ENDPOINT = '<Your Azure OpenAI Endpoint>';

async function getOpenAIResponse(query) {
    try {
        const response = await axios.post(
            `${OPENAI_ENDPOINT}/openai/deployments/<Deployment Name>/completions`,
            {
                prompt: `Answer this airline policy query: ${query}`,
                max_tokens: 150,
                temperature: 0.7,
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                    'api-key': OPENAI_API_KEY,
                },
            }
        );
        return response.data.choices[0].text.trim();
    } catch (error) {
        console.error('Error connecting to Azure OpenAI:', error);
        throw error;
    }
}
