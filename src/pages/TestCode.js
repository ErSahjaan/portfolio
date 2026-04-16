import React, { useEffect, useRef, useState } from "react";

export default function EnhancedAITutorSystem() {
  const canvasRef = useRef(null);
  const fileInputRef = useRef(null);
  const [activeMode, setActiveMode] = useState('dashboard');
  const [isLecturing, setIsLecturing] = useState(false);
  const [step, setStep] = useState(0);
  const [timelineEvents, setTimelineEvents] = useState([]);
  const [speechText, setSpeechText] = useState("");
  const [progress, setProgress] = useState(0);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const speechSynthRef = useRef(null);
  
  // Advanced AI Features State
  const [aiLoading, setAiLoading] = useState(false);
  const [learningPath, setLearningPath] = useState('beginner');
  const [userProgress, setUserProgress] = useState({
    lecturesCompleted: 0,
    quizzesCompleted: 0,
    totalScore: 0,
    streak: 0,
    achievements: [],
    strengths: [],
    weaknesses: [],
    learningStyle: 'visual'
  });
  const [chatMessages, setChatMessages] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState('');
  const [quizState, setQuizState] = useState({
    currentQuestion: 0,
    score: 0,
    answers: [],
    isComplete: false,
    generatedQuestions: []
  });
  const [selectedTopic, setSelectedTopic] = useState('modern-history');
  const [studyMode, setStudyMode] = useState('visual');
  const [adaptiveDifficulty, setAdaptiveDifficulty] = useState('medium');
  
  // New Advanced Features
  const [uploadedDocument, setUploadedDocument] = useState(null);
  const [documentAnalysis, setDocumentAnalysis] = useState(null);
  const [studyPlan, setStudyPlan] = useState(null);
  const [conceptMap, setConceptMap] = useState(null);
  const [flashcards, setFlashcards] = useState([]);
  const [currentFlashcard, setCurrentFlashcard] = useState(0);
  const [flashcardFlipped, setFlashcardFlipped] = useState(false);
  const [practiceProblems, setPracticeProblems] = useState([]);
  const [aiPersonality, setAiPersonality] = useState('friendly');

  // Topics Library
  const topicsLibrary = {
    'modern-history': { name: 'Modern History', icon: '📜', color: '#dc2626', difficulty: 'medium', duration: '45 min', subtopics: ['Industrial Revolution', 'World Wars', 'Cold War', 'Digital Age'] },
    'mathematics': { name: 'Advanced Mathematics', icon: '🔢', color: '#8b5cf6', difficulty: 'hard', duration: '60 min', subtopics: ['Calculus', 'Linear Algebra', 'Statistics', 'Discrete Math'] },
    'physics': { name: 'Physics Fundamentals', icon: '⚛️', color: '#3b82f6', difficulty: 'hard', duration: '50 min', subtopics: ['Mechanics', 'Thermodynamics', 'Electromagnetism', 'Quantum'] },
    'biology': { name: 'Biology & Life Sciences', icon: '🧬', color: '#10b981', difficulty: 'medium', duration: '45 min', subtopics: ['Cell Biology', 'Genetics', 'Evolution', 'Ecology'] },
    'chemistry': { name: 'Chemistry Essentials', icon: '🧪', color: '#f59e0b', difficulty: 'medium', duration: '45 min', subtopics: ['Organic', 'Inorganic', 'Physical', 'Biochemistry'] },
    'computer-science': { name: 'Computer Science', icon: '💻', color: '#06b6d4', difficulty: 'medium', duration: '50 min', subtopics: ['Algorithms', 'Data Structures', 'AI/ML', 'Web Development'] },
    'literature': { name: 'Literature & Writing', icon: '📚', color: '#ec4899', difficulty: 'easy', duration: '40 min', subtopics: ['Classic Literature', 'Poetry', 'Creative Writing', 'Analysis'] },
    'economics': { name: 'Economics & Finance', icon: '📈', color: '#14b8a6', difficulty: 'medium', duration: '45 min', subtopics: ['Microeconomics', 'Macroeconomics', 'Finance', 'Markets'] }
  };

  // Historical events for timeline
  const historicalEvents = [
    { year: 1789, event: "French Revolution", color: '#ef4444', icon: '🇫🇷', y: 200 },
    { year: 1848, event: "Revolutions of 1848", color: '#f59e0b', icon: '⚔️', y: 250 },
    { year: 1914, event: "World War I", color: '#dc2626', icon: '🪖', y: 300 },
    { year: 1939, event: "World War II", color: '#991b1b', icon: '✈️', y: 350 },
    { year: 1945, event: "Cold War Begins", color: '#3b82f6', icon: '❄️', y: 400 },
    { year: 1989, event: "Fall of Berlin Wall", color: '#10b981', icon: '🧱', y: 450 }
  ];

  // Lecture steps
  const lectureSteps = [
    { action: "intro", speech: "Welcome! I'm your AI tutor, ready to make learning engaging and effective.", duration: 4000 },
    { action: "title", text: topicsLibrary[selectedTopic].name.toUpperCase(), speech: `Let's explore ${topicsLibrary[selectedTopic].name} together.`, duration: 4000 },
    { action: "definition", speech: "I'll break down complex concepts with visuals and clear explanations.", duration: 5000 },
    { action: "timeline_intro", speech: "Watch as I build an interactive timeline of key concepts.", duration: 4000 },
    { action: "deep_dive", speech: "Now let's dive deeper into the core principles and applications.", duration: 5000 }
  ];

  // ============= CLAUDE AI API INTEGRATION =============
  
  const callClaudeAPI = async (prompt, systemPrompt = null) => {
    try {
      setAiLoading(true);
      const response = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": "sk-ant-api03-2e5751a2ecc74d4e93015e7bd1604562-tgIrH4ZhA0XnTuTe"
        },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 4000,
          messages: [{
            role: "user",
            content: systemPrompt ? `${systemPrompt}\n\nUser Query: ${prompt}` : prompt
          }]
        })
      });

      const data = await response.json();
      setAiLoading(false);
      
      if (data.content && data.content[0] && data.content[0].text) {
        return data.content[0].text;
      }
      return "I apologize, but I couldn't generate a response. Please try again.";
    } catch (error) {
      setAiLoading(false);
      console.error("Claude API Error:", error);
      return "I encountered an error. Please check your connection and try again.";
    }
  };

  // Document Analysis
  const analyzeDocument = async (documentText) => {
    const systemPrompt = `You are an expert educational AI. Analyze this document and provide a JSON response with:
{
  "topics": ["topic1", "topic2", ...],
  "concepts": ["key concept 1", "key concept 2", ...],
  "difficulty": "beginner/intermediate/advanced",
  "studyTime": "X minutes",
  "questions": [
    {
      "question": "...",
      "options": ["A", "B", "C", "D"],
      "correct": 0,
      "explanation": "...",
      "points": 10
    }
  ],
  "objectives": ["objective 1", "objective 2", ...]
}

Analyze this content: ${documentText.substring(0, 3000)}`;

    const response = await callClaudeAPI("Analyze this document", systemPrompt);
    
    try {
      const cleanedResponse = response.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
      const analysis = JSON.parse(cleanedResponse);
      setDocumentAnalysis(analysis);
      return analysis;
    } catch (e) {
      setDocumentAnalysis({ raw: response });
      return { raw: response };
    }
  };

  // Generate Custom Quiz
  const generateCustomQuiz = async (topic, difficulty, numQuestions = 5) => {
    const systemPrompt = `Create ${numQuestions} ${difficulty} level quiz questions about: ${topic}.
Return ONLY a JSON array, no markdown formatting:
[
  {
    "question": "question text",
    "options": ["option A", "option B", "option C", "option D"],
    "correct": 0,
    "explanation": "detailed explanation",
    "points": 20
  }
]`;

    const response = await callClaudeAPI(`Generate quiz for: ${topic}`, systemPrompt);
    
    try {
      const cleanedResponse = response.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
      const questions = JSON.parse(cleanedResponse);
      setQuizState(prev => ({ ...prev, generatedQuestions: questions, currentQuestion: 0, score: 0, answers: [], isComplete: false }));
      return questions;
    } catch (e) {
      console.error("Quiz generation error:", e);
      return [];
    }
  };

  // Generate Study Plan
  const generateStudyPlan = async () => {
    const systemPrompt = `Create a 7-day study plan for: ${topicsLibrary[selectedTopic].name}
Learning style: ${userProgress.learningStyle}
Current level: ${learningPath}

Return JSON:
{
  "week": [
    {
      "day": 1,
      "focus": "topic",
      "duration": 30,
      "activities": ["activity 1", "activity 2"],
      "goals": ["goal 1", "goal 2"]
    }
  ]
}`;

    const response = await callClaudeAPI("Generate study plan", systemPrompt);
    
    try {
      const cleanedResponse = response.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
      const plan = JSON.parse(cleanedResponse);
      setStudyPlan(plan);
      return plan;
    } catch (e) {
      setStudyPlan({ raw: response });
      return { raw: response };
    }
  };

  // Generate Flashcards
  const generateFlashcards = async (topic, count = 10) => {
    const systemPrompt = `Create ${count} flashcards about: ${topic}
Return JSON array:
[
  {
    "front": "Question or term",
    "back": "Answer or definition",
    "difficulty": "easy/medium/hard",
    "category": "subtopic"
  }
]`;

    const response = await callClaudeAPI(`Generate flashcards`, systemPrompt);
    
    try {
      const cleanedResponse = response.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
      const cards = JSON.parse(cleanedResponse);
      setFlashcards(cards);
      setCurrentFlashcard(0);
      setFlashcardFlipped(false);
      return cards;
    } catch (e) {
      return [];
    }
  };

  // Generate Concept Map
  const generateConceptMap = async (topic) => {
    const systemPrompt = `Create a concept map for: ${topic}
Return JSON:
{
  "central": "main concept",
  "nodes": [
    { "id": 1, "label": "concept", "level": 1, "description": "...", "color": "#3b82f6", "x": 400, "y": 100 }
  ],
  "connections": [
    { "from": 1, "to": 2, "relationship": "causes" }
  ]
}`;

    const response = await callClaudeAPI(`Create concept map`, systemPrompt);
    
    try {
      const cleanedResponse = response.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
      const map = JSON.parse(cleanedResponse);
      setConceptMap(map);
      return map;
    } catch (e) {
      return null;
    }
  };

  // Generate Practice Problems
  const generatePracticeProblems = async (topic, difficulty, count = 5) => {
    const systemPrompt = `Generate ${count} practice problems for: ${topic} at ${difficulty} level.
Return JSON array with problem, solution, and hints.`;

    const response = await callClaudeAPI(`Generate practice problems`, systemPrompt);
    
    try {
      const cleanedResponse = response.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
      const problems = JSON.parse(cleanedResponse);
      setPracticeProblems(problems);
      return problems;
    } catch (e) {
      setPracticeProblems([{ problem: response }]);
      return [{ problem: response }];
    }
  };

  // Enhanced Chat with Context
  const handleEnhancedChat = async (question) => {
    const context = `Topic: ${topicsLibrary[selectedTopic].name}, Level: ${learningPath}, Style: ${studyMode}`;
    const systemPrompt = `You are an expert AI tutor. Context: ${context}

Provide clear, educational responses with:
1. Clear explanations
2. Examples and analogies
3. Follow-up questions
4. Related topics
Be ${aiPersonality} and adapt to the student's level.`;

    const response = await callClaudeAPI(question, systemPrompt);
    
    const userMsg = { role: 'user', content: question, timestamp: Date.now() };
    const aiMsg = { role: 'ai', content: response, timestamp: Date.now() + 1 };
    
    setChatMessages(prev => [...prev, userMsg, aiMsg]);
    
    if (studyMode !== 'visual') {
      speak(response);
    }
    
    return response;
  };

  // ============= SPEECH SYNTHESIS =============
  
  useEffect(() => {
    if ('speechSynthesis' in window) {
      speechSynthRef.current = window.speechSynthesis;
    }
    return () => {
      if (speechSynthRef.current) {
        speechSynthRef.current.cancel();
      }
    };
  }, []);

  const speak = (text) => {
    if (!speechSynthRef.current || !text) return;
    speechSynthRef.current.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.9;
    utterance.pitch = 1.0;
    utterance.volume = 1.0;

    const voices = speechSynthRef.current.getVoices();
    const preferredVoice = voices.find(voice => 
      voice.lang.startsWith('en-') && voice.name.includes('Google')
    ) || voices[0];
    
    if (preferredVoice) utterance.voice = preferredVoice;

    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    speechSynthRef.current.speak(utterance);
  };

  const stopSpeech = () => {
    if (speechSynthRef.current) {
      speechSynthRef.current.cancel();
      setIsSpeaking(false);
    }
  };

  // ============= INITIALIZATION =============
  
  useEffect(() => {
    const events = historicalEvents.map((event, i) => ({
      ...event,
      opacity: 0,
      scale: 0,
      x: 100 + (i * 100)
    }));
    setTimelineEvents(events);
  }, []);

  // ============= LECTURE PROGRESSION =============
  
  useEffect(() => {
    if (!isLecturing) return;
    if (step >= lectureSteps.length) {
      setIsLecturing(false);
      setProgress(100);
      stopSpeech();
      
      setUserProgress(prev => ({
        ...prev,
        lecturesCompleted: prev.lecturesCompleted + 1,
        streak: prev.streak + 1,
        achievements: [...prev.achievements, {
          id: Date.now(),
          title: 'Lecture Complete!',
          icon: '🎓',
          date: new Date().toLocaleDateString()
        }]
      }));
      
      return;
    }

    const currentStep = lectureSteps[step];
    setSpeechText(currentStep.speech);
    setProgress(Math.round((step / lectureSteps.length) * 100));

    if (studyMode !== 'visual') {
      speak(currentStep.speech);
    }

    if (step >= 3) {
      const eventIndex = Math.min(step - 3, historicalEvents.length - 1);
      setTimelineEvents(prev => prev.map((e, i) => 
        i <= eventIndex ? { ...e, opacity: 1, scale: 1 } : e
      ));
    }

    const timer = setTimeout(() => {
      setStep(s => s + 1);
    }, currentStep.duration);

    return () => clearTimeout(timer);
  }, [isLecturing, step, studyMode]);

  // ============= CANVAS RENDERING =============
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    const bgGradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
    bgGradient.addColorStop(0, '#ffffff');
    bgGradient.addColorStop(0.5, '#fffbf5');
    bgGradient.addColorStop(1, '#fef7ed');
    ctx.fillStyle = bgGradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    if (activeMode === 'dashboard') {
      drawDashboard(ctx);
    } else if (activeMode === 'lecture' && isLecturing) {
      if (step >= 1) drawTitle(ctx);
      if (step >= 2) drawDefinition(ctx);
      if (step >= 3) drawTimelineBase(ctx);
      if (step >= 4) drawTimelineEvents(ctx);
    } else if (activeMode === 'progress') {
      drawProgressVisualization(ctx);
    } else if (activeMode === 'concept-map' && conceptMap) {
      drawConceptMap(ctx);
    }

  }, [activeMode, isLecturing, step, timelineEvents, userProgress, conceptMap]);

  // Drawing functions
  const roundRect = (ctx, x, y, width, height, radius) => {
    ctx.beginPath();
    ctx.moveTo(x + radius, y);
    ctx.lineTo(x + width - radius, y);
    ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
    ctx.lineTo(x + width, y + height - radius);
    ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
    ctx.lineTo(x + radius, y + height);
    ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
    ctx.lineTo(x, y + radius);
    ctx.quadraticCurveTo(x, y, x + radius, y);
    ctx.closePath();
  };

  const drawDashboard = (ctx) => {
    ctx.save();
    
    const gradient = ctx.createLinearGradient(0, 50, 0, 100);
    gradient.addColorStop(0, '#dc2626');
    gradient.addColorStop(1, '#991b1b');
    ctx.fillStyle = gradient;
    ctx.font = 'bold 42px Arial';
    ctx.fillText('🤖 AI Tutor Dashboard', 150, 80);
    
    const stats = [
      { label: 'Lectures', value: userProgress.lecturesCompleted, icon: '📚', x: 100, color: '#3b82f6' },
      { label: 'Quizzes', value: userProgress.quizzesCompleted, icon: '✅', x: 300, color: '#10b981' },
      { label: 'Streak', value: userProgress.streak, icon: '🔥', x: 500, color: '#f59e0b' }
    ];
    
    stats.forEach(stat => {
      ctx.fillStyle = stat.color + '20';
      roundRect(ctx, stat.x, 150, 150, 70, 12);
      ctx.fill();
      
      ctx.strokeStyle = stat.color;
      ctx.lineWidth = 2.5;
      roundRect(ctx, stat.x, 150, 150, 70, 12);
      ctx.stroke();
      
      ctx.font = '28px Arial';
      ctx.fillText(stat.icon, stat.x + 15, 188);
      
      ctx.font = 'bold 24px Arial';
      ctx.fillStyle = stat.color;
      ctx.fillText(stat.value, stat.x + 60, 188);
      
      ctx.font = '13px Arial';
      ctx.fillStyle = '#666';
      ctx.fillText(stat.label, stat.x + 60, 208);
    });
    
    ctx.restore();
  };

  const drawProgressVisualization = (ctx) => {
    ctx.save();
    ctx.font = 'bold 32px Arial';
    ctx.fillStyle = '#292524';
    ctx.fillText('📊 Your Learning Journey', 200, 60);
    
    const achievements = userProgress.achievements.slice(-3);
    achievements.forEach((achievement, i) => {
      const y = 120 + (i * 90);
      ctx.fillStyle = '#fef3c7';
      roundRect(ctx, 100, y, 600, 70, 12);
      ctx.fill();
      ctx.strokeStyle = '#f59e0b';
      ctx.lineWidth = 2;
      roundRect(ctx, 100, y, 600, 70, 12);
      ctx.stroke();
      ctx.font = '32px Arial';
      ctx.fillText(achievement.icon, 120, y + 48);
      ctx.font = 'bold 16px Arial';
      ctx.fillStyle = '#78350f';
      ctx.fillText(achievement.title, 170, y + 35);
      ctx.font = '12px Arial';
      ctx.fillStyle = '#92400e';
      ctx.fillText(achievement.date, 170, y + 55);
    });
    ctx.restore();
  };

  const drawTitle = (ctx) => {
    ctx.save();
    const gradient = ctx.createLinearGradient(0, 20, 0, 80);
    gradient.addColorStop(0, topicsLibrary[selectedTopic].color);
    gradient.addColorStop(1, '#7f1d1d');
    ctx.fillStyle = gradient;
    ctx.font = 'bold 52px Arial';
    ctx.fillText(topicsLibrary[selectedTopic].name.toUpperCase(), 180, 55);
    ctx.restore();
  };

  const drawDefinition = (ctx) => {
    ctx.save();
    ctx.fillStyle = '#fef3c7';
    roundRect(ctx, 70, 90, 660, 55, 16);
    ctx.fill();
    ctx.strokeStyle = '#f59e0b';
    ctx.lineWidth = 2.5;
    roundRect(ctx, 70, 90, 660, 55, 16);
    ctx.stroke();
    ctx.font = '22px Arial';
    ctx.fillText(topicsLibrary[selectedTopic].icon, 98, 125);
    ctx.font = 'bold 16px Arial';
    ctx.fillStyle = '#78350f';
    ctx.fillText(`Master ${topicsLibrary[selectedTopic].name} - ${topicsLibrary[selectedTopic].duration}`, 145, 113);
    ctx.restore();
  };

  const drawTimelineBase = (ctx) => {
    ctx.save();
    ctx.fillStyle = '#fafaf9';
    roundRect(ctx, 30, 165, 740, 380, 12);
    ctx.fill();
    ctx.strokeStyle = '#d6d3d1';
    ctx.lineWidth = 3;
    roundRect(ctx, 30, 165, 740, 380, 12);
    ctx.stroke();
    ctx.strokeStyle = '#78716c';
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(80, 355);
    ctx.lineTo(720, 355);
    ctx.stroke();
    ctx.restore();
  };

  const drawTimelineEvents = (ctx) => {
    timelineEvents.forEach((event) => {
      if (event.opacity > 0) {
        ctx.save();
        ctx.globalAlpha = event.opacity;
        const yearRange = 2000 - 1750;
        const yearPosition = ((event.year - 1750) / yearRange) * 640;
        const x = 80 + yearPosition;
        const y = event.y;
        ctx.fillStyle = event.color;
        ctx.beginPath();
        ctx.arc(x, 355, 8 * event.scale, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = event.color;
        ctx.lineWidth = 2;
        ctx.setLineDash([5, 5]);
        ctx.beginPath();
        ctx.moveTo(x, 355);
        ctx.lineTo(x, y + 35);
        ctx.stroke();
        ctx.setLineDash([]);
        ctx.fillStyle = '#ffffff';
        roundRect(ctx, x - 90, y, 180, 70, 10);
        ctx.fill();
        ctx.strokeStyle = event.color;
        ctx.lineWidth = 2.5;
        roundRect(ctx, x - 90, y, 180, 70, 10);
        ctx.stroke();
        ctx.font = '28px Arial';
        ctx.fillText(event.icon, x - 75, y + 42);
        ctx.font = 'bold 13px Arial';
        ctx.fillStyle = event.color;
        ctx.fillText(event.year.toString(), x - 40, y + 28);
        ctx.font = '12px Arial';
        ctx.fillStyle = '#292524';
        ctx.fillText(event.event, x - 40, y + 48);
        ctx.restore();
      }
    });
  };

  const drawConceptMap = (ctx) => {
    if (!conceptMap || !conceptMap.nodes) return;
    ctx.save();
    if (conceptMap.connections) {
      conceptMap.connections.forEach(conn => {
        const fromNode = conceptMap.nodes.find(n => n.id === conn.from);
        const toNode = conceptMap.nodes.find(n => n.id === conn.to);
        if (fromNode && toNode) {
          ctx.strokeStyle = '#cbd5e1';
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.moveTo(fromNode.x || 400, fromNode.y || 300);
          ctx.lineTo(toNode.x || 400, toNode.y || 300);
          ctx.stroke();
        }
      });
    }
    conceptMap.nodes.forEach((node, idx) => {
      const x = node.x || 200 + (idx % 3) * 200;
      const y = node.y || 150 + Math.floor(idx / 3) * 150;
      ctx.fillStyle = node.color || '#3b82f6';
      ctx.beginPath();
      ctx.arc(x, y, 40, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 12px Arial';
      ctx.textAlign = 'center';
      ctx.fillText(node.label.substring(0, 10), x, y);
    });
    ctx.restore();
  };

  // ============= EVENT HANDLERS =============
  
  const handleStartLecture = () => {
    setStep(0);
    setProgress(0);
    setIsLecturing(true);
    setActiveMode('lecture');
    setSpeechText("");
    setTimelineEvents(prev => prev.map(e => ({ ...e, opacity: 0, scale: 0 })));
  };

  const handleStopLecture = () => {
    setIsLecturing(false);
    stopSpeech();
  };

  const handleQuizAnswer = (answerIndex) => {
    const questions = quizState.generatedQuestions;
    if (questions.length === 0) return;
    
    const currentQ = questions[quizState.currentQuestion];
    const isCorrect = answerIndex === currentQ.correct;
    
    setQuizState(prev => ({
      ...prev,
      answers: [...prev.answers, { question: quizState.currentQuestion, answer: answerIndex, correct: isCorrect }],
      score: isCorrect ? prev.score + currentQ.points : prev.score,
      currentQuestion: prev.currentQuestion + 1,
      isComplete: prev.currentQuestion + 1 >= questions.length
    }));

    if (isCorrect) {
      speak("Correct! " + currentQ.explanation);
    } else {
      speak("Not quite. " + currentQ.explanation);
    }

    if (quizState.currentQuestion + 1 >= questions.length) {
      setUserProgress(prev => ({
        ...prev,
        quizzesCompleted: prev.quizzesCompleted + 1,
        totalScore: prev.totalScore + quizState.score
      }));
    }
  };

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async (e) => {
      const text = e.target.result;
      setUploadedDocument(text);
      await analyzeDocument(text);
    };
    reader.readAsText(file);
  };

  // ============= MAIN RENDER =============
  
  return (
    <div style={{ 
      minHeight: '100vh', 
      background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)',
      padding: '15px',
      fontFamily: 'system-ui, -apple-system, sans-serif'
    }}>
      {/* Navigation */}
      <div style={{
        maxWidth: '1400px',
        margin: '0 auto 20px',
        background: 'white',
        borderRadius: '16px',
        padding: '12px 20px',
        display: 'flex',
        gap: '8px',
        boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
        flexWrap: 'wrap'
      }}>
        {[
          { id: 'dashboard', icon: '🏠', label: 'Dashboard' },
          { id: 'lecture', icon: '🎓', label: 'Lecture' },
          { id: 'quiz', icon: '📝', label: 'Quiz' },
          { id: 'chat', icon: '💬', label: 'AI Chat' },
          { id: 'flashcards', icon: '🎴', label: 'Flashcards' },
          { id: 'study-plan', icon: '📅', label: 'Study Plan' },
          { id: 'practice', icon: '🎯', label: 'Practice' },
          { id: 'concept-map', icon: '🗺️', label: 'Concept Map' },
          { id: 'document', icon: '📄', label: 'Document' },
          { id: 'progress', icon: '📊', label: 'Progress' }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => {
              setActiveMode(tab.id);
              if (tab.id !== 'lecture') {
                setIsLecturing(false);
                stopSpeech();
              }
            }}
            style={{
              padding: '10px 16px',
              border: 'none',
              borderRadius: '10px',
              background: activeMode === tab.id ? 'linear-gradient(135deg, #dc2626 0%, #991b1b 100%)' : 'transparent',
              color: activeMode === tab.id ? 'white' : '#64748b',
              cursor: 'pointer',
              fontWeight: '600',
              fontSize: '13px',
              transition: 'all 0.3s'
            }}
          >
            {tab.icon} {tab.label}
          </button>
        ))}
      </div>

      {/* Main Container */}
      <div style={{ 
        maxWidth: '1400px',
        margin: '0 auto',
        background: 'white',
        borderRadius: '24px',
        boxShadow: '0 25px 80px rgba(0,0,0,0.4)',
        overflow: 'hidden'
      }}>
        {/* Header */}
        <div style={{
          background: 'linear-gradient(135deg, #dc2626 0%, #991b1b 100%)',
          padding: '18px 28px',
          color: 'white'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '15px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{
                width: '45px',
                height: '45px',
                background: 'rgba(255,255,255,0.2)',
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '24px'
              }}>
                🤖
              </div>
              <div>
                <h1 style={{ margin: 0, fontSize: '24px', fontWeight: '800' }}>
                  Advanced AI Tutor System
                </h1>
                <p style={{ margin: '2px 0 0 0', opacity: 0.95, fontSize: '13px' }}>
                  Claude-Powered • Multi-Subject • Adaptive • Voice-Enabled
                </p>
              </div>
            </div>
            
            {aiLoading && (
              <div style={{
                background: 'rgba(255,255,255,0.2)',
                padding: '8px 16px',
                borderRadius: '10px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}>
                <div style={{
                  width: '16px',
                  height: '16px',
                  border: '3px solid rgba(255,255,255,0.3)',
                  borderTop: '3px solid white',
                  borderRadius: '50%',
                  animation: 'spin 1s linear infinite'
                }}></div>
                <span style={{ fontSize: '13px', fontWeight: '600' }}>AI Thinking...</span>
              </div>
            )}
            
            {isLecturing && (
              <div style={{
                background: 'rgba(255,255,255,0.2)',
                padding: '8px 16px',
                borderRadius: '10px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}>
                <div style={{
                  width: '8px',
                  height: '8px',
                  background: isSpeaking ? '#10b981' : '#fbbf24',
                  borderRadius: '50%',
                  animation: 'pulse 1.5s ease-in-out infinite'
                }}></div>
                <span style={{ fontSize: '13px', fontWeight: '600' }}>
                  {isSpeaking ? '🔊 SPEAKING' : 'LIVE'} • {progress}%
                </span>
              </div>
            )}
          </div>
          
          {isLecturing && (
            <div style={{
              marginTop: '12px',
              background: 'rgba(255,255,255,0.2)',
              borderRadius: '8px',
              height: '6px',
              overflow: 'hidden'
            }}>
              <div style={{
                height: '100%',
                background: 'linear-gradient(90deg, #fbbf24 0%, #f59e0b 100%)',
                width: `${progress}%`,
                transition: 'width 0.3s ease'
              }}></div>
            </div>
          )}
        </div>

        {/* Content Area */}
        <div style={{ padding: '20px', minHeight: '500px' }}>
          
          {/* Dashboard */}
          {activeMode === 'dashboard' && (
            <div>
              <canvas
                ref={canvasRef}
                width={800}
                height={600}
                style={{ width: '100%', height: 'auto', display: 'block', borderRadius: '12px', marginBottom: '20px' }}
              />
              
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '15px', marginBottom: '30px' }}>
                {[
                  { label: 'Generate Study Plan', icon: '📅', color: '#8b5cf6', action: () => generateStudyPlan() },
                  { label: 'AI Quiz', icon: '🎯', color: '#10b981', action: () => { setActiveMode('quiz'); generateCustomQuiz(topicsLibrary[selectedTopic].name, adaptiveDifficulty, 5); } },
                  { label: 'Concept Map', icon: '🗺️', color: '#3b82f6', action: () => { setActiveMode('concept-map'); generateConceptMap(topicsLibrary[selectedTopic].name); } },
                  { label: 'Flashcards', icon: '🎴', color: '#f59e0b', action: () => { setActiveMode('flashcards'); generateFlashcards(topicsLibrary[selectedTopic].name, 10); } }
                ].map((item, idx) => (
                  <button
                    key={idx}
                    onClick={item.action}
                    disabled={aiLoading}
                    style={{
                      padding: '20px',
                      background: aiLoading ? '#e5e7eb' : `linear-gradient(135deg, ${item.color}, ${item.color}dd)`,
                      color: 'white',
                      border: 'none',
                      borderRadius: '12px',
                      cursor: aiLoading ? 'not-allowed' : 'pointer',
                      fontWeight: '600',
                      fontSize: '14px',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: '8px',
                      transition: 'transform 0.2s',
                      opacity: aiLoading ? 0.6 : 1
                    }}
                    onMouseEnter={(e) => !aiLoading && (e.currentTarget.style.transform = 'translateY(-2px)')}
                    onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                  >
                    <span style={{ fontSize: '32px' }}>{item.icon}</span>
                    <span>{item.label}</span>
                  </button>
                ))}
              </div>

              <h2 style={{ margin: '0 0 15px 0', fontSize: '20px', color: '#1e293b' }}>📚 Explore Subjects</h2>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '15px' }}>
                {Object.entries(topicsLibrary).map(([key, topic]) => (
                  <div
                    key={key}
                    onClick={() => { setSelectedTopic(key); setActiveMode('lecture'); }}
                    style={{
                      padding: '20px',
                      background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
                      borderRadius: '16px',
                      border: `2px solid ${topic.color}`,
                      cursor: 'pointer',
                      transition: 'all 0.3s',
                      boxShadow: '0 4px 12px rgba(0,0,0,0.08)'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateY(-4px)';
                      e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.15)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.08)';
                    }}
                  >
                    <div style={{ fontSize: '40px', marginBottom: '10px' }}>{topic.icon}</div>
                    <h3 style={{ margin: '0 0 8px 0', color: topic.color, fontSize: '18px' }}>{topic.name}</h3>
                    <div style={{ display: 'flex', gap: '10px', fontSize: '12px', color: '#64748b' }}>
                      <span>⏱️ {topic.duration}</span>
                      <span>📊 {topic.difficulty}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Lecture Mode */}
          {activeMode === 'lecture' && (
            <div>
              <div style={{ position: 'relative', borderRadius: '16px', overflow: 'hidden' }}>
                <canvas ref={canvasRef} width={800} height={600} style={{ width: '100%', height: 'auto', display: 'block' }} />
                
                {isLecturing && speechText && (
                  <div style={{
                    position: 'absolute',
                    bottom: '20px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    background: isSpeaking ? 'linear-gradient(135deg, rgba(16,185,129,0.95) 0%, rgba(5,150,105,0.95) 100%)' : 'rgba(15,23,42,0.95)',
                    color: 'white',
                    padding: '12px 24px',
                    borderRadius: '14px',
                    maxWidth: '88%',
                    fontSize: '14px',
                    boxShadow: '0 8px 30px rgba(0,0,0,0.4)',
                    textAlign: 'center'
                  }}>
                    <span style={{ fontSize: '18px', marginRight: '8px' }}>{isSpeaking ? '🔊' : '🎤'}</span>
                    <span>{speechText}</span>
                  </div>
                )}
              </div>

              <div style={{ marginTop: '20px', display: 'flex', gap: '12px', justifyContent: 'center' }}>
                {!isLecturing ? (
                  <button onClick={handleStartLecture} style={{
                    padding: '14px 40px',
                    fontSize: '16px',
                    fontWeight: '700',
                    border: 'none',
                    borderRadius: '12px',
                    background: 'linear-gradient(135deg, #dc2626 0%, #991b1b 100%)',
                    color: 'white',
                    cursor: 'pointer',
                    boxShadow: '0 6px 20px rgba(220, 38, 38, 0.4)'
                  }}>
                    🔊 Start Lecture
                  </button>
                ) : (
                  <button onClick={handleStopLecture} style={{
                    padding: '14px 40px',
                    fontSize: '16px',
                    fontWeight: '700',
                    border: 'none',
                    borderRadius: '12px',
                    background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
                    color: 'white',
                    cursor: 'pointer'
                  }}>
                    ⏹️ Stop
                  </button>
                )}
              </div>
            </div>
          )}

          {/* Quiz Mode */}
          {activeMode === 'quiz' && (
            <div style={{ maxWidth: '700px', margin: '0 auto' }}>
              {quizState.generatedQuestions.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '60px 20px' }}>
                  <div style={{ fontSize: '64px', marginBottom: '20px' }}>🎯</div>
                  <h2 style={{ margin: '0 0 16px 0', color: '#1e293b' }}>AI Quiz Generator</h2>
                  <p style={{ margin: '0 0 30px 0', color: '#64748b', fontSize: '16px' }}>Generate custom quizzes on any topic</p>
                  <button
                    onClick={() => generateCustomQuiz(topicsLibrary[selectedTopic].name, adaptiveDifficulty, 5)}
                    disabled={aiLoading}
                    style={{
                      padding: '14px 40px',
                      fontSize: '16px',
                      fontWeight: '700',
                      border: 'none',
                      borderRadius: '12px',
                      background: aiLoading ? '#94a3b8' : 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                      color: 'white',
                      cursor: aiLoading ? 'not-allowed' : 'pointer'
                    }}
                  >
                    {aiLoading ? 'Generating...' : `Generate Quiz on ${topicsLibrary[selectedTopic].name}`}
                  </button>
                </div>
              ) : !quizState.isComplete ? (
                <div>
                  <div style={{
                    background: 'linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)',
                    padding: '20px',
                    borderRadius: '16px',
                    marginBottom: '20px',
                    border: '2px solid #fbbf24'
                  }}>
                    <div style={{ fontSize: '14px', color: '#78350f', marginBottom: '10px' }}>
                      Question {quizState.currentQuestion + 1} of {quizState.generatedQuestions.length}
                    </div>
                    <h2 style={{ margin: '0 0 10px 0', color: '#92400e' }}>
                      {quizState.generatedQuestions[quizState.currentQuestion].question}
                    </h2>
                    <div style={{ fontSize: '13px', color: '#a16207' }}>
                      Points: {quizState.generatedQuestions[quizState.currentQuestion].points}
                    </div>
                  </div>

                  <div style={{ display: 'grid', gap: '12px' }}>
                    {quizState.generatedQuestions[quizState.currentQuestion].options.map((option, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleQuizAnswer(idx)}
                        style={{
                          padding: '18px 24px',
                          textAlign: 'left',
                          border: '2px solid #e2e8f0',
                          borderRadius: '12px',
                          background: 'white',
                          cursor: 'pointer',
                          fontSize: '15px',
                          fontWeight: '500',
                          transition: 'all 0.3s'
                        }}
                        onMouseEnter={(e) => {
                          e.target.style.borderColor = '#3b82f6';
                          e.target.style.background = '#eff6ff';
                        }}
                        onMouseLeave={(e) => {
                          e.target.style.borderColor = '#e2e8f0';
                          e.target.style.background = 'white';
                        }}
                      >
                        <span style={{ marginRight: '12px', color: '#64748b', fontWeight: '700' }}>
                          {String.fromCharCode(65 + idx)}.
                        </span>
                        {option}
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                <div style={{
                  textAlign: 'center',
                  padding: '40px',
                  background: 'linear-gradient(135deg, #d1fae5 0%, #a7f3d0 100%)',
                  borderRadius: '16px',
                  border: '2px solid #10b981'
                }}>
                  <div style={{ fontSize: '60px', marginBottom: '20px' }}>🎉</div>
                  <h2 style={{ margin: '0 0 10px 0', color: '#065f46' }}>Quiz Complete!</h2>
                  <div style={{ fontSize: '32px', fontWeight: '700', color: '#059669', marginBottom: '20px' }}>
                    Score: {quizState.score} / {quizState.generatedQuestions.reduce((sum, q) => sum + q.points, 0)}
                  </div>
                  <div style={{ marginBottom: '20px' }}>
                    <p style={{ color: '#047857', margin: '5px 0' }}>
                      Correct: {quizState.answers.filter(a => a.correct).length} / {quizState.answers.length}
                    </p>
                  </div>
                  <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
                    <button onClick={() => generateCustomQuiz(topicsLibrary[selectedTopic].name, adaptiveDifficulty, 5)} style={{
                      padding: '12px 32px',
                      fontSize: '15px',
                      fontWeight: '600',
                      border: 'none',
                      borderRadius: '10px',
                      background: '#10b981',
                      color: 'white',
                      cursor: 'pointer'
                    }}>
                      New Quiz
                    </button>
                    <button onClick={() => setActiveMode('dashboard')} style={{
                      padding: '12px 32px',
                      fontSize: '15px',
                      fontWeight: '600',
                      border: '2px solid #10b981',
                      borderRadius: '10px',
                      background: 'white',
                      color: '#10b981',
                      cursor: 'pointer'
                    }}>
                      Dashboard
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* AI Chat Mode */}
          {activeMode === 'chat' && (
            <div style={{ maxWidth: '900px', margin: '0 auto' }}>
              <div style={{
                background: '#f8fafc',
                borderRadius: '16px',
                padding: '20px',
                minHeight: '450px',
                maxHeight: '500px',
                overflowY: 'auto',
                marginBottom: '20px',
                border: '1px solid #e2e8f0'
              }}>
                {chatMessages.length === 0 ? (
                  <div style={{ textAlign: 'center', padding: '60px 20px', color: '#64748b' }}>
                    <div style={{ fontSize: '48px', marginBottom: '20px' }}>🧠</div>
                    <h3 style={{ margin: '0 0 10px 0' }}>Your AI Tutor is Ready!</h3>
                    <p style={{ margin: '0 0 20px 0', fontSize: '14px' }}>
                      Ask anything about your subjects. I can explain concepts, solve problems, and more!
                    </p>
                  </div>
                ) : (
                  chatMessages.map((msg, idx) => (
                    <div key={idx} style={{ marginBottom: '16px', display: 'flex', justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start' }}>
                      <div style={{
                        maxWidth: '75%',
                        padding: '12px 18px',
                        borderRadius: '12px',
                        background: msg.role === 'user' ? 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)' : 'white',
                        color: msg.role === 'user' ? 'white' : '#1e293b',
                        border: msg.role === 'ai' ? '1px solid #e2e8f0' : 'none',
                        whiteSpace: 'pre-wrap'
                      }}>
                        {msg.content}
                      </div>
                    </div>
                  ))
                )}
              </div>

              <div style={{ display: 'flex', gap: '12px' }}>
                <input
                  type="text"
                  value={currentQuestion}
                  onChange={(e) => setCurrentQuestion(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter' && currentQuestion.trim() && !aiLoading) {
                      handleEnhancedChat(currentQuestion);
                      setCurrentQuestion('');
                    }
                  }}
                  placeholder="Ask me anything..."
                  disabled={aiLoading}
                  style={{
                    flex: 1,
                    padding: '14px 20px',
                    borderRadius: '12px',
                    border: '2px solid #e2e8f0',
                    fontSize: '15px',
                    outline: 'none'
                  }}
                />
                <button
                  onClick={() => {
                    if (currentQuestion.trim() && !aiLoading) {
                      handleEnhancedChat(currentQuestion);
                      setCurrentQuestion('');
                    }
                  }}
                  disabled={aiLoading || !currentQuestion.trim()}
                  style={{
                    padding: '14px 32px',
                    border: 'none',
                    borderRadius: '12px',
                    background: aiLoading || !currentQuestion.trim() ? '#94a3b8' : 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
                    color: 'white',
                    cursor: aiLoading || !currentQuestion.trim() ? 'not-allowed' : 'pointer',
                    fontWeight: '600',
                    fontSize: '15px'
                  }}
                >
                  {aiLoading ? '...' : 'Send'}
                </button>
              </div>
            </div>
          )}

          {/* Flashcards Mode */}
          {activeMode === 'flashcards' && (
            <div style={{ maxWidth: '700px', margin: '0 auto' }}>
              {flashcards.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '60px 20px' }}>
                  <div style={{ fontSize: '64px', marginBottom: '20px' }}>🎴</div>
                  <h2 style={{ margin: '0 0 16px 0', color: '#1e293b' }}>AI Flashcard Generator</h2>
                  <p style={{ margin: '0 0 30px 0', color: '#64748b', fontSize: '16px' }}>Generate custom flashcards for any topic</p>
                  <button
                    onClick={() => generateFlashcards(topicsLibrary[selectedTopic].name, 10)}
                    disabled={aiLoading}
                    style={{
                      padding: '14px 40px',
                      fontSize: '16px',
                      fontWeight: '700',
                      border: 'none',
                      borderRadius: '12px',
                      background: aiLoading ? '#94a3b8' : 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
                      color: 'white',
                      cursor: aiLoading ? 'not-allowed' : 'pointer'
                    }}
                  >
                    {aiLoading ? 'Generating...' : 'Generate Flashcards'}
                  </button>
                </div>
              ) : (
                <div>
                  <div
                    onClick={() => setFlashcardFlipped(!flashcardFlipped)}
                    style={{
                      background: 'linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)',
                      padding: '40px',
                      borderRadius: '16px',
                      border: '2px solid #fbbf24',
                      minHeight: '300px',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'center',
                      alignItems: 'center',
                      cursor: 'pointer',
                      marginBottom: '20px',
                      transition: 'transform 0.3s'
                    }}
                  >
                    <div style={{
                      fontSize: '20px',
                      color: '#78350f',
                      fontWeight: '600',
                      textAlign: 'center',
                      lineHeight: '1.6'
                    }}>
                      {flashcardFlipped 
                        ? flashcards[currentFlashcard].back 
                        : flashcards[currentFlashcard].front
                      }
                    </div>
                    <div style={{ marginTop: '20px', fontSize: '14px', color: '#92400e', opacity: 0.7 }}>
                      Click to flip
                    </div>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
                    <button
                      onClick={() => {
                        setCurrentFlashcard(Math.max(0, currentFlashcard - 1));
                        setFlashcardFlipped(false);
                      }}
                      disabled={currentFlashcard === 0}
                      style={{
                        padding: '12px 24px',
                        border: 'none',
                        borderRadius: '10px',
                        background: currentFlashcard === 0 ? '#e2e8f0' : '#3b82f6',
                        color: 'white',
                        cursor: currentFlashcard === 0 ? 'not-allowed' : 'pointer',
                        fontWeight: '600'
                      }}
                    >
                      ← Previous
                    </button>
                    
                    <div style={{ fontSize: '14px', color: '#64748b', fontWeight: '600' }}>
                      {currentFlashcard + 1} / {flashcards.length}
                    </div>
                    
                    <button
                      onClick={() => {
                        setCurrentFlashcard(Math.min(flashcards.length - 1, currentFlashcard + 1));
                        setFlashcardFlipped(false);
                      }}
                      disabled={currentFlashcard === flashcards.length - 1}
                      style={{
                        padding: '12px 24px',
                        border: 'none',
                        borderRadius: '10px',
                        background: currentFlashcard === flashcards.length - 1 ? '#e2e8f0' : '#3b82f6',
                        color: 'white',
                        cursor: currentFlashcard === flashcards.length - 1 ? 'not-allowed' : 'pointer',
                        fontWeight: '600'
                      }}
                    >
                      Next →
                    </button>
                  </div>

                  <button
                    onClick={() => {
                      setFlashcards([]);
                      setCurrentFlashcard(0);
                      setFlashcardFlipped(false);
                    }}
                    style={{
                      width: '100%',
                      padding: '12px',
                      border: '2px solid #f59e0b',
                      borderRadius: '10px',
                      background: 'white',
                      color: '#f59e0b',
                      cursor: 'pointer',
                      fontWeight: '600'
                    }}
                  >
                    Generate New Set
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Study Plan Mode */}
          {activeMode === 'study-plan' && (
            <div style={{ maxWidth: '900px', margin: '0 auto' }}>
              {!studyPlan ? (
                <div style={{ textAlign: 'center', padding: '60px 20px' }}>
                  <div style={{ fontSize: '64px', marginBottom: '20px' }}>📅</div>
                  <h2 style={{ margin: '0 0 16px 0', color: '#1e293b' }}>Personalized Study Plan</h2>
                  <p style={{ margin: '0 0 30px 0', color: '#64748b', fontSize: '16px' }}>AI creates a custom 7-day study plan based on your goals</p>
                  <button
                    onClick={generateStudyPlan}
                    disabled={aiLoading}
                    style={{
                      padding: '14px 40px',
                      fontSize: '16px',
                      fontWeight: '700',
                      border: 'none',
                      borderRadius: '12px',
                      background: aiLoading ? '#94a3b8' : 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)',
                      color: 'white',
                      cursor: aiLoading ? 'not-allowed' : 'pointer'
                    }}
                  >
                    {aiLoading ? 'Creating...' : 'Generate Study Plan'}
                  </button>
                </div>
              ) : (
                <div>
                  <h2 style={{ margin: '0 0 20px 0', color: '#1e293b', textAlign: 'center' }}>📅 Your 7-Day Study Plan</h2>
                  
                  {studyPlan.week ? (
                    <div style={{ display: 'grid', gap: '15px' }}>
                      {studyPlan.week.map((day, idx) => (
                        <div key={idx} style={{
                          padding: '20px',
                          background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
                          borderRadius: '12px',
                          border: '2px solid #e2e8f0'
                        }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                            <h3 style={{ margin: 0, color: '#1e293b' }}>Day {day.day}: {day.focus}</h3>
                            <div style={{
                              padding: '6px 12px',
                              background: '#eff6ff',
                              borderRadius: '8px',
                              fontSize: '13px',
                              color: '#1e40af',
                              fontWeight: '600'
                            }}>
                              {day.duration} min
                            </div>
                          </div>
                          <div style={{ marginBottom: '10px' }}>
                            <strong style={{ color: '#475569', fontSize: '14px' }}>Activities:</strong>
                            <ul style={{ margin: '5px 0', paddingLeft: '20px', color: '#64748b' }}>
                              {day.activities.map((activity, i) => (
                                <li key={i} style={{ fontSize: '14px', marginBottom: '4px' }}>{activity}</li>
                              ))}
                            </ul>
                          </div>
                          <div>
                            <strong style={{ color: '#475569', fontSize: '14px' }}>Goals:</strong>
                            <ul style={{ margin: '5px 0', paddingLeft: '20px', color: '#64748b' }}>
                              {day.goals.map((goal, i) => (
                                <li key={i} style={{ fontSize: '14px', marginBottom: '4px' }}>{goal}</li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div style={{
                      padding: '30px',
                      background: '#f8fafc',
                      borderRadius: '12px',
                      whiteSpace: 'pre-wrap',
                      color: '#1e293b',
                      fontSize: '14px',
                      lineHeight: '1.8'
                    }}>
                      {studyPlan.raw}
                    </div>
                  )}
                  
                  <button onClick={() => setStudyPlan(null)} style={{
                    width: '100%',
                    marginTop: '20px',
                    padding: '12px',
                    border: '2px solid #8b5cf6',
                    borderRadius: '10px',
                    background: 'white',
                    color: '#8b5cf6',
                    cursor: 'pointer',
                    fontWeight: '600'
                  }}>
                    Generate New Plan
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Concept Map Mode */}
          {activeMode === 'concept-map' && (
            <div>
              {!conceptMap ? (
                <div style={{ textAlign: 'center', padding: '60px 20px' }}>
                  <div style={{ fontSize: '64px', marginBottom: '20px' }}>🗺️</div>
                  <h2 style={{ margin: '0 0 16px 0', color: '#1e293b' }}>Visual Concept Map</h2>
                  <p style={{ margin: '0 0 30px 0', color: '#64748b', fontSize: '16px' }}>Generate an interactive concept map</p>
                  <button
                    onClick={() => generateConceptMap(topicsLibrary[selectedTopic].name)}
                    disabled={aiLoading}
                    style={{
                      padding: '14px 40px',
                      fontSize: '16px',
                      fontWeight: '700',
                      border: 'none',
                      borderRadius: '12px',
                      background: aiLoading ? '#94a3b8' : 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
                      color: 'white',
                      cursor: aiLoading ? 'not-allowed' : 'pointer'
                    }}
                  >
                    {aiLoading ? 'Generating...' : 'Create Concept Map'}
                  </button>
                </div>
              ) : (
                <div>
                  <canvas ref={canvasRef} width={800} height={600} style={{ width: '100%', height: 'auto', display: 'block', borderRadius: '12px' }} />
                  <button onClick={() => setConceptMap(null)} style={{
                    width: '100%',
                    marginTop: '20px',
                    padding: '12px',
                    border: '2px solid #3b82f6',
                    borderRadius: '10px',
                    background: 'white',
                    color: '#3b82f6',
                    cursor: 'pointer',
                    fontWeight: '600'
                  }}>
                    Generate New Map
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Document Analysis Mode */}
          {activeMode === 'document' && (
            <div style={{ maxWidth: '900px', margin: '0 auto' }}>
              <div style={{ textAlign: 'center', marginBottom: '30px' }}>
                <div style={{ fontSize: '64px', marginBottom: '20px' }}>📄</div>
                <h2 style={{ margin: '0 0 16px 0', color: '#1e293b' }}>Document Analysis</h2>
                <p style={{ margin: '0 0 20px 0', color: '#64748b', fontSize: '16px' }}>
                  Upload any document and I'll analyze it and create study materials
                </p>
                
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".txt,.md"
                  onChange={handleFileUpload}
                  style={{ display: 'none' }}
                  id="file-upload"
                />
                <label
                  htmlFor="file-upload"
                  style={{
                    display: 'inline-block',
                    padding: '14px 40px',
                    fontSize: '16px',
                    fontWeight: '700',
                    border: 'none',
                    borderRadius: '12px',
                    background: 'linear-gradient(135deg, #ec4899 0%, #db2777 100%)',
                    color: 'white',
                    cursor: 'pointer'
                  }}
                >
                  📤 Upload Document
                </label>
              </div>

              {documentAnalysis && (
                <div style={{
                  padding: '30px',
                  background: '#f8fafc',
                  borderRadius: '16px',
                  border: '2px solid #e2e8f0'
                }}>
                  <h3 style={{ margin: '0 0 20px 0', color: '#1e293b' }}>📊 Analysis Results</h3>
                  
                  {documentAnalysis.topics && (
                    <div style={{ marginBottom: '20px' }}>
                      <strong style={{ color: '#475569' }}>Main Topics:</strong>
                      <ul style={{ color: '#64748b', marginTop: '8px' }}>
                        {documentAnalysis.topics.map((topic, i) => (
                          <li key={i}>{topic}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                  
                  {documentAnalysis.difficulty && (
                    <div style={{ marginBottom: '20px' }}>
                      <strong style={{ color: '#475569' }}>Difficulty:</strong>
                      <span style={{ 
                        marginLeft: '10px',
                        padding: '4px 12px',
                        background: '#eff6ff',
                        borderRadius: '6px',
                        color: '#1e40af',
                        fontSize: '14px',
                        fontWeight: '600'
                      }}>
                        {documentAnalysis.difficulty}
                      </span>
                    </div>
                  )}
                  
                  {documentAnalysis.raw && (
                    <div style={{
                      marginTop: '20px',
                      padding: '20px',
                      background: 'white',
                      borderRadius: '12px',
                      whiteSpace: 'pre-wrap',
                      fontSize: '14px',
                      color: '#1e293b',
                      lineHeight: '1.8'
                    }}>
                      {documentAnalysis.raw}
                    </div>
                  )}
                  
                  <div style={{ marginTop: '20px', display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                    <button
                      onClick={() => {
                        if (documentAnalysis.questions) {
                          setQuizState({
                            generatedQuestions: documentAnalysis.questions,
                            currentQuestion: 0,
                            score: 0,
                            answers: [],
                            isComplete: false
                          });
                          setActiveMode('quiz');
                        }
                      }}
                      style={{
                        padding: '12px 24px',
                        border: 'none',
                        borderRadius: '10px',
                        background: '#10b981',
                        color: 'white',
                        cursor: 'pointer',
                        fontWeight: '600'
                      }}
                    >
                      📝 Take Quiz
                    </button>
                    
                    <button
                      onClick={() => {
                        generateFlashcards(`Content: ${uploadedDocument.substring(0, 500)}`, 10);
                        setActiveMode('flashcards');
                      }}
                      style={{
                        padding: '12px 24px',
                        border: 'none',
                        borderRadius: '10px',
                        background: '#f59e0b',
                        color: 'white',
                        cursor: 'pointer',
                        fontWeight: '600'
                      }}
                    >
                      🎴 Create Flashcards
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Progress Mode */}
          {activeMode === 'progress' && (
            <div>
              <canvas ref={canvasRef} width={800} height={600} style={{ width: '100%', height: 'auto', display: 'block', borderRadius: '12px', marginBottom: '20px' }} />
              
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '15px' }}>
                {[
                  { label: 'Lectures', value: userProgress.lecturesCompleted, icon: '📚', color: '#3b82f6' },
                  { label: 'Quizzes', value: userProgress.quizzesCompleted, icon: '✅', color: '#10b981' },
                  { label: 'Streak', value: userProgress.streak, icon: '🔥', color: '#f59e0b' },
                  { label: 'Points', value: userProgress.totalScore, icon: '💯', color: '#ec4899' }
                ].map((stat, idx) => (
                  <div key={idx} style={{
                    padding: '20px',
                    background: `linear-gradient(135deg, ${stat.color}20, ${stat.color}40)`,
                    borderRadius: '12px',
                    border: `2px solid ${stat.color}`
                  }}>
                    <div style={{ fontSize: '32px', marginBottom: '10px' }}>{stat.icon}</div>
                    <div style={{ fontSize: '28px', fontWeight: '700', color: stat.color, marginBottom: '5px' }}>{stat.value}</div>
                    <div style={{ color: '#475569', fontSize: '14px' }}>{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Practice Mode */}
          {activeMode === 'practice' && (
            <div style={{ textAlign: 'center', padding: '60px 20px' }}>
              <div style={{ fontSize: '64px', marginBottom: '20px' }}>🎯</div>
              <h2 style={{ margin: '0 0 16px 0', color: '#1e293b' }}>Practice Problems</h2>
              <p style={{ margin: '0 0 30px 0', color: '#64748b', fontSize: '16px' }}>Generate custom practice problems</p>
              
              {practiceProblems.length === 0 ? (
                <button
                  onClick={() => generatePracticeProblems(topicsLibrary[selectedTopic].name, adaptiveDifficulty, 5)}
                  disabled={aiLoading}
                  style={{
                    padding: '14px 40px',
                    fontSize: '16px',
                    fontWeight: '700',
                    border: 'none',
                    borderRadius: '12px',
                    background: aiLoading ? '#94a3b8' : 'linear-gradient(135deg, #06b6d4 0%, #0891b2 100%)',
                    color: 'white',
                    cursor: aiLoading ? 'not-allowed' : 'pointer'
                  }}
                >
                  {aiLoading ? 'Generating...' : 'Generate Practice Problems'}
                </button>
              ) : (
                <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'left' }}>
                  {practiceProblems.map((problem, idx) => (
                    <div key={idx} style={{
                      marginBottom: '20px',
                      padding: '20px',
                      background: 'white',
                      borderRadius: '12px',
                      border: '2px solid #e2e8f0'
                    }}>
                      <h3 style={{ color: '#1e293b', marginBottom: '15px' }}>Problem {idx + 1}</h3>
                      <div style={{ padding: '15px', background: '#f8fafc', borderRadius: '8px', whiteSpace: 'pre-wrap' }}>
                        {typeof problem === 'string' ? problem : problem.problem || JSON.stringify(problem)}
                      </div>
                    </div>
                  ))}
                  <button onClick={() => setPracticeProblems([])} style={{
                    width: '100%',
                    padding: '12px',
                    border: '2px solid #06b6d4',
                    borderRadius: '10px',
                    background: 'white',
                    color: '#06b6d4',
                    cursor: 'pointer',
                    fontWeight: '600'
                  }}>
                    Generate New Problems
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Settings Footer */}
        <div style={{
          padding: '18px 24px',
          borderTop: '1px solid #e2e8f0',
          background: 'white',
          display: 'flex',
          flexWrap: 'wrap',
          gap: '20px',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <div style={{ display: 'flex', gap: '15px', alignItems: 'center', flexWrap: 'wrap' }}>
            {[
              { label: 'Study Mode', value: studyMode, onChange: setStudyMode, options: [
                { value: 'visual', label: '🎨 Visual' },
                { value: 'audio', label: '🔊 Audio' },
                { value: 'interactive', label: '🎮 Interactive' },
                { value: 'mixed', label: '🌟 Mixed' }
              ]},
              { label: 'Difficulty', value: adaptiveDifficulty, onChange: setAdaptiveDifficulty, options: [
                { value: 'easy', label: '⭐ Easy' },
                { value: 'medium', label: '⭐⭐ Medium' },
                { value: 'hard', label: '⭐⭐⭐ Hard' }
              ]},
              { label: 'Learning Path', value: learningPath, onChange: setLearningPath, options: [
                { value: 'beginner', label: '🌱 Beginner' },
                { value: 'intermediate', label: '📚 Intermediate' },
                { value: 'advanced', label: '🎓 Advanced' },
                { value: 'expert', label: '🏆 Expert' }
              ]},
              { label: 'AI Personality', value: aiPersonality, onChange: setAiPersonality, options: [
                { value: 'friendly', label: '😊 Friendly' },
                { value: 'professional', label: '👔 Professional' },
                { value: 'encouraging', label: '💪 Encouraging' },
                { value: 'scholarly', label: '🎓 Scholarly' }
              ]}
            ].map((setting, idx) => (
              <div key={idx}>
                <label style={{ fontSize: '12px', color: '#64748b', marginBottom: '4px', display: 'block' }}>
                  {setting.label}
                </label>
                <select
                  value={setting.value}
                  onChange={(e) => setting.onChange(e.target.value)}
                  style={{
                    padding: '8px 12px',
                    borderRadius: '8px',
                    border: '1px solid #e2e8f0',
                    fontSize: '13px',
                    fontWeight: '500',
                    cursor: 'pointer'
                  }}
                >
                  {setting.options.map(opt => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                  ))}
                </select>
              </div>
            ))}
          </div>

          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            {[
              { label: `🔥 ${userProgress.streak} Day Streak`, bg: '#fef3c7', border: '#fbbf24', color: '#78350f' },
              { label: `📚 ${userProgress.lecturesCompleted} Lectures`, bg: '#dbeafe', border: '#3b82f6', color: '#1e3a8a' },
              { label: `💯 ${userProgress.totalScore} Points`, bg: '#d1fae5', border: '#10b981', color: '#065f46' }
            ].map((badge, idx) => (
              <div key={idx} style={{
                padding: '10px 16px',
                background: badge.bg,
                borderRadius: '10px',
                border: `2px solid ${badge.border}`,
                fontSize: '13px',
                fontWeight: '600',
                color: badge.color
              }}>
                {badge.label}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div style={{
        maxWidth: '1400px',
        margin: '20px auto 0',
        padding: '15px',
        textAlign: 'center',
        color: 'rgba(255,255,255,0.7)',
        fontSize: '13px'
      }}>
        <p style={{ margin: '0 0 8px 0' }}>🤖 Powered by Claude AI | Advanced Learning System</p>
        <p style={{ margin: 0, fontSize: '12px', opacity: 0.8 }}>
          Features: Document Analysis • Custom Quizzes • Flashcards • Study Plans • Concept Maps • Practice Problems • AI Chat
        </p>
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.6; transform: scale(1.3); }
        }
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}