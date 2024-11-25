//Update the bot’s message handler to forward user queries to the backend with Azure OpenAI integration.
const { ActivityHandler } = require('botbuilder');
const { getOpenAIResponse } = require('./openai-backend'); // Import OpenAI logic

class PolicyBot extends ActivityHandler {
    constructor() {
        super();
        this.onMessage(async (context, next) => {
            const userQuery = context.activity.text;
            const openAIResponse = await getOpenAIResponse(userQuery);
            await context.sendActivity(openAIResponse);
            await next();
        });
    }
}

module.exports.PolicyBot = PolicyBot;
