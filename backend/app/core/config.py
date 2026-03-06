# backend/app/core/config.py

import os
from dotenv import load_dotenv

load_dotenv()

class Config:
    # API Keys
    GROQ_API_KEY = os.getenv("GROQ_API_KEY")
    TAVILY_API_KEY = os.getenv("TAVILY_API_KEY")
    
    # Paths
    IPC_JSON_PATH = os.getenv("IPC_JSON_PATH")
    PERSIST_DIRECTORY_PATH = os.getenv("PERSIST_DIRECTORY_PATH")
    IPC_COLLECTION_NAME = os.getenv("IPC_COLLECTION_NAME", "ipc_sections")

config = Config()