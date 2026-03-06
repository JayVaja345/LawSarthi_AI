
from crewai import Crew

from app.agents.case_intake_agent import case_intake_agent
from app.agents.ipc_section_agent import ipc_section_agent
from app.agents.legal_precedent_agent import legal_precedent_agent
from app.agents.legal_drafter_agent import legal_drafter_agent
from app.tasks.case_intake_task import case_intake_task
from app.tasks.ipc_section_task import ipc_section_task
from app.tasks.legal_precedent_task import legal_precedent_task
from app.tasks.legal_drafter_task import legal_drafter_task


legal_assistant_crew = Crew(
    agents=[case_intake_agent, ipc_section_agent, legal_precedent_agent, legal_drafter_agent],
    tasks=[case_intake_task, ipc_section_task, legal_precedent_task, legal_drafter_task],
    verbose=True
)