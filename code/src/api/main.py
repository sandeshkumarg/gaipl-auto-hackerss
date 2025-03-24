from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from dotenv import load_dotenv
import base64
import os
from google import genai
from google.genai import types
from langchain_google_genai import ChatGoogleGenerativeAI

import os
import requests

load_dotenv()


# Initialize FastAPI app
app = FastAPI()

# Enable CORS so that your frontend can call this API.
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, restrict this to your frontend domain(s)
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Retrieve your Google Gemini API key from environment variables.
GEMINI_API_KEY = os.getenv("GOOGLE_GEMINI_API_KEY")
if GEMINI_API_KEY is None:
    raise ValueError("GOOGLE_GEMINI_API_KEY environment variable is not set.")


# Define the input model using Pydantic.
# Expect the client to send a JSON payload containing a list of messages.
class ChatRequest(BaseModel):
    messages: list  # Each message is typically a dict with keys "role" and "content"

def transform(request):
    contents = [(msg["role"], msg["content"])
                for msg in request.messages]
    print(contents)
    return contents


@app.post("/chat")
async def chat_endpoint(request: ChatRequest):
    """
    Receives a conversation (as a list of messages), calls Google Gemini Chat API,
    and returns the assistant’s reply.
    """

    llm = ChatGoogleGenerativeAI(model="gemini-2.0-flash-thinking-exp-01-21",
                             temperature=0.7,
            max_tokens=None,
            timeout=None,
            max_retries=2,
            # other params...
        )
    
    try:

        chats = transform(request)
        result = llm.invoke(chats)

        print(result)
        return {"reply": result.content}
    
    except Exception as e:
        print(e)
        raise HTTPException(status_code=500, detail=str(e))



if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)