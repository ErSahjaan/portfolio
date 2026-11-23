import { useRef, useState } from 'react';
import { Button, Form, Input, Modal, Popconfirm, Popover, Space } from 'antd';
import { InfoCircleOutlined } from '@ant-design/icons';
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
    contact: profile.location,
    links: ['https://github.com/ErSahjaan', 'https://www.linkedin.com/in/er-md-sahjaan-4a33b1247', profile.website].join('\n'),
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
  for (const [key, title] of [['summary', 'Professional Summary'], ['skills', 'Technical Skills'], ['experience', 'Work Experience'], ['projects', 'Projects'], ['education', 'Education'], ['certifications', 'Certifications']]) {
    if (resume[key].trim()) header.push({ text: title, size: 12, bold: true, gap: 13, section: true }, { text: resume[key], size: 10.5, gap: 4 });
  }
  for (const { label, value } of customFields) {
    if (label.trim() && value.trim()) {
      header.push({ text: label.trim(), size: 12, bold: true, gap: 13, section: true }, { text: value.trim(), size: 10.5, gap: 4 });
    }
  }
  return header.filter(block => block.text.trim());
}

function writePdf(content, filename) {
  const normalized = content.map(block => ({ ...block, text: block.text.trim().replace(/[–—]/g, '-').replace(/[‘’]/g, "'").replace(/[“”]/g, '"').replace(/•/g, '-') }));
  // eslint-disable-next-line no-control-regex -- allow whitespace and characters supported by Helvetica
  if (normalized.some(block => /[^\u0009\u000a\u000d\u0020-\u007e\u00a0-\u00ff]/.test(block.text))) {
    throw new Error('Use TXT to keep characters outside the PDF font’s supported character set.');
  }
  const pdf = new jsPDF({ unit: 'pt', format: 'a4' });
  pdf.setProperties({ title: normalized[0].text + ' - Resume' });
  const margin = 48;
  const width = pdf.internal.pageSize.getWidth() - margin * 2;
  const limit = pdf.internal.pageSize.getHeight() - margin;
  let y = margin;
  for (const block of normalized) {
    pdf.setFont('helvetica', block.bold ? 'bold' : 'normal');
    pdf.setFontSize(block.size);
    const step = block.size * 1.3;
    if (y + block.gap + step + (block.section ? 18 : 0) > limit) {
      pdf.addPage();
      y = margin;
    } else y += block.gap;
    const lines = block.text.split(/\r?\n/).flatMap(line => pdf.splitTextToSize(line || ' ', width));
    for (const line of lines) {
      if (y + step > limit) {
        pdf.addPage();
        y = margin;
      }
      pdf.text(line, margin, y, { baseline: 'top' });
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
];

const blankResume = () => Object.fromEntries(fields.map(([key]) => [key, '']));
const sampleResume = {
  name: 'Taylor Bennett',
  role: 'Full-Stack Software Developer',
  contact: 'Austin, TX | taylor.bennett@example.com | +1 (512) 555-0142',
  links: 'https://example.com/taylor-bennett',
  summary: 'Full-stack developer with three years of experience building internal web applications with Java, Spring Boot, and React. Builds REST APIs, reusable interfaces, and integration tests.',
  skills: 'Languages: Java, JavaScript, TypeScript, SQL\nFrontend: React, HTML, CSS\nBackend: Spring Boot, REST APIs, PostgreSQL\nTools: Git, JUnit',
  experience: 'Software Developer | Blue Mesa Tools (Fictional) | August 2023 - Present\n- Built Spring Boot REST endpoints for service requests, status updates, and search.\n- Developed React forms and dashboards with validation and error handling.\n- Added JUnit integration tests for request workflows and API error cases.',
  projects: 'Service Request Dashboard\n- Built a React dashboard and Spring Boot API for a fictional facilities team to create, assign, and track service requests.',
  education: 'B.S. in Computer Science | Example State University (Fictional) | May 2023',
  certifications: '',
};

function ResumePreview({ resume, watermark, customFields }) {
  const content = blocks(resume, customFields);
  return (
    <article className={watermark ? 'resume-builder-preview published-resume-preview' : 'resume-builder-preview'} aria-label="Resume text preview">
      {watermark && (
        <div className="published-resume-watermark" aria-hidden="true">
          {[0, 1, 2, 3].map(row => <span key={row}>{watermark}</span>)}
        </div>
      )}
      <h2>Resume preview</h2>
      {!content.length && <p>Your resume appears here as you fill in the fields.</p>}
      {content.map((block, index) => block.bold
        ? <h3 key={index}>{block.text}</h3>
        : <p key={index}>{block.text}</p>)}
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
  const [resume, setResume] = useState(() => initialDraft?.resume ?? { ...sampleResume });
  const [isSample, setIsSample] = useState(initialDraft?.isSample ?? true);
  const [error, setError] = useState('');
  const [customFields, setCustomFields] = useState(initialDraft?.customFields ?? []);
  const nextCustomId = useRef(Math.max(0, ...customFields.map(field => field.id)) + 1);
  const draftChanged = customFields.length > 0 || fields.some(([key]) => resume[key] !== (isSample ? sampleResume[key] : ''));

  function startDraft(sample) {
    setResume(sample ? { ...sampleResume } : blankResume());
    setCustomFields([]);
    setIsSample(sample);
    setError('');
  }

  function addCustomField() {
    const id = nextCustomId.current++;
    setCustomFields(current => [...current, { id, label: '', value: '' }]);
  }

  function updateCustomField(id, patch) {
    setCustomFields(current => current.map(field => field.id === id ? { ...field, ...patch } : field));
  }

  function exportAs(format) {
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
      if (format === 'pdf') writePdf(content, documentName);
      else writeText(content, documentName);
    } catch (failure) {
      setError(failure.message || 'The resume could not be exported. Try again.');
    }
  }

  return (
    <Modal className="portfolio-form-dialog resume-editor-dialog" open title="ATS Resume Builder" onCancel={close} width={920} footer={
      <>
        {error && <p className="resume-builder-error" role="alert">{error}</p>}
        <div className="resume-builder-actions">
          <Space.Compact className="resume-builder-portfolio-action">
            <Button onClick={() => openPortfolioBuilder({ resume, isSample, customFields }, isSample ? undefined : {
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
          <Button type="primary" onClick={() => exportAs('pdf')}>Download PDF</Button>
        </div>
      </>
    }>
      <div className="resume-builder-toolbar">
        <div>
          <strong>{isSample ? 'Fictional sample resume' : 'Your resume draft'}</strong>
          <p>{isSample ? 'Edit this example to try the builder, or start blank to create your own resume.' : 'Add your details and review the live preview before downloading.'}</p>
        </div>
        <Popconfirm
          title="Replace this draft?"
          description="This will clear your current edits."
          disabled={!draftChanged}
          onConfirm={() => startDraft(!isSample)}
          okText="Replace draft"
        >
          <Button onClick={() => { if (!draftChanged) startDraft(!isSample); }}>
            {isSample ? 'Start blank' : 'Load sample'}
          </Button>
        </Popconfirm>
      </div>
      <div className="resume-builder-grid">
        <Form layout="vertical" component="div">
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
        <ResumePreview resume={resume} customFields={customFields} />
      </div>
    </Modal>
  );
}
