# TruthCheck — Fake News Detection Platform
 
A full-stack platform that helps you figure out whether a news claim is real or made up. You paste in a headline or article text, and the app cross-references it against fact-check databases, pulls related articles from across the web, and uses an AI model to give you a clear verdict with reasoning.
 
Live demo → [fake-new-detection-platform.vercel.app](https://fake-new-detection-platform.vercel.app)
 
---
 
## What it actually does
 
Most "fake news detectors" just run your text through a classifier trained on a static dataset and spit out a percentage. This one takes a different approach — it goes and *looks things up* in real time.
 
When you submit a claim, the backend:
 
1. Queries the **Google Fact Check API** to see if any fact-checkers (Snopes, PolitiFact, Reuters, etc.) have already reviewed that specific claim or something very close to it.
2. Searches the **GDELT Project** — a massive database of news articles from around the world — to find related coverage and check if the story has been reported by credible outlets.
3. Sends all of that context to an **AI model (via GROQ / Groq)** which synthesizes everything into a human-readable analysis with a final verdict.
The frontend is a clean TypeScript/React app deployed on Vercel. The backend is a FastAPI Python service.
 
---
 
## Tech Stack
 
**Backend**
- Python (FastAPI + Uvicorn)
- GROQ Claude API / Groq for AI analysis
- Google Fact Check Tools API
- GDELT Project API for real-time news search
- `python-dotenv` for environment config
**Frontend**
- TypeScript + React
- Deployed on Vercel
---
 
## Project Structure
 
```
fake_new_detection_platform/
├── app/                  # FastAPI application (routes, services, models)
├── frontend/             # React + TypeScript frontend
├── fack_check.py         # Google Fact Check API integration (utility/script)
├── gelt.py               # GDELT news search integration (utility/script)
├── run.py                # Entry point — starts the backend server
├── requirements.txt      # Python dependencies
├── .env.example          # Template for environment variables
├── .python-version       # Python version pin
└── runtime.txt           # Runtime declaration (for deployment)
```
 
---
 
## Running it locally
 
You'll need **Python 3.11+** and **Node.js 18+** on your machine.
 
### 1. Clone the repo
 
```bash
git clone https://github.com/upsaurav12/fake_new_detection_platform.git
cd fake_new_detection_platform
```
 
### 2. Set up the Python backend
 
Create and activate a virtual environment (keeps your system Python clean):
 
```bash
python -m venv venv
 
# On macOS/Linux:
source venv/bin/activate
 
# On Windows:
venv\Scripts\activate
```
 
Install all the dependencies:
 
```bash
pip install -r requirements.txt
```
 
### 3. Configure your environment variables
 
Copy the example env file and fill it in:
 
```bash
cp .env.example .env
```
 
Open `.env` and add your keys:
 
```env
GROQ_API_KEY=your_GROQ_api_key_here
NEWS_API_KEY=your_news_api_key_here
PORT=8000
```
 
You'll need:
- An **GROQ API key** → get one at [console.GROQ.com](https://console.GROQ.com)
- A **News API key** → get one at [newsapi.org](https://newsapi.org) (free tier works)
The Google Fact Check and GDELT APIs don't require keys — they're open.
 
### 4. Start the backend
 
```bash
python run.py
```
 
You should see something like:
 
```
✓ TruthCheck Python backend starting on http://localhost:8000
  GROQ_API_KEY : ✓ set
  NEWS_API_KEY      : ✓ set
 
  API docs          : http://localhost:8000/docs
```
 
The interactive API docs (Swagger UI) are available at `http://localhost:8000/docs` — useful for testing endpoints directly without the frontend.
 
### 5. Set up and run the frontend
 
Open a new terminal window (keep the backend running), then:
 
```bash
cd frontend
npm install
npm run dev
```
 
The frontend will start on `http://localhost:3000` (or whichever port Vite picks — it'll tell you in the terminal).
 
---
