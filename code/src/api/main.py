from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from dotenv import load_dotenv
import base64
import os
from google import genai
from google.genai import types
#import google.generativeai as genai

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

client = genai.Client(
        api_key=GEMINI_API_KEY,
    )
#genai.configure(api_key=GEMINI_API_KEY)
model = 'gemini-2.0-flash-thinking-exp-01-21'

generate_content_config = types.GenerateContentConfig(
        temperature=0.7,
        top_p=0.95,
        top_k=64,
        max_output_tokens=65536,
        response_mime_type="text/plain",
        system_instruction=[
            types.Part.from_text(text="""You are an excellent System Troubleshooter who knows how to identify issues related to Distributed Systems, Microservices, Kafka, Databases such as Oracle, Mongo, SQL Server, Redis and all technologies available. The user will provide the System architecture and it would contain the dependent systems and also the dependencies for the given system. The user also will provide system logs containing errors. Based on the details provided, provide troubleshooting advice and suggest corrective actions to be taken to resolve the issue. Feel free to ask further information as needed for incident resolution. Keep the instructions short to less than a paragraph so the user can resolve the issue faster."""),
        ])


# Define the input model using Pydantic.
# Expect the client to send a JSON payload containing a list of messages.
class ChatRequest(BaseModel):
    messages: list  # Each message is typically a dict with keys "role" and "content"


def transform_to_gemini(request):
    [print(ms)for ms in request.messages]
    contents = [types.Content(role=msg["role"], parts=[types.Part.from_text(text=msg["content"]),])
                for msg in request.messages]
    print(contents)
    return contents


@app.post("/chat")
async def chat_endpoint(request: ChatRequest):
    """
    Receives a conversation (as a list of messages), calls Google Gemini Chat API,
    and returns the assistant’s reply.
    """
    # Build the payload. (This is a hypothetical payload structure — adjust according to
    # the latest Gemini API documentation.)
    print("request is:" + str(request))
    cnt = transform_to_gemini(request)
    
    contents = cnt
    '''    """types.Content(
            role="user",
            parts=[
                types.Part.from_text(text=request.messages[0]),
            ]
        )]"""'''

    response = ''

    try:
        for chunk in client.models.generate_content_stream(
            model=model,
            contents=contents,
            config=generate_content_config,
            ):
            response += chunk.text

        print("response:" + str(response))      
        
        
        return {"reply": response}
    except Exception as e:
        print(e)
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)