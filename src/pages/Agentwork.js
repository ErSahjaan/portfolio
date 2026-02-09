import React, { useState } from 'react';
import { Bell, Briefcase, User, Settings, CheckCircle, Clock, FileText, Mail, MessageSquare, TrendingUp, Search, Filter, Calendar, Award, Target, Zap, MapPin, DollarSign, Users, Building, AlertCircle, Download, Eye, Edit, Trash2, ChevronDown, Star, BookmarkPlus, Share2, ArrowUpRight, X, ExternalLink, Phone, Globe, CheckCircle2, XCircle, AlertTriangle, Loader, Sparkles, TrendingDown } from 'lucide-react';

export default function JobMatchingUI() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [profileComplete, setProfileComplete] = useState(75);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedSort, setSelectedSort] = useState('match');
  const [savedJobs, setSavedJobs] = useState([2, 4, 7]);
  const [selectedJob, setSelectedJob] = useState(null);
  const [showJobModal, setShowJobModal] = useState(false);

  const allJobs = [
    {
      id: 1,
      title: "SSC CGL 2024",
      org: "Staff Selection Commission",
      match: 95,
      deadline: "2024-02-15",
      postedDate: "2024-01-05",
      status: "new",
      salary: "₹44,900 - ₹1,42,400",
      openings: 17727,
      category: "Central Govt",
      location: "All India",
      type: "Permanent",
      ageLimit: "18-32 years",
      qualification: "Graduation",
      description: "Combined Graduate Level Examination for recruitment to various Group B and Group C posts in Ministries, Departments and Organizations of the Government of India.",
      eligibility: ["Graduation from recognized university", "Age between 18-32 years", "Indian Citizen"],
      selectionProcess: ["Tier-I (Computer Based)", "Tier-II (Computer Based)", "Tier-III (Descriptive Paper)", "Tier-IV (Skill Test)"],
      importantDates: {
        applicationStart: "2024-01-05",
        applicationEnd: "2024-02-15",
        examDate: "2024-03-20",
        resultDate: "2024-05-15"
      },
      applicationFee: "₹100 (General), Free for SC/ST/Female",
      website: "https://ssc.nic.in"
    },
    {
      id: 2,
      title: "Railway Group D",
      org: "Railway Recruitment Board",
      match: 88,
      deadline: "2024-02-20",
      postedDate: "2024-01-08",
      status: "trending",
      salary: "₹18,000 - ₹56,900",
      openings: 103769,
      category: "Railway",
      location: "All India",
      type: "Permanent",
      ageLimit: "18-33 years",
      qualification: "10th Pass",
      description: "Recruitment for Level 1 posts including Track Maintainer, Helper, Assistant Pointsman, and other Group D positions across Indian Railways.",
      eligibility: ["10th Pass or ITI", "Age between 18-33 years", "Medical fitness as per Railway standards"],
      selectionProcess: ["Computer Based Test (CBT)", "Physical Efficiency Test (PET)", "Document Verification", "Medical Examination"],
      importantDates: {
        applicationStart: "2024-01-08",
        applicationEnd: "2024-02-20",
        examDate: "2024-04-05",
        resultDate: "2024-06-20"
      },
      applicationFee: "₹500 (General), ₹250 for SC/ST/Female",
      website: "https://rrbcdg.gov.in"
    },
    {
      id: 3,
      title: "IBPS PO 2024",
      org: "Banking Personnel Selection",
      match: 82,
      deadline: "2024-02-10",
      postedDate: "2024-01-02",
      status: "hot",
      salary: "₹23,700 - ₹42,020",
      openings: 3955,
      category: "Banking",
      location: "All India",
      type: "Permanent",
      ageLimit: "20-30 years",
      qualification: "Graduation",
      description: "Probationary Officer/Management Trainee recruitment for various Public Sector Banks in India through IBPS common examination.",
      eligibility: ["Graduation in any discipline with minimum 60%", "Age 20-30 years", "Computer literacy certificate"],
      selectionProcess: ["Preliminary Exam", "Main Exam", "Interview"],
      importantDates: {
        applicationStart: "2024-01-02",
        applicationEnd: "2024-02-10",
        examDate: "2024-03-15",
        resultDate: "2024-05-30"
      },
      applicationFee: "₹850 (General/OBC), ₹175 for SC/ST/PWD",
      website: "https://ibps.in"
    },
    {
      id: 4,
      title: "UPSC Civil Services 2024",
      org: "Union Public Service Commission",
      match: 92,
      deadline: "2024-03-01",
      postedDate: "2024-01-10",
      status: "new",
      salary: "₹56,100 - ₹2,50,000",
      openings: 1070,
      category: "UPSC",
      location: "All India",
      type: "Permanent",
      ageLimit: "21-32 years",
      qualification: "Graduation",
      description: "Civil Services Examination for recruitment to IAS, IPS, IFS and other Central Services Group A and Group B positions.",
      eligibility: ["Graduation from recognized university", "Age 21-32 years (relaxation for reserved categories)", "Indian Citizen"],
      selectionProcess: ["Preliminary Examination", "Main Examination", "Personality Test (Interview)"],
      importantDates: {
        applicationStart: "2024-01-10",
        applicationEnd: "2024-03-01",
        examDate: "2024-05-26",
        resultDate: "2024-12-15"
      },
      applicationFee: "₹100 (General/OBC), Free for Female/SC/ST/PwD",
      website: "https://upsc.gov.in"
    },
    {
      id: 5,
      title: "Bihar Police Constable",
      org: "Bihar Police Department",
      match: 78,
      deadline: "2024-02-25",
      postedDate: "2024-01-12",
      status: "trending",
      salary: "₹21,700 - ₹69,100",
      openings: 21391,
      category: "State Govt",
      location: "Bihar",
      type: "Permanent",
      ageLimit: "18-25 years",
      qualification: "12th Pass",
      description: "Recruitment of Constables in Bihar Police for maintaining law and order and crime prevention in the state.",
      eligibility: ["12th Pass from recognized board", "Age 18-25 years", "Physical standards as prescribed"],
      selectionProcess: ["Physical Efficiency Test", "Written Exam", "Medical Examination"],
      importantDates: {
        applicationStart: "2024-01-12",
        applicationEnd: "2024-02-25",
        examDate: "2024-04-10",
        resultDate: "2024-07-01"
      },
      applicationFee: "₹450 (General), ₹112 for SC/ST",
      website: "https://csbc.bih.nic.in"
    },
    {
      id: 6,
      title: "SBI Clerk 2024",
      org: "State Bank of India",
      match: 85,
      deadline: "2024-02-18",
      postedDate: "2024-01-06",
      status: "hot",
      salary: "₹19,900 - ₹46,920",
      openings: 8773,
      category: "Banking",
      location: "All India",
      type: "Permanent",
      ageLimit: "20-28 years",
      qualification: "Graduation",
      description: "Junior Associate (Customer Support & Sales) recruitment for SBI branches across India.",
      eligibility: ["Graduation in any discipline", "Age 20-28 years", "Local language proficiency"],
      selectionProcess: ["Preliminary Exam", "Main Exam", "Language Proficiency Test"],
      importantDates: {
        applicationStart: "2024-01-06",
        applicationEnd: "2024-02-18",
        examDate: "2024-03-25",
        resultDate: "2024-06-10"
      },
      applicationFee: "₹750 (General/OBC), ₹125 for SC/ST/PwD",
      website: "https://sbi.co.in/careers"
    },
    {
      id: 7,
      title: "Indian Army Agniveer",
      org: "Indian Army",
      match: 80,
      deadline: "2024-02-28",
      postedDate: "2024-01-15",
      status: "new",
      salary: "₹21,000 - ₹40,000",
      openings: 40000,
      category: "Defence",
      location: "All India",
      type: "Contractual (4 years)",
      ageLimit: "17.5-23 years",
      qualification: "10th/12th Pass",
      description: "Agniveer recruitment scheme for enrollment in Indian Army for a duration of 4 years with option for permanent enrollment.",
      eligibility: ["10th/12th Pass as per trade", "Age 17.5-23 years", "Physical and medical standards as per Army"],
      selectionProcess: ["Physical Fitness Test", "Physical Measurement Test", "Medical Examination", "Written Test"],
      importantDates: {
        applicationStart: "2024-01-15",
        applicationEnd: "2024-02-28",
        examDate: "2024-04-15",
        resultDate: "2024-08-01"
      },
      applicationFee: "No Fee",
      website: "https://joinindianarmy.nic.in"
    },
    {
      id: 8,
      title: "RBI Grade B Officer",
      org: "Reserve Bank of India",
      match: 90,
      deadline: "2024-02-22",
      postedDate: "2024-01-09",
      status: "hot",
      salary: "₹67,000 - ₹1,20,000",
      openings: 322,
      category: "Banking",
      location: "All India",
      type: "Permanent",
      ageLimit: "21-30 years",
      qualification: "Post Graduation",
      description: "Grade B Officers recruitment for General, DEPR, and DSIM streams in Reserve Bank of India.",
      eligibility: ["Post Graduation with minimum 55%", "Age 21-30 years", "Work experience preferred"],
      selectionProcess: ["Phase-I Exam", "Phase-II Exam", "Interview"],
      importantDates: {
        applicationStart: "2024-01-09",
        applicationEnd: "2024-02-22",
        examDate: "2024-04-01",
        resultDate: "2024-07-15"
      },
      applicationFee: "₹850 (General/OBC), ₹150 for SC/ST/PwD",
      website: "https://rbi.org.in"
    }
  ];

  const applications = [
    {
      id: 1,
      jobId: 1,
      jobTitle: "SSC CGL 2024",
      org: "Staff Selection Commission",
      appliedDate: "2024-01-15",
      status: "under_review",
      applicationId: "SSC2024CGL123456",
      examDate: "2024-03-20",
      admitCard: true,
      admitCardDate: "2024-03-05",
      documentsSubmitted: 5,
      totalDocuments: 5,
      lastUpdate: "2 days ago",
      category: "Central Govt",
      fee: "₹100",
      paymentStatus: "Completed"
    },
    {
      id: 2,
      jobId: 3,
      jobTitle: "IBPS PO 2024",
      org: "Banking Personnel Selection",
      appliedDate: "2024-01-10",
      status: "accepted",
      applicationId: "IBPS2024PO789012",
      examDate: "2024-03-15",
      admitCard: true,
      admitCardDate: "2024-03-01",
      documentsSubmitted: 6,
      totalDocuments: 6,
      lastUpdate: "1 week ago",
      category: "Banking",
      fee: "₹850",
      paymentStatus: "Completed"
    },
    {
      id: 3,
      jobId: 4,
      jobTitle: "UPSC Civil Services 2024",
      org: "Union Public Service Commission",
      appliedDate: "2024-01-20",
      status: "pending",
      applicationId: "UPSC2024CSE345678",
      examDate: "2024-05-26",
      admitCard: false,
      admitCardDate: null,
      documentsSubmitted: 3,
      totalDocuments: 5,
      lastUpdate: "5 days ago",
      category: "UPSC",
      fee: "₹100",
      paymentStatus: "Pending"
    },
    {
      id: 4,
      jobId: 6,
      jobTitle: "SBI Clerk 2024",
      org: "State Bank of India",
      appliedDate: "2024-01-12",
      status: "accepted",
      applicationId: "SBI2024CLK901234",
      examDate: "2024-03-25",
      admitCard: true,
      admitCardDate: "2024-03-10",
      documentsSubmitted: 4,
      totalDocuments: 4,
      lastUpdate: "3 days ago",
      category: "Banking",
      fee: "₹750",
      paymentStatus: "Completed"
    },
    {
      id: 5,
      jobId: 2,
      jobTitle: "Railway Group D",
      org: "Railway Recruitment Board",
      appliedDate: "2024-01-18",
      status: "rejected",
      applicationId: "RRB2024GD567890",
      examDate: null,
      admitCard: false,
      admitCardDate: null,
      documentsSubmitted: 5,
      totalDocuments: 5,
      lastUpdate: "1 day ago",
      category: "Railway",
      fee: "₹500",
      paymentStatus: "Refund Initiated",
      rejectionReason: "Age limit exceeded"
    }
  ];

  const notifications = [
    { type: "success", text: "New job match: SSC CGL 2024 (95% match)", time: "2 hours ago" },
    { type: "warning", text: "Application deadline approaching: Railway Group D", time: "5 hours ago" },
    { type: "info", text: "Your profile is 75% complete. Complete now for better matches!", time: "1 day ago" }
  ];

  const stats = [
    { label: 'New Matches', value: '12', icon: TrendingUp, color: '#6366f1', bgGradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' },
    { label: 'Applications', value: applications.length.toString(), icon: FileText, color: '#10b981', bgGradient: 'linear-gradient(135deg, #84fab0 0%, #8fd3f4 100%)' },
    { label: 'Profile Score', value: `${profileComplete}%`, icon: Award, color: '#f59e0b', bgGradient: 'linear-gradient(135deg, #ffa751 0%, #ffe259 100%)' },
    { label: 'Saved Jobs', value: savedJobs.length.toString(), icon: BookmarkPlus, color: '#ef4444', bgGradient: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)' }
  ];

  const categories = ['all', 'Central Govt', 'State Govt', 'Banking', 'Railway', 'Defence', 'PSU', 'UPSC'];

  const toggleSaveJob = (jobId) => {
    setSavedJobs(prev => 
      prev.includes(jobId) ? prev.filter(id => id !== jobId) : [...prev, jobId]
    );
  };

  const openJobDetails = (job) => {
    setSelectedJob(job);
    setShowJobModal(true);
  };

  const filteredJobs = allJobs.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          job.org.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || job.category === selectedCategory;
    return matchesSearch && matchesCategory;
  }).sort((a, b) => {
    if (selectedSort === 'match') return b.match - a.match;
    if (selectedSort === 'deadline') return new Date(a.deadline) - new Date(b.deadline);
    if (selectedSort === 'openings') return b.openings - a.openings;
    if (selectedSort === 'latest') return new Date(b.postedDate) - new Date(a.postedDate);
    return 0;
  });

  const getStatusColor = (status) => {
    switch(status) {
      case 'accepted': return { bg: 'linear-gradient(135deg, #10b981 0%, #059669 100%)', text: 'white' };
      case 'under_review': return { bg: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)', text: 'white' };
      case 'pending': return { bg: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)', text: 'white' };
      case 'rejected': return { bg: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)', text: 'white' };
      default: return { bg: 'linear-gradient(135deg, #6b7280 0%, #4b5563 100%)', text: 'white' };
    }
  };

  const getStatusIcon = (status) => {
    switch(status) {
      case 'accepted': return <CheckCircle2 style={{ width: '18px', height: '18px' }} />;
      case 'under_review': return <Loader style={{ width: '18px', height: '18px' }} />;
      case 'pending': return <AlertTriangle style={{ width: '18px', height: '18px' }} />;
      case 'rejected': return <XCircle style={{ width: '18px', height: '18px' }} />;
      default: return <Clock style={{ width: '18px', height: '18px' }} />;
    }
  };

  const getStatusText = (status) => {
    switch(status) {
      case 'accepted': return 'Accepted';
      case 'under_review': return 'Under Review';
      case 'pending': return 'Pending';
      case 'rejected': return 'Rejected';
      default: return status;
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif'
    }}>
      {/* Header */}
      <header style={{
        background: 'rgba(255, 255, 255, 0.95)',
        backdropFilter: 'blur(10px)',
        boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.3)',
        position: 'sticky',
        top: 0,
        zIndex: 1000
      }}>
        <div style={{
          maxWidth: '1400px',
          margin: '0 auto',
          padding: '20px 24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{
              width: '48px',
              height: '48px',
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              borderRadius: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 8px 16px rgba(102, 126, 234, 0.3)'
            }}>
              <Briefcase style={{ width: '28px', height: '28px', color: '#ffffff' }} />
            </div>
            <div>
              <h1 style={{
                fontSize: '28px',
                fontWeight: '800',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                margin: 0,
                letterSpacing: '-0.5px'
              }}>JobMatch AI</h1>
              <p style={{ fontSize: '12px', color: '#6b7280', margin: 0 }}>Smart Career Assistant</p>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            <div style={{ position: 'relative', cursor: 'pointer' }}>
              <div style={{
                width: '44px',
                height: '44px',
                background: 'linear-gradient(135deg, #f3f4f6 0%, #e5e7eb 100%)',
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.3s ease'
              }}>
                <Bell style={{ width: '20px', height: '20px', color: '#6b7280' }} />
              </div>
              <span style={{
                position: 'absolute',
                top: '-4px',
                right: '-4px',
                background: 'linear-gradient(135deg, #f43f5e 0%, #dc2626 100%)',
                color: 'white',
                fontSize: '11px',
                fontWeight: '700',
                borderRadius: '10px',
                width: '22px',
                height: '22px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: '2px solid white',
                boxShadow: '0 2px 8px rgba(244, 63, 94, 0.4)'
              }}>3</span>
            </div>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              cursor: 'pointer',
              padding: '8px 16px',
              background: 'linear-gradient(135deg, #f9fafb 0%, #f3f4f6 100%)',
              borderRadius: '12px',
              transition: 'all 0.3s ease'
            }}>
              <div style={{
                width: '40px',
                height: '40px',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                borderRadius: '10px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 4px 12px rgba(102, 126, 234, 0.3)'
              }}>
                <User style={{ width: '22px', height: '22px', color: 'white' }} />
              </div>
              <div>
                <span style={{ fontSize: '14px', fontWeight: '600', color: '#1f2937', display: 'block' }}>Rahul Kumar</span>
                <span style={{ fontSize: '12px', color: '#6b7280' }}>Premium</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav style={{
        background: 'rgba(255, 255, 255, 0.9)',
        backdropFilter: 'blur(10px)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.3)',
        position: 'sticky',
        top: '88px',
        zIndex: 999
      }}>
        <div style={{
          maxWidth: '1400px',
          margin: '0 auto',
          padding: '0 24px',
          display: 'flex',
          gap: '8px'
        }}>
          {[
            { key: 'dashboard', label: 'Dashboard', icon: Target },
            { key: 'jobs', label: 'Jobs', icon: Briefcase },
            { key: 'applications', label: 'Applications', icon: FileText },
            { key: 'profile', label: 'Profile', icon: User }
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                style={{
                  padding: '16px 24px',
                  background: activeTab === tab.key ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' : 'transparent',
                  color: activeTab === tab.key ? 'white' : '#6b7280',
                  border: 'none',
                  borderRadius: '12px 12px 0 0',
                  fontWeight: '600',
                  fontSize: '14px',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  boxShadow: activeTab === tab.key ? '0 -4px 12px rgba(102, 126, 234, 0.2)' : 'none'
                }}
              >
                <Icon style={{ width: '18px', height: '18px' }} />
                {tab.label}
              </button>
            );
          })}
        </div>
      </nav>

      {/* Main Content */}
      <main style={{
        maxWidth: '1400px',
        margin: '0 auto',
        padding: '32px 24px',
        minHeight: 'calc(100vh - 176px)'
      }}>
        {/* DASHBOARD TAB */}
        {activeTab === 'dashboard' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            {/* Quick Stats */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
              gap: '20px'
            }}>
              {stats.map((stat, idx) => {
                const Icon = stat.icon;
                return (
                  <div key={idx} style={{
                    background: 'rgba(255, 255, 255, 0.95)',
                    backdropFilter: 'blur(10px)',
                    borderRadius: '20px',
                    padding: '28px',
                    boxShadow: '0 10px 40px rgba(0, 0, 0, 0.08)',
                    border: '1px solid rgba(255, 255, 255, 0.5)',
                    position: 'relative',
                    overflow: 'hidden',
                    transition: 'all 0.3s ease',
                    cursor: 'pointer'
                  }}>
                    <div style={{
                      position: 'absolute',
                      top: '-20px',
                      right: '-20px',
                      width: '120px',
                      height: '120px',
                      background: stat.bgGradient,
                      opacity: '0.1',
                      borderRadius: '50%'
                    }}></div>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'relative', zIndex: 1 }}>
                      <div>
                        <p style={{ fontSize: '13px', color: '#6b7280', margin: '0 0 8px 0', fontWeight: '500', textTransform: 'uppercase', letterSpacing: '0.5px' }}>{stat.label}</p>
                        <p style={{ fontSize: '40px', fontWeight: '800', color: '#1f2937', margin: 0, lineHeight: 1 }}>{stat.value}</p>
                      </div>
                      <div style={{
                        width: '64px',
                        height: '64px',
                        background: stat.bgGradient,
                        borderRadius: '16px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        boxShadow: `0 8px 20px ${stat.color}40`
                      }}>
                        <Icon style={{ width: '32px', height: '32px', color: 'white' }} />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Profile Completion Alert */}
            {profileComplete < 100 && (
              <div style={{
                background: 'linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)',
                borderLeft: '4px solid #f59e0b',
                padding: '20px 24px',
                borderRadius: '16px',
                boxShadow: '0 8px 20px rgba(245, 158, 11, 0.15)'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{
                      width: '40px',
                      height: '40px',
                      background: 'rgba(245, 158, 11, 0.2)',
                      borderRadius: '10px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      <Zap style={{ width: '20px', height: '20px', color: '#f59e0b' }} />
                    </div>
                    <div>
                      <p style={{ fontSize: '15px', fontWeight: '600', color: '#92400e', margin: 0 }}>
                        Boost Your Job Matches
                      </p>
                      <p style={{ fontSize: '13px', color: '#78350f', margin: '4px 0 0 0' }}>
                        Your profile is {profileComplete}% complete. Complete it for AI-powered recommendations!
                      </p>
                    </div>
                  </div>
                  <button 
                    onClick={() => setActiveTab('profile')}
                    style={{
                      background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
                      color: 'white',
                      padding: '12px 28px',
                      borderRadius: '12px',
                      fontWeight: '600',
                      fontSize: '14px',
                      border: 'none',
                      cursor: 'pointer',
                      boxShadow: '0 4px 12px rgba(245, 158, 11, 0.3)',
                      transition: 'all 0.3s ease'
                    }}
                  >
                    Complete Profile →
                  </button>
                </div>
              </div>
            )}

            {/* Recent Notifications */}
            <div style={{
              background: 'rgba(255, 255, 255, 0.95)',
              backdropFilter: 'blur(10px)',
              borderRadius: '20px',
              boxShadow: '0 10px 40px rgba(0, 0, 0, 0.08)',
              border: '1px solid rgba(255, 255, 255, 0.5)',
              overflow: 'hidden'
            }}>
              <div style={{
                padding: '24px 28px',
                borderBottom: '1px solid rgba(0, 0, 0, 0.05)',
                background: 'linear-gradient(135deg, #f9fafb 0%, #ffffff 100%)'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{
                      width: '40px',
                      height: '40px',
                      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                      borderRadius: '10px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      <Bell style={{ width: '20px', height: '20px', color: 'white' }} />
                    </div>
                    <h2 style={{ fontSize: '20px', fontWeight: '700', color: '#1f2937', margin: 0 }}>Recent Notifications</h2>
                  </div>
                  <button style={{
                    color: '#667eea',
                    background: 'transparent',
                    border: 'none',
                    fontWeight: '600',
                    fontSize: '14px',
                    cursor: 'pointer'
                  }}>Mark all as read</button>
                </div>
              </div>
              <div>
                {notifications.map((notif, idx) => (
                  <div key={idx} style={{
                    padding: '20px 28px',
                    borderBottom: idx < notifications.length - 1 ? '1px solid rgba(0, 0, 0, 0.05)' : 'none',
                    transition: 'all 0.2s ease',
                    cursor: 'pointer'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'start', gap: '16px' }}>
                      <div style={{
                        width: '10px',
                        height: '10px',
                        borderRadius: '50%',
                        marginTop: '6px',
                        background: notif.type === 'success' ? 'linear-gradient(135deg, #10b981 0%, #059669 100%)' :
                          notif.type === 'warning' ? 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)' :
                          'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
                        boxShadow: `0 0 0 4px ${notif.type === 'success' ? '#10b98120' :
                          notif.type === 'warning' ? '#f59e0b20' : '#3b82f620'}`
                      }}></div>
                      <div style={{ flex: 1 }}>
                        <p style={{ fontSize: '14px', color: '#1f2937', margin: '0 0 6px 0', fontWeight: '500', lineHeight: 1.5 }}>
                          {notif.text}
                        </p>
                        <p style={{ fontSize: '12px', color: '#9ca3af', margin: 0 }}>{notif.time}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Top Matches */}
            <div style={{
              background: 'rgba(255, 255, 255, 0.95)',
              backdropFilter: 'blur(10px)',
              borderRadius: '20px',
              boxShadow: '0 10px 40px rgba(0, 0, 0, 0.08)',
              border: '1px solid rgba(255, 255, 255, 0.5)',
              overflow: 'hidden'
            }}>
              <div style={{
                padding: '24px 28px',
                borderBottom: '1px solid rgba(0, 0, 0, 0.05)',
                background: 'linear-gradient(135deg, #f9fafb 0%, #ffffff 100%)'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{
                      width: '40px',
                      height: '40px',
                      background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                      borderRadius: '10px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      <Target style={{ width: '20px', height: '20px', color: 'white' }} />
                    </div>
                    <h2 style={{ fontSize: '20px', fontWeight: '700', color: '#1f2937', margin: 0 }}>Top AI Matches</h2>
                  </div>
                  <button 
                    onClick={() => setActiveTab('jobs')}
                    style={{
                      color: '#667eea',
                      background: 'transparent',
                      border: 'none',
                      fontWeight: '600',
                      fontSize: '14px',
                      cursor: 'pointer'
                    }}
                  >View All →</button>
                </div>
              </div>
              <div>
                {allJobs.slice(0, 3).map((job, idx) => (
                  <div key={job.id} style={{
                    padding: '28px',
                    borderBottom: idx < 2 ? '1px solid rgba(0, 0, 0, 0.05)' : 'none',
                    transition: 'all 0.2s ease'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'start', justifyContent: 'space-between', gap: '24px', flexWrap: 'wrap' }}>
                      <div style={{ flex: 1, minWidth: '300px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px', flexWrap: 'wrap' }}>
                          <h3 style={{ fontSize: '20px', fontWeight: '700', color: '#1f2937', margin: 0 }}>{job.title}</h3>
                          <span style={{
                            padding: '6px 14px',
                            borderRadius: '20px',
                            fontSize: '12px',
                            fontWeight: '700',
                            background: job.match >= 90 ? 'linear-gradient(135deg, #10b981 0%, #059669 100%)' :
                              job.match >= 80 ? 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)' :
                              'linear-gradient(135deg, #6b7280 0%, #4b5563 100%)',
                            color: 'white',
                            boxShadow: job.match >= 90 ? '0 4px 12px rgba(16, 185, 129, 0.3)' :
                              job.match >= 80 ? '0 4px 12px rgba(59, 130, 246, 0.3)' : '0 4px 12px rgba(107, 114, 128, 0.3)'
                          }}>
                            {job.match}% Match
                          </span>
                          {job.status === 'new' && (
                            <span style={{
                              padding: '4px 12px',
                              background: 'linear-gradient(135deg, #f43f5e 0%, #dc2626 100%)',
                              color: 'white',
                              fontSize: '11px',
                              fontWeight: '700',
                              borderRadius: '12px',
                              textTransform: 'uppercase',
                              letterSpacing: '0.5px'
                            }}>
                              NEW
                            </span>
                          )}
                          <span style={{
                            padding: '4px 12px',
                            background: 'rgba(102, 126, 234, 0.1)',
                            color: '#667eea',
                            fontSize: '11px',
                            fontWeight: '600',
                            borderRadius: '12px'
                          }}>
                            {job.category}
                          </span>
                        </div>
                        <p style={{ fontSize: '14px', color: '#6b7280', margin: '0 0 16px 0', fontWeight: '500' }}>
                          {job.org}
                        </p>
                        <div style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '20px',
                          flexWrap: 'wrap',
                          fontSize: '13px',
                          color: '#6b7280'
                        }}>
                          <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                            <Calendar style={{ width: '16px', height: '16px', color: '#9ca3af' }} />
                            <strong style={{ color: '#374151' }}>Deadline:</strong> {new Date(job.deadline).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                          </span>
                          <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                            <Briefcase style={{ width: '16px', height: '16px', color: '#9ca3af' }} />
                            <strong style={{ color: '#374151' }}>Openings:</strong> {job.openings.toLocaleString('en-IN')}
                          </span>
                        </div>
                      </div>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', minWidth: '180px' }}>
                        <button style={{
                          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                          color: 'white',
                          padding: '14px 28px',
                          borderRadius: '12px',
                          fontWeight: '600',
                          fontSize: '14px',
                          border: 'none',
                          cursor: 'pointer',
                          boxShadow: '0 8px 20px rgba(102, 126, 234, 0.3)',
                          transition: 'all 0.3s ease',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: '8px'
                        }}>
                          Apply Now
                          <CheckCircle style={{ width: '18px', height: '18px' }} />
                        </button>
                        <button 
                          onClick={() => openJobDetails(job)}
                          style={{
                            background: 'rgba(107, 114, 128, 0.1)',
                            color: '#374151',
                            padding: '14px 28px',
                            borderRadius: '12px',
                            fontWeight: '600',
                            fontSize: '14px',
                            border: '1px solid rgba(107, 114, 128, 0.2)',
                            cursor: 'pointer',
                            transition: 'all 0.3s ease'
                          }}
                        >
                          View Details
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* JOBS TAB - COMPLETE IMPLEMENTATION */}
        {activeTab === 'jobs' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            {/* Search and Filters */}
            <div style={{
              background: 'rgba(255, 255, 255, 0.95)',
              backdropFilter: 'blur(10px)',
              borderRadius: '20px',
              padding: '24px',
              boxShadow: '0 10px 40px rgba(0, 0, 0, 0.08)',
              border: '1px solid rgba(255, 255, 255, 0.5)'
            }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                {/* Search Bar */}
                <div style={{ position: 'relative' }}>
                  <Search style={{
                    position: 'absolute',
                    left: '18px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    width: '20px',
                    height: '20px',
                    color: '#9ca3af'
                  }} />
                  <input
                    type="text"
                    placeholder="Search for jobs, organizations..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '16px 18px 16px 50px',
                      border: '2px solid rgba(107, 114, 128, 0.2)',
                      borderRadius: '14px',
                      fontSize: '15px',
                      outline: 'none',
                      transition: 'all 0.3s ease',
                      background: 'white',
                      boxSizing: 'border-box'
                    }}
                  />
                </div>

                {/* Filters Row */}
                <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', alignItems: 'center' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Filter style={{ width: '18px', height: '18px', color: '#6b7280' }} />
                    <span style={{ fontSize: '14px', fontWeight: '600', color: '#374151' }}>Filters:</span>
                  </div>
                  
                  {/* Category Filter */}
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    style={{
                      padding: '10px 16px',
                      border: '2px solid rgba(107, 114, 128, 0.2)',
                      borderRadius: '10px',
                      fontSize: '14px',
                      fontWeight: '500',
                      outline: 'none',
                      cursor: 'pointer',
                      background: 'white',
                      color: '#374151'
                    }}
                  >
                    {categories.map(cat => (
                      <option key={cat} value={cat}>
                        {cat === 'all' ? 'All Categories' : cat}
                      </option>
                    ))}
                  </select>

                  {/* Sort Filter */}
                  <select
                    value={selectedSort}
                    onChange={(e) => setSelectedSort(e.target.value)}
                    style={{
                      padding: '10px 16px',
                      border: '2px solid rgba(107, 114, 128, 0.2)',
                      borderRadius: '10px',
                      fontSize: '14px',
                      fontWeight: '500',
                      outline: 'none',
                      cursor: 'pointer',
                      background: 'white',
                      color: '#374151'
                    }}
                  >
                    <option value="match">Best Match</option>
                    <option value="latest">Latest Posted</option>
                    <option value="deadline">Deadline</option>
                    <option value="openings">Most Openings</option>
                  </select>

                  <div style={{ marginLeft: 'auto', fontSize: '14px', color: '#6b7280' }}>
                    <strong style={{ color: '#374151' }}>{filteredJobs.length}</strong> jobs found
                  </div>
                </div>
              </div>
            </div>

            {/* Job Listings */}
            <div style={{ display: 'grid', gap: '20px' }}>
              {filteredJobs.map((job) => (
                <div key={job.id} style={{
                  background: 'rgba(255, 255, 255, 0.95)',
                  backdropFilter: 'blur(10px)',
                  borderRadius: '20px',
                  padding: '28px',
                  boxShadow: '0 10px 40px rgba(0, 0, 0, 0.08)',
                  border: '1px solid rgba(255, 255, 255, 0.5)',
                  transition: 'all 0.3s ease',
                  cursor: 'pointer'
                }}>
                  <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap' }}>
                    {/* Job Icon/Logo */}
                    <div style={{
                      width: '80px',
                      height: '80px',
                      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                      borderRadius: '16px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                      boxShadow: '0 8px 20px rgba(102, 126, 234, 0.3)'
                    }}>
                      <Briefcase style={{ width: '40px', height: '40px', color: 'white' }} />
                    </div>

                    {/* Job Details */}
                    <div style={{ flex: 1, minWidth: '300px' }}>
                      <div style={{ display: 'flex', alignItems: 'start', justifyContent: 'space-between', marginBottom: '12px', flexWrap: 'wrap', gap: '12px' }}>
                        <div style={{ flex: 1 }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px', flexWrap: 'wrap' }}>
                            <h3 style={{ fontSize: '22px', fontWeight: '700', color: '#1f2937', margin: 0 }}>{job.title}</h3>
                            {job.status === 'new' && (
                              <span style={{
                                padding: '4px 12px',
                                background: 'linear-gradient(135deg, #f43f5e 0%, #dc2626 100%)',
                                color: 'white',
                                fontSize: '11px',
                                fontWeight: '700',
                                borderRadius: '12px',
                                textTransform: 'uppercase'
                              }}>NEW</span>
                            )}
                            {job.status === 'hot' && (
                              <span style={{
                                padding: '4px 12px',
                                background: 'linear-gradient(135deg, #f97316 0%, #ea580c 100%)',
                                color: 'white',
                                fontSize: '11px',
                                fontWeight: '700',
                                borderRadius: '12px',
                                textTransform: 'uppercase'
                              }}>🔥 HOT</span>
                            )}
                            {job.status === 'trending' && (
                              <span style={{
                                padding: '4px 12px',
                                background: 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)',
                                color: 'white',
                                fontSize: '11px',
                                fontWeight: '700',
                                borderRadius: '12px',
                                textTransform: 'uppercase'
                              }}>📈 TRENDING</span>
                            )}
                          </div>
                          <p style={{ fontSize: '16px', color: '#6b7280', margin: '0 0 12px 0', fontWeight: '500' }}>{job.org}</p>
                        </div>

                        {/* Match Score */}
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
                          <div style={{
                            width: '70px',
                            height: '70px',
                            borderRadius: '50%',
                            background: job.match >= 90 ? 'linear-gradient(135deg, #10b981 0%, #059669 100%)' :
                              job.match >= 80 ? 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)' :
                              'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            flexDirection: 'column',
                            boxShadow: '0 8px 20px rgba(0, 0, 0, 0.15)'
                          }}>
                            <span style={{ fontSize: '24px', fontWeight: '800', color: 'white' }}>{job.match}%</span>
                            <span style={{ fontSize: '10px', color: 'white', opacity: 0.9 }}>MATCH</span>
                          </div>
                        </div>
                      </div>

                      {/* Job Info Grid */}
                      <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                        gap: '16px',
                        marginBottom: '20px'
                      }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                          <div style={{
                            width: '36px',
                            height: '36px',
                            background: 'rgba(102, 126, 234, 0.1)',
                            borderRadius: '8px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                          }}>
                            <DollarSign style={{ width: '18px', height: '18px', color: '#667eea' }} />
                          </div>
                          <div>
                            <p style={{ fontSize: '11px', color: '#9ca3af', margin: 0, fontWeight: '500' }}>Salary</p>
                            <p style={{ fontSize: '13px', color: '#374151', margin: 0, fontWeight: '600' }}>{job.salary}</p>
                          </div>
                        </div>

                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                          <div style={{
                            width: '36px',
                            height: '36px',
                            background: 'rgba(16, 185, 129, 0.1)',
                            borderRadius: '8px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                          }}>
                            <Users style={{ width: '18px', height: '18px', color: '#10b981' }} />
                          </div>
                          <div>
                            <p style={{ fontSize: '11px', color: '#9ca3af', margin: 0, fontWeight: '500' }}>Openings</p>
                            <p style={{ fontSize: '13px', color: '#374151', margin: 0, fontWeight: '600' }}>{job.openings.toLocaleString('en-IN')}</p>
                          </div>
                        </div>

                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                          <div style={{
                            width: '36px',
                            height: '36px',
                            background: 'rgba(239, 68, 68, 0.1)',
                            borderRadius: '8px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                          }}>
                            <Calendar style={{ width: '18px', height: '18px', color: '#ef4444' }} />
                          </div>
                          <div>
                            <p style={{ fontSize: '11px', color: '#9ca3af', margin: 0, fontWeight: '500' }}>Deadline</p>
                            <p style={{ fontSize: '13px', color: '#374151', margin: 0, fontWeight: '600' }}>
                              {new Date(job.deadline).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}
                            </p>
                          </div>
                        </div>

                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                          <div style={{
                            width: '36px',
                            height: '36px',
                            background: 'rgba(245, 158, 11, 0.1)',
                            borderRadius: '8px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                          }}>
                            <MapPin style={{ width: '18px', height: '18px', color: '#f59e0b' }} />
                          </div>
                          <div>
                            <p style={{ fontSize: '11px', color: '#9ca3af', margin: 0, fontWeight: '500' }}>Location</p>
                            <p style={{ fontSize: '13px', color: '#374151', margin: 0, fontWeight: '600' }}>{job.location}</p>
                          </div>
                        </div>
                      </div>

                      {/* Tags */}
                      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '20px' }}>
                        <span style={{
                          padding: '6px 14px',
                          background: 'rgba(102, 126, 234, 0.1)',
                          color: '#667eea',
                          fontSize: '12px',
                          fontWeight: '600',
                          borderRadius: '8px'
                        }}>{job.category}</span>
                        <span style={{
                          padding: '6px 14px',
                          background: 'rgba(107, 114, 128, 0.1)',
                          color: '#374151',
                          fontSize: '12px',
                          fontWeight: '600',
                          borderRadius: '8px'
                        }}>{job.type}</span>
                        <span style={{
                          padding: '6px 14px',
                          background: 'rgba(107, 114, 128, 0.1)',
                          color: '#374151',
                          fontSize: '12px',
                          fontWeight: '600',
                          borderRadius: '8px'
                        }}>{job.qualification}</span>
                        <span style={{
                          padding: '6px 14px',
                          background: 'rgba(107, 114, 128, 0.1)',
                          color: '#374151',
                          fontSize: '12px',
                          fontWeight: '600',
                          borderRadius: '8px'
                        }}>{job.ageLimit}</span>
                      </div>

                      {/* Action Buttons */}
                      <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                        <button style={{
                          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                          color: 'white',
                          padding: '12px 28px',
                          borderRadius: '12px',
                          fontWeight: '600',
                          fontSize: '14px',
                          border: 'none',
                          cursor: 'pointer',
                          boxShadow: '0 8px 20px rgba(102, 126, 234, 0.3)',
                          transition: 'all 0.3s ease',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '8px'
                        }}>
                          Apply Now
                          <ArrowUpRight style={{ width: '16px', height: '16px' }} />
                        </button>
                        <button 
                          onClick={() => openJobDetails(job)}
                          style={{
                            background: 'rgba(107, 114, 128, 0.1)',
                            color: '#374151',
                            padding: '12px 24px',
                            borderRadius: '12px',
                            fontWeight: '600',
                            fontSize: '14px',
                            border: '1px solid rgba(107, 114, 128, 0.2)',
                            cursor: 'pointer',
                            transition: 'all 0.3s ease',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px'
                          }}
                        >
                          <Eye style={{ width: '16px', height: '16px' }} />
                          Details
                        </button>
                        <button 
                          onClick={() => toggleSaveJob(job.id)}
                          style={{
                            background: savedJobs.includes(job.id) ? 'rgba(245, 158, 11, 0.1)' : 'rgba(107, 114, 128, 0.1)',
                            color: savedJobs.includes(job.id) ? '#f59e0b' : '#374151',
                            padding: '12px 24px',
                            borderRadius: '12px',
                            fontWeight: '600',
                            fontSize: '14px',
                            border: savedJobs.includes(job.id) ? '1px solid rgba(245, 158, 11, 0.3)' : '1px solid rgba(107, 114, 128, 0.2)',
                            cursor: 'pointer',
                            transition: 'all 0.3s ease',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px'
                          }}
                        >
                          <BookmarkPlus style={{ width: '16px', height: '16px' }} />
                          {savedJobs.includes(job.id) ? 'Saved' : 'Save'}
                        </button>
                        <button style={{
                          background: 'rgba(107, 114, 128, 0.1)',
                          color: '#374151',
                          padding: '12px 20px',
                          borderRadius: '12px',
                          fontWeight: '600',
                          fontSize: '14px',
                          border: '1px solid rgba(107, 114, 128, 0.2)',
                          cursor: 'pointer',
                          transition: 'all 0.3s ease',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '8px'
                        }}>
                          <Share2 style={{ width: '16px', height: '16px' }} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {filteredJobs.length === 0 && (
              <div style={{
                background: 'rgba(255, 255, 255, 0.95)',
                backdropFilter: 'blur(10px)',
                borderRadius: '20px',
                padding: '60px',
                textAlign: 'center',
                boxShadow: '0 10px 40px rgba(0, 0, 0, 0.08)',
                border: '1px solid rgba(255, 255, 255, 0.5)'
              }}>
                <Search style={{ width: '64px', height: '64px', color: '#d1d5db', margin: '0 auto 20px' }} />
                <h3 style={{ fontSize: '22px', fontWeight: '700', color: '#1f2937', margin: '0 0 12px 0' }}>
                  No Jobs Found
                </h3>
                <p style={{ fontSize: '15px', color: '#6b7280', margin: 0 }}>
                  Try adjusting your filters or search query
                </p>
              </div>
            )}
          </div>
        )}

        {/* APPLICATIONS TAB - COMPLETE IMPLEMENTATION */}
        {activeTab === 'applications' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            {/* Stats Cards */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '16px'
            }}>
              {[
                { label: 'Total', count: applications.length, color: '#667eea', icon: FileText },
                { label: 'Accepted', count: applications.filter(a => a.status === 'accepted').length, color: '#10b981', icon: CheckCircle2 },
                { label: 'Under Review', count: applications.filter(a => a.status === 'under_review').length, color: '#3b82f6', icon: Loader },
                { label: 'Pending', count: applications.filter(a => a.status === 'pending').length, color: '#f59e0b', icon: AlertTriangle }
              ].map((stat, idx) => {
                const Icon = stat.icon;
                return (
                  <div key={idx} style={{
                    background: 'rgba(255, 255, 255, 0.95)',
                    backdropFilter: 'blur(10px)',
                    borderRadius: '16px',
                    padding: '20px',
                    boxShadow: '0 8px 30px rgba(0, 0, 0, 0.06)',
                    border: '1px solid rgba(255, 255, 255, 0.5)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '16px'
                  }}>
                    <div style={{
                      width: '50px',
                      height: '50px',
                      background: `${stat.color}15`,
                      borderRadius: '12px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      <Icon style={{ width: '24px', height: '24px', color: stat.color }} />
                    </div>
                    <div>
                      <p style={{ fontSize: '12px', color: '#6b7280', margin: '0 0 4px 0', fontWeight: '500' }}>{stat.label}</p>
                      <p style={{ fontSize: '28px', fontWeight: '800', color: '#1f2937', margin: 0 }}>{stat.count}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Applications List */}
            <div style={{
              background: 'rgba(255, 255, 255, 0.95)',
              backdropFilter: 'blur(10px)',
              borderRadius: '20px',
              boxShadow: '0 10px 40px rgba(0, 0, 0, 0.08)',
              border: '1px solid rgba(255, 255, 255, 0.5)',
              overflow: 'hidden'
            }}>
              <div style={{
                padding: '24px 28px',
                borderBottom: '1px solid rgba(0, 0, 0, 0.05)',
                background: 'linear-gradient(135deg, #f9fafb 0%, #ffffff 100%)'
              }}>
                <h2 style={{ fontSize: '20px', fontWeight: '700', color: '#1f2937', margin: 0 }}>
                  My Applications ({applications.length})
                </h2>
              </div>

              <div>
                {applications.map((app, idx) => (
                  <div key={app.id} style={{
                    padding: '28px',
                    borderBottom: idx < applications.length - 1 ? '1px solid rgba(0, 0, 0, 0.05)' : 'none',
                    transition: 'all 0.2s ease'
                  }}>
                    <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap' }}>
                      {/* Status Indicator */}
                      <div style={{
                        width: '70px',
                        height: '70px',
                        borderRadius: '14px',
                        background: getStatusColor(app.status).bg,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                        boxShadow: '0 8px 20px rgba(0, 0, 0, 0.15)'
                      }}>
                        <div style={{ color: getStatusColor(app.status).text }}>
                          {getStatusIcon(app.status)}
                        </div>
                      </div>

                      {/* Application Details */}
                      <div style={{ flex: 1, minWidth: '300px' }}>
                        <div style={{ marginBottom: '12px' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '6px', flexWrap: 'wrap' }}>
                            <h3 style={{ fontSize: '20px', fontWeight: '700', color: '#1f2937', margin: 0 }}>
                              {app.jobTitle}
                            </h3>
                            <span style={{
                              padding: '6px 14px',
                              borderRadius: '20px',
                              fontSize: '12px',
                              fontWeight: '700',
                              background: getStatusColor(app.status).bg,
                              color: getStatusColor(app.status).text,
                              display: 'flex',
                              alignItems: 'center',
                              gap: '6px',
                              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)'
                            }}>
                              {getStatusIcon(app.status)}
                              {getStatusText(app.status)}
                            </span>
                          </div>
                          <p style={{ fontSize: '14px', color: '#6b7280', margin: '0 0 8px 0', fontWeight: '500' }}>
                            {app.org}
                          </p>
                          <p style={{ fontSize: '12px', color: '#9ca3af', margin: 0 }}>
                            Application ID: <strong style={{ color: '#374151' }}>{app.applicationId}</strong>
                          </p>
                        </div>

                        {/* Application Info Grid */}
                        <div style={{
                          display: 'grid',
                          gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))',
                          gap: '16px',
                          marginBottom: '20px'
                        }}>
                          <div>
                            <p style={{ fontSize: '11px', color: '#9ca3af', margin: '0 0 4px 0', fontWeight: '500' }}>Applied Date</p>
                            <p style={{ fontSize: '13px', color: '#374151', margin: 0, fontWeight: '600' }}>
                              {new Date(app.appliedDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                            </p>
                          </div>
                          {app.examDate && (
                            <div>
                              <p style={{ fontSize: '11px', color: '#9ca3af', margin: '0 0 4px 0', fontWeight: '500' }}>Exam Date</p>
                              <p style={{ fontSize: '13px', color: '#374151', margin: 0, fontWeight: '600' }}>
                                {new Date(app.examDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                              </p>
                            </div>
                          )}
                          <div>
                            <p style={{ fontSize: '11px', color: '#9ca3af', margin: '0 0 4px 0', fontWeight: '500' }}>Documents</p>
                            <p style={{ fontSize: '13px', color: '#374151', margin: 0, fontWeight: '600' }}>
                              {app.documentsSubmitted}/{app.totalDocuments} Uploaded
                            </p>
                          </div>
                          <div>
                            <p style={{ fontSize: '11px', color: '#9ca3af', margin: '0 0 4px 0', fontWeight: '500' }}>Fee Status</p>
                            <p style={{ fontSize: '13px', color: app.paymentStatus === 'Completed' ? '#10b981' : '#f59e0b', margin: 0, fontWeight: '600' }}>
                              {app.paymentStatus}
                            </p>
                          </div>
                          <div>
                            <p style={{ fontSize: '11px', color: '#9ca3af', margin: '0 0 4px 0', fontWeight: '500' }}>Last Update</p>
                            <p style={{ fontSize: '13px', color: '#374151', margin: 0, fontWeight: '600' }}>{app.lastUpdate}</p>
                          </div>
                        </div>

                        {/* Special Messages */}
                        {app.admitCard && (
                          <div style={{
                            background: 'linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%)',
                            border: '1px solid #3b82f6',
                            borderRadius: '12px',
                            padding: '12px 16px',
                            marginBottom: '16px',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '12px'
                          }}>
                            <CheckCircle2 style={{ width: '20px', height: '20px', color: '#3b82f6' }} />
                            <span style={{ fontSize: '13px', color: '#1e40af', fontWeight: '600' }}>
                              Admit card available for download
                            </span>
                          </div>
                        )}

                        {app.status === 'rejected' && app.rejectionReason && (
                          <div style={{
                            background: 'linear-gradient(135deg, #fee2e2 0%, #fecaca 100%)',
                            border: '1px solid #ef4444',
                            borderRadius: '12px',
                            padding: '12px 16px',
                            marginBottom: '16px',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '12px'
                          }}>
                            <AlertCircle style={{ width: '20px', height: '20px', color: '#ef4444' }} />
                            <span style={{ fontSize: '13px', color: '#991b1b', fontWeight: '600' }}>
                              Reason: {app.rejectionReason}
                            </span>
                          </div>
                        )}

                        {/* Action Buttons */}
                        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                          {app.admitCard && (
                            <button style={{
                              background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                              color: 'white',
                              padding: '10px 20px',
                              borderRadius: '10px',
                              fontWeight: '600',
                              fontSize: '13px',
                              border: 'none',
                              cursor: 'pointer',
                              boxShadow: '0 6px 16px rgba(16, 185, 129, 0.3)',
                              transition: 'all 0.3s ease',
                              display: 'flex',
                              alignItems: 'center',
                              gap: '8px'
                            }}>
                              <Download style={{ width: '16px', height: '16px' }} />
                              Download Admit Card
                            </button>
                          )}
                          <button style={{
                            background: 'rgba(107, 114, 128, 0.1)',
                            color: '#374151',
                            padding: '10px 20px',
                            borderRadius: '10px',
                            fontWeight: '600',
                            fontSize: '13px',
                            border: '1px solid rgba(107, 114, 128, 0.2)',
                            cursor: 'pointer',
                            transition: 'all 0.3s ease',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px'
                          }}>
                            <Eye style={{ width: '16px', height: '16px' }} />
                            View Application
                          </button>
                          {app.status === 'pending' && app.documentsSubmitted < app.totalDocuments && (
                            <button style={{
                              background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
                              color: 'white',
                              padding: '10px 20px',
                              borderRadius: '10px',
                              fontWeight: '600',
                              fontSize: '13px',
                              border: 'none',
                              cursor: 'pointer',
                              boxShadow: '0 6px 16px rgba(245, 158, 11, 0.3)',
                              transition: 'all 0.3s ease',
                              display: 'flex',
                              alignItems: 'center',
                              gap: '8px'
                            }}>
                              <FileText style={{ width: '16px', height: '16px' }} />
                              Upload Documents
                            </button>
                          )}
                          <button style={{
                            background: 'rgba(107, 114, 128, 0.1)',
                            color: '#374151',
                            padding: '10px 20px',
                            borderRadius: '10px',
                            fontWeight: '600',
                            fontSize: '13px',
                            border: '1px solid rgba(107, 114, 128, 0.2)',
                            cursor: 'pointer',
                            transition: 'all 0.3s ease',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px'
                          }}>
                            <ExternalLink style={{ width: '16px', height: '16px' }} />
                            Official Website
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {applications.length === 0 && (
              <div style={{
                background: 'rgba(255, 255, 255, 0.95)',
                backdropFilter: 'blur(10px)',
                borderRadius: '20px',
                padding: '60px',
                textAlign: 'center',
                boxShadow: '0 10px 40px rgba(0, 0, 0, 0.08)',
                border: '1px solid rgba(255, 255, 255, 0.5)'
              }}>
                <FileText style={{ width: '64px', height: '64px', color: '#d1d5db', margin: '0 auto 20px' }} />
                <h3 style={{ fontSize: '22px', fontWeight: '700', color: '#1f2937', margin: '0 0 12px 0' }}>
                  No Applications Yet
                </h3>
                <p style={{ fontSize: '15px', color: '#6b7280', margin: '0 0 24px 0' }}>
                  Start applying to jobs that match your profile
                </p>
                <button 
                  onClick={() => setActiveTab('jobs')}
                  style={{
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    color: 'white',
                    padding: '14px 32px',
                    borderRadius: '12px',
                    fontWeight: '600',
                    fontSize: '15px',
                    border: 'none',
                    cursor: 'pointer',
                    boxShadow: '0 8px 20px rgba(102, 126, 234, 0.3)',
                    transition: 'all 0.3s ease'
                  }}
                >
                  Browse Jobs
                </button>
              </div>
            )}
          </div>
        )}

        {/* PROFILE TAB - COMPLETE IMPLEMENTATION */}
        {activeTab === 'profile' && (
          <div style={{
            background: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(10px)',
            borderRadius: '24px',
            padding: '40px',
            maxWidth: '900px',
            margin: '0 auto',
            boxShadow: '0 20px 60px rgba(0, 0, 0, 0.1)',
            border: '1px solid rgba(255, 255, 255, 0.5)'
          }}>
            <div style={{ marginBottom: '32px' }}>
              <h2 style={{
                fontSize: '32px',
                fontWeight: '800',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                margin: '0 0 8px 0'
              }}>One-Time Profile Setup</h2>
              <p style={{ fontSize: '15px', color: '#6b7280', margin: 0 }}>Complete your profile to unlock AI-powered job matching</p>
            </div>
            
            {/* Progress Bar */}
            <div style={{ marginBottom: '40px' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
                <span style={{ fontSize: '14px', fontWeight: '600', color: '#374151' }}>Profile Completion</span>
                <span style={{
                  fontSize: '18px',
                  fontWeight: '700',
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent'
                }}>{profileComplete}%</span>
              </div>
              <div style={{
                width: '100%',
                background: 'rgba(107, 114, 128, 0.1)',
                borderRadius: '12px',
                height: '12px',
                overflow: 'hidden',
                position: 'relative'
              }}>
                <div style={{
                  width: `${profileComplete}%`,
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  height: '100%',
                  borderRadius: '12px',
                  transition: 'width 0.5s ease',
                  boxShadow: '0 0 20px rgba(102, 126, 234, 0.4)'
                }}></div>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
              {/* Personal Information */}
              <div style={{
                paddingBottom: '32px',
                borderBottom: '2px solid rgba(107, 114, 128, 0.1)'
              }}>
                <h3 style={{ fontSize: '18px', fontWeight: '700', color: '#1f2937', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <User style={{ width: '22px', height: '22px', color: '#667eea' }} />
                  Personal Information
                </h3>
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                  gap: '16px'
                }}>
                  <input type="text" placeholder="Full Name *" style={{
                    border: '2px solid rgba(107, 114, 128, 0.2)',
                    borderRadius: '12px',
                    padding: '14px 18px',
                    fontSize: '14px',
                    transition: 'all 0.3s ease',
                    outline: 'none',
                    background: 'white'
                  }} />
                  <input type="date" placeholder="Date of Birth *" style={{
                    border: '2px solid rgba(107, 114, 128, 0.2)',
                    borderRadius: '12px',
                    padding: '14px 18px',
                    fontSize: '14px',
                    transition: 'all 0.3s ease',
                    outline: 'none',
                    background: 'white'
                  }} />
                  <input type="email" placeholder="Email Address *" style={{
                    border: '2px solid rgba(107, 114, 128, 0.2)',
                    borderRadius: '12px',
                    padding: '14px 18px',
                    fontSize: '14px',
                    transition: 'all 0.3s ease',
                    outline: 'none',
                    background: 'white'
                  }} />
                  <input type="tel" placeholder="Mobile Number *" style={{
                    border: '2px solid rgba(107, 114, 128, 0.2)',
                    borderRadius: '12px',
                    padding: '14px 18px',
                    fontSize: '14px',
                    transition: 'all 0.3s ease',
                    outline: 'none',
                    background: 'white'
                  }} />
                  <select style={{
                    border: '2px solid rgba(107, 114, 128, 0.2)',
                    borderRadius: '12px',
                    padding: '14px 18px',
                    fontSize: '14px',
                    transition: 'all 0.3s ease',
                    outline: 'none',
                    background: 'white',
                    gridColumn: 'span 2'
                  }}>
                    <option>Select Category *</option>
                    <option>General</option>
                    <option>OBC</option>
                    <option>SC</option>
                    <option>ST</option>
                    <option>EWS</option>
                  </select>
                </div>
              </div>

              {/* Education */}
              <div style={{
                paddingBottom: '32px',
                borderBottom: '2px solid rgba(107, 114, 128, 0.1)'
              }}>
                <h3 style={{ fontSize: '18px', fontWeight: '700', color: '#1f2937', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <Award style={{ width: '22px', height: '22px', color: '#667eea' }} />
                  Educational Qualifications
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <select style={{
                    border: '2px solid rgba(107, 114, 128, 0.2)',
                    borderRadius: '12px',
                    padding: '14px 18px',
                    fontSize: '14px',
                    transition: 'all 0.3s ease',
                    outline: 'none',
                    background: 'white'
                  }}>
                    <option>Highest Qualification *</option>
                    <option>10th</option>
                    <option>12th</option>
                    <option>Graduation</option>
                    <option>Post Graduation</option>
                    <option>Doctorate</option>
                  </select>
                  <input type="text" placeholder="Specialization/Stream *" style={{
                    border: '2px solid rgba(107, 114, 128, 0.2)',
                    borderRadius: '12px',
                    padding: '14px 18px',
                    fontSize: '14px',
                    transition: 'all 0.3s ease',
                    outline: 'none',
                    background: 'white'
                  }} />
                  <input type="number" placeholder="Percentage/CGPA *" step="0.01" style={{
                    border: '2px solid rgba(107, 114, 128, 0.2)',
                    borderRadius: '12px',
                    padding: '14px 18px',
                    fontSize: '14px',
                    transition: 'all 0.3s ease',
                    outline: 'none',
                    background: 'white'
                  }} />
                  <input type="number" placeholder="Year of Passing *" style={{
                    border: '2px solid rgba(107, 114, 128, 0.2)',
                    borderRadius: '12px',
                    padding: '14px 18px',
                    fontSize: '14px',
                    transition: 'all 0.3s ease',
                    outline: 'none',
                    background: 'white'
                  }} />
                </div>
              </div>

              {/* Preferences */}
              <div style={{
                paddingBottom: '32px',
                borderBottom: '2px solid rgba(107, 114, 128, 0.1)'
              }}>
                <h3 style={{ fontSize: '18px', fontWeight: '700', color: '#1f2937', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <Target style={{ width: '22px', height: '22px', color: '#667eea' }} />
                  Job Preferences
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#374151', marginBottom: '12px' }}>
                      Exam Types (Select all that apply)
                    </label>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
                      {['SSC', 'UPSC', 'Railway', 'Banking', 'State PSC', 'Defence', 'Teaching', 'Police'].map(exam => (
                        <label key={exam} style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '8px',
                          border: '2px solid rgba(107, 114, 128, 0.2)',
                          borderRadius: '12px',
                          padding: '12px 18px',
                          cursor: 'pointer',
                          transition: 'all 0.3s ease',
                          background: 'white'
                        }}>
                          <input type="checkbox" style={{ width: '18px', height: '18px', cursor: 'pointer', accentColor: '#667eea' }} />
                          <span style={{ fontSize: '14px', fontWeight: '500', color: '#374151' }}>{exam}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                  <input type="text" placeholder="Preferred Locations (comma separated)" style={{
                    border: '2px solid rgba(107, 114, 128, 0.2)',
                    borderRadius: '12px',
                    padding: '14px 18px',
                    fontSize: '14px',
                    transition: 'all 0.3s ease',
                    outline: 'none',
                    background: 'white'
                  }} />
                  <select style={{
                    border: '2px solid rgba(107, 114, 128, 0.2)',
                    borderRadius: '12px',
                    padding: '14px 18px',
                    fontSize: '14px',
                    transition: 'all 0.3s ease',
                    outline: 'none',
                    background: 'white'
                  }}>
                    <option>Notification Preference *</option>
                    <option>SMS + Email + WhatsApp (Recommended)</option>
                    <option>SMS + Email</option>
                    <option>Email Only</option>
                    <option>SMS Only</option>
                  </select>
                </div>
              </div>

              {/* Upload Documents */}
              <div>
                <h3 style={{ fontSize: '18px', fontWeight: '700', color: '#1f2937', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <FileText style={{ width: '22px', height: '22px', color: '#667eea' }} />
                  Upload Documents
                </h3>
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                  gap: '16px'
                }}>
                  {[
                    { label: 'Upload Resume', icon: FileText },
                    { label: 'Upload Photo', icon: User },
                    { label: 'Upload Signature', icon: FileText }
                  ].map((doc, idx) => {
                    const Icon = doc.icon;
                    return (
                      <div key={idx} style={{
                        border: '2px dashed rgba(107, 114, 128, 0.3)',
                        borderRadius: '16px',
                        padding: '32px',
                        textAlign: 'center',
                        cursor: 'pointer',
                        transition: 'all 0.3s ease',
                        background: 'rgba(102, 126, 234, 0.02)'
                      }}>
                        <Icon style={{ width: '36px', height: '36px', color: '#9ca3af', margin: '0 auto 12px' }} />
                        <p style={{ fontSize: '13px', color: '#6b7280', margin: 0, fontWeight: '500' }}>{doc.label}</p>
                        <p style={{ fontSize: '11px', color: '#9ca3af', margin: '4px 0 0 0' }}>Click to browse</p>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Action Buttons */}
              <div style={{ display: 'flex', gap: '16px', paddingTop: '24px' }}>
                <button style={{
                  flex: 1,
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  color: 'white',
                  padding: '16px 32px',
                  borderRadius: '14px',
                  fontWeight: '700',
                  fontSize: '16px',
                  border: 'none',
                  cursor: 'pointer',
                  boxShadow: '0 10px 30px rgba(102, 126, 234, 0.4)',
                  transition: 'all 0.3s ease'
                }}>
                  Save & Activate AI Agent 🚀
                </button>
                <button style={{
                  padding: '16px 32px',
                  background: 'rgba(107, 114, 128, 0.1)',
                  color: '#374151',
                  borderRadius: '14px',
                  fontWeight: '600',
                  fontSize: '16px',
                  border: '1px solid rgba(107, 114, 128, 0.2)',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease'
                }}>
                  Save Draft
                </button>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Job Details Modal */}
      {showJobModal && selectedJob && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0, 0, 0, 0.6)',
          backdropFilter: 'blur(4px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 2000,
          padding: '20px'
        }} onClick={() => setShowJobModal(false)}>
          <div onClick={(e) => e.stopPropagation()} style={{
            background: 'white',
            borderRadius: '24px',
            maxWidth: '800px',
            width: '100%',
            maxHeight: '90vh',
            overflow: 'auto',
            boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
            position: 'relative'
          }}>
            {/* Modal Header */}
            <div style={{
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              padding: '32px',
              borderRadius: '24px 24px 0 0',
              position: 'relative'
            }}>
              <button onClick={() => setShowJobModal(false)} style={{
                position: 'absolute',
                top: '20px',
                right: '20px',
                background: 'rgba(255, 255, 255, 0.2)',
                border: 'none',
                borderRadius: '50%',
                width: '36px',
                height: '36px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}>
                <X style={{ width: '20px', height: '20px', color: 'white' }} />
              </button>
              <h2 style={{ fontSize: '28px', fontWeight: '800', color: 'white', margin: '0 0 8px 0' }}>
                {selectedJob.title}
              </h2>
              <p style={{ fontSize: '16px', color: 'rgba(255, 255, 255, 0.9)', margin: 0 }}>
                {selectedJob.org}
              </p>
            </div>

            {/* Modal Content */}
            <div style={{ padding: '32px' }}>
              {/* Quick Stats */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
                gap: '16px',
                marginBottom: '32px'
              }}>
                <div style={{
                  background: 'rgba(102, 126, 234, 0.1)',
                  padding: '16px',
                  borderRadius: '12px'
                }}>
                  <p style={{ fontSize: '12px', color: '#6b7280', margin: '0 0 6px 0', fontWeight: '500' }}>Match Score</p>
                  <p style={{ fontSize: '24px', fontWeight: '800', color: '#667eea', margin: 0 }}>{selectedJob.match}%</p>
                </div>
                <div style={{
                  background: 'rgba(16, 185, 129, 0.1)',
                  padding: '16px',
                  borderRadius: '12px'
                }}>
                  <p style={{ fontSize: '12px', color: '#6b7280', margin: '0 0 6px 0', fontWeight: '500' }}>Openings</p>
                  <p style={{ fontSize: '24px', fontWeight: '800', color: '#10b981', margin: 0 }}>{selectedJob.openings.toLocaleString('en-IN')}</p>
                </div>
                <div style={{
                  background: 'rgba(245, 158, 11, 0.1)',
                  padding: '16px',
                  borderRadius: '12px'
                }}>
                  <p style={{ fontSize: '12px', color: '#6b7280', margin: '0 0 6px 0', fontWeight: '500' }}>Deadline</p>
                  <p style={{ fontSize: '16px', fontWeight: '800', color: '#f59e0b', margin: 0 }}>
                    {new Date(selectedJob.deadline).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}
                  </p>
                </div>
              </div>

              {/* Description */}
              <div style={{ marginBottom: '28px' }}>
                <h3 style={{ fontSize: '18px', fontWeight: '700', color: '#1f2937', marginBottom: '12px' }}>About</h3>
                <p style={{ fontSize: '14px', color: '#6b7280', lineHeight: 1.7, margin: 0 }}>{selectedJob.description}</p>
              </div>

              {/* Eligibility */}
              <div style={{ marginBottom: '28px' }}>
                <h3 style={{ fontSize: '18px', fontWeight: '700', color: '#1f2937', marginBottom: '12px' }}>Eligibility</h3>
                <ul style={{ margin: 0, paddingLeft: '20px' }}>
                  {selectedJob.eligibility.map((item, idx) => (
                    <li key={idx} style={{ fontSize: '14px', color: '#6b7280', marginBottom: '8px', lineHeight: 1.6 }}>{item}</li>
                  ))}
                </ul>
              </div>

              {/* Selection Process */}
              <div style={{ marginBottom: '28px' }}>
                <h3 style={{ fontSize: '18px', fontWeight: '700', color: '#1f2937', marginBottom: '12px' }}>Selection Process</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {selectedJob.selectionProcess.map((step, idx) => (
                    <div key={idx} style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                      background: 'rgba(102, 126, 234, 0.05)',
                      padding: '12px 16px',
                      borderRadius: '10px'
                    }}>
                      <div style={{
                        width: '32px',
                        height: '32px',
                        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'white',
                        fontWeight: '700',
                        fontSize: '14px',
                        flexShrink: 0
                      }}>{idx + 1}</div>
                      <span style={{ fontSize: '14px', color: '#374151', fontWeight: '500' }}>{step}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Important Dates */}
              <div style={{ marginBottom: '28px' }}>
                <h3 style={{ fontSize: '18px', fontWeight: '700', color: '#1f2937', marginBottom: '12px' }}>Important Dates</h3>
                <div style={{
                  background: 'rgba(107, 114, 128, 0.05)',
                  padding: '20px',
                  borderRadius: '12px',
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                  gap: '16px'
                }}>
                  {[
                    { label: 'Application Start', date: selectedJob.importantDates.applicationStart },
                    { label: 'Application End', date: selectedJob.importantDates.applicationEnd },
                    { label: 'Exam Date', date: selectedJob.importantDates.examDate },
                    { label: 'Result Date', date: selectedJob.importantDates.resultDate }
                  ].map((item, idx) => (
                    <div key={idx}>
                      <p style={{ fontSize: '12px', color: '#6b7280', margin: '0 0 6px 0', fontWeight: '500' }}>{item.label}</p>
                      <p style={{ fontSize: '14px', color: '#374151', margin: 0, fontWeight: '600' }}>
                        {new Date(item.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Application Fee */}
              <div style={{ marginBottom: '32px' }}>
                <h3 style={{ fontSize: '18px', fontWeight: '700', color: '#1f2937', marginBottom: '12px' }}>Application Fee</h3>
                <p style={{ fontSize: '14px', color: '#6b7280', margin: 0 }}>{selectedJob.applicationFee}</p>
              </div>

              {/* Action Buttons */}
              <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                <button style={{
                  flex: 1,
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  color: 'white',
                  padding: '16px 32px',
                  borderRadius: '12px',
                  fontWeight: '700',
                  fontSize: '16px',
                  border: 'none',
                  cursor: 'pointer',
                  boxShadow: '0 8px 20px rgba(102, 126, 234, 0.3)',
                  transition: 'all 0.3s ease',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '10px'
                }}>
                  Apply Now
                  <ArrowUpRight style={{ width: '20px', height: '20px' }} />
                </button>
                <button 
                  onClick={() => toggleSaveJob(selectedJob.id)}
                  style={{
                    background: savedJobs.includes(selectedJob.id) ? 'rgba(245, 158, 11, 0.1)' : 'rgba(107, 114, 128, 0.1)',
                    color: savedJobs.includes(selectedJob.id) ? '#f59e0b' : '#374151',
                    padding: '16px 24px',
                    borderRadius: '12px',
                    fontWeight: '600',
                    fontSize: '16px',
                    border: savedJobs.includes(selectedJob.id) ? '2px solid rgba(245, 158, 11, 0.3)' : '2px solid rgba(107, 114, 128, 0.2)',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px'
                  }}
                >
                  <BookmarkPlus style={{ width: '20px', height: '20px' }} />
                  {savedJobs.includes(selectedJob.id) ? 'Saved' : 'Save'}
                </button>
                <button style={{
                  background: 'rgba(107, 114, 128, 0.1)',
                  color: '#374151',
                  padding: '16px 24px',
                  borderRadius: '12px',
                  fontWeight: '600',
                  fontSize: '16px',
                  border: '2px solid rgba(107, 114, 128, 0.2)',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}>
                  <ExternalLink style={{ width: '20px', height: '20px' }} />
                  Visit Website
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}