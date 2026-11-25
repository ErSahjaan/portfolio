const { createHash, randomBytes } = require('node:crypto');

const verifySeconds = 20 * 60;
const liveSeconds = 7 * 24 * 60 * 60;
const temporarySeconds = 60 * 60;
const countRequests = "local n=redis.call('INCR',KEYS[1]); if n==1 then redis.call('EXPIRE',KEYS[1],3600) end; return n";
const publish = "local existing=redis.call('GET',KEYS[2]); if existing then return existing end; local profile=redis.call('GET',KEYS[1]); if not profile then return false end; redis.call('SET',KEYS[2],profile,'EX',ARGV[1]); redis.call('DEL',KEYS[1]); return profile";
const key = (kind, value) => 'portfolio:v1:' + kind + ':' + value;
const digest = value => createHash('sha256').update(value).digest('hex');
async function redis(...command) {
  const response = await fetch(process.env.UPSTASH_REDIS_REST_URL, {
    method: 'POST',
    headers: { Authorization: 'Bearer ' + process.env.UPSTASH_REDIS_REST_TOKEN, 'Content-Type': 'application/json' },
    body: JSON.stringify(command),
  });
  if (!response.ok) throw new Error('Storage unavailable');
  const data = await response.json();
  if (data.error) throw new Error('Storage unavailable');
  return data.result;
}

function validProfile(data, schema) {
  if (!data || typeof data !== 'object' || Array.isArray(data)) return false;
  const props = { name: 80, role: 100, location: 80, availability: 65, headline: 110, biography: 700,
    experience: 1000, education: 500, skills: 300, email: 160, website: 300, photo: 500, slug: 60 };
  const stringsFit = (record, limits) => Object.entries(limits).every(([name, limit]) =>
    typeof record[name] === 'string' && record[name].length <= limit);
  const https = value => {
    if (!value) return true;
    try { const url = new URL(value); return url.protocol === 'https:' && !url.username && !url.password; }
    catch { return false; }
  };
  const uploadOk = value => {
    if (!value) return typeof value === 'string';
    if (!schema.uploadedImage(value)) return false;
    const bytes = Buffer.from(value.split(',')[1], 'base64');
    return bytes.toString('ascii', 0, 4) === 'RIFF' && bytes.toString('ascii', 8, 12) === 'WEBP';
  };
  return stringsFit(data, props) && data.name.trim() && data.role.trim() &&
    (data.educationEntries === undefined || (Array.isArray(data.educationEntries) &&
      data.educationEntries.length <= schema.maxEducationEntries &&
      data.educationEntries.every(entry => entry && stringsFit(entry, schema.educationLimits)))) &&
    (data.linkedin === undefined || (typeof data.linkedin === 'string' && data.linkedin.length <= 300 && https(data.linkedin))) &&
    (!data.slug || schema.slugPattern.test(data.slug)) && (!data.email || schema.emailPattern.test(data.email)) &&
    typeof data.sample === 'boolean' && (https(data.photo) || (data.sample && data.photo === 'sample:portrait')) &&
    https(data.website) && uploadOk(data.photoUpload) &&
    ['indigo', 'forest', 'slate'].includes(data.theme) &&
    (data.accent === '' || schema.colorPattern.test(data.accent)) &&
    (data.background === '' || schema.colorPattern.test(data.background)) &&
    Array.isArray(data.projects) && data.projects.length <= 5 &&
    data.projects.every(project => project && stringsFit(project, { title: 100, description: 400, url: 300, image: 500 }) &&
      project.title.trim() && https(project.url) && https(project.image) && uploadOk(project.imageUpload));
}

async function rateLimited(limits) {
  for (const [scope, value, limit] of limits) {
    if (await redis('EVAL', countRequests, 1, key(scope, digest(value))) > limit) return true;
  }
  return false;
}

async function notifyOwner(profile, url, schema) {
  const endpoint = process.env.PORTFOLIO_SUBMISSION_ENDPOINT;
  if (!endpoint) return 'manual';
  if (!/^https:\/\/formsubmit\.co\/ajax\/[a-z0-9@._+-]+$/i.test(endpoint)) return 'unavailable';
  const projectDetails = profile.projects.map(project =>
    [project.title, project.description, project.url, project.image].filter(Boolean).join('\n')
  ).join('\n\n');
  const submission = {
    _subject: 'New portfolio submission',
    _url: new URL('/portfolio/build', url).href,
    submission_type: profile.sample ? 'Fictional sample' : 'Customer portfolio',
    name: profile.name,
    role: profile.role,
    headline: profile.headline,
    location: profile.location,
    availability: profile.availability,
    biography: profile.biography,
    work_experience: profile.experience,
    education: schema.educationText(profile),
    skills: profile.skills,
    public_email: profile.email,
    linkedin: profile.linkedin,
    website: profile.website,
    profile_image_url: profile.photo === 'sample:portrait' ? '' : profile.photo,
    projects: projectDetails,
    theme: profile.theme,
    accent_color: profile.accent,
    hero_background_tint: profile.background,
    portfolio_link: url,
  };
  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
      body: JSON.stringify(Object.fromEntries(Object.entries(submission).filter(([, value]) => value))),
      signal: AbortSignal.timeout(5000),
    });
    const result = await response.json();
    return response.ok && (result.success === true || result.success === 'true') ? 'accepted' : 'unavailable';
  } catch {
    return 'unavailable';
  }
}

