export const imageAccept = 'image/jpeg,image/png,image/webp';
export const maxImageLength = 85000;
export const emailPattern = /^[a-z0-9._+-]+@[a-z0-9.-]+\.[a-z]{2,}$/i;
export const colorPattern = /^#[\da-f]{6}$/i;
export const slugPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
export const tokenPattern = /^[A-Za-z0-9_-]{32}$/;

export function uploadedImage(value) {
  return typeof value === 'string' && value.length <= maxImageLength &&
    /^data:image\/webp;base64,UklGR[A-Za-z0-9+/]+={0,2}$/.test(value) ? value : '';
}

export function portfolioColor(value) {
  return colorPattern.test(value) ? value : '';
}

export function publicAddress(profile) {
  const name = profile.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').slice(0, 60).replace(/^-|-$/g, '');
  return '/portfolio/custom/' + (profile.slug || name || 'your-name');
}
