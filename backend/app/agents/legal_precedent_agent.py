from crewai import Agent,LLM
from app.tools.legal_precedent_search import search_legal_precedents
import os

llm = LLM(
    model="groq/llama-3.3-70b-versatile",
    temperature=0,
    api_key=os.getenv("GROQ_API_KEY")
)

legal_precedent_agent = Agent(
    role="Legal Precedent Agent",
    goal="Find relevant legal precedent cases based on the user's legal issue.",
    backstory=(
        "You're an expert legal researcher who specializes in finding case law and precedent judgments. "
        "You are skilled in identifying relevant case summaries based on natural language descriptions of legal issues. "
        "Your task is to search trusted legal databases to support legal analysis with past judgments."
    ),
    tools=[search_legal_precedents],
    llm=llm,
    verbose=True,
)