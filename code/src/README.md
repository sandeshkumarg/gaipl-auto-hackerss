## Delete this file

Instead place your source files here


python3 -m venv venv

source venv/bin/activate

pip freeze > requirements.txt

uvicorn main:app --reload