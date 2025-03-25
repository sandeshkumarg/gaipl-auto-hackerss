## Delete this file

Instead place your source files here


python3 -m venv venv

source venv/bin/activate

pip freeze > requirements.txt

uvicorn main:app --reload



#For MCP Server

curl -LsSf https://astral.sh/uv/install.sh | sh

# Create a new directory for our project
uv init weather
cd weather

# Create virtual environment and activate it
uv venv
source .venv/bin/activate

# Install dependencies
uv add "mcp[cli]" httpx

# Create our server file
touch weather.py


uv run weather.py


#MCP Client

# Create project directory
uv init mcp-client
cd mcp-client

# Create virtual environment
uv venv

# Activate virtual environment
# On Windows:
.venv\Scripts\activate
# On Unix or MacOS:
source .venv/bin/activate

# Install required packages
uv add mcp anthropic python-dotenv

# Remove boilerplate files
rm main.py

# Create our main file
touch client.py


#######
uv run client.py ../weather/weather.py