from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import openai
import os

from dotenv import load_dotenv


load_dotenv()

# Initialize FastAPI app
app = FastAPI()

# Set up CORS middleware so the frontend can make requests.
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, restrict this to your frontend domains.
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Set your OpenAI API key from environment variable.
openai.api_key = os.getenv("OPENAI_API_KEY")
if openai.api_key is None:
    raise ValueError("OPENAI_API_KEY environment variable is not set.")

client = openai.OpenAI(api_key=os.getenv("OPENAI_API_KEY"), base_url="https://api.deepseek.com/v1")
# Input model using Pydantic
class ChatRequest(BaseModel):
    messages: list  # This should be a list of dicts, e.g. [{"role": "system", "content": "..."}, ...]

@app.get("/")
def root():
    return {"message": "Welcome to the FastAPI service that integrates with OpenAI"}

@app.post("/chat")
async def chat_endpoint(request: ChatRequest):
    """
    Receives a list of conversation messages, calls OpenAI ChatCompletion API, and returns a reply.
    """
    try:
        
        
        response = client.chat.completions.create(
                    model="deepseek-chat",
                    messages=request.messages,
                    stream=False
                    )
        
        # Call the OpenAI ChatCompletion API
        #response = openai.ChatCompletion.create(
        #    model="gpt-3.5-turbo",  # or another model you prefer
        #    messages=request.messages,
        #    temperature=0.7
        #)

        print(response)
        
        # Extract the assistant's reply from the response.
        reply = response.choices[0].message.content.strip()
        return {"reply": reply}
    except Exception as e:
        # In case of an error, return a 500 with the error message.
        print(e)
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)