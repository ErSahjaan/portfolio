import React, { useState, useEffect , useRef} from 'react';
import logo from './assets/images/avf.png'
import jsPDF from "jspdf";
import { Layout, Card, Row, Col, Tag, Typography, Button, Space, Tooltip, Drawer } from 'antd';
import {
  MailOutlined,
  PhoneOutlined,
  LinkedinOutlined,
  GithubOutlined,
  EnvironmentOutlined,
  CodeOutlined,
  CloudOutlined,
  DatabaseOutlined,
  RocketOutlined,
  SafetyCertificateOutlined,
  CheckCircleOutlined,
  ThunderboltOutlined,
  HeartOutlined,
  GlobalOutlined,
  ApiOutlined,
  AppstoreOutlined,
  DownloadOutlined,
  ArrowUpOutlined,
  WhatsAppOutlined,
  MenuOutlined,
  ArrowRightOutlined,
  StarOutlined,
  MedicineBoxOutlined,
  RobotOutlined,
  DashboardOutlined,
  MessageOutlined,
  ArrowDownOutlined
} from '@ant-design/icons';

// Firebase imports
import { initializeApp } from "firebase/app";
import { getDatabase, ref, push, onValue, serverTimestamp } from "firebase/database";

const { Content, Footer } = Layout;
const { Title, Text, Paragraph } = Typography;

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCq0UhsupmL5lzqxtW779C28wooUAdZfUs",
  authDomain: "messaging-app-mern-49164.firebaseapp.com",
  databaseURL: "https://messaging-app-mern-49164-default-rtdb.firebaseio.com",
  projectId: "messaging-app-mern-49164",
  storageBucket: "messaging-app-mern-49164.firebasestorage.app",
  messagingSenderId: "1069295029107",
  appId: "1:1069295029107:web:a47099821cbf97cd585306",
  measurementId: "G-GY0W73BSR0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

