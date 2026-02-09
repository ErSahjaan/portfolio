import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from './assets/images/avf.png';
import { Layout, Card, Row, Col, Tag, Typography, Button, Space, Tooltip, Drawer, notification, Avatar, Statistic, Progress } from 'antd';
import {
  MailOutlined,
  PhoneOutlined,
  RocketOutlined,
  SafetyCertificateOutlined,
  CheckCircleOutlined,
  ThunderboltOutlined,
  HeartOutlined,
  ApiOutlined,
  MenuOutlined,
  ArrowRightOutlined,
  StarOutlined,
  MedicineBoxOutlined,
  RobotOutlined,
  DashboardOutlined,
  MessageOutlined,
  ArrowDownOutlined,
  ClockCircleOutlined,
  TeamOutlined,
  DollarOutlined,
  SyncOutlined,
  CalendarOutlined,
  SmileOutlined,
  UserOutlined,
  FileTextOutlined,
  PhoneFilled,
  CommentOutlined,
  CreditCardOutlined,
  CustomerServiceOutlined,
  PlayCircleOutlined,
  GlobalOutlined,
  LockOutlined,
  CloudOutlined,
  LineChartOutlined,
  BellOutlined,
  TrophyOutlined,
  SettingOutlined
} from '@ant-design/icons';

const { Content, Footer } = Layout;
const { Title, Text, Paragraph } = Typography;

