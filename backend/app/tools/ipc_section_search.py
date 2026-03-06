import os

from dotenv import load_dotenv
from crewai.tools import tool
from langchain_chroma import Chroma
from langchain_huggingface import HuggingFaceEmbeddings


@tool("IPC Section Search")
def search_ipc_sections(query:str) -> str:
    """
     Search IPC vector database for sections relevant to the input query.
      Args:
        query (str): User query in natural language.

    Returns:
        list[dict]: List of msections witatching IPC h metadata and content.
    """
    
    load_dotenv()
    
    persist_dir = os.getenv("PERSIST_DIRECTORY_PATH")
    if not persist_dir:
        raise EnvironmentError("Persist directory path not set in .env file")
    persist_dir_path= os.getenv("PERSIST_DIRECTORY_PATH")
    collection_name = os.getenv("IPC_COLLECTION_NAME")
    
    
    embedding_function = HuggingFaceEmbeddings()
    
    vector_db = Chroma(
        collection_name=collection_name,
        persist_directory=persist_dir_path,
        embedding_function=embedding_function
    )
    
    
    top_k =3
    
    docs = vector_db.similarity_search(query, k=top_k)
    
    return [
        {
            "section": doc.metadata.get("section"),
            "section_title": doc.metadata.get("section_title"),
            "chapter": doc.metadata.get("chapter"),
            "chapter_title": doc.metadata.get("chapter_title"),
            "content": doc.page_content
        }
        for doc in docs
    ]