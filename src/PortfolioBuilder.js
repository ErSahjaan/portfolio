import { useEffect, useRef, useState } from 'react';
import { Button, Form, Input, Modal, Popconfirm, Select, Space } from 'antd';
import { Link, useLocation } from 'react-router-dom';
import samplePortrait from './assets/images/taylor-bennett-sample.png';
import { educationLimits, emailPattern, imageAccept, maxEducationEntries, maxImageLength, portfolioColor, publicAddress, slugPattern, tokenPattern, uploadedImage } from './portfolioPublishing.mjs';
import './PortfolioBuilder.css';

const themes = [
  { value: 'indigo', label: 'Indigo' },
  { value: 'forest', label: 'Forest' },
  { value: 'slate', label: 'Slate' },
];
const profileLimits = { name: 80, role: 100, location: 80, availability: 65, headline: 110, biography: 700, experience: 1000, education: 500, skills: 300, email: 160, website: 300, linkedin: 300, photo: 500, slug: 60 };
const projectLimits = { title: 100, description: 400, url: 300, image: 500 };
const maxProjects = 5;
const maxHashLength = 10000;
const blankProject = { title: '', description: '', url: '', image: '' };
const samplePortraitKey = 'sample:portrait';
const sampleProfile = {
  sample: true,
  name: 'Taylor Bennett',
  role: 'Full-Stack Software Developer',
  headline: 'I build and maintain web tools for facilities and inventory teams.',
  location: 'Austin, Texas, United States',
  availability: 'Open to full-stack opportunities',
  biography: 'I’m a full-stack developer based in Austin, Texas, with three years of experience building web applications for operations teams. I use Java and Spring Boot for APIs, React and TypeScript for interfaces, and PostgreSQL for data.\n\nI enjoy turning manual handoffs into clear workflows: who owns a request, what happens next, and what users can do when something goes wrong.',
  experience: [
    'Software Developer | Blue Mesa Tools (Fictional) | Austin, TX | August 2023 - Present',
    '',
    '• Built Spring Boot APIs and React screens for maintenance requests, technician assignments, and status updates.',
    '• Added PostgreSQL search filters, pagination, and indexes so coordinators could find requests by site and status.',
    '• Wrote integration tests for access rules, invalid requests, and job completion. Reviewed pull requests and helped verify release fixes.',
  ].join('\n'),
  educationEntries: [{ label: 'Bachelor of Science in Computer Science', details: 'Example State University (Fictional) | Austin, TX | May 2023\nCoursework included databases, software engineering, and data structures.' }],
  skills: 'Java, Spring Boot, React, TypeScript, PostgreSQL, REST APIs, JUnit, React Testing Library, Git, GitHub Actions',
  email: 'taylor.bennett@example.com',
  photo: samplePortraitKey,
  projects: [
    {
      title: 'Service Request Dashboard',
      description: 'Facilities coordinators needed one place to see who owned each maintenance request. I built a searchable queue in React and a Spring Boot API for assignment, status history, and closure. Requesters can track progress, and coordinators can filter open work by site.\n\nStack: React, TypeScript, Spring Boot, PostgreSQL',
    },
    {
      title: 'Inventory Search API',
      description: 'Warehouse staff needed to find available parts across locations. I built an API with combined stock, category, and location filters, documented example requests, and added integration tests for empty results and invalid filters.\n\nStack: Java, Spring Boot, PostgreSQL, JUnit',
    },
    {
      title: 'Shift Handoff Board',
      description: 'A prototype for supervisors passing open work to the next shift. I designed a board that shows the owner, priority, and next action for each item, and built a React form for recording handoff notes.\n\nStack: React, TypeScript, React Testing Library',
    },
  ],
};

function limitedStrings(record, limits) {
  return Object.fromEntries(Object.entries(limits).map(([key, limit]) => [
    key, typeof record?.[key] === 'string' ? record[key].trim().slice(0, limit) : '',
  ]));
}

