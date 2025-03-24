from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from dotenv import load_dotenv
import base64
import os
from google import genai
from google.genai import types
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain_core.prompts import ChatPromptTemplate
from fastapi.responses import JSONResponse
from datetime import datetime, timedelta
import json



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
    logs: str
    dependencies: str


class LogsRequest(BaseModel):
    name: str  # Each message is typically a dict with keys "role" and "content"
    platform: str
    deps: str
    start: str
    end: str

class SystemsRequest(BaseModel):
    name: str  # Each message is typically a dict with keys "role" and "content"
    platform: str
    deps: str
    start: str
    end: str

def transform(request):
    contents = [(msg["role"], msg["content"])
                for msg in request.messages]
    print(contents)
    return contents


def clean_and_parse_json(llm_response):
    # Remove the formatting markers like ```json and ```
    cleaned_response = llm_response.strip('```json').strip('```').strip()
    
    try:
        # Parse the cleaned string as JSON
        json_data = json.loads(cleaned_response)
        return json_data
    except json.JSONDecodeError as e:
        print("Failed to parse JSON:", e)
        return None


@app.post("/chat")
async def chat_endpoint(request: ChatRequest):
    """
    Receives a conversation (as a list of messages), calls Google Gemini Chat API,
    and returns the assistant’s reply.
    """

    prompt = ChatPromptTemplate.from_messages(
        [
            (
                "system",
                "You are a System Troubleshooter who knows how to identify issues related to Distributed Systems, Microservices, Kafka, Databases such as Oracle, Mongo, SQL Server, Redis and other technologies available. The user will provide the System architecture and the architecture details would contain the dependent systems and also the dependencies for the given system. The user also will provide system logs containing errors. Based on the details provided, provide troubleshooting steps and suggest corrective actions to be taken to resolve the issue. Feel free to ask further information as needed for incident resolution. Keep the instructions short to less than a paragraph so the user can resolve the issue faster. Try to limit the response to 100 words or less when possible. Goal is to resolve the error as soon as possible with least manual steps. The logs are {logs} and the system dependencies {dependencies}",
            ),
            ("user", "{input}"),
        ]
    )

    llm = ChatGoogleGenerativeAI(model="gemini-2.0-flash-thinking-exp-01-21",
                             temperature=0.7,
            max_tokens=None,
            timeout=None,
            max_retries=2,
            # other params...
        )
    
    try:

        print(request)

        logs = request.logs
        deps = request.dependencies

        chats = transform(request)
        #result = llm.invoke(chats)

        chain = prompt | llm
        result = chain.invoke(
            {
                "logs": logs,
                "dependencies": deps,
                "input": chats,
            }
        )

        print(result.content)
        return {"reply": result.content}
    
    except Exception as e:
        print(e)
        raise HTTPException(status_code=500, detail=str(e))


@app.post("/logs")
async def logs_endpoint(request: LogsRequest):
    """
    Receives a conversation (as a list of messages), calls Google Gemini Chat API,
    and returns the assistant’s reply.
    """

    prompt = ChatPromptTemplate.from_messages(
        [
            (
                "system",
                "You are pretending to be a Log aggregation system such as splunk or elastic search. The user provides the system name, platform details , dependent systems,  start time and end time, generate 50 lines of system logs in the given time duration. Ensure to have a error or two. If the dependent systems are commercial off the shelf software generate some logs including those as well. The system name is {name}, platform details are {platform}, dependencies are {deps}, start time is {start} and end time is {end}. The generated logs should be an array of json objects containing timestamp, severity and message as its property.",
            ),
            ("user", "Generate sample logs"),
        ]
    )

    llm = ChatGoogleGenerativeAI(model="gemini-2.0-flash-thinking-exp-01-21",
                             temperature=0.7,
            max_tokens=None,
            timeout=None,
            max_retries=2,
            # other params...
        )
    
    try:

        print(request)

        

        chain = prompt | llm
        result = chain.invoke(
            {
                "name": request.name,
                "deps": request.deps,
                "platform": request.platform,
                "start": request.start,
                "end": request.end
            }
        )

        parsed_json = clean_and_parse_json(result.content)

        print(parsed_json)

        # Create a JSON response and set cache-control headers
        response = JSONResponse(content=parsed_json)
        

        # Set Cache-Control header for 60 minutes
        response.headers["Cache-Control"] = "public, max-age=3600"
        # Optionally set Expires header (UTC format)
        expires = (datetime.utcnow() + timedelta(minutes=60)).strftime("%a, %d %b %Y %H:%M:%S GMT")
        response.headers["Expires"] = expires


        return response

        return {"reply": result.content}
    
    except Exception as e:
        print(e)
        raise HTTPException(status_code=500, detail=str(e))



@app.post("/systems")
async def systems_endpoint(request: SystemsRequest):
    """
    Receives a conversation (as a list of messages), calls Google Gemini Chat API,
    and returns the assistant’s reply.
    """

    prompt = ChatPromptTemplate.from_messages(
        [
            (
                "system",
                "You are a System Troubleshooter who knows how to identify issues related to Distributed Systems, Microservices, Kafka, Databases such as Oracle, Mongo, SQL Server, Redis and other technologies available. The user will provide the System architecture and the architecture details would contain the dependent systems and also the dependencies for the given system. The user also will provide system logs containing errors. Based on the details provided, provide troubleshooting steps and suggest corrective actions to be taken to resolve the issue. Feel free to ask further information as needed for incident resolution. Keep the instructions short to less than a paragraph so the user can resolve the issue faster. Try to limit the response to 100 words or less when possible. Goal is to resolve the error as soon as possible with least manual steps. The logs are {logs} and the system dependencies {dependencies}",
            ),
            ("user", "{input}"),
        ]
    )

    llm = ChatGoogleGenerativeAI(model="gemini-2.0-flash-thinking-exp-01-21",
                             temperature=0.7,
            max_tokens=None,
            timeout=None,
            max_retries=2,
            # other params...
        )
    
    try:

        print(request)

        logs = request.logs
        deps = request.dependencies

        chats = transform(request)
        #result = llm.invoke(chats)

        chain = prompt | llm
        result = chain.invoke(
            {
                "logs": logs,
                "dependencies": deps,
                "input": chats,
            }
        )

        print(result.content)
        return {"reply": result.content}
    
    except Exception as e:
        print(e)
        raise HTTPException(status_code=500, detail=str(e))




if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)