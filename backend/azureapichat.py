from openai import AzureOpenAI
from dotenv import load_dotenv
import os

# Load environment variables from a .env file
load_dotenv()

# Get the OpenAI API version from environment variables
OPENAI_API_VERSION = os.getenv("OPENAI_API_VERSION")

# For app user: you need to pass the version configured by the admin
AZURE_OPENAI_ENDPOINT = os.getenv("AZURE_OPENAI_ENDPOINT")  # Eg: {BASE_URL}/api/azureai
AZURE_OPENAI_API_KEY = os.getenv("AZURE_OPENAI_API_KEY")  # For App User: use the app-registration key along with the app configuration unique key name eg. app123key-configName, For Api User: Substitute the key generated from Key Config Panel

# Create an instance of the AzureOpenAI client
client = AzureOpenAI()
# Create a chat completion
res = client.chat.completions.create(
    model="gpt-4o",  # Allowed values for Api:User  gpt-4o, gpt-4o-mini
    messages=[
        {"role": "system", "content": "You are a AI assistant"},
        {"role": "user", "content": "what is the LLM?"}
    ],
    temperature=0.7,
    max_tokens=256,
    top_p=0.6,
    frequency_penalty=0.7
)
# Print the response
print("Response from Azure OpenAI:")
print(res)
print("-----------------------------------------")
print(res.choices[0].message.content)