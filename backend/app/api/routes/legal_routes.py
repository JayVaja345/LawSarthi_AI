# backend/app/api/routes/legal_routes.py

from fastapi import APIRouter, HTTPException
from app.api.models.schemas import LegalQueryRequest, LegalQueryResponse
from app.core.crew_manager import crew_manager
import logging

# Setup logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

router = APIRouter(prefix="/api/legal", tags=["Legal Assistant"])

@router.post("/query", response_model=LegalQueryResponse)
async def process_legal_query(request: LegalQueryRequest):
    """
    Process a legal query through the AI Legal Assistant
    """
    logger.info(f"Received query: {request.query[:100]}...")
    
    try:
        result = crew_manager.process_query(
            user_input=request.query,
            document_text=request.document
        )
        
        if result["success"]:
            return LegalQueryResponse(
                success=True,
                drafted_document=result["result"]
            )
        else:
            return LegalQueryResponse(
                success=False,
                error=result["error"]
            )
    
    except Exception as e:
        logger.error(f"Error processing query: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/health")
async def health_check():
    return {"status": "healthy", "service": "Legal Assistant API"}