function webLink(value) {
  try {
    const address = new URL(value);
    return address.protocol === 'https:' && !address.username && !address.password ? address.href : '';
  } catch {
    return '';
  }
}

function portraitSource(value, isSample) {
  return isSample && value === samplePortraitKey ? samplePortrait : webLink(value);
}

function normalize(data) {
  return {
    ...limitedStrings(data, profileLimits),
    educationEntries: Array.isArray(data?.educationEntries)
      ? data.educationEntries.slice(0, maxEducationEntries).map(entry => limitedStrings(entry, educationLimits))
        .filter(entry => entry.label || entry.details)
      : [],
    sample: data?.sample === true,
    photoUpload: uploadedImage(data?.photoUpload),
    accent: portfolioColor(data?.accent),
    background: portfolioColor(data?.background),
    theme: themes.some(theme => theme.value === data?.theme) ? data.theme : 'indigo',
    projects: Array.isArray(data?.projects)
      ? data.projects.slice(0, maxProjects).map(project => ({ ...limitedStrings(project, projectLimits), imageUpload: uploadedImage(project?.imageUpload) })).filter(project => Object.values(project).some(Boolean))
      : [],
  };
}

function editableProfile(data) {
  const profile = normalize(data);
  const educationEntries = profile.education
    ? [{ label: '', details: profile.education }, ...profile.educationEntries].slice(0, maxEducationEntries)
    : profile.educationEntries;
  return {
    ...profile,
    education: '',
    educationEntries: educationEntries.map((entry, id) => ({ ...entry, id })),
    projects: profile.projects.map((project, id) => ({ ...project, id })),
  };
}

function validate(profile) {
  if (!profile.name || !profile.role) return 'Add your name and professional title.';
  if (profile.slug && !slugPattern.test(profile.slug)) return 'Use lowercase letters, numbers, and single hyphens for the link name.';
  if (profile.email && !emailPattern.test(profile.email)) return 'Enter a valid contact email or leave it blank.';
  if ((profile.photo && !portraitSource(profile.photo, profile.sample)) ||
    [profile.website, profile.linkedin, ...profile.projects.flatMap(project => [project.url, project.image])].some(value => value && !webLink(value))) {
    return 'Use a complete HTTPS URL for each website or image.';
  }
  if (profile.projects.some(project => !project.title)) return 'Give each project a title, or remove unused projects.';
  return '';
}

function SafeImage({ src, alt, className }) {
  const [failed, setFailed] = useState(false);
  if (failed || !src) return null;
  return <img className={className} src={src} alt={alt} referrerPolicy="no-referrer" onError={() => setFailed(true)} />;
}

