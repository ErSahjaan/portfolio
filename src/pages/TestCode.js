import React, { useEffect, useRef, useState } from "react";

export default function ModernHistoryVoiceLecture() {
  const canvasRef = useRef(null);
  const [isLecturing, setIsLecturing] = useState(false);
  const [step, setStep] = useState(0);
  const [timelineEvents, setTimelineEvents] = useState([]);
  const [speechText, setSpeechText] = useState("");
  const [progress, setProgress] = useState(0);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const animationRef = useRef(null);
  const speechSynthRef = useRef(null);

  // Historical events for timeline
  const historicalEvents = [
    { year: 1789, event: "French Revolution", color: '#ef4444', icon: '🇫🇷', y: 200 },
    { year: 1848, event: "Revolutions of 1848", color: '#f59e0b', icon: '⚔️', y: 250 },
    { year: 1914, event: "World War I", color: '#dc2626', icon: '🪖', y: 300 },
    { year: 1939, event: "World War II", color: '#991b1b', icon: '✈️', y: 350 },
    { year: 1945, event: "Cold War Begins", color: '#3b82f6', icon: '❄️', y: 400 },
    { year: 1989, event: "Fall of Berlin Wall", color: '#10b981', icon: '🧱', y: 450 }
  ];

  // Teaching steps with natural speech
  const lectureSteps = [
    { 
      action: "intro", 
      speech: "Welcome to Modern History! Let's journey through the transformative events that shaped our world.",
      duration: 4000 
    },
    { 
      action: "title", 
      text: "MODERN HISTORY",
      speech: "Modern History. The era from 1750 to present day that revolutionized human civilization.",
      duration: 4500 
    },
    { 
      action: "definition", 
      speech: "This period witnessed unprecedented technological advancement, political upheaval, and social transformation.",
      duration: 4500 
    },
    { 
      action: "timeline_intro", 
      speech: "Let's visualize history as a timeline, where each event builds upon the last.",
      duration: 4000 
    },
    { 
      action: "industrial_revolution", 
      speech: "It began with the Industrial Revolution in the late 1700s, transforming economies from agriculture to manufacturing.",
      duration: 5000 
    },
    { 
      action: "french_revolution", 
      speech: "1789. The French Revolution challenged monarchy and birthed modern democracy and human rights.",
      duration: 5000 
    },
    { 
      action: "napoleonic_era", 
      speech: "Napoleon's conquests spread revolutionary ideals across Europe, reshaping the continent forever.",
      duration: 4500 
    },
    { 
      action: "industrial_age", 
      speech: "The 1800s saw steam engines, railways, and factories revolutionize daily life and global trade.",
      duration: 4500 
    },
    { 
      action: "imperialism", 
      speech: "European powers colonized much of Africa and Asia, creating a truly global economy.",
      duration: 4500 
    },
    { 
      action: "world_war_one", 
      speech: "1914. World War One. The Great War that shattered empires and killed millions.",
      duration: 5000 
    },
    { 
      action: "interwar", 
      speech: "The interwar period brought economic depression, the rise of totalitarian regimes, and growing tensions.",
      duration: 4500 
    },
    { 
      action: "world_war_two", 
      speech: "1939 to 1945. World War Two became the deadliest conflict in human history, reshaping the global order.",
      duration: 5000 
    },
    { 
      action: "cold_war", 
      speech: "The Cold War divided the world between capitalism and communism for nearly five decades.",
      duration: 4500 
    },
    { 
      action: "decolonization", 
      speech: "Africa and Asia gained independence, creating dozens of new nations in the 1950s and 60s.",
      duration: 4500 
    },
    { 
      action: "space_age", 
      speech: "Humanity reached for the stars, landing on the moon in 1969. A pinnacle of human achievement.",
      duration: 4500 
    },
    { 
      action: "berlin_wall", 
      speech: "1989. The fall of the Berlin Wall symbolized the end of the Cold War and a new world order.",
      duration: 4500 
    },
    { 
      action: "digital_age", 
      speech: "The internet and digital revolution transformed communication, commerce, and culture globally.",
      duration: 4500 
    },
    { 
      action: "modern_era", 
      speech: "Today's world faces new challenges. Climate change, globalization, and technological disruption.",
      duration: 4500 
    },
    { 
      action: "conclusion", 
      speech: "Understanding modern history helps us comprehend our present and shape our future.",
      duration: 4000 
    },
    { 
      action: "end", 
      speech: "Thank you for this journey through modern history! Restart anytime to review.",
      duration: 3500 
    }
  ];

  // Initialize speech synthesis
  useEffect(() => {
    if ('speechSynthesis' in window) {
      speechSynthRef.current = window.speechSynthesis;
    } else {
      console.warn('Speech synthesis not supported');
    }

    return () => {
      if (speechSynthRef.current) {
        speechSynthRef.current.cancel();
      }
    };
  }, []);

  // Speak function
  const speak = (text) => {
    if (!speechSynthRef.current) return;

    // Cancel any ongoing speech
    speechSynthRef.current.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    
    // Configure voice settings
    utterance.rate = 0.9; // Slightly slower for clarity
    utterance.pitch = 1.0;
    utterance.volume = 1.0;

    // Try to get a good English voice
    const voices = speechSynthRef.current.getVoices();
    const englishVoice = voices.find(voice => 
      voice.lang.startsWith('en-') && voice.name.includes('Google')
    ) || voices.find(voice => voice.lang.startsWith('en-')) || voices[0];
    
    if (englishVoice) {
      utterance.voice = englishVoice;
    }

    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    speechSynthRef.current.speak(utterance);
  };

  // Stop speech
  const stopSpeech = () => {
    if (speechSynthRef.current) {
      speechSynthRef.current.cancel();
      setIsSpeaking(false);
    }
  };

  // Initialize timeline events
  useEffect(() => {
    const events = historicalEvents.map((event, i) => ({
      ...event,
      opacity: 0,
      scale: 0,
      x: 100 + (i * 100)
    }));
    setTimelineEvents(events);
  }, []);

  // Lecture progression
  useEffect(() => {
    if (!isLecturing) return;
    if (step >= lectureSteps.length) {
      setIsLecturing(false);
      setProgress(100);
      stopSpeech();
      return;
    }

    const currentStep = lectureSteps[step];
    setSpeechText(currentStep.speech);
    setProgress(Math.round((step / lectureSteps.length) * 100));

    // Speak the text
    speak(currentStep.speech);

    // Show timeline events progressively
    if (step >= 5) {
      const eventIndex = Math.min(step - 5, historicalEvents.length - 1);
      setTimelineEvents(prev => prev.map((e, i) => 
        i <= eventIndex ? { ...e, opacity: 1, scale: 1 } : e
      ));
    }

    const timer = setTimeout(() => {
      setStep(s => s + 1);
    }, currentStep.duration);

    return () => clearTimeout(timer);
  }, [isLecturing, step]);

  // Canvas rendering
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    // Background
    const bgGradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
    bgGradient.addColorStop(0, '#ffffff');
    bgGradient.addColorStop(0.5, '#fffbf5');
    bgGradient.addColorStop(1, '#fef7ed');
    ctx.fillStyle = bgGradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Subtle grid
    if (isLecturing) {
      ctx.strokeStyle = 'rgba(200, 180, 150, 0.1)';
      ctx.lineWidth = 1;
      for (let i = 0; i < canvas.width; i += 40) {
        ctx.beginPath();
        ctx.moveTo(i, 0);
        ctx.lineTo(i, canvas.height);
        ctx.stroke();
      }
      for (let i = 0; i < canvas.height; i += 40) {
        ctx.beginPath();
        ctx.moveTo(0, i);
        ctx.lineTo(canvas.width, i);
        ctx.stroke();
      }
    }

    if (!isLecturing || step === 0) return;

    if (step >= 1) drawTitle(ctx);
    if (step >= 2) drawDefinition(ctx);
    if (step >= 3) drawTimelineBase(ctx);
    if (step >= 4) drawIndustrialRevolution(ctx);
    if (step >= 5) drawTimelineEvents(ctx);
    if (step >= 10) drawWorldWarSection(ctx);
    if (step >= 13) drawColdWarSection(ctx);
    if (step >= 16) drawModernEra(ctx);

  }, [isLecturing, step, timelineEvents]);

  const drawTitle = (ctx) => {
    ctx.save();
    
    for (let i = 6; i > 0; i--) {
      ctx.fillStyle = `rgba(180, 83, 9, ${0.08 * i})`;
      ctx.font = 'bold 52px "Segoe UI", Arial, sans-serif';
      ctx.fillText('MODERN HISTORY', 180 + i, 55 + i);
    }
    
    const titleGradient = ctx.createLinearGradient(0, 20, 0, 80);
    titleGradient.addColorStop(0, '#dc2626');
    titleGradient.addColorStop(0.4, '#b91c1c');
    titleGradient.addColorStop(0.7, '#991b1b');
    titleGradient.addColorStop(1, '#7f1d1d');
    ctx.fillStyle = titleGradient;
    ctx.font = 'bold 52px "Segoe UI", Arial, sans-serif';
    ctx.fillText('MODERN HISTORY', 180, 55);
    
    const shineGradient = ctx.createLinearGradient(0, 20, 0, 50);
    shineGradient.addColorStop(0, 'rgba(255, 255, 255, 0.4)');
    shineGradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
    ctx.fillStyle = shineGradient;
    ctx.font = 'bold 52px "Segoe UI", Arial, sans-serif';
    ctx.fillText('MODERN HISTORY', 178, 53);
    
    const lineGradient = ctx.createLinearGradient(180, 70, 620, 70);
    lineGradient.addColorStop(0, 'rgba(220, 38, 38, 0)');
    lineGradient.addColorStop(0.5, '#dc2626');
    lineGradient.addColorStop(1, 'rgba(220, 38, 38, 0)');
    ctx.strokeStyle = lineGradient;
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(180, 70);
    ctx.lineTo(620, 70);
    ctx.stroke();
    
    ctx.restore();
  };

  const drawDefinition = (ctx) => {
    ctx.save();
    
    ctx.shadowColor = 'rgba(180, 83, 9, 0.2)';
    ctx.shadowBlur = 20;
    ctx.shadowOffsetY = 6;
    
    const cardGradient = ctx.createLinearGradient(0, 90, 0, 145);
    cardGradient.addColorStop(0, '#ffffff');
    cardGradient.addColorStop(1, '#fef3c7');
    ctx.fillStyle = cardGradient;
    roundRect(ctx, 70, 90, 660, 55, 16);
    ctx.fill();
    
    const borderGradient = ctx.createLinearGradient(70, 90, 730, 90);
    borderGradient.addColorStop(0, '#fbbf24');
    borderGradient.addColorStop(0.5, '#f59e0b');
    borderGradient.addColorStop(1, '#fbbf24');
    ctx.strokeStyle = borderGradient;
    ctx.lineWidth = 2.5;
    ctx.shadowBlur = 0;
    roundRect(ctx, 70, 90, 660, 55, 16);
    ctx.stroke();
    
    ctx.fillStyle = '#fef3c7';
    ctx.beginPath();
    ctx.arc(110, 117, 20, 0, Math.PI * 2);
    ctx.fill();
    
    ctx.strokeStyle = '#f59e0b';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(110, 117, 20, 0, Math.PI * 2);
    ctx.stroke();
    
    ctx.font = '22px Arial';
    ctx.fillText('📜', 98, 125);
    
    ctx.font = 'bold 16px "Segoe UI", Arial, sans-serif';
    ctx.fillStyle = '#78350f';
    ctx.fillText('1750 - Present: Era of Revolution, Industrialization & Global Transformation', 145, 113);
    
    ctx.font = '13px "Segoe UI", Arial, sans-serif';
    ctx.fillStyle = '#92400e';
    ctx.fillText('From horse-drawn carriages to space exploration', 145, 130);
    
    ctx.restore();
  };

  const drawTimelineBase = (ctx) => {
    ctx.save();
    
    ctx.shadowColor = 'rgba(0, 0, 0, 0.1)';
    ctx.shadowBlur = 20;
    ctx.shadowOffsetY = 8;
    
    const containerGradient = ctx.createLinearGradient(0, 165, 0, 545);
    containerGradient.addColorStop(0, '#ffffff');
    containerGradient.addColorStop(1, '#fafaf9');
    ctx.fillStyle = containerGradient;
    roundRect(ctx, 30, 165, 740, 380, 12);
    ctx.fill();
    
    ctx.strokeStyle = '#d6d3d1';
    ctx.lineWidth = 3;
    ctx.shadowBlur = 0;
    roundRect(ctx, 30, 165, 740, 380, 12);
    ctx.stroke();
    
    ctx.strokeStyle = '#78716c';
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(80, 355);
    ctx.lineTo(720, 355);
    ctx.stroke();
    
    const years = [1750, 1800, 1850, 1900, 1950, 2000];
    ctx.font = 'bold 13px "Segoe UI", Arial, sans-serif';
    ctx.fillStyle = '#57534e';
    
    years.forEach((year, i) => {
      const x = 80 + (i * 128);
      
      ctx.strokeStyle = '#a8a29e';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(x, 345);
      ctx.lineTo(x, 365);
      ctx.stroke();
      
      ctx.fillText(year, x - 18, 385);
    });
    
    ctx.font = 'bold 18px "Segoe UI", Arial, sans-serif';
    ctx.fillStyle = '#292524';
    ctx.fillText('Timeline of Modern History', 290, 195);
    
    ctx.restore();
  };

  const drawIndustrialRevolution = (ctx) => {
    ctx.save();
    
    ctx.shadowColor = 'rgba(99, 102, 241, 0.3)';
    ctx.shadowBlur = 15;
    
    const cardGradient = ctx.createLinearGradient(0, 215, 0, 265);
    cardGradient.addColorStop(0, '#eef2ff');
    cardGradient.addColorStop(1, '#ddd6fe');
    ctx.fillStyle = cardGradient;
    roundRect(ctx, 80, 215, 280, 50, 12);
    ctx.fill();
    
    ctx.strokeStyle = '#6366f1';
    ctx.lineWidth = 2.5;
    ctx.shadowBlur = 0;
    roundRect(ctx, 80, 215, 280, 50, 12);
    ctx.stroke();
    
    ctx.font = '24px Arial';
    ctx.fillText('⚙️', 95, 248);
    
    ctx.font = 'bold 15px "Segoe UI", Arial, sans-serif';
    ctx.fillStyle = '#312e81';
    ctx.fillText('Industrial Revolution', 130, 237);
    
    ctx.font = '12px "Segoe UI", Arial, sans-serif';
    ctx.fillStyle = '#4338ca';
    ctx.fillText('1750-1850: Steam & Machinery', 130, 253);
    
    ctx.restore();
  };

  const drawTimelineEvents = (ctx) => {
    timelineEvents.forEach((event, index) => {
      if (event.opacity > 0) {
        ctx.save();
        ctx.globalAlpha = event.opacity;
        
        const yearRange = 2000 - 1750;
        const yearPosition = ((event.year - 1750) / yearRange) * 640;
        const x = 80 + yearPosition;
        const y = event.y;
        
        ctx.shadowColor = event.color + '80';
        ctx.shadowBlur = 15;
        
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
        
        ctx.shadowBlur = 12;
        const cardGradient = ctx.createLinearGradient(0, y, 0, y + 70);
        cardGradient.addColorStop(0, '#ffffff');
        cardGradient.addColorStop(1, event.color + '20');
        ctx.fillStyle = cardGradient;
        roundRect(ctx, x - 90, y, 180, 70, 10);
        ctx.fill();
        
        ctx.strokeStyle = event.color;
        ctx.lineWidth = 2.5;
        ctx.shadowBlur = 0;
        roundRect(ctx, x - 90, y, 180, 70, 10);
        ctx.stroke();
        
        ctx.font = '28px Arial';
        ctx.fillText(event.icon, x - 75, y + 42);
        
        ctx.font = 'bold 13px "Segoe UI", Arial, sans-serif';
        ctx.fillStyle = event.color;
        ctx.fillText(event.year.toString(), x - 40, y + 28);
        
        ctx.font = '12px "Segoe UI", Arial, sans-serif';
        ctx.fillStyle = '#292524';
        
        const words = event.event.split(' ');
        let line = '';
        let lineY = y + 45;
        
        words.forEach(word => {
          const testLine = line + word + ' ';
          const metrics = ctx.measureText(testLine);
          if (metrics.width > 140 && line !== '') {
            ctx.fillText(line, x - 40, lineY);
            line = word + ' ';
            lineY += 14;
          } else {
            line = testLine;
          }
        });
        ctx.fillText(line, x - 40, lineY);
        
        ctx.restore();
      }
    });
  };

  const drawWorldWarSection = (ctx) => {
    if (step < 10) return;
    
    ctx.save();
    
    ctx.shadowColor = 'rgba(220, 38, 38, 0.3)';
    ctx.shadowBlur = 20;
    
    const boxGradient = ctx.createLinearGradient(0, 560, 0, 595);
    boxGradient.addColorStop(0, '#fee2e2');
    boxGradient.addColorStop(1, '#fecaca');
    ctx.fillStyle = boxGradient;
    roundRect(ctx, 440, 560, 300, 30, 12);
    ctx.fill();
    
    ctx.strokeStyle = '#dc2626';
    ctx.lineWidth = 2.5;
    ctx.shadowBlur = 0;
    roundRect(ctx, 440, 560, 300, 30, 12);
    ctx.stroke();
    
    ctx.font = 'bold 14px "Segoe UI", Arial, sans-serif';
    ctx.fillStyle = '#7f1d1d';
    ctx.fillText('⚔️ World Wars Era (1914-1945)', 465, 580);
    
    ctx.restore();
  };

  const drawColdWarSection = (ctx) => {
    if (step < 13) return;
    
    ctx.save();
    
    ctx.shadowColor = 'rgba(59, 130, 246, 0.3)';
    ctx.shadowBlur = 20;
    
    const boxGradient = ctx.createLinearGradient(0, 560, 0, 595);
    boxGradient.addColorStop(0, '#dbeafe');
    boxGradient.addColorStop(1, '#bfdbfe');
    ctx.fillStyle = boxGradient;
    roundRect(ctx, 100, 560, 300, 30, 12);
    ctx.fill();
    
    ctx.strokeStyle = '#3b82f6';
    ctx.lineWidth = 2.5;
    ctx.shadowBlur = 0;
    roundRect(ctx, 100, 560, 300, 30, 12);
    ctx.stroke();
    
    ctx.font = 'bold 14px "Segoe UI", Arial, sans-serif';
    ctx.fillStyle = '#1e3a8a';
    ctx.fillText('❄️ Cold War Era (1945-1991)', 130, 580);
    
    ctx.restore();
  };

  const drawModernEra = (ctx) => {
    if (step < 16) return;
    
    ctx.save();
    
    ctx.shadowColor = 'rgba(16, 185, 129, 0.3)';
    ctx.shadowBlur = 20;
    
    const badgeGradient = ctx.createLinearGradient(0, 520, 0, 545);
    badgeGradient.addColorStop(0, '#d1fae5');
    badgeGradient.addColorStop(1, '#a7f3d0');
    ctx.fillStyle = badgeGradient;
    roundRect(ctx, 280, 520, 240, 25, 12);
    ctx.fill();
    
    ctx.strokeStyle = '#10b981';
    ctx.lineWidth = 2;
    ctx.shadowBlur = 0;
    roundRect(ctx, 280, 520, 240, 25, 12);
    ctx.stroke();
    
    ctx.font = 'bold 13px "Segoe UI", Arial, sans-serif';
    ctx.fillStyle = '#065f46';
    ctx.fillText('🌐 Digital Age (1990-Present)', 305, 538);
    
    ctx.restore();
  };

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

  const handleStartLecture = () => {
    setStep(0);
    setProgress(0);
    setIsLecturing(true);
    setSpeechText("");
    
    setTimelineEvents(prev => prev.map(e => ({
      ...e,
      opacity: 0,
      scale: 0
    })));
  };

  const handleStopLecture = () => {
    setIsLecturing(false);
    stopSpeech();
  };

  return (
    <div style={{ 
      minHeight: '100vh', 
      background: 'linear-gradient(135deg, #dc2626 0%, #b91c1c 50%, #991b1b 100%)',
      padding: '15px',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      <div style={{ 
        maxWidth: '1050px',
        width: '100%',
        background: 'rgba(255, 255, 255, 0.98)',
        borderRadius: '24px',
        boxShadow: '0 25px 80px rgba(0,0,0,0.4)',
        overflow: 'hidden'
      }}>
        {/* Header */}
        <div style={{
          background: 'linear-gradient(135deg, #dc2626 0%, #991b1b 100%)',
          padding: '18px 28px',
          color: 'white',
          position: 'relative',
          overflow: 'hidden'
        }}>
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'radial-gradient(circle at 20% 50%, rgba(255,255,255,0.12) 0%, transparent 50%)',
            pointerEvents: 'none'
          }}></div>
          
          <div style={{ position: 'relative', zIndex: 1 }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{
                  width: '45px',
                  height: '45px',
                  background: 'rgba(255, 255, 255, 0.2)',
                  borderRadius: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '24px',
                  backdropFilter: 'blur(10px)',
                  border: '1.5px solid rgba(255, 255, 255, 0.3)'
                }}>
                  📜
                </div>
                <div>
                  <h1 style={{ 
                    margin: 0, 
                    fontSize: '24px', 
                    fontWeight: '800',
                    textShadow: '1px 1px 4px rgba(0,0,0,0.2)'
                  }}>
                    Interactive History Lecture
                  </h1>
                  <p style={{ 
                    margin: '2px 0 0 0', 
                    opacity: 0.95, 
                    fontSize: '13px',
                    fontWeight: '500'
                  }}>
                    🔊 Listen & Learn - Voice-Enabled Journey Through Time
                  </p>
                </div>
              </div>
              
              {isLecturing && (
                <div style={{
                  background: 'rgba(255, 255, 255, 0.2)',
                  padding: '8px 16px',
                  borderRadius: '10px',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255, 255, 255, 0.3)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}>
                  <div style={{
                    width: '8px',
                    height: '8px',
                    background: isSpeaking ? '#10b981' : '#fbbf24',
                    borderRadius: '50%',
                    animation: 'pulse 1.5s ease-in-out infinite',
                    boxShadow: isSpeaking ? '0 0 8px #10b981' : '0 0 8px #fbbf24'
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
                background: 'rgba(255, 255, 255, 0.2)',
                borderRadius: '8px',
                height: '6px',
                overflow: 'hidden',
                backdropFilter: 'blur(10px)'
              }}>
                <div style={{
                  height: '100%',
                  background: 'linear-gradient(90deg, #fbbf24 0%, #f59e0b 100%)',
                  width: `${progress}%`,
                  transition: 'width 0.3s ease',
                  boxShadow: '0 0 12px rgba(251, 191, 36, 0.8)'
                }}></div>
              </div>
            )}
          </div>
        </div>

        {/* Canvas */}
        <div style={{ 
          padding: '20px', 
          background: 'linear-gradient(180deg, #ffffff 0%, #fef7ed 100%)',
          position: 'relative'
        }}>
          <div style={{
            position: 'relative',
            borderRadius: '16px',
            overflow: 'hidden',
            boxShadow: '0 12px 40px rgba(0,0,0,0.1)',
            border: '1px solid #e7e5e4'
          }}>
            <canvas
              ref={canvasRef}
              width={800}
              height={600}
              style={{
                width: '100%',
                height: 'auto',
                display: 'block'
              }}
            />
            
            {/* Speech Bubble */}
            {isLecturing && speechText && (
              <div style={{
                position: 'absolute',
                bottom: '20px',
                left: '50%',
                transform: 'translateX(-50%)',
                background: isSpeaking 
                  ? 'linear-gradient(135deg, rgba(16, 185, 129, 0.95) 0%, rgba(5, 150, 105, 0.95) 100%)'
                  : 'rgba(15, 23, 42, 0.95)',
                color: 'white',
                padding: '12px 24px',
                borderRadius: '14px',
                maxWidth: '88%',
                fontSize: '14px',
                fontWeight: '500',
                boxShadow: '0 8px 30px rgba(0,0,0,0.4)',
                animation: 'slideUp 0.3s ease-out',
                textAlign: 'center',
                lineHeight: '1.5',
                backdropFilter: 'blur(8px)',
                border: isSpeaking ? '2px solid rgba(16, 185, 129, 0.8)' : '1px solid rgba(255, 255, 255, 0.1)',
                transition: 'all 0.3s ease'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', justifyContent: 'center' }}>
                  <span style={{ 
                    fontSize: '18px',
                    animation: isSpeaking ? 'bounce 0.6s ease-in-out infinite' : 'none'
                  }}>
                    {isSpeaking ? '🔊' : '🎤'}
                  </span>
                  <span>{speechText}</span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Controls */}
        <div style={{
          padding: '18px 20px',
          borderTop: '1px solid #e7e5e4',
          background: 'white',
          display: 'flex',
          flexDirection: 'column',
          gap: '14px'
        }}>
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '12px'
          }}>
            {!isLecturing ? (
              <button
                onClick={handleStartLecture}
                style={{
                  padding: '12px 36px',
                  fontSize: '16px',
                  fontWeight: '700',
                  border: 'none',
                  borderRadius: '12px',
                  background: 'linear-gradient(135deg, #dc2626 0%, #991b1b 100%)',
                  color: 'white',
                  cursor: 'pointer',
                  transition: 'all 0.3s',
                  boxShadow: '0 6px 20px rgba(220, 38, 38, 0.4)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px'
                }}
                onMouseEnter={(e) => {
                  e.target.style.transform = 'translateY(-2px)';
                  e.target.style.boxShadow = '0 8px 25px rgba(220, 38, 38, 0.5)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = 'translateY(0)';
                  e.target.style.boxShadow = '0 6px 20px rgba(220, 38, 38, 0.4)';
                }}
              >
                <span style={{ fontSize: '20px' }}>🔊</span>
                <span>Start Voice Lecture</span>
              </button>
            ) : (
              <>
                <div style={{
                  padding: '12px 28px',
                  fontSize: '15px',
                  fontWeight: '700',
                  borderRadius: '12px',
                  background: isSpeaking 
                    ? 'linear-gradient(135deg, #10b981 0%, #059669 100%)'
                    : 'linear-gradient(135deg, #dc2626 0%, #991b1b 100%)',
                  color: 'white',
                  boxShadow: isSpeaking 
                    ? '0 6px 20px rgba(16, 185, 129, 0.4)'
                    : '0 6px 20px rgba(220, 38, 38, 0.4)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  transition: 'all 0.3s ease'
                }}>
                  <div style={{
                    width: '10px',
                    height: '10px',
                    background: isSpeaking ? '#fbbf24' : '#10b981',
                    borderRadius: '50%',
                    animation: 'pulse 1.5s ease-in-out infinite'
                  }}></div>
                  <span>{isSpeaking ? '🔊 Speaking...' : '⏸ Waiting...'}</span>
                </div>
                
                <button
                  onClick={handleStopLecture}
                  style={{
                    padding: '12px 28px',
                    fontSize: '15px',
                    fontWeight: '700',
                    border: 'none',
                    borderRadius: '12px',
                    background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
                    color: 'white',
                    cursor: 'pointer',
                    transition: 'all 0.3s',
                    boxShadow: '0 6px 20px rgba(239, 68, 68, 0.4)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.transform = 'translateY(-2px)';
                    e.target.style.boxShadow = '0 8px 25px rgba(239, 68, 68, 0.5)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.transform = 'translateY(0)';
                    e.target.style.boxShadow = '0 6px 20px rgba(239, 68, 68, 0.4)';
                  }}
                >
                  <span style={{ fontSize: '18px' }}>⏹️</span>
                  <span>Stop</span>
                </button>
              </>
            )}
          </div>
          
          {/* Info Cards */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '10px'
          }}>
            <div style={{
              padding: '12px',
              background: 'linear-gradient(135deg, #fee2e2 0%, #fecaca 100%)',
              borderRadius: '12px',
              border: '2px solid #fca5a5',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '24px', marginBottom: '4px' }}>⚔️</div>
              <div style={{ fontSize: '12px', fontWeight: '700', color: '#7f1d1d', marginBottom: '2px' }}>
                World Wars
              </div>
              <div style={{ fontSize: '10px', color: '#dc2626' }}>
                1914-1945
              </div>
            </div>
            
            <div style={{
              padding: '12px',
              background: 'linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)',
              borderRadius: '12px',
              border: '2px solid #fcd34d',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '24px', marginBottom: '4px' }}>⚙️</div>
              <div style={{ fontSize: '12px', fontWeight: '700', color: '#78350f', marginBottom: '2px' }}>
                Industrial Age
              </div>
              <div style={{ fontSize: '10px', color: '#d97706' }}>
                1750-1900
              </div>
            </div>
            
            <div style={{
              padding: '12px',
              background: 'linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%)',
              borderRadius: '12px',
              border: '2px solid #93c5fd',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '24px', marginBottom: '4px' }}>🌐</div>
              <div style={{ fontSize: '12px', fontWeight: '700', color: '#1e3a8a', marginBottom: '2px' }}>
                Digital Era
              </div>
              <div style={{ fontSize: '10px', color: '#3b82f6' }}>
                1990-Present
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes slideUp {
          from { opacity: 0; transform: translateX(-50%) translateY(15px); }
          to { opacity: 1; transform: translateX(-50%) translateY(0); }
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.6; transform: scale(1.3); }
        }
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-3px); }
        }
      `}</style>
    </div>
  );
}