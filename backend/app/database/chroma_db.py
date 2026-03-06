import json 
import os 
from dotenv import load_dotenv
from langchain_community.docstore.document import Document
from langchain_chroma import Chroma
from langchain_huggingface import HuggingFaceEmbeddings


def load_ipc_data(file_path: str) -> list[dict]:
    #Load IPC data from a JSON file.
    with open(file_path, "r",  encoding="utf-8") as file:
        return json.load(file)
    
    
    
def prepare_documents(ipc_data: list[dict]) -> list[Document]:
    # Convert IPC JSON entries to LangChain Document objects.
    
    if ipc_data:
        print("🔍 FIRST ITEM IN JSON:")
        print(json.dumps(ipc_data[0], indent=2))
        print("\n🔑 AVAILABLE KEYS:", list(ipc_data[0].keys()))
    
    return [
        Document(
            page_content=f"Section {entry['Section']} :  {entry['section_title']}\n\n{entry['section_desc']}",
            metadata={
                "chapter": entry['chapter'],
                "chapter_title": entry['chapter_title'],
                "section": entry['Section'],
                "section_title":entry['section_title']
            }
        )
        
        for entry in ipc_data
    ]    

def create_ipc_vectordb():
    load_dotenv()
    
    ipc_json_path = os.getenv("IPC_JSON_PATH")
    persist_dir_path = os.getenv("PERSIST_DIRECTORY_PATH")    
    collection_name = os.getenv("IPC_COLLECTION_NAME")
    
    
    if not all([ipc_json_path,persist_dir_path,collection_name]):
        raise EnvironmentError("Missing one or more required environment variables")
    
    ipc_data = load_ipc_data(ipc_json_path)
    
    documents = prepare_documents(ipc_data)
    
    embeddings = HuggingFaceEmbeddings()
    Chroma.from_documents(
        documents = documents,
        embedding=embeddings,
        persist_directory=persist_dir_path,
        collection_name=collection_name,
    )
        
    print(f"Vector store successfully created in '{collection_name}' at '{persist_dir_path}'")    
        
if __name__ == "__main__":
    create_ipc_vectordb()
    
    