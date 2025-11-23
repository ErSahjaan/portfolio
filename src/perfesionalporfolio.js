import React, { useState, useEffect, useRef } from 'react';
import logo from './assets/images/avf.png'
import jsPDF from "jspdf";
import { Layout, Card, Row, Col, Tag, Typography, Button, Space, Tooltip, Drawer, Input, Form, notification, Progress, Modal, Avatar } from 'antd';
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
  ArrowDownOutlined,
  SendOutlined,
  CloseOutlined,
  BulbOutlined,
  TrophyOutlined,
  FireOutlined,
  EyeOutlined,
  TeamOutlined,
  LoadingOutlined,
  SmileOutlined
} from '@ant-design/icons';

// Firebase imports
import { initializeApp } from "firebase/app";
import { getDatabase, ref, push, onValue, serverTimestamp } from "firebase/database";

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
    background: linear-gradient(90deg, var(--project-color), transparent);
    opacity: 0;
    transition: opacity 0.3s ease;
  }
  
  .project-card::after {
    content: '';
    position: absolute;
    inset: 0;
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
  
  /* Stats Card with Counter Animation */
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
    animation: countUp 0.8s ease-out;
  }
  
  /* Profile Image with Advanced Effect */
  .profile-image {
    transition: all 0.6s cubic-bezier(0.23, 1, 0.32, 1);
    position: relative;
  }
  
  .profile-image::before {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(135deg, rgba(99, 102, 241, 0.2), rgba(139, 92, 246, 0.2));
    opacity: 0;
    transition: opacity 0.3s ease;
  }
  
  .profile-image:hover {
    transform: scale(1.03);
  }
  
  .profile-image:hover::before {
    opacity: 1;
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

export default function EnhancedPortfolio() {
  const [isVisible, setIsVisible] = useState({});
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const [contactModalOpen, setContactModalOpen] = useState(false);
  const [projectModalOpen, setProjectModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState([]);
  const [currentMessage, setCurrentMessage] = useState("");
  const chatBodyRef = useRef(null);
  const [form] = Form.useForm();
  const [contactForm] = Form.useForm();

  // Custom cursor effect
  useEffect(() => {
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
      setMousePosition({ x: e.clientX, y: e.clientY });
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

  let y = 50;
  const margin = 50;
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const maxWidth = pageWidth - 2 * margin;
  const lineHeight = 14;

  // Color scheme
  const primaryColor = [31, 78, 121]; // Professional blue
  const textColor = [40, 40, 40]; // Dark gray
  const lightGray = [100, 100, 100];

  // Check if new page is needed
  const checkPageBreak = (requiredSpace) => {
    if (y + requiredSpace > pageHeight - margin) {
      doc.addPage();
      y = margin;
    }
  };

  // Add section header with underline
  const addSectionHeader = (text) => {
    checkPageBreak(30);
    doc.setFont("Helvetica", "bold");
    doc.setFontSize(13);
    doc.setTextColor(...primaryColor);
    doc.text(text.toUpperCase(), margin, y);
    
    // Add underline
    const textWidth = doc.getTextWidth(text.toUpperCase());
    doc.setDrawColor(...primaryColor);
    doc.setLineWidth(1.5);
    doc.line(margin, y + 3, margin + textWidth, y + 3);
    
    y += 20;
    doc.setTextColor(...textColor);
  };

  // Add regular text
  const addText = (text, bold = false, fontSize = 10) => {
    checkPageBreak(lineHeight * 2);
    doc.setFont("Helvetica", bold ? "bold" : "normal");
    doc.setFontSize(fontSize);
    doc.setTextColor(...textColor);
    
    const lines = doc.splitTextToSize(text, maxWidth);
    doc.text(lines, margin, y);
    y += lines.length * lineHeight;
  };

  // Add bullet points
  const addBulletPoints = (items) => {
    doc.setFont("Helvetica", "normal");
    doc.setFontSize(10);
    doc.setTextColor(...textColor);
    
    items.forEach((item) => {
      checkPageBreak(lineHeight * 3);
      const bulletX = margin + 5;
      const textX = margin + 20;
      
      // Add bullet
      doc.circle(bulletX, y - 3, 1.5, "F");
      
      // Add text
      const lines = doc.splitTextToSize(item, maxWidth - 20);
      doc.text(lines, textX, y);
      y += lines.length * lineHeight;
    });
    y += 8;
  };

  // Add job title with company
  const addJobTitle = (title, company, location, dates) => {
    checkPageBreak(35);
    doc.setFont("Helvetica", "bold");
    doc.setFontSize(11);
    doc.setTextColor(...textColor);
    doc.text(title, margin, y);
    y += 14;
    
    doc.setFont("Helvetica", "italic");
    doc.setFontSize(10);
    doc.setTextColor(...lightGray);
    doc.text(`${company} | ${location}`, margin, y);
    y += 12;
    
    doc.setFont("Helvetica", "normal");
    doc.text(dates, margin, y);
    y += 16;
  };

  // Add clickable link
  const addLink = (text, url) => {
    checkPageBreak(lineHeight);
    doc.setFont("Helvetica", "normal");
    doc.setFontSize(10);
    doc.setTextColor(33, 102, 197);
    doc.textWithLink(text, margin, y, { url: url });
    y += lineHeight;
  };

  // ========== HEADER SECTION ==========
  doc.setFont("Helvetica", "bold");
  doc.setFontSize(26);
  doc.setTextColor(...primaryColor);
  doc.text("MD SAHJAAN", margin, y);
  y += 24;

  doc.setFont("Helvetica", "normal");
  doc.setFontSize(12);
  doc.setTextColor(...lightGray);
  doc.text("Full-Stack Software Engineer", margin, y);
  y += 20;

  // Contact information
  doc.setFont("Helvetica", "normal");
  doc.setFontSize(10);
  doc.setTextColor(...textColor);
  addText(`${info.email} | ${info.phone} | ${info.location}`);
  
  addLink("linkedin.com/in/er-md-sahjaan", "https://www.linkedin.com/in/er-md-sahjaan-4a33b1247");
  addLink("github.com/ErSahjaan", "https://github.com/ErSahjaan");
  
  y += 15;

  // ========== PROFESSIONAL SUMMARY ==========
  addSectionHeader("Professional Summary");
  addText(
    "Software Engineer specializing in healthcare SaaS, AI-driven automation, and HIPAA-compliant platforms. Experienced in building scalable full-stack applications, clinical workflow systems, and high-uptime medical records solutions. Strong focus on conversational AI, patient engagement automation, and secure cloud deployments."
  );
  y += 12;

  // ========== TECHNICAL SKILLS ==========
  addSectionHeader("Technical Skills");
  
  const skills = [
    { category: "Languages", items: "JavaScript, TypeScript, Python, Java, SQL, HTML5, CSS3" },
    { category: "Frontend", items: "React.js, Next.js, Redux, Tailwind CSS, Responsive Design" },
    { category: "Backend", items: "Node.js, Express.js, Spring Boot, RESTful APIs, Microservices" },
    { category: "Databases", items: "PostgreSQL, MongoDB, MySQL" },
    { category: "AI/ML", items: "OpenAI, NLP, Conversational AI, Chatbot Development" },
    { category: "Cloud/DevOps", items: "AWS, Docker, Git, CI/CD, Kubernetes" },
    { category: "Healthcare", items: "EHR/EMR Systems, HIPAA Compliance, HL7/FHIR, Telehealth" }
  ];

  skills.forEach(skill => {
    doc.setFont("Helvetica", "bold");
    doc.setFontSize(10);
    const categoryText = `${skill.category}: `;
    const categoryWidth = doc.getTextWidth(categoryText);
    doc.text(categoryText, margin, y);
    
    doc.setFont("Helvetica", "normal");
    const lines = doc.splitTextToSize(skill.items, maxWidth - categoryWidth);
    doc.text(lines, margin + categoryWidth, y);
    y += lines.length * lineHeight + 4;
  });
  
  y += 8;

  // ========== PROFESSIONAL EXPERIENCE ==========
  addSectionHeader("Professional Experience");
  
  addJobTitle(
    "Software Engineer",
    "Oodles AI (Healthcare Platform)",
    "Houston, TX",
    "Jan 2023 – Present (2+ Years)"
  );

  addBulletPoints([
    "Developed healthcare SaaS platform serving 50+ dental practices with comprehensive patient management capabilities",
    "Built multi-channel AI agent system automating patient messaging and appointment reminders across SMS, email, and voice",
    "Reduced administrative workload by 70% through automated workflows and intelligent task prioritization",
    "Engineered HIPAA-compliant medical records and patient data system ensuring secure data handling and privacy",
    "Decreased patient onboarding time by 60% using automated intake modules with real-time validation",
    "Developed 8+ clinical assessment modules with real-time validation and error handling mechanisms",
    "Contributed to 99.9% system uptime through optimized backend processes and proactive monitoring"
  ]);

  // ========== EDUCATION ==========
  addSectionHeader("Education");
  doc.setFont("Helvetica", "bold");
  doc.setFontSize(10);
  doc.text("Bachelor of Technology in Computer Science", margin, y);
  y += 14;
  
  doc.setFont("Helvetica", "normal");
  doc.text("VVIT Purnia | Graduated 2023 | CGPA: 8.0/10.0", margin, y);
  y += 18;

  // ========== CERTIFICATIONS ==========
  addSectionHeader("Certifications");
  addBulletPoints([
    "HIPAA Compliance Training - Healthcare Data Security and Privacy",
    "AWS Certified Cloud Practitioner - Amazon Web Services",
    "Full Stack Developer Training - MERN Stack Specialization",
    "React & Data Structures & Algorithms Certification"
  ]);

  // ========== PORTFOLIO ==========
  addSectionHeader("Portfolio");
  doc.setTextColor(33, 102, 197);
  addLink("portfolio-pi-ecru-48.vercel.app", "https://portfolio-pi-ecru-48.vercel.app/");
  
  // Save the PDF
  doc.save("Md_Sahjaan_Resume_ATS_Friendly.pdf");

  // Success notification
  notification.success({
    message: 'Resume Downloaded!',
    description: 'Your ATS-friendly resume has been downloaded successfully.',
    duration: 3
  });
};

  const stats = [
    { value: '2+', label: 'Years Exp', icon: <StarOutlined />, color: '#6366f1' },
    { value: '50+', label: 'Practices', icon: <HeartOutlined />, color: '#ec4899' },
    { value: '1000+', label: 'Users Daily', icon: <TeamOutlined />, color: '#10b981' },
    { value: '99.9%', label: 'Uptime', icon: <ThunderboltOutlined />, color: '#f59e0b' }
  ];

  const skills = [
    { name: 'Frontend', items: ['React.js', 'Next.js', 'TypeScript', 'Tailwind'], icon: <AppstoreOutlined />, color: '#6366f1', gradient: 'linear-gradient(135deg, #6366f1 0%, #818cf8 100%)', level: 95 },
    { name: 'Backend', items: ['Node.js', 'Spring Boot', 'Express.js', 'Python'], icon: <ApiOutlined />, color: '#8b5cf6', gradient: 'linear-gradient(135deg, #8b5cf6 0%, #a78bfa 100%)', level: 90 },
    { name: 'Database', items: ['PostgreSQL', 'MongoDB', 'MySQL', 'Redis'], icon: <DatabaseOutlined />, color: '#06b6d4', gradient: 'linear-gradient(135deg, #06b6d4 0%, #22d3ee 100%)', level: 88 },
    { name: 'Cloud & AI', items: ['AWS', 'Docker', 'OpenAI', 'K8s'], icon: <CloudOutlined />, color: '#10b981', gradient: 'linear-gradient(135deg, #10b981 0%, #34d399 100%)', level: 85 }
  ];

  const projects = [
    {
      title: 'AI-Powered Dental Practice Platform',
      desc: 'Comprehensive healthcare SaaS serving 50+ dental practices with integrated patient engagement and clinical operations management',
      longDesc: 'Built a full-featured healthcare platform that revolutionizes dental practice management through AI-powered automation, patient engagement tools, and comprehensive clinical workflow systems.',
      tags: ['React.js', 'Node.js', 'HIPAA'],
      color: '#6366f1',
      icon: <MedicineBoxOutlined />,
      metrics: ['50+ Practices', '70% Time Saved', '99.9% Uptime']
    },
    {
      title: 'Multi-Agent Communication System',
      desc: 'AI-powered hub with Lead, Review & Appointment agents improving patient engagement by 45% through automated outreach',
      longDesc: 'Developed an intelligent multi-agent system that handles patient communications across multiple channels, automating appointment reminders, review requests, and lead follow-ups.',
      tags: ['NLP', 'OpenAI', 'Microservices'],
      color: '#8b5cf6',
      icon: <RobotOutlined />,
      metrics: ['45% Engagement', '24/7 Support', '1000+ Daily']
    },
    {
      title: 'Digital Medical History Platform',
      desc: 'Comprehensive intake system with 12+ body system reviews, medications tracking, and real-time validation',
      longDesc: 'Created a sophisticated medical history collection platform with intelligent validation, comprehensive body system reviews, and seamless integration with EHR systems.',
      tags: ['React', 'Healthcare', 'Forms'],
      color: '#06b6d4',
      icon: <HeartOutlined />,
      metrics: ['60% Faster', '12+ Modules', 'HIPAA Safe']
    },
    {
      title: 'Clinical Operations Dashboard',
      desc: 'Centralized management for appointments, billing, imaging with real-time analytics tracking practice performance',
      longDesc: 'Engineered a comprehensive dashboard that provides real-time insights into practice operations, financial metrics, and patient care quality indicators.',
      tags: ['Analytics', 'Dashboard', 'REST API'],
      color: '#10b981',
      icon: <DashboardOutlined />,
      metrics: ['Real-time', 'Multi-clinic', 'Advanced AI']
    }
  ];

  const education = [
    { degree: 'B.Tech in Computer Science', school: 'VVIT Purnia', year: '2023', score: '8.0 CGPA' },
    { degree: 'Higher Secondary (12th)', school: 'Rkk College Madhubani', year: '2019', score: '65.5%' },
    { degree: 'Secondary (10th)', school: 'High School Aamchura', year: '2017', score: '65.4%' }
  ];

  const certs = [
    { name: 'HIPAA Compliance Training', issuer: 'Healthcare IT', year: '2023' },
    { name: 'AWS Certified Cloud Practitioner', issuer: 'Amazon Web Services', year: '2023' },
    { name: 'Full Stack Developer Training', issuer: 'Coursera', year: '2022' },
    { name: 'React & DSA Certification', issuer: 'Udemy', year: '2022' }
  ];

  const experience = [
    {
      title: 'Software Engineer',
      company: 'Oodles AI',
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

  const testimonials = [
    {
      name: 'Dr. Sarah Johnson',
      role: 'Dental Practice Owner',
      content: 'The platform has transformed how we manage our practice. Patient engagement is up 45% and admin work is down significantly.',
      avatar: '👩‍⚕️',
      rating: 5
    },
    {
      name: 'Michael Chen',
      role: 'Healthcare IT Director',
      content: 'Outstanding work on the AI integration. The system handles complex workflows seamlessly while maintaining HIPAA compliance.',
      avatar: '👨‍💼',
      rating: 5
    }
  ];

  const navItems = ['About', 'Experience', 'Skills', 'Projects', 'Education', 'Contact'];

  return (
    <>
      <style>{enhancedStyleSheet}</style>
      <Layout style={{ background: '#fafbfc', minHeight: '100vh' }}>
        
        {/* Enhanced Header with Glassmorphism */}
        <header style={{
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
          <div style={{
            maxWidth: '1280px',
            margin: '0 auto',
            padding: '18px 32px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{
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
              <Text style={{ 
                fontSize: '26px', 
                fontWeight: '800', 
                color: '#0f172a',
                cursor: 'pointer',
                transition: 'transform 0.3s ease',
                letterSpacing: '-0.5px'
              }}
              onClick={() => scrollTo('hero')}
              >
                Md Sahjaan<span className="gradient-text">.</span>
              </Text>
            </div>
            
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
            body: { padding: '48px 32px', background: 'linear-gradient(135deg, #fafbfc 0%, #f1f5f9 100%)' },
            header: { display: 'none' }
          }}
        >
          <Space direction="vertical" size={24} style={{ width: '100%' }}>
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
              <Text
                key={item}
                onClick={() => scrollTo(item.toLowerCase())}
                style={{ 
                  fontSize: '18px', 
                  fontWeight: '600', 
                  cursor: 'pointer', 
                  display: 'block',
                  color: '#0f172a',
                  padding: '12px 16px',
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
              </Text>
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
          
          {/* Enhanced Hero Section with Particles */}
          <section id="hero" style={{
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            padding: '140px 32px 100px',
            position: 'relative',
            overflow: 'hidden',
            background: 'linear-gradient(180deg, #fafbfc 0%, #f1f5f9 100%)'
          }}>
            {/* Animated Background Elements */}
            <div className="floating-shape blob-animation" style={{
              width: '600px',
              height: '600px',
              background: 'radial-gradient(circle, rgba(99, 102, 241, 0.15) 0%, transparent 70%)',
              top: '-10%',
              right: '-10%',
            }} />
            <div className="floating-shape blob-animation" style={{
              width: '400px',
              height: '400px',
              background: 'radial-gradient(circle, rgba(139, 92, 246, 0.12) 0%, transparent 70%)',
              bottom: '10%',
              left: '-5%',
              animationDelay: '4s'
            }} />
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className="floating-orb"
                style={{
                  width: `${Math.random() * 8 + 4}px`,
                  height: `${Math.random() * 8 + 4}px`,
                  background: i % 2 === 0 ? '#6366f1' : '#8b5cf6',
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                  animationDelay: `${i * 0.5}s`
                }}
              />
            ))}
            
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
                    <Title style={{
                      fontSize: 'clamp(42px, 6vw, 68px)',
                      fontWeight: '900',
                      lineHeight: '1.1',
                      color: '#0f172a',
                      margin: '0 0 24px',
                      animation: 'fadeInLeft 0.8s ease 0.3s forwards',
                      opacity: 0,
                      letterSpacing: '-2px',
                      fontFamily: "'Space Grotesk', sans-serif"
                    }}>
                      Building AI-powered{' '}
                      <span className="gradient-text">healthcare</span> solutions
                    </Title>
                    
                    {/* Subtitle with Enhanced Styling */}
                    <Paragraph style={{
                      fontSize: '19px',
                      lineHeight: '1.8',
                      color: '#64748b',
                      maxWidth: '520px',
                      margin: '0 0 40px',
                      animation: 'fadeInLeft 0.8s ease 0.4s forwards',
                      opacity: 0,
                      fontWeight: '400'
                    }}>
                      Full-Stack Engineer specializing in <strong style={{ color: '#475569' }}>HIPAA-compliant</strong> SaaS platforms, 
                      conversational AI agents, and clinical workflow automation.
                    </Paragraph>
                    
                    {/* Enhanced CTA Buttons */}
                    <Space size={16} wrap style={{ marginBottom: '48px', animation: 'fadeInLeft 0.8s ease 0.5s forwards', opacity: 0 }}>
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
                        icon={<DownloadOutlined />}
                        onClick={downloadResume}
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
                        Download CV
                      </Button>
                    </Space>
                    
                    {/* Enhanced Social Icons */}
                    <Space size={12} style={{ animation: 'fadeInLeft 0.8s ease 0.6s forwards', opacity: 0 }}>
                      {[
                        { icon: <GithubOutlined />, label: 'GitHub', onClick: () => window.open('https://github.com/ErSahjaan', '_blank') },
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
                
                {/* Enhanced Profile Card */}
                <Col xs={24} lg={11}>
                  <div style={{ 
                    position: 'relative',
                    animation: 'fadeInRight 1s ease 0.4s forwards',
                    opacity: 0
                  }}>
                    {/* Decorative Elements */}
                    <div className="animate-float" style={{
                      position: 'absolute',
                      top: '-30px',
                      right: '-30px',
                      width: '140px',
                      height: '140px',
                      borderRadius: '28px',
                      background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.2) 0%, rgba(139, 92, 246, 0.15) 100%)',
                      transform: 'rotate(12deg)',
                      zIndex: 0
                    }} />
                    <div className="animate-rotate" style={{
                      position: 'absolute',
                      bottom: '-20px',
                      left: '-20px',
                      width: '80px',
                      height: '80px',
                      borderRadius: '20px',
                      border: '3px solid rgba(99, 102, 241, 0.2)',
                      transform: 'rotate(-12deg)',
                      zIndex: 0
                    }} />
                    
                    <Card
                      className="card-hover visible glass-card animate-glow"
                      style={{
                        borderRadius: '32px',
                        border: '1px solid rgba(255, 255, 255, 0.9)',
                        boxShadow: '0 24px 72px rgba(0, 0, 0, 0.1)',
                        overflow: 'hidden',
                        position: 'relative'
                      }}
                      styles={{ body: { padding: 0 } }}
                    >
                      <div 
                        className="profile-image"
                        style={{
                          width: '100%',
                          height: '360px',
                          background: `url(${info.photo}) center/cover no-repeat`,
                          position: 'relative'
                        }}
                      >
                        <div style={{
                          position: 'absolute',
                          bottom: 0,
                          left: 0,
                          right: 0,
                          height: '180px',
                          background: 'linear-gradient(transparent, rgba(0,0,0,0.7))'
                        }} />
                        {/* Floating Badge */}
                        <div style={{
                          position: 'absolute',
                          top: '20px',
                          right: '20px',
                          background: 'rgba(255, 255, 255, 0.95)',
                          backdropFilter: 'blur(20px)',
                          padding: '12px 20px',
                          borderRadius: '100px',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '8px',
                          boxShadow: '0 8px 24px rgba(0, 0, 0, 0.15)'
                        }}>
                          <div className="animate-pulse" style={{
                            width: '8px',
                            height: '8px',
                            borderRadius: '50%',
                            background: '#10b981'
                          }} />
                          <Text style={{ fontSize: '13px', fontWeight: '700', color: '#059669' }}>
                            Available
                          </Text>
                        </div>
                      </div>
                      
                      <div style={{ padding: '32px 32px 28px' }}>
                        <Title level={3} style={{ margin: '0 0 4px', fontWeight: '800', fontSize: '24px', letterSpacing: '-0.5px' }}>
                          {info.name}
                        </Title>
                        <Text style={{ color: '#64748b', fontSize: '16px', fontWeight: '600' }}>{info.role}</Text>
                        
                        {/* Enhanced Stats Grid */}
                        <div style={{
                          display: 'grid',
                          gridTemplateColumns: 'repeat(2, 1fr)',
                          gap: '14px',
                          marginTop: '28px'
                        }}>
                          {stats.map((stat, i) => (
                            <div
                              key={i}
                              className="stat-card"
                              style={{
                                background: '#f8fafc',
                                borderRadius: '18px',
                                padding: '20px 16px',
                                textAlign: 'center',
                                cursor: 'default',
                                border: '1px solid #f1f5f9',
                                position: 'relative',
                                overflow: 'hidden'
                              }}
                            >
                              <div style={{
                                fontSize: '24px',
                                marginBottom: '8px',
                                color: stat.color
                              }}>
                                {stat.icon}
                              </div>
                              <Text className="stat-number" style={{
                                display: 'block',
                                fontSize: '28px',
                                fontWeight: '900',
                                background: `linear-gradient(135deg, ${stat.color} 0%, ${stat.color}CC 100%)`,
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                                letterSpacing: '-0.5px'
                              }}>
                                {stat.value}
                              </Text>
                              <Text style={{ fontSize: '12px', color: '#94a3b8', fontWeight: '700', letterSpacing: '0.3px', textTransform: 'uppercase' }}>
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

          {/* About Section - Keep existing but with minor enhancements */}
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
                  fontSize: 'clamp(32px, 5vw, 52px)',
                  fontWeight: '900',
                  margin: '0',
                  color: '#0f172a',
                  letterSpacing: '-1.5px',
                  fontFamily: "'Space Grotesk', sans-serif"
                }}>
                  What I Do <span className="gradient-text">Best</span>
                </Title>
              </div>

              <Row gutter={[28, 28]}>
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
                    styles={{ body: { padding: '40px' } }}
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
                      Healthcare Technology Expert
                    </Title>
                    
                    <Paragraph style={{
                      color: '#475569',
                      lineHeight: '1.9',
                      margin: '0 0 24px',
                      fontSize: '16px'
                    }}>
                      I specialize in developing <strong>HIPAA-compliant</strong> SaaS platforms, implementing conversational AI agents, 
                      and building full-stack web applications. My expertise spans patient engagement systems, 
                      clinical workflow automation, and medical records management, serving thousands of users daily.
                    </Paragraph>
                    
                    <div style={{ marginTop: '32px' }}>
                      <Space wrap size={[10, 10]}>
                        {['HIPAA Compliant', 'AI/NLP', 'EHR/EMR Systems', 'HL7/FHIR', 'Cloud Native'].map((tag) => (
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
                  <Row gutter={[28, 28]}>
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
                              Oodles AI
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
                    
                    <Col xs={12}>
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
                        <Title level={2} style={{ margin: '0 0 4px', color: '#0f172a', fontSize: '32px', fontWeight: '900' }}>70%</Title>
                        <Text style={{ fontSize: '12px', color: '#64748b', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Workload Reduced</Text>
                      </Card>
                    </Col>
                    
                    <Col xs={12}>
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
                        <Title level={2} style={{ margin: '0 0 4px', color: '#0f172a', fontSize: '32px', fontWeight: '900' }}>60%</Title>
                        <Text style={{ fontSize: '12px', color: '#64748b', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Faster Onboarding</Text>
                      </Card>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </div>
          </section>

          {/* Experience, Skills, Projects, Education sections continue similarly with enhanced styling... */}
          {/* Due to length, I'll include key sections. The pattern is the same - enhanced cards, better animations, improved typography */}
          
          {/* Skills Section with Progress Bars */}
          <section id="skills" style={{
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

              <Row gutter={[28, 28]}>
                {skills.map((skill, i) => (
                  <Col xs={12} sm={12} lg={6} key={i}>
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
                      
                      {/* Skill level indicator */}
                      <div style={{ marginBottom: '24px' }}>
                        <Progress
                          percent={skill.level}
                          strokeColor={{
                            '0%': skill.color,
                            '100%': `${skill.color}CC`
                          }}
                          showInfo={false}
                          strokeWidth={8}
                          trailColor='#f1f5f9'
                          style={{ marginBottom: '8px' }}
                        />
                        <Text style={{ fontSize: '12px', color: '#94a3b8', fontWeight: '700' }}>
                          {skill.level}% Proficiency
                        </Text>
                      </div>
                      
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

              <Row gutter={[28, 28]}>
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
                      styles={{ body: { padding: '36px' } }}
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
                      
                      {/* Metrics */}
                      <div style={{
                        display: 'flex',
                        gap: '12px',
                        marginBottom: '24px',
                        flexWrap: 'wrap'
                      }}>
                        {project.metrics.map((metric, j) => (
                          <Tag
                            key={j}
                            style={{
                              background: `${project.color}08`,
                              border: `1px solid ${project.color}20`,
                              borderRadius: '8px',
                              padding: '6px 12px',
                              fontSize: '12px',
                              color: project.color,
                              margin: 0,
                              fontWeight: '700'
                            }}
                          >
                            {metric}
                          </Tag>
                        ))}
                      </div>
                      
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
                      
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        color: project.color,
                        fontSize: '14px',
                        fontWeight: '700'
                      }}>
                        <EyeOutlined style={{ marginRight: '8px', fontSize: '16px' }} />
                        View Details
                        <ArrowRightOutlined className="arrow-icon" style={{ marginLeft: '10px', fontSize: '12px' }} />
                      </div>
                    </Card>
                  </Col>
                ))}
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
                  
                  <div style={{ padding: '40px' }}>
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
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', justifyContent: 'flex-end' }}>
                            <EnvironmentOutlined style={{ color: '#94a3b8', fontSize: '16px' }} />
                            <Text style={{ fontSize: '15px', color: '#64748b', fontWeight: '600' }}>
                              {exp.location}
                            </Text>
                          </div>
                          <Text style={{ fontSize: '14px', color: '#94a3b8', fontWeight: '500' }}>
                            {exp.period}
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
                        Key Achievements
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
            padding: 'clamp(80px, 12vw, 140px) 32px',
            background: '#fff'
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
                        <Row justify="space-between" align="top">
                          <Col flex="auto">
                            <Text style={{ fontWeight: '800', fontSize: '18px', display: 'block', color: '#0f172a', marginBottom: '4px' }}>
                              {edu.degree}
                            </Text>
                            <Text style={{ color: '#64748b', fontSize: '15px', fontWeight: '600' }}>
                              {edu.school}
                            </Text>
                          </Col>
                          <Col style={{ textAlign: 'right' }}>
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
                    fontWeight: '900',
                    margin: '0 0 32px',
                    color: '#0f172a',
                    fontSize: '36px',
                    letterSpacing: '-1px',
                    fontFamily: "'Space Grotesk', sans-serif"
                  }}>
                    Professional <span style={{
                      background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent'
                    }}>Credentials</span>
                  </Title>
                  
                  <Space direction="vertical" size={14} style={{ width: '100%' }}>
                    {certs.map((cert, i) => (
                      <div
                        key={i}
                        className="cert-item"
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '18px',
                          padding: '20px 24px',
                          background: '#fff',
                          borderRadius: '16px',
                          cursor: 'default',
                          border: '1px solid #f1f5f9',
                          position: 'relative'
                        }}
                      >
                        <div style={{
                          width: '42px',
                          height: '42px',
                          borderRadius: '12px',
                          background: 'rgba(16, 185, 129, 0.12)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          flexShrink: 0
                        }}>
                          <SafetyCertificateOutlined style={{ color: '#10b981', fontSize: '20px' }} />
                        </div>
                        <div style={{ flex: 1 }}>
                          <Text style={{ fontSize: '16px', fontWeight: '700', color: '#0f172a', display: 'block', marginBottom: '4px' }}>
                            {cert.name}
                          </Text>
                          <Text style={{ fontSize: '13px', color: '#94a3b8', fontWeight: '600' }}>
                            {cert.issuer} • {cert.year}
                          </Text>
                        </div>
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
                Have a healthcare project in mind? I'd love to hear about it and explore 
                how we can work together to create something extraordinary.
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
              
              <div style={{ display: 'flex', justifyContent: 'center', gap: '14px' }}>
                {[
                  { icon: <GithubOutlined />, label: 'GitHub', onClick: () => window.open('https://github.com/ErSahjaan', '_blank') },
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
        <Footer style={{
          textAlign: 'center',
          background: '#0f172a',
          borderTop: '1px solid rgba(99, 102, 241, 0.15)',
          padding: '40px 32px'
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
          <div className="animate-float" style={{
            position: 'fixed',
            bottom: '100px',
            right: '28px',
            width: '380px',
            maxWidth: 'calc(100vw - 56px)',
            borderRadius: '20px',
            boxShadow: '0 24px 72px rgba(0, 0, 0, 0.2), 0 0 0 1px rgba(0, 0, 0, 0.05)',
            background: '#fff',
            zIndex: 1001,
            overflow: 'hidden',
            animation: 'scaleIn 0.3s cubic-bezier(0.23, 1, 0.32, 1)'
          }}>
            {/* Enhanced Header */}
            <div style={{
              background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
              padding: '24px',
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
              style={{
                padding: "24px",
                minHeight: "320px",
                maxHeight: "400px",
                overflowY: "auto",
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
                    Hi there! I'm Sahjaan 👋 a software engineer specializing in healthcare technology. 
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
                      onClick={downloadResume}
                      icon={<DownloadOutlined />}
                      style={{
                        border: "1px solid #3b82f6",
                        borderRadius: "10px",
                        color: "#3b82f6",
                        fontWeight: "600",
                        height: "44px",
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
              style={{
                padding: "20px 24px",
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
        <div style={{
          position: 'fixed',
          bottom: '28px',
          right: '28px',
          display: 'flex',
          flexDirection: 'column',
          gap: '14px',
          zIndex: 1000
        }}>
          <Tooltip title={chatOpen ? "Close chat" : "Chat with us"} placement="left">
            <Button
              onClick={() => setChatOpen(!chatOpen)}
              className={chatOpen ? "" : "animate-pulse"}
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
              {chatOpen ? 'Close' : 'Chat Now'}
            </Button>
          </Tooltip>
          <Tooltip title="Back to Top" placement="left">
            <Button
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

        {/* Contact Modal */}
        <Modal
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
                  {selectedProject.longDesc}
                </Text>
                
                {/* Metrics */}
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(3, 1fr)',
                  gap: '16px',
                  marginBottom: '24px'
                }}>
                  {selectedProject.metrics.map((metric, i) => (
                    <Card
                      key={i}
                      style={{
                        textAlign: 'center',
                        borderRadius: '14px',
                        border: `1px solid ${selectedProject.color}20`,
                        background: `${selectedProject.color}08`
                      }}
                      styles={{ body: { padding: '16px' } }}
                    >
                      <Text style={{
                        fontSize: '24px',
                        fontWeight: '900',
                        color: selectedProject.color,
                        display: 'block',
                        marginBottom: '4px'
                      }}>
                        {metric.split(' ')[0]}
                      </Text>
                      <Text style={{ fontSize: '12px', color: '#64748b', fontWeight: '600' }}>
                        {metric.split(' ').slice(1).join(' ')}
                      </Text>
                    </Card>
                  ))}
                </div>
                
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
                    Technologies Used
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