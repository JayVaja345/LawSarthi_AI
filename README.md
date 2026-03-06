# ⚖️ LawSarthi — AI-Powered Legal Assistant

> Your trusted AI guide through India's legal system. Describe your legal issue in plain language and get professionally drafted legal documents instantly.

![LawSarthi](https://img.shields.io/badge/LawSarthi-Legal%20AI-c9a84c?style=for-the-badge&logo=scales)
![FastAPI](https://img.shields.io/badge/FastAPI-009688?style=for-the-badge&logo=fastapi&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![CrewAI](https://img.shields.io/badge/CrewAI-Agentic%20AI-1a1a2e?style=for-the-badge)

---

## 🚀 Live Demo

- **Frontend:** https://lawsarthi.vercel.app
- **Backend API:** https://lawsarthi-backend.onrender.com
- **API Docs:** https://lawsarthi-backend.onrender.com/docs

---

## 📌 What is LawSarthi?

LawSarthi is an **Agentic AI** application built with **CrewAI** and **FastAPI** that helps Indian citizens navigate the legal system. It uses a crew of specialized AI agents to:

- Understand your legal situation
- Identify relevant IPC / BNS sections
- Find applicable legal precedents
- Draft a professional legal document ready for submission

---

## ✨ Features

- 🤖 **Multi-Agent AI System** — 4 specialized agents working sequentially
- 📄 **Legal Document Drafting** — FIRs, complaints, legal notices
- ⚖️ **IPC Section Identification** — Automatic section mapping
- 🏛️ **Legal Precedents** — Relevant court judgment references
- 📋 **Copy & Download** — Export your document instantly
- 🔒 **Secure & Private** — Queries are not stored permanently

---

## 🏗️ Tech Stack

### Backend
| Technology | Purpose |
|---|---|
| FastAPI | REST API framework |
| CrewAI | Multi-agent orchestration |
| Groq (LLaMA 3.3) | LLM provider |
| ChromaDB | Vector database |
| LiteLLM | LLM abstraction layer |
| Uvicorn | ASGI server |

### Frontend
| Technology | Purpose |
|---|---|
| React + Vite | Frontend framework |
| Tailwind CSS v4 | Styling |
| Axios | API communication |
| React Router | Navigation |
| Heroicons | Icons |

---

## 🤖 Agent Architecture

```
User Query
    ↓
Case Intake Agent      → Extracts key facts from the query
    ↓
IPC Section Agent      → Identifies relevant IPC / BNS sections
    ↓
Legal Precedent Agent  → Finds applicable court judgments
    ↓
Legal Drafter Agent    → Drafts the final legal document
    ↓
Response to User
```

---

## 📁 Project Structure

```
LegalAssistant/
├── backend/
│   ├── app/
│   │   ├── agents/
│   │   │   ├── case_intake_agent.py
│   │   │   ├── ipc_section_agent.py
│   │   │   ├── legal_precedent_agent.py
│   │   │   └── legal_drafter_agent.py
│   │   ├── tasks/
│   │   │   ├── case_intake_task.py
│   │   │   ├── ipc_section_task.py
│   │   │   ├── legal_precedent_task.py
│   │   │   └── legal_drafter_task.py
│   │   ├── api/
│   │   │   ├── routes/
│   │   │   │   └── legal_routes.py
│   │   │   └── models/
│   │   │       └── schemas.py
│   │   └── core/
│   │       └── crew_manager.py
│   ├── main.py
│   ├── ipc.json
│   └── requirements.txt
└── frontend/
    ├── src/
    │   ├── pages/
    │   │   ├── Home.jsx
    │   │   └── LegalQuery.jsx
    │   ├── components/
    │   │   ├── Layout/
    │   │   │   ├── Navbar.jsx
    │   │   │   └── Footer.jsx
    │   │   └── LegalQuery/
    │   │       ├── QueryForm.jsx
    │   │       └── DocumentDisplay.jsx
    │   └── services/
    │       └── api.js
    ├── package.json
    └── vite.config.js
```

---

## ⚙️ Local Setup

### Prerequisites
- Python 3.11+
- Node.js 18+
- Groq API Key → https://console.groq.com

### 1. Clone the repository
```bash
git clone https://github.com/yourusername/lawsarthi.git
cd lawsarthi
```

### 2. Backend Setup
```bash
cd backend

# Create virtual environment
python -m venv nenv
nenv\Scripts\activate       # Windows
source nenv/bin/activate    # Mac/Linux

# Install dependencies
pip install -r requirements.txt

# Create .env file
echo GROQ_API_KEY=your_groq_api_key_here > .env

# Start the server
uvicorn main:app --reload --port 8000
```

### 3. Frontend Setup
```bash
cd frontend

# Install dependencies
npm install

# Create .env.development
echo VITE_API_URL=http://localhost:8000/api > .env.development

# Start the dev server
npm run dev
```

### 4. Open in browser
```
Frontend: http://localhost:5173
Backend:  http://localhost:8000
API Docs: http://localhost:8000/docs
```

---

## 🌐 Deployment

### Backend → Render
1. Push code to GitHub
2. Create new **Web Service** on [Render](https://render.com)
3. Set **Root Directory** to `backend`
4. Set **Start Command** to `uvicorn main:app --host 0.0.0.0 --port $PORT`
5. Add environment variable: `GROQ_API_KEY`

### Frontend → Vercel
1. Create new project on [Vercel](https://vercel.com)
2. Set **Root Directory** to `frontend`
3. Add environment variable: `VITE_API_URL=https://your-backend.onrender.com/api`

---

## 📝 API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/api/legal/query` | Process a legal query |
| `GET` | `/api/legal/health` | Health check |

### Example Request
```json
POST /api/legal/query
{
  "query": "My landlord threatened me and refused to return my security deposit.",
  "document": ""
}
```

### Example Response
```json
{
  "success": true,
  "drafted_document": "LEGAL COMPLAINT\n\nTo,\nThe Station House Officer..."
}
```

---

## ⚠️ Disclaimer

LawSarthi is an AI-powered tool for **informational purposes only**. It is not a substitute for professional legal advice. Always consult a qualified advocate before taking legal action.

---

## 👨‍💻 Author

Built with ❤️ by **Jay**

---

## 📄 License

This project is licensed under the MIT License.
