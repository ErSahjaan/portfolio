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
  Rate
} from 'antd';
import {
  ThunderboltOutlined,
  SafetyCertificateOutlined,
  CustomerServiceOutlined,
  ToolOutlined,
  HomeOutlined,
  ShopOutlined,
  CheckCircleOutlined,
  PhoneOutlined,
  MailOutlined,
  EnvironmentOutlined,
  ClockCircleOutlined,
  TeamOutlined,
  TrophyOutlined,
  SmileOutlined,
  MenuOutlined
} from '@ant-design/icons';

const { Header, Content, Footer } = Layout;
const { Title, Text, Paragraph } = Typography;
const { TextArea } = Input;

const ElectricianLanding = () => {
  const [form] = Form.useForm();
  const brandColor = 'rgb(139, 104, 68)';
  const phoneNumber = '+15551234567';
  const phoneDisplay = '+1 (555) 123-4567';

  const services = [
    {
      icon: <HomeOutlined style={{ fontSize: '32px', color: brandColor }} />,
      title: 'Residential Services',
      description: 'Complete electrical solutions for homes including wiring, lighting, and panel upgrades.',
      features: ['Home Wiring', 'Lighting Installation', 'Panel Upgrades', 'Smart Home Setup']
    },
    {
      icon: <ShopOutlined style={{ fontSize: '32px', color: brandColor }} />,
      title: 'Commercial Services',
      description: 'Professional electrical services for businesses, offices, and commercial properties.',
      features: ['Office Wiring', 'Security Systems', 'Emergency Repairs', 'Maintenance Plans']
    },
    {
      icon: <ThunderboltOutlined style={{ fontSize: '32px', color: brandColor }} />,
      title: 'Emergency Services',
      description: '24/7 emergency electrical services for urgent repairs and power restoration.',
      features: ['24/7 Available', 'Quick Response', 'Power Restoration', 'Safety Inspections']
    },
    {
      icon: <ToolOutlined style={{ fontSize: '32px', color: brandColor }} />,
      title: 'Installation & Repair',
      description: 'Expert installation and repair services for all electrical systems and appliances.',
      features: ['Circuit Installation', 'Appliance Repair', 'Outlet Repair', 'Switch Installation']
    }
  ];

  const statistics = [
    { value: 25, suffix: '+', title: 'Years Experience', icon: <TrophyOutlined /> },
    { value: 10000, suffix: '+', title: 'Projects Completed', icon: <CheckCircleOutlined /> },
    { value: 1500, suffix: '+', title: 'Happy Clients', icon: <SmileOutlined /> },
    { value: 50, suffix: '+', title: 'Expert Technicians', icon: <TeamOutlined /> }
  ];

  const whyChooseUs = [
    {
      icon: <SafetyCertificateOutlined style={{ fontSize: '28px', color: brandColor }} />,
      title: 'Licensed & Insured',
      description: 'Fully licensed, bonded, and insured for your protection and peace of mind.'
    },
    {
      icon: <CustomerServiceOutlined style={{ fontSize: '28px', color: brandColor }} />,
      title: '24/7 Support',
      description: 'Round-the-clock emergency services and customer support whenever you need us.'
    },
    {
      icon: <CheckCircleOutlined style={{ fontSize: '28px', color: brandColor }} />,
      title: 'Quality Guaranteed',
      description: 'We stand behind our work with comprehensive warranties and satisfaction guarantee.'
    },
    {
      icon: <ClockCircleOutlined style={{ fontSize: '28px', color: brandColor }} />,
      title: 'Fast Response',
      description: 'Quick response times with same-day service available for urgent requests.'
    }
  ];

  const testimonials = [
    {
      name: 'John Miller',
      rating: 5,
      comment: 'Excellent service! They rewired my entire house efficiently and professionally. Highly recommended!',
      location: 'Los Angeles, CA'
    },
    {
      name: 'Emily Davis',
      rating: 5,
      comment: 'Very responsive and professional. Fixed our electrical issue quickly. Great work!',
      location: 'San Diego, CA'
    },
    {
      name: 'Michael Brown',
      rating: 5,
      comment: 'Outstanding service! The team was professional, clean, and very knowledgeable.',
      location: 'San Francisco, CA'
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
          <ThunderboltOutlined style={{ fontSize: '32px', color: brandColor }} />
          <Title level={3} style={{ margin: 0, color: brandColor }}>
            ElectroPro
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
            background: `linear-gradient(135deg, ${brandColor}15 0%, ${brandColor}05 100%)`,
            padding: '80px 50px',
            textAlign: 'center'
          }}
        >
          <Row justify="center">
            <Col xs={24} md={20} lg={16}>
              <Title
                level={1}
                style={{
                  fontSize: '48px',
                  fontWeight: 700,
                  color: '#1a1a1a',
                  marginBottom: '24px'
                }}
              >
                We Build Quality
                <br />
                <span style={{ color: brandColor }}>Electrical Solutions</span>
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
                Professional electrical services for residential and commercial properties.
                Licensed, insured, and trusted by thousands of satisfied customers.
              </Paragraph>
              <Space size="large">
                <Button
                  type="primary"
                  size="large"
                  style={{
                    background: brandColor,
                    borderColor: brandColor,
                    height: '50px',
                    padding: '0 40px',
                    fontSize: '16px',
                    fontWeight: 500,
                    borderRadius: '6px'
                  }}
                >
                  Get Free Quote
                </Button>
                <Button
                  size="large"
                  style={{
                    height: '50px',
                    padding: '0 40px',
                    fontSize: '16px',
                    fontWeight: 500,
                    borderRadius: '6px',
                    borderColor: brandColor,
                    color: brandColor
                  }}
                >
                  Our Services
                </Button>
              </Space>
            </Col>
          </Row>
        </div>

        {/* Statistics Section */}
        <div style={{ background: '#fff', padding: '60px 50px' }}>
          <Row gutter={[32, 32]} justify="center">
            {statistics.map((stat, index) => (
              <Col xs={12} sm={12} md={6} key={index}>
                <Card
                  bordered={false}
                  style={{
                    textAlign: 'center',
                    background: `${brandColor}05`,
                    borderRadius: '12px',
                    border: `1px solid ${brandColor}15`
                  }}
                >
                  <div style={{ fontSize: '40px', color: brandColor, marginBottom: '12px' }}>
                    {stat.icon}
                  </div>
                  <Statistic
                    value={stat.value}
                    suffix={stat.suffix}
                    valueStyle={{ color: brandColor, fontSize: '36px', fontWeight: 700 }}
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
          <div style={{ textAlign: 'center', marginBottom: '50px' }}>
            <Title level={2} style={{ color: brandColor, marginBottom: '12px' }}>
              Our Electrical Services
            </Title>
            <Paragraph style={{ fontSize: '16px', color: '#666' }}>
              We offer cost-efficient and reliable electrical services for all your needs
            </Paragraph>
          </div>

          <Row gutter={[24, 24]}>
            {services.map((service, index) => (
              <Col xs={24} sm={12} lg={6} key={index}>
                <Card
                  hoverable
                  style={{
                    height: '100%',
                    borderRadius: '12px',
                    border: `1px solid ${brandColor}20`,
                    background: '#fff'
                  }}
                  bodyStyle={{ padding: '30px' }}
                >
                  <div style={{ marginBottom: '20px' }}>
                    {service.icon}
                  </div>
                  <Title level={4} style={{ marginBottom: '12px', color: '#1a1a1a' }}>
                    {service.title}
                  </Title>
                  <Paragraph style={{ color: '#666', marginBottom: '20px' }}>
                    {service.description}
                  </Paragraph>
                  <div style={{ marginTop: '20px' }}>
                    {service.features.map((feature, idx) => (
                      <div
                        key={idx}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '8px',
                          marginBottom: '8px'
                        }}
                      >
                        <CheckCircleOutlined style={{ color: brandColor, fontSize: '14px' }} />
                        <Text style={{ fontSize: '13px', color: '#666' }}>{feature}</Text>
                      </div>
                    ))}
                  </div>
                </Card>
              </Col>
            ))}
          </Row>
        </div>

        {/* About Section */}
        <div style={{ background: '#fff', padding: '80px 50px' }}>
          <Row gutter={[48, 48]} align="middle">
            <Col xs={24} lg={12}>
              <div
                style={{
                  background: `linear-gradient(135deg, ${brandColor}20 0%, ${brandColor}10 100%)`,
                  borderRadius: '16px',
                  padding: '40px',
                  height: '400px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <ThunderboltOutlined style={{ fontSize: '120px', color: brandColor }} />
              </div>
            </Col>
            <Col xs={24} lg={12}>
              <Title level={2} style={{ color: brandColor, marginBottom: '20px' }}>
                Providing High Quality
                <br />
                Electrical Solutions
              </Title>
              <Paragraph style={{ fontSize: '16px', color: '#666', marginBottom: '24px' }}>
                With over 25 years of experience in the electrical industry, we have built a
                reputation for delivering exceptional service and quality workmanship. Our team
                of licensed electricians is committed to providing safe, reliable, and efficient
                electrical solutions for both residential and commercial clients.
              </Paragraph>
              <Paragraph style={{ fontSize: '16px', color: '#666', marginBottom: '30px' }}>
                We use only the highest quality materials and latest technology to ensure your
                electrical systems are safe, efficient, and built to last. Customer satisfaction
                is our top priority, and we stand behind every job we complete.
              </Paragraph>
              <Row gutter={[16, 16]}>
                <Col span={12}>
                  <CheckCircleOutlined style={{ color: brandColor, marginRight: '8px' }} />
                  <Text style={{ color: '#333', fontWeight: 500 }}>Licensed Professionals</Text>
                </Col>
                <Col span={12}>
                  <CheckCircleOutlined style={{ color: brandColor, marginRight: '8px' }} />
                  <Text style={{ color: '#333', fontWeight: 500 }}>Quality Materials</Text>
                </Col>
                <Col span={12}>
                  <CheckCircleOutlined style={{ color: brandColor, marginRight: '8px' }} />
                  <Text style={{ color: '#333', fontWeight: 500 }}>Affordable Pricing</Text>
                </Col>
                <Col span={12}>
                  <CheckCircleOutlined style={{ color: brandColor, marginRight: '8px' }} />
                  <Text style={{ color: '#333', fontWeight: 500 }}>100% Satisfaction</Text>
                </Col>
              </Row>
            </Col>
          </Row>
        </div>

        {/* Why Choose Us Section */}
        <div style={{ background: '#fafafa', padding: '80px 50px' }}>
          <div style={{ textAlign: 'center', marginBottom: '50px' }}>
            <Title level={2} style={{ color: brandColor, marginBottom: '12px' }}>
              Why Choose Us
            </Title>
            <Paragraph style={{ fontSize: '16px', color: '#666' }}>
              We are committed to providing the best electrical services in the industry
            </Paragraph>
          </div>

          <Row gutter={[24, 24]}>
            {whyChooseUs.map((item, index) => (
              <Col xs={24} sm={12} lg={6} key={index}>
                <Card
                  bordered={false}
                  style={{
                    height: '100%',
                    borderRadius: '12px',
                    background: '#fff',
                    border: `1px solid ${brandColor}15`,
                    textAlign: 'center'
                  }}
                  bodyStyle={{ padding: '30px' }}
                >
                  <div style={{ marginBottom: '16px' }}>
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

        {/* Testimonials Section */}
        <div style={{ background: '#fff', padding: '80px 50px' }}>
          <div style={{ textAlign: 'center', marginBottom: '50px' }}>
            <Title level={2} style={{ color: brandColor, marginBottom: '12px' }}>
              What Our Clients Say
            </Title>
            <Paragraph style={{ fontSize: '16px', color: '#666' }}>
              Don't just take our word for it - hear from our satisfied customers
            </Paragraph>
          </div>

          <Row gutter={[24, 24]}>
            {testimonials.map((testimonial, index) => (
              <Col xs={24} md={8} key={index}>
                <Card
                  bordered={false}
                  style={{
                    height: '100%',
                    borderRadius: '12px',
                    background: `${brandColor}05`,
                    border: `1px solid ${brandColor}15`
                  }}
                  bodyStyle={{ padding: '30px' }}
                >
                  <Rate disabled defaultValue={testimonial.rating} style={{ fontSize: '16px', color: brandColor }} />
                  <Paragraph style={{ margin: '20px 0', fontSize: '15px', color: '#333' }}>
                    "{testimonial.comment}"
                  </Paragraph>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <Avatar size={48} style={{ background: brandColor }}>
                      {testimonial.name.charAt(0)}
                    </Avatar>
                    <div>
                      <Text strong style={{ display: 'block', color: '#1a1a1a' }}>
                        {testimonial.name}
                      </Text>
                      <Text style={{ fontSize: '13px', color: '#666' }}>
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
              <Title level={2} style={{ color: brandColor, marginBottom: '20px' }}>
                Get A Free Quote
              </Title>
              <Paragraph style={{ fontSize: '16px', color: '#666', marginBottom: '30px' }}>
                Fill out the form and our team will get back to you within 24 hours
              </Paragraph>

              <Form form={form} layout="vertical" onFinish={handleSubmit}>
                <Row gutter={16}>
                  <Col span={12}>
                    <Form.Item
                      name="name"
                      rules={[{ required: true, message: 'Please enter your name' }]}
                    >
                      <Input
                        placeholder="Your Name"
                        size="large"
                        style={{ borderRadius: '6px' }}
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
                        size="large"
                        style={{ borderRadius: '6px' }}
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
                        size="large"
                        style={{ borderRadius: '6px' }}
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
                        size="large"
                        style={{ borderRadius: '6px' }}
                      />
                    </Form.Item>
                  </Col>
                </Row>

                <Form.Item
                  name="message"
                  rules={[{ required: true, message: 'Please enter your message' }]}
                >
                  <TextArea
                    placeholder="Tell us about your project..."
                    rows={4}
                    style={{ borderRadius: '6px' }}
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
                      height: '50px',
                      fontSize: '16px',
                      fontWeight: 500,
                      borderRadius: '6px'
                    }}
                  >
                    Send Message
                  </Button>
                </Form.Item>
              </Form>
            </Col>

            <Col xs={24} lg={12}>
              <Card
                bordered={false}
                style={{
                  height: '100%',
                  borderRadius: '12px',
                  background: '#fff',
                  border: `1px solid ${brandColor}15`
                }}
                bodyStyle={{ padding: '40px' }}
              >
                <Title level={3} style={{ color: brandColor, marginBottom: '30px' }}>
                  Contact Information
                </Title>

                <Space direction="vertical" size={24} style={{ width: '100%' }}>
                  <div style={{ display: 'flex', gap: '16px' }}>
                    <PhoneOutlined style={{ fontSize: '24px', color: brandColor }} />
                    <div>
                      <Text strong style={{ display: 'block', marginBottom: '4px' }}>
                        Phone Number
                      </Text>
                      <a href={`tel:${phoneNumber}`} style={{ color: '#666', textDecoration: 'none' }}>
                        {phoneDisplay}
                      </a>
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: '16px' }}>
                    <MailOutlined style={{ fontSize: '24px', color: brandColor }} />
                    <div>
                      <Text strong style={{ display: 'block', marginBottom: '4px' }}>
                        Email Address
                      </Text>
                      <a href="mailto:info@electropro.com" style={{ color: '#666', textDecoration: 'none' }}>
                        info@electropro.com
                      </a>
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: '16px' }}>
                    <EnvironmentOutlined style={{ fontSize: '24px', color: brandColor }} />
                    <div>
                      <Text strong style={{ display: 'block', marginBottom: '4px' }}>
                        Office Address
                      </Text>
                      <Text style={{ color: '#666' }}>
                        123 Business Avenue, Suite 100
                        <br />
                        Los Angeles, CA 90001
                      </Text>
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: '16px' }}>
                    <ClockCircleOutlined style={{ fontSize: '24px', color: brandColor }} />
                    <div>
                      <Text strong style={{ display: 'block', marginBottom: '4px' }}>
                        Working Hours
                      </Text>
                      <Text style={{ color: '#666' }}>
                        Mon - Fri: 8:00 AM - 6:00 PM
                        <br />
                        Sat - Sun: 9:00 AM - 4:00 PM
                      </Text>
                    </div>
                  </div>
                </Space>

                <div
                  style={{
                    marginTop: '40px',
                    padding: '20px',
                    background: `${brandColor}05`,
                    borderRadius: '8px',
                    border: `1px solid ${brandColor}15`,
                    textAlign: 'center'
                  }}
                >
                  <Title level={4} style={{ color: brandColor, marginBottom: '8px' }}>
                    24/7 Emergency Service
                  </Title>
                  <Text style={{ color: '#666' }}>
                    Available round the clock for urgent electrical issues
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
          padding: '50px 50px 30px'
        }}
      >
        <Row gutter={[32, 32]}>
          <Col xs={24} sm={12} md={6}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
              <ThunderboltOutlined style={{ fontSize: '28px', color: brandColor }} />
              <Title level={4} style={{ margin: 0, color: '#fff' }}>
                ElectroPro
              </Title>
            </div>
            <Paragraph style={{ color: '#999' }}>
              Professional electrical services you can trust. Licensed, insured, and committed to excellence.
            </Paragraph>
          </Col>

          <Col xs={24} sm={12} md={6}>
            <Title level={5} style={{ color: '#fff', marginBottom: '20px' }}>
              Quick Links
            </Title>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <a href="#" style={{ color: '#999' }}>Home</a>
              <a href="#" style={{ color: '#999' }}>About Us</a>
              <a href="#" style={{ color: '#999' }}>Services</a>
              <a href="#" style={{ color: '#999' }}>Contact</a>
            </div>
          </Col>

          <Col xs={24} sm={12} md={6}>
            <Title level={5} style={{ color: '#fff', marginBottom: '20px' }}>
              Our Services
            </Title>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <a href="#" style={{ color: '#999' }}>Residential</a>
              <a href="#" style={{ color: '#999' }}>Commercial</a>
              <a href="#" style={{ color: '#999' }}>Emergency</a>
              <a href="#" style={{ color: '#999' }}>Installation</a>
            </div>
          </Col>

          <Col xs={24} sm={12} md={6}>
            <Title level={5} style={{ color: '#fff', marginBottom: '20px' }}>
              Contact Us
            </Title>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', color: '#999' }}>
              <a href={`tel:${phoneNumber}`} style={{ color: '#999', textDecoration: 'none' }}>
                {phoneDisplay}
              </a>
              <a href="mailto:info@electropro.com" style={{ color: '#999', textDecoration: 'none' }}>
                info@electropro.com
              </a>
              <Text style={{ color: '#999' }}>Los Angeles, CA 90001</Text>
            </div>
          </Col>
        </Row>

        <div
          style={{
            borderTop: '1px solid #333',
            marginTop: '40px',
            paddingTop: '30px',
            textAlign: 'center'
          }}
        >
          <Text style={{ color: '#999' }}>
            © 2024 ElectroPro. All rights reserved. | Designed with care
          </Text>
        </div>
      </Footer>
    </Layout>
  );
};

export default ElectricianLanding;