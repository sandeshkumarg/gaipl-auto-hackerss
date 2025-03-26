import asyncio
from fastapi import FastAPI
from chat_api import ChatAPI  # Import your class
from dotenv import load_dotenv  # Import load_dotenv

load_dotenv()
app = FastAPI()

MCP_SERVER_PATH = "/home/developer/code/repo/gaipl-auto-hackerss/code/src/mcp/kubernetes.py"

@app.on_event("startup")
async def on_startup():
    # Instantiate the class
    print('on startup')

    
    my_api = ChatAPI()
    # Include the router
    app.include_router(my_api.router, prefix="/api", tags=["ChatAPI"])

    try:
        await my_api.initialize_with_mcp(MCP_SERVER_PATH)
    except Exception as e:
        print(f"Error connecting to server: {e}")


