import { useRef, useState } from 'react';
import { Button, Form, Input, Modal, Popconfirm, Popover, Space } from 'antd';
import { CheckCircleOutlined, InfoCircleOutlined, SendOutlined } from '@ant-design/icons';
import { jsPDF } from 'jspdf';
import { projectConcepts } from './projectConcepts';

export const profileRole = 'Full-Stack Developer';
export const coreSkills = ['Java', 'Spring Boot', 'React.js'];
export const additionalSkills = ['AI Integration'];
export const profileSummary = 'Full-stack developer with three years of experience building web applications with Java, Spring Boot, and React.js.';
export const work = {
  title: 'Software Engineer (Full Stack)',
  company: 'Fuel Signal Inc',
  companyLocation: 'Houston, Texas, United States',
  workArrangement: 'Remote',
  period: 'January 2023 - Present',
  duration: '3 years of experience',
  project: 'Healthcare application workflows',
  achievements: [
    'Developed React.js screens for patient intake and practice workflows.',
    'Built and maintained Java and Spring Boot features for full-stack applications.',
    'Connected frontend forms and screens to backend application workflows.',
  ],
  technologies: coreSkills,
};
export const degree = { degree: 'B.Tech in Computer Science & Engineering', school: 'Vidya Vihar Institute of Technology, Purnea', year: '2023', score: '8.0 CGPA' };
export const certifications = [
  'HIPAA Compliance Training - Healthcare Data Security and Privacy',
  'Full Stack Developer Training - MERN Stack Specialization',
  'React & Data Structures & Algorithms Certification',
];

function publishedResume(profile) {
  return {
    name: profile.name,
    role: profile.role,
    contact: [profile.location, profile.phone, profile.email].filter(Boolean).join(' | '),
    links: ['https://www.linkedin.com/in/er-md-sahjaan-4a33b1247', profile.website].join('\n'),
    summary: profileSummary,
    skills: [...coreSkills, ...additionalSkills].join(', '),
    experience: [
      [work.title, work.company, work.period].join(' | '),
      [work.companyLocation, work.workArrangement].join(' | '),
      ...work.achievements.map(line => '- ' + line),
    ].join('\n'),
    projects: projectConcepts.map(project => [
      project.title,
      '- ' + project.desc,
      ...project.details.map(detail => '- ' + detail),
    ].join('\n')).join('\n\n'),
    education: [degree.degree, degree.school, degree.year].join(' | '),
    certifications: certifications.join('\n'),
  };
}

function blocks(resume, customFields = []) {
  const header = [
    { text: resume.name, size: 22, bold: true, gap: 0 },
    { text: resume.role, size: 12, bold: true, gap: 4 },
    ...[resume.contact, resume.links].filter(value => value.trim()).map(text => ({ text, size: 10, gap: 4 })),
  ];
  for (const [key, title] of [['summary', 'Professional Summary'], ['skills', 'Technical Skills'], ['experience', 'Work Experience'], ['projects', 'Projects'], ['education', 'Education'], ['certifications', 'Certifications'], ['achievements', 'Achievements'], ['languages', 'Languages']]) {
    if (resume[key]?.trim()) header.push({ text: title, size: 12, bold: true, gap: 13, section: true }, { text: resume[key], size: 10.5, gap: 4 });
  }
  for (const { label, value } of customFields) {
    if (label.trim() && value.trim()) {
      header.push({ text: label.trim(), size: 12, bold: true, gap: 13, section: true }, { text: value.trim(), size: 10.5, gap: 4 });
    }
  }
  return header.filter(block => block.text.trim());
}

const resumeTemplates = [
  { id: 'classic', name: 'Classic', description: 'A simple, traditional layout', font: 'helvetica', color: '#20252e', margin: 48, nameSize: 22 },
  { id: 'modern', name: 'Modern', description: 'Blue section headings and a compact layout', font: 'helvetica', color: '#204e87', margin: 40, nameSize: 26 },
  { id: 'editorial', name: 'Editorial', description: 'Serif typography and generous margins', font: 'times', color: '#503c52', margin: 54, nameSize: 27 },
  { id: 'centered', name: 'Centered', description: 'Centered introduction and teal headings', font: 'helvetica', color: '#1d6259', margin: 48, nameSize: 25 },
  { id: 'studio', name: 'Studio', description: 'Plum serif headings with compact margins', font: 'times', color: '#723752', margin: 40, nameSize: 29 },
  { id: 'slate', name: 'Slate', description: 'Slate headings and understated typography', font: 'helvetica', color: '#34445b', margin: 54, nameSize: 19 },
  { id: 'evergreen', name: 'Evergreen', description: 'Forest green headings and a centered opening', font: 'times', color: '#265744', margin: 52, nameSize: 28, centered: true },
  { id: 'signal', name: 'Signal', description: 'Warm rust headings and monospaced type', font: 'courier', color: '#873e29', margin: 44, nameSize: 25 },
];

