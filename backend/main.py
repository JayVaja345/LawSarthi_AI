# backend/app/main.py

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api.routes.legal_routes import router as legal_router
import logging

# Setup logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# def run(user_input:str):
#     result = legal_assistant_crew.kickoff(inputs={"user_input": user_input})
    
#     print("-"*50)
#     print(result)
#     print("-" * 50)

# Create FastAPI app
app = FastAPI(
    title="AI Legal Assistant API",
    description="API for AI-powered legal assistance using CrewAI",
    version="1.0.0"
)

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(legal_router)

@app.get("/")
async def root():
    return {
        "message": "Welcome to AI Legal Assistant API",
        "version": "1.0.0",
        "endpoints": {
            "query": "/api/legal/query",
            "health": "/api/legal/health"
        }
    }


if __name__ == "__main__":
    import uvicorn
    port = int(os.environ.get("PORT", 8000))
    uvicorn.run(app, host="0.0.0.0", port=port)    

# @app.on_event("startup")
# async def startup_event():
#     logger.info("🚀 Legal Assistant API starting up...")

# @app.on_event("shutdown")
# async def shutdown_event():
#     logger.info("👋 Legal Assistant API shutting down...")