function PortfolioPreview({ profile }) {
  const [motionPaused, setMotionPaused] = useState(false);
  const skills = profile.skills.split(/[\n,]+/).map(skill => skill.trim()).filter(Boolean);
  const hero = useRef(null);
  const aboutSection = useRef(null);
  const experienceSection = useRef(null);
  const skillSection = useRef(null);
  const projectSection = useRef(null);
  const educationSection = useRef(null);
  const contactSection = useRef(null);
  const photo = profile.photoUpload || portraitSource(profile.photo, profile.sample);
  const canContact = emailPattern.test(profile.email);
  const website = webLink(profile.website);
  const linkedin = webLink(profile.linkedin);
  const initials = profile.name.split(/\s+/).slice(0, 2).map(part => part[0]).join('').toUpperCase();
  const navigation = [
    ['About', profile.biography, aboutSection],
    ['Experience', profile.experience, experienceSection],
    ['Skills', skills.length, skillSection],
    ['Projects', profile.projects.length, projectSection],
    ['Education', profile.education || profile.educationEntries.length, educationSection],
    ['Contact', canContact || website || linkedin, contactSection],
  ];
  return (
    <article className={'custom-portfolio theme-' + profile.theme} aria-label="Portfolio preview" style={{
      '--portfolio-custom-accent': profile.accent || undefined,
      '--portfolio-custom-background': profile.background || undefined,
    }}>
      <header className="custom-portfolio-nav">
        <div className="custom-portfolio-boundary">
          <button className="custom-portfolio-brand" onClick={() => hero.current?.scrollIntoView()} type="button">
            <span aria-hidden="true">{initials || 'P'}</span>{profile.name || 'Your name'}
          </button>
          <nav aria-label="Portfolio sections">
            {navigation.filter(([, shown]) => shown).map(([label, , target]) => (
              <button key={label} type="button" onClick={() => target.current?.scrollIntoView()}>{label}</button>
            ))}
          </nav>
        </div>
      </header>
      <section className="custom-portfolio-hero" ref={hero} data-motion-paused={motionPaused}>
        <div className="custom-hero-scene" aria-hidden="true">
          <span className="custom-hero-glow custom-hero-glow-main" />
          <span className="custom-hero-glow custom-hero-glow-secondary" />
          <span className="custom-hero-ring custom-hero-ring-outer"><span className="custom-hero-current" /></span>
          <span className="custom-hero-ring custom-hero-ring-inner"><span className="custom-hero-current" /></span>
        </div>
        <div className={'custom-portfolio-boundary custom-portfolio-intro' + (photo ? ' has-portrait' : '')}>
          <div className="custom-portfolio-intro-copy">
            {profile.sample && <p className="custom-portfolio-sample">Fictional example</p>}
            <p className="custom-portfolio-role">{profile.role || 'Your professional title'}</p>
            <h1>{profile.name || 'Your name'}</h1>
            {profile.headline && <p className="custom-portfolio-headline">{profile.headline}</p>}
            {(profile.location || profile.availability) && <div className="custom-portfolio-meta">
              {profile.location && <p className="custom-portfolio-bio">{profile.location}</p>}
              {profile.availability && <p className="custom-portfolio-availability">{profile.availability}</p>}
            </div>}
            {(profile.projects.length > 0 || canContact || website || linkedin) && <div className="custom-portfolio-links">
              {profile.projects.length > 0 && <button type="button" onClick={() => projectSection.current?.scrollIntoView()}>View projects <span aria-hidden="true">↓</span></button>}
              {canContact && <a href={'mailto:' + profile.email}>Get in touch</a>}
              {website && <a href={website} target="_blank" rel="noreferrer">Professional website</a>}
              {linkedin && <a href={linkedin} target="_blank" rel="noreferrer">LinkedIn</a>}
            </div>}
          </div>
          {photo && <figure className="custom-portfolio-portrait">
            <SafeImage key={photo} src={photo} alt={profile.name ? 'Portrait of ' + profile.name : 'Profile photo'} className="custom-portfolio-photo" />
          </figure>}
        </div>
        <button
          className="custom-hero-motion"
          aria-label={motionPaused ? 'Resume background animation' : 'Pause background animation'}
          onClick={() => setMotionPaused(paused => !paused)}
          type="button"
        >
          <span aria-hidden="true">{motionPaused ? '▶' : 'Ⅱ'}</span>
        </button>
      </section>
      {profile.biography && <section className="custom-portfolio-section" ref={aboutSection}><div className="custom-portfolio-boundary"><h2>About</h2><p className="custom-portfolio-copy">{profile.biography}</p></div></section>}
      {profile.experience && <section className="custom-portfolio-section custom-portfolio-work" ref={experienceSection}><div className="custom-portfolio-boundary"><h2>Experience</h2><p className="custom-portfolio-copy">{profile.experience}</p></div></section>}
      {skills.length > 0 && <section className="custom-portfolio-section" ref={skillSection}><div className="custom-portfolio-boundary"><h2>Skills</h2><ul className="custom-portfolio-skills">{skills.map((skill, index) => <li key={index}>{skill}</li>)}</ul></div></section>}
      {profile.projects.length > 0 && <section className="custom-portfolio-section custom-portfolio-work" ref={projectSection}><div className="custom-portfolio-boundary"><h2>Projects</h2><div className="custom-portfolio-projects">
        {profile.projects.map((project, index) => <article className="custom-portfolio-project" key={index}>
          {(project.imageUpload || project.image) && <SafeImage key={project.imageUpload || project.image} src={project.imageUpload || webLink(project.image)} alt={project.title ? project.title + ' project image' : 'Project image'} className="custom-portfolio-project-image" />}
          <div className="custom-portfolio-project-copy">
            <h3>{project.title || 'Project title'}</h3>
            {project.description && <p>{project.description}</p>}
            {webLink(project.url) && <a href={webLink(project.url)} target="_blank" rel="noreferrer" aria-label={project.title ? 'View project: ' + project.title : undefined}>View project <span aria-hidden="true">↗</span></a>}
          </div>
        </article>)}
      </div></div></section>}
      {(profile.education || profile.educationEntries.length > 0) && (
        <section className="custom-portfolio-section" ref={educationSection}>
          <div className="custom-portfolio-boundary">
            <h2>Education</h2>
            {profile.education && <p className="custom-portfolio-copy">{profile.education}</p>}
            {profile.educationEntries.map(({ label, details }, index) => (
              <div className="custom-portfolio-education-entry" key={index}>
                {label && <h3>{label}</h3>}
                {details && <p className="custom-portfolio-copy">{details}</p>}
              </div>
            ))}
          </div>
        </section>
      )}
      {(canContact || website || linkedin) && <section className="custom-portfolio-section custom-portfolio-work" ref={contactSection}><div className="custom-portfolio-boundary">
        <h2>Contact</h2>
        <div className="custom-portfolio-links">
          {canContact && <a href={'mailto:' + profile.email}>{profile.email}</a>}
          {website && <a href={website} target="_blank" rel="noreferrer">Professional website</a>}
          {linkedin && <a href={linkedin} target="_blank" rel="noreferrer">LinkedIn</a>}
        </div>
      </div></section>}
    </article>
  );
}