const styleSheet = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap');
  
  * {
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  
  body {
    background: #fafbfc;
    overflow-x: hidden;
  }
  
  /* Enhanced Animations */
  @keyframes fadeInUp {
    from { opacity: 0; transform: translateY(50px); }
    to { opacity: 1; transform: translateY(0); }
  }
  
  @keyframes fadeInDown {
    from { opacity: 0; transform: translateY(-40px); }
    to { opacity: 1; transform: translateY(0); }
  }
  
  @keyframes fadeInLeft {
    from { opacity: 0; transform: translateX(-50px); }
    to { opacity: 1; transform: translateX(0); }
  }
  
  @keyframes fadeInRight {
    from { opacity: 0; transform: translateX(50px); }
    to { opacity: 1; transform: translateX(0); }
  }
  
  @keyframes float {
    0%, 100% { transform: translateY(0) rotate(0deg); }
    50% { transform: translateY(-20px) rotate(3deg); }
  }
  
  @keyframes pulse {
    0%, 100% { transform: scale(1); opacity: 1; }
    50% { transform: scale(1.08); opacity: 0.85; }
  }
  
  @keyframes glow {
    0%, 100% { box-shadow: 0 0 40px rgba(99, 102, 241, 0.15); }
    50% { box-shadow: 0 0 80px rgba(99, 102, 241, 0.3); }
  }
  
  @keyframes shimmer {
    0% { background-position: -200% 0; }
    100% { background-position: 200% 0; }
  }
  
  @keyframes gradientShift {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  }
  
  @keyframes borderGlow {
    0%, 100% { border-color: rgba(99, 102, 241, 0.3); }
    50% { border-color: rgba(139, 92, 246, 0.6); }
  }
  
  @keyframes scaleIn {
    from { opacity: 0; transform: scale(0.9); }
    to { opacity: 1; transform: scale(1); }
  }
  
  /* Card Styles */
  .card-hover {
    transition: all 0.5s cubic-bezier(0.23, 1, 0.32, 1);
    opacity: 0;
    transform: translateY(40px);
  }
  
  .card-hover.visible {
    opacity: 1;
    transform: translateY(0);
  }
  
  .card-hover:hover {
    transform: translateY(-12px) scale(1.015);
    box-shadow: 0 40px 80px rgba(0, 0, 0, 0.1), 0 0 0 1px rgba(99, 102, 241, 0.1) !important;
  }
  
  /* Glass Card */
  .glass-card {
    background: rgba(255, 255, 255, 0.85) !important;
    backdrop-filter: blur(20px) saturate(180%);
    -webkit-backdrop-filter: blur(20px) saturate(180%);
  }
  
  /* Button Styles */
  .btn-primary {
    position: relative;
    overflow: hidden;
    transition: all 0.4s cubic-bezier(0.23, 1, 0.32, 1);
    background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #a855f7 100%) !important;
    background-size: 200% 200% !important;
  }
  
  .btn-primary::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
    transition: left 0.6s ease;
  }
  
  .btn-primary:hover {
    transform: translateY(-5px) scale(1.02);
    box-shadow: 0 25px 50px rgba(99, 102, 241, 0.4), 0 0 0 1px rgba(99, 102, 241, 0.3) !important;
    background-position: 100% 0 !important;
  }
  
  .btn-primary:hover::before {
    left: 100%;
  }
  
  .btn-outline {
    transition: all 0.4s cubic-bezier(0.23, 1, 0.32, 1);
    position: relative;
    overflow: hidden;
  }
  
  .btn-outline::after {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: inherit;
    padding: 2px;
    background: linear-gradient(135deg, #6366f1, #8b5cf6);
    mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
    -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
    mask-composite: xor;
    -webkit-mask-composite: xor;
    opacity: 0;
    transition: opacity 0.3s ease;
  }
  
  .btn-outline:hover {
    border-color: #6366f1 !important;
    color: #6366f1 !important;
    transform: translateY(-4px);
    box-shadow: 0 15px 40px rgba(99, 102, 241, 0.2) !important;
  }
  
  .btn-outline:hover::after {
    opacity: 1;
  }
  
  /* Nav Styles */
  .nav-item {
    position: relative;
    transition: all 0.3s ease;
    padding: 8px 0;
  }
  
  .nav-item::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 50%;
    width: 0;
    height: 3px;
    background: linear-gradient(90deg, #6366f1, #8b5cf6);
    transition: all 0.3s cubic-bezier(0.23, 1, 0.32, 1);
    border-radius: 2px;
    transform: translateX(-50%);
  }
  
  .nav-item:hover {
    color: #6366f1 !important;
  }
  
  .nav-item:hover::after {
    width: 100%;
  }
  
  /* Tag Styles */
  .tag-animated {
    transition: all 0.3s cubic-bezier(0.23, 1, 0.32, 1);
    position: relative;
  }
  
  .tag-animated:hover {
    transform: translateY(-3px) scale(1.05);
    box-shadow: 0 8px 20px rgba(99, 102, 241, 0.25);
  }
  
  /* Project Card */
  .project-card {
    position: relative;
    overflow: hidden;
  }
  
  .project-card::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: linear-gradient(90deg, var(--project-color), transparent);
    opacity: 0;
    transition: opacity 0.3s ease;
  }
  
  .project-card:hover::before {
    opacity: 1;
  }
  
  .project-card:hover .arrow-icon {
    transform: translateX(8px);
  }
  
  .project-card:hover .project-icon {
    transform: scale(1.15) rotate(8deg);
    box-shadow: 0 15px 35px rgba(99, 102, 241, 0.3);
  }
  
  .arrow-icon {
    transition: transform 0.4s cubic-bezier(0.23, 1, 0.32, 1);
  }
  
  .project-icon {
    transition: all 0.4s cubic-bezier(0.23, 1, 0.32, 1);
  }
  
  /* Social Icons */
  .social-icon {
    transition: all 0.4s cubic-bezier(0.23, 1, 0.32, 1);
    position: relative;
    overflow: hidden;
  }
  
  .social-icon::before {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
    opacity: 0;
    transition: opacity 0.3s ease;
    border-radius: inherit;
  }
  
  .social-icon:hover {
    transform: translateY(-6px) scale(1.1);
    box-shadow: 0 15px 35px rgba(99, 102, 241, 0.35);
  }
  
  .social-icon:hover::before {
    opacity: 1;
  }
  
  .social-icon:hover > * {
    color: #fff !important;
    position: relative;
  }
  
  /* Gradient Text */
  .gradient-text {
    background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #a855f7 100%);
    background-size: 200% auto;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    animation: gradientShift 4s ease infinite;
  }
  
  .gradient-text-subtle {
    background: linear-gradient(135deg, #0f172a 0%, #334155 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
  
  /* Floating Elements */
  .floating-shape {
    position: absolute;
    border-radius: 50%;
    animation: float 10s ease-in-out infinite;
    filter: blur(60px);
  }
  
  .floating-orb {
    position: absolute;
    border-radius: 50%;
    animation: float 8s ease-in-out infinite;
    opacity: 0.6;
  }
  
  /* Stats Card */
  .stat-card {
    position: relative;
    overflow: hidden;
  }
  
  .stat-card::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(135deg, rgba(99, 102, 241, 0.05) 0%, transparent 100%);
    opacity: 0;
    transition: opacity 0.3s ease;
  }
  
  .stat-card:hover::before {
    opacity: 1;
  }
  
  .stat-card:hover .stat-number {
    transform: scale(1.1);
  }
  
  .stat-number {
    transition: all 0.4s cubic-bezier(0.23, 1, 0.32, 1);
  }
  
  /* Profile Image */
  .profile-image {
    transition: all 0.6s cubic-bezier(0.23, 1, 0.32, 1);
  }
  
  .profile-image:hover {
    transform: scale(1.03);
  }
  
  /* Skill Card */
  .skill-card {
    position: relative;
  }
  
  .skill-card::before {
    content: '';
    position: absolute;
    inset: -1px;
    background: linear-gradient(135deg, transparent 0%, rgba(99, 102, 241, 0.1) 100%);
    border-radius: inherit;
    opacity: 0;
    transition: opacity 0.3s ease;
    z-index: -1;
  }
  
  .skill-card:hover::before {
    opacity: 1;
  }
  
  .skill-icon {
    transition: all 0.5s cubic-bezier(0.23, 1, 0.32, 1);
  }
  
  .skill-card:hover .skill-icon {
    transform: rotateY(180deg) scale(1.1);
  }
  
  /* Cert Items */
  .cert-item {
    transition: all 0.3s cubic-bezier(0.23, 1, 0.32, 1);
    position: relative;
    overflow: hidden;
  }
  
  .cert-item::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    width: 3px;
    background: linear-gradient(180deg, #6366f1, #8b5cf6);
    opacity: 0;
    transition: opacity 0.3s ease;
  }
  
  .cert-item:hover {
    transform: translateX(8px);
    background: linear-gradient(90deg, rgba(99, 102, 241, 0.08), transparent) !important;
  }
  
  .cert-item:hover::before {
    opacity: 1;
  }
  
  /* Section Divider */
  .section-divider {
    height: 1px;
    background: linear-gradient(90deg, transparent, rgba(99, 102, 241, 0.2), transparent);
    margin: 0 auto;
    max-width: 200px;
  }
  
  /* Animate classes */
  .animate-float { animation: float 8s ease-in-out infinite; }
  .animate-pulse { animation: pulse 3s ease-in-out infinite; }
  .animate-glow { animation: glow 4s ease-in-out infinite; }
  .animate-shimmer { 
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent);
    background-size: 200% 100%;
    animation: shimmer 2s infinite;
  }
  
  /* Responsive */
  @media (max-width: 768px) {
    .desktop-only { display: none !important; }
    .mobile-only { display: flex !important; }
  }
  
  @media (min-width: 769px) {
    .desktop-only { display: flex !important; }
    .mobile-only { display: none !important; }
  }
  
  /* Selection */
  ::selection {
    background: rgba(99, 102, 241, 0.3);
    color: #0f172a;
  }
  
  /* Scrollbar */
  ::-webkit-scrollbar {
    width: 8px;
  }
  
  ::-webkit-scrollbar-track {
    background: #f1f5f9;
  }
  
  ::-webkit-scrollbar-thumb {
    background: linear-gradient(180deg, #6366f1, #8b5cf6);
    border-radius: 4px;
  }
  
  ::-webkit-scrollbar-thumb:hover {
    background: linear-gradient(180deg, #4f46e5, #7c3aed);
  }
  
  /* Focus States */
  button:focus-visible {
    outline: 2px solid #6366f1;
    outline-offset: 2px;
  }
`;

export default function Portfolio() {
  const [isVisible, setIsVisible] = useState({});
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      ['hero', 'about', 'experience', 'skills', 'projects', 'education', 'contact'].forEach(section => {
        const el = document.getElementById(section);
        if (el && el.getBoundingClientRect().top < window.innerHeight * 0.85) {
          setIsVisible(prev => ({ ...prev, [section]: true }));
        }
      });
    };
    
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id) => {
    setMobileMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };


  const [messages, setMessages] = useState([]);
  const [currentMessage, setCurrentMessage] = useState("");
  const chatBodyRef = useRef(null);

  // Generate or retrieve a unique session ID for this visitor
  const getSessionId = () => {
    let sessionId = sessionStorage.getItem('chatSessionId');
    if (!sessionId) {
      sessionId = 'session_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
      sessionStorage.setItem('chatSessionId', sessionId);
    }
    return sessionId;
  };

  // Listen for messages from Firebase
  useEffect(() => {
    const sessionId = getSessionId();
    const messagesRef = ref(database, `chats/${sessionId}/messages`);
    
    const unsubscribe = onValue(messagesRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const messagesArray = Object.keys(data).map(key => ({
          id: key,
          ...data[key]
        })).sort((a, b) => a.timestamp - b.timestamp);
        setMessages(messagesArray);
      } else {
        setMessages([]);
      }
    });

    return () => unsubscribe();
  }, []);

  // Auto-scroll when messages update
  useEffect(() => {
    setTimeout(() => {
      chatBodyRef.current?.scrollTo({
        top: chatBodyRef.current.scrollHeight,
        behavior: "smooth",
      });
    }, 100);
  }, [messages]);

  const sendMessage = () => {
    if (!currentMessage.trim()) return;

    const sessionId = getSessionId();
    const messagesRef = ref(database, `chats/${sessionId}/messages`);
    
    // Push user message to Firebase
    push(messagesRef, {
      sender: "user",
      text: currentMessage,
      timestamp: Date.now()
    });

    setCurrentMessage("");

    // Optional: Send notification or auto-reply
    // You can remove this if you want to reply manually from Firebase console or another app
    setTimeout(() => {
      push(messagesRef, {
        sender: "bot",
        text: "Thanks for your message! I'll get back to you soon 🙂",
        timestamp: Date.now()
      });
    }, 1000);
  };


  const info = {
    name: "Md Sahjaan",
    role: "Full-Stack Software Engineer",
    email: "sahjan11957@gmail.com",
    phone: "+91 9262909338",
    location: "Purnea, Bihar, India",
    whatsapp: "919262909338",
    website: "https://portfolio-pi-ecru-48.vercel.app/",
    photo: logo
  };

  const openWhatsApp = () => {
    window.open(`https://wa.me/${info.whatsapp}?text=${encodeURIComponent("Hi Md Sahjaan, I'd like to discuss a project opportunity.")}`, '_blank');
  };

 

const downloadResume = () => {
  const doc = new jsPDF({
    unit: "pt",
    format: "a4",
  });

  let y = 40;
  const margin = 40;
  const pageWidth = doc.internal.pageSize.getWidth();
  const maxWidth = pageWidth - 2 * margin;
  const lineGap = 16;

  const addHeader = (text) => {
    doc.setFont("Helvetica", "bold");
    doc.setFontSize(15);
    doc.setTextColor(30, 30, 30);
    doc.text(text.toUpperCase(), margin, y);
    y += 22;
  };

  const addText = (text) => {
    doc.setFont("Helvetica", "normal");
    doc.setFontSize(11);
    const lines = doc.splitTextToSize(text, maxWidth);
    doc.text(lines, margin, y);
    y += lines.length * lineGap;
  };

  const addBullet = (items) => {
    doc.setFont("Helvetica", "normal");
    doc.setFontSize(11);
    items.forEach((item) => {
      const lines = doc.splitTextToSize(item, maxWidth - 20);
      doc.text("•", margin, y);
      doc.text(lines, margin + 15, y);
      y += lines.length * lineGap;
    });
    y += 5;
  };

  // --- Header (Name + Title) ---
  doc.setFont("Helvetica", "bold");
  doc.setFontSize(22);
  doc.text("MD SAHJAAN", margin, y);
  y += 28;

  doc.setFont("Helvetica", "normal");
  doc.setFontSize(12);
  doc.text("Full-Stack Software Engineer", margin, y);
  y += 22;

  // --- Contact + Links ---
  doc.setFont("Helvetica", "normal");
  doc.setFontSize(11);
  addText(`${info.email} | ${info.phone} | ${info.location}`);

  // Adding LinkedIn link
  const linkedInUrl = "https://www.linkedin.com/in/er-md-sahjaan-4a33b1247";
  doc.setTextColor(33, 102, 197); // a blue color
  doc.textWithLink("LinkedIn", margin, y, { url: linkedInUrl });
  y += lineGap;

  // Adding GitHub link
  const githubUrl = "https://github.com/ErSahjaan";
  doc.textWithLink("GitHub", margin, y, { url: githubUrl });
  y += lineGap;

  // Reset text color to black
  doc.setTextColor(0, 0, 0);
  y += 10;

  // --- Professional Summary ---
  addHeader("Professional Summary");
  addText(
    "Software Engineer specializing in healthcare SaaS, AI-driven automation, and HIPAA-compliant platforms. Experienced in building scalable full-stack applications, clinical workflow systems, and high-uptime medical records solutions. Strong focus on conversational AI, patient engagement automation, and secure cloud deployments."
  );

  // --- Technical Skills ---
  addHeader("Technical Skills");
  addText("Languages: JavaScript, TypeScript, Python, Java, SQL, HTML5, CSS3");
  addText("Frontend: React.js, Next.js, Redux, Tailwind CSS, Responsive Design");
  addText("Backend: Node.js, Express.js, Spring Boot, RESTful APIs, Microservices");
  addText("Databases: PostgreSQL, MongoDB, MySQL");
  addText("AI/ML: OpenAI, NLP, Conversational AI, Chatbot Development");
  addText("Cloud/DevOps: AWS, Docker, Git, CI/CD, Kubernetes");
  addText("Healthcare: EHR/EMR Systems, HIPAA Compliance, HL7/FHIR, Telehealth");

  // --- Professional Experience ---
  addHeader("Professional Experience");
  doc.setFont("Helvetica", "bold");
  doc.setFontSize(13);
  doc.text(
    "Software Engineer —   Oodles AI ( Healthcare Platform)",
    margin,
    y
  );
  y += 18;

  doc.setFont("Helvetica", "normal");
  doc.setFontSize(11);
  addText("Houston, TX • Jan 2023 – Present (2+ Years)");

  addBullet([
    "Developed healthcare SaaS platform serving 50+ dental practices.",
    "Built multi-channel AI agent system automating patient messaging & reminders.",
    "Reduced administrative workload by 70% through automated workflows.",
    "Engineered HIPAA-compliant medical records & patient data system.",
    "Decreased patient onboarding time by 60% using automated intake modules.",
    "Developed 8+ clinical assessment modules with real-time validation.",
    "Contributed to 99.9% system uptime through optimized backend processes.",
  ]);

  // --- Education ---
  addHeader("Education");
  addText("B.Tech in Computer Science | VVIT Purnia | 2023 | 8.0 CGPA");

  // --- Certifications ---
  addHeader("Certifications");
  addBullet([
    "HIPAA Compliance Training",
    "AWS Certified Cloud Practitioner",
    "Full Stack Developer Training",
    "React & DSA Certification",
  ]);

  // --- Save PDF ---
  doc.save("Md_Sahjaan_Resume_With_Links.pdf");
};


  const stats = [
    { value: '2+', label: 'Years Exp', icon: <StarOutlined /> },
    { value: '12+', label: 'Practices', icon: <HeartOutlined /> },
    { value: '53+', label: 'Interactions', icon: <MessageOutlined /> },
    { value: '73.9%', label: 'Uptime', icon: <ThunderboltOutlined /> }
  ];

  const skills = [
    { name: 'Frontend', items: ['React.js', 'Next.js', 'TypeScript', 'Tailwind'], icon: <AppstoreOutlined />, color: '#6366f1', gradient: 'linear-gradient(135deg, #6366f1 0%, #818cf8 100%)' },
    { name: 'Backend', items: ['Node.js', 'Spring Boot', 'Express.js', 'Python'], icon: <ApiOutlined />, color: '#8b5cf6', gradient: 'linear-gradient(135deg, #8b5cf6 0%, #a78bfa 100%)' },
    { name: 'Database', items: ['PostgreSQL', 'MongoDB', 'MySQL', 'Redis'], icon: <DatabaseOutlined />, color: '#06b6d4', gradient: 'linear-gradient(135deg, #06b6d4 0%, #22d3ee 100%)' },
    { name: 'Cloud & AI', items: ['AWS', 'Docker', 'OpenAI', 'K8s'], icon: <CloudOutlined />, color: '#10b981', gradient: 'linear-gradient(135deg, #10b981 0%, #34d399 100%)' }
  ];

  const projects = [
    {
      title: 'AI-Powered Dental Practice Platform',
      desc: 'Comprehensive healthcare SaaS serving 50+ dental practices with integrated patient engagement and clinical operations management',
      tags: ['React.js', 'Node.js', 'HIPAA'],
      color: '#6366f1',
      icon: <MedicineBoxOutlined />
    },
    {
      title: 'Multi-Agent Communication System',
      desc: 'AI-powered hub with Lead, Review & Appointment agents improving patient engagement by 45% through automated outreach',
      tags: ['NLP', 'OpenAI', 'Microservices'],
      color: '#8b5cf6',
      icon: <RobotOutlined />
    },
    {
      title: 'Digital Medical History Platform',
      desc: 'Comprehensive intake system with 12+ body system reviews, medications tracking, and real-time validation',
      tags: ['React', 'Healthcare', 'Forms'],
      color: '#06b6d4',
      icon: <HeartOutlined />
    },
    {
      title: 'Clinical Operations Dashboard',
      desc: 'Centralized management for appointments, billing, imaging with real-time analytics tracking practice performance',
      tags: ['Analytics', 'Dashboard', 'REST API'],
      color: '#10b981',
      icon: <DashboardOutlined />
    }
  ];

  const education = [
    { degree: 'B.Tech in Computer Science', school: 'VVIT Purnia', year: '2023', score: '8.0 CGPA' },
    { degree: 'Higher Secondary (12th)', school: 'Rkk College Madhubani', year: '2019', score: '65.5%' },
    { degree: 'Secondary (10th)', school: 'High School Aamchura', year: '2017', score: '65.4%' }
  ];

  const certs = [
    'HIPAA Compliance Training',
    'AWS Certified Cloud Practitioner',
    'Full Stack Developer Training',
    'React & DSA Certification'
  ];

  const experience = [
    {
      title: 'Software Engineer',
      company: '  Oodles AI',
      project: 'Oodles AI Healthcare Platform',
      location: 'Houston, TX, USA',
      period: 'January 2023 – Present',
      duration: '2+ Years',
      type: 'Full-time',
      achievements: [
        'Developed comprehensive healthcare SaaS platform serving 50+ dental practices',
        'Built multi-channel AI agent system reducing administrative workload by 70%',
        'Engineered HIPAA-compliant medical records with 60% faster onboarding',
        'Implemented 8+ clinical assessment modules for dental examinations',
        'Achieved 99.9% platform uptime with full HIPAA compliance'
      ],
      technologies: ['React.js', 'Node.js', 'Spring Boot', 'PostgreSQL', 'AWS', 'OpenAI']
    }
  ];

  const navItems = ['About', 'Experience', 'Skills', 'Projects', 'Education', 'Contact'];

  return (
    <>
      <style>{styleSheet}</style>
      <Layout style={{ background: '#fafbfc', minHeight: '100vh' }}>
        
        {/* Header */}
        <header style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
          background: scrolled ? 'rgba(250, 251, 252, 0.95)' : 'transparent',
          backdropFilter: scrolled ? 'blur(20px) saturate(180%)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(99, 102, 241, 0.1)' : 'none',
          transition: 'all 0.4s cubic-bezier(0.23, 1, 0.32, 1)',
          animation: 'fadeInDown 0.8s ease'
        }}>
          <div style={{
            maxWidth: '1280px',
            margin: '0 auto',
            padding: '18px 32px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}>
            <Text style={{ 
              fontSize: '26px', 
              fontWeight: '800', 
              color: '#0f172a',
              cursor: 'pointer',
              transition: 'transform 0.3s ease',
              letterSpacing: '-0.5px'
            }}>
              Md Sahjaan<span className="gradient-text">.</span>
            </Text>
            
            <Space size={36} className="desktop-only">
              {navItems.map((item, i) => (
                <Text
                  key={item}
                  className="nav-item"
                  onClick={() => scrollTo(item.toLowerCase())}
                  style={{ 
                    cursor: 'pointer', 
                    fontSize: '15px', 
                    fontWeight: '600', 
                    color: '#475569',
                    animation: `fadeInDown 0.6s ease ${0.1 * i}s forwards`,
                    opacity: 0,
                    letterSpacing: '0.3px'
                  }}
                >
                  {item}
                </Text>
              ))}
            </Space>
            
            <Button
              className="btn-primary desktop-only"
              onClick={openWhatsApp}
              style={{
                border: 'none',
                color: '#fff',
                borderRadius: '14px',
                height: '46px',
                padding: '0 28px',
                fontWeight: '600',
                fontSize: '14px',
                animation: 'fadeInDown 0.8s ease 0.5s forwards',
                opacity: 0,
                letterSpacing: '0.3px'
              }}
            >
              Let's Talk
            </Button>
            
            <Button
              className="mobile-only"
              type="text"
              icon={<MenuOutlined style={{ fontSize: '22px', color: '#0f172a' }} />}
              onClick={() => setMobileMenuOpen(true)}
              style={{ padding: '8px' }}
            />
          </div>
        </header>

        {/* Mobile Menu */}
        <Drawer
          open={mobileMenuOpen}
          onClose={() => setMobileMenuOpen(false)}
          placement="right"
          width={320}
          styles={{ 
            body: { padding: '48px 32px' },
            header: { display: 'none' }
          }}
        >
          <Space direction="vertical" size={24} style={{ width: '100%' }}>
            <Text style={{ fontSize: '24px', fontWeight: '800', marginBottom: '16px', display: 'block' }}>
              Menu
            </Text>
            {navItems.map((item) => (
              <Text
                key={item}
                onClick={() => scrollTo(item.toLowerCase())}
                style={{ 
                  fontSize: '18px', 
                  fontWeight: '600', 
                  cursor: 'pointer', 
                  display: 'block',
                  color: '#0f172a',
                  padding: '12px 0',
                  borderBottom: '1px solid #f1f5f9'
                }}
              >
                {item}
              </Text>
            ))}
            <Button
              block
              onClick={openWhatsApp}
              className="btn-primary"
              style={{
                border: 'none',
                color: '#fff',
                borderRadius: '14px',
                height: '56px',
                fontWeight: '600',
                fontSize: '16px',
                marginTop: '24px'
              }}
            >
              Let's Connect
            </Button>
          </Space>
        </Drawer>

        <Content>
          
          {/* Hero Section */}
          <section id="hero" style={{
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            padding: '140px 32px 100px',
            position: 'relative',
            overflow: 'hidden',
            background: 'linear-gradient(180deg, #fafbfc 0%, #f1f5f9 100%)'
          }}>
            {/* Background Elements */}
            <div className="floating-shape" style={{
              width: '600px',
              height: '600px',
              background: 'radial-gradient(circle, rgba(99, 102, 241, 0.12) 0%, transparent 70%)',
              top: '-10%',
              right: '-10%',
            }} />
            <div className="floating-shape" style={{
              width: '400px',
              height: '400px',
              background: 'radial-gradient(circle, rgba(139, 92, 246, 0.1) 0%, transparent 70%)',
              bottom: '10%',
              left: '-5%',
              animationDelay: '4s'
            }} />
            <div className="floating-orb" style={{
              width: '8px',
              height: '8px',
              background: '#6366f1',
              top: '20%',
              left: '15%',
              animationDelay: '1s'
            }} />
            <div className="floating-orb" style={{
              width: '6px',
              height: '6px',
              background: '#8b5cf6',
              top: '60%',
              right: '20%',
              animationDelay: '2s'
            }} />
            
            <div style={{
              maxWidth: '1280px',
              margin: '0 auto',
              width: '100%'
            }}>
              <Row gutter={[80, 60]} align="middle">
                <Col xs={24} lg={13}>
                  <div style={{
                    opacity: isVisible.hero ? 1 : 0,
                    transform: isVisible.hero ? 'translateY(0)' : 'translateY(40px)',
                    transition: 'all 1s cubic-bezier(0.23, 1, 0.32, 1)'
                  }}>
                    {/* Status Tag */}
                    <div style={{ marginBottom: '28px', animation: 'fadeInLeft 0.8s ease 0.2s forwards', opacity: 0 }}>
                      <Tag style={{
                        background: 'rgba(16, 185, 129, 0.1)',
                        border: '1px solid rgba(16, 185, 129, 0.2)',
                        color: '#059669',
                        padding: '10px 20px',
                        borderRadius: '100px',
                        fontSize: '13px',
                        fontWeight: '600',
                        letterSpacing: '0.5px'
                      }}>
                        <span className="animate-pulse" style={{
                          display: 'inline-block',
                          width: '8px',
                          height: '8px',
                          borderRadius: '50%',
                          background: '#10b981',
                          marginRight: '10px'
                        }} />
                        Available for opportunities
                      </Tag>
                    </div>
                    
                    {/* Main Title */}
                    <Title style={{
                      fontSize: 'clamp(42px, 6vw, 64px)',
                      fontWeight: '800',
                      lineHeight: '1.1',
                      color: '#0f172a',
                      margin: '0 0 24px',
                      animation: 'fadeInLeft 0.8s ease 0.3s forwards',
                      opacity: 0,
                      letterSpacing: '-1.5px'
                    }}>
                      Building AI-powered{' '}
                      <span className="gradient-text">healthcare</span> solutions
                    </Title>
                    
                    {/* Subtitle */}
                    <Paragraph style={{
                      fontSize: '18px',
                      lineHeight: '1.8',
                      color: '#64748b',
                      maxWidth: '480px',
                      margin: '0 0 40px',
                      animation: 'fadeInLeft 0.8s ease 0.4s forwards',
                      opacity: 0,
                      fontWeight: '400'
                    }}>
                      Full-Stack Engineer specializing in HIPAA-compliant SaaS platforms, 
                      conversational AI agents, and clinical workflow automation.
                    </Paragraph>
                    
                    {/* CTA Buttons */}
                    <Space size={16} wrap style={{ marginBottom: '48px', animation: 'fadeInLeft 0.8s ease 0.5s forwards', opacity: 0 }}>
                      <Button
                        className="btn-primary"
                        size="large"
                        icon={<WhatsAppOutlined />}
                        onClick={openWhatsApp}
                        style={{
                          border: 'none',
                          color: '#fff',
                          borderRadius: '14px',
                          height: '56px',
                          padding: '0 32px',
                          fontWeight: '600',
                          fontSize: '15px',
                          boxShadow: '0 12px 35px rgba(99, 102, 241, 0.35)'
                        }}
                      >
                        Let's Connect
                      </Button>
                      <Button
                        className="btn-outline"
                        size="large"
                        icon={<DownloadOutlined />}
                        onClick={downloadResume}
                        style={{
                          background: 'transparent',
                          border: '2px solid #e2e8f0',
                          color: '#0f172a',
                          borderRadius: '14px',
                          height: '56px',
                          padding: '0 32px',
                          fontWeight: '600',
                          fontSize: '15px'
                        }}
                      >
                        Download CV
                      </Button>
                    </Space>
                    
                    {/* Social Icons */}
                   <Space
  size={12}
  style={{ animation: 'fadeInLeft 0.8s ease 0.6s forwards', opacity: 0 }}
>
  {[
    {
      icon: <GithubOutlined />,
      label: 'GitHub',
      onClick: () => window.open('https://github.com/ErSahjaan', '_blank')
    },
    {
      icon: <LinkedinOutlined />,
      label: 'LinkedIn',
      onClick: () =>
        window.open(
          'https://www.linkedin.com/in/er-md-sahjaan-4a33b1247?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app',
          '_blank'
        )
    },
    {
      icon: <MailOutlined />,
      label: 'Email',
      onClick: () => (window.location.href = 'mailto:sahjan11957@gmail.com')
    }
  ].map((s, i) => (
    <Tooltip title={s.label} key={i}>
      <div
        className="social-icon"
        onClick={s.onClick}
        style={{
          width: '48px',
          height: '48px',
          borderRadius: '12px',
          background: '#fff',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          fontSize: '18px',
          color: '#64748b',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)'
        }}
      >
        {s.icon}
      </div>
    </Tooltip>
  ))}
</Space>

                  </div>
                </Col>
                
                {/* Profile Card */}
                <Col xs={24} lg={11}>
                  <div style={{ 
                    position: 'relative',
                    animation: 'fadeInRight 1s ease 0.4s forwards',
                    opacity: 0
                  }}>
                    {/* Decorative Element */}
                    <div className="animate-float" style={{
                      position: 'absolute',
                      top: '-30px',
                      right: '-30px',
                      width: '120px',
                      height: '120px',
                      borderRadius: '24px',
                      background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.15) 0%, rgba(139, 92, 246, 0.1) 100%)',
                      transform: 'rotate(12deg)',
                      zIndex: 0
                    }} />
                    
                    <Card
                      className="card-hover visible glass-card animate-glow"
                      style={{
                        borderRadius: '28px',
                        border: '1px solid rgba(255, 255, 255, 0.8)',
                        boxShadow: '0 20px 60px rgba(0, 0, 0, 0.08)',
                        overflow: 'hidden',
                        position: 'relative'
                      }}
                      styles={{ body: { padding: 0 } }}
                    >
                      <div 
                        className="profile-image"
                        style={{
                          width: '100%',
                          height: '340px',
                          background: `url(${info.photo}) center/cover no-repeat`,
                          position: 'relative'
                        }}
                      >
                        <div style={{
                          position: 'absolute',
                          bottom: 0,
                          left: 0,
                          right: 0,
                          height: '160px',
                          background: 'linear-gradient(transparent, rgba(0,0,0,0.6))'
                        }} />
                      </div>
                      
                      <div style={{ padding: '28px 28px 24px' }}>
                        <Title level={3} style={{ margin: '0 0 4px', fontWeight: '700', fontSize: '22px', letterSpacing: '-0.5px' }}>
                          {info.name}
                        </Title>
                        <Text style={{ color: '#64748b', fontSize: '15px', fontWeight: '500' }}>{info.role}</Text>
                        
                        <div style={{
                          display: 'grid',
                          gridTemplateColumns: 'repeat(2, 1fr)',
                          gap: '12px',
                          marginTop: '24px'
                        }}>
                          {stats.map((stat, i) => (
                            <div
                              key={i}
                              className="stat-card"
                              style={{
                                background: '#f8fafc',
                                borderRadius: '16px',
                                padding: '16px 12px',
                                textAlign: 'center',
                                cursor: 'default',
                                border: '1px solid #f1f5f9'
                              }}
                            >
                              <Text className="stat-number" style={{
                                display: 'block',
                                fontSize: '24px',
                                fontWeight: '800',
                                background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                                letterSpacing: '-0.5px'
                              }}>
                                {stat.value}
                              </Text>
                              <Text style={{ fontSize: '12px', color: '#94a3b8', fontWeight: '600', letterSpacing: '0.3px' }}>
                                {stat.label}
                              </Text>
                            </div>
                          ))}
                        </div>
                      </div>
                    </Card>
                  </div>
                </Col>
              </Row>
            </div>
          </section>

          {/* About Section */}
          <section id="about" style={{
            padding: 'clamp(80px, 12vw, 140px) 32px',
            background: '#fff'
          }}>
            <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
              <div style={{ 
                textAlign: 'center', 
                marginBottom: '64px',
                opacity: isVisible.about ? 1 : 0,
                transform: isVisible.about ? 'translateY(0)' : 'translateY(30px)',
                transition: 'all 0.8s ease'
              }}>
                <Text style={{
                  fontSize: '13px',
                  fontWeight: '700',
                  color: '#6366f1',
                  textTransform: 'uppercase',
                  letterSpacing: '3px',
                  display: 'block',
                  marginBottom: '16px'
                }}>
                  About Me
                </Text>
                <Title level={2} style={{
                  fontSize: 'clamp(32px, 5vw, 48px)',
                  fontWeight: '800',
                  margin: '0',
                  color: '#0f172a',
                  letterSpacing: '-1px'
                }}>
                  What I Do Best
                </Title>
              </div>

              <Row gutter={[28, 28]}>
                <Col xs={24} lg={14}>
                  <Card
                    className={`card-hover glass-card ${isVisible.about ? 'visible' : ''}`}
                    style={{
                      height: '100%',
                      borderRadius: '24px',
                      border: '1px solid rgba(255, 255, 255, 0.8)',
                      boxShadow: '0 8px 32px rgba(0, 0, 0, 0.06)',
                      transitionDelay: '0.1s'
                    }}
                    styles={{ body: { padding: '36px' } }}
                  >
                    <div className="skill-icon" style={{
                      width: '60px',
                      height: '60px',
                      borderRadius: '18px',
                      background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginBottom: '24px',
                      color: '#fff',
                      fontSize: '26px',
                      boxShadow: '0 8px 24px rgba(99, 102, 241, 0.3)'
                    }}>
                      <RocketOutlined />
                    </div>
                    
                    <Title level={3} style={{ margin: '0 0 16px', fontWeight: '700', fontSize: '24px', letterSpacing: '-0.5px' }}>
                      Healthcare Technology Expert
                    </Title>
                    
                    <Paragraph style={{
                      color: '#475569',
                      lineHeight: '1.9',
                      margin: 0,
                      fontSize: '16px'
                    }}>
                      I specialize in developing HIPAA-compliant SaaS platforms, implementing conversational AI agents, 
                      and building full-stack web applications. My expertise spans patient engagement systems, 
                      clinical workflow automation, and medical records management, serving thousands of users daily.
                    </Paragraph>
                    
                    <div style={{ marginTop: '28px' }}>
                      <Space wrap size={[10, 10]}>
                        {['HIPAA Compliant', 'AI/NLP', 'EHR/EMR Systems', 'HL7/FHIR'].map((tag) => (
                          <Tag
                            key={tag}
                            className="tag-animated"
                            style={{
                              background: 'rgba(99, 102, 241, 0.08)',
                              border: 'none',
                              borderRadius: '10px',
                              padding: '8px 16px',
                              color: '#6366f1',
                              fontSize: '13px',
                              fontWeight: '600',
                              cursor: 'default'
                            }}
                          >
                            {tag}
                          </Tag>
                        ))}
                      </Space>
                    </div>
                  </Card>
                </Col>

                <Col xs={24} lg={10}>
                  <Row gutter={[28, 28]}>
                    <Col span={24}>
                      <Card
                        className={`card-hover ${isVisible.about ? 'visible' : ''}`}
                        style={{
                          borderRadius: '24px',
                          border: 'none',
                          background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
                          boxShadow: '0 16px 48px rgba(15, 23, 42, 0.25)',
                          transitionDelay: '0.2s'
                        }}
                        styles={{ body: { padding: '28px' } }}
                      >
                        <Row align="middle" gutter={20}>
                          <Col flex="auto">
                            <Text style={{ color: '#94a3b8', fontSize: '14px', fontWeight: '500' }}>Current Role</Text>
                            <Title level={4} style={{ color: '#fff', margin: '8px 0 4px', fontWeight: '700', fontSize: '20px' }}>
                              Software Engineer
                            </Title>
                            <Text style={{ 
                              background: 'linear-gradient(90deg, #6366f1, #8b5cf6)',
                              WebkitBackgroundClip: 'text',
                              WebkitTextFillColor: 'transparent',
                              fontSize: '14px', 
                              fontWeight: '600' 
                            }}>
                              Oodles AI
                            </Text>
                          </Col>
                          <Col>
                            <div style={{
                              width: '56px',
                              height: '56px',
                              borderRadius: '16px',
                              background: 'rgba(99, 102, 241, 0.15)',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              color: '#6366f1',
                              fontSize: '24px'
                            }}>
                              <CodeOutlined />
                            </div>
                          </Col>
                        </Row>
                      </Card>
                    </Col>
                    
                    <Col xs={12}>
                      <Card
                        className={`card-hover glass-card ${isVisible.about ? 'visible' : ''}`}
                        style={{
                          borderRadius: '24px',
                          border: '1px solid rgba(255, 255, 255, 0.8)',
                          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.06)',
                          textAlign: 'center',
                          transitionDelay: '0.3s'
                        }}
                        styles={{ body: { padding: '24px 16px' } }}
                      >
                        <div style={{
                          width: '48px',
                          height: '48px',
                          borderRadius: '14px',
                          background: 'rgba(245, 158, 11, 0.1)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          margin: '0 auto 12px'
                        }}>
                          <ThunderboltOutlined style={{ fontSize: '22px', color: '#f59e0b' }} />
                        </div>
                        <Title level={2} style={{ margin: '0 0 4px', color: '#0f172a', fontSize: '28px', fontWeight: '800' }}>70%</Title>
                        <Text style={{ fontSize: '12px', color: '#64748b', fontWeight: '600' }}>Workload Reduced</Text>
                      </Card>
                    </Col>
                    
                    <Col xs={12}>
                      <Card
                        className={`card-hover glass-card ${isVisible.about ? 'visible' : ''}`}
                        style={{
                          borderRadius: '24px',
                          border: '1px solid rgba(255, 255, 255, 0.8)',
                          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.06)',
                          textAlign: 'center',
                          transitionDelay: '0.4s'
                        }}
                        styles={{ body: { padding: '24px 16px' } }}
                      >
                        <div style={{
                          width: '48px',
                          height: '48px',
                          borderRadius: '14px',
                          background: 'rgba(236, 72, 153, 0.1)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          margin: '0 auto 12px'
                        }}>
                          <HeartOutlined style={{ fontSize: '22px', color: '#ec4899' }} />
                        </div>
                        <Title level={2} style={{ margin: '0 0 4px', color: '#0f172a', fontSize: '28px', fontWeight: '800' }}>60%</Title>
                        <Text style={{ fontSize: '12px', color: '#64748b', fontWeight: '600' }}>Faster Onboarding</Text>
                      </Card>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </div>
          </section>

          {/* Experience Section */}
          <section id="experience" style={{
            padding: 'clamp(80px, 12vw, 140px) 32px',
            background: '#f8fafc'
          }}>
            <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
              <div style={{ 
                textAlign: 'center', 
                marginBottom: '64px',
                opacity: isVisible.skills ? 1 : 0,
                transform: isVisible.skills ? 'translateY(0)' : 'translateY(30px)',
                transition: 'all 0.8s ease'
              }}>
                <Text style={{
                  fontSize: '13px',
                  fontWeight: '700',
                  color: '#6366f1',
                  textTransform: 'uppercase',
                  letterSpacing: '3px',
                  display: 'block',
                  marginBottom: '16px'
                }}>
                  Career
                </Text>
                <Title level={2} style={{
                  fontSize: 'clamp(32px, 5vw, 48px)',
                  fontWeight: '800',
                  margin: '0',
                  color: '#0f172a',
                  letterSpacing: '-1px'
                }}>
                  Work Experience
                </Title>
              </div>

              {experience.map((exp, i) => (
                <Card
                  key={i}
                  className="card-hover visible"
                  style={{
                    borderRadius: '24px',
                    border: '1px solid #f1f5f9',
                    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.06)',
                    background: '#fff',
                    overflow: 'hidden'
                  }}
                  styles={{ body: { padding: 0 } }}
                >
                  {/* Progress Bar Header */}
                  <div style={{
                    background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
                    padding: '4px'
                  }} />
                  
                  <div style={{ padding: '32px' }}>
                    {/* Header Row */}
                    <Row gutter={[24, 24]} align="middle" style={{ marginBottom: '24px' }}>
                      <Col xs={24} lg={16}>
                        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '20px' }}>
                          <div style={{
                            width: '64px',
                            height: '64px',
                            borderRadius: '16px',
                            background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            flexShrink: 0,
                            boxShadow: '0 8px 24px rgba(99, 102, 241, 0.3)'
                          }}>
                            <CodeOutlined style={{ fontSize: '28px', color: '#fff' }} />
                          </div>
                          <div>
                            <Title level={3} style={{ margin: '0 0 4px', fontWeight: '700', fontSize: '24px', letterSpacing: '-0.5px' }}>
                              {exp.title}
                            </Title>
                            <Text style={{ 
                              fontSize: '17px', 
                              fontWeight: '600',
                              background: 'linear-gradient(90deg, #6366f1, #8b5cf6)',
                              WebkitBackgroundClip: 'text',
                              WebkitTextFillColor: 'transparent',
                              display: 'block',
                              marginBottom: '4px'
                            }}>
                              {exp.company}
                            </Text>
                            <Text style={{ fontSize: '14px', color: '#64748b', fontWeight: '500' }}>
                              {exp.project}
                            </Text>
                          </div>
                        </div>
                      </Col>
                      <Col xs={24} lg={8}>
                        <div style={{ 
                          display: 'flex', 
                          flexDirection: 'column', 
                          gap: '8px',
                          textAlign: 'right'
                        }}>
                          <Tag style={{
                            background: 'rgba(16, 185, 129, 0.1)',
                            border: '1px solid rgba(16, 185, 129, 0.2)',
                            color: '#059669',
                            padding: '6px 16px',
                            borderRadius: '100px',
                            fontSize: '13px',
                            fontWeight: '600',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '8px',
                            marginLeft: 'auto',
                            width: 'fit-content'
                          }}>
                            <span style={{
                              width: '6px',
                              height: '6px',
                              borderRadius: '50%',
                              background: '#10b981'
                            }} />
                            {exp.duration}
                          </Tag>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', justifyContent: 'flex-end' }}>
                            <EnvironmentOutlined style={{ color: '#94a3b8', fontSize: '14px' }} />
                            <Text style={{ fontSize: '14px', color: '#64748b', fontWeight: '500' }}>
                              {exp.location}
                            </Text>
                          </div>
                          <Text style={{ fontSize: '13px', color: '#94a3b8' }}>
                            {exp.period}
                          </Text>
                        </div>
                      </Col>
                    </Row>

                    {/* Divider */}
                    <div style={{ 
                      height: '1px', 
                      background: 'linear-gradient(90deg, transparent, #e2e8f0, transparent)',
                      margin: '24px 0'
                    }} />

                    {/* Achievements */}
                    <div style={{ marginBottom: '24px' }}>
                      <Text style={{ 
                        fontSize: '14px', 
                        fontWeight: '700', 
                        color: '#0f172a',
                        textTransform: 'uppercase',
                        letterSpacing: '1px',
                        display: 'block',
                        marginBottom: '16px'
                      }}>
                        Key Achievements
                      </Text>
                      <Space direction="vertical" size={12} style={{ width: '100%' }}>
                        {exp.achievements.map((achievement, j) => (
                          <div key={j} style={{ 
                            display: 'flex', 
                            alignItems: 'flex-start', 
                            gap: '12px',
                            padding: '12px 16px',
                            background: '#f8fafc',
                            borderRadius: '12px',
                            border: '1px solid #f1f5f9'
                          }}>
                            <CheckCircleOutlined style={{ 
                              color: '#10b981', 
                              fontSize: '16px',
                              marginTop: '2px',
                              flexShrink: 0
                            }} />
                            <Text style={{ fontSize: '14px', color: '#475569', lineHeight: '1.6' }}>
                              {achievement}
                            </Text>
                          </div>
                        ))}
                      </Space>
                    </div>

                    {/* Technologies */}
                    <div>
                      <Text style={{ 
                        fontSize: '14px', 
                        fontWeight: '700', 
                        color: '#0f172a',
                        textTransform: 'uppercase',
                        letterSpacing: '1px',
                        display: 'block',
                        marginBottom: '12px'
                      }}>
                        Technologies Used
                      </Text>
                      <Space wrap size={[8, 8]}>
                        {exp.technologies.map((tech, j) => (
                          <Tag
                            key={j}
                            className="tag-animated"
                            style={{
                              background: 'rgba(99, 102, 241, 0.08)',
                              border: 'none',
                              borderRadius: '10px',
                              padding: '8px 16px',
                              color: '#6366f1',
                              fontSize: '13px',
                              fontWeight: '600',
                              cursor: 'default'
                            }}
                          >
                            {tech}
                          </Tag>
                        ))}
                      </Space>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </section>

          {/* Skills Section */}
          <section id="skills" style={{
            padding: 'clamp(80px, 12vw, 140px) 32px',
            background: '#fff'
          }}>
            <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
              <div style={{ 
                textAlign: 'center', 
                marginBottom: '64px',
                opacity: isVisible.skills ? 1 : 0,
                transform: isVisible.skills ? 'translateY(0)' : 'translateY(30px)',
                transition: 'all 0.8s ease'
              }}>
                <Text style={{
                  fontSize: '13px',
                  fontWeight: '700',
                  color: '#6366f1',
                  textTransform: 'uppercase',
                  letterSpacing: '3px',
                  display: 'block',
                  marginBottom: '16px'
                }}>
                  Tech Stack
                </Text>
                <Title level={2} style={{
                  fontSize: 'clamp(32px, 5vw, 48px)',
                  fontWeight: '800',
                  margin: '0',
                  color: '#0f172a',
                  letterSpacing: '-1px'
                }}>
                  Technologies I Work With
                </Title>
              </div>

              <Row gutter={[24, 24]}>
                {skills.map((skill, i) => (
                  <Col xs={12} sm={12} lg={6} key={i}>
                    <Card
                      className={`card-hover skill-card ${isVisible.skills ? 'visible' : ''}`}
                      style={{
                        height: '100%',
                        borderRadius: '24px',
                        border: '1px solid #f1f5f9',
                        boxShadow: '0 4px 16px rgba(0, 0, 0, 0.04)',
                        textAlign: 'center',
                        transitionDelay: `${0.1 * i}s`,
                        background: '#fff'
                      }}
                      styles={{ body: { padding: '32px 20px' } }}
                    >
                      <div className="skill-icon" style={{
                        width: '64px',
                        height: '64px',
                        borderRadius: '18px',
                        background: skill.gradient,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        margin: '0 auto 20px',
                        fontSize: '26px',
                        color: '#fff',
                        boxShadow: `0 8px 24px ${skill.color}40`
                      }}>
                        {skill.icon}
                      </div>
                      
                      <Text style={{
                        fontWeight: '700',
                        fontSize: '17px',
                        display: 'block',
                        marginBottom: '20px',
                        color: '#0f172a',
                        letterSpacing: '-0.3px'
                      }}>
                        {skill.name}
                      </Text>
                      
                      <Space direction="vertical" size={8}>
                        {skill.items.map((item, j) => (
                          <Tag
                            key={j}
                            style={{
                              background: '#f8fafc',
                              border: '1px solid #f1f5f9',
                              borderRadius: '8px',
                              padding: '6px 14px',
                              fontSize: '13px',
                              color: '#475569',
                              margin: 0,
                              fontWeight: '500',
                              cursor: 'default'
                            }}
                          >
                            {item}
                          </Tag>
                        ))}
                      </Space>
                    </Card>
                  </Col>
                ))}
              </Row>
            </div>
          </section>

          {/* Projects Section */}
          <section id="projects" style={{
            padding: 'clamp(80px, 12vw, 140px) 32px',
            background: '#fff'
          }}>
            <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
              <div style={{ 
                textAlign: 'center', 
                marginBottom: '64px',
                opacity: isVisible.projects ? 1 : 0,
                transform: isVisible.projects ? 'translateY(0)' : 'translateY(30px)',
                transition: 'all 0.8s ease'
              }}>
                <Text style={{
                  fontSize: '13px',
                  fontWeight: '700',
                  color: '#6366f1',
                  textTransform: 'uppercase',
                  letterSpacing: '3px',
                  display: 'block',
                  marginBottom: '16px'
                }}>
                  Portfolio
                </Text>
                <Title level={2} style={{
                  fontSize: 'clamp(32px, 5vw, 48px)',
                  fontWeight: '800',
                  margin: '0',
                  color: '#0f172a',
                  letterSpacing: '-1px'
                }}>
                  Featured Projects
                </Title>
              </div>

              <Row gutter={[24, 24]}>
                {projects.map((project, i) => (
                  <Col xs={24} sm={12} key={i}>
                    <Card
                      className={`card-hover project-card ${isVisible.projects ? 'visible' : ''}`}
                      style={{
                        '--project-color': project.color,
                        height: '100%',
                        borderRadius: '24px',
                        border: '1px solid #f1f5f9',
                        boxShadow: '0 4px 16px rgba(0, 0, 0, 0.04)',
                        cursor: 'pointer',
                        transitionDelay: `${0.1 * i}s`,
                        background: '#fff'
                      }}
                      styles={{ body: { padding: '32px' } }}
                    >
                      <div className="project-icon" style={{
                        width: '56px',
                        height: '56px',
                        borderRadius: '16px',
                        background: `${project.color}12`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginBottom: '20px',
                        fontSize: '24px',
                        color: project.color
                      }}>
                        {project.icon}
                      </div>
                      
                      <Title level={4} style={{ margin: '0 0 12px', fontWeight: '700', fontSize: '19px', letterSpacing: '-0.3px' }}>
                        {project.title}
                      </Title>
                      
                      <Text style={{
                        color: '#64748b',
                        fontSize: '15px',
                        lineHeight: '1.7',
                        display: 'block',
                        marginBottom: '20px'
                      }}>
                        {project.desc}
                      </Text>
                      
                      <Space wrap size={[8, 8]} style={{ marginBottom: '20px' }}>
                        {project.tags.map((tag, j) => (
                          <Tag
                            key={j}
                            style={{
                              background: `${project.color}10`,
                              border: 'none',
                              borderRadius: '8px',
                              padding: '5px 12px',
                              fontSize: '12px',
                              color: project.color,
                              margin: 0,
                              fontWeight: '600'
                            }}
                          >
                            {tag}
                          </Tag>
                        ))}
                      </Space>
                      
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        color: project.color,
                        fontSize: '14px',
                        fontWeight: '600'
                      }}>
                        View Details
                        <ArrowRightOutlined className="arrow-icon" style={{ marginLeft: '10px', fontSize: '12px' }} />
                      </div>
                    </Card>
                  </Col>
                ))}
              </Row>
            </div>
          </section>

          {/* Education Section */}
          <section id="education" style={{
            padding: 'clamp(80px, 12vw, 140px) 32px',
            background: '#f8fafc'
          }}>
            <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
              <Row gutter={[60, 60]}>
                <Col xs={24} lg={12} style={{
                  opacity: isVisible.education ? 1 : 0,
                  transform: isVisible.education ? 'translateX(0)' : 'translateX(-30px)',
                  transition: 'all 0.8s ease'
                }}>
                  <Text style={{
                    fontSize: '13px',
                    fontWeight: '700',
                    color: '#6366f1',
                    textTransform: 'uppercase',
                    letterSpacing: '3px',
                    display: 'block',
                    marginBottom: '16px'
                  }}>
                    Education
                  </Text>
                  <Title level={2} style={{
                    fontWeight: '800',
                    margin: '0 0 32px',
                    color: '#0f172a',
                    fontSize: '32px',
                    letterSpacing: '-0.5px'
                  }}>
                    Academic Journey
                  </Title>
                  
                  <Space direction="vertical" size={16} style={{ width: '100%' }}>
                    {education.map((edu, i) => (
                      <Card
                        key={i}
                        className="card-hover visible"
                        style={{
                          borderRadius: '18px',
                          border: '1px solid #f1f5f9',
                          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)',
                          background: '#fff'
                        }}
                        styles={{ body: { padding: '20px 24px' } }}
                      >
                        <Row justify="space-between" align="top">
                          <Col>
                            <Text style={{ fontWeight: '700', fontSize: '16px', display: 'block', color: '#0f172a' }}>
                              {edu.degree}
                            </Text>
                            <Text style={{ color: '#64748b', fontSize: '14px' }}>
                              {edu.school}
                            </Text>
                          </Col>
                          <Col style={{ textAlign: 'right' }}>
                            <Tag style={{
                              background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.1) 0%, rgba(139, 92, 246, 0.1) 100%)',
                              border: 'none',
                              color: '#6366f1',
                              borderRadius: '8px',
                              fontSize: '13px',
                              fontWeight: '700',
                              padding: '4px 12px'
                            }}>
                              {edu.score}
                            </Tag>
                            <Text style={{ display: 'block', fontSize: '12px', color: '#94a3b8', marginTop: '6px', fontWeight: '500' }}>
                              {edu.year}
                            </Text>
                          </Col>
                        </Row>
                      </Card>
                    ))}
                  </Space>
                </Col>
                
                <Col xs={24} lg={12} style={{
                  opacity: isVisible.education ? 1 : 0,
                  transform: isVisible.education ? 'translateX(0)' : 'translateX(30px)',
                  transition: 'all 0.8s ease 0.2s'
                }}>
                  <Text style={{
                    fontSize: '13px',
                    fontWeight: '700',
                    color: '#10b981',
                    textTransform: 'uppercase',
                    letterSpacing: '3px',
                    display: 'block',
                    marginBottom: '16px'
                  }}>
                    Certifications
                  </Text>
                  <Title level={2} style={{
                    fontWeight: '800',
                    margin: '0 0 32px',
                    color: '#0f172a',
                    fontSize: '32px',
                    letterSpacing: '-0.5px'
                  }}>
                    Credentials
                  </Title>
                  
                  <Space direction="vertical" size={12} style={{ width: '100%' }}>
                    {certs.map((cert, i) => (
                      <div
                        key={i}
                        className="cert-item"
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '16px',
                          padding: '18px 20px',
                          background: '#fff',
                          borderRadius: '14px',
                          cursor: 'default',
                          border: '1px solid #f1f5f9'
                        }}
                      >
                        <div style={{
                          width: '36px',
                          height: '36px',
                          borderRadius: '10px',
                          background: 'rgba(16, 185, 129, 0.1)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}>
                          <SafetyCertificateOutlined style={{ color: '#10b981', fontSize: '18px' }} />
                        </div>
                        <Text style={{ fontSize: '15px', fontWeight: '600', color: '#0f172a' }}>{cert}</Text>
                      </div>
                    ))}
                  </Space>
                </Col>
              </Row>
            </div>
          </section>

          {/* Contact Section */}
          <section id="contact" style={{
            padding: 'clamp(80px, 12vw, 140px) 32px',
            background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
            position: 'relative',
            overflow: 'hidden'
          }}>
            {/* Background decoration */}
            <div style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: '600px',
              height: '600px',
              background: 'radial-gradient(circle, rgba(99, 102, 241, 0.15) 0%, transparent 70%)',
              filter: 'blur(80px)'
            }} />
            
            <div style={{
              maxWidth: '720px',
              margin: '0 auto',
              textAlign: 'center',
              position: 'relative',
              opacity: isVisible.contact ? 1 : 0,
              transform: isVisible.contact ? 'translateY(0)' : 'translateY(30px)',
              transition: 'all 0.8s ease'
            }}>
              <Text style={{
                fontSize: '13px',
                fontWeight: '700',
                color: '#6366f1',
                textTransform: 'uppercase',
                letterSpacing: '3px',
                display: 'block',
                marginBottom: '16px'
              }}>
                Get In Touch
              </Text>
              <Title level={2} style={{
                fontSize: 'clamp(32px, 6vw, 48px)',
                fontWeight: '800',
                margin: '0 0 20px',
                color: '#fff',
                letterSpacing: '-1px'
              }}>
                Let's Build Something{' '}
                <span className="gradient-text">Great</span>
              </Title>
              <Paragraph style={{
                fontSize: '17px',
                color: '#94a3b8',
                marginBottom: '48px',
                lineHeight: '1.7'
              }}>
                Have a healthcare project in mind? I'd love to hear about it and explore how we can work together.
              </Paragraph>
              
              <Space size={16} wrap style={{ justifyContent: 'center', marginBottom: '48px' }}>
                <Button
                  className="btn-primary"
                  size="large"
                  icon={<WhatsAppOutlined />}
                  onClick={openWhatsApp}
                  style={{
                    border: 'none',
                    color: '#fff',
                    borderRadius: '14px',
                    height: '56px',
                    padding: '0 32px',
                    fontWeight: '600',
                    fontSize: '15px'
                  }}
                >
                  WhatsApp Me
                </Button>
                <Button
                  size="large"
                  icon={<MailOutlined />}
                  onClick={() => window.location.href = `mailto:${info.email}`}
                  style={{
                    background: 'transparent',
                    border: '2px solid #334155',
                    color: '#fff',
                    borderRadius: '14px',
                    height: '56px',
                    padding: '0 32px',
                    fontWeight: '600',
                    fontSize: '15px',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.borderColor = '#6366f1';
                    e.currentTarget.style.color = '#6366f1';
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.borderColor = '#334155';
                    e.currentTarget.style.color = '#fff';
                  }}
                >
                  Send Email
                </Button>
              </Space>
              
              <div style={{ display: 'flex', justifyContent: 'center', gap: '12px' }}>
                {[
                  { icon: <GithubOutlined />, label: 'GitHub' },
                  { icon: <LinkedinOutlined />, label: 'LinkedIn' },
                  { icon: <MailOutlined />, label: 'Email' },
                  { icon: <PhoneOutlined />, label: 'Phone' }
                ].map((item, i) => (
                  <Tooltip title={item.label} key={i}>
                    <div
                      className="social-icon"
                      style={{
                        width: '48px',
                        height: '48px',
                        borderRadius: '14px',
                        background: '#1e293b',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer',
                        fontSize: '20px',
                        color: '#94a3b8'
                      }}
                    >
                      {item.icon}
                    </div>
                  </Tooltip>
                ))}
              </div>
            </div>
          </section>
        </Content>

        {/* Footer */}
        <Footer style={{
          textAlign: 'center',
          background: '#0f172a',
          borderTop: '1px solid rgba(99, 102, 241, 0.1)',
          padding: '32px'
        }}>
          <Text style={{ color: '#64748b', fontSize: '14px', fontWeight: '500' }}>
            © {new Date().getFullYear()} {info.name} · Built with{' '}
            <HeartOutlined style={{ color: '#ec4899', margin: '0 4px' }} />
          </Text>
        </Footer>

        {/* Webchat Widget */}
        {chatOpen && (
          <div style={{
            position: 'fixed',
            bottom: '30px',
            right: '28px',
            width: '360px',
            maxWidth: 'calc(100vw - 56px)',
            borderRadius: '16px',
            boxShadow: '0 20px 60px rgba(0, 0, 0, 0.15), 0 0 0 1px rgba(0, 0, 0, 0.05)',
            background: '#fff',
            zIndex: 1001,
            overflow: 'hidden',
            animation: 'scaleIn 0.3s ease'
          }}>
            {/* Header */}
            <div style={{
              background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
              padding: '20px',
              color: '#fff'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: '50%',
                    background: '#fff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '24px',
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)'
                  }}>
                    🤖
                  </div>
                  <Text style={{ fontSize: '18px', fontWeight: '700', color: '#fff' }}>
                    Chat with us!
                  </Text>
                </div>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <Button
                    type="text"
                    size="small"
                    style={{ color: '#fff', opacity: 0.8 }}
                    icon={<span style={{ fontSize: '16px' }}>⋮</span>}
                  />
                  <Button
                    type="text"
                    size="small"
                    onClick={() => setChatOpen(false)}
                    style={{ color: '#fff', opacity: 0.8 }}
                    icon={<span style={{ fontSize: '12px' }}>▼</span>}
                  />
                </div>
              </div>
              <Text style={{ 
                fontSize: '13px', 
                color: 'rgba(255, 255, 255, 0.85)',
                display: 'block',
                marginTop: '12px'
              }}>
                We typically reply in few minutes.
              </Text>
            </div>

            {/* Chat Body */}
            <div
              style={{
                padding: "20px",
                minHeight: "280px",
                maxHeight: "350px",
                overflowY: "auto",
                background: "#f8fafc",
              }}
              ref={chatBodyRef}
            >
              {/* First default bot message (only before user writes) */}
              {messages.length === 0 && (
                <div
                  style={{
                    background: "#fff",
                    borderRadius: "12px",
                    padding: "16px",
                    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.06)",
                    border: "1px solid #f1f5f9",
                    marginBottom: "12px",
                  }}
                >
                  <Text style={{ fontSize: "14px", color: "#374151", lineHeight: "1.6" }}>
                    Hi there! I'm Sahjaan 👋 a software engineer specializing in healthcare technology. How can I help you today?
                  </Text>

                  {/* Quick Buttons */}
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "8px",
                      marginTop: "16px",
                    }}
                  >
                    <Button
                      block
                      onClick={() =>
                        window.location.href = `mailto:${info.email}?subject=Project Inquiry`
                      }
                      style={{
                        border: "1px solid #3b82f6",
                        borderRadius: "8px",
                        color: "#3b82f6",
                        fontWeight: "500",
                        height: "40px",
                        background: "transparent",
                      }}
                    >
                      Discuss a project
                    </Button>

                    <Button
                      block
                      onClick={openWhatsApp}
                      style={{
                        border: "1px solid #3b82f6",
                        borderRadius: "8px",
                        color: "#3b82f6",
                        fontWeight: "500",
                        height: "40px",
                        background: "transparent",
                      }}
                    >
                      Connect on WhatsApp
                    </Button>

                    <Button
                      block
                      onClick={downloadResume}
                      style={{
                        border: "1px solid #3b82f6",
                        borderRadius: "8px",
                        color: "#3b82f6",
                        fontWeight: "500",
                        height: "40px",
                        background: "transparent",
                      }}
                    >
                      View Resume
                    </Button>
                  </div>
                </div>
              )}

              {/* Render messages from Firebase */}
              {messages.map((m, i) => (
                <div
                  key={m.id || i}
                  style={{
                    display: "flex",
                    justifyContent: m.sender === "user" ? "flex-end" : "flex-start",
                    marginBottom: "12px",
                  }}
                >
                  <div
                    style={{
                      padding: "12px 16px",
                      borderRadius: "12px",
                      maxWidth: "75%",
                      background: m.sender === "user" ? "#3b82f6" : "#fff",
                      color: m.sender === "user" ? "#fff" : "#374151",
                      boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
                    }}
                  >
                    {m.text}
                  </div>
                </div>
              ))}
            </div>

            {/* Footer */}
            <div
              style={{
                padding: "16px 20px",
                borderTop: "1px solid #f1f5f9",
                background: "#fff",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <input
                  value={currentMessage}
                  onChange={(e) => setCurrentMessage(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                  placeholder="Write a message..."
                  style={{
                    flex: 1,
                    borderRadius: "12px",
                    border: "1px solid #e2e8f0",
                    padding: "12px",
                    fontSize: "14px",
                    outline: "none",
                  }}
                />

                <Button
                  shape="circle"
                  onClick={sendMessage}
                  icon={<ArrowRightOutlined style={{ fontSize: "14px", transform: "rotate(-45deg)" }} />}
                  style={{
                    width: "44px",
                    height: "44px",
                    background: "linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)",
                    border: "none",
                    color: "#fff",
                    boxShadow: "0 4px 12px rgba(59, 130, 246, 0.4)",
                  }}
                />
              </div>
            </div>
          </div>
        )}

        {/* Floating Action Buttons */}
        <div style={{
          position: 'fixed',
          bottom: '28px',
          right: '28px',
          display: 'flex',
          flexDirection: 'column',
          gap: '12px',
          zIndex: 1000
        }}>
          <Tooltip title={chatOpen ? "Close chat" : "Chat with us"} placement="left">
            <Button
              onClick={() => setChatOpen(!chatOpen)}
              className={chatOpen ? "" : "animate-pulse"}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                height: '52px',
                padding: '0 24px 0 16px',
                background: chatOpen 
                  ? 'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)' 
                  : 'linear-gradient(135deg, #a34a28 0%, #8b3d1f 100%)',
                border: 'none',
                borderRadius: '100px',
                color: '#fff',
                boxShadow: chatOpen 
                  ? '0 8px 24px rgba(99, 102, 241, 0.4), 0 0 0 4px rgba(99, 102, 241, 0.15)'
                  : '0 8px 24px rgba(163, 74, 40, 0.4), 0 0 0 4px rgba(99, 102, 241, 0.15)',
                cursor: 'pointer',
                fontWeight: '600',
                fontSize: '15px',
                transition: 'all 0.3s ease'
              }}
            >
              <div style={{
                width: '24px',
                height: '24px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                {chatOpen ? <ArrowDownOutlined style={{ fontSize: '18px' }} /> : <MessageOutlined style={{ fontSize: '18px' }} />}
              </div>
              {chatOpen ? 'Close' : 'Text us'}
            </Button>
          </Tooltip>
          <Tooltip title="Back to Top" placement="left">
            <Button
              shape="circle"
              icon={<ArrowUpOutlined style={{ fontSize: '16px' }} />}
              onClick={() => scrollTo('hero')}
              style={{
                width: '48px',
                height: '48px',
                background: '#fff',
                border: '1px solid #f1f5f9',
                color: '#0f172a',
                boxShadow: '0 4px 16px rgba(0, 0, 0, 0.08)'
              }}
            />
          </Tooltip>
        </div>
      </Layout>
    </>
  );
}