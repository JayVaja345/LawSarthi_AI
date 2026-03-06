# backend/app/core/crew_manager.py

import sys
import os
import time
import logging
from pathlib import Path

# Add paths
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from crewai import Crew, Process
from litellm.exceptions import RateLimitError
from app.agents.case_intake_agent import case_intake_agent
from app.agents.ipc_section_agent import ipc_section_agent
from app.agents.legal_precedent_agent import legal_precedent_agent
from app.agents.legal_drafter_agent import legal_drafter_agent
from app.tasks.case_intake_task import case_intake_task
from app.tasks.ipc_section_task import ipc_section_task
from app.tasks.legal_precedent_task import legal_precedent_task
from app.tasks.legal_drafter_task import legal_drafter_task

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

class LegalCrewManager:
    """Manages the Legal Assistant Crew"""
    
    def __init__(self):
        self.crew = Crew(
            agents=[
                case_intake_agent,
                ipc_section_agent,
                legal_precedent_agent,
                legal_drafter_agent
            ],
            tasks=[
                case_intake_task,
                ipc_section_task,
                legal_precedent_task,
                legal_drafter_task
            ],
            process=Process.sequential,
            verbose=False,      # ← change True to False (saves memory)
            memory=False,       # ← disable memory
            cache=False
        )
    
    def process_query(self, user_input: str, document_text: str = None) -> dict:
        """Process a legal query through crew with retry on rate limit"""

        max_retries = 5

        for attempt in range(max_retries):
            try:
                logger.info(f"Attempt {attempt + 1} of {max_retries}")

                # Prepare inputs
                inputs = {"user_input": user_input}
                if document_text:
                    inputs["document"] = document_text

                # Run the crew
                result = self.crew.kickoff(inputs=inputs)

                return {
                    "success": True,
                    "result": str(result)
                }

            except RateLimitError as e:
                wait_time = (attempt + 1) * 15  # 15s, 30s, 45s, 60s, 75s
                logger.warning(f"Rate limit hit. Waiting {wait_time}s before retry...")

                if attempt < max_retries - 1:
                    time.sleep(wait_time)
                else:
                    logger.error("Max retries reached. Rate limit not resolved.")
                    return {
                        "success": False,
                        "error": "Rate limit exceeded. Please wait a minute and try again."
                    }

            except Exception as e:
                logger.error(f"Unexpected error: {str(e)}")
                return {
                    "success": False,
                    "error": str(e)
                }

        return {
            "success": False,
            "error": "Failed to process query after maximum retries."
        }

# Singleton instance
crew_manager = LegalCrewManager()