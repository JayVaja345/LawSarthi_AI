# backend/app/api/models/schemas.py

from pydantic import BaseModel
from typing import Optional, List, Dict, Any

class LegalQueryRequest(BaseModel):
    query: str
    document: Optional[str] = None

class IPCSection(BaseModel):
    section: str
    section_title: str
    chapter: Optional[str] = None
    chapter_title: Optional[str] = None
    content: str

class Precedent(BaseModel):
    title: str
    summary: str
    link: Optional[str] = None

class LegalQueryResponse(BaseModel):
    success: bool
    case_analysis: Optional[Dict[str, Any]] = None
    ipc_sections: Optional[List[IPCSection]] = None
    precedents: Optional[List[Precedent]] = None
    drafted_document: Optional[str] = None
    error: Optional[str] = None