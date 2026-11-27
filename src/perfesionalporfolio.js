import React, { useState, useEffect, useRef } from 'react';
import portrait from './assets/images/hero-portrait-cutout.png';
import ResumeBuilder, { additionalSkills, certifications, coreSkills, degree, profileRole, profileSummary, PublishedResume, work } from './ResumeBuilder';
import { useNavigate } from 'react-router-dom';
import { projectConcepts } from './projectConcepts';
import AboutIntroduction from './AboutIntroduction';
import { Layout, Card, Row, Col, Tag, Typography, Button, Space, Tooltip, Drawer, Input, Form, notification, Modal, Avatar } from 'antd';
import {
  MailOutlined,
  PhoneOutlined,
  LinkedinOutlined,
  CodeOutlined,
  RocketOutlined,
  CheckCircleOutlined,
  ThunderboltOutlined,
  HeartOutlined,
  GlobalOutlined,
  ApiOutlined,
  AppstoreOutlined,
  ArrowUpOutlined,
  WhatsAppOutlined,
  MenuOutlined,
  MedicineBoxOutlined,
  DashboardOutlined,
  MessageOutlined,
  ArrowDownOutlined,
  SendOutlined,
  CloseOutlined,
  TrophyOutlined,
  FireOutlined,
  EyeOutlined,
  SmileOutlined
} from '@ant-design/icons';

// Firebase imports
import { initializeApp } from "firebase/app";
import { getDatabase, ref, push, onValue } from "firebase/database";

const { Content, Footer } = Layout;
const { Title, Text, Paragraph } = Typography;
const { TextArea } = Input;

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