const profileFields = [
  ['name', 'Full name'], ['role', 'Professional title'], ['headline', 'Hero headline'],
  ['location', 'Location'], ['availability', 'Availability message'], ['biography', 'About you', 3],
  ['experience', 'Work experience', 5], ['skills', 'Skills (comma or line separated)', 2],
  ['educationEntries', 'Education'], ['email', 'Public contact email'],
  ['linkedin', 'LinkedIn URL'], ['website', 'Professional website URL'],
];
const projectFields = [
  ['title', 'Project title'], ['description', 'Project description', 2],
  ['url', 'Project link URL'], ['image', 'Project image URL'],
];

async function compressImage(file) {
  if (!imageAccept.split(',').includes(file.type) || file.size > 8 * 1024 * 1024) {
    throw new Error('Choose a JPG, PNG, or WebP image up to 8 MB.');
  }
  const objectUrl = URL.createObjectURL(file);
  try {
    const image = new Image();
    image.src = objectUrl;
    await image.decode();
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    if (!context) throw new Error('Image processing is unavailable in this browser.');
    for (const dimension of [960, 720, 480, 320]) {
      const scale = Math.min(1, dimension / Math.max(image.naturalWidth, image.naturalHeight));
      canvas.width = Math.max(1, Math.round(image.naturalWidth * scale));
      canvas.height = Math.max(1, Math.round(image.naturalHeight * scale));
      context.drawImage(image, 0, 0, canvas.width, canvas.height);
      const result = canvas.toDataURL('image/webp', 0.72);
      if (result.length <= maxImageLength && uploadedImage(result)) return result;
    }
    throw new Error('This image could not fit. Try a smaller JPG, PNG, or WebP.');
  } finally {
    URL.revokeObjectURL(objectUrl);
  }
}

