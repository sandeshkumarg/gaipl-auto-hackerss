from fastapi import FastAPI, HTTPException, Request
import openai
import os
from dotenv import load_dotenv


load_dotenv()

# Load OpenAI API key from environment variable
openai.api_key = os.getenv("OPENAI_API_KEY")
if not openai.api_key:
    raise ValueError("The OPENAI_API_KEY environment variable is not set.")


app = FastAPI()

@app.get("/")
def root():
    return {"message": "Welcome to the FastAPI service that integrates with OpenAI"}

@app.post("/completions")
async def create_completion(request: Request):
    try:
        # Ensure that we're getting a JSON payload
        data = await request.json()
    except Exception:
        raise HTTPException(status_code=400, detail="Invalid JSON data.")

    prompt = data.get("prompt")
    if not prompt:
        raise HTTPException(status_code=400, detail="Field 'prompt' is required in the JSON body.")

    try:
        # Call the OpenAI Completion API
        response = openai.Completion.create(
            engine="deepseek-chat",  # You can change this to the engine you prefer
            prompt=prompt,
            max_tokens=100,
            temperature=0.7,
        )
        # Extract and clean the text response from OpenAI
        completion_text = response.choices[0].text.strip()
        return {"completion": completion_text}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))