function writePdf(content, filename, template, photo) {
  const normalized = content.map(block => ({ ...block, text: block.text.trim().replace(/[–—]/g, '-').replace(/[‘’]/g, "'").replace(/[“”]/g, '"').replace(/•/g, '-') }));
  // eslint-disable-next-line no-control-regex -- allow whitespace and characters supported by Helvetica
  if (normalized.some(block => /[^\u0009\u000a\u000d\u0020-\u007e\u00a0-\u00ff]/.test(block.text))) {
    throw new Error('Use TXT to keep characters outside the PDF font’s supported character set.');
  }
  const pdf = new jsPDF({ unit: 'pt', format: 'a4' });
  pdf.setProperties({ title: normalized[0].text + ' - Resume' });
  const margin = template.margin;
  const width = pdf.internal.pageSize.getWidth() - margin * 2;
  const limit = pdf.internal.pageSize.getHeight() - margin;
  let y = margin;
  const photoSize = 52;
  if (photo) pdf.addImage(photo, 'JPEG', margin + width - photoSize, y, photoSize, photoSize);
  let inHeader = true;
  for (const block of normalized) {
    if (block.section && inHeader) {
      inHeader = false;
      if (photo) y = Math.max(y, margin + photoSize);
    }
    const headerWidth = inHeader && photo ? width - photoSize - 14 : width;
    const centered = inHeader && (template.centered || template.id === 'centered');
    pdf.setFont(template.font, block.bold ? 'bold' : 'normal');
    pdf.setTextColor(block.section || block.size === 22 ? template.color : '#20252e');
    const size = block.size === 22 ? template.nameSize : block.size;
    pdf.setFontSize(size);
    const step = size * 1.3;
    if (y + block.gap + step + (block.section ? 18 : 0) > limit) {
      pdf.addPage();
      y = margin;
    } else y += block.gap;
    const lines = block.text.split(/\r?\n/).flatMap(line => pdf.splitTextToSize(line || ' ', headerWidth));
    for (const line of lines) {
      if (y + step > limit) {
        pdf.addPage();
        y = margin;
      }
      pdf.text(line, centered ? margin + headerWidth / 2 : margin, y, { baseline: 'top', align: centered ? 'center' : 'left' });
      y += step;
    }
  }
  pdf.save(filename + '.pdf');
}