const enhancedStyleSheet = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Space+Grotesk:wght@300;400;500;600;700&display=swap');
  
  * {
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  
  body {
    background: #fafbfc;
    overflow-x: hidden;
    cursor: default;
  }
  
  /* Custom Cursor */
  .custom-cursor {
    width: 20px;
    height: 20px;
    border: 2px solid #6366f1;
    border-radius: 50%;
    position: fixed;
    pointer-events: none;
    z-index: 9999;
    transition: all 0.1s ease;
    mix-blend-mode: difference;
  }
  
  .custom-cursor-dot {
    width: 8px;
    height: 8px;
    background: #6366f1;
    border-radius: 50%;
    position: fixed;
    pointer-events: none;
    z-index: 9999;
    transition: all 0.05s ease;
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
  
  @keyframes slideInRight {
    from { opacity: 0; transform: translateX(100px); }
    to { opacity: 1; transform: translateX(0); }
  }
  
  @keyframes bounce {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-10px); }
  }
  
  @keyframes rotate360 {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
  
  @keyframes morphBlob {
    0%, 100% { border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%; }
    50% { border-radius: 30% 60% 70% 40% / 50% 60% 30% 60%; }
  }
  
  @keyframes countUp {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }
  
  @keyframes typing {
    from { width: 0; }
    to { width: 100%; }
  }
  
  @keyframes blink {
    50% { opacity: 0; }
  }
  
  /* Parallax Elements */
  .parallax-layer {
    transition: transform 0.2s ease-out;
  }
  
  /* Card Styles with Advanced Effects */
  .card-hover {
    transition: all 0.5s cubic-bezier(0.23, 1, 0.32, 1);
    opacity: 0;
    transform: translateY(40px);
    position: relative;
    overflow: hidden;
  }
  
  .card-hover::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    pointer-events: none;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent);
    transition: left 0.5s ease;
  }
  
  .card-hover.visible {
    opacity: 1;
    transform: translateY(0);
  }
  
  .card-hover:hover {
    transform: translateY(-12px) scale(1.015);
    box-shadow: 0 40px 80px rgba(0, 0, 0, 0.12), 0 0 0 1px rgba(99, 102, 241, 0.15) !important;
    z-index: 10;
  }
  
  .card-hover:hover::before {
    left: 100%;
  }
  
  /* Magnetic Button Effect */
  .btn-magnetic {
    position: relative;
    transition: all 0.3s cubic-bezier(0.23, 1, 0.32, 1);
  }
  
  /* Glass Card with Enhanced Effect */
  .glass-card {
    background: rgba(255, 255, 255, 0.9) !important;
    backdrop-filter: blur(30px) saturate(180%);
    -webkit-backdrop-filter: blur(30px) saturate(180%);
    border: 1px solid rgba(255, 255, 255, 0.8) !important;
  }
  
  .glass-card-dark {
    background: rgba(15, 23, 42, 0.9) !important;
    backdrop-filter: blur(30px) saturate(180%);
    -webkit-backdrop-filter: blur(30px) saturate(180%);
    border: 1px solid rgba(255, 255, 255, 0.1) !important;
  }
  
  /* Enhanced Button Styles */
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
    box-shadow: 0 25px 50px rgba(99, 102, 241, 0.5), 0 0 0 1px rgba(99, 102, 241, 0.3) !important;
    background-position: 100% 0 !important;
  }
  
  .btn-primary:hover::before {
    left: 100%;
  }
  
  .btn-primary:active {
    transform: translateY(-3px) scale(0.98);
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
    box-shadow: 0 15px 40px rgba(99, 102, 241, 0.25) !important;
  }
  
  .btn-outline:hover::after {
    opacity: 1;
  }
  
  /* Nav Styles with Enhanced Effect */
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
    transform: translateY(-2px);
  }
  
  .nav-item:hover::after {
    width: 100%;
  }
  
  /* Tag Styles with Enhanced Hover */
  .tag-animated {
    transition: all 0.3s cubic-bezier(0.23, 1, 0.32, 1);
    position: relative;
  }
  
  .tag-animated::before {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: inherit;
    background: linear-gradient(135deg, rgba(99, 102, 241, 0.2), rgba(139, 92, 246, 0.2));
    opacity: 0;
    transition: opacity 0.3s ease;
  }
  
  .tag-animated:hover {
    transform: translateY(-3px) scale(1.05);
    box-shadow: 0 8px 20px rgba(99, 102, 241, 0.3);
  }
  
  .tag-animated:hover::before {
    opacity: 1;
  }
  
  /* Project Card with Spotlight Effect */
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
    pointer-events: none;
    background: linear-gradient(90deg, var(--project-color), transparent);
    opacity: 0;
    transition: opacity 0.3s ease;
  }
  
  .project-card::after {
    content: '';
    position: absolute;
    inset: 0;
    pointer-events: none;
    background: radial-gradient(circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(99, 102, 241, 0.1), transparent 50%);
    opacity: 0;
    transition: opacity 0.3s ease;
  }
  
  .project-card:hover::before,
  .project-card:hover::after {
    opacity: 1;
  }
  
  .project-card:hover .arrow-icon {
    transform: translateX(8px);
  }
  
  .project-card:hover .project-icon {
    transform: scale(1.15) rotate(8deg);
    box-shadow: 0 15px 35px rgba(99, 102, 241, 0.35);
  }
  
  .arrow-icon {
    transition: transform 0.4s cubic-bezier(0.23, 1, 0.32, 1);
  }
  
  .project-icon {
    transition: all 0.4s cubic-bezier(0.23, 1, 0.32, 1);
  }
  
  /* Social Icons with Enhanced Effect */
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
    transform: translateY(-6px) scale(1.1) rotate(5deg);
    box-shadow: 0 15px 35px rgba(99, 102, 241, 0.4);
  }
  
  .social-icon:hover::before {
    opacity: 1;
  }
  
  .social-icon:hover > * {
    color: #fff !important;
    position: relative;
  }
  
  /* Gradient Text with Animation */
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
  
  /* Floating Elements with Enhanced Motion */
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
  
  .blob-animation {
    animation: morphBlob 8s ease-in-out infinite;
  }
  
  /* Skill Card with 3D Effect */
  .skill-card {
    position: relative;
    transform-style: preserve-3d;
    transition: transform 0.5s ease;
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
  
  .skill-card:hover {
    transform: rotateY(5deg) rotateX(5deg);
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
  
  /* Certificate Items with Enhanced Interaction */
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
  
  .cert-item::after {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(90deg, rgba(99, 102, 241, 0.05), transparent);
    opacity: 0;
    transition: opacity 0.3s ease;
  }
  
  .cert-item:hover {
    transform: translateX(8px);
  }
  
  .cert-item:hover::before,
  .cert-item:hover::after {
    opacity: 1;
  }
  
  /* Progress Bar Animation */
  .progress-bar-animated {
    animation: shimmer 2s infinite;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent);
    background-size: 200% 100%;
  }
  
  /* Section Divider with Glow */
  .section-divider {
    height: 1px;
    background: linear-gradient(90deg, transparent, rgba(99, 102, 241, 0.3), transparent);
    margin: 0 auto;
    max-width: 200px;
    animation: glow 3s ease-in-out infinite;
  }
  
  /* Typing Indicator */
  .typing-indicator {
    display: flex;
    gap: 4px;
    padding: 12px;
  }
  
  .typing-dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: #94a3b8;
    animation: bounce 1.4s infinite ease-in-out;
  }
  
  .typing-dot:nth-child(1) { animation-delay: -0.32s; }
  .typing-dot:nth-child(2) { animation-delay: -0.16s; }
  
  /* Notification Animation */
  .notification-enter {
    animation: slideInRight 0.3s ease-out;
  }
  
  /* Modal with Blur Background */
  .ant-modal-mask {
    backdrop-filter: blur(10px);
    background: rgba(0, 0, 0, 0.6) !important;
  }
  
  /* Enhanced Form Inputs */
  .form-input-enhanced {
    transition: all 0.3s ease;
  }
  
  .form-input-enhanced:focus {
    box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1);
    border-color: #6366f1 !important;
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
  .animate-rotate { animation: rotate360 8s linear infinite; }
  .animate-bounce { animation: bounce 2s ease-in-out infinite; }
  
  /* Responsive */
  @media (max-width: 1179px) {
    .desktop-only { display: none !important; }
    .mobile-only { display: flex !important; }
  }
  
  @media (min-width: 1180px) {
    .desktop-only { display: flex !important; }
    .mobile-only { display: none !important; }
  }
  
  /* Selection */
  ::selection {
    background: rgba(99, 102, 241, 0.3);
    color: #0f172a;
  }
  
  /* Enhanced Scrollbar */
  ::-webkit-scrollbar {
    width: 10px;
  }
  
  ::-webkit-scrollbar-track {
    background: #f1f5f9;
  }
  
  ::-webkit-scrollbar-thumb {
    background: linear-gradient(180deg, #6366f1, #8b5cf6);
    border-radius: 5px;
  }
  
  ::-webkit-scrollbar-thumb:hover {
    background: linear-gradient(180deg, #4f46e5, #7c3aed);
  }
  
  /* Focus States */
  button:focus-visible {
    outline: 2px solid #6366f1;
    outline-offset: 2px;
  }
  
  /* Loading Spinner */
  .loading-spinner {
    animation: rotate360 1s linear infinite;
  }
  
  /* Success Animation */
  @keyframes successPop {
    0% { transform: scale(0); opacity: 0; }
    50% { transform: scale(1.2); }
    100% { transform: scale(1); opacity: 1; }
  }
  
  .success-icon {
    animation: successPop 0.5s cubic-bezier(0.23, 1, 0.32, 1);
  }
`;

export default function EnhancedPortfolio({ initialResumeDraft, onOpenPortfolioBuilder, onCloseResume }) {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState({});
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const [resumeMode, setResumeMode] = useState(initialResumeDraft ? 'builder' : null);
  const [contactModalOpen, setContactModalOpen] = useState(false);
  const [projectModalOpen, setProjectModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState([]);
  const [currentMessage, setCurrentMessage] = useState("");
  const chatBodyRef = useRef(null);
  const [contactForm] = Form.useForm();

  // Keep the custom cursor on pointer devices only.
  useEffect(() => {
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return undefined;
    const cursor = document.createElement('div');
    const cursorDot = document.createElement('div');
    cursor.className = 'custom-cursor';
    cursorDot.className = 'custom-cursor-dot';
    document.body.appendChild(cursor);
    document.body.appendChild(cursorDot);

    const moveCursor = (e) => {
      cursor.style.left = e.clientX + 'px';
      cursor.style.top = e.clientY + 'px';
      cursorDot.style.left = e.clientX + 'px';
      cursorDot.style.top = e.clientY + 'px';
    };

    window.addEventListener('mousemove', moveCursor);
    return () => {
      window.removeEventListener('mousemove', moveCursor);
      cursor.remove();
      cursorDot.remove();
    };
  }, []);

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

  // Generate or retrieve a unique session ID
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
    
    push(messagesRef, {
      sender: "user",
      text: currentMessage,
      timestamp: Date.now()
    });

    setCurrentMessage("");
    setIsTyping(true);

    setTimeout(() => {
      setIsTyping(false);
      push(messagesRef, {
        sender: "bot",
        text: "Thanks for your message! I'll get back to you soon 🙂",
        timestamp: Date.now()
      });
    }, 2000);
  };

  const handleContactSubmit = (values) => {
    notification.success({
      message: 'Message Sent Successfully!',
      description: 'Thank you for reaching out. I\'ll get back to you soon.',
      icon: <SmileOutlined style={{ color: '#10b981' }} />,
      duration: 4,
      className: 'notification-enter'
    });
    contactForm.resetFields();
    setContactModalOpen(false);
  };

  const info = {
    name: "Er, Md Sahjaan",
    role: profileRole,
    email: "sahjan11957@gmail.com",
    phone: "+91 9262909338",
    location: "Purnea, Bihar, India",
    whatsapp: "919262909338",
    website: "https://portfolio-pi-ecru-48.vercel.app/",
    photo: portrait
  };

  const openWhatsApp = () => {
    window.open(`https://wa.me/${info.whatsapp}?text=${encodeURIComponent("Hi Er, Md Sahjaan, I'd like to discuss a project opportunity.")}`, '_blank');
  };

  const skills = [
    { name: 'Backend', items: ['Java', 'Spring Boot'], icon: <ApiOutlined />, color: '#8b5cf6', gradient: 'linear-gradient(135deg, #8b5cf6, #a78bfa)' },
    { name: 'Frontend', items: ['React.js'], icon: <AppstoreOutlined />, color: '#6366f1', gradient: 'linear-gradient(135deg, #6366f1, #818cf8)' },
    { name: 'Integrations', items: additionalSkills, icon: <ApiOutlined />, color: '#0891b2', gradient: 'linear-gradient(135deg, #0891b2, #22d3ee)' },
  ];

  const projects = [
    {
      title: 'Patient Intake Forms',
      desc: 'Digital forms for collecting patient history and medication details.',
      longDesc: 'Built form interfaces for collecting medical history and medication information, with validation for required fields.',
      tags: ['React.js', 'Form validation'],
      color: '#6366f1',
      icon: <MedicineBoxOutlined />,
    },
    {
      title: 'Clinical Operations Dashboard',
      desc: 'A dashboard for appointments and practice workflows.',
      longDesc: 'Worked on dashboard screens that bring appointment and practice information together for staff.',
      tags: ['React.js', 'Dashboard'],
      color: '#0891b2',
      icon: <DashboardOutlined />,
    },
    { ...projectConcepts[0], color: '#8b5cf6', icon: <AppstoreOutlined /> },
    { ...projectConcepts[1], color: '#15803d', icon: <MedicineBoxOutlined /> },
  ];

  const education = [degree];
  const experience = [work];

  const navItems = ['About', 'Experience', 'Skills', 'Projects', 'Education', 'Contact'];

  return (
    <>
      <style>{enhancedStyleSheet}</style>
      <Layout style={{ background: '#fafbfc', minHeight: '100vh' }}>
        
        {/* Enhanced Header with Glassmorphism */}
        <header className="portfolio-header" style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
          background: scrolled ? 'rgba(250, 251, 252, 0.95)' : 'transparent',
          backdropFilter: scrolled ? 'blur(30px) saturate(180%)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(99, 102, 241, 0.15)' : 'none',
          transition: 'all 0.4s cubic-bezier(0.23, 1, 0.32, 1)',
          animation: 'fadeInDown 0.8s ease',
          boxShadow: scrolled ? '0 4px 24px rgba(0, 0, 0, 0.06)' : 'none'
        }}>
          <div className="portfolio-header-inner" style={{
            maxWidth: '1280px',
            margin: '0 auto',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}>
            <div className="portfolio-brand">
              <div className="portfolio-brand-mark" style={{
                width: '40px',
                height: '40px',
                borderRadius: '12px',
                background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#fff',
                fontWeight: '800',
                fontSize: '18px',
                boxShadow: '0 4px 12px rgba(99, 102, 241, 0.3)',
                cursor: 'pointer',
                transition: 'transform 0.3s ease'
              }}
              onMouseOver={(e) => e.currentTarget.style.transform = 'rotate(8deg) scale(1.1)'}
              onMouseOut={(e) => e.currentTarget.style.transform = 'rotate(0deg) scale(1)'}
              onClick={() => scrollTo('hero')}
              >
                MS
              </div>
              <Text className="portfolio-brand-name" style={{
                fontWeight: '800', 
                color: '#0f172a',
                cursor: 'pointer',
                transition: 'transform 0.3s ease',
                letterSpacing: '-0.5px'
              }}
              onClick={() => scrollTo('hero')}
              >
                {info.name}<span className="gradient-text">.</span>
              </Text>
            </div>
            
            <Space size={24} className="desktop-only">
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
            
            <Space size={12} className="desktop-only">
              <Button
                className="btn-outline"
                onClick={() => setContactModalOpen(true)}
                style={{
                  background: 'transparent',
                  border: '2px solid #e2e8f0',
                  color: '#0f172a',
                  borderRadius: '14px',
                  height: '46px',
                  padding: '0 24px',
                  fontWeight: '600',
                  fontSize: '14px',
                  letterSpacing: '0.3px'
                }}
              >
                Get in Touch
              </Button>
              <Button
                className="btn-primary"
                onClick={openWhatsApp}
                icon={<WhatsAppOutlined />}
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
            </Space>
            
            <Button
              className="mobile-only portfolio-menu-toggle"
              type="text"
              aria-label="Open navigation menu"
              aria-expanded={mobileMenuOpen}
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
          width="min(320px, 100vw)"
          title="Navigation"
          styles={{
            body: { padding: '20px', background: 'linear-gradient(135deg, #fafbfc 0%, #f1f5f9 100%)' }
          }}
        >
          <Space direction="vertical" size={12} style={{ width: '100%' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
              <div style={{
                width: '48px',
                height: '48px',
                borderRadius: '14px',
                background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#fff',
                fontWeight: '800',
                fontSize: '20px'
              }}>
                MS
              </div>
              <Text style={{ fontSize: '24px', fontWeight: '800' }}>Menu</Text>
            </div>
            {navItems.map((item) => (
              <Button
                type="text"
                block
                key={item}
                onClick={() => scrollTo(item.toLowerCase())}
                style={{ 
                  fontSize: '18px', 
                  fontWeight: '600', 
                  cursor: 'pointer', 
                  display: 'block',
                  height: 'auto',
                  textAlign: 'left',
                  color: '#0f172a',
                  padding: '10px 14px',
                  borderRadius: '12px',
                  background: '#fff',
                  transition: 'all 0.3s ease'
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.background = 'rgba(99, 102, 241, 0.1)';
                  e.currentTarget.style.transform = 'translateX(8px)';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.background = '#fff';
                  e.currentTarget.style.transform = 'translateX(0)';
                }}
              >
                {item}
              </Button>
            ))}
            <Button
              block
              onClick={openWhatsApp}
              className="btn-primary"
              icon={<WhatsAppOutlined />}
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
          
          <section id="hero" className="portfolio-hero">
            <div style={{
              maxWidth: '1280px',
              margin: '0 auto',
              width: '100%'
            }}>
              <Row gutter={[{ xs: 12, sm: 24, lg: 40 }, 28]} align="middle">
                <Col xs={24} lg={13}>
                  <div style={{
                    opacity: isVisible.hero ? 1 : 0,
                    transform: isVisible.hero ? 'translateY(0)' : 'translateY(40px)',
                    transition: 'all 1s cubic-bezier(0.23, 1, 0.32, 1)'
                  }}>
                    {/* Enhanced Status Badge */}
                    <div style={{ marginBottom: '28px', animation: 'fadeInLeft 0.8s ease 0.2s forwards', opacity: 0 }}>
                      <Tag style={{
                        background: 'rgba(16, 185, 129, 0.12)',
                        border: '1px solid rgba(16, 185, 129, 0.25)',
                        color: '#059669',
                        padding: '12px 24px',
                        borderRadius: '100px',
                        fontSize: '13px',
                        fontWeight: '600',
                        letterSpacing: '0.5px',
                        boxShadow: '0 4px 12px rgba(16, 185, 129, 0.15)'
                      }}>
                        <span className="animate-pulse" style={{
                          display: 'inline-block',
                          width: '8px',
                          height: '8px',
                          borderRadius: '50%',
                          background: '#10b981',
                          marginRight: '10px',
                          boxShadow: '0 0 12px #10b981'
                        }} />
                        Available for opportunities
                      </Tag>
                    </div>
                    
                    {/* Main Title with Enhanced Typography */}
                    <Title className="portfolio-hero-heading" style={{
                      fontWeight: '900',
                      lineHeight: '1.1',
                      color: '#0f172a',
                      margin: '0 0 24px',
                      animation: 'fadeInLeft 0.8s ease 0.3s forwards',
                      opacity: 0,
                      letterSpacing: '-2px',
                      fontFamily: "'Space Grotesk', sans-serif"
                    }}>
                      Java, Spring Boot &amp;{' '}
                      <span className="gradient-text">React.js</span>
                    </Title>
                    
                    {/* Subtitle with Enhanced Styling */}
                    <Paragraph className="portfolio-hero-summary" style={{
                      lineHeight: '1.8',
                      color: '#64748b',
                      maxWidth: '520px',
                      margin: '0 0 40px',
                      animation: 'fadeInLeft 0.8s ease 0.4s forwards',
                      opacity: 0,
                      fontWeight: '400'
                    }}>
                      {profileSummary}
                    </Paragraph>
                    
                    {/* Enhanced CTA Buttons */}
                    <Space className="portfolio-hero-actions" size={12} wrap style={{ animation: 'fadeInLeft 0.8s ease 0.5s forwards', opacity: 0 }}>
                      <Button
                        className="btn-primary"
                        size="large"
                        icon={<WhatsAppOutlined />}
                        onClick={openWhatsApp}
                        style={{
                          border: 'none',
                          color: '#fff',
                          borderRadius: '16px',
                          height: '60px',
                          padding: '0 36px',
                          fontWeight: '700',
                          fontSize: '16px',
                          boxShadow: '0 12px 40px rgba(99, 102, 241, 0.4)'
                        }}
                      >
                        Let's Connect
                      </Button>
                      <Button
                        className="btn-outline"
                        size="large"
                        icon={<EyeOutlined />}
                        onClick={() => setResumeMode('published')}
                        style={{
                          background: 'transparent',
                          border: '2px solid #e2e8f0',
                          color: '#0f172a',
                          borderRadius: '16px',
                          height: '60px',
                          padding: '0 36px',
                          fontWeight: '700',
                          fontSize: '16px'
                        }}
                      >
                        View my resume
                      </Button>
                      <Button size="large" onClick={() => setResumeMode('builder')}>
                        Build your own resume
                      </Button>
                    </Space>
                    
                    {/* Enhanced Social Icons */}
                    <Space size={12} style={{ animation: 'fadeInLeft 0.8s ease 0.6s forwards', opacity: 0 }}>
                      {[
                        { icon: <LinkedinOutlined />, label: 'LinkedIn', onClick: () => window.open('https://www.linkedin.com/in/er-md-sahjaan-4a33b1247?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app', '_blank') },
                        { icon: <MailOutlined />, label: 'Email', onClick: () => window.location.href = 'mailto:sahjan11957@gmail.com' },
                        { icon: <GlobalOutlined />, label: 'Website', onClick: () => window.open(info.website, '_blank') }
                      ].map((s, i) => (
                        <Tooltip title={s.label} key={i}>
                          <div
                            className="social-icon"
                            onClick={s.onClick}
                            style={{
                              width: '52px',
                              height: '52px',
                              borderRadius: '14px',
                              background: '#fff',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              cursor: 'pointer',
                              fontSize: '20px',
                              color: '#64748b',
                              boxShadow: '0 4px 16px rgba(0, 0, 0, 0.06)',
                              border: '1px solid #f1f5f9'
                            }}
                          >
                            {s.icon}
                          </div>
                        </Tooltip>
                      ))}
                    </Space>
                  </div>
                </Col>
                
                <Col xs={24} lg={11}>
                  <figure className="hero-portrait">
                    <div className="hero-portrait-scene" aria-hidden="true">
                      <span className="hero-orbit hero-orbit-outer" />
                      <span className="hero-orbit hero-orbit-inner" />
                      <span className="hero-orbit-light" />
                    </div>
                    <img className="hero-portrait-image" src={info.photo} alt={`Portrait of ${info.name}`} width={1086} height={1448} fetchPriority="high" />
                    <figcaption>
                      <strong>{info.name}</strong>
                      <span>{info.role}</span>
                    </figcaption>
                  </figure>
                </Col>
              </Row>
            </div>
          </section>

          {/* About Section - Keep existing but with minor enhancements */}
          <section id="about" style={{
            padding: 'var(--portfolio-section-padding)',
            background: '#fff'
          }}>
            <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
              <div style={{
                textAlign: 'center', 
                marginBottom: 'var(--portfolio-section-heading-gap)',
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
                  fontSize: 'clamp(32px, 5vw, 52px)',
                  fontWeight: '900',
                  margin: '0',
                  color: '#0f172a',
                  letterSpacing: '-1.5px',
                  fontFamily: "'Space Grotesk', sans-serif"
                }}>
                  What I Do <span className="gradient-text">Best</span>
                </Title>
                <AboutIntroduction />
              </div>

              <Row gutter={[{ xs: 12, sm: 20, lg: 28 }, { xs: 16, sm: 20, lg: 28 }]}>
                <Col xs={24} lg={14}>
                  <Card
                    className={`card-hover glass-card ${isVisible.about ? 'visible' : ''}`}
                    style={{
                      height: '100%',
                      borderRadius: '28px',
                      border: '1px solid rgba(255, 255, 255, 0.8)',
                      boxShadow: '0 8px 32px rgba(0, 0, 0, 0.06)',
                      transitionDelay: '0.1s',
                      position: 'relative',
                      overflow: 'hidden'
                    }}
                    styles={{ body: { padding: 'clamp(8px, 4vw, 40px)' } }}
                  >
                    {/* Gradient Overlay */}
                    <div style={{
                      position: 'absolute',
                      top: 0,
                      right: 0,
                      width: '200px',
                      height: '200px',
                      background: 'radial-gradient(circle, rgba(99, 102, 241, 0.08) 0%, transparent 70%)',
                      pointerEvents: 'none'
                    }} />
                    
                    <div className="skill-icon" style={{
                      width: '68px',
                      height: '68px',
                      borderRadius: '20px',
                      background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginBottom: '28px',
                      color: '#fff',
                      fontSize: '30px',
                      boxShadow: '0 12px 28px rgba(99, 102, 241, 0.35)',
                      position: 'relative'
                    }}>
                      <RocketOutlined />
                    </div>
                    
                    <Title level={3} style={{ margin: '0 0 16px', fontWeight: '800', fontSize: '26px', letterSpacing: '-0.5px' }}>
                      Full-Stack Development
                    </Title>
                    
                    <Paragraph style={{
                      color: '#475569',
                      lineHeight: '1.9',
                      margin: '0 0 24px',
                      fontSize: '16px'
                    }}>
                      I work across Java and Spring Boot features and React.js interfaces. My portfolio includes patient intake and practice operations workflows.
                    </Paragraph>
                    
                    <div style={{ marginTop: '32px' }}>
                      <Space wrap size={[10, 10]}>
                        {coreSkills.map((tag) => (
                          <Tag
                            key={tag}
                            className="tag-animated"
                            style={{
                              background: 'rgba(99, 102, 241, 0.1)',
                              border: 'none',
                              borderRadius: '12px',
                              padding: '10px 18px',
                              color: '#6366f1',
                              fontSize: '13px',
                              fontWeight: '700',
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
                  <Row gutter={[{ xs: 12, sm: 20, lg: 28 }, { xs: 16, sm: 20, lg: 28 }]}>
                    <Col span={24}>
                      <Card
                        className={`card-hover glass-card-dark ${isVisible.about ? 'visible' : ''}`}
                        style={{
                          borderRadius: '28px',
                          border: 'none',
                          background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
                          boxShadow: '0 20px 56px rgba(15, 23, 42, 0.3)',
                          transitionDelay: '0.2s',
                          position: 'relative',
                          overflow: 'hidden'
                        }}
                        styles={{ body: { padding: '32px' } }}
                      >
                        {/* Animated background pattern */}
                        <div style={{
                          position: 'absolute',
                          top: 0,
                          right: 0,
                          width: '150px',
                          height: '150px',
                          background: 'radial-gradient(circle, rgba(99, 102, 241, 0.15) 0%, transparent 70%)',
                          pointerEvents: 'none'
                        }} />
                        
                        <Row align="middle" gutter={20}>
                          <Col flex="auto">
                            <Text style={{ color: '#94a3b8', fontSize: '14px', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '1px' }}>Current Role</Text>
                            <Title level={4} style={{ color: '#fff', margin: '10px 0 6px', fontWeight: '800', fontSize: '22px' }}>
                              Software Engineer
                            </Title>
                            <Text style={{ 
                              background: 'linear-gradient(90deg, #6366f1, #8b5cf6)',
                              WebkitBackgroundClip: 'text',
                              WebkitTextFillColor: 'transparent',
                              fontSize: '15px', 
                              fontWeight: '700' 
                            }}>
                              {work.company}
                            </Text>
                          </Col>
                          <Col>
                            <div className="animate-float" style={{
                              width: '60px',
                              height: '60px',
                              borderRadius: '18px',
                              background: 'rgba(99, 102, 241, 0.2)',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              color: '#6366f1',
                              fontSize: '28px'
                            }}>
                              <CodeOutlined />
                            </div>
                          </Col>
                        </Row>
                      </Card>
                    </Col>
                    
                    <Col xs={24} sm={12}>
                      <Card
                        className={`card-hover glass-card ${isVisible.about ? 'visible' : ''}`}
                        style={{
                          borderRadius: '28px',
                          border: '1px solid rgba(255, 255, 255, 0.8)',
                          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.06)',
                          textAlign: 'center',
                          transitionDelay: '0.3s'
                        }}
                        styles={{ body: { padding: '28px 20px' } }}
                      >
                        <div className="animate-pulse" style={{
                          width: '54px',
                          height: '54px',
                          borderRadius: '16px',
                          background: 'rgba(245, 158, 11, 0.12)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          margin: '0 auto 14px'
                        }}>
                          <ThunderboltOutlined style={{ fontSize: '26px', color: '#f59e0b' }} />
                        </div>
                        <Title level={2} style={{ margin: '0 0 4px', color: '#0f172a', fontSize: '32px', fontWeight: '900' }}>Java</Title>
                        <Text style={{ fontSize: '12px', color: '#64748b', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Backend development</Text>
                      </Card>
                    </Col>
                    
                    <Col xs={24} sm={12}>
                      <Card
                        className={`card-hover glass-card ${isVisible.about ? 'visible' : ''}`}
                        style={{
                          borderRadius: '28px',
                          border: '1px solid rgba(255, 255, 255, 0.8)',
                          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.06)',
                          textAlign: 'center',
                          transitionDelay: '0.4s'
                        }}
                        styles={{ body: { padding: '28px 20px' } }}
                      >
                        <div className="animate-pulse" style={{
                          width: '54px',
                          height: '54px',
                          borderRadius: '16px',
                          background: 'rgba(236, 72, 153, 0.12)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          margin: '0 auto 14px'
                        }}>
                          <HeartOutlined style={{ fontSize: '26px', color: '#ec4899' }} />
                        </div>
                        <Title level={2} style={{ margin: '0 0 4px', color: '#0f172a', fontSize: '32px', fontWeight: '900' }}>React.js</Title>
                        <Text style={{ fontSize: '12px', color: '#64748b', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Frontend development</Text>
                      </Card>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </div>
          </section>

          {/* Skills Section */}
          <section id="skills" style={{
            padding: 'var(--portfolio-section-padding)',
            background: '#f8fafc'
          }}>
            <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
              <div style={{ 
                textAlign: 'center', 
                marginBottom: 'var(--portfolio-section-heading-gap)',
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
                  fontSize: 'clamp(32px, 5vw, 52px)',
                  fontWeight: '900',
                  margin: '0',
                  color: '#0f172a',
                  letterSpacing: '-1.5px',
                  fontFamily: "'Space Grotesk', sans-serif"
                }}>
                  Technologies I <span className="gradient-text">Master</span>
                </Title>
              </div>

              <Row gutter={[{ xs: 12, sm: 20, lg: 28 }, { xs: 16, sm: 20, lg: 28 }]}>
                {skills.map((skill, i) => (
                  <Col xs={24} sm={12} lg={8} key={i}>
                    <Card
                      className={`card-hover skill-card ${isVisible.skills ? 'visible' : ''}`}
                      style={{
                        height: '100%',
                        borderRadius: '28px',
                        border: '1px solid #f1f5f9',
                        boxShadow: '0 4px 16px rgba(0, 0, 0, 0.04)',
                        textAlign: 'center',
                        transitionDelay: `${0.1 * i}s`,
                        background: '#fff',
                        position: 'relative',
                        overflow: 'hidden'
                      }}
                      styles={{ body: { padding: '36px 24px' } }}
                    >
                      {/* Progress ring background */}
                      <div style={{
                        position: 'absolute',
                        top: 0,
                        right: 0,
                        width: '100px',
                        height: '100px',
                        background: `radial-gradient(circle, ${skill.color}10 0%, transparent 70%)`,
                        pointerEvents: 'none'
                      }} />
                      
                      <div className="skill-icon animate-float" style={{
                        width: '70px',
                        height: '70px',
                        borderRadius: '20px',
                        background: skill.gradient,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        margin: '0 auto 24px',
                        fontSize: '30px',
                        color: '#fff',
                        boxShadow: `0 12px 28px ${skill.color}50`
                      }}>
                        {skill.icon}
                      </div>
                      
                      <Text style={{
                        fontWeight: '800',
                        fontSize: '18px',
                        display: 'block',
                        marginBottom: '12px',
                        color: '#0f172a',
                        letterSpacing: '-0.3px'
                      }}>
                        {skill.name}
                      </Text>
                      
                      <Space direction="vertical" size={10} style={{ width: '100%' }}>
                        {skill.items.map((item, j) => (
                          <Tag
                            key={j}
                            style={{
                              background: '#f8fafc',
                              border: '1px solid #f1f5f9',
                              borderRadius: '10px',
                              padding: '8px 16px',
                              fontSize: '13px',
                              color: '#475569',
                              margin: 0,
                              fontWeight: '600',
                              cursor: 'default',
                              width: '100%'
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

          {/* Enhanced Projects Section with Modal */}
          <section id="projects" style={{
            padding: 'var(--portfolio-section-padding)',
            background: '#fff'
          }}>
            <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
              <div style={{ 
                textAlign: 'center', 
                marginBottom: 'var(--portfolio-section-heading-gap)',
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
                  fontSize: 'clamp(32px, 5vw, 52px)',
                  fontWeight: '900',
                  margin: '0',
                  color: '#0f172a',
                  letterSpacing: '-1.5px',
                  fontFamily: "'Space Grotesk', sans-serif"
                }}>
                  Featured <span className="gradient-text">Projects</span>
                </Title>
              </div>

              <Row gutter={[{ xs: 12, sm: 20, lg: 28 }, { xs: 16, sm: 20, lg: 28 }]}>
                {projects.map((project, i) => (
                  <Col xs={24} sm={12} key={i}>
                    <Card
                      className={`card-hover project-card ${isVisible.projects ? 'visible' : ''}`}
                      onClick={() => {
                        setSelectedProject(project);
                        setProjectModalOpen(true);
                      }}
                      style={{
                        '--project-color': project.color,
                        height: '100%',
                        borderRadius: '28px',
                        border: '1px solid #f1f5f9',
                        boxShadow: '0 4px 16px rgba(0, 0, 0, 0.04)',
                        cursor: 'pointer',
                        transitionDelay: `${0.1 * i}s`,
                        background: '#fff',
                        position: 'relative',
                        overflow: 'hidden'
                      }}
                      styles={{ body: { padding: 'clamp(20px, 4vw, 36px)' } }}
                    >
                      {/* Hover gradient overlay */}
                      <div style={{
                        position: 'absolute',
                        top: 0,
                        right: 0,
                        width: '150px',
                        height: '150px',
                        background: `radial-gradient(circle, ${project.color}12 0%, transparent 70%)`,
                        pointerEvents: 'none',
                        opacity: 0,
                        transition: 'opacity 0.3s ease'
                      }} className="project-gradient" />
                      
                      <div className="project-icon" style={{
                        width: '64px',
                        height: '64px',
                        borderRadius: '18px',
                        background: `${project.color}15`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginBottom: '24px',
                        fontSize: '28px',
                        color: project.color
                      }}>
                        {project.icon}
                      </div>
                      
                      <Title level={4} style={{ margin: '0 0 12px', fontWeight: '800', fontSize: '21px', letterSpacing: '-0.5px' }}>
                        {project.title}
                      </Title>
                      
                      <Text style={{
                        color: '#64748b',
                        fontSize: '15px',
                        lineHeight: '1.7',
                        display: 'block',
                        marginBottom: '24px'
                      }}>
                        {project.desc}
                      </Text>
                      
                      <Space wrap size={[8, 8]} style={{ marginBottom: '24px' }}>
                        {project.tags.map((tag, j) => (
                          <Tag
                            key={j}
                            style={{
                              background: '#f8fafc',
                              border: '1px solid #f1f5f9',
                              borderRadius: '8px',
                              padding: '6px 14px',
                              fontSize: '12px',
                              color: '#475569',
                              margin: 0,
                              fontWeight: '600'
                            }}
                          >
                            {tag}
                          </Tag>
                        ))}
                      </Space>
                      
                      <Button
                        type="text"
                        icon={<EyeOutlined />}
                        aria-label={`View details for ${project.title}`}
                        style={{ color: project.color, fontWeight: 700 }}
                        onClick={event => {
                          event.stopPropagation();
                          setSelectedProject(project);
                          setProjectModalOpen(true);
                        }}
                      >
                        View Details
                      </Button>
                    </Card>
                  </Col>
                ))}
              </Row>
            </div>
          </section>

          {/* Experience Section */}
          <section id="experience" style={{
            padding: 'var(--portfolio-section-padding)',
            background: '#f8fafc'
          }}>
            <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
              <div style={{ 
                textAlign: 'center', 
                marginBottom: 'var(--portfolio-section-heading-gap)',
                opacity: isVisible.experience ? 1 : 0,
                transform: isVisible.experience ? 'translateY(0)' : 'translateY(30px)',
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
                  fontSize: 'clamp(32px, 5vw, 52px)',
                  fontWeight: '900',
                  margin: '0',
                  color: '#0f172a',
                  letterSpacing: '-1.5px',
                  fontFamily: "'Space Grotesk', sans-serif"
                }}>
                  Work <span className="gradient-text">Experience</span>
                </Title>
              </div>

              {experience.map((exp, i) => (
                <Card
                  key={i}
                  className="card-hover visible"
                  style={{
                    borderRadius: '28px',
                    border: '1px solid #f1f5f9',
                    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.06)',
                    background: '#fff',
                    overflow: 'hidden',
                    position: 'relative'
                  }}
                  styles={{ body: { padding: 0 } }}
                >
                  {/* Animated gradient bar */}
                  <div className="progress-bar-animated" style={{
                    background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
                    padding: '5px'
                  }} />
                  
                  <div style={{ padding: 'clamp(18px, 4vw, 40px)' }}>
                    {/* Header Row */}
                    <Row gutter={[24, 24]} align="middle" style={{ marginBottom: '32px' }}>
                      <Col xs={24} lg={16}>
                        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '24px' }}>
                          <div style={{
                            width: '72px',
                            height: '72px',
                            borderRadius: '20px',
                            background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            flexShrink: 0,
                            boxShadow: '0 12px 28px rgba(99, 102, 241, 0.35)'
                          }}>
                            <CodeOutlined style={{ fontSize: '32px', color: '#fff' }} />
                          </div>
                          <div>
                            <Title level={3} style={{ margin: '0 0 6px', fontWeight: '800', fontSize: '26px', letterSpacing: '-0.5px' }}>
                              {exp.title}
                            </Title>
                            <Text style={{ 
                              fontSize: '18px', 
                              fontWeight: '700',
                              background: 'linear-gradient(90deg, #6366f1, #8b5cf6)',
                              WebkitBackgroundClip: 'text',
                              WebkitTextFillColor: 'transparent',
                              display: 'block',
                              marginBottom: '6px'
                            }}>
                              {exp.company}
                            </Text>
                            <Text style={{ fontSize: '15px', color: '#64748b', fontWeight: '600' }}>
                              {exp.project}
                            </Text>
                          </div>
                        </div>
                      </Col>
                      <Col xs={24} lg={8}>
                        <div style={{ 
                          display: 'flex', 
                          flexDirection: 'column', 
                          gap: '10px',
                          textAlign: 'right'
                        }}>
                          <Tag style={{
                            background: 'rgba(16, 185, 129, 0.12)',
                            border: '1px solid rgba(16, 185, 129, 0.25)',
                            color: '#059669',
                            padding: '8px 20px',
                            borderRadius: '100px',
                            fontSize: '14px',
                            fontWeight: '700',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '10px',
                            marginLeft: 'auto',
                            width: 'fit-content'
                          }}>
                            <span className="animate-pulse" style={{
                              width: '8px',
                              height: '8px',
                              borderRadius: '50%',
                              background: '#10b981'
                            }} />
                            {exp.duration}
                          </Tag>
                          <Text style={{ fontSize: '14px', color: '#94a3b8', fontWeight: '500' }}>
                            {exp.period}
                          </Text>
                          <Text style={{ fontSize: '14px', color: '#475569' }}>
                            {exp.companyLocation} · {exp.workArrangement}
                          </Text>
                        </div>
                      </Col>
                    </Row>

                    {/* Enhanced Divider */}
                    <div style={{ 
                      height: '1px', 
                      background: 'linear-gradient(90deg, transparent, rgba(99, 102, 241, 0.2), transparent)',
                      margin: '32px 0'
                    }} />

                    {/* Achievements */}
                    <div style={{ marginBottom: '32px' }}>
                      <Text style={{ 
                        fontSize: '15px', 
                        fontWeight: '800', 
                        color: '#0f172a',
                        textTransform: 'uppercase',
                        letterSpacing: '1.5px',
                        display: 'block',
                        marginBottom: '20px'
                      }}>
                        <TrophyOutlined style={{ marginRight: '8px', color: '#f59e0b' }} />
                        Responsibilities
                      </Text>
                      <Space direction="vertical" size={14} style={{ width: '100%' }}>
                        {exp.achievements.map((achievement, j) => (
                          <div key={j} className="cert-item" style={{ 
                            display: 'flex', 
                            alignItems: 'flex-start', 
                            gap: '16px',
                            padding: '16px 20px',
                            background: '#f8fafc',
                            borderRadius: '14px',
                            border: '1px solid #f1f5f9',
                            transition: 'all 0.3s ease'
                          }}>
                            <CheckCircleOutlined style={{ 
                              color: '#10b981', 
                              fontSize: '18px',
                              marginTop: '2px',
                              flexShrink: 0
                            }} />
                            <Text style={{ fontSize: '15px', color: '#475569', lineHeight: '1.7', fontWeight: '500' }}>
                              {achievement}
                            </Text>
                          </div>
                        ))}
                      </Space>
                    </div>

                    {/* Technologies */}
                    <div>
                      <Text style={{ 
                        fontSize: '15px', 
                        fontWeight: '800', 
                        color: '#0f172a',
                        textTransform: 'uppercase',
                        letterSpacing: '1.5px',
                        display: 'block',
                        marginBottom: '16px'
                      }}>
                        <FireOutlined style={{ marginRight: '8px', color: '#f59e0b' }} />
                        Technologies Used
                      </Text>
                      <Space wrap size={[10, 10]}>
                        {exp.technologies.map((tech, j) => (
                          <Tag
                            key={j}
                            className="tag-animated"
                            style={{
                              background: 'rgba(99, 102, 241, 0.1)',
                              border: 'none',
                              borderRadius: '12px',
                              padding: '10px 18px',
                              color: '#6366f1',
                              fontSize: '14px',
                              fontWeight: '700',
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

          {/* Education Section */}
          <section id="education" style={{
            padding: 'var(--portfolio-section-padding)',
            background: '#fff'
          }}>
            <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
              <Row gutter={[{ xs: 12, sm: 24, lg: 60 }, 24]}>
                <Col xs={24} style={{
                  opacity: isVisible.education ? 1 : 0,
                  transform: isVisible.education ? 'translateY(0)' : 'translateY(20px)',
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
                    fontWeight: '900',
                    margin: '0 0 32px',
                    color: '#0f172a',
                    fontSize: '36px',
                    letterSpacing: '-1px',
                    fontFamily: "'Space Grotesk', sans-serif"
                  }}>
                    Academic <span className="gradient-text">Journey</span>
                  </Title>
                  
                  <Space direction="vertical" size={18} style={{ width: '100%' }}>
                    {education.map((edu, i) => (
                      <Card
                        key={i}
                        className="card-hover visible"
                        style={{
                          borderRadius: '20px',
                          border: '1px solid #f1f5f9',
                          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)',
                          background: '#fff'
                        }}
                        styles={{ body: { padding: '24px 28px' } }}
                      >
                        <Row className="portfolio-education-row" gutter={[12, 10]} justify="space-between" align="top">
                          <Col xs={24} sm={16}>
                            <Text style={{ fontWeight: '800', fontSize: '18px', display: 'block', color: '#0f172a', marginBottom: '4px' }}>
                              {edu.degree}
                            </Text>
                            <Text style={{ color: '#64748b', fontSize: '15px', fontWeight: '600' }}>
                              {edu.school}
                            </Text>
                          </Col>
                          <Col xs={24} sm={8} className="portfolio-education-score">
                            <Tag style={{
                              background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.12) 0%, rgba(139, 92, 246, 0.12) 100%)',
                              border: 'none',
                              color: '#6366f1',
                              borderRadius: '10px',
                              fontSize: '14px',
                              fontWeight: '800',
                              padding: '6px 14px'
                            }}>
                              {edu.score}
                            </Tag>
                            <Text style={{ display: 'block', fontSize: '13px', color: '#94a3b8', marginTop: '8px', fontWeight: '600' }}>
                              {edu.year}
                            </Text>
                          </Col>
                        </Row>
                      </Card>
                    ))}
                  </Space>
                  <Title level={3} style={{ margin: '32px 0 16px', color: '#0f172a' }}>
                    Certifications
                  </Title>
                  <ul className="portfolio-certifications">
                    {certifications.map(certification => <li key={certification}>{certification}</li>)}
                  </ul>
                </Col>
                
              </Row>
            </div>
          </section>

          {/* Contact Section */}
          <section id="contact" style={{
            padding: 'var(--portfolio-section-padding)',
            background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
            position: 'relative',
            overflow: 'hidden'
          }}>
            {/* Enhanced background decoration */}
            <div className="blob-animation" style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: '700px',
              height: '700px',
              background: 'radial-gradient(circle, rgba(99, 102, 241, 0.2) 0%, transparent 70%)',
              filter: 'blur(100px)'
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
              <div className="animate-float" style={{
                width: '80px',
                height: '80px',
                borderRadius: '20px',
                background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 32px',
                fontSize: '36px',
                color: '#fff',
                boxShadow: '0 16px 40px rgba(99, 102, 241, 0.4)'
              }}>
                <RocketOutlined />
              </div>
              
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
                fontSize: 'clamp(32px, 6vw, 56px)',
                fontWeight: '900',
                margin: '0 0 24px',
                color: '#fff',
                letterSpacing: '-1.5px',
                fontFamily: "'Space Grotesk', sans-serif"
              }}>
                Let's Build Something{' '}
                <span className="gradient-text">Amazing</span>
              </Title>
              <Paragraph style={{
                fontSize: '18px',
                color: '#94a3b8',
                marginBottom: '48px',
                lineHeight: '1.8'
              }}>
                Have a full-stack project in mind? I'd love to hear about it and explore how we can work together to create something extraordinary.
              </Paragraph>
              
              <Space className="portfolio-contact-actions" size={12} wrap>
                <Button
                  className="btn-primary"
                  size="large"
                  icon={<WhatsAppOutlined />}
                  onClick={openWhatsApp}
                  style={{
                    border: 'none',
                    color: '#fff',
                    borderRadius: '16px',
                    height: '60px',
                    padding: '0 36px',
                    fontWeight: '700',
                    fontSize: '16px'
                  }}
                >
                  WhatsApp Me
                </Button>
                <Button
                  size="large"
                  icon={<SendOutlined />}
                  onClick={() => setContactModalOpen(true)}
                  style={{
                    background: 'transparent',
                    border: '2px solid #334155',
                    color: '#fff',
                    borderRadius: '16px',
                    height: '60px',
                    padding: '0 36px',
                    fontWeight: '700',
                    fontSize: '16px',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.borderColor = '#6366f1';
                    e.currentTarget.style.color = '#6366f1';
                    e.currentTarget.style.transform = 'translateY(-4px)';
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.borderColor = '#334155';
                    e.currentTarget.style.color = '#fff';
                    e.currentTarget.style.transform = 'translateY(0)';
                  }}
                >
                  Send Message
                </Button>
              </Space>
              
              <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '12px' }}>
                {[
                  { icon: <LinkedinOutlined />, label: 'LinkedIn', onClick: () => window.open('https://www.linkedin.com/in/er-md-sahjaan-4a33b1247', '_blank') },
                  { icon: <MailOutlined />, label: 'Email', onClick: () => window.location.href = 'mailto:sahjan11957@gmail.com' },
                  { icon: <PhoneOutlined />, label: 'Phone', onClick: () => window.location.href = `tel:${info.phone}` }
                ].map((item, i) => (
                  <Tooltip title={item.label} key={i}>
                    <div
                      className="social-icon"
                      onClick={item.onClick}
                      style={{
                        width: '52px',
                        height: '52px',
                        borderRadius: '16px',
                        background: '#1e293b',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer',
                        fontSize: '22px',
                        color: '#94a3b8',
                        border: '1px solid #334155'
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

        {/* Enhanced Footer */}
        <Footer className="portfolio-footer" style={{
          textAlign: 'center',
          background: '#0f172a',
          borderTop: '1px solid rgba(99, 102, 241, 0.15)',
          padding: '32px var(--portfolio-gutter)'
        }}>
          <Space direction="vertical" size={12}>
            <Text style={{ color: '#64748b', fontSize: '15px', fontWeight: '600' }}>
              © {new Date().getFullYear()} {info.name} · Built with{' '}
              <HeartOutlined style={{ color: '#ec4899', margin: '0 4px' }} /> and lots of coffee
            </Text>
            <Space size={16}>
              <Text style={{ color: '#475569', fontSize: '13px', fontWeight: '500' }}>
                React.js
              </Text>
              <Text style={{ color: '#334155' }}>•</Text>
              <Text style={{ color: '#475569', fontSize: '13px', fontWeight: '500' }}>
                Ant Design
              </Text>
              <Text style={{ color: '#334155' }}>•</Text>
              <Text style={{ color: '#475569', fontSize: '13px', fontWeight: '500' }}>
                Firebase
              </Text>
            </Space>
          </Space>
        </Footer>

        {/* Enhanced Chat Widget */}
        {chatOpen && (
          <div className="portfolio-chat-panel" id="portfolio-chat" aria-label="Portfolio chat" style={{
            borderRadius: '20px',
            boxShadow: '0 24px 72px rgba(0, 0, 0, 0.2), 0 0 0 1px rgba(0, 0, 0, 0.05)',
            background: '#fff',
            zIndex: 1001,
            overflow: 'hidden',
            animation: 'scaleIn 0.3s cubic-bezier(0.23, 1, 0.32, 1)'
          }}>
            {/* Enhanced Header */}
            <div className="portfolio-chat-header" style={{
              background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
              color: '#fff',
              position: 'relative',
              overflow: 'hidden'
            }}>
              {/* Animated background pattern */}
              <div style={{
                position: 'absolute',
                top: 0,
                right: 0,
                width: '120px',
                height: '120px',
                background: 'radial-gradient(circle, rgba(255, 255, 255, 0.15) 0%, transparent 70%)',
                pointerEvents: 'none'
              }} />
              
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'relative' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                  <Avatar 
                    size={52}
                    style={{
                      background: '#fff',
                      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
                      fontSize: '24px'
                    }}
                  >
                    🤖
                  </Avatar>
                  <div>
                    <Text style={{ fontSize: '18px', fontWeight: '800', color: '#fff', display: 'block' }}>
                      Chat with us!
                    </Text>
                    <Text style={{ fontSize: '12px', color: 'rgba(255, 255, 255, 0.8)', fontWeight: '500' }}>
                      We reply instantly
                    </Text>
                  </div>
                </div>
                <Button
                  type="text"
                  size="small"
                  onClick={() => setChatOpen(false)}
                  icon={<CloseOutlined style={{ fontSize: '16px' }} />}
                  style={{ 
                    color: '#fff', 
                    opacity: 0.8,
                    width: '32px',
                    height: '32px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                />
              </div>
            </div>

            {/* Chat Body */}
            <div
              className="portfolio-chat-messages"
              style={{
                background: "#f8fafc",
              }}
              ref={chatBodyRef}
            >
              {/* First default bot message */}
              {messages.length === 0 && (
                <div
                  style={{
                    background: "#fff",
                    borderRadius: '16px',
                    padding: "20px",
                    boxShadow: "0 2px 12px rgba(0, 0, 0, 0.08)",
                    border: "1px solid #f1f5f9",
                    marginBottom: "16px",
                    animation: 'fadeInUp 0.5s ease'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
                    <Avatar size={32} style={{ background: 'linear-gradient(135deg, #3b82f6, #1d4ed8)' }}>
                      🤖
                    </Avatar>
                    <Text style={{ fontWeight: '700', color: '#0f172a' }}>Sahjaan Bot</Text>
                  </div>
                  <Text style={{ fontSize: "15px", color: "#374151", lineHeight: "1.7", display: 'block' }}>
                    Hi there! I'm Sahjaan, a Java and React.js full-stack developer.
                    How can I help you today?
                  </Text>

                  {/* Quick Action Buttons */}
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "10px",
                      marginTop: "20px",
                    }}
                  >
                    <Button
                      block
                      onClick={() => window.location.href = `mailto:${info.email}?subject=Project Inquiry`}
                      icon={<MailOutlined />}
                      style={{
                        border: "1px solid #3b82f6",
                        borderRadius: "10px",
                        color: "#3b82f6",
                        fontWeight: "600",
                        height: "44px",
                        background: "transparent",
                      }}
                    >
                      Discuss a project
                    </Button>

                    <Button
                      block
                      onClick={openWhatsApp}
                      icon={<WhatsAppOutlined />}
                      style={{
                        border: "1px solid #3b82f6",
                        borderRadius: "10px",
                        color: "#3b82f6",
                        fontWeight: "600",
                        height: "44px",
                        background: "transparent",
                      }}
                    >
                      Connect on WhatsApp
                    </Button>

                    <Button
                      block
                      onClick={() => {
                        setChatOpen(false);
                        setResumeMode('published');
                      }}
                      icon={<EyeOutlined />}
                      style={{
                        border: "1px solid #3b82f6",
                        borderRadius: "10px",
                        color: "#3b82f6",
                        fontWeight: "600",
                        height: "44px",
                        background: "transparent",
                      }}
                    >
                      View my resume
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
                    marginBottom: "14px",
                    animation: 'fadeInUp 0.3s ease'
                  }}
                >
                  <div
                    style={{
                      padding: "14px 18px",
                      borderRadius: m.sender === "user" ? "16px 16px 4px 16px" : "16px 16px 16px 4px",
                      maxWidth: "75%",
                      background: m.sender === "user" ? "linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)" : "#fff",
                      color: m.sender === "user" ? "#fff" : "#374151",
                      boxShadow: "0 2px 12px rgba(0,0,0,0.08)",
                      fontSize: '14px',
                      lineHeight: '1.6',
                      fontWeight: '500'
                    }}
                  >
                    {m.text}
                  </div>
                </div>
              ))}
              
              {/* Typing Indicator */}
              {isTyping && (
                <div style={{ display: 'flex', justifyContent: 'flex-start', marginBottom: '14px' }}>
                  <div style={{
                    background: '#fff',
                    borderRadius: '16px 16px 16px 4px',
                    padding: '14px 18px',
                    boxShadow: '0 2px 12px rgba(0,0,0,0.08)'
                  }}>
                    <div className="typing-indicator">
                      <div className="typing-dot" />
                      <div className="typing-dot" />
                      <div className="typing-dot" />
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Enhanced Footer */}
            <div
              className="portfolio-chat-compose"
              style={{
                borderTop: "1px solid #f1f5f9",
                background: "#fff",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                <Input
                  value={currentMessage}
                  onChange={(e) => setCurrentMessage(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && sendMessage()}
                  placeholder="Type your message..."
                  className="form-input-enhanced"
                  style={{
                    flex: 1,
                    minWidth: 0,
                    borderRadius: "14px",
                    border: "1px solid #e2e8f0",
                    padding: "14px 16px",
                    fontSize: "14px",
                    outline: "none",
                  }}
                />

                <Button
                  shape="circle"
                  onClick={sendMessage}
                  disabled={!currentMessage.trim()}
                  icon={<SendOutlined style={{ fontSize: "16px" }} />}
                  style={{
                    width: "48px",
                    height: "48px",
                    background: currentMessage.trim() 
                      ? "linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)" 
                      : "#e2e8f0",
                    border: "none",
                    color: "#fff",
                    boxShadow: currentMessage.trim() ? "0 4px 12px rgba(59, 130, 246, 0.4)" : "none",
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                />
              </div>
            </div>
          </div>
        )}

        {/* Enhanced Floating Action Buttons */}
        <div className="portfolio-floating-actions">
          <Tooltip title={chatOpen ? "Close chat" : "Chat with us"} placement="left">
            <Button
              onClick={() => setChatOpen(!chatOpen)}
              className="portfolio-chat-toggle"
              aria-label={chatOpen ? "Close chat" : "Open chat"}
              aria-expanded={chatOpen}
              aria-controls={chatOpen ? "portfolio-chat" : undefined}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                height: '56px',
                padding: '0 28px 0 20px',
                background: chatOpen 
                  ? 'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)' 
                  : 'linear-gradient(135deg, #a34a28 0%, #8b3d1f 100%)',
                border: 'none',
                borderRadius: '100px',
                color: '#fff',
                boxShadow: chatOpen 
                  ? '0 12px 32px rgba(99, 102, 241, 0.5), 0 0 0 4px rgba(99, 102, 241, 0.2)'
                  : '0 12px 32px rgba(163, 74, 40, 0.5), 0 0 0 4px rgba(163, 74, 40, 0.2)',
                cursor: 'pointer',
                fontWeight: '700',
                fontSize: '15px',
                transition: 'all 0.3s cubic-bezier(0.23, 1, 0.32, 1)'
              }}
              onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-4px) scale(1.05)'}
              onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0) scale(1)'}
            >
              <div style={{
                width: '28px',
                height: '28px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                {chatOpen ? <ArrowDownOutlined style={{ fontSize: '20px' }} /> : <MessageOutlined style={{ fontSize: '20px' }} />}
              </div>
              <span className="portfolio-chat-toggle-label">{chatOpen ? 'Close' : 'Chat Now'}</span>
            </Button>
          </Tooltip>
          <Tooltip title="Back to Top" placement="left">
            <Button
              className="portfolio-back-to-top"
              aria-label="Back to top"
              shape="circle"
              icon={<ArrowUpOutlined style={{ fontSize: '18px' }} />}
              onClick={() => scrollTo('hero')}
              style={{
                width: '52px',
                height: '52px',
                background: '#fff',
                border: '1px solid #f1f5f9',
                color: '#0f172a',
                boxShadow: '0 4px 16px rgba(0, 0, 0, 0.08)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            />
          </Tooltip>
        </div>

        {resumeMode === 'published' && <PublishedResume profile={{ ...info, phone: '+91 9942276253' }} close={() => setResumeMode(null)} />}
        {resumeMode === 'builder' && <ResumeBuilder initialDraft={initialResumeDraft} close={() => {
          setResumeMode(null);
          onCloseResume();
        }} openPortfolioBuilder={(resumeDraft, seed) => {
          onOpenPortfolioBuilder({ resumeDraft, seed });
          navigate('/portfolio/build');
        }} />}

        {/* Contact Modal */}
        <Modal
          className="portfolio-form-dialog"
          open={contactModalOpen}
          onCancel={() => setContactModalOpen(false)}
          footer={null}
          width={600}
          centered
          styles={{
            body: { padding: '40px' }
          }}
        >
          <div style={{ textAlign: 'center', marginBottom: '32px' }}>
            <div className="animate-float" style={{
              width: '64px',
              height: '64px',
              borderRadius: '18px',
              background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 20px',
              fontSize: '28px',
              color: '#fff',
              boxShadow: '0 12px 28px rgba(99, 102, 241, 0.35)'
            }}>
              <SendOutlined />
            </div>
            <Title level={3} style={{ margin: '0 0 8px', fontWeight: '800', fontSize: '28px' }}>
              Get in Touch
            </Title>
            <Text style={{ color: '#64748b', fontSize: '15px' }}>
              Fill out the form and I'll get back to you within 24 hours
            </Text>
          </div>
          
          <Form
            form={contactForm}
            layout="vertical"
            onFinish={handleContactSubmit}
          >
            <Form.Item
              name="name"
              label={<Text style={{ fontWeight: '600' }}>Your Name</Text>}
              rules={[{ required: true, message: 'Please enter your name' }]}
            >
              <Input 
                className="form-input-enhanced"
                placeholder="John Doe" 
                size="large" 
                style={{ borderRadius: '12px' }}
              />
            </Form.Item>
            
            <Form.Item
              name="email"
              label={<Text style={{ fontWeight: '600' }}>Email Address</Text>}
              rules={[
                { required: true, message: 'Please enter your email' },
                { type: 'email', message: 'Please enter a valid email' }
              ]}
            >
              <Input 
                className="form-input-enhanced"
                placeholder="john@example.com" 
                size="large" 
                style={{ borderRadius: '12px' }}
              />
            </Form.Item>
            
            <Form.Item
              name="subject"
              label={<Text style={{ fontWeight: '600' }}>Subject</Text>}
              rules={[{ required: true, message: 'Please enter a subject' }]}
            >
              <Input 
                className="form-input-enhanced"
                placeholder="Project Discussion" 
                size="large" 
                style={{ borderRadius: '12px' }}
              />
            </Form.Item>
            
            <Form.Item
              name="message"
              label={<Text style={{ fontWeight: '600' }}>Message</Text>}
              rules={[{ required: true, message: 'Please enter your message' }]}
            >
              <TextArea 
                className="form-input-enhanced"
                placeholder="Tell me about your project..." 
                rows={4} 
                style={{ borderRadius: '12px' }}
              />
            </Form.Item>
            
            <Form.Item style={{ marginBottom: 0 }}>
              <Button 
                type="primary" 
                htmlType="submit" 
                block 
                size="large"
                className="btn-primary"
                icon={<SendOutlined />}
                style={{
                  border: 'none',
                  color: '#fff',
                  borderRadius: '14px',
                  height: '52px',
                  fontWeight: '700',
                  fontSize: '16px'
                }}
              >
                Send Message
              </Button>
            </Form.Item>
          </Form>
        </Modal>

        {/* Project Details Modal */}
        <Modal
          className="portfolio-form-dialog"
          open={projectModalOpen}
          onCancel={() => setProjectModalOpen(false)}
          footer={null}
          width={700}
          centered
          styles={{
            body: { padding: '40px' }
          }}
        >
          {selectedProject && (
            <>
              <div style={{ marginBottom: '32px' }}>
                <div style={{
                  width: '72px',
                  height: '72px',
                  borderRadius: '20px',
                  background: `${selectedProject.color}15`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '24px',
                  fontSize: '32px',
                  color: selectedProject.color
                }}>
                  {selectedProject.icon}
                </div>
                
                <Title level={2} style={{ margin: '0 0 12px', fontWeight: '800', fontSize: '32px' }}>
                  {selectedProject.title}
                </Title>
                
                <Text style={{ color: '#64748b', fontSize: '16px', lineHeight: '1.8', display: 'block', marginBottom: '24px' }}>
                  {selectedProject.longDesc || selectedProject.desc}
                </Text>
                {selectedProject.details && (
                  <ul style={{ color: '#475569', lineHeight: '1.8', paddingInlineStart: '22px' }}>
                    {selectedProject.details.map(detail => <li key={detail}>{detail}</li>)}
                  </ul>
                )}
                {selectedProject.services && (
                  <section style={{ marginBottom: '24px' }} aria-labelledby="proposed-services-heading">
                    <Title id="proposed-services-heading" level={4}>Proposed services</Title>
                    <dl style={{ color: '#475569', lineHeight: '1.7', margin: 0 }}>
                      {selectedProject.services.map(service => (
                        <div key={service.name} style={{ marginBottom: '12px' }}>
                          <dt><strong>{service.name}</strong></dt>
                          <dd style={{ margin: 0 }}>{service.examples}</dd>
                        </div>
                      ))}
                    </dl>
                  </section>
                )}
                
                {/* Technologies */}
                <div style={{ marginBottom: '24px' }}>
                  <Text style={{ 
                    fontSize: '14px', 
                    fontWeight: '800', 
                    color: '#0f172a',
                    textTransform: 'uppercase',
                    letterSpacing: '1px',
                    display: 'block',
                    marginBottom: '12px'
                  }}>
                    {selectedProject.details ? 'Design & Research' : 'Technologies Used'}
                  </Text>
                  <Space wrap size={[8, 8]}>
                    {selectedProject.tags.map((tag, j) => (
                      <Tag
                        key={j}
                        style={{
                          background: '#f8fafc',
                          border: '1px solid #f1f5f9',
                          borderRadius: '10px',
                          padding: '8px 16px',
                          fontSize: '13px',
                          color: '#475569',
                          margin: 0,
                          fontWeight: '600'
                        }}
                      >
                        {tag}
                      </Tag>
                    ))}
                  </Space>
                </div>
                
                <Button 
                  type="primary" 
                  block 
                  size="large"
                  className="btn-primary"
                  icon={<SendOutlined />}
                  onClick={() => {
                    setProjectModalOpen(false);
                    setContactModalOpen(true);
                  }}
                  style={{
                    border: 'none',
                    color: '#fff',
                    borderRadius: '14px',
                    height: '52px',
                    fontWeight: '700',
                    fontSize: '16px'
                  }}
                >
                  Discuss Similar Project
                </Button>
              </div>
            </>
          )}
        </Modal>
      </Layout>
    </>
  );
}
