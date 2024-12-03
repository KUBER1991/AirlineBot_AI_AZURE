  
      const { AzureOpenAI } = require("openai");  
      const dotenv = require("dotenv");  
        
      dotenv.config();  
        
      async function main() {  
        // You will need to set these environment variables or edit the following values
        const endpoint = process.env["AZURE_OPENAI_ENDPOINT"] || "https://jaysw-m44hiiaq-swedencentral.openai.azure.com/";  
        const apiKey = process.env["AZURE_OPENAI_API_KEY"] || "";  
        const apiVersion = "2024-05-01-preview";  
        const deployment = "gpt-4"; // This must match your deployment name
        
        const client = new AzureOpenAI({ endpoint, apiKey, apiVersion, deployment });  
        
        const result = await client.chat.completions.create({  
          messages: [  
            { role: "system", content: "You are an AI assistant that helps people find information." }  
          ],  
          past_messages: 10,  
          max_tokens: 800,  
          temperature: 0.7,  
          top_p: 0.95,  
          frequency_penalty: 0,  
          presence_penalty: 0,  
          stop: null  
        });  
        
        for (const choice of result.choices) {  
          console.log(choice.message);  
        }  
      }  
        
      main().catch((err) => {  
        console.error("The sample encountered an error:", err);  
      });  
        
      module.exports = { main };