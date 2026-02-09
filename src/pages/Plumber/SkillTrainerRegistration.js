import React, { useState } from 'react';
import {
  Layout,
  Steps,
  Button,
  Form,
  Input,
  Select,
  Upload,
  Card,
  Row,
  Col,
  Typography,
  Space,
  Checkbox,
  DatePicker,
  InputNumber,
  message,
  Radio,
  Tag,
  Avatar,
  Progress,
  Alert,
  TimePicker,
  Rate
} from 'antd';
import {
  UserOutlined,
  IdcardOutlined,
  TrophyOutlined,
  FileTextOutlined,
  CalendarOutlined,
  DollarOutlined,
  CheckCircleOutlined,
  UploadOutlined,
  PlusOutlined,
  ClockCircleOutlined,
  MailOutlined,
  PhoneOutlined,
  EnvironmentOutlined,
  SafetyCertificateOutlined,
  BookOutlined,
  TeamOutlined,
  StarOutlined,
  RightOutlined
} from '@ant-design/icons';

const { Header, Content } = Layout;
const { Title, Text, Paragraph } = Typography;
const { TextArea } = Input;
const { Option } = Select;

const SkillTrainerRegistration = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [form] = Form.useForm();
  const brandColor = 'rgb(139, 104, 68)';
  
  const [formData, setFormData] = useState({
    // Personal Info
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    dateOfBirth: null,
    gender: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    profilePhoto: null,
    
    // Professional Details
    profession: '',
    specialization: [],
    yearsOfExperience: 0,
    expertise: [],
    bio: '',
    languages: [],
    
    // Qualifications
    education: [],
    certifications: [],
    awards: [],
    
    // Experience
    workExperience: [],
    trainingSessions: 0,
    studentsTotal: 0,
    
    // Availability & Pricing
    availability: {
      monday: { available: false, slots: [] },
      tuesday: { available: false, slots: [] },
      wednesday: { available: false, slots: [] },
      thursday: { available: false, slots: [] },
      friday: { available: false, slots: [] },
      saturday: { available: false, slots: [] },
      sunday: { available: false, slots: [] }
    },
    hourlyRate: 0,
    sessionTypes: [],
    
    // Documents
    resume: null,
    certificates: [],
    idProof: null,
    
    // Terms
    agreeToTerms: false
  });

  const steps = [
    { title: 'Personal Info', icon: <UserOutlined /> },
    { title: 'Professional', icon: <IdcardOutlined /> },
    { title: 'Qualifications', icon: <TrophyOutlined /> },
    { title: 'Experience', icon: <FileTextOutlined /> },
    { title: 'Availability', icon: <CalendarOutlined /> },
    { title: 'Documents', icon: <UploadOutlined /> },
    { title: 'Review', icon: <CheckCircleOutlined /> }
  ];

  const skillCategories = [
    'Programming & Development',
    'Design & Creative',
    'Business & Management',
    'Marketing & Sales',
    'Health & Fitness',
    'Music & Arts',
    'Language Learning',
    'Photography & Video',
    'Personal Development',
    'Technology & IT'
  ];

  const languages = ['English', 'Spanish', 'French', 'German', 'Mandarin', 'Hindi', 'Arabic'];

  const sessionTypes = ['One-on-One', 'Group Sessions', 'Workshop', 'Online', 'In-Person'];

  const handleNext = async () => {
    try {
      await form.validateFields();
      setCurrentStep(currentStep + 1);
      window.scrollTo(0, 0);
    } catch (error) {
      message.error('Please fill in all required fields');
    }
  };

  const handlePrevious = () => {
    setCurrentStep(currentStep - 1);
    window.scrollTo(0, 0);
  };

  const handleSubmit = () => {
    setCurrentStep(currentStep + 1);
    window.scrollTo(0, 0);
  };

  // Page 0: Personal Information
  const renderPersonalInfo = () => (
    <Card
      title={
        <Space>
          <UserOutlined style={{ color: brandColor, fontSize: '24px' }} />
          <Title level={4} style={{ margin: 0 }}>Personal Information</Title>
        </Space>
      }
      style={{ borderRadius: '12px', border: `1px solid ${brandColor}20` }}
    >
      <Form form={form} layout="vertical" size="large">
        <Row gutter={16}>
          <Col span={24} style={{ textAlign: 'center', marginBottom: '24px' }}>
            <Upload
              listType="picture-circle"
              maxCount={1}
              beforeUpload={() => false}
            >
              <div>
                <PlusOutlined style={{ fontSize: '32px', color: brandColor }} />
                <div style={{ marginTop: 8 }}>Upload Photo</div>
              </div>
            </Upload>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col xs={24} md={12}>
            <Form.Item
              label="First Name"
              name="firstName"
              rules={[{ required: true, message: 'Please enter your first name' }]}
            >
              <Input prefix={<UserOutlined style={{ color: brandColor }} />} placeholder="John" />
            </Form.Item>
          </Col>
          <Col xs={24} md={12}>
            <Form.Item
              label="Last Name"
              name="lastName"
              rules={[{ required: true, message: 'Please enter your last name' }]}
            >
              <Input prefix={<UserOutlined style={{ color: brandColor }} />} placeholder="Doe" />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col xs={24} md={12}>
            <Form.Item
              label="Email Address"
              name="email"
              rules={[
                { required: true, message: 'Please enter your email' },
                { type: 'email', message: 'Please enter a valid email' }
              ]}
            >
              <Input prefix={<MailOutlined style={{ color: brandColor }} />} placeholder="john@example.com" />
            </Form.Item>
          </Col>
          <Col xs={24} md={12}>
            <Form.Item
              label="Phone Number"
              name="phone"
              rules={[{ required: true, message: 'Please enter your phone number' }]}
            >
              <Input prefix={<PhoneOutlined style={{ color: brandColor }} />} placeholder="+1 (555) 123-4567" />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col xs={24} md={12}>
            <Form.Item
              label="Date of Birth"
              name="dateOfBirth"
              rules={[{ required: true, message: 'Please select your date of birth' }]}
            >
              <DatePicker style={{ width: '100%' }} />
            </Form.Item>
          </Col>
          <Col xs={24} md={12}>
            <Form.Item
              label="Gender"
              name="gender"
              rules={[{ required: true, message: 'Please select your gender' }]}
            >
              <Select placeholder="Select Gender">
                <Option value="male">Male</Option>
                <Option value="female">Female</Option>
                <Option value="other">Other</Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>

        <Form.Item
          label="Street Address"
          name="address"
          rules={[{ required: true, message: 'Please enter your address' }]}
        >
          <Input prefix={<EnvironmentOutlined style={{ color: brandColor }} />} placeholder="123 Main Street" />
        </Form.Item>

        <Row gutter={16}>
          <Col xs={24} md={8}>
            <Form.Item
              label="City"
              name="city"
              rules={[{ required: true, message: 'Please enter your city' }]}
            >
              <Input placeholder="Los Angeles" />
            </Form.Item>
          </Col>
          <Col xs={24} md={8}>
            <Form.Item
              label="State"
              name="state"
              rules={[{ required: true, message: 'Please select your state' }]}
            >
              <Select placeholder="Select State">
                <Option value="CA">California</Option>
                <Option value="NY">New York</Option>
                <Option value="TX">Texas</Option>
                <Option value="FL">Florida</Option>
              </Select>
            </Form.Item>
          </Col>
          <Col xs={24} md={8}>
            <Form.Item
              label="ZIP Code"
              name="zipCode"
              rules={[{ required: true, message: 'Please enter your ZIP code' }]}
            >
              <Input placeholder="90001" />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Card>
  );

  // Page 1: Professional Details
  const renderProfessionalDetails = () => (
    <Card
      title={
        <Space>
          <IdcardOutlined style={{ color: brandColor, fontSize: '24px' }} />
          <Title level={4} style={{ margin: 0 }}>Professional Details</Title>
        </Space>
      }
      style={{ borderRadius: '12px', border: `1px solid ${brandColor}20` }}
    >
      <Form form={form} layout="vertical" size="large">
        <Form.Item
          label="Primary Profession"
          name="profession"
          rules={[{ required: true, message: 'Please enter your profession' }]}
        >
          <Input placeholder="e.g., Software Developer, Yoga Instructor, Business Coach" />
        </Form.Item>

        <Form.Item
          label="Skill Categories"
          name="specialization"
          rules={[{ required: true, message: 'Please select at least one category' }]}
        >
          <Select
            mode="multiple"
            placeholder="Select your skill categories"
            style={{ width: '100%' }}
          >
            {skillCategories.map((category) => (
              <Option key={category} value={category}>
                {category}
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          label="Specific Skills/Expertise"
          name="expertise"
          rules={[{ required: true, message: 'Please add your skills' }]}
        >
          <Select
            mode="tags"
            placeholder="Type and press Enter to add skills (e.g., Python, React, Yoga)"
            style={{ width: '100%' }}
          />
        </Form.Item>

        <Form.Item
          label="Years of Experience"
          name="yearsOfExperience"
          rules={[{ required: true, message: 'Please enter your years of experience' }]}
        >
          <InputNumber
            min={0}
            max={50}
            style={{ width: '100%' }}
            placeholder="Years of experience in your field"
          />
        </Form.Item>

        <Form.Item
          label="Languages You Can Teach In"
          name="languages"
          rules={[{ required: true, message: 'Please select at least one language' }]}
        >
          <Select
            mode="multiple"
            placeholder="Select languages"
            style={{ width: '100%' }}
          >
            {languages.map((lang) => (
              <Option key={lang} value={lang}>
                {lang}
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          label="Professional Bio"
          name="bio"
          rules={[
            { required: true, message: 'Please write your bio' },
            { min: 100, message: 'Bio should be at least 100 characters' }
          ]}
        >
          <TextArea
            rows={6}
            placeholder="Tell us about yourself, your teaching philosophy, and what makes you a great trainer..."
            showCount
            maxLength={1000}
          />
        </Form.Item>
      </Form>
    </Card>
  );

  // Page 2: Qualifications
  const renderQualifications = () => (
    <Card
      title={
        <Space>
          <TrophyOutlined style={{ color: brandColor, fontSize: '24px' }} />
          <Title level={4} style={{ margin: 0 }}>Qualifications & Certifications</Title>
        </Space>
      }
      style={{ borderRadius: '12px', border: `1px solid ${brandColor}20` }}
    >
      <Alert
        message="Add your educational background, certifications, and awards to build credibility"
        type="info"
        showIcon
        style={{ marginBottom: '24px' }}
      />

      <Form form={form} layout="vertical" size="large">
        <Title level={5} style={{ color: brandColor, marginBottom: '16px' }}>
          <BookOutlined /> Education
        </Title>
        <Card style={{ marginBottom: '24px', background: `${brandColor}05` }}>
          <Form.Item label="Highest Degree" name="degree">
            <Input placeholder="e.g., Bachelor's in Computer Science" />
          </Form.Item>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label="Institution" name="institution">
                <Input placeholder="University Name" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Year of Graduation" name="graduationYear">
                <DatePicker picker="year" style={{ width: '100%' }} />
              </Form.Item>
            </Col>
          </Row>
        </Card>

        <Title level={5} style={{ color: brandColor, marginBottom: '16px' }}>
          <SafetyCertificateOutlined /> Certifications
        </Title>
        <Card style={{ marginBottom: '24px', background: `${brandColor}05` }}>
          <Form.Item label="Certification Name" name="certificationName">
            <Input placeholder="e.g., Certified Yoga Instructor" />
          </Form.Item>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label="Issuing Organization" name="issuingOrg">
                <Input placeholder="Organization Name" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Year Obtained" name="certYear">
                <DatePicker picker="year" style={{ width: '100%' }} />
              </Form.Item>
            </Col>
          </Row>
          <Button
            type="dashed"
            icon={<PlusOutlined />}
            block
            style={{ borderColor: brandColor, color: brandColor }}
          >
            Add Another Certification
          </Button>
        </Card>

        <Title level={5} style={{ color: brandColor, marginBottom: '16px' }}>
          <StarOutlined /> Awards & Recognition
        </Title>
        <Form.Item name="awards">
          <TextArea
            rows={4}
            placeholder="List any awards, recognitions, or notable achievements..."
          />
        </Form.Item>
      </Form>
    </Card>
  );

  // Page 3: Experience
  const renderExperience = () => (
    <Card
      title={
        <Space>
          <FileTextOutlined style={{ color: brandColor, fontSize: '24px' }} />
          <Title level={4} style={{ margin: 0 }}>Teaching & Work Experience</Title>
        </Space>
      }
      style={{ borderRadius: '12px', border: `1px solid ${brandColor}20` }}
    >
      <Form form={form} layout="vertical" size="large">
        <Title level={5} style={{ color: brandColor, marginBottom: '16px' }}>
          Work Experience
        </Title>
        <Card style={{ marginBottom: '24px', background: `${brandColor}05` }}>
          <Form.Item label="Job Title" name="jobTitle">
            <Input placeholder="e.g., Senior Developer" />
          </Form.Item>
          <Form.Item label="Company/Organization" name="company">
            <Input placeholder="Company Name" />
          </Form.Item>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label="Start Date" name="startDate">
                <DatePicker style={{ width: '100%' }} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="End Date" name="endDate">
                <DatePicker style={{ width: '100%' }} placeholder="Present if current" />
              </Form.Item>
            </Col>
          </Row>
          <Form.Item label="Key Responsibilities" name="responsibilities">
            <TextArea
              rows={4}
              placeholder="Describe your key responsibilities and achievements..."
            />
          </Form.Item>
          <Button
            type="dashed"
            icon={<PlusOutlined />}
            block
            style={{ borderColor: brandColor, color: brandColor }}
          >
            Add Another Experience
          </Button>
        </Card>

        <Title level={5} style={{ color: brandColor, marginBottom: '16px' }}>
          Training Statistics
        </Title>
        <Row gutter={16}>
          <Col xs={24} md={12}>
            <Form.Item
              label="Total Training Sessions Conducted"
              name="trainingSessions"
              rules={[{ required: true, message: 'Please enter number of sessions' }]}
            >
              <InputNumber
                min={0}
                style={{ width: '100%' }}
                placeholder="Number of sessions you've conducted"
              />
            </Form.Item>
          </Col>
          <Col xs={24} md={12}>
            <Form.Item
              label="Total Students Taught"
              name="studentsTotal"
              rules={[{ required: true, message: 'Please enter number of students' }]}
            >
              <InputNumber
                min={0}
                style={{ width: '100%' }}
                placeholder="Total students you've trained"
              />
            </Form.Item>
          </Col>
        </Row>

        <Form.Item label="Teaching Philosophy" name="teachingPhilosophy">
          <TextArea
            rows={5}
            placeholder="Describe your approach to teaching and training..."
          />
        </Form.Item>
      </Form>
    </Card>
  );

  // Page 4: Availability & Pricing
  const renderAvailability = () => (
    <Card
      title={
        <Space>
          <CalendarOutlined style={{ color: brandColor, fontSize: '24px' }} />
          <Title level={4} style={{ margin: 0 }}>Availability & Pricing</Title>
        </Space>
      }
      style={{ borderRadius: '12px', border: `1px solid ${brandColor}20` }}
    >
      <Form form={form} layout="vertical" size="large">
        <Title level={5} style={{ color: brandColor, marginBottom: '16px' }}>
          <ClockCircleOutlined /> Weekly Availability
        </Title>
        <Alert
          message="Select the days and times you're available for training sessions"
          type="info"
          showIcon
          style={{ marginBottom: '20px' }}
        />

        {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map((day) => (
          <Card
            key={day}
            style={{
              marginBottom: '16px',
              background: `${brandColor}05`,
              border: `1px solid ${brandColor}15`
            }}
          >
            <Row gutter={16} align="middle">
              <Col span={6}>
                <Checkbox>{day}</Checkbox>
              </Col>
              <Col span={18}>
                <Space>
                  <TimePicker format="HH:mm" placeholder="Start Time" />
                  <Text>to</Text>
                  <TimePicker format="HH:mm" placeholder="End Time" />
                  <Button
                    type="link"
                    icon={<PlusOutlined />}
                    style={{ color: brandColor }}
                  >
                    Add Slot
                  </Button>
                </Space>
              </Col>
            </Row>
          </Card>
        ))}

        <Title level={5} style={{ color: brandColor, marginTop: '32px', marginBottom: '16px' }}>
          <DollarOutlined /> Pricing
        </Title>
        <Row gutter={16}>
          <Col xs={24} md={12}>
            <Form.Item
              label="Hourly Rate (USD)"
              name="hourlyRate"
              rules={[{ required: true, message: 'Please enter your hourly rate' }]}
            >
              <InputNumber
                min={0}
                prefix="$"
                style={{ width: '100%' }}
                placeholder="50"
              />
            </Form.Item>
          </Col>
          <Col xs={24} md={12}>
            <Form.Item
              label="Session Types Offered"
              name="sessionTypes"
              rules={[{ required: true, message: 'Please select session types' }]}
            >
              <Select
                mode="multiple"
                placeholder="Select session types"
                style={{ width: '100%' }}
              >
                {sessionTypes.map((type) => (
                  <Option key={type} value={type}>
                    {type}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
        </Row>

        <Form.Item label="Special Offers or Packages" name="specialOffers">
          <TextArea
            rows={3}
            placeholder="Describe any package deals or special pricing (e.g., 10% off for 5+ sessions)..."
          />
        </Form.Item>
      </Form>
    </Card>
  );

  // Page 5: Documents Upload
  const renderDocuments = () => (
    <Card
      title={
        <Space>
          <UploadOutlined style={{ color: brandColor, fontSize: '24px' }} />
          <Title level={4} style={{ margin: 0 }}>Upload Documents</Title>
        </Space>
      }
      style={{ borderRadius: '12px', border: `1px solid ${brandColor}20` }}
    >
      <Alert
        message="Upload required documents to verify your credentials"
        type="warning"
        showIcon
        style={{ marginBottom: '24px' }}
      />

      <Form form={form} layout="vertical" size="large">
        <Form.Item
          label="Resume/CV"
          name="resume"
          rules={[{ required: true, message: 'Please upload your resume' }]}
        >
          <Upload
            beforeUpload={() => false}
            maxCount={1}
            accept=".pdf,.doc,.docx"
          >
            <Button icon={<UploadOutlined />} style={{ borderColor: brandColor, color: brandColor }}>
              Upload Resume (PDF, DOC, DOCX)
            </Button>
          </Upload>
        </Form.Item>

        <Form.Item
          label="Certificates & Credentials"
          name="certificates"
        >
          <Upload
            beforeUpload={() => false}
            multiple
            accept=".pdf,.jpg,.jpeg,.png"
            listType="picture"
          >
            <Button icon={<UploadOutlined />} style={{ borderColor: brandColor, color: brandColor }}>
              Upload Certificates (PDF, JPG, PNG)
            </Button>
          </Upload>
        </Form.Item>

        <Form.Item
          label="Government ID Proof"
          name="idProof"
          rules={[{ required: true, message: 'Please upload your ID proof' }]}
          extra="For verification purposes. Your information will be kept secure."
        >
          <Upload
            beforeUpload={() => false}
            maxCount={1}
            accept=".pdf,.jpg,.jpeg,.png"
            listType="picture"
          >
            <Button icon={<UploadOutlined />} style={{ borderColor: brandColor, color: brandColor }}>
              Upload ID (PDF, JPG, PNG)
            </Button>
          </Upload>
        </Form.Item>

        <Form.Item
          label="Professional Portfolio/Website Link (Optional)"
          name="portfolioLink"
        >
          <Input placeholder="https://yourwebsite.com" />
        </Form.Item>

        <Form.Item
          label="LinkedIn Profile (Optional)"
          name="linkedinProfile"
        >
          <Input placeholder="https://linkedin.com/in/yourprofile" />
        </Form.Item>
      </Form>
    </Card>
  );

  // Page 6: Review & Submit
  const renderReview = () => (
    <Card
      title={
        <Space>
          <CheckCircleOutlined style={{ color: brandColor, fontSize: '24px' }} />
          <Title level={4} style={{ margin: 0 }}>Review Your Information</Title>
        </Space>
      }
      style={{ borderRadius: '12px', border: `1px solid ${brandColor}20` }}
    >
      <Alert
        message="Please review all information before submitting"
        type="info"
        showIcon
        style={{ marginBottom: '24px' }}
      />

      {/* Personal Info Summary */}
      <Card
        title="Personal Information"
        style={{ marginBottom: '16px', background: `${brandColor}05` }}
        extra={<Button type="link" onClick={() => setCurrentStep(0)}>Edit</Button>}
      >
        <Row gutter={[16, 8]}>
          <Col span={12}><Text strong>Name:</Text> John Doe</Col>
          <Col span={12}><Text strong>Email:</Text> john@example.com</Col>
          <Col span={12}><Text strong>Phone:</Text> +1 (555) 123-4567</Col>
          <Col span={12}><Text strong>Location:</Text> Los Angeles, CA</Col>
        </Row>
      </Card>

      {/* Professional Summary */}
      <Card
        title="Professional Details"
        style={{ marginBottom: '16px', background: `${brandColor}05` }}
        extra={<Button type="link" onClick={() => setCurrentStep(1)}>Edit</Button>}
      >
        <Row gutter={[16, 8]}>
          <Col span={24}><Text strong>Profession:</Text> Software Developer</Col>
          <Col span={24}>
            <Text strong>Skills:</Text>
            <div style={{ marginTop: '8px' }}>
              <Tag color={brandColor}>Python</Tag>
              <Tag color={brandColor}>React</Tag>
              <Tag color={brandColor}>Node.js</Tag>
            </div>
          </Col>
          <Col span={24}><Text strong>Experience:</Text> 8 years</Col>
        </Row>
      </Card>

      {/* Qualifications Summary */}
      <Card
        title="Qualifications"
        style={{ marginBottom: '16px', background: `${brandColor}05` }}
        extra={<Button type="link" onClick={() => setCurrentStep(2)}>Edit</Button>}
      >
        <Row gutter={[16, 8]}>
          <Col span={24}><Text strong>Degree:</Text> Bachelor's in Computer Science</Col>
          <Col span={24}><Text strong>Certifications:</Text> AWS Certified, Scrum Master</Col>
        </Row>
      </Card>

      {/* Pricing Summary */}
      <Card
        title="Availability & Pricing"
        style={{ marginBottom: '16px', background: `${brandColor}05` }}
        extra={<Button type="link" onClick={() => setCurrentStep(4)}>Edit</Button>}
      >
        <Row gutter={[16, 8]}>
          <Col span={12}><Text strong>Hourly Rate:</Text> $75/hour</Col>
          <Col span={12}><Text strong>Session Types:</Text> One-on-One, Online</Col>
        </Row>
      </Card>

      <Form.Item
        name="agreeToTerms"
        valuePropName="checked"
        rules={[
          {
            validator: (_, value) =>
              value ? Promise.resolve() : Promise.reject(new Error('Please accept the terms')),
          },
        ]}
      >
        <Checkbox>
          I agree to the <a href="#" style={{ color: brandColor }}>Terms & Conditions</a> and{' '}
          <a href="#" style={{ color: brandColor }}>Privacy Policy</a>
        </Checkbox>
      </Form.Item>
    </Card>
  );

  // Page 7: Success Page
  const renderSuccess = () => (
    <div style={{ textAlign: 'center', padding: '60px 20px' }}>
      <div
        style={{
          width: '120px',
          height: '120px',
          background: `${brandColor}15`,
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 32px'
        }}
      >
        <CheckCircleOutlined style={{ fontSize: '64px', color: brandColor }} />
      </div>
      <Title level={2} style={{ color: brandColor, marginBottom: '16px' }}>
        Application Submitted Successfully!
      </Title>
      <Paragraph style={{ fontSize: '16px', color: '#666', marginBottom: '32px', maxWidth: '600px', margin: '0 auto' }}>
        Thank you for registering as a skill trainer. Your application is under review.
        We'll notify you via email within 2-3 business days.
      </Paragraph>

      <Card
        style={{
          maxWidth: '500px',
          margin: '40px auto',
          background: `${brandColor}05`,
          border: `2px solid ${brandColor}20`
        }}
      >
        <Title level={4} style={{ color: brandColor, marginBottom: '20px' }}>
          What's Next?
        </Title>
        <Space direction="vertical" size={16} style={{ width: '100%', textAlign: 'left' }}>
          <div style={{ display: 'flex', gap: '12px' }}>
            <CheckCircleOutlined style={{ color: brandColor, fontSize: '20px', marginTop: '4px' }} />
            <div>
              <Text strong>Email Verification</Text>
              <br />
              <Text type="secondary">Check your email and verify your account</Text>
            </div>
          </div>
          <div style={{ display: 'flex', gap: '12px' }}>
            <CheckCircleOutlined style={{ color: brandColor, fontSize: '20px', marginTop: '4px' }} />
            <div>
              <Text strong>Application Review</Text>
              <br />
              <Text type="secondary">Our team will review your credentials</Text>
            </div>
          </div>
          <div style={{ display: 'flex', gap: '12px' }}>
            <CheckCircleOutlined style={{ color: brandColor, fontSize: '20px', marginTop: '4px' }} />
            <div>
              <Text strong>Profile Activation</Text>
              <br />
              <Text type="secondary">Once approved, your profile will go live</Text>
            </div>
          </div>
          <div style={{ display: 'flex', gap: '12px' }}>
            <CheckCircleOutlined style={{ color: brandColor, fontSize: '20px', marginTop: '4px' }} />
            <div>
              <Text strong>Start Training</Text>
              <br />
              <Text type="secondary">Begin receiving session requests from students</Text>
            </div>
          </div>
        </Space>
      </Card>

      <Space size="large" style={{ marginTop: '40px' }}>
        <Button
          type="primary"
          size="large"
          style={{
            background: brandColor,
            borderColor: brandColor,
            height: '50px',
            padding: '0 40px'
          }}
        >
          Go to Dashboard
        </Button>
        <Button
          size="large"
          style={{
            height: '50px',
            padding: '0 40px',
            borderColor: brandColor,
            color: brandColor
          }}
        >
          View Application Status
        </Button>
      </Space>
    </div>
  );

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 0:
        return renderPersonalInfo();
      case 1:
        return renderProfessionalDetails();
      case 2:
        return renderQualifications();
      case 3:
        return renderExperience();
      case 4:
        return renderAvailability();
      case 5:
        return renderDocuments();
      case 6:
        return renderReview();
      case 7:
        return renderSuccess();
      default:
        return renderPersonalInfo();
    }
  };

  return (
    <Layout style={{ background: '#fafafa', minHeight: '100vh' }}>
      <Header
        style={{
          background: '#fff',
          padding: '0 50px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <TeamOutlined style={{ fontSize: '32px', color: brandColor }} />
          <Title level={3} style={{ margin: 0, color: brandColor }}>
            SkillHub
          </Title>
        </div>
        <Text style={{ color: '#666' }}>Become a Trainer</Text>
      </Header>

      <Content style={{ padding: '40px 50px', maxWidth: '1200px', margin: '0 auto', width: '100%' }}>
        {currentStep < 7 && (
          <>
            {/* Progress Header */}
            <Card
              style={{
                marginBottom: '32px',
                borderRadius: '12px',
                background: `linear-gradient(135deg, ${brandColor}15 0%, ${brandColor}05 100%)`,
                border: `1px solid ${brandColor}20`
              }}
            >
              <Row align="middle" gutter={[16, 16]}>
                <Col xs={24} md={16}>
                  <Title level={4} style={{ margin: 0, color: brandColor }}>
                    Trainer Registration
                  </Title>
                  <Text style={{ color: '#666' }}>
                    Step {currentStep + 1} of {steps.length}
                  </Text>
                </Col>
                <Col xs={24} md={8}>
                  <Progress
                    percent={Math.round(((currentStep + 1) / steps.length) * 100)}
                    strokeColor={brandColor}
                    style={{ margin: 0 }}
                  />
                </Col>
              </Row>
            </Card>

            {/* Steps */}
            <Card style={{ marginBottom: '32px', borderRadius: '12px' }}>
              <Steps current={currentStep} labelPlacement="vertical">
                {steps.map((step, index) => (
                  <Steps.Step
                    key={index}
                    title={step.title}
                    icon={
                      <div
                        style={{
                          fontSize: '24px',
                          color: currentStep >= index ? brandColor : '#ccc'
                        }}
                      >
                        {step.icon}
                      </div>
                    }
                  />
                ))}
              </Steps>
            </Card>
          </>
        )}

        {/* Current Step Content */}
        {renderCurrentStep()}

        {/* Navigation Buttons */}
        {currentStep < 7 && (
          <Card style={{ marginTop: '24px', borderRadius: '12px' }}>
            <Row justify="space-between">
              <Col>
                {currentStep > 0 && (
                  <Button
                    size="large"
                    onClick={handlePrevious}
                    style={{ height: '45px', padding: '0 32px' }}
                  >
                    Previous
                  </Button>
                )}
              </Col>
              <Col>
                {currentStep < 6 ? (
                  <Button
                    type="primary"
                    size="large"
                    onClick={handleNext}
                    icon={<RightOutlined />}
                    iconPosition="end"
                    style={{
                      background: brandColor,
                      borderColor: brandColor,
                      height: '45px',
                      padding: '0 32px'
                    }}
                  >
                    Continue
                  </Button>
                ) : (
                  <Button
                    type="primary"
                    size="large"
                    onClick={handleSubmit}
                    icon={<CheckCircleOutlined />}
                    style={{
                      background: brandColor,
                      borderColor: brandColor,
                      height: '45px',
                      padding: '0 32px'
                    }}
                  >
                    Submit Application
                  </Button>
                )}
              </Col>
            </Row>
          </Card>
        )}
      </Content>

      <style jsx>{`
        .ant-steps-item-finish .ant-steps-item-icon {
          background-color: ${brandColor} !important;
          border-color: ${brandColor} !important;
        }
        .ant-steps-item-finish .ant-steps-item-icon > .ant-steps-icon {
          color: #fff !important;
        }
        .ant-steps-item-process .ant-steps-item-icon {
          background-color: ${brandColor} !important;
          border-color: ${brandColor} !important;
        }
        .ant-progress-bg {
          background-color: ${brandColor} !important;
        }
      `}</style>
    </Layout>
  );
};

export default SkillTrainerRegistration;