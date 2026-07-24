import fs from 'fs';
import path from 'path';

const SITE_URL = 'https://anshumdev.com';

function generateSitemap() {
  const routesDir = path.resolve(process.cwd(), 'src/routes');
  const files = fs.readdirSync(routesDir);
  
  const routes = files
    .filter(file => file.endsWith('.tsx') && !file.startsWith('_') && file !== 'api')
    .map(file => {
      const route = file.replace('.tsx', '');
      if (route === 'index') return '';
      return route;
    });

  const urls = routes.map(route => {
    return `
  <url>
    <loc>${SITE_URL}/${route}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>${route === '' ? 'weekly' : 'monthly'}</changefreq>
    <priority>${route === '' ? '1.0' : '0.8'}</priority>
  </url>`;
  });

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.join('')}
</urlset>`;

  fs.writeFileSync(path.resolve(process.cwd(), 'public/sitemap.xml'), sitemap);
  console.log('Sitemap generated successfully at public/sitemap.xml');
}

generateSitemap();
