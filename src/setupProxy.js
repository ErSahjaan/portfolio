const { development } = require('../api/portfolio');

const previews = new Map();

function localStorageCommand(command, key, value, expiryOption, seconds) {
  const now = Date.now();
  for (const [id, record] of previews) {
    if (record.expires <= now) previews.delete(id);
  }
  if (command === 'GET') return previews.get(key)?.value ?? null;
  if (command !== 'SET' || expiryOption !== 'EX') throw new Error('Unsupported local storage operation.');
  if (previews.size >= 24) throw new Error('Local preview limit reached.');
  previews.set(key, { value, expires: now + seconds * 1000 });
  return 'OK';
}

module.exports = app => {
  app.all('/api/portfolio', async (req, res) => {
    const host = req.get('host');
    if (!/^(localhost|127\.0\.0\.1|\[::1\])(?::\d+)?$/i.test(host)) {
      return res.status(403).json({ error: 'Open the portfolio on localhost to create a local preview.' });
    }
    if (req.method === 'POST') {
      try {
        let size = 0;
        const chunks = [];
        for await (const chunk of req) {
          size += chunk.length;
          if (size <= 700000) chunks.push(chunk);
        }
        if (size > 700000) return res.status(413).json({ error: 'This portfolio is too large.' });
        req.body = JSON.parse(Buffer.concat(chunks).toString('utf8'));
      } catch {
        return res.status(400).json({ error: 'The portfolio request is invalid.' });
      }
    }
    return development(req, res, { origin: req.protocol + '://' + host, storage: localStorageCommand });
  });
};
