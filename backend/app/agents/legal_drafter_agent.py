from crewai import Agent,LLM
import os

llm = LLM(
    model="groq/llama-3.3-70b-versatile",
    temperature=0.4,
    api_key=os.getenv("GROQ_API_KEY")
)


legal_drafter_agent = Agent(
    role="Legal Drafter Agent",
    goal="Draft legally sound documents based on the user's case summary, applicable IPC sections, and relevant precedents.",
    backstory=(
        "You are a seasoned legal document expert trained in Indian law. "
        "You specialize in drafting formal legal documents such as FIRs, legal notices, and complaints, tailored to specific case scenarios. "
        "Your drafts are precise, compliant with Indian legal standards, and written in plain yet formal legal language."
    ),
    llm=llm,
    tools=[],
    verbose=True
)