function writeText(content, filename) {
  const url = URL.createObjectURL(new Blob([content.map(block => block.text.trim()).join('\n\n') + '\n'], { type: 'text/plain;charset=utf-8' }));
  const link = document.createElement('a');
  link.href = url;
  link.download = filename + '.txt';
  link.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

const fields = [
  ['name', 'Full name'], ['role', 'Target role'], ['contact', 'Contact information'],
  ['links', 'Professional links', 3], ['summary', 'Professional summary', 3],
  ['skills', 'Technical skills', 2], ['experience', 'Work experience', 6],
  ['projects', 'Projects', 8],
  ['education', 'Education', 2],
  ['certifications', 'Certifications', 3],
  ['achievements', 'Achievements', 3],
  ['languages', 'Languages', 2],
];

const blankResume = () => Object.fromEntries(fields.map(([key]) => [key, '']));
const sampleResume = {
  name: 'Taylor Bennett',
  role: 'Full-Stack Software Developer',
  contact: 'Austin, TX | taylor.bennett@example.com | +1 (512) 555-0142',
  links: 'https://example.com/taylor-bennett',
  summary: 'Full-stack software developer with three years of experience building internal products with Java, Spring Boot, React, and PostgreSQL. Develops REST APIs and accessible interfaces for service operations and inventory teams. Writes automated tests and supports releases through code review, CI, and issue triage.',
  skills: [
    'Languages: Java, JavaScript, TypeScript, SQL, HTML, CSS',
    'Backend: Spring Boot, Spring Data JPA, REST APIs, PostgreSQL',
    'Frontend: React, React Router, form validation, responsive design',
    'Testing and delivery: JUnit 5, Mockito, React Testing Library, Maven, Git, Docker',
  ].join('\n'),
  experience: [
    'Software Developer | Blue Mesa Tools (Fictional) | Austin, TX | August 2023 - Present',
    '- Built Spring Boot endpoints for creating, assigning, filtering, and closing service requests. Documented request and error responses for frontend developers.',
    '- Developed React dashboards and accessible forms with validation, loading, empty, and error states so operators could track requests and recover from failed actions.',
    '- Added PostgreSQL migrations, indexes, and paginated queries for request and inventory search.',
    '- Wrote JUnit integration tests for status transitions, invalid inputs, and role-based access. Added React Testing Library coverage for key form interactions.',
    '- Reviewed pull requests, maintained build checks, and helped reproduce and verify fixes for release defects.',
  ].join('\n'),
  projects: [
    'Service Request Dashboard | React, TypeScript, Spring Boot, PostgreSQL',
    '- Built a product for a fictional facilities team to submit maintenance requests, assign technicians, and track work through completion.',
    '- Implemented searchable work queues, status history, and separate requester and coordinator views. Tested the request-to-close workflow end to end.',
    '',
    'Inventory Search API | Java, Spring Boot, PostgreSQL, JUnit',
    '- Built a paginated REST API for filtering inventory by availability, category, and location. Documented filters and response examples for client developers.',
    '- Added database indexes and integration tests for combined filters, empty results, and invalid query parameters.',
  ].join('\n'),
  education: 'Bachelor of Science (B.S.) in Computer Science | Example State University (Fictional) | Austin, TX | May 2023',
  certifications: '',
};

const galleryResume = {
  ...sampleResume,
  languages: 'English (native)',
};

const galleryCandidates = {
  studio: {
    photo: 'https://randomuser.me/api/portraits/women/44.jpg',
    resume: {
      name: 'Amelia Carter', role: 'Product Designer',
      contact: 'Brooklyn, NY | amelia.carter@example.com',
      summary: 'Product designer focused on onboarding and self-service tools for small businesses. Partners with engineering and support to identify where customers get stuck, test prototypes, and prepare designs for development.',
      skills: 'Product design: Interaction design, wireframing, prototyping\nResearch: Interviews, usability testing, journey mapping\nTools: Figma, FigJam, design systems, accessibility reviews',
      experience: 'Product Designer | Linden Studio (Fictional) | 2022 - Present\n- Mapped onboarding steps and tested prototypes with business owners.',
      projects: 'Merchant Onboarding\n- Designed a setup checklist, progress cues, and error recovery for incomplete business profiles.\n- Tested the flow with six fictional participants and revised confusing labels before handoff.\n\nBilling Settings\n- Prototyped invoice search and payment-method updates for account admins.',
      education: 'B.F.A. in Interaction Design | Example Arts College | 2022',
      achievements: 'Created a design review checklist covering keyboard navigation, contrast, and form errors.',
      languages: 'English (native)',
    },
  },
  slate: {
    photo: 'https://randomuser.me/api/portraits/men/32.jpg',
    resume: {
      name: 'Marcus Reed', role: 'Data Analyst',
      contact: 'Chicago, IL | marcus.reed@example.com',
      summary: 'Data analyst who helps logistics teams investigate delivery delays and monitor service levels. Builds reporting datasets, validates source records, and explains findings to warehouse and dispatch teams.',
      skills: 'Analysis: SQL, Python, pandas, Excel\nReporting: Power BI, dashboard design, KPI definitions\nData quality: Reconciliation, validation rules, anomaly review',
      experience: 'Data Analyst | Cedarline Logistics (Fictional) | 2023 - Present\n- Created dashboards for shipment delays and added checks for missing records.',
      projects: 'Delivery Exceptions Dashboard\n- Grouped delayed shipments by route and cause with drill-down to individual shipments.\n- Added refresh checks for late files and duplicate shipment IDs.\n\nWeekly Capacity Review\n- Compared planned volumes with historical demand and documented assumptions for dispatch leads.',
      education: 'B.S. in Statistics | Example State University | 2023',
      achievements: 'Standardized delay categories and documented how service-level measures are calculated.',
      languages: 'English (native)',
    },
  },
  evergreen: {
    photo: 'https://randomuser.me/api/portraits/women/68.jpg',
    resume: {
      name: 'Nina Patel', role: 'Project Coordinator',
      contact: 'Seattle, WA | nina.patel@example.com',
      summary: 'Project coordinator supporting software releases across engineering, design, and customer support. Tracks milestones and dependencies, prepares stakeholder updates, and follows up on decisions before launch.',
      skills: 'Delivery: Sprint planning, dependency tracking, release coordination\nCommunication: Status reporting, meeting facilitation, decision logs\nTools: Jira, Confluence, Excel',
      experience: 'Project Coordinator | Broadleaf Systems (Fictional) | 2022 - Present\n- Tracked launch dependencies and prepared weekly delivery updates.',
      projects: 'Release Readiness Checklist\n- Documented owners, approvals, rollback steps, and release-day contacts.\n- Piloted the checklist with two fictional delivery teams and revised it after retrospectives.\n\nMilestone Tracker\n- Created a shared tracker for dependencies, decisions, deadlines, and follow-up actions.',
      education: 'B.A. in Business Administration | Example State University | 2022',
      achievements: 'Introduced a weekly risk review with named owners and due dates for open issues.',
      languages: 'English (native), Hindi (conversational)',
    },
  },
  signal: {
    photo: 'https://randomuser.me/api/portraits/men/75.jpg',
    resume: {
      name: 'Leo Morales', role: 'Frontend Developer',
      contact: 'Denver, CO | leo.morales@example.com',
      summary: 'Frontend developer building responsive React applications for customer portals. Works with designers and API engineers to ship reusable interfaces, accessible forms, and reliable loading and error states.',
      skills: 'Frontend: React, TypeScript, HTML, CSS, responsive layouts\nQuality: Playwright, React Testing Library, accessibility checks\nTools: Storybook, Git',
      experience: 'Frontend Developer | Mesa Pixel (Fictional) | 2023 - Present\n- Built form components and tested keyboard navigation across key flows.',
      projects: 'Component Library\n- Built reusable inputs, alerts, and dialogs with keyboard and focus support.\n- Documented error, loading, and empty states in Storybook.\n\nCustomer Settings Portal\n- Connected React forms to account APIs and added tests for validation and failed saves.',
      education: 'B.S. in Computer Science | Example Tech University | 2023',
      achievements: 'Added keyboard navigation checks to the pull request workflow for core form components.',
      languages: 'English (fluent), Spanish (native)',
    },
  },
};

function templateSample(templateId) {
  return { ...blankResume(), ...(galleryCandidates[templateId]?.resume || sampleResume) };
}

function ResumeWritingAssistant({ photo, photoLoading, photoError, uploadPhoto, close }) {
  const [selectedPhoto, setSelectedPhoto] = useState(photo);
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState('');

  async function send({ email, phone, request }) {
    if (sending || sent || photoLoading) return;
    setError('');
    if (!selectedPhoto) return setError('Upload a profile photo first.');
    if (!request.trim()) return setError('Describe what you want included.');
    setSending(true);
    try {
      const response = await fetch('/api/portfolio', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'resume-request', email: email.trim(), phone: phone.trim(), request: request.trim(), deliverable: 'both', photo: selectedPhoto.src }),
      });
      const data = await response.json();
      if (!response.ok || !data.sent) throw new Error(data.error || 'The request could not be sent. Try again.');
      setSent(true);
    } catch (failure) {
      setError(failure instanceof SyntaxError ? 'The email service is unavailable. Try again later.' : failure.message);
    } finally {
      setSending(false);
    }
  }

  return (
    <Modal open width="100%" className="resume-editor-dialog resume-writing-dialog" title="AI Assistant"
      onCancel={sending ? undefined : close} closable={!sending} keyboard={!sending} maskClosable={false} footer={null}>
      {sent ? <section className="resume-writing-result" role="status">
        <CheckCircleOutlined aria-hidden="true" />
        <h2>Request received</h2>
        <p>A résumé specialist will review your request and email your finished ATS-friendly résumé and portfolio link when they’re ready.</p>
        <Button onClick={close}>Back to résumé</Button>
      </section> : <Form layout="vertical" disabled={sending} onFinish={send}>
        <div className="resume-writing-grid">
          <section className="resume-writing-panel" aria-labelledby="resume-writing-contact-heading">
            <h2 id="resume-writing-contact-heading">Profile Contact Info</h2>
            <Form.Item name="email" label="Email" rules={[{ required: true, type: 'email', message: 'Enter a valid email address.' }]}>
              <Input type="email" autoComplete="email" maxLength={160} placeholder="name@example.com" />
            </Form.Item>
            <Form.Item name="phone" label="Phone" rules={[{ required: true, whitespace: true, message: 'Enter your phone number.' }]}>
              <Input type="tel" autoComplete="tel" maxLength={40} placeholder="+1 (555) 123-4567" />
            </Form.Item>
            <Form.Item label="Profile Photo" required htmlFor="resume-writing-photo" extra="JPEG, PNG, or WebP, up to 8 MB.">
              <input id="resume-writing-photo" type="file" accept="image/jpeg,image/png,image/webp" disabled={photoLoading || sending}
                onChange={event => uploadPhoto(event, setSelectedPhoto)} />
              {selectedPhoto && <figure className="resume-request-photo">
                <img src={selectedPhoto.src} alt="Selected profile portrait" />
                <figcaption role="status">Photo ready to send</figcaption>
              </figure>}
              {photoError && <p className="resume-builder-error" role="alert">{photoError}</p>}
            </Form.Item>
          </section>
          <section className="resume-writing-panel" aria-label="Request details">
            <p className="resume-deliverable-summary">ATS-friendly résumé + portfolio link</p>
            <Form.Item name="request" label="What should we include?" rules={[{ required: true, whitespace: true, message: 'Describe what you want included.' }]}>
              <Input.TextArea rows={7} maxLength={6000} showCount
                placeholder="I need an ATS-friendly résumé for a full-stack developer role. Please highlight my experience, relevant skills, measurable achievements, and education." />
            </Form.Item>
            {error && <p className="resume-builder-error" role="alert">{error}</p>}
            <Button type="primary" htmlType="submit" icon={<SendOutlined />} loading={sending} disabled={photoLoading}>Send</Button>
          </section>
        </div>
      </Form>}
    </Modal>
  );
}
const defaultCrop = { horizontal: 50, vertical: 50, zoom: 100 };

