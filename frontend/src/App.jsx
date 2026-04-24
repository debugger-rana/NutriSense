import React, { useState, useEffect } from 'react';
import { Camera, Upload, Activity, Zap, Droplet, Flame, CheckCircle2, ChevronRight, Apple, HeartPulse } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import './index.css';

function App() {
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState(null);

  const handleAnalyze = () => {
    setAnalyzing(true);
    // Mock the backend API delay
    setTimeout(() => {
      setAnalyzing(false);
      setResult({
        food: "Grilled Salmon Bowl with Quinoa",
        calories: 520,
        protein: 42,
        carbs: 35,
        fat: 22,
        healthScore: 94,
        insights: [
          "Excellent source of Omega-3 fatty acids",
          "High protein content supports muscle recovery",
          "Complex carbs provide sustained energy",
          "Low in saturated fat"
        ],
        aiTip: "To optimize this meal for post-workout recovery, consider adding half an avocado for healthy fats and extra calories, or a side of steamed spinach for increased iron absorption."
      });
    }, 3000);
  };

  return (
    <>
      <div className="ambient-bg"></div>
      
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem' }}>
        
        {/* Navigation */}
        <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div style={{ background: 'linear-gradient(135deg, var(--accent), var(--primary))', padding: '0.5rem', borderRadius: '12px' }}>
              <Activity size={24} color="#0a0a0f" />
            </div>
            <h1 style={{ fontSize: '1.5rem', fontWeight: 800, letterSpacing: '-0.5px' }} className="glow-text">
              NutriSense
            </h1>
          </div>
          <div style={{ display: 'flex', gap: '1rem' }}>
            <button style={{ background: 'transparent', border: '1px solid var(--border)', color: 'white', padding: '0.5rem 1rem', borderRadius: '8px', cursor: 'pointer' }}>
              Dashboard
            </button>
            <button style={{ background: 'rgba(255,255,255,0.1)', border: 'none', color: 'white', padding: '0.5rem 1rem', borderRadius: '8px', cursor: 'pointer' }}>
              Sign In
            </button>
          </div>
        </nav>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
          
          {/* Main Action Area */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-panel"
            style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}
          >
            <div>
              <h2 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>Analyze Your Meal</h2>
              <p style={{ color: 'var(--text-muted)' }}>Powered by Gemini 1.5 Pro & Cloud Vision</p>
            </div>

            <div className="upload-area" onClick={handleAnalyze}>
              {analyzing ? (
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
                  <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 2, ease: "linear" }}>
                    <Camera size={48} color="var(--primary)" />
                  </motion.div>
                  <p className="glow-text" style={{ fontWeight: 600 }}>Gemini is analyzing pixels...</p>
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
                  <Upload size={48} color="var(--text-muted)" />
                  <p>Drop a photo of your food, or click to browse</p>
                  <p style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.4)' }}>Supports JPG, PNG, WEBP</p>
                </div>
              )}
              {analyzing && <div className="scan-line"></div>}
            </div>

            <button 
              className="btn-primary" 
              onClick={handleAnalyze} 
              disabled={analyzing}
              style={{ marginTop: 'auto' }}
            >
              {analyzing ? 'Analyzing via Cloud Vision API...' : 'Run Smart Analysis'}
              {!analyzing && <ChevronRight size={20} />}
            </button>
          </motion.div>

          {/* Results Area */}
          <AnimatePresence mode="wait">
            {result ? (
              <motion.div 
                key="results"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="glass-panel"
                style={{ gridColumn: 'span 2', display: 'flex', flexDirection: 'column', gap: '2rem' }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--primary)', marginBottom: '0.5rem' }}>
                      <CheckCircle2 size={16} />
                      <span style={{ fontSize: '0.875rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '1px' }}>Analysis Complete</span>
                    </div>
                    <h2 style={{ fontSize: '2rem', fontWeight: 700 }}>{result.food}</h2>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div className="stat-label">Health Score</div>
                    <div className="stat-value" style={{ color: 'var(--accent)' }}>{result.healthScore}/100</div>
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem' }}>
                  <div className="glass-panel stat-card" style={{ padding: '1rem' }}>
                    <Flame size={20} color="#ffaa00" />
                    <div className="stat-value" style={{ fontSize: '1.5rem', color: '#ffaa00' }}>{result.calories}</div>
                    <div className="stat-label">Calories</div>
                  </div>
                  <div className="glass-panel stat-card" style={{ padding: '1rem' }}>
                    <HeartPulse size={20} color="#ff3366" />
                    <div className="stat-value" style={{ fontSize: '1.5rem', color: '#ff3366' }}>{result.protein}g</div>
                    <div className="stat-label">Protein</div>
                  </div>
                  <div className="glass-panel stat-card" style={{ padding: '1rem' }}>
                    <Zap size={20} color="#00ddff" />
                    <div className="stat-value" style={{ fontSize: '1.5rem', color: '#00ddff' }}>{result.carbs}g</div>
                    <div className="stat-label">Carbs</div>
                  </div>
                  <div className="glass-panel stat-card" style={{ padding: '1rem' }}>
                    <Droplet size={20} color="#ffff00" />
                    <div className="stat-value" style={{ fontSize: '1.5rem', color: '#ffff00' }}>{result.fat}g</div>
                    <div className="stat-label">Fat</div>
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
                  <div>
                    <h3 style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <Apple size={20} /> Nutrition Insights
                    </h3>
                    <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                      {result.insights.map((insight, i) => (
                        <li key={i} style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start', color: 'var(--text-muted)' }}>
                          <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--primary)', marginTop: '8px' }}></div>
                          {insight}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div style={{ background: 'rgba(112, 0, 255, 0.1)', padding: '1.5rem', borderRadius: '16px', border: '1px solid rgba(112, 0, 255, 0.2)' }}>
                    <h3 style={{ marginBottom: '1rem', color: 'var(--accent)' }}>Gemini AI Recommendation</h3>
                    <p style={{ lineHeight: 1.6, color: 'rgba(255,255,255,0.9)' }}>
                      {result.aiTip}
                    </p>
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.div 
                key="placeholder"
                className="glass-panel"
                style={{ gridColumn: 'span 2', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: '1rem', color: 'var(--text-muted)', minHeight: '400px' }}
              >
                <Activity size={48} opacity={0.2} />
                <p>Upload a meal to see deep nutritional insights</p>
                <p style={{ fontSize: '0.875rem', opacity: 0.5 }}>Results will appear here</p>
              </motion.div>
            )}
          </AnimatePresence>

        </div>
      </div>
    </>
  );
}

export default App;
