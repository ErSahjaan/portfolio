import React, { useState } from 'react';
import {
  Layout,
  Button,
  Row,
  Col,
  Card,
  Typography,
  Input,
  Form,
  Menu,
  Statistic,
  Space,
  Avatar,
  Rate,
  Badge
} from 'antd';
import {
  PhoneOutlined,
  MailOutlined,
  EnvironmentOutlined,
  ClockCircleOutlined,
  TeamOutlined,
  TrophyOutlined,
  SmileOutlined,
  CheckCircleOutlined,
  SafetyCertificateOutlined,
  CustomerServiceOutlined,
  DollarOutlined,
  ToolOutlined,
  HomeOutlined,
  ShopOutlined,
  ThunderboltOutlined,
  ExperimentOutlined,
  SettingOutlined,
  FireOutlined,
  CloudOutlined
} from '@ant-design/icons';

const { Header, Content, Footer } = Layout;
const { Title, Text, Paragraph } = Typography;
const { TextArea } = Input;

const ACServiceLanding = () => {
  const [form] = Form.useForm();
  const brandColor = 'rgb(139, 104, 68)';
  const phoneNumber = '+15551234567';
  const phoneDisplay = '+1 (555) 123-4567';

  const services = [
    {
      icon: <HomeOutlined style={{ fontSize: '32px', color: brandColor }} />,
      title: 'Residential AC Service',
      description: 'Complete air conditioning solutions for your home including installation, repair, and maintenance.',
      features: ['AC Installation', 'Repair Services', 'Maintenance Plans', 'Emergency Support']
    },
    {
      icon: <ShopOutlined style={{ fontSize: '32px', color: brandColor }} />,
      title: 'Commercial HVAC',
      description: 'Professional HVAC services for offices, retail spaces, and commercial buildings.',
      features: ['Central AC Systems', 'VRF Systems', 'Preventive Maintenance', 'Energy Audits']
    },
    {
      icon: <ToolOutlined style={{ fontSize: '32px', color: brandColor }} />,
      title: 'AC Repair & Fix',
      description: 'Expert diagnosis and repair of all AC issues including cooling problems and compressor failures.',
      features: ['Quick Diagnosis', 'Compressor Repair', 'Refrigerant Recharge', 'Parts Replacement']
    },
    {
      icon: <SettingOutlined style={{ fontSize: '32px', color: brandColor }} />,
      title: 'Installation & Replacement',
      description: 'Professional installation of new AC units and replacement of old inefficient systems.',
      features: ['New Installations', 'System Upgrades', 'Duct Work', 'Smart Thermostats']
    },
    {
      icon: <ExperimentOutlined style={{ fontSize: '32px', color: brandColor }} />,
      title: 'Maintenance Plans',
      description: 'Regular maintenance services to keep your AC running efficiently year-round.',
      features: ['Annual Checkups', 'Filter Changes', 'Coil Cleaning', 'Performance Testing']
    },
    {
      icon: <ThunderboltOutlined style={{ fontSize: '32px', color: brandColor }} />,
      title: '24/7 Emergency Service',
      description: 'Round-the-clock emergency AC repair services for urgent cooling system failures.',
      features: ['Immediate Response', 'Night Service', 'Holiday Coverage', 'Priority Support']
    }
  ];

  const statistics = [
    { value: 20, suffix: '+', title: 'Years Experience', icon: <TrophyOutlined /> },
    { value: 15000, suffix: '+', title: 'ACs Installed', icon: <CheckCircleOutlined /> },
    { value: 2500, suffix: '+', title: 'Happy Customers', icon: <SmileOutlined /> },
    { value: 75, suffix: '+', title: 'Expert Technicians', icon: <TeamOutlined /> }
  ];

  const whyChooseUs = [
    {
      icon: <SafetyCertificateOutlined style={{ fontSize: '28px', color: brandColor }} />,
      title: 'Certified Technicians',
      description: 'EPA certified and trained professionals with expertise in all major AC brands.'
    },
    {
      icon: <CustomerServiceOutlined style={{ fontSize: '28px', color: brandColor }} />,
      title: '24/7 Emergency Service',
      description: 'Available round-the-clock for emergency repairs and urgent cooling system issues.'
    },
    {
      icon: <DollarOutlined style={{ fontSize: '28px', color: brandColor }} />,
      title: 'Affordable Pricing',
      description: 'Transparent pricing with no hidden costs. Get the best value for your money.'
    },
    {
      icon: <CheckCircleOutlined style={{ fontSize: '28px', color: brandColor }} />,
      title: '100% Satisfaction',
      description: 'We guarantee quality workmanship and customer satisfaction on every job.'
    },
    {
      icon: <ClockCircleOutlined style={{ fontSize: '28px', color: brandColor }} />,
      title: 'Same-Day Service',
      description: 'Fast response with same-day service available for most repair requests.'
    },
    {
      icon: <ToolOutlined style={{ fontSize: '28px', color: brandColor }} />,
      title: 'All Brands Serviced',
      description: 'We service and repair all major AC brands and models with genuine parts.'
    }
  ];

  const acBrands = [
    'Carrier', 'Trane', 'Lennox', 'York', 'Rheem', 'Goodman', 'Bryant', 'Daikin',
    'Mitsubishi', 'LG', 'Samsung', 'Fujitsu', 'American Standard', 'Payne'
  ];

  const testimonials = [
    {
      name: 'Robert Wilson',
      rating: 5,
      comment: 'Amazing service! They installed our new AC system quickly and professionally. The house has never been cooler!',
      location: 'Beverly Hills, CA'
    },
    {
      name: 'Jennifer Martinez',
      rating: 5,
      comment: 'Called them for an emergency repair during a heatwave. They came within an hour and fixed the issue. Highly recommend!',
      location: 'Santa Monica, CA'
    },
    {
      name: 'David Anderson',
      rating: 5,
      comment: 'Very professional team. Honest pricing and excellent workmanship. Our commercial HVAC system runs perfectly now.',
      location: 'Pasadena, CA'
    }
  ];

  const handleSubmit = (values) => {
    console.log('Form submitted:', values);
    form.resetFields();
  };

  return (
    <Layout style={{ background: '#fff' }}>
      {/* Floating Call Button */}
      <div
        style={{
          position: 'fixed',
          bottom: '30px',
          right: '30px',
          zIndex: 1000
        }}
      >
        <Button
          type="primary"
          size="large"
          shape="circle"
          icon={<PhoneOutlined style={{ fontSize: '24px' }} />}
          onClick={() => window.location.href = `tel:${phoneNumber}`}
          style={{
            width: '70px',
            height: '70px',
            background: brandColor,
            borderColor: brandColor,
            boxShadow: '0 4px 12px rgba(139, 104, 68, 0.4)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        />
      </div>

      {/* Header */}
      <Header
        style={{
          background: '#fff',
          padding: '0 50px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
          position: 'sticky',
          top: 0,
          zIndex: 1000,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <CloudOutlined style={{ fontSize: '32px', color: brandColor }} />
          <Title level={3} style={{ margin: 0, color: brandColor }}>
            CoolAir Pro
          </Title>
        </div>
        <Menu
          mode="horizontal"
          style={{ border: 'none', background: 'transparent', flex: 1, justifyContent: 'center' }}
          items={[
            { key: 'home', label: 'Home' },
            { key: 'services', label: 'Services' },
            { key: 'about', label: 'About Us' },
            { key: 'contact', label: 'Contact' }
          ]}
        />
        <Button
          type="primary"
          size="large"
          icon={<PhoneOutlined />}
          onClick={() => window.location.href = `tel:${phoneNumber}`}
          style={{
            background: brandColor,
            borderColor: brandColor,
            borderRadius: '6px',
            fontWeight: 500
          }}
        >
          Call Now
        </Button>
      </Header>

      <Content>
        {/* Hero Section */}
        <div
          style={{
            background: `linear-gradient(135deg, ${brandColor}20 0%, ${brandColor}05 100%)`,
            padding: '100px 50px',
            textAlign: 'center',
            position: 'relative',
            overflow: 'hidden'
          }}
        >
          <div
            style={{
              position: 'absolute',
              top: '20px',
              right: '50px',
              fontSize: '200px',
              color: `${brandColor}10`,
              lineHeight: 1
            }}
          >
            <CloudOutlined />
          </div>
          <Row justify="center">
            <Col xs={24} md={20} lg={16}>
              <Badge.Ribbon
                text="24/7 Emergency Service"
                color={brandColor}
                style={{ fontSize: '14px' }}
              >
                <div style={{ paddingTop: '20px' }}>
                  <Title
                    level={1}
                    style={{
                      fontSize: '52px',
                      fontWeight: 700,
                      color: '#1a1a1a',
                      marginBottom: '24px',
                      lineHeight: 1.2
                    }}
                  >
                    Stay Cool with
                    <br />
                    <span style={{ color: brandColor }}>Premium AC Services</span>
                  </Title>
                  <Paragraph
                    style={{
                      fontSize: '18px',
                      color: '#666',
                      marginBottom: '40px',
                      maxWidth: '700px',
                      margin: '0 auto 40px'
                    }}
                  >
                    Expert air conditioning installation, repair, and maintenance services.
                    Serving residential and commercial clients with certified technicians.
                  </Paragraph>
                  <Space size="large" wrap>
                    <Button
                      type="primary"
                      size="large"
                      icon={<PhoneOutlined />}
                      onClick={() => window.location.href = `tel:${phoneNumber}`}
                      style={{
                        background: brandColor,
                        borderColor: brandColor,
                        height: '55px',
                        padding: '0 40px',
                        fontSize: '16px',
                        fontWeight: 500,
                        borderRadius: '8px'
                      }}
                    >
                      Call for Service
                    </Button>
                    <Button
                      size="large"
                      style={{
                        height: '55px',
                        padding: '0 40px',
                        fontSize: '16px',
                        fontWeight: 500,
                        borderRadius: '8px',
                        borderColor: brandColor,
                        color: brandColor
                      }}
                    >
                      Get Free Estimate
                    </Button>
                  </Space>

                  <div style={{ marginTop: '50px' }}>
                    <Space size={40} wrap style={{ justifyContent: 'center' }}>
                      <div style={{ textAlign: 'center' }}>
                        <CheckCircleOutlined style={{ fontSize: '32px', color: brandColor }} />
                        <Text style={{ display: 'block', marginTop: '8px', fontWeight: 500 }}>
                          Licensed & Insured
                        </Text>
                      </div>
                      <div style={{ textAlign: 'center' }}>
                        <SafetyCertificateOutlined style={{ fontSize: '32px', color: brandColor }} />
                        <Text style={{ display: 'block', marginTop: '8px', fontWeight: 500 }}>
                          EPA Certified
                        </Text>
                      </div>
                      <div style={{ textAlign: 'center' }}>
                        <ThunderboltOutlined style={{ fontSize: '32px', color: brandColor }} />
                        <Text style={{ display: 'block', marginTop: '8px', fontWeight: 500 }}>
                          Same-Day Service
                        </Text>
                      </div>
                    </Space>
                  </div>
                </div>
              </Badge.Ribbon>
            </Col>
          </Row>
        </div>

        {/* Statistics Section */}
        <div style={{ background: '#fff', padding: '70px 50px' }}>
          <Row gutter={[32, 32]} justify="center">
            {statistics.map((stat, index) => (
              <Col xs={12} sm={12} md={6} key={index}>
                <Card
                  bordered={false}
                  hoverable
                  style={{
                    textAlign: 'center',
                    background: `${brandColor}05`,
                    borderRadius: '16px',
                    border: `2px solid ${brandColor}15`,
                    transition: 'all 0.3s ease'
                  }}
                  bodyStyle={{ padding: '30px' }}
                >
                  <div style={{ fontSize: '48px', color: brandColor, marginBottom: '12px' }}>
                    {stat.icon}
                  </div>
                  <Statistic
                    value={stat.value}
                    suffix={stat.suffix}
                    valueStyle={{ color: brandColor, fontSize: '38px', fontWeight: 700 }}
                  />
                  <Text style={{ fontSize: '14px', color: '#666', fontWeight: 500 }}>
                    {stat.title}
                  </Text>
                </Card>
              </Col>
            ))}
          </Row>
        </div>

        {/* Services Section */}
        <div style={{ background: '#fafafa', padding: '80px 50px' }}>
          <div style={{ textAlign: 'center', marginBottom: '60px' }}>
            <Title level={2} style={{ color: brandColor, marginBottom: '16px', fontSize: '36px' }}>
              Our AC Services
            </Title>
            <Paragraph style={{ fontSize: '16px', color: '#666', maxWidth: '600px', margin: '0 auto' }}>
              Comprehensive air conditioning solutions for all your cooling needs
            </Paragraph>
          </div>

          <Row gutter={[24, 24]}>
            {services.map((service, index) => (
              <Col xs={24} sm={12} lg={8} key={index}>
                <Card
                  hoverable
                  style={{
                    height: '100%',
                    borderRadius: '16px',
                    border: `2px solid ${brandColor}20`,
                    background: '#fff',
                    transition: 'all 0.3s ease'
                  }}
                  bodyStyle={{ padding: '32px' }}
                >
                  <div
                    style={{
                      width: '70px',
                      height: '70px',
                      background: `${brandColor}10`,
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginBottom: '20px'
                    }}
                  >
                    {service.icon}
                  </div>
                  <Title level={4} style={{ marginBottom: '12px', color: '#1a1a1a', fontSize: '20px' }}>
                    {service.title}
                  </Title>
                  <Paragraph style={{ color: '#666', marginBottom: '24px', fontSize: '14px' }}>
                    {service.description}
                  </Paragraph>
                  <div style={{ marginTop: '20px' }}>
                    {service.features.map((feature, idx) => (
                      <div
                        key={idx}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '10px',
                          marginBottom: '10px'
                        }}
                      >
                        <CheckCircleOutlined style={{ color: brandColor, fontSize: '16px' }} />
                        <Text style={{ fontSize: '14px', color: '#555' }}>{feature}</Text>
                      </div>
                    ))}
                  </div>
                </Card>
              </Col>
            ))}
          </Row>
        </div>

        {/* Why Choose Us Section */}
        <div style={{ background: '#fff', padding: '80px 50px' }}>
          <div style={{ textAlign: 'center', marginBottom: '60px' }}>
            <Title level={2} style={{ color: brandColor, marginBottom: '16px', fontSize: '36px' }}>
              Why Choose CoolAir Pro
            </Title>
            <Paragraph style={{ fontSize: '16px', color: '#666' }}>
              We are committed to providing the best AC services with superior quality
            </Paragraph>
          </div>

          <Row gutter={[32, 32]}>
            {whyChooseUs.map((item, index) => (
              <Col xs={24} sm={12} lg={8} key={index}>
                <Card
                  bordered={false}
                  style={{
                    height: '100%',
                    borderRadius: '16px',
                    background: '#fff',
                    border: `2px solid ${brandColor}15`,
                    textAlign: 'center',
                    transition: 'all 0.3s ease'
                  }}
                  bodyStyle={{ padding: '40px 30px' }}
                  hoverable
                >
                  <div
                    style={{
                      width: '80px',
                      height: '80px',
                      background: `${brandColor}10`,
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      margin: '0 auto 20px'
                    }}
                  >
                    {item.icon}
                  </div>
                  <Title level={4} style={{ marginBottom: '12px', color: '#1a1a1a' }}>
                    {item.title}
                  </Title>
                  <Paragraph style={{ color: '#666', margin: 0 }}>
                    {item.description}
                  </Paragraph>
                </Card>
              </Col>
            ))}
          </Row>
        </div>

        {/* AC Brands Section */}
        <div style={{ background: `${brandColor}05`, padding: '60px 50px' }}>
          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <Title level={3} style={{ color: brandColor, marginBottom: '12px' }}>
              We Service All Major AC Brands
            </Title>
            <Paragraph style={{ fontSize: '15px', color: '#666' }}>
              Expert service and repair for all leading air conditioning manufacturers
            </Paragraph>
          </div>

          <div style={{ textAlign: 'center' }}>
            <Space size={[24, 16]} wrap style={{ justifyContent: 'center' }}>
              {acBrands.map((brand, index) => (
                <div
                  key={index}
                  style={{
                    background: '#fff',
                    padding: '12px 24px',
                    borderRadius: '8px',
                    border: `1px solid ${brandColor}20`,
                    fontSize: '14px',
                    fontWeight: 500,
                    color: '#555'
                  }}
                >
                  {brand}
                </div>
              ))}
            </Space>
          </div>
        </div>

        {/* Testimonials Section */}
        <div style={{ background: '#fff', padding: '80px 50px' }}>
          <div style={{ textAlign: 'center', marginBottom: '60px' }}>
            <Title level={2} style={{ color: brandColor, marginBottom: '16px', fontSize: '36px' }}>
              Customer Reviews
            </Title>
            <Paragraph style={{ fontSize: '16px', color: '#666' }}>
              See what our satisfied customers have to say about our services
            </Paragraph>
          </div>

          <Row gutter={[32, 32]}>
            {testimonials.map((testimonial, index) => (
              <Col xs={24} md={8} key={index}>
                <Card
                  bordered={false}
                  style={{
                    height: '100%',
                    borderRadius: '16px',
                    background: `${brandColor}05`,
                    border: `2px solid ${brandColor}15`
                  }}
                  bodyStyle={{ padding: '35px' }}
                >
                  <Rate
                    disabled
                    defaultValue={testimonial.rating}
                    style={{ fontSize: '18px', color: brandColor, marginBottom: '20px' }}
                  />
                  <Paragraph style={{ margin: '20px 0', fontSize: '15px', color: '#333', lineHeight: 1.7 }}>
                    "{testimonial.comment}"
                  </Paragraph>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginTop: '24px' }}>
                    <Avatar size={52} style={{ background: brandColor, fontSize: '20px' }}>
                      {testimonial.name.charAt(0)}
                    </Avatar>
                    <div>
                      <Text strong style={{ display: 'block', color: '#1a1a1a', fontSize: '15px' }}>
                        {testimonial.name}
                      </Text>
                      <Text style={{ fontSize: '13px', color: '#666' }}>
                        <EnvironmentOutlined style={{ marginRight: '6px' }} />
                        {testimonial.location}
                      </Text>
                    </div>
                  </div>
                </Card>
              </Col>
            ))}
          </Row>
        </div>

        {/* Contact Form Section */}
        <div style={{ background: '#fafafa', padding: '80px 50px' }}>
          <Row gutter={[48, 48]}>
            <Col xs={24} lg={12}>
              <Title level={2} style={{ color: brandColor, marginBottom: '20px', fontSize: '36px' }}>
                Schedule Your AC Service
              </Title>
              <Paragraph style={{ fontSize: '16px', color: '#666', marginBottom: '35px' }}>
                Fill out the form and our team will contact you within 2 hours
              </Paragraph>

              <Form form={form} layout="vertical" onFinish={handleSubmit} size="large">
                <Row gutter={16}>
                  <Col span={12}>
                    <Form.Item
                      name="name"
                      rules={[{ required: true, message: 'Please enter your name' }]}
                    >
                      <Input
                        placeholder="Your Name"
                        style={{ borderRadius: '8px', padding: '12px' }}
                      />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item
                      name="email"
                      rules={[
                        { required: true, message: 'Please enter your email' },
                        { type: 'email', message: 'Please enter a valid email' }
                      ]}
                    >
                      <Input
                        placeholder="Your Email"
                        style={{ borderRadius: '8px', padding: '12px' }}
                      />
                    </Form.Item>
                  </Col>
                </Row>

                <Row gutter={16}>
                  <Col span={12}>
                    <Form.Item
                      name="phone"
                      rules={[{ required: true, message: 'Please enter your phone' }]}
                    >
                      <Input
                        placeholder="Phone Number"
                        style={{ borderRadius: '8px', padding: '12px' }}
                      />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item
                      name="service"
                      rules={[{ required: true, message: 'Please select a service' }]}
                    >
                      <Input
                        placeholder="Service Type"
                        style={{ borderRadius: '8px', padding: '12px' }}
                      />
                    </Form.Item>
                  </Col>
                </Row>

                <Form.Item
                  name="message"
                  rules={[{ required: true, message: 'Please enter your message' }]}
                >
                  <TextArea
                    placeholder="Describe your AC issue or service needs..."
                    rows={5}
                    style={{ borderRadius: '8px', padding: '12px' }}
                  />
                </Form.Item>

                <Form.Item>
                  <Button
                    type="primary"
                    htmlType="submit"
                    size="large"
                    block
                    style={{
                      background: brandColor,
                      borderColor: brandColor,
                      height: '55px',
                      fontSize: '16px',
                      fontWeight: 500,
                      borderRadius: '8px'
                    }}
                  >
                    Request Service
                  </Button>
                </Form.Item>
              </Form>
            </Col>

            <Col xs={24} lg={12}>
              <Card
                bordered={false}
                style={{
                  height: '100%',
                  borderRadius: '16px',
                  background: '#fff',
                  border: `2px solid ${brandColor}15`
                }}
                bodyStyle={{ padding: '45px' }}
              >
                <Title level={3} style={{ color: brandColor, marginBottom: '35px' }}>
                  Contact Information
                </Title>

                <Space direction="vertical" size={28} style={{ width: '100%' }}>
                  <div style={{ display: 'flex', gap: '18px', alignItems: 'flex-start' }}>
                    <div
                      style={{
                        width: '50px',
                        height: '50px',
                        background: `${brandColor}10`,
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0
                      }}
                    >
                      <PhoneOutlined style={{ fontSize: '24px', color: brandColor }} />
                    </div>
                    <div>
                      <Text strong style={{ display: 'block', marginBottom: '6px', fontSize: '15px' }}>
                        Phone Number
                      </Text>
                      <a
                        href={`tel:${phoneNumber}`}
                        style={{ color: '#666', fontSize: '15px', textDecoration: 'none' }}
                      >
                        {phoneDisplay}
                      </a>
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: '18px', alignItems: 'flex-start' }}>
                    <div
                      style={{
                        width: '50px',
                        height: '50px',
                        background: `${brandColor}10`,
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0
                      }}
                    >
                      <MailOutlined style={{ fontSize: '24px', color: brandColor }} />
                    </div>
                    <div>
                      <Text strong style={{ display: 'block', marginBottom: '6px', fontSize: '15px' }}>
                        Email Address
                      </Text>
                      <a
                        href="mailto:info@coolairpro.com"
                        style={{ color: '#666', fontSize: '15px', textDecoration: 'none' }}
                      >
                        info@coolairpro.com
                      </a>
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: '18px', alignItems: 'flex-start' }}>
                    <div
                      style={{
                        width: '50px',
                        height: '50px',
                        background: `${brandColor}10`,
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0
                      }}
                    >
                      <EnvironmentOutlined style={{ fontSize: '24px', color: brandColor }} />
                    </div>
                    <div>
                      <Text strong style={{ display: 'block', marginBottom: '6px', fontSize: '15px' }}>
                        Office Address
                      </Text>
                      <Text style={{ color: '#666', fontSize: '15px', lineHeight: 1.6 }}>
                        456 Cooling Avenue, Suite 200
                        <br />
                        Los Angeles, CA 90001
                      </Text>
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: '18px', alignItems: 'flex-start' }}>
                    <div
                      style={{
                        width: '50px',
                        height: '50px',
                        background: `${brandColor}10`,
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0
                      }}
                    >
                      <ClockCircleOutlined style={{ fontSize: '24px', color: brandColor }} />
                    </div>
                    <div>
                      <Text strong style={{ display: 'block', marginBottom: '6px', fontSize: '15px' }}>
                        Working Hours
                      </Text>
                      <Text style={{ color: '#666', fontSize: '15px', lineHeight: 1.6 }}>
                        Mon - Fri: 7:00 AM - 8:00 PM
                        <br />
                        Sat - Sun: 8:00 AM - 6:00 PM
                      </Text>
                    </div>
                  </div>
                </Space>

                <div
                  style={{
                    marginTop: '40px',
                    padding: '25px',
                    background: `linear-gradient(135deg, ${brandColor}15 0%, ${brandColor}05 100%)`,
                    borderRadius: '12px',
                    border: `2px solid ${brandColor}20`,
                    textAlign: 'center'
                  }}
                >
                  <ThunderboltOutlined style={{ fontSize: '40px', color: brandColor, marginBottom: '12px' }} />
                  <Title level={4} style={{ color: brandColor, marginBottom: '8px' }}>
                    24/7 Emergency Service
                  </Title>
                  <Text style={{ color: '#666', fontSize: '15px' }}>
                    We're available anytime for urgent AC repairs and cooling emergencies
                  </Text>
                </div>
              </Card>
            </Col>
          </Row>
        </div>
      </Content>

      {/* Footer */}
      <Footer
        style={{
          background: '#1a1a1a',
          color: '#fff',
          padding: '60px 50px 30px'
        }}
      >
        <Row gutter={[32, 32]}>
          <Col xs={24} sm={12} md={6}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
              <CloudOutlined style={{ fontSize: '32px', color: brandColor }} />
              <Title level={4} style={{ margin: 0, color: '#fff' }}>
                CoolAir Pro
              </Title>
            </div>
            <Paragraph style={{ color: '#999', fontSize: '14px' }}>
              Professional air conditioning services you can trust. EPA certified technicians
              with 20+ years of experience.
            </Paragraph>
          </Col>

          <Col xs={24} sm={12} md={6}>
            <Title level={5} style={{ color: '#fff', marginBottom: '20px' }}>
              Quick Links
            </Title>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <a href="#" style={{ color: '#999', textDecoration: 'none', fontSize: '14px' }}>Home</a>
              <a href="#" style={{ color: '#999', textDecoration: 'none', fontSize: '14px' }}>About Us</a>
              <a href="#" style={{ color: '#999', textDecoration: 'none', fontSize: '14px' }}>Services</a>
              <a href="#" style={{ color: '#999', textDecoration: 'none', fontSize: '14px' }}>Contact</a>
            </div>
          </Col>

          <Col xs={24} sm={12} md={6}>
            <Title level={5} style={{ color: '#fff', marginBottom: '20px' }}>
              Our Services
            </Title>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <a href="#" style={{ color: '#999', textDecoration: 'none', fontSize: '14px' }}>AC Installation</a>
              <a href="#" style={{ color: '#999', textDecoration: 'none', fontSize: '14px' }}>AC Repair</a>
              <a href="#" style={{ color: '#999', textDecoration: 'none', fontSize: '14px' }}>Maintenance</a>
              <a href="#" style={{ color: '#999', textDecoration: 'none', fontSize: '14px' }}>Emergency Service</a>
            </div>
          </Col>

          <Col xs={24} sm={12} md={6}>
            <Title level={5} style={{ color: '#fff', marginBottom: '20px' }}>
              Contact Us
            </Title>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', color: '#999' }}>
              <a
                href={`tel:${phoneNumber}`}
                style={{ color: '#999', textDecoration: 'none', fontSize: '14px' }}
              >
                {phoneDisplay}
              </a>
              <a
                href="mailto:info@coolairpro.com"
                style={{ color: '#999', textDecoration: 'none', fontSize: '14px' }}
              >
                info@coolairpro.com
              </a>
              <Text style={{ color: '#999', fontSize: '14px' }}>Los Angeles, CA 90001</Text>
            </div>
          </Col>
        </Row>

        <div
          style={{
            borderTop: '1px solid #333',
            marginTop: '50px',
            paddingTop: '30px',
            textAlign: 'center'
          }}
        >
          <Text style={{ color: '#999', fontSize: '14px' }}>
            © 2024 CoolAir Pro. All rights reserved. | Professional AC Services
          </Text>
        </div>
      </Footer>

      <style jsx>{`
        .ant-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 8px 24px rgba(139, 104, 68, 0.15);
        }
      `}</style>
    </Layout>
  );
};

export default ACServiceLanding;