async function handle(req, res, development) {
  res.setHeader('Cache-Control', 'no-store');
  const send = (status, data) => res.status(status).json(data);
  if (!['GET', 'POST'].includes(req.method)) {
    res.setHeader('Allow', 'GET, POST');
    return send(405, { error: 'Unsupported request.' });
  }
  if (!development && (!process.env.UPSTASH_REDIS_REST_URL || !process.env.UPSTASH_REDIS_REST_TOKEN || !process.env.PORTFOLIO_PUBLIC_ORIGIN)) {
    return send(503, { error: 'Portfolio publishing is not configured on this site.' });
  }
  try {
    const origin = new URL(development?.origin || process.env.PORTFOLIO_PUBLIC_ORIGIN);
    if ((!development && origin.protocol !== 'https:') || origin.username || origin.password) throw new Error('Invalid public origin');
    const developmentRedis = development && process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN;
    const storage = developmentRedis
      ? (command, storageKey, ...args) => redis(command, 'development:' + storageKey, ...args)
      : development?.storage || redis;
    const schema = await import('../src/portfolioPublishing.mjs');
    const shareUrl = (profile, id) => {
      const url = new URL(schema.publicAddress(profile), origin);
      url.searchParams.set('id', id);
      return url.href;
    };
    if (req.method === 'GET') {
      const id = req.query.id;
      if (typeof id !== 'string' || !schema.tokenPattern.test(id)) return send(400, { error: 'Invalid portfolio link.' });
      const record = await storage('GET', key('live', id));
      if (!record) return send(404, { error: 'This portfolio link has expired or is unavailable.' });
      return send(200, { profile: JSON.parse(record) });
    }

    if (req.headers.origin !== origin.origin) return send(403, { error: 'Open the published site to continue.' });
    const body = req.body;
    if (!body || typeof body !== 'object' || Array.isArray(body) || JSON.stringify(body).length > 560000) {
      return send(400, { error: 'The request is invalid or too large.' });
    }
    const ip = req.headers['x-vercel-forwarded-for']?.split(',')[0]?.trim() || req.socket?.remoteAddress || 'unknown';
    if (body.action === 'publish') {
      if (!validProfile(body.profile, schema)) return send(400, { error: 'Check your portfolio details.' });
      if (!development && await rateLimited([['publish-ip', ip, 10], ['publish-site', 'global', 100]])) {
        return send(429, { error: 'Too many requests. Please try again later.' });
      }
      const id = randomBytes(24).toString('base64url');
      await storage('SET', key('live', id), JSON.stringify(body.profile), 'EX', temporarySeconds);
      const url = shareUrl(body.profile, id);
      const notification = await notifyOwner(body.profile, url, schema);
      return send(200, { id, url, notification, local: Boolean(development) });
    }
    if (body.action === 'resume-request') {
      const { email, phone, request, photo, deliverable = 'resume' } = body;
      const digits = typeof phone === 'string' ? phone.replace(/\D/g, '') : '';
      if (!['resume', 'portfolio', 'both'].includes(deliverable) ||
          typeof email !== 'string' || email.length > 160 || !schema.emailPattern.test(email) ||
          typeof phone !== 'string' || phone.length > 40 || !/^\+?[\d ().-]+$/.test(phone) || digits.length < 7 || digits.length > 15 ||
          typeof request !== 'string' || !request.trim() || request.length > 6000 ||
          typeof photo !== 'string' || photo.length > 500000 || !/^data:image\/jpeg;base64,\/9j\/[A-Za-z0-9+/]+={0,2}$/.test(photo)) {
        return send(400, { error: 'Enter a valid email and phone number, describe your request, and attach a profile photo.' });
      }
      if (!process.env.RESEND_API_KEY || !process.env.PORTFOLIO_EMAIL_FROM) {
        return send(503, { error: 'Résumé request email delivery is not configured.' });
      }
      if (!development && await rateLimited([['resume-request-ip', ip, 5], ['resume-request-site', 'global', 40]])) {
        return send(429, { error: 'Too many requests. Please try again later.' });
      }
      const deliverableLabel = { resume: 'ATS-friendly résumé', portfolio: 'Portfolio link', both: 'ATS-friendly résumé + portfolio link' }[deliverable];
      const response = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: { Authorization: 'Bearer ' + process.env.RESEND_API_KEY, 'Content-Type': 'application/json' },
        body: JSON.stringify({
          from: process.env.PORTFOLIO_EMAIL_FROM,
          to: ['quickfixedservicedial@gmail.com'],
          reply_to: email,
          subject: deliverableLabel + ' request',
          text: ['Email: ' + email, 'Phone: ' + phone, '', 'Requested: ' + deliverableLabel, request].join('\n'),
          attachments: [{ filename: 'profile-photo.jpg', content: photo.split(',')[1] }],
        }),
        signal: AbortSignal.timeout(10000),
      }).catch(() => null);
      if (!response?.ok) {
        console.error('Portfolio résumé request delivery failed', {
          providerStatus: response?.status ?? null,
          testSender: /@resend\.dev\b/i.test(process.env.PORTFOLIO_EMAIL_FROM),
        });
        return send(502, { error: 'The request email could not be sent. Try again later.' });
      }
      return send(200, { sent: true });
    }
    if (development) return send(503, { error: 'Email delivery requires the deployed site. You can still open your localhost preview.' });
    if (body.action === 'email') {
      if (typeof body.id !== 'string' || !schema.tokenPattern.test(body.id) ||
          typeof body.email !== 'string' || body.email.length > 160 || !schema.emailPattern.test(body.email)) {
        return send(400, { error: 'Enter an email address that can receive the link.' });
      }
      if (!process.env.RESEND_API_KEY || !process.env.PORTFOLIO_EMAIL_FROM) {
        return send(503, { error: 'Email delivery is unavailable. You can still copy your portfolio link.' });
      }
      const record = await redis('GET', key('live', body.id));
      if (!record) return send(410, { error: 'This portfolio link has expired. Submit again for a new link.' });
      const email = body.email.toLowerCase();
      if (await rateLimited([['share-ip', ip, 10], ['share-email', email, 3], ['share-site', 'global', 50]])) {
        return send(429, { error: 'Too many email requests. You can still copy your portfolio link.' });
      }
      const response = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: { Authorization: 'Bearer ' + process.env.RESEND_API_KEY, 'Content-Type': 'application/json' },
        body: JSON.stringify({
          from: process.env.PORTFOLIO_EMAIL_FROM,
          to: [email],
          subject: 'Your temporary portfolio link',
          text: 'Here is the portfolio link you requested. It may expire as soon as 60 minutes after publication.\n\n' +
            shareUrl(JSON.parse(record), body.id) + '\n\nIgnore this message if you did not request it.',
        }),
      });
      if (!response.ok) return send(502, { error: 'The email could not be sent. You can still copy your portfolio link.' });
      return send(200, { sent: true });
    }
    if (body.action === 'verify') {
      if (typeof body.token !== 'string' || !schema.tokenPattern.test(body.token)) return send(400, { error: 'Invalid verification link.' });
      const tokenHash = digest(body.token);
      const id = createHash('sha256').update('portfolio-public:' + body.token).digest('base64url').slice(0, 32);
      const record = await redis('EVAL', publish, 2, key('pending', tokenHash), key('live', id), liveSeconds);
      if (!record) return send(410, { error: 'This verification link has expired. Submit a new request.' });
      return send(200, { url: shareUrl(JSON.parse(record), id) });
    }

    if (body.action !== 'request' || typeof body.email !== 'string' || body.email.length > 160 ||
        !schema.emailPattern.test(body.email) || !validProfile(body.profile, schema)) {
      return send(400, { error: 'Check the portfolio details and verification email.' });
    }
    if (!process.env.RESEND_API_KEY || !process.env.PORTFOLIO_EMAIL_FROM) {
      return send(503, { error: 'Verification email is not configured on this site.' });
    }
    const email = body.email.toLowerCase();
    for (const [scope, value, limit] of [['ip', ip, 10], ['email', email, 3], ['site', 'global', 50]]) {
      if (await redis('EVAL', countRequests, 1, key(scope, digest(value))) > limit) {
        return send(429, { error: 'Too many requests. Please try again later.' });
      }
    }
    const token = randomBytes(24).toString('base64url');
    const pendingKey = key('pending', digest(token));
    await redis('SET', pendingKey, JSON.stringify(body.profile), 'EX', verifySeconds);
    const verification = new URL('/portfolio/verify', origin);
    verification.hash = new URLSearchParams({ token }).toString();
    const emailResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: 'Bearer ' + process.env.RESEND_API_KEY, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from: process.env.PORTFOLIO_EMAIL_FROM,
        to: [email],
        subject: 'Verify your temporary portfolio link',
        text: 'Open this link to verify your email and publish a portfolio link valid for seven days.\n\n' +
          verification.href + '\n\nThis verification link expires after 20 minutes. Ignore this message if you did not request it.',
      }),
    });
    if (!emailResponse.ok) {
      await redis('DEL', pendingKey);
      return send(502, { error: 'The verification email could not be sent. Please try again later.' });
    }
    return send(200, { sent: true });
  } catch {
    return send(503, { error: 'Portfolio publishing is temporarily unavailable. Please try again later.' });
  }
}

module.exports = (req, res) => handle(req, res);
module.exports.development = (req, res, options) => handle(req, res, options);
