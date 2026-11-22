import { useState } from 'react';
import { Button, Form, Input, Modal, Space } from 'antd';
import { jsPDF } from 'jspdf';
import { projectConcepts } from './projectConcepts';

export const profileRole = 'Full-Stack Developer';
export const coreSkills = ['Java', 'Spring Boot', 'React.js'];
export const additionalSkills = ['AI Integration'];
export const profileSummary = 'Full-stack developer with three years of experience building web applications with Java, Spring Boot, and React.js.';
export const work = {
  title: 'Software Engineer (Full Stack)',
  company: 'Fuel Signal Inc',
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
export const degree = { degree: 'B.Tech in Computer Science', school: 'VVIT Purnia', year: '2023', score: '8.0 CGPA' };

export function resumeDefaults(profile) {
  return {
    name: profile.name,
    role: profile.role,
    contact: [profile.email, profile.phone, profile.location].join(' | '),
    links: ['https://github.com/ErSahjaan', 'https://www.linkedin.com/in/er-md-sahjaan-4a33b1247', profile.website].join('\n'),
    summary: profileSummary,
    skills: [...coreSkills, ...additionalSkills].join(', '),
    experience: [work.title + ' | ' + work.company + ' | ' + work.period, ...work.achievements.map(line => '- ' + line)].join('\n'),
    projects: projectConcepts.map(project => [
      project.title,
      '- ' + project.desc,
      ...project.details.map(detail => '- ' + detail),
    ].join('\n')).join('\n\n'),
    education: [degree.degree, degree.school, degree.year].join(' | '),
  };
}

function blocks(resume) {
  const header = [
    { text: resume.name, size: 22, bold: true, gap: 0 },
    { text: resume.role, size: 12, bold: true, gap: 4 },
    ...[resume.contact, resume.links].filter(value => value.trim()).map(text => ({ text, size: 10, gap: 4 })),
  ];
  for (const [key, title] of [['summary', 'Professional Summary'], ['skills', 'Technical Skills'], ['experience', 'Work Experience'], ['projects', 'Projects'], ['education', 'Education']]) {
    if (resume[key].trim()) header.push({ text: title, size: 12, bold: true, gap: 13, section: true }, { text: resume[key], size: 10.5, gap: 4 });
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
];

export default function ResumeBuilder({ profile, close }) {
  const [resume, setResume] = useState(() => resumeDefaults(profile));
  const [error, setError] = useState('');
  const content = blocks(resume);

  function exportAs(format) {
    if (!resume.name.trim() || !resume.role.trim() || !resume.contact.trim() || !resume.experience.trim()) {
      setError('Add a name, target role, contact information, and work experience before exporting.');
      return;
    }
    setError('');
    const filename = resume.name.trim().replace(/[^a-z0-9_-]+/gi, '_').replace(/^_+|_+$/g, '') || 'Candidate';
    try {
      if (format === 'pdf') writePdf(content, filename + '_Resume');
      else writeText(content, filename + '_Resume');
    } catch (failure) {
      setError(failure.message || 'The resume could not be exported. Try again.');
    }
  }

  return (
    <Modal className="portfolio-form-dialog" open title="ATS Resume Builder" onCancel={close} width={920} footer={
      <Space wrap>
        <Button onClick={() => { setResume(resumeDefaults(profile)); setError(''); }}>Reset to portfolio</Button>
        <Button onClick={() => exportAs('txt')}>Download TXT</Button>
        <Button type="primary" onClick={() => exportAs('pdf')}>Download PDF</Button>
      </Space>
    }>
      <p>Edit a copy of the portfolio resume and download it as a single-column document with selectable text. Review employer dates and details before submitting.</p>
      {error && <p role="alert" style={{ color: '#b91c1c' }}>{error}</p>}
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
        </Form>
        <article className="resume-builder-preview" aria-label="Resume text preview">
          <h2>Resume preview</h2>
          {content.map((block, index) => block.bold
            ? <h3 key={index}>{block.text}</h3>
            : <p key={index}>{block.text}</p>)}
        </article>
      </div>
    </Modal>
  );
}