function ImagePicker({ name, value, onImage }) {
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const request = useRef(0);
  useEffect(() => () => { request.current += 1; }, []);

  async function select(event) {
    const file = event.target.files[0];
    event.target.value = '';
    if (!file) return;
    const current = ++request.current;
    setError('');
    setBusy(true);
    try {
      const image = await compressImage(file);
      if (request.current === current) onImage(image);
    } catch (failure) {
      if (request.current === current) setError(failure.message || 'The image could not be read.');
    } finally {
      if (request.current === current) setBusy(false);
    }
  }

  return <div className="portfolio-image-picker">
    <label><span>{'Upload ' + name}</span><input type="file" accept={imageAccept} onChange={select} disabled={busy} /></label>
    {busy && <small role="status">Preparing image…</small>}
    {error && <small role="alert">{error}</small>}
    {value && <Button size="small" onClick={() => onImage('')}>Remove uploaded {name}</Button>}
  </div>;
}

async function publishingRequest(payload) {
  const response = await fetch('/api/portfolio', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  const result = await response.json().catch(() => null);
  if (!response.ok || !result) throw new Error(result?.error || 'Portfolio publishing is unavailable here. Open the configured deployment to continue.');
  return result;
}

function PublishedLinkModal({ publication, close }) {
  const [email, setEmail] = useState('');
  const [sending, setSending] = useState(false);
  const [status, setStatus] = useState('');
  const [error, setError] = useState('');
  const input = useRef(null);
  async function sendEmail() {
    setSending(true);
    setError('');
    setStatus('');
    try {
      const response = await publishingRequest({ action: 'email', id: publication.id, email: email.trim() });
      if (!response.sent) throw new Error('The email could not be sent.');
      setStatus('Your portfolio link was sent.');
    } catch (failure) {
      setError(failure.message);
    } finally {
      setSending(false);
    }
  }

  return (
    <Modal title="Your portfolio is live" open centered onCancel={close} footer={
      <Space wrap>
        <Button onClick={async () => {
          try {
            await navigator.clipboard.writeText(publication.url);
            setStatus('Link copied.');
          } catch {
            input.current?.focus({ cursor: 'all' });
            setStatus('Link selected. Use Copy to share it.');
          }
        }}>Copy link</Button>
        <Button type="primary" href={publication.url} target="_blank" rel="noreferrer">Open portfolio</Button>
      </Space>
    }>
      <p>{publication.local
        ? 'This localhost preview works for up to 60 minutes and can only be opened on this machine.'
        : 'Anyone with this temporary link can view your portfolio for 60 minutes after submission.'}</p>
      <Form.Item label="Temporary portfolio link" htmlFor="temporary-portfolio-link">
        <Input id="temporary-portfolio-link" readOnly ref={input} value={publication.url} onFocus={event => event.target.select()} />
      </Form.Item>
      {publication.notification === 'accepted' && <p role="status">Your submission was sent to the site owner.</p>}
      {publication.notification === 'unavailable' && <p role="status">Your link is ready, but we couldn’t email your submission to the site owner.</p>}
      {!publication.local && <><Form.Item label="Email address (optional)" htmlFor="portfolio-delivery-email" extra="Send a copy of the same link to your inbox.">
        <Input id="portfolio-delivery-email" type="email" autoComplete="email" maxLength={160} value={email} onChange={event => setEmail(event.target.value)} />
      </Form.Item>
      <Button loading={sending} disabled={!email.trim()} onClick={sendEmail}>Email me the link</Button>
      </>}
      {status && <p role="status">{status}</p>}
      {error && <p className="resume-builder-error" role="alert">{error}</p>}
    </Modal>
  );
}

function EditableField({ field, prefix, value, update, limits, placeholder }) {
  const [key, label, rows] = field;
  const id = prefix + '-' + key;
  const Control = rows ? Input.TextArea : Input;
  return <Form.Item label={label} htmlFor={id}>
    <Control id={id} value={value} rows={rows} maxLength={limits[key]} placeholder={placeholder} onChange={event => update(key, event.target.value)} />
  </Form.Item>;
}

export default function PortfolioBuilder({ seed, returnToResume }) {
  const [draft, setDraft] = useState(() => editableProfile(seed?.name?.trim() || seed?.role?.trim() ? seed : sampleProfile));
  const nextProjectId = useRef(maxProjects);
  const nextEducationId = useRef(maxEducationEntries);
  const [publication, setPublication] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [fullPreview, setFullPreview] = useState(false);
  const preview = normalize(draft);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  function change(next) {
    setDraft(next);
    setError('');
  }

  async function submit() {
    if (submitting) return;
    const problem = validate(preview);
    if (problem) return setError(problem);
    setError('');
    setSubmitting(true);
    try {
      const response = await publishingRequest({ action: 'publish', profile: preview });
      const localUrl = response.local === true &&
        /^(localhost|127\.0\.0\.1|\[::1\])$/i.test(window.location.hostname) &&
        typeof response.url === 'string' && response.url.startsWith(window.location.origin + '/portfolio/custom/');
      if (!tokenPattern.test(response.id) || (!localUrl && !webLink(response.url))) throw new Error('The temporary link could not be created.');
      setPublication(response);
    } catch (failure) {
      setError(failure.message);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main className="portfolio-builder-page">
      <header className="portfolio-builder-header">
        <Link to="/portfolio">{returnToResume ? 'Back to resume' : 'Back to portfolio'}</Link>
        <Space wrap>
          <Button onClick={() => {
            setFullPreview(!fullPreview);
            window.scrollTo(0, 0);
          }}>{fullPreview ? 'Back to editor' : 'Full-page preview'}</Button>
          <Button type="primary" loading={submitting} onClick={submit}>Submit</Button>
        </Space>
      </header>
      {error && <p className="portfolio-builder-error" role="alert">{error}</p>}
      {publication && <PublishedLinkModal publication={publication} close={() => setPublication(null)} />}
      <div className={'custom-portfolio-builder-grid' + (fullPreview ? ' full-preview' : '')}>
        {!fullPreview && <aside className="portfolio-builder-form">
          <h1>Build your portfolio</h1>
          <p>Show your work, experience, and skills on one shareable page.</p>
          <details className="portfolio-builder-guide">
            <summary>How it works</summary>
            <ol className="portfolio-builder-steps">
              <li>Add your details, projects, and photos. Upload images or paste direct HTTPS links.</li>
              <li>Review your changes in the live preview, or open the full-page view.</li>
              <li>Submit to get a temporary link. Anyone with the link can see the details and images you include.</li>
            </ol>
          </details>
          <p className="portfolio-builder-sharing-note">Submitting emails your portfolio details and temporary link to the site owner on the published site.</p>
          <div className="portfolio-builder-template">
            <p>{draft.sample ? 'You’re viewing Taylor Bennett’s fictional portfolio. Edit the sample to try the preview, or start blank to create your own.' : 'Load the fictional example to see how to present your work and experience.'}</p>
            <Popconfirm
              title={draft.sample ? 'Start with a blank portfolio?' : 'Load the fictional example?'}
              description="This will replace the details in your current portfolio draft."
              onConfirm={() => change(editableProfile(draft.sample ? {} : sampleProfile))}
              okText={draft.sample ? 'Start blank' : 'Load example'}
            >
              <Button>{draft.sample ? 'Start blank' : 'Load example'}</Button>
            </Popconfirm>
          </div>
          <Form layout="vertical" component="div">
          <Form.Item label="Portfolio link name (optional)" htmlFor="portfolio-link-name" extra="Use lowercase letters, numbers, and hyphens.">
            <Input id="portfolio-link-name" value={draft.slug} placeholder={publicAddress({ ...preview, slug: '' }).split('/').at(-1)} maxLength={profileLimits.slug} onChange={event => change({ ...draft, slug: event.target.value })} />
          </Form.Item>
          <fieldset className="resume-custom-field portfolio-profile-image-field">
            <legend>Profile image</legend>
            <ImagePicker name="profile image" value={draft.photoUpload} onImage={photoUpload => change(current => ({
              ...current,
              photoUpload,
              ...(photoUpload && { photo: '' }),
            }))} />
            <EditableField
              field={['photo', 'Profile image URL (optional)']}
              prefix="portfolio-profile"
              value={draft.photo === samplePortraitKey ? '' : draft.photo}
              placeholder="https://example.com/photo.jpg"
              limits={profileLimits}
              update={(key, value) => change({ ...draft, [key]: value, photoUpload: '' })}
            />
            {draft.photo === samplePortraitKey && <Button size="small" onClick={() => change({ ...draft, photo: '' })}>Remove sample portrait</Button>}
          </fieldset>
          {profileFields.map(field => field[0] === 'educationEntries' ? (
            <fieldset className="resume-custom-field" key={field[0]}>
              <legend>Education</legend>
              {draft.educationEntries.map((entry, index) => (
                <fieldset className="resume-custom-field" key={entry.id}>
                  <legend>Education entry {index + 1}</legend>
                  {[
                    ['label', 'Label', undefined, '10th, 12th, or Graduation'],
                    ['details', 'School, qualification, and year', 2],
                  ].map(([key, label, rows, placeholder]) => (
                    <EditableField key={key} field={[key, label, rows]} prefix={'portfolio-education-' + entry.id}
                      value={entry[key]} limits={educationLimits} placeholder={placeholder}
                      update={(fieldName, value) => change(current => ({
                        ...current,
                        educationEntries: current.educationEntries.map(item =>
                          item.id === entry.id ? { ...item, [fieldName]: value } : item),
                      }))} />
                  ))}
                  <Button type="text" danger aria-label={'Remove education entry ' + (index + 1)}
                    onClick={() => change(current => ({
                      ...current,
                      educationEntries: current.educationEntries.filter(item => item.id !== entry.id),
                    }))}>Remove entry</Button>
                </fieldset>
              ))}
              <Button type="dashed" block disabled={draft.educationEntries.length >= maxEducationEntries} onClick={() => {
                const id = nextEducationId.current++;
                change(current => ({ ...current, educationEntries: [...current.educationEntries, { id, label: '', details: '' }] }));
              }}>Add education</Button>
            </fieldset>
          ) : (
            <EditableField key={field[0]} field={field} prefix="portfolio-profile" value={draft[field[0]]} limits={profileLimits} update={(key, value) => change({ ...draft, [key]: value })} />
          ))}
          <Form.Item label="Theme" htmlFor="portfolio-theme">
            <Select id="portfolio-theme" value={draft.theme} options={themes} onChange={theme => change({ ...draft, theme })} />
          </Form.Item>
          <div className="portfolio-color-controls">
            {[['accent', 'Accent color', '#5038b4'], ['background', 'Hero background tint', '#f6f4ff']].map(([key, label, defaultColor]) => (
              <label key={key}>{label}<input type="color" value={draft[key] || defaultColor} onChange={event => change({ ...draft, [key]: event.target.value })} /></label>
            ))}
            <Button size="small" onClick={() => change({ ...draft, accent: '', background: '' })}>Reset custom colors</Button>
          </div>
          {draft.projects.map((project, index) => <fieldset className="resume-custom-field" key={project.id}>
            <legend>Project {index + 1}</legend>
            {projectFields.map(field => <EditableField key={field[0]} field={field} prefix={'portfolio-project-' + index} value={project[field[0]]} limits={projectLimits} update={(key, value) => change({ ...draft, projects: draft.projects.map((item, itemIndex) => itemIndex === index ? { ...item, [key]: value, ...(key === 'image' && { imageUpload: '' }) } : item) })} />)}
            <ImagePicker name={`project ${index + 1} image`} value={project.imageUpload} onImage={imageUpload => change(current => ({ ...current, projects: current.projects.map(item => item.id === project.id ? { ...item, imageUpload, ...(imageUpload && { image: '' }) } : item) }))} />
            <Button type="text" danger onClick={() => change({ ...draft, projects: draft.projects.filter((_, itemIndex) => itemIndex !== index) })} aria-label={'Remove project ' + (index + 1)}>Remove project</Button>
          </fieldset>)}
          <Button type="dashed" block disabled={draft.projects.length >= maxProjects} onClick={() => {
            const id = nextProjectId.current++;
            change({ ...draft, projects: [...draft.projects, { ...blankProject, id }] });
          }}>Add project</Button>
          </Form>
        </aside>}
        <section aria-label="Live portfolio preview"><PortfolioPreview profile={preview} /></section>
      </div>
    </main>
  );
}

export function SharedPortfolio() {
  const { hash, search } = useLocation();
  const id = new URLSearchParams(search).get('id');
  const [published, setPublished] = useState(null);
  useEffect(() => {
    if (!id || !tokenPattern.test(id)) return undefined;
    const controller = new AbortController();
    fetch('/api/portfolio?id=' + encodeURIComponent(id), { signal: controller.signal })
      .then(response => response.ok ? response.json() : null)
      .then(data => { if (!controller.signal.aborted) setPublished({ id, profile: data?.profile }); })
      .catch(() => { if (!controller.signal.aborted) setPublished({ id }); });
    return () => controller.abort();
  }, [id]);

  let profile = null;
  if (id) {
    if (published?.id === id && published.profile) {
      const candidate = normalize(published.profile);
      if (!validate(candidate)) profile = candidate;
    }
  } else if (hash.length <= maxHashLength + 1) {
    try {
      const payload = new URLSearchParams(hash.slice(1)).get('p');
      if (payload) {
        const candidate = normalize(JSON.parse(payload));
        if (!validate(candidate)) profile = candidate;
      }
    } catch {
      // An incomplete or invalid link shows the empty state below.
    }
  }

  const loading = id && tokenPattern.test(id) && published?.id !== id;
  const title = profile ? profile.name + ' | Portfolio' : loading ? 'Loading portfolio' : 'Portfolio link unavailable';
  useEffect(() => {
    const previous = document.title;
    document.title = title;
    return () => { document.title = previous; };
  }, [title]);

  return <main className="shared-custom-portfolio">
    {profile ? <PortfolioPreview profile={profile} /> : loading ? <p role="status">Loading portfolio…</p> : <><h1>Portfolio link unavailable</h1><p>The link may have expired. Ask the owner for a new link.</p><Link to="/portfolio">Back to portfolio</Link></>}
  </main>;
}

export function VerifyPortfolio() {
  const { hash } = useLocation();
  const token = new URLSearchParams(hash.slice(1)).get('token') || '';
  const [busy, setBusy] = useState(false);
  const [url, setUrl] = useState('');
  const [message, setMessage] = useState('');
  const linkInput = useRef(null);

  async function verify() {
    setBusy(true);
    setMessage('');
    try {
      const result = await publishingRequest({ action: 'verify', token });
      if (!webLink(result.url)) throw new Error('The portfolio link could not be created.');
      setUrl(result.url);
    } catch (failure) {
      setMessage(failure.message);
    } finally {
      setBusy(false);
    }
  }

  return <main className="portfolio-verification">
    <section>
      <h1>{url ? 'Your portfolio is live' : 'Verify your portfolio link'}</h1>
      {url ? <>
        <p>Anyone with this link can open your portfolio for seven days after verification.</p>
        <Form.Item label="Your live portfolio link" htmlFor="verified-portfolio-link">
          <Input id="verified-portfolio-link" ref={linkInput} readOnly value={url} onFocus={event => event.target.select()} />
        </Form.Item>
        <Space wrap>
          <Button onClick={async () => {
            try {
              await navigator.clipboard.writeText(url);
              setMessage('Link copied.');
            } catch {
              linkInput.current?.focus({ cursor: 'all' });
              setMessage('Link selected. Use Copy to share it.');
            }
          }}>Copy link</Button>
          <Button type="primary" href={url}>Open portfolio</Button>
        </Space>
      </> : <>
        <p>Confirm that you want to publish the submitted portfolio for seven days.</p>
        {tokenPattern.test(token) ? <Button type="primary" loading={busy} onClick={verify}>Verify and publish</Button> : <p role="alert">This verification link is incomplete. Open the complete link from your email.</p>}
      </>}
      {message && <p role={url ? 'status' : 'alert'}>{message}</p>}
    </section>
  </main>;
}
