const url = (process.env.SITE_URL || 'https://baliaipage.vercel.app').replace(/\/$/, '');
if (!/^https:\/\/[^/]+$/.test(url)) throw new Error('SITE_URL debe ser un origen HTTPS sin ruta');
module.exports = { url, name: 'Bali AI', reviewed: '2026-10-10', playUrl: 'https://play.google.com/store/apps/details?id=com.jesuskrastev.bali' };
