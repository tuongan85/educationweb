from openai import OpenAI
from decouple import config
client = OpenAI(
    # This is the default and can be omitted
    api_key=config('API_KEY'),
)

chat_completion = client.chat.completions.create(
    messages=[
        {
            "role": "user",
            "content": "Say this is a test",
        }
    ],
    model="gpt-3.5-turbo",
)