function photoBounds(photo, crop) {
  const size = Math.min(photo.width, photo.height) * 100 / crop.zoom;
  return { size, x: (photo.width - size) * crop.horizontal / 100, y: (photo.height - size) * crop.vertical / 100 };
}

function ResumePhoto({ photo, crop }) {
  const { size, x, y } = photoBounds(photo, crop);
  return <div className="resume-preview-photo"><img src={photo.src} alt="Profile portrait" style={{
    width: photo.width / size * 100 + '%',
    left: -x / size * 100 + '%',
    top: -y / size * 100 + '%',
  }} /></div>;
}

async function croppedPhoto(photo, crop) {
  const image = new Image();
  image.src = photo.src;
  await image.decode();
  const { size, x, y } = photoBounds(photo, crop);
  const canvas = document.createElement('canvas');
  canvas.width = canvas.height = 256;
  canvas.getContext('2d').drawImage(image, x, y, size, size, 0, 0, 256, 256);
  return canvas.toDataURL('image/jpeg', .88);
}

function ResumePreview({ resume, watermark, customFields, template, photo, crop }) {
  const content = blocks(resume, customFields);
  const headerEnd = content.findIndex(block => block.section);
  return (
    <article className={watermark ? 'resume-builder-preview published-resume-preview' : 'resume-builder-preview'} data-template={template?.id} aria-label="Resume text preview">
      {watermark && (
        <div className="published-resume-watermark" aria-hidden="true">
          {[0, 1, 2, 3].map(row => <span key={row}>{watermark}</span>)}
        </div>
      )}
      <h2>Resume preview</h2>
      {photo && <ResumePhoto photo={photo} crop={crop} />}
      {!content.length && <p>Your resume appears here as you fill in the fields.</p>}
      {content.map((block, index) => {
        const Tag = block.bold ? 'h3' : 'p';
        const style = block.size === 22 ? 'resume-preview-name' : block.section ? 'resume-preview-section' : '';
        return <Tag key={index} className={style} data-resume-header={headerEnd === -1 || index < headerEnd}>{block.text}</Tag>;
      })}
    </article>
  );
}

