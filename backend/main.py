# backend/app/main.py

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api.routes.legal_routes import router as legal_router
import logging
import os
import sys

# Setup detailed logging
logging.basicConfig(
    level=logging.DEBUG,  # Change to DEBUG for more details
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
    handlers=[
        logging.StreamHandler(sys.stdout),  # Force output to stdout
        logging.FileHandler('app.log')
    ]
)
logger = logging.getLogger(__name__)

# Log startup information IMMEDIATELY
logger.info("=" * 50)
logger.info("🚀 STARTING AI LEGAL ASSISTANT API")
logger.info("=" * 50)
logger.info(f"Python version: {sys.version}")
logger.info(f"Current directory: {os.getcwd()}")
logger.info(f"Files in current dir: {os.listdir('.')}")

# Check environment variables
port_from_env = os.environ.get("PORT")
logger.info(f"PORT environment variable: {port_from_env}")

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
logger.info("📡 Including routers...")
app.include_router(legal_router)
logger.info("✅ Routers included")

@app.get("/")
async def root():
    logger.debug("Root endpoint accessed")
    return {
        "message": "Welcome to AI Legal Assistant API",
        "version": "1.0.0",
        "endpoints": {
            "query": "/api/legal/query",
            "health": "/api/legal/health"
        }
    }

@app.get("/health")
async def health_check():
    return {"status": "healthy", "service": "legal-assistant"}

@app.on_event("startup")
async def startup_event():
    logger.info("=" * 50)
    logger.info("✅ APPLICATION STARTUP COMPLETE")
    logger.info(f"📡 Binding to host: 0.0.0.0")
    logger.info(f"🔌 Using port from env: {os.environ.get('PORT', 'Not set')}")
    logger.info("=" * 50)

@app.on_event("shutdown")
async def shutdown_event():
    logger.info("👋 Application shutting down...")