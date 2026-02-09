import React, { useState, useEffect } from 'react';
import { Row, Col } from 'antd';
import {
  MenuOutlined,
  PhoneOutlined,
  ArrowRightOutlined,
  CheckCircleFilled,
  ToolOutlined,
  FacebookFilled,
  TwitterOutlined,
  InstagramFilled,
  LinkedinFilled,
  YoutubeFilled,
  StarFilled,
  SafetyOutlined,
  ClockCircleOutlined,
  CloseOutlined,
  MailOutlined,
  EnvironmentOutlined
} from '@ant-design/icons';

const PlumbingWebsite = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [email, setEmail] = useState('');
  const [isScrolled, setIsScrolled] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  const [testimonialIndex, setTestimonialIndex] = useState(0);
  const [showBooking, setShowBooking] = useState(false);
  const [notification, setNotification] = useState({ show: false, message: '', type: '' });
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    service: '',
    date: '',
    message: ''
  });

  const showNotification = (message, type) => {
    setNotification({ show: true, message, type });
    setTimeout(() => setNotification({ show: false, message: '', type: '' }), 3000);
  };

  const services = [
    {
      id: 1,
      title: 'Emergency Repairs',
      description: 'Fast 24/7 emergency plumbing repairs. We fix leaks, bursts, and urgent issues immediately.',
      image: 'https://images.unsplash.com/photo-1607472586893-edb57bdc0e39?w=600&h=400&fit=crop&q=80',
      icon: '⚡',
      price: 'From $99',
      features: ['24/7 Availability', 'Fast Response Time', 'No Overtime Charges']
    },
    {
      id: 2,
      title: 'Pipe Installation',
      description: 'Professional pipe installation and replacement for residential and commercial properties.',
      image: 'https://images.unsplash.com/photo-1581244277943-fe4a9c777189?w=600&h=400&fit=crop&q=80',
      icon: '🔧',
      price: 'From $149',
      features: ['Quality Materials', 'Warranty Included', 'Expert Installation']
    },
    {
      id: 3,
      title: 'Drain Cleaning',
      description: 'Advanced drain cleaning services to clear clogs and restore optimal water flow.',
      image: 'https://images.unsplash.com/photo-1585704032915-c3400ca199e7?w=600&h=400&fit=crop&q=80',
      icon: '💧',
      price: 'From $79',
      features: ['Hydro Jetting', 'Camera Inspection', 'Same Day Service']
    },
    {
      id: 4,
      title: 'Water Heaters',
      description: 'Installation, repair, and maintenance of all water heater types and brands.',
      image: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=600&h=400&fit=crop&q=80',
      icon: '🔥',
      price: 'From $599',
      features: ['All Brands Supported', 'Energy Efficient Options', '10-Year Warranty']
    },
    {
      id: 5,
      title: 'Bathroom Remodeling',
      description: 'Complete bathroom plumbing for renovations and new construction projects.',
      image: 'https://images.unsplash.com/photo-1620626011761-996317b8d101?w=600&h=400&fit=crop&q=80',
      icon: '🚿',
      price: 'From $2,499',
      features: ['Custom Design', 'Premium Fixtures', 'Full Service Package']
    },
    {
      id: 6,
      title: 'Sewer Services',
      description: 'Expert sewer line inspection, cleaning, and repair with video camera technology.',
      image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=400&fit=crop&q=80',
      icon: '🔩',
      price: 'From $199',
      features: ['Video Inspection', 'Trenchless Repair', 'Root Removal']
    },
    {
      id: 7,
      title: 'Leak Detection',
      description: 'Advanced leak detection technology to find and fix hidden water leaks quickly.',
      image: 'https://images.unsplash.com/photo-1585704032915-c3400ca199e7?w=600&h=400&fit=crop&q=80',
      icon: '🔍',
      price: 'From $129',
      features: ['Electronic Detection', 'Non-Invasive Methods', 'Detailed Report']
    },
    {
      id: 8,
      title: 'Gas Line Services',
      description: 'Safe and certified gas line installation, repair, and inspection services.',
      image: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=600&h=400&fit=crop&q=80',
      icon: '⛽',
      price: 'From $179',
      features: ['Safety First Approach', 'Certified Technicians', 'Pressure Testing']
    },
    {
      id: 9,
      title: 'Fixture Installation',
      description: 'Professional installation of faucets, sinks, toilets, and other plumbing fixtures.',
      image: 'https://images.unsplash.com/photo-1620626011761-996317b8d101?w=600&h=400&fit=crop&q=80',
      icon: '🚰',
      price: 'From $89',
      features: ['Expert Installation', 'All Brands', 'Clean Workspace']
    }
  ];

  const testimonials = [
    {
      name: 'Sarah Johnson',
      rating: 5,
      text: 'Outstanding service! They fixed our burst pipe in less than an hour. Highly professional and reasonably priced.',
      location: 'Los Angeles, CA'
    },
    {
      name: 'Mike Chen',
      rating: 5,
      text: 'Best plumbing company I\'ve worked with. They installed our new water heater efficiently and explained everything clearly.',
      location: 'San Diego, CA'
    },
    {
      name: 'Emily Rodriguez',
      rating: 5,
      text: 'Called them for an emergency at 2 AM and they arrived within 30 minutes. Saved us from major water damage!',
      location: 'San Francisco, CA'
    }
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.pageYOffset > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setTestimonialIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    if (email && email.includes('@')) {
      showNotification('Successfully subscribed!', 'success');
      setEmail('');
    } else {
      showNotification('Please enter a valid email', 'error');
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (formData.name && formData.phone && formData.service) {
      showNotification('Booking request submitted! We\'ll contact you shortly.', 'success');
      setShowBooking(false);
      setFormData({ name: '', phone: '', service: '', date: '', message: '' });
    } else {
      showNotification('Please fill in all required fields', 'error');
    }
  };

  const handleFormChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
      setMobileMenuOpen(false);
    }
  };

  return (
    <>
      <style>{`
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; }
        
        @media (max-width: 992px) {
          .nav-desktop { display: none !important; }
          .mobile-btn { display: flex !important; }
          .hero-grid, .cta-grid, .about-grid { grid-template-columns: 1fr !important; }
          .footer-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .stats-container { grid-template-columns: repeat(2, 1fr) !important; }
        }
        
        @media (max-width: 768px) {
          .hero-title { font-size: 40px !important; }
          .section-title, .cta-title { font-size: 34px !important; }
          .stats-container { grid-template-columns: 1fr !important; gap: 24px !important; }
          .hero-cta { flex-direction: column !important; }
          .hero-cta button { width: 100%; justify-content: center; }
          .footer-grid, .newsletter-form { grid-template-columns: 1fr !important; flex-direction: column !important; }
        }

        .service-card:hover { transform: translateY(-8px); box-shadow: 0 20px 40px rgba(0,0,0,0.12); border-color: #3B82F6; }
        .service-card:hover .service-image { transform: scale(1.08); }
        .service-link:hover { gap: 10px; }
        .footer-link:hover { color: #3B82F6; }
        .social-icon:hover { background: #3B82F6; color: #fff; transform: translateY(-3px); border-color: #3B82F6; }
        .btn-primary:hover { transform: translateY(-2px); box-shadow: 0 8px 20px rgba(59,130,246,0.5); }
        .btn-secondary:hover { background: #F8FAFC; border-color: #3B82F6; color: #3B82F6; }
        .cta-phone:hover { background: #DBEAFE; border-color: #3B82F6; }
        .newsletter-button:hover, .submit-btn:hover { box-shadow: 0 8px 20px rgba(59,130,246,0.5); }
        .floating-button:hover { transform: scale(1.1) rotate(10deg); box-shadow: 0 12px 32px rgba(59,130,246,0.5); }
        .modal-close:hover { background: #F1F5F9; color: #0F172A; }
        input:focus, select:focus, textarea:focus { outline: none; border-color: #3B82F6; box-shadow: 0 0 0 3px rgba(59,130,246,0.1); }

        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .service-card { animation: fadeInUp 0.6s ease forwards; }
        .service-card:nth-child(1) { animation-delay: 0.1s; opacity: 0; }
        .service-card:nth-child(2) { animation-delay: 0.2s; opacity: 0; }
        .service-card:nth-child(3) { animation-delay: 0.3s; opacity: 0; }
        .service-card:nth-child(4) { animation-delay: 0.4s; opacity: 0; }
        .service-card:nth-child(5) { animation-delay: 0.5s; opacity: 0; }
        .service-card:nth-child(6) { animation-delay: 0.6s; opacity: 0; }
        .service-card:nth-child(7) { animation-delay: 0.7s; opacity: 0; }
        .service-card:nth-child(8) { animation-delay: 0.8s; opacity: 0; }
        .service-card:nth-child(9) { animation-delay: 0.9s; opacity: 0; }

        @keyframes slideIn {
          from { transform: translateY(-100%); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        .notification { animation: slideIn 0.3s ease; }

        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }
        .floating-button { animation: pulse 2s infinite; }
      `}</style>

      {notification.show && (
        <div style={{
          position: 'fixed',
          top: '20px',
          right: '20px',
          zIndex: 3000,
          background: notification.type === 'success' ? '#10B981' : '#EF4444',
          color: '#fff',
          padding: '16px 24px',
          borderRadius: '12px',
          boxShadow: '0 4px 16px rgba(0,0,0,0.2)',
          fontWeight: 600
        }} className="notification">
          {notification.message}
        </div>
      )}

      <header style={{
        background: isScrolled ? 'rgba(255,255,255,0.98)' : '#FFF',
        backdropFilter: 'blur(12px)',
        borderBottom: isScrolled ? '1px solid #E2E8F0' : 'none',
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        boxShadow: isScrolled ? '0 2px 16px rgba(0,0,0,0.08)' : 'none',
        transition: 'all 0.3s'
      }}>
        <nav style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '20px 24px',
          maxWidth: '1320px',
          margin: '0 auto'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer' }} onClick={() => scrollToSection('home')}>
            <div style={{
              width: '48px',
              height: '48px',
              background: 'linear-gradient(135deg, #3B82F6, #2563EB)',
              borderRadius: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '22px',
              color: '#fff',
              boxShadow: '0 4px 14px rgba(59,130,246,0.3)'
            }}>💧</div>
            <span style={{ fontSize: '26px', fontWeight: 800, color: '#0F172A', letterSpacing: '-0.5px' }}>
              Flow<span style={{ color: '#3B82F6' }}>Pro</span>
            </span>
          </div>

          <ul className="nav-desktop" style={{ display: 'flex', listStyle: 'none', gap: '40px' }}>
            {['home', 'services', 'about'].map(section => (
              <li key={section} style={{
                color: activeSection === section ? '#3B82F6' : '#475569',
                fontWeight: activeSection === section ? 600 : 500,
                fontSize: '15px',
                cursor: 'pointer',
                transition: 'color 0.2s',
                textTransform: 'capitalize'
              }} onClick={() => scrollToSection(section)}>
                {section}
              </li>
            ))}
          </ul>

          <button className="mobile-btn" style={{
            display: 'none',
            background: 'none',
            border: 'none',
            fontSize: '24px',
            cursor: 'pointer',
            color: '#475569'
          }} onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            <MenuOutlined />
          </button>
        </nav>

        {mobileMenuOpen && (
          <div style={{
            background: '#FFF',
            borderTop: '1px solid #E2E8F0',
            padding: '20px 24px',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px'
          }}>
            {['home', 'services', 'about'].map(section => (
              <div key={section} style={{
                color: activeSection === section ? '#3B82F6' : '#475569',
                fontWeight: activeSection === section ? 600 : 500,
                fontSize: '16px',
                cursor: 'pointer',
                textTransform: 'capitalize',
                padding: '12px 0'
              }} onClick={() => scrollToSection(section)}>
                {section}
              </div>
            ))}
          </div>
        )}
      </header>

      <section id="home" style={{ background: '#FFF', padding: '140px 24px 100px', marginTop: '88px' }}>
        <div style={{ maxWidth: '1320px', margin: '0 auto' }}>
          <div className="hero-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '80px', alignItems: 'center' }}>
            <div style={{ maxWidth: '600px' }}>
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                background: '#EFF6FF',
                border: '1px solid #DBEAFE',
                padding: '10px 20px',
                borderRadius: '50px',
                color: '#3B82F6',
                fontSize: '14px',
                fontWeight: 600,
                marginBottom: '28px'
              }}>
                <StarFilled /> Trusted Since 2010
              </div>
              
              <h1 className="hero-title" style={{
                fontSize: '58px',
                lineHeight: '1.1',
                marginBottom: '24px',
                fontWeight: 800,
                color: '#0F172A',
                letterSpacing: '-2px'
              }}>
                Professional Plumbing<br />
                <span style={{
                  background: 'linear-gradient(135deg, #3B82F6, #2563EB)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent'
                }}>Solutions You Can Trust</span>
              </h1>

              <p style={{ fontSize: '18px', color: '#64748B', marginBottom: '40px', lineHeight: '1.8' }}>
                Expert plumbing services available 24/7. From emergency repairs to complete installations, 
                we deliver quality workmanship with every project.
              </p>

              <div className="hero-cta" style={{ display: 'flex', gap: '16px', marginBottom: '50px', flexWrap: 'wrap' }}>
                <button className="btn-primary" style={{
                  background: 'linear-gradient(135deg, #3B82F6, #2563EB)',
                  border: 'none',
                  padding: '16px 32px',
                  borderRadius: '12px',
                  fontWeight: 600,
                  fontSize: '16px',
                  color: '#fff',
                  cursor: 'pointer',
                  boxShadow: '0 4px 14px rgba(59,130,246,0.4)',
                  transition: 'all 0.3s',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px'
                }} onClick={() => setShowBooking(true)}>
                  Schedule Service <ArrowRightOutlined />
                </button>
                <button className="btn-secondary" style={{
                  background: '#fff',
                  border: '2px solid #E2E8F0',
                  color: '#475569',
                  padding: '14px 32px',
                  borderRadius: '12px',
                  fontWeight: 600,
                  fontSize: '16px',
                  cursor: 'pointer',
                  transition: 'all 0.3s',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px'
                }}>
                  <PhoneOutlined /> (234) 231-2123
                </button>
              </div>

              <div className="stats-container" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '32px' }}>
                {[
                  { number: '15K+', label: 'Projects Completed' },
                  { number: '98%', label: 'Client Satisfaction' },
                  { number: '24/7', label: 'Emergency Service' }
                ].map((stat, i) => (
                  <div key={i}>
                    <div style={{ fontSize: '44px', fontWeight: 800, color: '#3B82F6', marginBottom: '8px' }}>
                      {stat.number}
                    </div>
                    <div style={{ color: '#64748B', fontSize: '14px', fontWeight: 500 }}>
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ position: 'relative', borderRadius: '24px', overflow: 'hidden', boxShadow: '0 20px 60px rgba(0,0,0,0.12)' }}>
              <img src="https://images.unsplash.com/photo-1607472586893-edb57bdc0e39?w=800&h=900&fit=crop&q=80"
                alt="Professional plumber" style={{ width: '100%', display: 'block' }} />
              <div style={{
                position: 'absolute',
                bottom: '30px',
                left: '30px',
                right: '30px',
                background: 'rgba(255,255,255,0.95)',
                backdropFilter: 'blur(10px)',
                padding: '20px 24px',
                borderRadius: '16px',
                display: 'flex',
                alignItems: 'center',
                gap: '16px',
                boxShadow: '0 10px 30px rgba(0,0,0,0.15)'
              }}>
                <div style={{
                  width: '48px',
                  height: '48px',
                  background: 'linear-gradient(135deg, #EFF6FF, #DBEAFE)',
                  borderRadius: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '24px',
                  color: '#3B82F6'
                }}>
                  <ClockCircleOutlined />
                </div>
                <div>
                  <div style={{ fontWeight: 700, color: '#0F172A', fontSize: '16px' }}>24/7 Available</div>
                  <div style={{ fontSize: '13px', color: '#64748B' }}>Emergency Service Ready</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="services" style={{ padding: '100px 24px', background: '#F8FAFC' }}>
        <div style={{ maxWidth: '1320px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto 70px' }}>
            <div style={{
              display: 'inline-block',
              background: '#EFF6FF',
              color: '#3B82F6',
              padding: '8px 20px',
              borderRadius: '50px',
              fontSize: '14px',
              fontWeight: 600,
              marginBottom: '20px'
            }}>Our Services</div>
            <h2 className="section-title" style={{
              fontSize: '44px',
              fontWeight: 800,
              marginBottom: '20px',
              color: '#0F172A',
              letterSpacing: '-1px'
            }}>Expert Plumbing Solutions</h2>
            <p style={{ color: '#64748B', fontSize: '17px', lineHeight: '1.7' }}>
              Comprehensive plumbing services delivered by certified professionals 
              with cutting-edge equipment and guaranteed satisfaction.
            </p>
          </div>

          <Row gutter={[28, 28]}>
            {services.map((service) => (
              <Col xs={24} sm={12} lg={8} key={service.id}>
                <div className="service-card" onClick={() => setSelectedService(service)} style={{
                  background: '#fff',
                  border: '1px solid #E2E8F0',
                  borderRadius: '20px',
                  overflow: 'hidden',
                  transition: 'all 0.3s',
                  cursor: 'pointer',
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column'
                }}>
                  <div style={{ position: 'relative', width: '100%', paddingTop: '65%', overflow: 'hidden', background: '#F1F5F9' }}>
                    <img src={service.image} alt={service.title} className="service-image" style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      transition: 'transform 0.4s'
                    }} />
                    <div style={{
                      position: 'absolute',
                      top: '20px',
                      left: '20px',
                      width: '56px',
                      height: '56px',
                      background: 'rgba(255,255,255,0.95)',
                      backdropFilter: 'blur(10px)',
                      borderRadius: '14px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '24px',
                      boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                    }}>{service.icon}</div>
                  </div>

                  <div style={{ padding: '28px 24px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                    <h3 style={{ fontSize: '20px', fontWeight: 700, marginBottom: '12px', color: '#0F172A' }}>
                      {service.title}
                    </h3>
                    <p style={{ color: '#64748B', lineHeight: '1.7', fontSize: '15px', marginBottom: '20px', flex: 1 }}>
                      {service.description}
                    </p>
                    <div style={{ marginBottom: '16px', fontSize: '18px', fontWeight: 700, color: '#3B82F6' }}>
                      {service.price}
                    </div>
                    <a className="service-link" style={{
                      color: '#3B82F6',
                      fontWeight: 600,
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px',
                      fontSize: '15px',
                      transition: 'gap 0.2s',
                      textDecoration: 'none'
                    }}>
                      Learn More <ArrowRightOutlined />
                    </a>
                  </div>
                </div>
              </Col>
            ))}
          </Row>
        </div>
      </section>

      <section style={{ padding: '80px 24px', background: 'linear-gradient(135deg, #EFF6FF, #DBEAFE)' }}>
        <div style={{ maxWidth: '1320px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto 70px' }}>
            <div style={{
              display: 'inline-block',
              background: '#FFF',
              color: '#3B82F6',
              padding: '8px 20px',
              borderRadius: '50px',
              fontSize: '14px',
              fontWeight: 600,
              marginBottom: '20px'
            }}>Testimonials</div>
            <h2 className="section-title" style={{
              fontSize: '44px',
              fontWeight: 800,
              color: '#0F172A',
              letterSpacing: '-1px'
            }}>What Our Clients Say</h2>
          </div>

          <div style={{
            background: '#fff',
            padding: '40px',
            borderRadius: '20px',
            boxShadow: '0 10px 40px rgba(0,0,0,0.08)',
            maxWidth: '800px',
            margin: '0 auto'
          }}>
            <div style={{ color: '#FBBF24', fontSize: '18px', display: 'flex', gap: '4px', marginBottom: '20px' }}>
              {[...Array(testimonials[testimonialIndex].rating)].map((_, i) => (
                <StarFilled key={i} />
              ))}
            </div>
            <p style={{ fontSize: '18px', color: '#475569', lineHeight: '1.8', marginBottom: '24px', fontStyle: 'italic' }}>
              "{testimonials[testimonialIndex].text}"
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <div style={{
                width: '60px',
                height: '60px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #3B82F6, #2563EB)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#fff',
                fontSize: '24px',
                fontWeight: 700
              }}>
                {testimonials[testimonialIndex].name.charAt(0)}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: '18px', fontWeight: 700, color: '#0F172A', marginBottom: '4px' }}>
                  {testimonials[testimonialIndex].name}
                </div>
                <div style={{ fontSize: '14px', color: '#64748B' }}>
                  {testimonials[testimonialIndex].location}
                </div>
              </div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginTop: '30px' }}>
              {testimonials.map((_, index) => (
                <div key={index} onClick={() => setTestimonialIndex(index)} style={{
                  width: index === testimonialIndex ? '30px' : '10px',
                  height: '10px',
                  borderRadius: index === testimonialIndex ? '5px' : '50%',
                  background: index === testimonialIndex ? '#3B82F6' : '#CBD5E1',
                  cursor: 'pointer',
                  transition: 'all 0.3s'
                }} />
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="about" style={{ padding: '100px 24px', background: '#FFF' }}>
        <div style={{ maxWidth: '1320px', margin: '0 auto' }}>
          <div className="about-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '80px', alignItems: 'center' }}>
            <div style={{ position: 'relative' }}>
              <img src="https://images.unsplash.com/photo-1581244277943-fe4a9c777189?w=800&h=600&fit=crop&q=80"
                alt="Our team" style={{ width: '100%', borderRadius: '24px', boxShadow: '0 20px 60px rgba(0,0,0,0.12)' }} />
              <div style={{
                position: 'absolute',
                top: '30px',
                right: '30px',
                background: 'linear-gradient(135deg, #3B82F6, #2563EB)',
                padding: '20px 28px',
                borderRadius: '16px',
                color: '#fff',
                boxShadow: '0 10px 30px rgba(59,130,246,0.4)'
              }}>
                <div style={{ fontSize: '36px', fontWeight: 800, marginBottom: '4px' }}>14+</div>
                <div style={{ fontSize: '14px', opacity: 0.9 }}>Years Experience</div>
              </div>
            </div>

            <div>
              <div style={{
                display: 'inline-block',
                background: '#EFF6FF',
                color: '#3B82F6',
                padding: '8px 20px',
                borderRadius: '50px',
                fontSize: '14px',
                fontWeight: 600,
                marginBottom: '20px'
              }}>About Us</div>

              <h2 className="section-title" style={{
                fontSize: '44px',
                fontWeight: 800,
                marginBottom: '24px',
                color: '#0F172A',
                letterSpacing: '-1px'
              }}>Your Trusted Plumbing Partner</h2>

              <p style={{ color: '#64748B', fontSize: '17px', lineHeight: '1.8', marginBottom: '32px' }}>
                Since 2010, FlowPro has been the leading plumbing service provider in California. 
                Our team of certified professionals delivers exceptional service with a commitment 
                to quality and customer satisfaction.
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginBottom: '40px' }}>
                {[
                  { icon: <SafetyOutlined />, title: 'Licensed & Insured', text: 'Fully certified and insured for your peace of mind' },
                  { icon: <ToolOutlined />, title: 'Expert Technicians', text: 'Highly trained professionals with years of experience' },
                  { icon: <ClockCircleOutlined />, title: 'Fast Response', text: 'Quick turnaround for all emergency situations' }
                ].map((item, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '16px' }}>
                    <div style={{
                      width: '48px',
                      height: '48px',
                      background: 'linear-gradient(135deg, #EFF6FF, #DBEAFE)',
                      borderRadius: '12px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '20px',
                      color: '#3B82F6',
                      flexShrink: 0
                    }}>
                      {item.icon}
                    </div>
                    <div>
                      <div style={{ fontSize: '18px', fontWeight: 700, color: '#0F172A', marginBottom: '4px' }}>
                        {item.title}
                      </div>
                      <div style={{ color: '#64748B', fontSize: '15px', lineHeight: '1.6' }}>
                        {item.text}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <button className="btn-primary" style={{
                background: 'linear-gradient(135deg, #3B82F6, #2563EB)',
                border: 'none',
                padding: '16px 32px',
                borderRadius: '12px',
                fontWeight: 600,
                fontSize: '16px',
                color: '#fff',
                cursor: 'pointer',
                boxShadow: '0 4px 14px rgba(59,130,246,0.4)',
                transition: 'all 0.3s',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px'
              }} onClick={() => setShowBooking(true)}>
                Get Started <ArrowRightOutlined />
              </button>
            </div>
          </div>
        </div>
      </section>

      <section style={{ padding: '100px 24px', background: 'linear-gradient(135deg, #3B82F6, #2563EB)', color: '#FFF' }}>
        <div style={{ maxWidth: '1320px', margin: '0 auto' }}>
          <div className="cta-grid" style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '60px', alignItems: 'center' }}>
            <div>
              <h2 className="cta-title" style={{ fontSize: '44px', fontWeight: 800, marginBottom: '20px', letterSpacing: '-1px' }}>
                Need Emergency Plumbing Service?
              </h2>
              <p style={{ fontSize: '18px', opacity: 0.9, lineHeight: '1.8', marginBottom: '32px' }}>
                Our expert team is available 24/7 to handle all your plumbing emergencies. 
                Fast response, professional service, and competitive pricing guaranteed.
              </p>
              <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
                <button className="cta-phone" style={{
                  background: '#fff',
                  border: '2px solid rgba(255,255,255,0.3)',
                  color: '#3B82F6',
                  padding: '16px 32px',
                  borderRadius: '12px',
                  fontWeight: 700,
                  fontSize: '18px',
                  cursor: 'pointer',
                  transition: 'all 0.3s',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '10px'
                }}>
                  <PhoneOutlined /> Call (234) 231-2123
                </button>
                <button style={{
                  background: 'rgba(255,255,255,0.15)',
                  border: '2px solid rgba(255,255,255,0.3)',
                  color: '#fff',
                  padding: '14px 32px',
                  borderRadius: '12px',
                  fontWeight: 600,
                  fontSize: '16px',
                  cursor: 'pointer',
                  transition: 'all 0.3s',
                  backdropFilter: 'blur(10px)'
                }} onClick={() => setShowBooking(true)}>
                  Schedule Online
                </button>
              </div>
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '24px'
            }}>
              {[
                { icon: '⚡', title: 'Fast Response', text: '30 min arrival' },
                { icon: '💯', title: 'Satisfaction', text: '100% guaranteed' },
                { icon: '🔧', title: 'Expert Team', text: 'Certified pros' },
                { icon: '💰', title: 'Fair Pricing', text: 'No hidden fees' }
              ].map((item, i) => (
                <div key={i} style={{
                  background: 'rgba(255,255,255,0.15)',
                  backdropFilter: 'blur(10px)',
                  padding: '24px',
                  borderRadius: '16px',
                  border: '1px solid rgba(255,255,255,0.2)',
                  textAlign: 'center'
                }}>
                  <div style={{ fontSize: '32px', marginBottom: '12px' }}>{item.icon}</div>
                  <div style={{ fontSize: '16px', fontWeight: 700, marginBottom: '4px' }}>{item.title}</div>
                  <div style={{ fontSize: '13px', opacity: 0.8 }}>{item.text}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section style={{ padding: '100px 24px', background: '#F8FAFC' }}>
        <div style={{ maxWidth: '700px', margin: '0 auto', textAlign: 'center' }}>
          <div style={{
            display: 'inline-block',
            background: '#EFF6FF',
            color: '#3B82F6',
            padding: '8px 20px',
            borderRadius: '50px',
            fontSize: '14px',
            fontWeight: 600,
            marginBottom: '20px'
          }}>Newsletter</div>

          <h2 className="section-title" style={{
            fontSize: '44px',
            fontWeight: 800,
            marginBottom: '20px',
            color: '#0F172A',
            letterSpacing: '-1px'
          }}>Stay Updated</h2>

          <p style={{ color: '#64748B', fontSize: '17px', lineHeight: '1.7', marginBottom: '40px' }}>
            Subscribe to get plumbing tips, special offers, and maintenance reminders delivered to your inbox.
          </p>

          <form onSubmit={handleNewsletterSubmit} className="newsletter-form" style={{
            display: 'flex',
            gap: '12px',
            maxWidth: '500px',
            margin: '0 auto'
          }}>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              style={{
                flex: 1,
                padding: '16px 20px',
                borderRadius: '12px',
                border: '2px solid #E2E8F0',
                fontSize: '15px',
                fontWeight: 500,
                transition: 'all 0.2s'
              }}
            />
            <button type="submit" className="newsletter-button" style={{
              background: 'linear-gradient(135deg, #3B82F6, #2563EB)',
              border: 'none',
              padding: '16px 32px',
              borderRadius: '12px',
              fontWeight: 600,
              fontSize: '15px',
              color: '#fff',
              cursor: 'pointer',
              boxShadow: '0 4px 14px rgba(59,130,246,0.4)',
              transition: 'all 0.3s',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              whiteSpace: 'nowrap'
            }}>
              Subscribe <MailOutlined />
            </button>
          </form>
        </div>
      </section>

      <footer style={{ background: '#0F172A', color: '#fff', padding: '80px 24px 30px' }}>
        <div style={{ maxWidth: '1320px', margin: '0 auto' }}>
          <div className="footer-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '50px', marginBottom: '60px' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
                <div style={{
                  width: '42px',
                  height: '42px',
                  background: 'linear-gradient(135deg, #3B82F6, #2563EB)',
                  borderRadius: '10px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '20px'
                }}>💧</div>
                <span style={{ fontSize: '22px', fontWeight: 800, letterSpacing: '-0.5px' }}>
                  Flow<span style={{ color: '#3B82F6' }}>Pro</span>
                </span>
              </div>
              <p style={{ color: '#94A3B8', fontSize: '15px', lineHeight: '1.7', marginBottom: '24px' }}>
                Your trusted plumbing partner since 2010. Professional service, guaranteed satisfaction.
              </p>
              <div style={{ display: 'flex', gap: '12px' }}>
                {[<FacebookFilled />, <TwitterOutlined />, <InstagramFilled />, <LinkedinFilled />, <YoutubeFilled />].map((icon, i) => (
                  <div key={i} className="social-icon" style={{
                    width: '40px',
                    height: '40px',
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: '10px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '18px',
                    cursor: 'pointer',
                    transition: 'all 0.3s',
                    color: '#94A3B8'
                  }}>
                    {icon}
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 style={{ fontSize: '16px', fontWeight: 700, marginBottom: '20px', color: '#fff' }}>Quick Links</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {['Home', 'Services', 'About Us', 'Contact'].map((link) => (
                  <a key={link} className="footer-link" style={{
                    color: '#94A3B8',
                    textDecoration: 'none',
                    fontSize: '15px',
                    transition: 'color 0.2s',
                    cursor: 'pointer'
                  }}>
                    {link}
                  </a>
                ))}
              </div>
            </div>

            <div>
              <h3 style={{ fontSize: '16px', fontWeight: 700, marginBottom: '20px', color: '#fff' }}>Services</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {['Emergency Repairs', 'Drain Cleaning', 'Water Heaters', 'Bathroom Remodeling'].map((service) => (
                  <a key={service} className="footer-link" style={{
                    color: '#94A3B8',
                    textDecoration: 'none',
                    fontSize: '15px',
                    transition: 'color 0.2s',
                    cursor: 'pointer'
                  }}>
                    {service}
                  </a>
                ))}
              </div>
            </div>

            <div>
              <h3 style={{ fontSize: '16px', fontWeight: 700, marginBottom: '20px', color: '#fff' }}>Contact Info</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                  <PhoneOutlined style={{ color: '#3B82F6', fontSize: '18px', marginTop: '2px' }} />
                  <div>
                    <div style={{ color: '#fff', fontWeight: 600, marginBottom: '2px' }}>(234) 231-2123</div>
                    <div style={{ color: '#94A3B8', fontSize: '13px' }}>24/7 Support</div>
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                  <MailOutlined style={{ color: '#3B82F6', fontSize: '18px', marginTop: '2px' }} />
                  <div>
                    <div style={{ color: '#fff', fontWeight: 600, marginBottom: '2px' }}>info@flowpro.com</div>
                    <div style={{ color: '#94A3B8', fontSize: '13px' }}>Email Us</div>
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                  <EnvironmentOutlined style={{ color: '#3B82F6', fontSize: '18px', marginTop: '2px' }} />
                  <div>
                    <div style={{ color: '#fff', fontWeight: 600, marginBottom: '2px' }}>Los Angeles, CA</div>
                    <div style={{ color: '#94A3B8', fontSize: '13px' }}>Serving All California</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div style={{
            borderTop: '1px solid rgba(255,255,255,0.1)',
            paddingTop: '30px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '20px'
          }}>
            <p style={{ color: '#94A3B8', fontSize: '14px', margin: 0 }}>
              © 2024 FlowPro Plumbing. All rights reserved.
            </p>
            <div style={{ display: 'flex', gap: '24px' }}>
              {['Privacy Policy', 'Terms of Service', 'Cookie Policy'].map((link) => (
                <a key={link} style={{
                  color: '#94A3B8',
                  textDecoration: 'none',
                  fontSize: '14px',
                  cursor: 'pointer'
                }}>
                  {link}
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>

      <div className="floating-button" onClick={() => setShowBooking(true)} style={{
        position: 'fixed',
        bottom: '30px',
        right: '30px',
        width: '65px',
        height: '65px',
        background: 'linear-gradient(135deg, #3B82F6, #2563EB)',
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '28px',
        color: '#fff',
        cursor: 'pointer',
        boxShadow: '0 8px 24px rgba(59,130,246,0.4)',
        zIndex: 999,
        transition: 'all 0.3s'
      }}>
        <PhoneOutlined />
      </div>

      {showBooking && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0,0,0,0.6)',
          backdropFilter: 'blur(4px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 2000,
          padding: '20px'
        }} onClick={() => setShowBooking(false)}>
          <div style={{
            background: '#fff',
            borderRadius: '24px',
            maxWidth: '600px',
            width: '100%',
            maxHeight: '90vh',
            overflow: 'auto',
            position: 'relative'
          }} onClick={(e) => e.stopPropagation()}>
            <div style={{
              background: 'linear-gradient(135deg, #3B82F6, #2563EB)',
              padding: '32px',
              borderRadius: '24px 24px 0 0',
              position: 'relative'
            }}>
              <button className="modal-close" onClick={() => setShowBooking(false)} style={{
                position: 'absolute',
                top: '20px',
                right: '20px',
                width: '40px',
                height: '40px',
                border: 'none',
                borderRadius: '50%',
                background: 'rgba(255,255,255,0.2)',
                color: '#fff',
                cursor: 'pointer',
                fontSize: '20px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.2s'
              }}>
                <CloseOutlined />
              </button>
              <h2 style={{ fontSize: '32px', fontWeight: 800, color: '#fff', marginBottom: '8px' }}>
                Schedule Your Service
              </h2>
              <p style={{ color: 'rgba(255,255,255,0.9)', fontSize: '16px' }}>
                Fill out the form and we'll get back to you shortly
              </p>
            </div>

            <form onSubmit={handleFormSubmit} style={{ padding: '32px' }}>
              <div style={{ marginBottom: '24px' }}>
                <label style={{ display: 'block', fontWeight: 600, color: '#0F172A', marginBottom: '8px', fontSize: '15px' }}>
                  Your Name *
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleFormChange('name', e.target.value)}
                  placeholder="John Doe"
                  style={{
                    width: '100%',
                    padding: '14px 16px',
                    borderRadius: '12px',
                    border: '2px solid #E2E8F0',
                    fontSize: '15px',
                    transition: 'all 0.2s'
                  }}
                  required
                />
              </div>

              <div style={{ marginBottom: '24px' }}>
                <label style={{ display: 'block', fontWeight: 600, color: '#0F172A', marginBottom: '8px', fontSize: '15px' }}>
                  Phone Number *
                </label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => handleFormChange('phone', e.target.value)}
                  placeholder="(555) 123-4567"
                  style={{
                    width: '100%',
                    padding: '14px 16px',
                    borderRadius: '12px',
                    border: '2px solid #E2E8F0',
                    fontSize: '15px',
                    transition: 'all 0.2s'
                  }}
                  required
                />
              </div>

              <div style={{ marginBottom: '24px' }}>
                <label style={{ display: 'block', fontWeight: 600, color: '#0F172A', marginBottom: '8px', fontSize: '15px' }}>
                  Service Needed *
                </label>
                <select
                  value={formData.service}
                  onChange={(e) => handleFormChange('service', e.target.value)}
                  style={{
                    width: '100%',
                    padding: '14px 16px',
                    borderRadius: '12px',
                    border: '2px solid #E2E8F0',
                    fontSize: '15px',
                    transition: 'all 0.2s',
                    cursor: 'pointer'
                  }}
                  required
                >
                  <option value="">Select a service</option>
                  {services.map(service => (
                    <option key={service.id} value={service.title}>{service.title}</option>
                  ))}
                </select>
              </div>

              <div style={{ marginBottom: '24px' }}>
                <label style={{ display: 'block', fontWeight: 600, color: '#0F172A', marginBottom: '8px', fontSize: '15px' }}>
                  Preferred Date
                </label>
                <input
                  type="date"
                  value={formData.date}
                  onChange={(e) => handleFormChange('date', e.target.value)}
                  style={{
                    width: '100%',
                    padding: '14px 16px',
                    borderRadius: '12px',
                    border: '2px solid #E2E8F0',
                    fontSize: '15px',
                    transition: 'all 0.2s',
                    cursor: 'pointer'
                  }}
                />
              </div>

              <div style={{ marginBottom: '28px' }}>
                <label style={{ display: 'block', fontWeight: 600, color: '#0F172A', marginBottom: '8px', fontSize: '15px' }}>
                  Additional Details
                </label>
                <textarea
                  value={formData.message}
                  onChange={(e) => handleFormChange('message', e.target.value)}
                  placeholder="Describe the issue or service needed..."
                  rows={4}
                  style={{
                    width: '100%',
                    padding: '14px 16px',
                    borderRadius: '12px',
                    border: '2px solid #E2E8F0',
                    fontSize: '15px',
                    resize: 'vertical',
                    fontFamily: 'inherit',
                    transition: 'all 0.2s'
                  }}
                />
              </div>

              <button type="submit" className="submit-btn" style={{
                width: '100%',
                background: 'linear-gradient(135deg, #3B82F6, #2563EB)',
                border: 'none',
                padding: '16px',
                borderRadius: '12px',
                fontWeight: 700,
                fontSize: '16px',
                color: '#fff',
                cursor: 'pointer',
                boxShadow: '0 4px 14px rgba(59,130,246,0.4)',
                transition: 'all 0.3s',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px'
              }}>
                Submit Request <ArrowRightOutlined />
              </button>
            </form>
          </div>
        </div>
      )}

      {selectedService && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0,0,0,0.6)',
          backdropFilter: 'blur(4px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 2000,
          padding: '20px'
        }} onClick={() => setSelectedService(null)}>
          <div style={{
            background: '#fff',
            borderRadius: '24px',
            maxWidth: '700px',
            width: '100%',
            maxHeight: '90vh',
            overflow: 'auto'
          }} onClick={(e) => e.stopPropagation()}>
            <div style={{ position: 'relative', width: '100%', height: '300px', overflow: 'hidden' }}>
              <img src={selectedService.image} alt={selectedService.title} style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover'
              }} />
              <button className="modal-close" onClick={() => setSelectedService(null)} style={{
                position: 'absolute',
                top: '20px',
                right: '20px',
                width: '40px',
                height: '40px',
                border: 'none',
                borderRadius: '50%',
                background: 'rgba(255,255,255,0.95)',
                color: '#0F172A',
                cursor: 'pointer',
                fontSize: '20px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                transition: 'all 0.2s'
              }}>
                <CloseOutlined />
              </button>
              <div style={{
                position: 'absolute',
                bottom: '20px',
                left: '20px',
                width: '64px',
                height: '64px',
                background: 'rgba(255,255,255,0.95)',
                backdropFilter: 'blur(10px)',
                borderRadius: '16px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '32px',
                boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
              }}>{selectedService.icon}</div>
            </div>

            <div style={{ padding: '40px' }}>
              <div style={{
                display: 'inline-block',
                background: '#EFF6FF',
                color: '#3B82F6',
                padding: '8px 16px',
                borderRadius: '50px',
                fontSize: '13px',
                fontWeight: 600,
                marginBottom: '16px'
              }}>{selectedService.price}</div>

              <h2 style={{ fontSize: '36px', fontWeight: 800, color: '#0F172A', marginBottom: '16px', letterSpacing: '-1px' }}>
                {selectedService.title}
              </h2>

              <p style={{ color: '#64748B', fontSize: '17px', lineHeight: '1.8', marginBottom: '32px' }}>
                {selectedService.description}
              </p>

              <div style={{ marginBottom: '32px' }}>
                <h3 style={{ fontSize: '20px', fontWeight: 700, color: '#0F172A', marginBottom: '16px' }}>
                  What's Included:
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {selectedService.features.map((feature, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <CheckCircleFilled style={{ color: '#10B981', fontSize: '20px' }} />
                      <span style={{ color: '#475569', fontSize: '16px' }}>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              <button className="btn-primary" style={{
                width: '100%',
                background: 'linear-gradient(135deg, #3B82F6, #2563EB)',
                border: 'none',
                padding: '16px',
                borderRadius: '12px',
                fontWeight: 700,
                fontSize: '16px',
                color: '#fff',
                cursor: 'pointer',
                boxShadow: '0 4px 14px rgba(59,130,246,0.4)',
                transition: 'all 0.3s',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px'
              }} onClick={() => {
                setSelectedService(null);
                setShowBooking(true);
                handleFormChange('service', selectedService.title);
              }}>
                Book This Service <ArrowRightOutlined />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PlumbingWebsite;