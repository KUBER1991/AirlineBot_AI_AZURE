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
client = AzureOpenAI(
    api_key=AZURE_OPENAI_API_KEY,
    api_base=AZURE_OPENAI_ENDPOINT,
    api_version=OPENAI_API_VERSION
)

# Create a chat completion
res = client.chat.completions.create(
    model="gpt-4o-mini",  # Allowed values for Api:User  gpt-4o, gpt-4o-mini
    messages=[
        {"role": "system", "content": "You are a helpful assistant"},
        {"role": "user", "content": "Hello AI"}
    ],
    temperature=0.7,
    max_tokens=256,
    top_p=0.6,
    frequency_penalty=0.7
)
  # Print the response
print("Response from Azure OpenAI:")
print(res)

# Create embeddings
try:
    res = client.embeddings.create(
        model="text-embedding-ada-002",  # Allowed values for Api:User  text-embedding-ada-002
        input="The food was delicious and the waiter...",  # Input text for embedding
        encoding_format="float"  # Specify the encoding format
    )

    # Print the response
    print("Embeddings Response:")
    print(res)

except Exception as e:
    print(f"An error occurred: {e}")


    # Create a fine-tuning job
try:
    res = client.fine_tuning.jobs.create(
        training_file="file-abc123",  # The ID of the training file
        model="gpt-35-turbo-16k"       # Allowed values for Api::User  gpt-35-turbo-16k
    )

    # Print the response
    print("Fine-tuning Job Response:")
    print(res)

except Exception as e:
    print(f"An error occurred: {e}")