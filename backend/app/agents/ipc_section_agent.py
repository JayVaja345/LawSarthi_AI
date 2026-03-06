from crewai import Agent, LLM
from app.tools.ipc_section_search import search_ipc_sections
import os

llm = LLM(
    model="groq/llama-3.3-70b-versatile", 
    temperature=0.3,
    api_key=os.getenv("GROQ_API_KEY")
)

ipc_section_agent = Agent(
    role="IPC Section Agent",
    goal="Identify the most Indian Penal Code sections based on the legal issue provided",
    backstory=("You're a seasoned legal researcher with deep knowledge of Indian penal laws. "
        "You specialize in mapping legal issues to applicable IPC sections with precision and clarity. "
        "Your insight helps lawyers and assistants quickly understand the statutory basis of a case."
    ),
    tools=[search_ipc_sections],
    llm=llm,
    verbose=True,
)