import os
from fastapi import APIRouter, HTTPException
from langchain_core.prompts import ChatPromptTemplate
from langchain.schema import HumanMessage, SystemMessage, AIMessage
from mcp import ClientSession, StdioServerParameters
from mcp.client.stdio import stdio_client
import asyncio
from typing import Optional, Dict
import time
from pydantic import BaseModel
from contextlib import AsyncExitStack
from langchain_google_genai import ChatGoogleGenerativeAI

# Expect the client to send a JSON payload containing a list of messages.
class ChatRequest(BaseModel):
    chatid: str
    messages: str  # Each message is typically a dict with keys "role" and "content"
    logs: list
    dependencies: str



GEMINI_API_KEY = os.getenv("GOOGLE_GEMINI_API_KEY")

PROMPT_TEXT = """You are a System Administrator who knows how to identify issues related to Distributed Systems, Microservices, Kafka, Databases such as Oracle, Mongo, SQL Server, Redis and other technologies available. 
The user will provide the System architecture and the architecture details would contain the dependent systems and also the dependencies for the given system. 
The user also will provide system logs containing errors. 
Based on the details provided, provide troubleshooting steps and suggest corrective actions to be taken to resolve the issue. 
Feel free to ask further information as needed for incident resolution. 
Keep the instructions short to less than a paragraph so the user can resolve the issue faster. 
Try to limit the response to 100 words or less when possible. Goal is to resolve the error as soon as possible with least manual steps. 
You will be provided with conversation history. Device the diagnostics keeping past executions in mind.
Do not stop the conversation once the issue is diagnosed. Continue to prompt the user for any further assistance needed. The previous conversations in the chat is {history}
The logs are {logs} and the system dependencies {dependencies}"""
troubleshooting_prompt = ChatPromptTemplate.from_messages(
        [
            (
                "system",
                PROMPT_TEXT,
            ),
            ("user", "{input}"),
        ])

SUMMARIZE_PROMPT_TEXT = """You are a System Administrator who knows how to identify issues related to Distributed Systems, Microservices, Kafka, Databases such as Oracle, Mongo, SQL Server, Redis and other technologies available. 
The user will provide system logs which may contain errors or failures. By looking at the logs summarize your findings and the cause if any.
The logs are {logs} and the system dependencies {dependencies}"""
summary_prompt = ChatPromptTemplate.from_messages(
        [
            (
                "system",
                PROMPT_TEXT,
            ),
            ("user", "{input}"),
        ])

class ChatAPI:
    
    
    def __init__(self):

        self.exit_stack = AsyncExitStack()

        self.session: Optional[ClientSession] = None
        self.chatgoogle = ChatGoogleGenerativeAI(model="gemini-2.0-flash", max_tokens=None,)
        # Initialize an APIRouter instance
        self.router = APIRouter()

        # In-memory store for chat histories
        self.chat_histories: Dict[str, Dict] = {}

        # Declare endpoints within the class
        self.router.get("/hello")(self.hello)
        self.router.post("/chat")(self.chat)



    async def connect_to_server(self, server_script_path: str):
        """Connect to an MCP server
        
        Args:
            server_script_path: Path to the server script (.py or .js)
        """
        is_python = server_script_path.endswith('.py')
        is_js = server_script_path.endswith('.js')
        if not (is_python or is_js):
            raise ValueError("Server script must be a .py or .js file")
            
        command = "python" if is_python else "node"
        server_params = StdioServerParameters(
            command=command,
            args=[server_script_path],
            env=None
        )
        
        stdio_transport = await self.exit_stack.enter_async_context(stdio_client(server_params))
        self.stdio, self.write = stdio_transport
        self.session = await self.exit_stack.enter_async_context(ClientSession(self.stdio, self.write))
        
        await self.session.initialize()
        
        # List available tools
        response = await self.session.list_tools()
        tools = response.tools
        print("\nConnected to server with tools:", [tool.name for tool in tools])

    async def initialize_with_mcp(self, server_script_path: str):        
        try:
            await self.connect_to_server(server_script_path)
            
            response = await self.session.list_tools()
            available_tools = [{ 
                "name": tool.name,
                "description": tool.description,
                "input_schema": tool.inputSchema
            } for tool in response.tools]

            self.chatgoogle = self.chatgoogle.bind_tools(available_tools)
        except Exception as e:
            print(f"Error initializing with MCP: {e}")

    def transform(self, request: ChatRequest):
        contents = [(msg["role"], msg["content"])
                    for msg in request.messages]
        print(contents)
        return contents
    
    async def chat(self, request: ChatRequest):
        """
        POST endpoint to chat with bot.
        """
        try:

            print(request)

            chatid = request.chatid
            logs = request.logs
            deps = request.dependencies

            # Retrieve or initialize chat history
            if chatid not in self.chat_histories:
                self.chat_histories[chatid] = {"messages": [], "timestamp": time.time()}

                # Append new messages to the chat history
            chat_history = self.chat_histories[chatid]

            chat_history["messages"].append(SystemMessage(content=PROMPT_TEXT))
            chat_history["messages"].append(HumanMessage(content=request.messages))
            chat_history["timestamp"] = time.time()  # Update the timestamp

            # Transform the chat history for the LLM
            #chats = self.transform(request)            

            chain = troubleshooting_prompt | self.chatgoogle
            result = chain.invoke(
                {
                    "logs": logs,
                    "dependencies": deps,
                    "input": HumanMessage(content=request.messages),
                    "history": str(chat_history["messages"]),
                }
            )

            #print(result)
            #print("type--")
            #print(type(result))

            # Append the LLM's response to the chat history
            if len(result.content) > 0:
                chat_history["messages"].append(result)
            else :
                chat_history["messages"].append(AIMessage(content=str(result.additional_kwargs)))

            
            final_text = []

            for content in result.content:
                if len(content) > 0:
                    #print('Found content ...')
                    final_text.append(content)

            
            for tool_call in result.tool_calls:                
                print('Found tool call ...')
                tool_name = tool_call["name"]
                tool_args = tool_call["args"]
                
                # Execute tool call
                result = await self.session.call_tool(tool_name, tool_args)
                final_text.append(f"[Calling tool {tool_name} with args {tool_args}]")

                print('--after tool exec--')
                #print(type(result))
                chat_history["messages"].append(AIMessage(content=str(final_text)))
                chat_history["messages"].append(AIMessage(content=str(result)))
                #print(result)

                # Continue conversation with tool results
                #if hasattr(result.content, 'text') and len(result.content.text) > 0:
                #    chat_history["messages"].append(AIMessage(content=content.text))
                #else:
                #    chat_history["messages"].append(AIMessage(content=f"[Calling tool {tool_name} with args {tool_args}]"))
                

                #print(chat_history["messages"])
                self.chat_histories[chatid]["messages"] = chat_history["messages"]
                self.chat_histories[chatid]["timestamp"] = time.time()
                #response = self.chatgoogle.invoke(chat_history["messages"])

                #chain = summary_prompt | self.chatgoogle
                #result = chain.invoke(
                #    {
                #        "logs": logs,
                #        "dependencies": deps,
                #        "input": chat_history["messages"],
                #    }
                #)
                print('--')
                print(result)

                final_text.append("The tool was run and above is the output")
            


            return {"reply": result.content}
        
        except Exception as e:
            print(e)
            raise HTTPException(status_code=500, detail=str(e))
    
    
    


    async def hello(self):
        """
        GET endpoint to return a greeting message.
        """
        return {"message": "Hello, World!"}
        
        