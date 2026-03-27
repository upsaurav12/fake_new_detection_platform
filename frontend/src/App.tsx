import { useState } from 'react';
import { ThemeProvider } from './components/ThemeProvider';
import { Header } from './components/Header';
import { VerificationForm } from './components/VerificationForm';
import { ResultsViewer } from './components/ResultsViewer';
import type { APIResponse } from './types';

// Example Mock Data for initial testing
const MOCK_RESPONSE: APIResponse = {
  "extracted": {
    "main_claim": "The moon landings were faked in a Hollywood studio",
    "keywords": ["moon", "landing", "fake", "studio", "Apollo 11"],
    "entities": ["NASA", "Apollo 11", "Hollywood"],
    "claim_type": "Conspiracy Theory",
    "search_query": "\"moon landing faked\" OR \"Apollo 11 hoax proof\"",
    "time_context": "1969"
  },
  "articles": [
    {
      "title": "Why the Moon Landing was Not Faked",
      "source": "Space.com",
      "description": "Scientific evidence and reflective mirrors left on the moon's surface prove astronauts were there.",
      "url": "https://example.com",
      "published_at": "2019-07-20T00:00:00Z"
    },
    {
      "title": "Debunking Moon Hoax Theories",
      "source": "BBC News",
      "description": "A deep dive into why shadows, stars, and radiation belts do not support the hoax theory.",
      "url": "https://example.com",
      "published_at": "2020-05-15T00:00:00Z"
    }
  ],
  "analysis": {
    "verdict": "FALSE",
    "credibility_score": 10,
    "confidence": 98,
    "reasoning": "Scientific consensus, independent verification from other nations, and physical evidence (moon rocks, retroreflectors) definitively prove the Apollo missions occurred.",
    "red_flags": [
      "Relies on discredited visual anomalies",
      "Ignores independent tracking by the Soviet Union",
      "Lacks testimony from the 400,000+ people involved"
    ],
    "supporting_points": [
      "Laser ranging experiments bounce off retroreflectors left on the moon",
      "Geological distinctness of moon rocks compared to Earth rocks"
    ],
    "source_quality": "Very Low",
    "claim_type_analysis": "Historical Revisionism / Conspiracy",
    "recommendation": "Disregard. This is a widely debunked conspiracy theory with massive evidentiary contradiction."
  }
};


const API_URL = import.meta.env.VITE_API_URL;

function App() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<APIResponse | null>(null);

  const handleVerify = async (text: string) => {
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/api/verify`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text })
      });
      if (!response.ok) {
        throw new Error('API request failed');
      }
      const data = await response.json();
      setResult(data);
    } catch (e) {
      console.error(e);
      // Fallback to mock data for demonstration if backend isn't ready
      setResult(MOCK_RESPONSE);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ThemeProvider defaultTheme="dark" storageKey="truthcheck-theme">
      <div className="min-h-screen bg-[#060e20] text-[#dee5ff] font-['Inter'] selection:bg-[#6bff8f]/30 selection:text-[#dee5ff]">
        <Header />
        
        <main className="flex-1">
          <VerificationForm onSubmit={handleVerify} isLoading={loading} />
          
          {result && !loading && (
            <div className="border-t border-[#141f38] pt-12 bg-gradient-to-b from-[#060e20] to-[#000000]">
              <ResultsViewer data={result} />
            </div>
          )}
        </main>
      </div>
    </ThemeProvider>
  );
}

export default App;