export function PublishedResume({ profile, close }) {
  const subject = encodeURIComponent('Request a copy of your resume');
  const message = encodeURIComponent('Hello,\n\nMay I have a copy of your resume?\n\nMy name and organization:\nReason for the request:\n\nThank you.');

  return (
    <Modal
      className="portfolio-form-dialog"
      open
      title={profile.name + ' | Resume'}
      onCancel={close}
      width={720}
      footer={
        <Space wrap>
          <Button onClick={close}>Close preview</Button>
          <Button type="primary" href={`mailto:${profile.email}?subject=${subject}&body=${message}`}>Request a copy</Button>
        </Space>
      }
    >
      <p>This resume is view-only. To request a copy, send an email for the owner to review.</p>
      <ResumePreview resume={publishedResume(profile)} watermark={profile.name + ' · VIEW ONLY'} />
    </Modal>
  );
}

export default function ResumeBuilder({ initialDraft, close, openPortfolioBuilder }) {
  const [template, setTemplate] = useState(() => resumeTemplates.find(option => option.id === initialDraft?.templateId) || resumeTemplates[0]);
  const [pendingTemplate, setPendingTemplate] = useState(null);
  const [writingAssistantOpen, setWritingAssistantOpen] = useState(false);
  const [mobilePane, setMobilePane] = useState('edit');
  const [useTemplateSample, setUseTemplateSample] = useState(false);
  const [sampleTemplateId, setSampleTemplateId] = useState(initialDraft?.sampleTemplateId || 'classic');
  const [resume, setResume] = useState(() => ({ ...blankResume(), ...(initialDraft?.resume ?? templateSample(sampleTemplateId)) }));
  const [photo, setPhoto] = useState(() => typeof initialDraft?.photo === 'string'
    ? { src: initialDraft.photo, width: 256, height: 256 }
    : initialDraft?.photo || null);
  const [crop, setCrop] = useState(initialDraft?.crop || defaultCrop);
  const [photoLoading, setPhotoLoading] = useState(false);
  const [photoError, setPhotoError] = useState('');
  const [isSample, setIsSample] = useState(initialDraft?.isSample ?? true);
  const [error, setError] = useState('');
  const [customFields, setCustomFields] = useState(initialDraft?.customFields ?? []);
  const nextCustomId = useRef(Math.max(0, ...customFields.map(field => field.id)) + 1);
  const baseline = isSample ? templateSample(sampleTemplateId) : blankResume();
  const draftChanged = Boolean(photo) || customFields.length > 0 || fields.some(([key]) => resume[key] !== baseline[key]);
  const samplePortrait = galleryCandidates[sampleTemplateId]?.photo || 'https://randomuser.me/api/portraits/men/11.jpg';
  const previewPhoto = photo || (isSample && resume.name === baseline.name
    ? { src: samplePortrait, width: 128, height: 128 }
    : null);

  function startDraft(sample, templateId = template.id) {
    setResume(sample ? templateSample(templateId) : blankResume());
    setSampleTemplateId(templateId);
    setPhoto('');
    setPhotoError('');
    setCustomFields([]);
    setIsSample(sample);
    setError('');
  }

  async function uploadPhoto(event, onPhoto) {
    const file = event.target.files?.[0];
    event.target.value = '';
    if (!file) return;
    if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.type) || file.size > 8 * 1024 * 1024) {
      setPhotoError('Choose a JPEG, PNG, or WebP image up to 8 MB.');
      return;
    }
    setPhotoLoading(true);
    setPhotoError('');
    let image;
    try {
      image = await createImageBitmap(file);
      const scale = Math.min(1, 1024 / Math.max(image.width, image.height));
      const canvas = document.createElement('canvas');
      canvas.width = Math.max(1, Math.round(image.width * scale));
      canvas.height = Math.max(1, Math.round(image.height * scale));
      const context = canvas.getContext('2d');
      context.fillStyle = '#fff';
      context.fillRect(0, 0, canvas.width, canvas.height);
      context.drawImage(image, 0, 0, canvas.width, canvas.height);
      const next = { src: canvas.toDataURL('image/jpeg', .88), width: canvas.width, height: canvas.height };
      if (onPhoto) onPhoto(next);
      else {
        setPhoto(next);
        setCrop(defaultCrop);
      }
    } catch {
      setPhotoError('This image could not be opened. Try another file.');
    } finally {
      image?.close();
      setPhotoLoading(false);
    }
  }

  function addCustomField() {
    const id = nextCustomId.current++;
    setCustomFields(current => [...current, { id, label: '', value: '' }]);
  }

  function updateCustomField(id, patch) {
    setCustomFields(current => current.map(field => field.id === id ? { ...field, ...patch } : field));
  }

  async function exportAs(format) {
    if (!resume.name.trim() || !resume.role.trim() || !resume.contact.trim() || !resume.experience.trim()) {
      setError('Add a name, target role, contact information, and work experience before exporting.');
      return;
    }
    if (customFields.some(({ label, value }) => Boolean(label.trim()) !== Boolean(value.trim()))) {
      setError('Complete both the label and content of each custom field, or remove the incomplete field.');
      return;
    }
    setError('');
    const content = blocks(resume, customFields);
    if (isSample) {
      content.splice(2, 0, { text: 'Fictional sample resume', size: 10, bold: true, gap: 4 });
    }
    const filename = resume.name.trim().replace(/[^a-z0-9_-]+/gi, '_').replace(/^_+|_+$/g, '') || 'Candidate';
    const documentName = filename + (isSample ? '_Sample_Resume' : '_Resume');
    try {
      if (format === 'pdf') writePdf(content, documentName, template, photo ? await croppedPhoto(photo, crop) : undefined);
      else writeText(content, documentName);
    } catch (failure) {
      setError(failure.message || 'The resume could not be exported. Try again.');
    }
  }

  return (
    <Modal className="portfolio-form-dialog resume-editor-dialog resume-builder-dialog" open title="ATS Resume Builder" onCancel={close} width="calc(100% - 32px)" footer={
      <>
        {error && <p className="resume-builder-error" role="alert">{error}</p>}
        <div className="resume-builder-actions">
          <Space.Compact className="resume-builder-portfolio-action">
            <Button disabled={photoLoading} onClick={() => openPortfolioBuilder({ resume, isSample, customFields, templateId: template.id, sampleTemplateId, photo, crop }, isSample ? undefined : {
              name: resume.name,
              role: resume.role,
              biography: resume.summary,
              skills: resume.skills,
            })}>Get Portfolio Link</Button>
            <Popover
              trigger="click"
              content="Create a separate portfolio page with your details and images, then share its link."
              placement="top"
            >
              <Button className="resume-builder-info" aria-label="About Get Portfolio Link" icon={<InfoCircleOutlined />} />
            </Popover>
          </Space.Compact>
          <Button onClick={() => exportAs('txt')}>Download TXT</Button>
          <Button type="primary" disabled={photoLoading} onClick={() => exportAs('pdf')}>Download PDF</Button>
        </div>
      </>
    }>
      {pendingTemplate && (
        <Modal open centered width={1180} className="resume-template-dialog" title="Select a résumé template"
          onCancel={() => setPendingTemplate(null)} footer={<Button size="large" type="primary" onClick={() => {
            setTemplate(pendingTemplate);
            if (useTemplateSample) startDraft(true, pendingTemplate.id);
            setPendingTemplate(null);
          }}>Apply selected template</Button>}>
          <p>Compare the layouts and choose a style. Keep your details or load the example shown.</p>
          <label>
            <input type="checkbox" checked={useTemplateSample} onChange={event => setUseTemplateSample(event.target.checked)} />
            {' '}Load the selected example{draftChanged ? ' and replace my draft' : ''}
          </label>
          <fieldset className="resume-template-grid" aria-label="Résumé templates">
            {resumeTemplates.map(option => {
              const candidate = galleryCandidates[option.id];
              const previewBlocks = blocks(candidate ? { ...blankResume(), ...candidate.resume } : galleryResume);
              const headerEnd = previewBlocks.findIndex(block => block.section);
              return (
              <label className="resume-template-option" key={option.id}>
                <input type="radio" name="resume-template" checked={pendingTemplate.id === option.id} onChange={() => setPendingTemplate(option)} />
                <strong>{option.name}</strong>
                <span className="resume-template-description">{option.description}</span>
                <span className="resume-template-page" aria-hidden="true">
                  <span className="resume-template-example" data-template={option.id}>
                    <img className="resume-template-photo" src={candidate?.photo || 'https://randomuser.me/api/portraits/men/11.jpg'} alt="" loading="lazy" referrerPolicy="no-referrer" onError={event => { event.currentTarget.hidden = true; }} />
                    {previewBlocks.map((block, index) => (
                      <span key={index}
                        className={block.size === 22 ? 'resume-preview-name' : block.section ? 'resume-preview-section' : undefined}
                        data-resume-header={index < headerEnd}
                        style={{ fontWeight: block.bold ? 700 : undefined }}>{block.text}</span>
                    ))}
                  </span>
                </span>
              </label>
              );
            })}
          </fieldset>
        </Modal>
      )}
      {writingAssistantOpen && <ResumeWritingAssistant photo={photo} photoLoading={photoLoading} photoError={photoError}
        uploadPhoto={uploadPhoto} close={() => { setPhotoError(''); setWritingAssistantOpen(false); }} />}
      <div className="resume-builder-toolbar">
        <div>
          <strong>{isSample ? 'Fictional sample resume' : 'Your resume draft'}</strong>
          <p>{isSample ? 'Edit this example to try the builder, or start blank to create your own resume.' : 'Add your details and review the live preview before downloading.'}</p>
        </div>
        <Button disabled={photoLoading} onClick={() => {
          setUseTemplateSample(isSample && !draftChanged);
          setPendingTemplate(template);
        }}>Templates · {template.name}</Button>
        <Button disabled={photoLoading} onClick={() => { setPhotoError(''); setWritingAssistantOpen(true); }}>AI Assistant</Button>
        <Popconfirm
          title="Replace this draft?"
          description="This will clear your current edits."
          disabled={!draftChanged}
          onConfirm={() => startDraft(!isSample)}
          okText="Replace draft"
        >
          <Button disabled={photoLoading} onClick={() => { if (!draftChanged) startDraft(!isSample); }}>
            {isSample ? 'Start blank' : 'Load sample'}
          </Button>
        </Popconfirm>
      </div>
      <div className="resume-mobile-switch" role="group" aria-label="Résumé view">
        {[['edit', 'Edit résumé'], ['preview', 'Live preview']].map(([pane, label]) => (
          <Button key={pane} type={mobilePane === pane ? 'primary' : 'default'} aria-pressed={mobilePane === pane}
            onClick={event => {
              setMobilePane(pane);
              event.currentTarget.closest('.ant-modal-body')?.scrollTo(0, 0);
            }}>{label}</Button>
        ))}
      </div>
      <div className="resume-builder-grid" data-mobile-pane={mobilePane}>
        <Form className="resume-builder-fields" layout="vertical" component="div">
          <Form.Item label="Profile photo (optional)" htmlFor="resume-photo" extra="Sample portraits are for preview. Upload your own photo to include it in the PDF.">
            <input id="resume-photo" type="file" accept="image/jpeg,image/png,image/webp" disabled={photoLoading} onChange={uploadPhoto} />
            {photo && <Button type="link" disabled={photoLoading} onClick={() => { setPhoto(''); setPhotoError(''); }}>Remove photo</Button>}
            {photoError && <p className="resume-builder-error" role="alert">{photoError}</p>}
          </Form.Item>
          {photo && <fieldset className="resume-custom-field resume-photo-controls">
            <legend>Adjust photo crop</legend>
            {[
              ['horizontal', 'Horizontal position', 0, 100],
              ['vertical', 'Vertical position', 0, 100],
              ['zoom', 'Zoom', 100, 300],
            ].map(([key, label, min, max]) => (
              <label key={key}>{label}
                <input type="range" min={min} max={max} value={crop[key]}
                  onChange={event => setCrop({ ...crop, [key]: Number(event.target.value) })} />
              </label>
            ))}
            <Button size="small" onClick={() => setCrop(defaultCrop)}>Reset crop</Button>
          </fieldset>}
          {fields.map(([key, label, rows]) => {
            const Control = rows ? Input.TextArea : Input;
            return (
              <Form.Item label={label} htmlFor={'resume-' + key} key={key}>
                <Control id={'resume-' + key} rows={rows} value={resume[key]} onChange={event => setResume({ ...resume, [key]: event.target.value })} />
              </Form.Item>
            );
          })}
          {customFields.map(({ id, label, value }, index) => (
            <fieldset className="resume-custom-field" key={id}>
              <legend>Custom field {index + 1}</legend>
              <Form.Item label="Label" htmlFor={`resume-custom-label-${id}`}>
                <Input id={`resume-custom-label-${id}`} placeholder="e.g. Volunteer Experience" value={label} onChange={event => updateCustomField(id, { label: event.target.value })} />
              </Form.Item>
              <Form.Item label="Content" htmlFor={`resume-custom-value-${id}`}>
                <Input.TextArea id={`resume-custom-value-${id}`} rows={3} value={value} onChange={event => updateCustomField(id, { value: event.target.value })} />
              </Form.Item>
              <Button type="text" danger aria-label={`Remove custom field ${index + 1}`} onClick={() => setCustomFields(current => current.filter(field => field.id !== id))}>
                Remove field
              </Button>
            </fieldset>
          ))}
          <Button type="dashed" block onClick={addCustomField}>Add custom field</Button>
        </Form>
        <div className="resume-builder-document">
          <ResumePreview resume={resume} customFields={customFields} template={template} photo={previewPhoto} crop={photo ? crop : defaultCrop} />
        </div>
      </div>
    </Modal>
  );
}
