import os
from dotenv import load_dotenv
from crewai.tools import tool
from tavily import TavilyClient

load_dotenv()


LEGAL_SOURCES = [
    "indiankanoon.org",
    "latestlaws.com",
    "scconline.com",  # Supreme Court Cases
    "manupatra.com",   # Premium database
    "courtnic.nic.in"
]

def _is_legal_source(url:str) -> bool:
    #it will check if the url belongs to any of the legal sources in the list
    return any(domain in url for domain in LEGAL_SOURCES)

@tool("Legal Precedent Search") #Name of the tool
def search_legal_precedents(query:str) -> list[dict]:
    """
    Use Tavily Search to find precedent legal cases for a given legal issue.
    sample tool input: "Home trespassing and theft - precedent cases in India"

    Args:
        query (str): The structured legal issue or case summary.

    Returns:
        list[dict]: Relevant case titles, summaries, and links from trusted Indian legal sources.
    """
    
    api_key = os.getenv("TAVILY_API_KEY")
    
    if not api_key:
        raise ValueError("Tavily api key not foundd.")
    
    #Initialize Tavily client
    client = TavilyClient(api_key=api_key)
    
    #Search for legal precedents using Tavily
    search_query  = f"site:{' OR site:' .join(LEGAL_SOURCES)} {query}"
    
    response = client.search(
        query = search_query,
        max_results=5
    )
    
    #If "results" doesn't exist, returns empty list [] (no crash!)
    raw_results = response.get("results", [])
    
    #

    legal_results = [
        {
             # CREATE this dictionary
            "title": item.get("title"),
            "summary": item.get("summary"),
            "link": item.get("url")
        }
        for item in raw_results  # FOR each item in raw_results
        if _is_legal_source(item.get("url", ""))  # IF it's from legal source
    ]
    
    return legal_results if legal_results else [{
        "title": "No relevant legal precedents found",
        "summary": "No matching results found from trusted Indian legal sources.",
        "link": None
    }]
    
    
    