const styleSheet = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap');
  
  * {
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  
  body {
    background: #ffffff;
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
    50% { transform: scale(1.05); opacity: 0.9; }
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
  
  @keyframes scaleIn {
    from { opacity: 0; transform: scale(0.95); }
    to { opacity: 1; transform: scale(1); }
  }

  @keyframes slideInRight {
    from { opacity: 0; transform: translateX(100px); }
    to { opacity: 1; transform: translateX(0); }
  }

  @keyframes rotateIn {
    from { opacity: 0; transform: rotate(-10deg) scale(0.9); }
    to { opacity: 1; transform: rotate(0) scale(1); }
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
    transform: translateY(-12px) scale(1.02);
    box-shadow: 0 40px 80px rgba(0, 0, 0, 0.12) !important;
  }
  
  /* Glass Card */
  .glass-card {
    background: rgba(255, 255, 255, 0.95) !important;
    backdrop-filter: blur(20px) saturate(180%);
    -webkit-backdrop-filter: blur(20px) saturate(180%);
  }
  
  /* Button Styles */
  .btn-primary {
    position: relative;
    overflow: hidden;
    transition: all 0.4s cubic-bezier(0.23, 1, 0.32, 1);
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%) !important;
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
    transform: translateY(-3px) scale(1.02);
    box-shadow: 0 20px 40px rgba(102, 126, 234, 0.4) !important;
    background-position: 100% 0 !important;
  }
  
  .btn-primary:hover::before {
    left: 100%;
  }
  
  .btn-outline {
    transition: all 0.4s cubic-bezier(0.23, 1, 0.32, 1);
  }
  
  .btn-outline:hover {
    border-color: #667eea !important;
    color: #667eea !important;
    transform: translateY(-3px);
    box-shadow: 0 12px 28px rgba(102, 126, 234, 0.25) !important;
  }

  /* Feature Card */
  .feature-card {
    position: relative;
    overflow: hidden;
  }

  .feature-card::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: linear-gradient(90deg, var(--card-color), transparent);
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  .feature-card:hover::before {
    opacity: 1;
  }

  .feature-card:hover .feature-icon {
    transform: scale(1.15) rotate(5deg);
  }

  .feature-icon {
    transition: all 0.4s cubic-bezier(0.23, 1, 0.32, 1);
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
    background: linear-gradient(90deg, #667eea, #764ba2);
    transition: all 0.3s cubic-bezier(0.23, 1, 0.32, 1);
    border-radius: 2px;
    transform: translateX(-50%);
  }
  
  .nav-item:hover {
    color: #667eea !important;
  }
  
  .nav-item:hover::after {
    width: 100%;
  }
  
  /* Gradient Text */
  .gradient-text {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%);
    background-size: 200% auto;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    animation: gradientShift 4s ease infinite;
  }
  
  /* Floating Elements */
  .floating-shape {
    position: absolute;
    border-radius: 50%;
    animation: float 10s ease-in-out infinite;
    filter: blur(80px);
  }
  
  .floating-orb {
    position: absolute;
    border-radius: 50%;
    animation: float 8s ease-in-out infinite;
    opacity: 0.5;
  }
  
  /* Stats Card */
  .stat-card {
    transition: all 0.4s cubic-bezier(0.23, 1, 0.32, 1);
  }
  
  .stat-card:hover {
    transform: translateY(-8px);
  }
  
  .stat-card:hover .stat-number {
    transform: scale(1.1);
  }
  
  .stat-number {
    transition: all 0.4s cubic-bezier(0.23, 1, 0.32, 1);
  }

  /* Agent Card */
  .agent-card {
    transition: all 0.5s cubic-bezier(0.23, 1, 0.32, 1);
    position: relative;
  }

  .agent-card::after {
    content: '';
    position: absolute;
    inset: -1px;
    background: linear-gradient(135deg, transparent, rgba(102, 126, 234, 0.1));
    border-radius: inherit;
    opacity: 0;
    transition: opacity 0.3s ease;
    z-index: -1;
  }

  .agent-card:hover::after {
    opacity: 1;
  }

  .agent-card:hover {
    transform: translateY(-10px) scale(1.02);
  }

  .agent-card:hover .agent-icon {
    transform: scale(1.2) rotate(10deg);
  }

  .agent-icon {
    transition: all 0.5s cubic-bezier(0.23, 1, 0.32, 1);
  }

  /* Pricing Card */
  .pricing-card {
    position: relative;
    transition: all 0.5s cubic-bezier(0.23, 1, 0.32, 1);
  }

  .pricing-card:hover {
    transform: translateY(-15px) scale(1.03);
    z-index: 10;
  }

  .pricing-card.featured {
    border: 2px solid #667eea !important;
    transform: scale(1.05);
  }

  .pricing-card.featured:hover {
    transform: scale(1.08) translateY(-15px);
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
    background: rgba(102, 126, 234, 0.3);
    color: #0f172a;
  }
  
  /* Scrollbar */
  ::-webkit-scrollbar {
    width: 10px;
  }
  
  ::-webkit-scrollbar-track {
    background: #f8fafc;
  }
  
  ::-webkit-scrollbar-thumb {
    background: linear-gradient(180deg, #667eea, #764ba2);
    border-radius: 5px;
  }
  
  ::-webkit-scrollbar-thumb:hover {
    background: linear-gradient(180deg, #5568d3, #63439a);
  }
  
  /* Focus States */
  button:focus-visible {
    outline: 2px solid #667eea;
    outline-offset: 2px;
  }

  /* Testimonial Card */
  .testimonial-card {
    transition: all 0.4s cubic-bezier(0.23, 1, 0.32, 1);
  }

  .testimonial-card:hover {
    transform: translateY(-8px);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1) !important;
  }
`;

export default function OodlesLanding() {
  const [isVisible, setIsVisible] = useState({});
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [demoOpen, setDemoOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      ['hero', 'features', 'agents', 'benefits', 'how-it-works', 'pricing', 'testimonials', 'cta'].forEach(section => {
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

  const requestDemo = () => {
    notification.success({
      message: 'Demo Request Received!',
      description: 'Our team will contact you within 24 hours to schedule your personalized demo.',
      duration: 5,
      placement: 'topRight'
    });
    setDemoOpen(false);
  };

  const navItems = ['Features', 'Solutions', 'Pricing', 'Testimonials'];

  const agents = [
    {
      name: 'Webchat Agent',
      desc: 'AI-powered website chat that engages visitors 24/7, answers questions instantly, and converts leads into appointments.',
      icon: <MessageOutlined />,
      color: '#667eea',
      gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      stats: { metric: '3x', label: 'Engagement' }
    },
    {
      name: 'SMS Marketing',
      desc: 'Automated text campaigns for appointment reminders, promotions, and follow-ups with 98% open rates.',
      icon: <CommentOutlined />,
      color: '#f093fb',
      gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
      stats: { metric: '98%', label: 'Open Rate' }
    },
    {
      name: 'Review Manager',
      desc: 'Automated review requests and reputation monitoring across Google, Yelp, and social platforms.',
      icon: <StarOutlined />,
      color: '#fda085',
      gradient: 'linear-gradient(135deg, #fda085 0%, #f6d365 100%)',
      stats: { metric: '5x', label: 'More Reviews' }
    },
    {
      name: 'Feedback System',
      desc: 'Real-time patient satisfaction surveys with sentiment analysis and actionable insights.',
      icon: <SmileOutlined />,
      color: '#4facfe',
      gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
      stats: { metric: '92%', label: 'Satisfaction' }
    },
    {
      name: 'Payment Processing',
      desc: 'Secure, HIPAA-compliant payment collection with automated invoicing and payment plans.',
      icon: <CreditCardOutlined />,
      color: '#43e97b',
      gradient: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
      stats: { metric: '60%', label: 'Faster Pay' }
    },
    {
      name: 'Lead Tracker',
      desc: 'Intelligent lead scoring, automated follow-ups, and conversion optimization to maximize ROI.',
      icon: <UserOutlined />,
      color: '#fa709a',
      gradient: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
      stats: { metric: '45%', label: 'More Leads' }
    },
    {
      name: 'Appointment Scheduler',
      desc: 'Smart booking system with automated reminders, waitlist management, and calendar syncing.',
      icon: <CalendarOutlined />,
      color: '#30cfd0',
      gradient: 'linear-gradient(135deg, #30cfd0 0%, #330867 100%)',
      stats: { metric: '80%', label: 'Less No-Shows' }
    },
    {
      name: 'AI Assistant',
      desc: 'Intelligent virtual assistant handling patient inquiries, insurance verification, and data entry.',
      icon: <RobotOutlined />,
      color: '#a8edea',
      gradient: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
      stats: { metric: '70%', label: 'Time Saved' }
    },
    {
      name: 'Voice AI',
      desc: 'Natural language phone automation for scheduling, reminders, and patient communications.',
      icon: <CustomerServiceOutlined />,
      color: '#ff9a9e',
      gradient: 'linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)',
      stats: { metric: '24/7', label: 'Availability' }
    }
  ];

  const features = [
    {
      icon: <SafetyCertificateOutlined />,
      title: 'HIPAA Compliant',
      desc: 'Bank-level encryption and full HIPAA compliance to protect patient data.',
      color: '#667eea'
    },
    {
      icon: <CloudOutlined />,
      title: 'Cloud-Based',
      desc: 'Access from anywhere with 99.9% uptime and automatic backups.',
      color: '#f093fb'
    },
    {
      icon: <ApiOutlined />,
      title: 'Easy Integration',
      desc: 'Seamlessly connects with your existing EHR and practice management software.',
      color: '#4facfe'
    },
    {
      icon: <LineChartOutlined />,
      title: 'Real-Time Analytics',
      desc: 'Track performance metrics and patient engagement in beautiful dashboards.',
      color: '#43e97b'
    },
    {
      icon: <TeamOutlined />,
      title: 'Multi-Location',
      desc: 'Manage multiple practices from one unified platform.',
      color: '#fda085'
    },
    {
      icon: <SettingOutlined />,
      title: 'Customizable',
      desc: 'Tailor workflows and automations to match your practice needs.',
      color: '#fa709a'
    }
  ];

  const benefits = [
    {
      stat: '70%',
      label: 'Reduced Admin Time',
      desc: 'Free your staff from repetitive tasks',
      icon: <ClockCircleOutlined />
    },
    {
      stat: '45%',
      label: 'More Patients',
      desc: 'Convert more leads to appointments',
      icon: <TeamOutlined />
    },
    {
      stat: '60%',
      label: 'Faster Payments',
      desc: 'Streamlined billing and collections',
      icon: <DollarOutlined />
    },
    {
      stat: '99.9%',
      label: 'System Uptime',
      desc: 'Always available when you need it',
      icon: <ThunderboltOutlined />
    }
  ];

  const pricingPlans = [
    {
      name: 'Starter',
      price: '$299',
      period: '/month',
      desc: 'Perfect for solo practitioners',
      features: [
        'Up to 500 patients',
        '3 AI Agents (Webchat, SMS, Reviews)',
        'Basic analytics',
        'Email support',
        'HIPAA compliant storage'
      ],
      featured: false,
      cta: 'Start Free Trial'
    },
    {
      name: 'Professional',
      price: '$599',
      period: '/month',
      desc: 'Ideal for growing practices',
      features: [
        'Up to 2,000 patients',
        '6 AI Agents + Voice AI',
        'Advanced analytics & reports',
        'Priority support',
        'Multi-location support',
        'Custom integrations'
      ],
      featured: true,
      cta: 'Get Started'
    },
    {
      name: 'Enterprise',
      price: 'Custom',
      period: '',
      desc: 'For large practices & groups',
      features: [
        'Unlimited patients',
        'All 9 AI Agents',
        'White-label options',
        'Dedicated account manager',
        'Custom development',
        'SLA guarantees'
      ],
      featured: false,
      cta: 'Contact Sales'
    }
  ];

  const testimonials = [
    {
      name: 'Dr. Sarah Mitchell',
      role: 'Dental Practice Owner',
      practice: 'Bright Smile Dentistry',
      photo: '👩‍⚕️',
      quote: 'Oodles transformed our practice. We\'ve reduced no-shows by 80% and our team has more time to focus on patient care instead of phone calls.',
      rating: 5
    },
    {
      name: 'Dr. James Rodriguez',
      role: 'Medical Director',
      practice: 'City Medical Group',
      photo: '👨‍⚕️',
      quote: 'The AI agents handle routine tasks flawlessly. Our patient satisfaction scores increased 35% and staff burnout decreased significantly.',
      rating: 5
    },
    {
      name: 'Lisa Chen',
      role: 'Practice Manager',
      practice: 'Wellness Medspa',
      photo: '👩‍💼',
      quote: 'ROI was clear within 2 months. The automated review requests alone brought us 200+ new 5-star reviews. Incredible platform!',
      rating: 5
    }
  ];

  const howItWorks = [
    {
      step: '1',
      title: 'Quick Setup',
      desc: 'Get started in minutes with our guided onboarding process. No technical expertise required.',
      icon: <RocketOutlined />
    },
    {
      step: '2',
      title: 'Customize & Train',
      desc: 'Configure AI agents to match your brand voice and practice workflows. We help train your team.',
      icon: <SettingOutlined />
    },
    {
      step: '3',
      title: 'Go Live',
      desc: 'Launch your AI agents and watch them handle patient interactions automatically 24/7.',
      icon: <ThunderboltOutlined />
    },
    {
      step: '4',
      title: 'Optimize & Grow',
      desc: 'Use analytics to refine performance and scale your practice with data-driven insights.',
      icon: <LineChartOutlined />
    }
  ];

  return (
    <>
      <style>{styleSheet}</style>
      <Layout style={{ background: '#ffffff', minHeight: '100vh' }}>
        
        {/* Header */}
        <header style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
          background: scrolled ? 'rgba(255, 255, 255, 0.98)' : 'transparent',
          backdropFilter: scrolled ? 'blur(20px) saturate(180%)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(102, 126, 234, 0.1)' : 'none',
          transition: 'all 0.4s cubic-bezier(0.23, 1, 0.32, 1)',
          boxShadow: scrolled ? '0 4px 20px rgba(0, 0, 0, 0.05)' : 'none'
        }}>
          <div style={{
            maxWidth: '1400px',
            margin: '0 auto',
            padding: '20px 40px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{
                width: '42px',
                height: '42px',
                borderRadius: '12px',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '20px',
                color: '#fff',
                fontWeight: '800',
                boxShadow: '0 4px 12px rgba(102, 126, 234, 0.3)'
              }}>
                O
              </div>
              <Text style={{ 
                fontSize: '26px', 
                fontWeight: '800', 
                background: 'linear-gradient(135deg, #0f172a 0%, #667eea 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                letterSpacing: '-0.5px'
              }}>
                Oodles AI
              </Text>
            </div>
            
            <Space size={40} className="desktop-only">
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
                    letterSpacing: '0.3px'
                  }}
                >
                  {item}
                </Text>
              ))}
            </Space>

            <Space size={16} className="desktop-only">
              <Button
                className="btn-outline"
                onClick={() => scrollTo('pricing')}
                style={{
                  border: '2px solid #e2e8f0',
                  color: '#0f172a',
                  borderRadius: '12px',
                  height: '44px',
                  padding: '0 24px',
                  fontWeight: '600',
                  fontSize: '14px',
                  background: 'transparent'
                }}
              >
                View Pricing
              </Button>
              <Button
                className="btn-primary"
                onClick={() => setDemoOpen(true)}
                style={{
                  border: 'none',
                  color: '#fff',
                  borderRadius: '12px',
                  height: '44px',
                  padding: '0 28px',
                  fontWeight: '600',
                  fontSize: '14px',
                  boxShadow: '0 4px 12px rgba(102, 126, 234, 0.3)'
                }}
              >
                Get Demo
              </Button>
            </Space>
            
            <Button
              className="mobile-only"
              type="text"
              icon={<MenuOutlined style={{ fontSize: '22px', color: '#0f172a' }} />}
              onClick={() => setMobileMenuOpen(true)}
            />
          </div>
        </header>

        {/* Mobile Menu */}
        <Drawer
          open={mobileMenuOpen}
          onClose={() => setMobileMenuOpen(false)}
          placement="right"
          width={320}
        >
          <Space direction="vertical" size={24} style={{ width: '100%', padding: '24px 0' }}>
            {navItems.map((item) => (
              <Text
                key={item}
                onClick={() => scrollTo(item.toLowerCase())}
                style={{ 
                  fontSize: '18px', 
                  fontWeight: '600', 
                  cursor: 'pointer',
                  color: '#0f172a',
                  padding: '12px 0',
                  borderBottom: '1px solid #f1f5f9',
                  display: 'block'
                }}
              >
                {item}
              </Text>
            ))}
            <Button
              block
              className="btn-primary"
              onClick={() => {
                setMobileMenuOpen(false);
                setDemoOpen(true);
              }}
              style={{
                border: 'none',
                color: '#fff',
                borderRadius: '12px',
                height: '52px',
                fontWeight: '600',
                fontSize: '16px',
                marginTop: '24px'
              }}
            >
              Get Demo
            </Button>
          </Space>
        </Drawer>

        <Content>
          
          {/* Hero Section */}
          <section id="hero" style={{
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            padding: '160px 40px 100px',
            position: 'relative',
            overflow: 'hidden',
            background: 'linear-gradient(135deg, #f8fafc 0%, #ffffff 100%)'
          }}>
            {/* Background Elements */}
            <div className="floating-shape" style={{
              width: '700px',
              height: '700px',
              background: 'radial-gradient(circle, rgba(102, 126, 234, 0.08) 0%, transparent 70%)',
              top: '-15%',
              right: '-10%',
            }} />
            <div className="floating-shape" style={{
              width: '500px',
              height: '500px',
              background: 'radial-gradient(circle, rgba(118, 75, 162, 0.06) 0%, transparent 70%)',
              bottom: '10%',
              left: '-8%',
              animationDelay: '3s'
            }} />
            
            <div style={{
              maxWidth: '1400px',
              margin: '0 auto',
              width: '100%'
            }}>
              <Row gutter={[80, 60]} align="middle">
                <Col xs={24} lg={13}>
                  <div style={{
                    animation: 'fadeInLeft 1s ease forwards'
                  }}>
                    {/* Trust Badge */}
                    <Tag style={{
                      background: 'rgba(16, 185, 129, 0.1)',
                      border: '1px solid rgba(16, 185, 129, 0.2)',
                      color: '#059669',
                      padding: '10px 20px',
                      borderRadius: '100px',
                      fontSize: '13px',
                      fontWeight: '600',
                      letterSpacing: '0.5px',
                      marginBottom: '32px'
                    }}>
                      <SafetyCertificateOutlined style={{ marginRight: '8px' }} />
                      HIPAA Compliant • Trusted by 50+ Practices
                    </Tag>
                    
                    {/* Main Headline */}
                    <Title style={{
                      fontSize: 'clamp(44px, 7vw, 72px)',
                      fontWeight: '900',
                      lineHeight: '1.1',
                      color: '#0f172a',
                      margin: '0 0 28px',
                      letterSpacing: '-2px'
                    }}>
                      AI That Runs Your{' '}
                      <span className="gradient-text">Healthcare Practice</span>
                    </Title>
                    
                    {/* Subtitle */}
                    <Paragraph style={{
                      fontSize: '20px',
                      lineHeight: '1.7',
                      color: '#64748b',
                      maxWidth: '540px',
                      margin: '0 0 40px',
                      fontWeight: '400'
                    }}>
                      9 AI-powered agents working 24/7 to automate patient engagement, 
                      reduce admin work by 70%, and grow your practice exponentially.
                    </Paragraph>
                    
                    {/* CTA Buttons */}
                    <Space size={16} wrap style={{ marginBottom: '48px' }}>
                      <Button
                        className="btn-primary"
                        size="large"
                        icon={<PlayCircleOutlined />}
                        onClick={() => setDemoOpen(true)}
                        style={{
                          border: 'none',
                          color: '#fff',
                          borderRadius: '14px',
                          height: '58px',
                          padding: '0 36px',
                          fontWeight: '700',
                          fontSize: '16px',
                          boxShadow: '0 12px 35px rgba(102, 126, 234, 0.35)'
                        }}
                      >
                        Watch Demo
                      </Button>
                      <Button
                        className="btn-outline"
                        size="large"
                        onClick={() => scrollTo('pricing')}
                        style={{
                          background: 'transparent',
                          border: '2px solid #e2e8f0',
                          color: '#0f172a',
                          borderRadius: '14px',
                          height: '58px',
                          padding: '0 36px',
                          fontWeight: '700',
                          fontSize: '16px'
                        }}
                      >
                        See Pricing
                      </Button>
                    </Space>
                    
                    {/* Social Proof */}
                    <div style={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      gap: '32px',
                      flexWrap: 'wrap'
                    }}>
                      <div>
                        <Text style={{ 
                          fontSize: '32px', 
                          fontWeight: '800', 
                          color: '#0f172a',
                          display: 'block',
                          lineHeight: '1'
                        }}>
                          50+
                        </Text>
                        <Text style={{ fontSize: '13px', color: '#64748b', fontWeight: '600' }}>
                          Active Practices
                        </Text>
                      </div>
                      <div>
                        <Text style={{ 
                          fontSize: '32px', 
                          fontWeight: '800', 
                          color: '#0f172a',
                          display: 'block',
                          lineHeight: '1'
                        }}>
                          99.9%
                        </Text>
                        <Text style={{ fontSize: '13px', color: '#64748b', fontWeight: '600' }}>
                          Uptime SLA
                        </Text>
                      </div>
                      <div>
                        <div style={{ display: 'flex', gap: '4px', marginBottom: '4px' }}>
                          {[...Array(5)].map((_, i) => (
                            <StarOutlined key={i} style={{ color: '#fbbf24', fontSize: '16px' }} />
                          ))}
                        </div>
                        <Text style={{ fontSize: '13px', color: '#64748b', fontWeight: '600' }}>
                          4.9/5 Rating
                        </Text>
                      </div>
                    </div>
                  </div>
                </Col>
                
                {/* Hero Image/Dashboard Preview */}
                <Col xs={24} lg={11}>
                  <div style={{ 
                    position: 'relative',
                    animation: 'fadeInRight 1.2s ease forwards'
                  }}>
                    <Card
                      className="glass-card animate-glow"
                      style={{
                        borderRadius: '32px',
                        border: '1px solid rgba(255, 255, 255, 0.8)',
                        boxShadow: '0 30px 80px rgba(0, 0, 0, 0.12)',
                        overflow: 'hidden',
                        background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)'
                      }}
                      styles={{ body: { padding: '32px' } }}
                    >
                      <div style={{ 
                        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                        padding: '24px',
                        borderRadius: '20px',
                        marginBottom: '24px'
                      }}>
                        <Row align="middle" justify="space-between" style={{ marginBottom: '20px' }}>
                          <Text style={{ color: '#fff', fontSize: '18px', fontWeight: '700' }}>
                            Practice Dashboard
                          </Text>
                          <Tag style={{
                            background: 'rgba(255, 255, 255, 0.2)',
                            border: 'none',
                            color: '#fff',
                            padding: '4px 12px',
                            borderRadius: '8px',
                            fontSize: '12px',
                            fontWeight: '600'
                          }}>
                            Live
                          </Tag>
                        </Row>
                        <Row gutter={[12, 12]}>
                          <Col span={12}>
                            <div style={{
                              background: 'rgba(255, 255, 255, 0.15)',
                              backdropFilter: 'blur(10px)',
                              borderRadius: '12px',
                              padding: '16px',
                              border: '1px solid rgba(255, 255, 255, 0.2)'
                            }}>
                              <Text style={{ 
                                color: 'rgba(255, 255, 255, 0.8)', 
                                fontSize: '12px',
                                display: 'block',
                                marginBottom: '8px'
                              }}>
                                New Patients
                              </Text>
                              <Text style={{ 
                                color: '#fff', 
                                fontSize: '28px', 
                                fontWeight: '800',
                                display: 'block'
                              }}>
                                +127
                              </Text>
                              <Text style={{ color: '#4ade80', fontSize: '12px', fontWeight: '600' }}>
                                ↑ 45% this month
                              </Text>
                            </div>
                          </Col>
                          <Col span={12}>
                            <div style={{
                              background: 'rgba(255, 255, 255, 0.15)',
                              backdropFilter: 'blur(10px)',
                              borderRadius: '12px',
                              padding: '16px',
                              border: '1px solid rgba(255, 255, 255, 0.2)'
                            }}>
                              <Text style={{ 
                                color: 'rgba(255, 255, 255, 0.8)', 
                                fontSize: '12px',
                                display: 'block',
                                marginBottom: '8px'
                              }}>
                                Appointments
                              </Text>
                              <Text style={{ 
                                color: '#fff', 
                                fontSize: '28px', 
                                fontWeight: '800',
                                display: 'block'
                              }}>
                                342
                              </Text>
                              <Text style={{ color: '#4ade80', fontSize: '12px', fontWeight: '600' }}>
                                ↑ 32% this week
                              </Text>
                            </div>
                          </Col>
                        </Row>
                      </div>

                      {/* Agent Status */}
                      <div>
                        <Text style={{ 
                          fontSize: '14px', 
                          fontWeight: '700', 
                          color: '#0f172a',
                          display: 'block',
                          marginBottom: '16px'
                        }}>
                          Active AI Agents
                        </Text>
                        <Space direction="vertical" size={12} style={{ width: '100%' }}>
                          {[
                            { name: 'Webchat', status: 'Active', color: '#10b981' },
                            { name: 'SMS Marketing', status: 'Active', color: '#10b981' },
                            { name: 'Voice AI', status: 'Active', color: '#10b981' }
                          ].map((agent, i) => (
                            <div key={i} style={{
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'space-between',
                              padding: '12px 16px',
                              background: '#f8fafc',
                              borderRadius: '12px',
                              border: '1px solid #f1f5f9'
                            }}>
                              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                <div style={{
                                  width: '8px',
                                  height: '8px',
                                  borderRadius: '50%',
                                  background: agent.color,
                                  boxShadow: `0 0 8px ${agent.color}`
                                }} />
                                <Text style={{ fontSize: '14px', fontWeight: '600' }}>
                                  {agent.name}
                                </Text>
                              </div>
                              <Tag style={{
                                background: `${agent.color}15`,
                                border: 'none',
                                color: agent.color,
                                fontSize: '11px',
                                fontWeight: '600',
                                padding: '2px 8px',
                                borderRadius: '6px'
                              }}>
                                {agent.status}
                              </Tag>
                            </div>
                          ))}
                        </Space>
                      </div>
                    </Card>

                    {/* Floating Stats */}
                    <div style={{
                      position: 'absolute',
                      top: '-20px',
                      left: '-20px',
                      background: '#fff',
                      padding: '16px 20px',
                      borderRadius: '16px',
                      boxShadow: '0 12px 32px rgba(0, 0, 0, 0.12)',
                      animation: 'float 6s ease-in-out infinite'
                    }}>
                      <Text style={{ 
                        fontSize: '24px', 
                        fontWeight: '800', 
                        color: '#667eea',
                        display: 'block'
                      }}>
                        70%
                      </Text>
                      <Text style={{ fontSize: '12px', color: '#64748b', fontWeight: '600' }}>
                        Time Saved
                      </Text>
                    </div>

                    <div style={{
                      position: 'absolute',
                      bottom: '20px',
                      right: '-20px',
                      background: '#fff',
                      padding: '16px 20px',
                      borderRadius: '16px',
                      boxShadow: '0 12px 32px rgba(0, 0, 0, 0.12)',
                      animation: 'float 6s ease-in-out infinite 2s'
                    }}>
                      <Text style={{ 
                        fontSize: '24px', 
                        fontWeight: '800', 
                        color: '#f093fb',
                        display: 'block'
                      }}>
                        24/7
                      </Text>
                      <Text style={{ fontSize: '12px', color: '#64748b', fontWeight: '600' }}>
                        AI Support
                      </Text>
                    </div>
                  </div>
                </Col>
              </Row>
            </div>
          </section>

          {/* Features Section */}
          <section id="features" style={{
            padding: 'clamp(80px, 12vw, 140px) 40px',
            background: '#ffffff'
          }}>
            <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
              <div style={{ 
                textAlign: 'center', 
                marginBottom: '72px',
                opacity: isVisible.features ? 1 : 0,
                transform: isVisible.features ? 'translateY(0)' : 'translateY(30px)',
                transition: 'all 0.8s ease'
              }}>
                <Text style={{
                  fontSize: '14px',
                  fontWeight: '700',
                  color: '#667eea',
                  textTransform: 'uppercase',
                  letterSpacing: '3px',
                  display: 'block',
                  marginBottom: '16px'
                }}>
                  Platform Features
                </Text>
                <Title level={2} style={{
                  fontSize: 'clamp(36px, 5vw, 56px)',
                  fontWeight: '900',
                  margin: '0 0 20px',
                  color: '#0f172a',
                  letterSpacing: '-1.5px'
                }}>
                  Built for Modern Healthcare
                </Title>
                <Paragraph style={{
                  fontSize: '18px',
                  color: '#64748b',
                  maxWidth: '640px',
                  margin: '0 auto'
                }}>
                  Enterprise-grade features designed specifically for healthcare practices
                </Paragraph>
              </div>

              <Row gutter={[32, 32]}>
                {features.map((feature, i) => (
                  <Col xs={24} sm={12} lg={8} key={i}>
                    <Card
                      className={`card-hover feature-card ${isVisible.features ? 'visible' : ''}`}
                      style={{
                        '--card-color': feature.color,
                        height: '100%',
                        borderRadius: '24px',
                        border: '1px solid #f1f5f9',
                        boxShadow: '0 4px 16px rgba(0, 0, 0, 0.04)',
                        transitionDelay: `${0.1 * i}s`,
                        background: '#fff'
                      }}
                      styles={{ body: { padding: '36px' } }}
                    >
                      <div className="feature-icon" style={{
                        width: '64px',
                        height: '64px',
                        borderRadius: '18px',
                        background: `${feature.color}15`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginBottom: '24px',
                        fontSize: '28px',
                        color: feature.color
                      }}>
                        {feature.icon}
                      </div>
                      
                      <Title level={4} style={{ 
                        margin: '0 0 12px', 
                        fontWeight: '700', 
                        fontSize: '20px',
                        color: '#0f172a'
                      }}>
                        {feature.title}
                      </Title>
                      
                      <Text style={{
                        color: '#64748b',
                        fontSize: '15px',
                        lineHeight: '1.7'
                      }}>
                        {feature.desc}
                      </Text>
                    </Card>
                  </Col>
                ))}
              </Row>
            </div>
          </section>

          {/* AI Agents Section */}
          <section id="agents" style={{
            padding: 'clamp(80px, 12vw, 140px) 40px',
            background: 'linear-gradient(135deg, #f8fafc 0%, #ffffff 100%)'
          }}>
            <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
              <div style={{ 
                textAlign: 'center', 
                marginBottom: '72px',
                opacity: isVisible.agents ? 1 : 0,
                transform: isVisible.agents ? 'translateY(0)' : 'translateY(30px)',
                transition: 'all 0.8s ease'
              }}>
                <Text style={{
                  fontSize: '14px',
                  fontWeight: '700',
                  color: '#667eea',
                  textTransform: 'uppercase',
                  letterSpacing: '3px',
                  display: 'block',
                  marginBottom: '16px'
                }}>
                  AI Agents
                </Text>
                <Title level={2} style={{
                  fontSize: 'clamp(36px, 5vw, 56px)',
                  fontWeight: '900',
                  margin: '0 0 20px',
                  color: '#0f172a',
                  letterSpacing: '-1.5px'
                }}>
                  9 Specialized AI Agents
                </Title>
                <Paragraph style={{
                  fontSize: '18px',
                  color: '#64748b',
                  maxWidth: '640px',
                  margin: '0 auto'
                }}>
                  Each agent is trained specifically for healthcare tasks and works 24/7
                </Paragraph>
              </div>

              <Row gutter={[28, 28]}>
                {agents.map((agent, i) => (
                  <Col xs={24} sm={12} lg={8} key={i}>
                    <Card
                      className={`card-hover agent-card ${isVisible.agents ? 'visible' : ''}`}
                      style={{
                        height: '100%',
                        borderRadius: '24px',
                        border: '1px solid #f1f5f9',
                        boxShadow: '0 4px 16px rgba(0, 0, 0, 0.04)',
                        transitionDelay: `${0.08 * i}s`,
                        background: '#fff'
                      }}
                      styles={{ body: { padding: '32px' } }}
                    >
                      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '20px' }}>
                        <div className="agent-icon" style={{
                          width: '56px',
                          height: '56px',
                          borderRadius: '16px',
                          background: agent.gradient,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '24px',
                          color: '#fff',
                          boxShadow: `0 8px 24px ${agent.color}40`
                        }}>
                          {agent.icon}
                        </div>
                        <Tag style={{
                          background: `${agent.color}15`,
                          border: 'none',
                          color: agent.color,
                          padding: '6px 12px',
                          borderRadius: '8px',
                          fontSize: '13px',
                          fontWeight: '700'
                        }}>
                          {agent.stats.metric}
                        </Tag>
                      </div>
                      
                      <Title level={4} style={{ 
                        margin: '0 0 12px', 
                        fontWeight: '700', 
                        fontSize: '19px',
                        color: '#0f172a'
                      }}>
                        {agent.name}
                      </Title>
                      
                      <Text style={{
                        color: '#64748b',
                        fontSize: '15px',
                        lineHeight: '1.7',
                        display: 'block',
                        marginBottom: '16px'
                      }}>
                        {agent.desc}
                      </Text>

                      <Text style={{
                        fontSize: '12px',
                        color: '#94a3b8',
                        fontWeight: '600',
                        textTransform: 'uppercase',
                        letterSpacing: '0.5px'
                      }}>
                        {agent.stats.label}
                      </Text>
                    </Card>
                  </Col>
                ))}
              </Row>
            </div>
          </section>

          {/* Benefits Section */}
          <section id="benefits" style={{
            padding: 'clamp(80px, 12vw, 140px) 40px',
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
              width: '800px',
              height: '800px',
              background: 'radial-gradient(circle, rgba(102, 126, 234, 0.15) 0%, transparent 70%)',
              filter: 'blur(100px)'
            }} />

            <div style={{ maxWidth: '1400px', margin: '0 auto', position: 'relative' }}>
              <div style={{ 
                textAlign: 'center', 
                marginBottom: '72px',
                opacity: isVisible.benefits ? 1 : 0,
                transform: isVisible.benefits ? 'translateY(0)' : 'translateY(30px)',
                transition: 'all 0.8s ease'
              }}>
                <Text style={{
                  fontSize: '14px',
                  fontWeight: '700',
                  color: '#667eea',
                  textTransform: 'uppercase',
                  letterSpacing: '3px',
                  display: 'block',
                  marginBottom: '16px'
                }}>
                  Results That Matter
                </Text>
                <Title level={2} style={{
                  fontSize: 'clamp(36px, 5vw, 56px)',
                  fontWeight: '900',
                  margin: '0 0 20px',
                  color: '#ffffff',
                  letterSpacing: '-1.5px'
                }}>
                  Measurable Impact
                </Title>
                <Paragraph style={{
                  fontSize: '18px',
                  color: '#94a3b8',
                  maxWidth: '640px',
                  margin: '0 auto'
                }}>
                  See real results within the first month of using Oodles AI
                </Paragraph>
              </div>

              <Row gutter={[32, 32]}>
                {benefits.map((benefit, i) => (
                  <Col xs={24} sm={12} lg={6} key={i}>
                    <Card
                      className={`stat-card ${isVisible.benefits ? 'visible' : ''}`}
                      style={{
                        borderRadius: '24px',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        background: 'rgba(255, 255, 255, 0.05)',
                        backdropFilter: 'blur(10px)',
                        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)',
                        textAlign: 'center',
                        transitionDelay: `${0.1 * i}s`
                      }}
                      styles={{ body: { padding: '40px 24px' } }}
                    >
                      <div style={{
                        width: '64px',
                        height: '64px',
                        borderRadius: '18px',
                        background: 'rgba(102, 126, 234, 0.15)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        margin: '0 auto 24px',
                        fontSize: '28px',
                        color: '#667eea'
                      }}>
                        {benefit.icon}
                      </div>

                      <Text className="stat-number" style={{
                        fontSize: '48px',
                        fontWeight: '900',
                        background: 'linear-gradient(135deg, #667eea 0%, #f093fb 100%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        display: 'block',
                        marginBottom: '8px',
                        letterSpacing: '-2px'
                      }}>
                        {benefit.stat}
                      </Text>

                      <Text style={{
                        fontSize: '18px',
                        fontWeight: '700',
                        color: '#ffffff',
                        display: 'block',
                        marginBottom: '8px'
                      }}>
                        {benefit.label}
                      </Text>

                      <Text style={{
                        fontSize: '14px',
                        color: '#94a3b8'
                      }}>
                        {benefit.desc}
                      </Text>
                    </Card>
                  </Col>
                ))}
              </Row>
            </div>
          </section>

          {/* How It Works Section */}
          <section id="how-it-works" style={{
            padding: 'clamp(80px, 12vw, 140px) 40px',
            background: '#ffffff'
          }}>
            <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
              <div style={{ 
                textAlign: 'center', 
                marginBottom: '72px'
              }}>
                <Text style={{
                  fontSize: '14px',
                  fontWeight: '700',
                  color: '#667eea',
                  textTransform: 'uppercase',
                  letterSpacing: '3px',
                  display: 'block',
                  marginBottom: '16px'
                }}>
                  Simple Process
                </Text>
                <Title level={2} style={{
                  fontSize: 'clamp(36px, 5vw, 56px)',
                  fontWeight: '900',
                  margin: '0 0 20px',
                  color: '#0f172a',
                  letterSpacing: '-1.5px'
                }}>
                  How It Works
                </Title>
              </div>

              <Row gutter={[48, 48]}>
                {howItWorks.map((step, i) => (
                  <Col xs={24} sm={12} lg={6} key={i}>
                    <div style={{ 
                      textAlign: 'center',
                      opacity: isVisible['how-it-works'] ? 1 : 0,
                      transform: isVisible['how-it-works'] ? 'translateY(0)' : 'translateY(30px)',
                      transition: `all 0.8s ease ${0.1 * i}s`
                    }}>
                      <div style={{
                        width: '80px',
                        height: '80px',
                        borderRadius: '20px',
                        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        margin: '0 auto 24px',
                        fontSize: '32px',
                        color: '#fff',
                        fontWeight: '900',
                        boxShadow: '0 12px 32px rgba(102, 126, 234, 0.3)',
                        position: 'relative'
                      }}>
                        {step.icon}
                        <div style={{
                          position: 'absolute',
                          top: '-8px',
                          right: '-8px',
                          width: '28px',
                          height: '28px',
                          borderRadius: '50%',
                          background: '#f093fb',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '14px',
                          fontWeight: '900',
                          boxShadow: '0 4px 12px rgba(240, 147, 251, 0.4)'
                        }}>
                          {step.step}
                        </div>
                      </div>

                      <Title level={4} style={{
                        fontSize: '20px',
                        fontWeight: '700',
                        margin: '0 0 12px',
                        color: '#0f172a'
                      }}>
                        {step.title}
                      </Title>

                      <Text style={{
                        fontSize: '15px',
                        color: '#64748b',
                        lineHeight: '1.7'
                      }}>
                        {step.desc}
                      </Text>
                    </div>
                  </Col>
                ))}
              </Row>
            </div>
          </section>

          {/* Pricing Section */}
          <section id="pricing" style={{
            padding: 'clamp(80px, 12vw, 140px) 40px',
            background: 'linear-gradient(135deg, #f8fafc 0%, #ffffff 100%)'
          }}>
            <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
              <div style={{ 
                textAlign: 'center', 
                marginBottom: '72px',
                opacity: isVisible.pricing ? 1 : 0,
                transform: isVisible.pricing ? 'translateY(0)' : 'translateY(30px)',
                transition: 'all 0.8s ease'
              }}>
                <Text style={{
                  fontSize: '14px',
                  fontWeight: '700',
                  color: '#667eea',
                  textTransform: 'uppercase',
                  letterSpacing: '3px',
                  display: 'block',
                  marginBottom: '16px'
                }}>
                  Transparent Pricing
                </Text>
                <Title level={2} style={{
                  fontSize: 'clamp(36px, 5vw, 56px)',
                  fontWeight: '900',
                  margin: '0 0 20px',
                  color: '#0f172a',
                  letterSpacing: '-1.5px'
                }}>
                  Choose Your Plan
                </Title>
                <Paragraph style={{
                  fontSize: '18px',
                  color: '#64748b',
                  maxWidth: '640px',
                  margin: '0 auto'
                }}>
                  No hidden fees. Cancel anytime. 14-day free trial on all plans.
                </Paragraph>
              </div>

              <Row gutter={[32, 32]} justify="center">
                {pricingPlans.map((plan, i) => (
                  <Col xs={24} sm={12} lg={8} key={i}>
                    <Card
                      className={`card-hover pricing-card ${plan.featured ? 'featured' : ''} ${isVisible.pricing ? 'visible' : ''}`}
                      style={{
                        height: '100%',
                        borderRadius: '28px',
                        border: plan.featured ? '2px solid #667eea' : '1px solid #f1f5f9',
                        boxShadow: plan.featured 
                          ? '0 20px 60px rgba(102, 126, 234, 0.25)' 
                          : '0 4px 16px rgba(0, 0, 0, 0.04)',
                        background: '#fff',
                        position: 'relative',
                        transitionDelay: `${0.1 * i}s`
                      }}
                      styles={{ body: { padding: '40px 32px' } }}
                    >
                      {plan.featured && (
                        <div style={{
                          position: 'absolute',
                          top: '-14px',
                          left: '50%',
                          transform: 'translateX(-50%)',
                          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                          color: '#fff',
                          padding: '6px 20px',
                          borderRadius: '100px',
                          fontSize: '12px',
                          fontWeight: '700',
                          letterSpacing: '0.5px',
                          boxShadow: '0 4px 12px rgba(102, 126, 234, 0.4)'
                        }}>
                          MOST POPULAR
                        </div>
                      )}

                      <div style={{ textAlign: 'center', marginBottom: '32px' }}>
                        <Text style={{
                          fontSize: '18px',
                          fontWeight: '700',
                          color: '#0f172a',
                          display: 'block',
                          marginBottom: '8px'
                        }}>
                          {plan.name}
                        </Text>
                        <Text style={{
                          fontSize: '14px',
                          color: '#64748b',
                          display: 'block',
                          marginBottom: '24px'
                        }}>
                          {plan.desc}
                        </Text>
                        <div>
                          <Text style={{
                            fontSize: '56px',
                            fontWeight: '900',
                            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            letterSpacing: '-2px'
                          }}>
                            {plan.price}
                          </Text>
                          <Text style={{
                            fontSize: '16px',
                            color: '#64748b',
                            fontWeight: '600'
                          }}>
                            {plan.period}
                          </Text>
                        </div>
                      </div>

                      <Space direction="vertical" size={16} style={{ width: '100%', marginBottom: '32px' }}>
                        {plan.features.map((feature, j) => (
                          <div key={j} style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                            <CheckCircleOutlined style={{ 
                              color: '#10b981', 
                              fontSize: '18px',
                              marginTop: '2px'
                            }} />
                            <Text style={{ fontSize: '15px', color: '#475569', lineHeight: '1.6' }}>
                              {feature}
                            </Text>
                          </div>
                        ))}
                      </Space>

                      <Button
                        block
                        className={plan.featured ? 'btn-primary' : 'btn-outline'}
                        onClick={() => setDemoOpen(true)}
                        style={{
                          height: '52px',
                          borderRadius: '14px',
                          fontSize: '15px',
                          fontWeight: '700',
                          ...(plan.featured ? {
                            border: 'none',
                            color: '#fff'
                          } : {
                            background: 'transparent',
                            border: '2px solid #e2e8f0',
                            color: '#0f172a'
                          })
                        }}
                      >
                        {plan.cta}
                      </Button>
                    </Card>
                  </Col>
                ))}
              </Row>
            </div>
          </section>

          {/* Testimonials Section */}
          <section id="testimonials" style={{
            padding: 'clamp(80px, 12vw, 140px) 40px',
            background: '#ffffff'
          }}>
            <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
              <div style={{ 
                textAlign: 'center', 
                marginBottom: '72px',
                opacity: isVisible.testimonials ? 1 : 0,
                transform: isVisible.testimonials ? 'translateY(0)' : 'translateY(30px)',
                transition: 'all 0.8s ease'
              }}>
                <Text style={{
                  fontSize: '14px',
                  fontWeight: '700',
                  color: '#667eea',
                  textTransform: 'uppercase',
                  letterSpacing: '3px',
                  display: 'block',
                  marginBottom: '16px'
                }}>
                  Success Stories
                </Text>
                <Title level={2} style={{
                  fontSize: 'clamp(36px, 5vw, 56px)',
                  fontWeight: '900',
                  margin: '0 0 20px',
                  color: '#0f172a',
                  letterSpacing: '-1.5px'
                }}>
                  What Practices Say
                </Title>
              </div>

              <Row gutter={[32, 32]}>
                {testimonials.map((testimonial, i) => (
                  <Col xs={24} lg={8} key={i}>
                    <Card
                      className={`testimonial-card ${isVisible.testimonials ? 'visible' : ''}`}
                      style={{
                        height: '100%',
                        borderRadius: '24px',
                        border: '1px solid #f1f5f9',
                        boxShadow: '0 4px 16px rgba(0, 0, 0, 0.04)',
                        background: '#fff',
                        transitionDelay: `${0.1 * i}s`
                      }}
                      styles={{ body: { padding: '36px' } }}
                    >
                      <div style={{ marginBottom: '20px' }}>
                        {[...Array(testimonial.rating)].map((_, j) => (
                          <StarOutlined key={j} style={{ color: '#fbbf24', fontSize: '18px', marginRight: '4px' }} />
                        ))}
                      </div>

                      <Paragraph style={{
                        fontSize: '16px',
                        lineHeight: '1.8',
                        color: '#475569',
                        marginBottom: '24px',
                        fontStyle: 'italic'
                      }}>
                        "{testimonial.quote}"
                      </Paragraph>

                      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                        <div style={{
                          width: '56px',
                          height: '56px',
                          borderRadius: '50%',
                          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '28px',
                          flexShrink: 0
                        }}>
                          {testimonial.photo}
                        </div>
                        <div>
                          <Text style={{
                            fontSize: '16px',
                            fontWeight: '700',
                            color: '#0f172a',
                            display: 'block'
                          }}>
                            {testimonial.name}
                          </Text>
                          <Text style={{
                            fontSize: '14px',
                            color: '#64748b',
                            display: 'block'
                          }}>
                            {testimonial.role}
                          </Text>
                          <Text style={{
                            fontSize: '13px',
                            color: '#94a3b8'
                          }}>
                            {testimonial.practice}
                          </Text>
                        </div>
                      </div>
                    </Card>
                  </Col>
                ))}
              </Row>
            </div>
          </section>

          {/* Final CTA Section */}
          <section id="cta" style={{
            padding: 'clamp(100px, 15vw, 160px) 40px',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            position: 'relative',
            overflow: 'hidden'
          }}>
            {/* Background decoration */}
            <div style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: '1000px',
              height: '1000px',
              background: 'radial-gradient(circle, rgba(255, 255, 255, 0.1) 0%, transparent 70%)',
              filter: 'blur(100px)'
            }} />

            <div style={{
              maxWidth: '900px',
              margin: '0 auto',
              textAlign: 'center',
              position: 'relative',
              opacity: isVisible.cta ? 1 : 0,
              transform: isVisible.cta ? 'scale(1)' : 'scale(0.95)',
              transition: 'all 0.8s ease'
            }}>
              <Title level={2} style={{
                fontSize: 'clamp(40px, 6vw, 64px)',
                fontWeight: '900',
                margin: '0 0 24px',
                color: '#ffffff',
                letterSpacing: '-2px',
                lineHeight: '1.1'
              }}>
                Ready to Transform Your Practice?
              </Title>
              
              <Paragraph style={{
                fontSize: '20px',
                color: 'rgba(255, 255, 255, 0.9)',
                marginBottom: '48px',
                lineHeight: '1.7'
              }}>
                Join 50+ healthcare practices using Oodles AI to save time, 
                increase revenue, and deliver better patient experiences.
              </Paragraph>
              
              <Space size={16} wrap style={{ justifyContent: 'center' }}>
                <Button
                  size="large"
                  onClick={() => setDemoOpen(true)}
                  style={{
                    background: '#ffffff',
                    border: 'none',
                    color: '#667eea',
                    borderRadius: '14px',
                    height: '60px',
                    padding: '0 40px',
                    fontWeight: '700',
                    fontSize: '17px',
                    boxShadow: '0 12px 35px rgba(0, 0, 0, 0.2)'
                  }}
                  icon={<PlayCircleOutlined />}
                >
                  Schedule Demo
                </Button>
                <Button
                  size="large"
                  onClick={() => scrollTo('pricing')}
                  style={{
                    background: 'transparent',
                    border: '2px solid rgba(255, 255, 255, 0.3)',
                    color: '#ffffff',
                    borderRadius: '14px',
                    height: '60px',
                    padding: '0 40px',
                    fontWeight: '700',
                    fontSize: '17px'
                  }}
                >
                  View Pricing
                </Button>
              </Space>

              <div style={{
                marginTop: '56px',
                padding: '28px',
                background: 'rgba(255, 255, 255, 0.1)',
                backdropFilter: 'blur(10px)',
                borderRadius: '20px',
                border: '1px solid rgba(255, 255, 255, 0.2)'
              }}>
                <Row gutter={[32, 24]} justify="center">
                  <Col xs={12} sm={6}>
                    <div>
                      <Text style={{
                        fontSize: '32px',
                        fontWeight: '900',
                        color: '#ffffff',
                        display: 'block',
                        lineHeight: '1'
                      }}>
                        14
                      </Text>
                      <Text style={{
                        fontSize: '13px',
                        color: 'rgba(255, 255, 255, 0.8)',
                        fontWeight: '600'
                      }}>
                        Day Free Trial
                      </Text>
                    </div>
                  </Col>
                  <Col xs={12} sm={6}>
                    <div>
                      <Text style={{
                        fontSize: '32px',
                        fontWeight: '900',
                        color: '#ffffff',
                        display: 'block',
                        lineHeight: '1'
                      }}>
                        24/7
                      </Text>
                      <Text style={{
                        fontSize: '13px',
                        color: 'rgba(255, 255, 255, 0.8)',
                        fontWeight: '600'
                      }}>
                        Support
                      </Text>
                    </div>
                  </Col>
                  <Col xs={12} sm={6}>
                    <div>
                      <Text style={{
                        fontSize: '32px',
                        fontWeight: '900',
                        color: '#ffffff',
                        display: 'block',
                        lineHeight: '1'
                      }}>
                        99.9%
                      </Text>
                      <Text style={{
                        fontSize: '13px',
                        color: 'rgba(255, 255, 255, 0.8)',
                        fontWeight: '600'
                      }}>
                        Uptime SLA
                      </Text>
                    </div>
                  </Col>
                  <Col xs={12} sm={6}>
                    <div>
                      <Text style={{
                        fontSize: '32px',
                        fontWeight: '900',
                        color: '#ffffff',
                        display: 'block',
                        lineHeight: '1'
                      }}>
                        $0
                      </Text>
                      <Text style={{
                        fontSize: '13px',
                        color: 'rgba(255, 255, 255, 0.8)',
                        fontWeight: '600'
                      }}>
                        Setup Fee
                      </Text>
                    </div>
                  </Col>
                </Row>
              </div>
            </div>
          </section>
        </Content>

        {/* Footer */}
        <Footer style={{
          background: '#0f172a',
          padding: '80px 40px 40px',
          borderTop: '1px solid rgba(102, 126, 234, 0.1)'
        }}>
          <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
            <Row gutter={[48, 48]}>
              <Col xs={24} lg={8}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
                  <div style={{
                    width: '42px',
                    height: '42px',
                    borderRadius: '12px',
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '20px',
                    color: '#fff',
                    fontWeight: '800'
                  }}>
                    O
                  </div>
                  <Text style={{ fontSize: '24px', fontWeight: '800', color: '#ffffff' }}>
                    Oodles AI
                  </Text>
                </div>
                <Paragraph style={{ color: '#94a3b8', fontSize: '15px', lineHeight: '1.7' }}>
                  The all-in-one AI platform for modern healthcare practices. 
                  Automate operations, engage patients, and grow your practice.
                </Paragraph>
                <Space size={12} style={{ marginTop: '24px' }}>
                  <div style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '10px',
                    background: 'rgba(102, 126, 234, 0.1)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    color: '#667eea',
                    fontSize: '18px',
                    transition: 'all 0.3s ease'
                  }}>
                    <GlobalOutlined />
                  </div>
                </Space>
              </Col>
              
              <Col xs={12} sm={8} lg={4}>
                <Title level={5} style={{ color: '#ffffff', marginBottom: '20px', fontSize: '16px' }}>
                  Product
                </Title>
                <Space direction="vertical" size={12}>
                  {['Features', 'Agents', 'Pricing', 'Demo'].map((item) => (
                    <Text
                      key={item}
                      onClick={() => scrollTo(item.toLowerCase())}
                      style={{
                        color: '#94a3b8',
                        cursor: 'pointer',
                        fontSize: '14px',
                        transition: 'color 0.3s ease'
                      }}
                    >
                      {item}
                    </Text>
                  ))}
                </Space>
              </Col>
              
              <Col xs={12} sm={8} lg={4}>
                <Title level={5} style={{ color: '#ffffff', marginBottom: '20px', fontSize: '16px' }}>
                  Company
                </Title>
                <Space direction="vertical" size={12}>
                  {['About', 'Careers', 'Blog', 'Contact'].map((item) => (
                    <Text key={item} style={{ color: '#94a3b8', cursor: 'pointer', fontSize: '14px' }}>
                      {item}
                    </Text>
                  ))}
                </Space>
              </Col>
              
              <Col xs={12} sm={8} lg={4}>
                <Title level={5} style={{ color: '#ffffff', marginBottom: '20px', fontSize: '16px' }}>
                  Resources
                </Title>
                <Space direction="vertical" size={12}>
                  {['Help Center', 'API Docs', 'Case Studies', 'Compliance'].map((item) => (
                    <Text key={item} style={{ color: '#94a3b8', cursor: 'pointer', fontSize: '14px' }}>
                      {item}
                    </Text>
                  ))}
                </Space>
              </Col>
              
              <Col xs={24} lg={4}>
                <Title level={5} style={{ color: '#ffffff', marginBottom: '20px', fontSize: '16px' }}>
                  Contact
                </Title>
                <Space direction="vertical" size={12}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <MailOutlined style={{ color: '#667eea', fontSize: '16px' }} />
                    <Text style={{ color: '#94a3b8', fontSize: '14px' }}>
                      hello@oodles.ai
                    </Text>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <PhoneFilled style={{ color: '#667eea', fontSize: '16px' }} />
                    <Text style={{ color: '#94a3b8', fontSize: '14px' }}>
                      1-800-OODLES
                    </Text>
                  </div>
                </Space>
              </Col>
            </Row>
            
            <div style={{
              marginTop: '60px',
              paddingTop: '32px',
              borderTop: '1px solid rgba(148, 163, 184, 0.1)',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '20px'
            }}>
              <Text style={{ color: '#64748b', fontSize: '14px' }}>
                © {new Date().getFullYear()} Oodles AI. All rights reserved.
              </Text>
              <Space size={24}>
                <Text style={{ color: '#64748b', fontSize: '14px', cursor: 'pointer' }}>
                  Privacy Policy
                </Text>
                <Text style={{ color: '#64748b', fontSize: '14px', cursor: 'pointer' }}>
                  Terms of Service
                </Text>
                <Text style={{ color: '#64748b', fontSize: '14px', cursor: 'pointer' }}>
                  HIPAA Compliance
                </Text>
              </Space>
            </div>
          </div>
        </Footer>

        {/* Demo Request Drawer */}
        <Drawer
          title={
            <div style={{ 
              fontSize: '24px', 
              fontWeight: '800',
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}>
              Request a Demo
            </div>
          }
          open={demoOpen}
          onClose={() => setDemoOpen(false)}
          width={480}
          footer={
            <Space style={{ width: '100%', justifyContent: 'flex-end' }}>
              <Button onClick={() => setDemoOpen(false)} style={{ borderRadius: '10px', height: '44px' }}>
                Cancel
              </Button>
              <Button
                className="btn-primary"
                onClick={requestDemo}
                style={{
                  border: 'none',
                  color: '#fff',
                  borderRadius: '10px',
                  height: '44px',
                  padding: '0 28px',
                  fontWeight: '600'
                }}
              >
                Schedule Demo
              </Button>
            </Space>
          }
        >
          <Space direction="vertical" size={20} style={{ width: '100%', padding: '20px 0' }}>
            <div>
              <Text style={{ fontSize: '15px', fontWeight: '600', display: 'block', marginBottom: '8px' }}>
                Full Name
              </Text>
              <input
                placeholder="Dr. John Smith"
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  borderRadius: '10px',
                  border: '1px solid #e2e8f0',
                  fontSize: '15px',
                  outline: 'none'
                }}
              />
            </div>
            
            <div>
              <Text style={{ fontSize: '15px', fontWeight: '600', display: 'block', marginBottom: '8px' }}>
                Email Address
              </Text>
              <input
                type="email"
                placeholder="john@practice.com"
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  borderRadius: '10px',
                  border: '1px solid #e2e8f0',
                  fontSize: '15px',
                  outline: 'none'
                }}
              />
            </div>
            
            <div>
              <Text style={{ fontSize: '15px', fontWeight: '600', display: 'block', marginBottom: '8px' }}>
                Phone Number
              </Text>
              <input
                type="tel"
                placeholder="(555) 123-4567"
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  borderRadius: '10px',
                  border: '1px solid #e2e8f0',
                  fontSize: '15px',
                  outline: 'none'
                }}
              />
            </div>
            
            <div>
              <Text style={{ fontSize: '15px', fontWeight: '600', display: 'block', marginBottom: '8px' }}>
                Practice Name
              </Text>
              <input
                placeholder="Smith Family Dental"
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  borderRadius: '10px',
                  border: '1px solid #e2e8f0',
                  fontSize: '15px',
                  outline: 'none'
                }}
              />
            </div>
            
            <div>
              <Text style={{ fontSize: '15px', fontWeight: '600', display: 'block', marginBottom: '8px' }}>
                Practice Type
              </Text>
              <select
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  borderRadius: '10px',
                  border: '1px solid #e2e8f0',
                  fontSize: '15px',
                  outline: 'none'
                }}
              >
                <option>Select practice type</option>
                <option>Dental</option>
                <option>Medical Spa</option>
                <option>Dermatology</option>
                <option>Primary Care</option>
                <option>Cosmetic Surgery</option>
                <option>Other</option>
              </select>
            </div>
          </Space>
        </Drawer>

        {/* Floating Chat Button */}
        <Tooltip title="Chat with Sales" placement="left">
          <Button
            onClick={() => setDemoOpen(true)}
            className="animate-pulse"
            style={{
              position: 'fixed',
              bottom: '32px',
              right: '32px',
              width: '64px',
              height: '64px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              border: 'none',
              color: '#fff',
              fontSize: '28px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 12px 35px rgba(102, 126, 234, 0.4)',
              zIndex: 1000,
              cursor: 'pointer'
            }}
            icon={<MessageOutlined />}
          />
        </Tooltip>
      </Layout>
    </>
  );
}